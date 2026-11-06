import { test } from 'node:test';
import assert from 'node:assert/strict';
import { JSDOM } from 'jsdom';
import { parseMap } from '../src/core';
import { exportHtml, exportSvg } from '../src/export';

test('HTML export keeps hierarchy, order and Markdown labels in a portable folding outline', () => {
  const source = '- Мета 🎯\n  - [[Vault note|label]]\n    - [ ] #step ) Do it\n  - second\n- another root\n';
  const doc = parseMap(source);
  const html = new JSDOM(exportHtml(doc, 'My map')).window.document;
  assert.equal(html.title, 'My map');
  assert.deepEqual([...html.querySelectorAll('.label')].map(node => node.textContent), doc.nodes.map(node => node.text));
  assert.equal(html.querySelectorAll('.outline > li').length, 2);
  assert.equal(html.querySelectorAll('details[open]').length, 2);
  assert.equal(html.querySelectorAll('.outline > li:first-child > details > ul > li').length, 2);
  assert.equal(doc.source, source);
  assert.equal(html.querySelectorAll('script, img, iframe, link, a').length, 0);
});

test('HTML and SVG labels cannot create executable markup, attributes, or network requests', () => {
  const malicious = '</title><script>alert("x")</script><img src="https://example.com/x" onerror="alert(1)"> & [[javascript:alert(1)]]';
  const doc = parseMap(`- ${malicious}\n  - </tspan><foreignObject onload="alert(2)">\n`);
  const html = new JSDOM(exportHtml(doc, malicious)).window.document;
  assert.equal(html.title, malicious);
  assert.equal(html.querySelector('.label')?.textContent, malicious);
  assert.equal(html.querySelectorAll('script, img, iframe, foreignObject, a').length, 0);
  assert.equal([...html.querySelectorAll('*')].some(node => [...node.attributes].some(attribute => /^on/i.test(attribute.name))), false);
  const svg = new JSDOM(exportSvg(doc, malicious), { contentType: 'image/svg+xml' }).window.document;
  assert.equal(svg.querySelector('#map-title')?.textContent, malicious);
  assert.equal(svg.querySelector('.map-node > title')?.textContent, malicious);
  assert.equal(svg.querySelectorAll('script, image, iframe, foreignObject, a').length, 0);
  assert.equal([...svg.querySelectorAll('*')].some(node => [...node.attributes].some(attribute => /^on/i.test(attribute.name) || /href/.test(attribute.name))), false);
});

test('SVG exports every branch with bounded labels and separated sibling rectangles', () => {
  const label = 'WWW українська 😀 中文 & <xml> '.repeat(10);
  const doc = parseMap(`- root\n  - ${label}\n    - leaf\n  - sibling\n- other\n`);
  const svg = new JSDOM(exportSvg(doc, 'SVG export'), { contentType: 'image/svg+xml' }).window.document;
  const groups = [...svg.querySelectorAll('.map-node')];
  assert.equal(groups.length, doc.nodes.length);
  assert.equal(svg.querySelectorAll('path').length, doc.nodes.length - doc.roots.length);
  assert.equal([...groups[1].querySelectorAll('tspan')].map(line => line.textContent).join(''), label);
  assert.ok(groups[1].querySelectorAll('tspan').length > 3);
  const rects = groups.map(group => group.querySelector('rect')!);
  assert.ok(Number(rects[1].getAttribute('y')) + Number(rects[1].getAttribute('height')) <= Number(rects[3].getAttribute('y')));
  assert.ok(Number(rects[2].getAttribute('x')) > Number(rects[1].getAttribute('x')));
  assert.ok(!/NaN|Infinity/.test(svg.documentElement.outerHTML));
});

test('empty outlines and invalid XML control characters still yield valid documents', () => {
  assert.match(exportHtml(parseMap(''), 'Empty'), /no outline nodes/);
  const empty = new JSDOM(exportSvg(parseMap(''), 'Empty'), { contentType: 'image/svg+xml' }).window.document;
  assert.equal(empty.querySelectorAll('.map-node').length, 0);
  const source = '- text\u0000 bad\ud800 unicode\n';
  const svg = new JSDOM(exportSvg(parseMap(source), 'title\u0001'), { contentType: 'image/svg+xml' }).window.document;
  assert.equal(svg.querySelector('#map-title')?.textContent, 'title\ufffd');
  assert.equal(svg.querySelector('.map-node > title')?.textContent, 'text\ufffd bad\ufffd unicode');
});

test('a long title wraps above the map instead of clipping or overlapping its nodes', () => {
  const title = 'Long українська 😀 title '.repeat(15);
  const svg = new JSDOM(exportSvg(parseMap('- root'), title), { contentType: 'image/svg+xml' }).window.document;
  const titleLines = [...svg.querySelector('svg > text')!.querySelectorAll('tspan')];
  assert.equal(titleLines.map(line => line.textContent).join(''), title);
  assert.ok(titleLines.length > 3);
  assert.ok(Number(svg.querySelector('.map-node > rect')?.getAttribute('y')) > Number(titleLines.at(-1)?.getAttribute('y')) + 30);
});

test('a large complete outline exports deterministically without dropping duplicate labels', () => {
  const source = '- root\n' + Array.from({ length: 1000 }, () => '  - same label\n    - child\n').join('');
  const doc = parseMap(source);
  const before = JSON.stringify(doc.nodes);
  const svg = exportSvg(doc, 'Large');
  assert.equal((svg.match(/class="map-node"/g) ?? []).length, 2001);
  assert.equal((exportHtml(doc, 'Large').match(/class="label"/g) ?? []).length, 2001);
  assert.equal(exportSvg(doc, 'Large'), svg);
  assert.equal(JSON.stringify(doc.nodes), before);
});
