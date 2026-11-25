# Changelog

## 1.0.45

### Added

- Choose folders directly in the planning map filter. Include Markdown tasks from that folder and descendants, including ordinary notes outside automatic map patterns.
- Match folder paths by their full prefix so similarly named neighboring folders stay excluded. Keep reads scoped to the selected folder and limit visible filter suggestions to 100.

## 1.0.44

### Added

- Configure the planning-list toolbar independently: always visible, visible on hover/focus, or hidden. A persistent menu button restores access to its display modes.
- Apply planning-toolbar preferences immediately to loaded list views without loading deferred tabs. Mobile retains its visible controls.

## 1.0.43

### Changed

- Highlight search matches in rendered Steps · Deadlines · QA labels while preserving Markdown links and formatting.
- Replace the diagonal open-node button with row hover feedback and direct row navigation. Keep text selection, link actions and keyboard Enter navigation available.

## 1.0.42

### Added

- Apply all three completed-task display modes to Deadlines: hidden, inline in date order, or a collapsible completed footer. Uncheck a completed deadline to return it to the active date list, with Undo/Redo preserved.

## 1.0.41

### Fixed

- Highlight every visible search match live while editing a node, including the search results list. Clear highlights when search closes or its query is cleared.
- Paint native-editor search matches using browser highlight ranges without changing CodeMirror DOM, draft text, selection or undo history. Provide a matching overlay for the text-editor fallback.
- Exclude live editor DOM from ordinary rendered-map text highlighting.

## 1.0.40

### Added

- Set embedded-note font size independently of ordinary map nodes and Obsidian’s global font. Apply the same size in preview and inline embedded-note editing; leave the field blank to follow the theme.
- Set a default maximum node height for horizontal and vertical maps. Short notes retain their natural height, long notes scroll, and device-local manual sizes take precedence. Blank restores automatic height.

## 1.0.39

### Added

- Resize individual nodes in horizontal and vertical maps by dragging their lower-right corner. Width reflows the content without scaling text; height limits long content with scrolling and shrinks naturally for short content.
- Save manual dimensions in device-local view state, preserving Markdown and synced files. Restore dimensions after reopening and keep them attached to node identities.
- Reset a manual size with a double click or Home on its handle; arrow keys adjust dimensions. Escape or pointer cancellation restores the previous size. Outline and Table retain their own layouts.

## 1.0.38

### Changed

- Create multiline embedded notes from one compact name-and-search prompt, with an editable generated filename and fuzzy suggestions for existing notes.
- Use the note filename as its embedded title, move the original node text into the new note without repeating it above the embed, and enter inline editing immediately. Preserve parent context when attaching an existing note.
- Open the same workflow directly from the embed toolbar button. Keep the ordinary link button separate.
- Offer multiline-note creation on Shift+Enter inside a regular node editor, ahead of the sibling shortcut. Cancel returns to the unchanged draft; normal multiline Enter remains native.

## 1.0.37

### Fixed

- Wrap long embedded-note titles within map nodes, including themes that normally keep embed titles on one line.
- Keep the embedded-note hover outline inside its frame, aligned with the existing leading border.

## 1.0.36

### Changed

- Select embedded-note nodes with a single click and edit the specific embedded note with a double click. Preserve native links and controls.
- Double-click embedded notes inside the native node editor to save the parent draft and switch to editing the embedded note. If saving fails, keep the parent draft open.

## 1.0.35

### Fixed

- Apply toolbar preferences immediately when background map tabs are deferred by Obsidian. Keep those tabs unloaded and apply the current preferences when they are activated.
- Refresh only loaded map and planning views during setting, draft and vault updates, avoiding calls to unavailable methods on deferred views.

## 1.0.34

### Fixed

- Open images and other non-Markdown attachments in their native viewers instead of forcing a Markdown editor, preventing binary attachments from being saved as text.
- Reject non-Markdown files at map opening, source mode, restored map state and guarded text writes, including queued writes.


## 1.0.33

### Fixed

- Treat automatic conversion from Markdown to map as the same native navigation visit. Back now returns to the previous file instead of reopening the current map after a native embedded-link jump; forward navigation is preserved.


## 1.0.32

### Changed

- Highlight editable embedded-note frames on hover and edit the selected frame in place. Keep the rest of the node visible and muted until editing ends.

### Fixed

- Focus the embedded-note editor rather than the entire surrounding node. Preserve the edited node position through save and subsequent preview layout instead of jumping to the top of a tall node.


## 1.0.31

### Changed

- Move the multiline-note button from the selected node corner to the node editing toolbar. Save the current draft before showing conversion and existing-note choices.
- Keep the embedded-note editing command in the command palette and remove its ambiguous node context-menu entry; click the embedded note frame to edit it directly.


## 1.0.30

### Added

- Choose how completed tasks appear in Steps: hidden, in a collapsible footer per map (default), or in their original order with muted text. Uncheck a completed task to restore it to the active list.
- Remember the chosen display mode with the queue tab state. Completed tasks retain conflict protection and queue Undo/Redo.


## 1.0.29

### Added

- Attach an existing Markdown note below the current node title, without modifying the attached file. Preserve children, anchors and Undo/Redo.
- A single corner button follows the selected node and offers conversion or choosing an existing note; it is hidden during editing and multiple selection.


## 1.0.28

### Added

- Convert a node into an embedded multiline note from its context menu or the command palette. Ask for a short title above the embed and move the original node text into a Markdown file next to the map.
- Keep children, block addresses, checkbox state, step numbers and deadlines in the map. Cancelling the title prompt creates no file; conflicting map edits prevent conversion.


## 1.0.27

### Changed

- Disable pattern syntax, map file patterns and the reset button while automatic map opening is off. Keep the saved patterns and restore the controls immediately when it is enabled.

## 1.0.26

### Added

- Edit embedded Markdown notes directly inside a map node with native Obsidian Live Preview. Enter inserts a new line; Ctrl/Cmd+Enter or the save button commits the note.
- Click an embedded note frame to edit that specific note, including nodes containing several embeds. Links and embedded controls retain their own actions.
- Preserve the parent map and its children, keep existing note line endings, and reject conflicting external edits. Cancelling a new note creates no file.

## 1.0.25

### Changed

- Group plugin settings into General, Opening notes, Planning lists, Map appearance, Navigation and Map hotkeys sections.

## 1.0.24

### Fixed

- Leave the new navigation-history shortcuts unassigned so they do not override existing branch collapse and expand shortcuts. History actions remain available in the map menu, command palette and map shortcut settings.

## 1.0.23

### Added

- Back and forward navigation now includes arrow selection and branch depth changes, with 30 in-memory view states.
- Use configurable Mod+Alt+Left and Mod+Alt+Right shortcuts, command-palette actions or the map menu to navigate view history.

## 1.0.22

### Fixed

- Defer and coalesce native draft layout until the current editor update has finished.
- Close stale autocomplete ranges before measuring the editor, preventing out-of-range position errors after text is shortened.
- Cancel queued native layout when a draft closes.

## 1.0.21

### Added

- Click a node address marker, or focus it and press Enter, to list incoming links and embedded references.
- Resolve references from Obsidian's metadata cache on demand, including same-note references and relative paths.
- Open a referring node in its map or source view and access address removal from the same menu.

## 1.0.20

### Added

- Remove a selected node's block address from its context menu or command palette after a warning.
- Restore the removed address with Undo. Confirmation defaults to Cancel and concurrent note changes prevent stale edits.

## 1.0.19

### Fixed

- Repeat the numbered-step command to remove a step number while keeping the task status, deadline, label and children. Repeat again to assign a new number.
- Apply the same numbering toggle to a selection in one undoable change.

## 1.0.18

### Fixed

- Confirm an empty new node to cancel its creation without writing a blank Markdown item.
- Clearing and confirming an existing leaf deletes it with Undo support and conflict checks.
- Clearing a parent retains its placeholder title and children.

## 1.0.17

### Added

- Optional device-local memory for the last note view, including manually opened Markdown maps. Keeps up to 500 map paths and follows renames and deletions.

### Fixed

- Automatic opening of matching notes takes priority over remembered Markdown when reopening a note.
- Explicit Open as Markdown remains active in the current tab.
- Links respect automatic opening and remembered map modes.

## 1.0.16

### Fixed

- Fit individual node widths in the vertical tree's column mode and align each generation below its tallest node.
- Rename the vertical layout to Tree.

## 1.0.15

### Fixed

- Start the planning queue with the current note and read only matching files.
- Apply map filters on Enter or when leaving the field. Clear the field for all maps, use glob patterns or /regular expressions/ to select groups.
- Ignore stale file reads when the queue filter changes.

## 1.0.14

### Fixed

- Render planning queue labels once and open their internal Markdown links relative to the source note.
- Allow selecting and copying queue text. Drag numbered steps using their reorder controls.
- Open a node by clicking its queue row while preserving text selection and interactive controls.
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
