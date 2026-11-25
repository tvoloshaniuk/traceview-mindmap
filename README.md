# TraceView Mindmap

Edit Markdown notes as mind maps in Obsidian. Organize ideas into branches, break plans into steps, and follow links between notes and individual nodes.

By **tvoloshaniuk**. Available for desktop and mobile Obsidian.

![A Markdown note opened as a mind map, edited inline and returned to Markdown](media/markdown-editing.gif)

## License

Copyright (C) 2026 tvoloshaniuk. Original copyrightable project material is
licensed under **GNU GPL version 3 only**, with the **Obsidian Host Additional
Permission** for integration with an independently obtained Obsidian application.
See [LICENSING.md](LICENSING.md), [LICENSE](LICENSE) and
[OBSIDIAN-HOST-PERMISSION.md](OBSIDIAN-HOST-PERMISSION.md) for the complete terms.
Third-party notices and the scope of the licensing review are recorded in
[THIRD-PARTY-NOTICES.md](THIRD-PARTY-NOTICES.md) and [LICENSE-AUDIT.md](LICENSE-AUDIT.md).

## Getting started

1. Open a Markdown note containing headings or a nested list.
2. Run **TraceView Mindmap: Open current note as a map** from the command palette.
3. Select a node. Press **F2** to edit it, **Tab** to add a child, or **Enter** to add a sibling.
4. Use **Open source Markdown** to return to the note in the same tab.

For example, open this note as a map:

```markdown
---
mindmap: true
---
- Project
  - Research
    - [[Background]]
  - Delivery
    - [ ] #step 1) Draft the outline
    - [ ] #step 2) Review the result
```

## See it in action

### Plan with steps and deadlines

Choose a date in the calendar, then review and reorder numbered tasks with the up and down controls in the planning view. Step numbers update in the map too; branches keep their positions.

![Setting a deadline, reordering numbered tasks and checking their numbers in the map](media/planning.gif)

### Navigate and select nodes

Move between nodes and extend a selection across branches. Arrow keys navigate; Space folds or unfolds the selected branch.

![Moving between nodes and selecting multiple branches](media/navigation-selection.gif)

### Work in split panes

Open the same Markdown note in two map views. Saved edits in either pane appear in the other view.

![Editing one note from two split map views](media/split-view.gif)

### Transfer branches between files

Copy or cut a branch in one map, then paste it into another. Its child nodes travel with it, so you can reorganize ideas across Markdown notes.

![Copying and moving branches between two Markdown files in split panes](media/branch-transfer.gif)

### Follow links between maps and nodes

Obsidian's linked Local graph follows the active map. Copy a link to an individual node, insert it in another map, and follow it back to that node.

![Switching maps with Local graph and following a link to a specific node](media/linked-maps.gif)

### Screenshots

![A project broken into branches with links and numbered tasks](media/map-overview.png)

![The deadline calendar opened from a map node](media/deadline-calendar.png)

![Numbered steps collected in the planning view](media/steps-list.png)

![Two map views of the same Markdown note in split panes](media/split-view.png)

![A map alongside Obsidian's linked Local graph](media/local-graph.png)

## Editing and navigation

- Edit existing, child, sibling and parent nodes directly in the map. Enter saves, Escape cancels an unchanged draft or asks before discarding changes.
- Arrow keys navigate nodes. Space folds a branch. Folds, camera position and layout are remembered on each device.
- Copy, cut and paste entire branches. Undo and redo cover changes made during the current map session.
- Select multiple nodes using keyboard ranges, modified clicks or the selection tool. Move branches together with their children.
- On desktop, drag a branch by holding the second press of a double-click. On touch screens, hold a node before dragging. The target indicator shows insertion before, after or inside a node.
- Create nodes using the handles around a selected node on mobile. Desktop handles are optional under Advanced options. Pan and zoom while editing.
- Search within a map, including collapsed branches. Confirm a result to navigate to it.
- Switch between horizontal map, vertical Tree, outline and table layouts and choose how node widths are calculated.

Configure shortcuts in the plugin settings. Standard text editing shortcuts apply while entering node text.

## Links, attachments and planning

Use Obsidian links, aliases and links to notes that have not been created yet. **Copy link to node** creates a block address when needed. Links such as `[[Plan#^node-id]]` can open a specific node, unfolding its ancestor path while preserving neighbouring branches.

The native node editor provides Obsidian Live Preview and suggestions. A text editor is also available. Paste clipboard images while editing, or use the mobile attachment toolbar. Image files are stored as vault attachments.

Double-click an embedded Markdown note to edit that note in place. Enter inserts a new line; Ctrl/Cmd+Enter saves. Use the multiline-note button in the node editor to choose an existing note or accept an editable generated filename for a new one. Double-click an image to open the native fullscreen viewer in supported Obsidian versions while keeping the map open.

Drag a node's lower-right corner to change its width and maximum height. Short content uses its natural height; longer content scrolls. Double-click the corner to reset. Sizes stay local to each device. **Map appearance** settings provide an embedded-note font size and a default maximum node height. Hover a selected overflowing node to scroll its content; otherwise the gesture pans the map.

The **Steps, deadlines and QA** command opens a planning view, initially scoped to the current note. Filter by map, folder path, glob, regular expression or task text. Choose how completed tasks appear, adjust dates, and use Undo/Redo. Configure open, open/total, completed/total or total counts under **Planning lists**; count sorting is shared by map headings and picker suggestions.

Select list items with Ctrl/Cmd-click, Shift ranges or the selection mode button. Shift-drag on list whitespace draws a rectangle; after the rectangle the mode switches off and the selection remains. Apply completion or remove step numbers to the selection. Drag numbered steps by their handles or use Ctrl/Cmd+Shift+Up/Down to change execution order within their map. Multi-map bulk actions retain an undo entry per changed note.

HTML and SVG exports are available from the map actions menu. HTML exports include a folding outline and retain Markdown labels.

## Automatic opening

Enable **Automatically open matching notes as maps** in settings. Filename recognition defaults to:

```text
*.mindmap.md
🎯*.md
```

Choose glob or regex, with one pattern per line. Any matching rule qualifies the note.

- A glob without `/` matches file names in any folder. A glob containing `/` matches the path relative to the vault.
- `*` matches within a path segment, `**` spans folders and `?` matches one character. For example, `Plans/**/*.md` includes Markdown files directly in Plans and its subfolders.
- Regex rules match vault-relative paths. Enter the expression without surrounding `/` delimiters.
- Matching ignores case and applies to Markdown files. Synchronization-conflict copies are excluded.

The `mindmap: true` property also identifies a map. Invalid patterns keep the last saved rules active. Automatic opening, map search and planning lists share these rules. Explicitly opening source Markdown keeps that note in Markdown mode until you choose to open it as a map again.

The pattern field uses the full settings width. **Restore default patterns** resets the filename rules and switches their syntax to glob. **Restore default settings** at the top of the settings page resets all plugin preferences and custom shortcuts after confirmation. Local view states and saved notes are retained. Restart Obsidian to apply a reset language preference.

## Languages

English, Ukrainian, Russian, Polish, German, Spanish, French, Brazilian Portuguese, Simplified Chinese, Japanese and Korean are included. **Automatic (Obsidian)** follows the app language, with English fallback. Restart Obsidian after changing the language setting.

Language dictionaries are in `src/locales`. Initial translations welcome review by native speakers.

## Installation and building

For a manual installation, copy the contents of `release/traceview-mindmap/`, including its licensing documents, into `<vault>/.obsidian/plugins/traceview-mindmap/`, then enable **TraceView Mindmap** in Community plugins. For upgrades, replace the packaged files and keep `data.json`. The three runtime files are `main.js`, `manifest.json` and `styles.css`; licensing text also accompanies `main.js` for Community directory installations.

To build from source with Node.js and npm:

```sh
npm ci
npm run package
npm test
```

Installable files are written to `release/traceview-mindmap/`. The minimum declared Obsidian version is 1.8.7.

`npm run audit:licenses` reproduces the build composition and notice checks. When distributing compiled releases, provide their complete Corresponding Source and build scripts at the matching source tag with equivalent access alongside the binaries.

## Current limitations

- Structural editing preserves Markdown heading and list semantics. Operations that would discard paragraphs, code blocks or ambiguous mixed structure require editing source Markdown.
- Ordinary node labels remain single-line to preserve list structure. Multiline editing uses embedded Markdown notes.
- Undo history does not survive an app restart. Android has device-local draft recovery; save edits explicitly when finished.
- Native editing uses an internal Obsidian editor implementation. If unavailable, the plugin falls back to text input. Commands requiring a complete Markdown view should be run in source Markdown.
- The stored deadline marker currently uses the literal `до`, independently of the interface language. Use **Set date** to manage it.
- An empty note needs an initial heading or list item in source Markdown before map editing.
- Large restored maps on Windows wait for a quiet startup period before rendering. **Open now** bypasses that wait.
- Desktop integration has been checked with Obsidian 1.15.1. Physical Android verification and native-speaker translation review remain manual.

## Data

Edits are stored in the original Markdown file. View state is stored locally per vault and device. The plugin does not add analytics or make its own network requests. Obsidian and other enabled plugins can render linked or embedded content using their own behaviour.
