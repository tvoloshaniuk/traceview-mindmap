# Changelog

## 1.0.13

### Added

- Return to previous or next locations after following a node link or search result. Restore selection and collapsed branches.
- Optionally use arrow keys to continue across branches.
- Copy a node's text from its menu, or move completed child branches to the bottom.
- Show a compact preview of embedded maps one level deep. Nested maps appear as links. Turn previews off in settings.
- Open image attachments directly from the map. Large embedded tables scroll within the node.
- Add touch momentum, colored highlights and desktop toolbar visibility modes.

## 1.0.12

### Added

- A vertical tree layout with orientation-aware arrow keys, creation handles, and drop targets.
- Write multiline text in an embedded Markdown note while keeping the node title and children in the map.

## 1.0.11

### Added

- Pan the map when dragging a branch near the viewport edge.
- Add task completion and deadline buttons to the mobile toolbar.
- Switch between the map and its Markdown in the same tab, following the selected node or cursor.

### Fixed

- Dropping onto a collapsed parent keeps it collapsed and avoids jumping to the moved branch.
- Place the caret inside a new highlight in the native node editor.
- Dim completed node text, including formatted content.

## 1.0.10

### Added

- Find text in the active draft, selected nodes, or the whole map. Highlight matching text within nodes.
- Use one touch selection rectangle at a time and keep the resulting selection. A second rectangle can add or remove nodes.
- Copy selected nodes without their descendants. Paste branches collapsed by default, with a setting to keep them expanded.
- Move selected sibling branches one place up or down while preserving their children and relative order.

## 1.0.9

### Added

- Editable map and branch exclusions for Steps, Deadlines and QA.
- Markdown labels, a deadline calendar, step number removal, and Undo/Redo in the planning queue.
- Reorder numbered steps with deadlines while preserving their dates.
- Use Home and End to select the first or last sibling. Press Right to return to the child you last left with Left.

### Fixed

- Saving a parent node with an empty title keeps its children and gives it a placeholder title.
- Step rows show a single completion checkbox.

## 1.0.8 — 2026-11-23

### Bug fixes

- Keep the node editor and its confirmation buttons above the on-screen keyboard by reserving space for the controls currently displayed.

## 1.0.7 — 2026-11-23

### New features

- Create the first node in an empty map using **Add first node**, the sibling toolbar button or Enter.
- Press **Shift+Enter** to add a sibling above the selected node.
- Use the toolbar or creation handles while editing to save the current node and begin the next child, parent or sibling.

### Bug fixes

- Keep the newly saved node selected, including when inserting above another node.
- Focus the editor before adjusting its position for the visible viewport.
- Keep the current draft open when saving fails during chained creation.

## 1.0.6 — 2026-11-23

### New features

- Recover unfinished node edits on Android using device-local storage.
- Offer a **Recover local draft** button on the affected map and a command to find saved drafts.
- Resume a saved draft when its original node still matches, or read and copy its text from the recovery dialog.
- Clear a draft after saving or explicitly discarding it. Draft recovery creates no additional Markdown notes.

## 1.0.5 — 2026-11-23

### Bug fixes

- Focus **Continue editing** in the discard confirmation. Accidentally pressing Escape followed by Enter now returns to the draft.

## 1.0.4 — 2026-11-23

### New features

- Insert a Templater or core Templates template at the source Markdown line of a selected map node.
- Choose a template from the node context menu or command palette, then return to the map after insertion.
- Support multiline template output as separate branches and undo a template insertion from the map.

### Bug fixes

- Preserve existing block IDs when a plain template appends text to the selected node.
- Preserve source line endings around template edits, including repeated invocations.
- Keep the filename field stable while it is being edited.

## 1.0.3 — 2026-11-14

### Bug fixes

- Restore native editor command focus for formatting shortcuts in node drafts.
- Reacquire the editor keyboard scope after focus returns, without stacking scopes.
- Remove generic Map and Node text hover tooltips while retaining accessible labels.

## Validation and known limitations

- Version 1.0.7 passed 156 automated tests with one environment-dependent test skipped, plus a desktop Obsidian check covering empty-map creation, native-editor Shift+Enter, chained child creation and the saved Markdown.
- Android draft recovery was exercised through the Android feature path in desktop Obsidian across a renderer restart. Physical Android keyboard and viewport behavior still require device verification.
- Multi-window checks covered three windows, four map views, alternating edits, concurrent edit conflicts, linked-note renaming and wheel events. An isolated renderer crash occurred during an earlier run and did not recur in subsequent checks. Its cause remains unresolved.
- Integration with Templater and the native Markdown editor uses internal Obsidian or plugin APIs with version compatibility limits.
