import { t } from './i18n';
import type { NodeAction } from './types';
const directions = [
  { action: 'add-sibling-before', x: 0, y: -1, get label() { return t("Sibling above"); } },
  { action: 'add-sibling', x: 0, y: 1, get label() { return t("Sibling below"); } },
  { action: 'add-child', x: 1, y: 0, get label() { return t("Child node"); } },
  { action: 'add-parent', x: -1, y: 0, get label() { return t("Parent node"); } },
] as const;
type ScreenRect = Pick<DOMRectReadOnly, 'left' | 'top' | 'right' | 'bottom' | 'width' | 'height'>;
let nextPreview = 0;
export class CreationHandles {
  readonly host: HTMLDivElement;
  private id: string | null = null;
  private node?: HTMLElement;
  private buttons: HTMLButtonElement[] = [];
  private preview: SVGSVGElement;
  private path: SVGPathElement;
  private coarse: boolean;
  private hovered = -1;
  private nodeRect?: ScreenRect;
  private gesture?: { button: HTMLButtonElement; pointer: number; x: number; y: number; dx: number; dy: number; id: string; action: NodeAction; ready: boolean };
  private hover = (event: PointerEvent) => {
    if (this.coarse || this.gesture || !this.node || this.host.hidden) return;
    if ((event.target as Element).closest('.tvm-create-handles button')) return;
    const rect = this.nodeRect; if (!rect) return;
    const inside = event.clientX >= rect.left - 10 && event.clientX <= rect.right + 10 && event.clientY >= rect.top - 10 && event.clientY <= rect.bottom + 10;
    const distances = [Math.abs(event.clientY - rect.top), Math.abs(event.clientY - rect.bottom), Math.abs(event.clientX - rect.right), Math.abs(event.clientX - rect.left)];
    const distance = Math.min(...distances);
    this.hovered = inside && distance <= 10 ? distances.indexOf(distance) : -1;
    this.visibility();
  };
  private interrupt = (event: PointerEvent) => {
    if (this.gesture && event.pointerId !== this.gesture.pointer) { this.cancel(); event.preventDefault(); event.stopPropagation(); }
  };
  private leave = () => { if (!this.gesture) { this.hovered = -1; this.visibility(); } };
  constructor(private viewport: HTMLElement, private create: (action: NodeAction, id: string) => void) {
    const d = viewport.ownerDocument;
    this.coarse = d.defaultView?.matchMedia?.('(pointer: coarse)').matches ?? true;
    this.host = d.createElement('div'); this.host.className = 'tvm-create-handles'; this.host.hidden = true;
    this.host.dataset.coarse = String(this.coarse); viewport.append(this.host);
    const ns = 'http://www.w3.org/2000/svg';
    this.preview = d.createElementNS(ns, 'svg'); this.preview.classList.add('tvm-create-preview'); this.preview.style.display = 'none'; this.preview.setAttribute('aria-hidden', 'true');
    const defs = d.createElementNS(ns, 'defs'), marker = d.createElementNS(ns, 'marker'), tip = d.createElementNS(ns, 'path');
    const markerId = 'tvm-create-arrow-' + (++nextPreview);
    for (const [key, value] of Object.entries({ id: markerId, viewBox: '0 0 8 8', refX: '8', refY: '4', markerWidth: '8', markerHeight: '8', orient: 'auto', markerUnits: 'userSpaceOnUse' })) marker.setAttribute(key, value);
    tip.setAttribute('d', 'M 0 0 L 8 4 L 0 8 Z'); marker.append(tip); defs.append(marker);
    this.path = d.createElementNS(ns, 'path'); this.path.setAttribute('marker-end', 'url(#' + markerId + ')'); this.preview.append(defs, this.path); this.host.append(this.preview);
    for (const direction of directions) {
      const button = d.createElement('button'); button.type = 'button'; button.textContent = '';  button.setAttribute('aria-label', direction.label); button.dataset.createAction = direction.action; this.host.append(button); this.buttons.push(button);
      button.addEventListener('pointerdown', event => {
        if (event.button !== 0 || !this.id) return;
        event.preventDefault(); event.stopPropagation(); this.cancel(); this.viewport.focus({ preventScroll: true });
        this.gesture = { button, pointer: event.pointerId, x: event.clientX, y: event.clientY, dx: direction.x, dy: direction.y, id: this.id, action: direction.action, ready: false };
        try { button.setPointerCapture(event.pointerId); } catch { /* Synthetic pointer. */ }
        this.drawPreview(event.clientX, event.clientY);
      });
      button.addEventListener('pointermove', event => {
        const gesture = this.gesture; if (!gesture || gesture.pointer !== event.pointerId) return;
        event.preventDefault(); event.stopPropagation();
        const x = event.clientX - gesture.x, y = event.clientY - gesture.y;
        const forward = x * gesture.dx + y * gesture.dy, cross = Math.abs(x * gesture.dy - y * gesture.dx);
        gesture.ready = forward >= 24 && cross <= Math.max(12, forward * .5);
        button.classList.toggle('is-ready', gesture.ready);
        this.drawPreview(event.clientX, event.clientY);
      });
      button.addEventListener('pointerup', event => {
        const gesture = this.gesture; if (!gesture || gesture.pointer !== event.pointerId) return;
        event.preventDefault(); event.stopPropagation(); this.cancel();
        if (gesture.ready) this.create(gesture.action, gesture.id);
      });
      button.addEventListener('pointercancel', () => this.cancel()); button.addEventListener('lostpointercapture', () => this.cancel());
      button.onclick = event => { event.preventDefault(); event.stopPropagation(); };
    }
    viewport.addEventListener('pointerdown', this.interrupt, true);
    viewport.addEventListener('pointermove', this.hover); viewport.addEventListener('pointerleave', this.leave);
    this.host.onkeydown = event => { if (event.key === 'Escape') { this.cancel(); event.preventDefault(); event.stopPropagation(); } };
  }
  private visibility(): void { this.buttons.forEach((button, index) => { button.hidden = button.dataset.clipped === 'true' || (!this.coarse && index !== this.hovered && button !== this.gesture?.button); }); }
  private drawPreview(x: number, y: number): void {
    const gesture = this.gesture; if (!gesture) return;
    const view = this.viewport.getBoundingClientRect(), port = gesture.button.getBoundingClientRect();
    const sx = port.left + port.width / 2 - view.left, sy = port.top + port.height / 2 - view.top, ex = x - view.left, ey = y - view.top;
    const bend = Math.min(80, Math.max(24, Math.hypot(ex - sx, ey - sy) * .4));
    if (Math.hypot(ex - sx, ey - sy) < 3) { this.preview.style.display = 'none'; return; }
    this.preview.style.display = ''; this.preview.classList.toggle('is-ready', gesture.ready);
    this.path.setAttribute('d', `M ${sx} ${sy} C ${sx + gesture.dx * bend} ${sy + gesture.dy * bend}, ${ex - gesture.dx * bend} ${ey - gesture.dy * bend}, ${ex} ${ey}`);
  }
  place(node: HTMLElement | undefined, id: string | null, geometry?: { node: ScreenRect; viewport: ScreenRect }): void {
    if (id !== this.id) { this.cancel(); this.hovered = -1; }
    this.id = id; this.node = node; this.host.hidden = !node || !id;
    if (!node || !id) { this.nodeRect = undefined; return; }
    const rect = geometry?.node ?? node.getBoundingClientRect(), view = geometry?.viewport ?? this.viewport.getBoundingClientRect();
    this.nodeRect = rect;
    if (rect.bottom < view.top || rect.top > view.bottom || rect.right < view.left || rect.left > view.right) { this.host.hidden = true; return; }
    const gap = 0;
    const points = [[rect.left + rect.width / 2, rect.top - gap], [rect.left + rect.width / 2, rect.bottom + gap], [rect.right + gap, rect.top + rect.height / 2], [rect.left - gap, rect.top + rect.height / 2]];
    this.buttons.forEach((button, index) => {
      const x = points[index][0] - view.left, y = points[index][1] - view.top;
      button.dataset.clipped = String(x < 0 || x > view.width || y < 0 || y > view.height);
      button.style.left = x + 'px'; button.style.top = y + 'px';
    }); this.visibility();
  }
  cancelIfActive(): boolean { if (!this.gesture) return false; this.cancel(); return true; }
  cancel(): void {
    const gesture = this.gesture; this.gesture = undefined; this.preview.style.display = 'none';
    if (gesture) { gesture.button.classList.remove('is-ready'); try { if (gesture.button.hasPointerCapture(gesture.pointer)) gesture.button.releasePointerCapture(gesture.pointer); } catch { /* Pointer already ended. */ } }
    this.visibility();
  }
  destroy(): void { this.cancel(); this.viewport.removeEventListener('pointerdown', this.interrupt, true); this.viewport.removeEventListener('pointermove', this.hover); this.viewport.removeEventListener('pointerleave', this.leave); this.host.remove(); }
}
