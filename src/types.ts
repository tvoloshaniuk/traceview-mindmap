/*
 * Copyright (C) 2026 tvoloshaniuk
 * GPL-3.0-only with the Obsidian Host Additional Permission.
 * See LICENSE, LICENSING.md and OBSIDIAN-HOST-PERMISSION.md.
 */
export interface MapNode {
  id: string;
  text: string;
  line: number;
  endLine: number;
  indent: number;
  kind: 'bullet' | 'heading' | 'root';
  prefix: string;
  parentId: string | null;
  children: string[];
  blockId?: string;
}
export interface MapDocument {
  source: string;
  lines: string[];
  eol: string;
  nodes: MapNode[];
  roots: string[];
  byId: Map<string, MapNode>;
}
export interface Camera { x: number; y: number; scale: number }
export const MIN_SCALE = 0.15;
export const MAX_SCALE = 32;
export type WidthMode = 'fixed' | 'content' | 'column';
export type DropPosition = 'before' | 'after' | 'child';
export interface MapViewState {
  collapsed: string[];
  selected: string | null;
  camera: Camera;
  focusRoot: string | null;
}
export type NodeAction = 'copy-node-link' | 'edit' | 'add-child' | 'add-sibling' | 'add-sibling-before' | 'add-parent' | 'delete' | 'move-up' | 'move-down' | 'indent' | 'outdent' | 'copy' | 'cut' | 'paste' | 'paste-after' | 'toggle-task' | 'make-step' | 'make-dated' | 'make-question' | 'source' | 'undo' | 'redo';
export interface MapSurfaceOptions {
  useTransformPan?: () => boolean;
  getWidthMode?: () => WidthMode;
  getHotkeys?: () => Record<string, string>;
  getCollapseOnLeft?: () => boolean;
  onFind?: () => void;
  getRenderKey?: () => string;
  releaseMarkdown?: (el: HTMLElement) => void;
  onAction: (action: NodeAction, nodeId: string | null) => void;
  onReparent?: (nodeId: string, targetId: string) => void;
  onMoveBranches?: (nodeIds: string[], targetId: string, position: DropPosition) => void;
  onState: (state: MapViewState) => void;
  renderMarkdown: (text: string, el: HTMLElement) => void | Promise<void>;
  onOpenLink?: (link: string, event: MouseEvent) => void;
  onHoverLink?: (event: MouseEvent, target: HTMLElement, link: string) => void;
}
export interface Step {
  order?: number[];
  nodeId: string;
  line: number;
  text: string;
  completed: boolean;
  number: number | null;
  suffix: string;
  date: string | null;
  unknownDate: boolean;
  frozen: boolean;
}
