import { t } from './i18n';
/** Presentation only: consume the same leading markers as the step parser. */
export function queueLabel(text: string, showTask = true, showStep = true): string {
  const match = /^(\[[^\]]\][ \t]*)?(#step(?:[ \t]+|$))?(.*)$/i.exec(text)!;
  const label = (showTask ? match[1] ?? '' : '') + (showStep ? match[2] ?? '' : '') + match[3];
  return label.trim() || text;
}

interface MapChoice { path: string; basename: string; }
let nextFilterId = 0;

export function attachMapFilter(parent: HTMLElement, getMaps: () => MapChoice[], onSelect: (path: string) => void): void {
  const host = parent.createDiv('tvm-map-filter');
  const input = host.createEl('input', { type: 'text', attr: { role: 'combobox', 'aria-label': t("Map filter"), 'aria-autocomplete': 'list', 'aria-expanded': 'false', autocomplete: 'off', placeholder: t("All maps") } });
  const list = host.createDiv('tvm-map-options');
  list.id = `tvm-map-options-${++nextFilterId}`;
  list.setAttribute('role', 'listbox');
  list.setAttribute('aria-label', t("Maps"));
  input.setAttribute('aria-controls', list.id);
  list.hidden = true;
  let selected: MapChoice = { path: '', basename: t("All maps") };
  let choices: MapChoice[] = [];
  let active = -1;
  const close = () => {
    list.hidden = true; input.setAttribute('aria-expanded', 'false'); input.removeAttribute('aria-activedescendant');
    input.value = selected.path ? selected.basename : '';
  };
  const choose = (choice: MapChoice) => { selected = choice; close(); onSelect(choice.path); };
  const highlight = () => {
    Array.from(list.children).forEach((element, index) => element.setAttribute('aria-selected', String(index === active)));
    const option = list.children[active] as HTMLElement | undefined;
    if (option) { input.setAttribute('aria-activedescendant', option.id); option.scrollIntoView({ block: 'nearest' }); }
    else input.removeAttribute('aria-activedescendant');
  };
  const draw = () => {
    const query = input.value.trim().toLocaleLowerCase();
    choices = [{ path: '', basename: t("All maps") }, ...getMaps().sort((a, b) => a.path.localeCompare(b.path))]
      .filter(choice => !choice.path || `${choice.basename} ${choice.path}`.toLocaleLowerCase().includes(query));
    list.empty(); active = -1;
    for (const [index, choice] of choices.entries()) {
      const option = list.createDiv('tvm-map-option');
      option.id = `${list.id}-${index}`; option.setAttribute('role', 'option'); option.setAttribute('aria-selected', 'false');
      option.createDiv({ text: choice.basename });
      if (choice.path) option.createDiv({ cls: 'tvm-map-option-path', text: choice.path });
      // Keep keyboard focus in the input; touch scrolling remains native.
      option.onmousedown = event => event.preventDefault();
      option.onclick = () => choose(choice);
    }
    if (query && choices.length === 1) list.createDiv({ cls: 'tvm-map-option-path tvm-map-no-results', text: t("No maps match this search.") });
    list.hidden = false; input.setAttribute('aria-expanded', 'true'); input.removeAttribute('aria-activedescendant');
  };
  input.onfocus = () => { input.value = ''; draw(); };
  input.onclick = () => { if (list.hidden) { input.value = ''; draw(); } };
  input.oninput = draw;
  input.onkeydown = event => {
    if (event.key === 'Escape' && !list.hidden) { event.preventDefault(); event.stopPropagation(); close(); }
    else if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault(); if (list.hidden) { input.value = ''; draw(); }
      active = active < 0 ? (event.key === 'ArrowDown' ? 0 : choices.length - 1) : (active + (event.key === 'ArrowDown' ? 1 : -1) + choices.length) % choices.length;
      highlight();
    } else if (event.key === 'Enter' && !list.hidden) {
      event.preventDefault();
      if (active < 0 && input.value.trim() && choices.length === 1) return;
      choose(choices[active >= 0 ? active : (choices.length > 1 && input.value.trim() ? 1 : 0)]);
    }
  };
  input.onblur = () => close();
}
