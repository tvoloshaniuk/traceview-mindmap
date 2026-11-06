"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => TraceViewMindmap
});
module.exports = __toCommonJS(main_exports);

// src/locales/en.json
var en_default = {
  "A node with its own Markdown line is required.": "A node with its own Markdown line is required.",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "This block ID is duplicated. Fix it in the source Markdown before copying the address.",
  "A unique block ID is required.": "A unique block ID is required.",
  "The selection changed. Run the command again.": "The selection changed. Run the command again.",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "Cannot move a branch into itself, a descendant or an incompatible Markdown node.",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.",
  "Sibling above": "Sibling above",
  "Sibling below": "Sibling below",
  "Child node": "Child node",
  "Parent node": "Parent node",
  "Find a map\u2026": "Find a map\u2026",
  "Note name, alias or new link\u2026": "Note name, alias or new link\u2026",
  select: "select",
  "insert link": "insert link",
  "return to node": "return to node",
  "file not created yet": "file not created yet",
  "new link": "new link",
  "Insert a link without creating a file": "Insert a link without creating a file",
  "The file changed or was deleted. Search again.": "The file changed or was deleted. Search again.",
  "Link (Ctrl+K)": "Link (Ctrl+K)",
  "Highlight text": "Highlight text",
  "Mark as question": "Mark as question",
  "Step deadline": "Step deadline",
  Date: "Date",
  " Unknown deadline (?)": " Unknown deadline (?)",
  "Previous month": "Previous month",
  "Next month": "Next month",
  Mon: "Mon",
  Tue: "Tue",
  Wed: "Wed",
  Thu: "Thu",
  Fri: "Fri",
  Sat: "Sat",
  Sun: "Sun",
  Cancel: "Cancel",
  Save: "Save",
  "Enter to save, Esc to cancel.": "Enter to save, Esc to cancel.",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Enter to confirm, Esc to cancel.",
  "Delete branch": "Delete branch",
  "Extend selection up": "Extend selection up",
  "Extend selection down": "Extend selection down",
  "Extend selection to parent": "Extend selection to parent",
  "Extend selection to child": "Extend selection to child",
  "Select all visible nodes": "Select all visible nodes",
  "Cut branch": "Cut branch",
  "Copy link to node": "Copy link to node",
  "Copy branch": "Copy branch",
  "Paste as child branch": "Paste as child branch",
  "Paste branch after node": "Paste branch after node",
  Undo: "Undo",
  Redo: "Redo",
  "Edit node": "Edit node",
  "Add child node": "Add child node",
  "Add parent node": "Add parent node",
  "Add sibling above": "Add sibling above",
  "Add sibling node": "Add sibling node",
  "Move branch up": "Move branch up",
  "Move branch down": "Move branch down",
  "Make child of previous node": "Make child of previous node",
  "Move up one level": "Move up one level",
  "Toggle completion": "Toggle completion",
  "Make numbered step": "Make numbered step",
  "Set date": "Set date",
  "Open source Markdown": "Open source Markdown",
  "Select parent node": "Select parent node",
  "Select child node": "Select child node",
  "Select previous sibling": "Select previous sibling",
  "Select next sibling": "Select next sibling",
  "Select first node": "Select first node",
  "Select last node": "Select last node",
  "Collapse / expand node": "Collapse / expand node",
  "Collapse all roots": "Collapse all roots",
  "Collapse selected branch": "Collapse selected branch",
  "Expand selected branch": "Expand selected branch",
  "Selected node only": "Selected node only",
  "Show one child level": "Show one child level",
  "Show two child levels": "Show two child levels",
  "Show three child levels": "Show three child levels",
  "Show four child levels": "Show four child levels",
  "Show five child levels": "Show five child levels",
  "Expand all child levels": "Expand all child levels",
  "Find in map": "Find in map",
  "Fit map": "Fit map",
  "Specify a key after the modifiers.": "Specify a key after the modifiers.",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "Modifiers: Ctrl, Alt, Shift, Meta or Mod.",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "Do not repeat modifiers. Mod already means Ctrl or Cmd.",
  "This image format is not supported.": "This image format is not supported.",
  "The clipboard image is empty.": "The clipboard image is empty.",
  "Could not save the attachment.": "Could not save the attachment.",
  "Saving image\u2026": "Saving image\u2026",
  "Node text": "Node text",
  "Save (Enter)": "Save (Enter)",
  "Cancel (Escape)": "Cancel (Escape)",
  "Close the editor and discard your changes?": "Close the editor and discard your changes?",
  "Continue editing": "Continue editing",
  "Discard changes": "Discard changes",
  "A node cannot be empty.": "A node cannot be empty.",
  "Multiple cursors are available in source Markdown.": "Multiple cursors are available in source Markdown.",
  "This command requires the source Markdown editor.": "This command requires the source Markdown editor.",
  "Fixed width": "Fixed width",
  "Fit node content": "Fit node content",
  "Fit visible column": "Fit visible column",
  "TraceView Mindmap: open map": "TraceView Mindmap: open map",
  "Open current note as a map": "Open current note as a map",
  "Open map at the Markdown cursor": "Open map at the Markdown cursor",
  "Find a map": "Find a map",
  "Create a simple tree": "Create a simple tree",
  "Create a vector (separate template)": "Create a vector (separate template)",
  "Steps, deadlines and QA": "Steps, deadlines and QA",
  "Mark as atomic step": "Mark as atomic step",
  "Add step deadline": "Add step deadline",
  "Mark as QA": "Mark as QA",
  "Toggle step completion": "Toggle step completion",
  "Paste as sibling branch": "Paste as sibling branch",
  "Undo map change": "Undo map change",
  "Redo map change": "Redo map change",
  "Insert QA in Markdown editor": "Insert QA in Markdown editor",
  "Insert unnumbered step in Markdown editor": "Insert unnumbered step in Markdown editor",
  "Open map at this node": "Open map at this node",
  "Open in TraceView Mindmap": "Open in TraceView Mindmap",
  "The note changed. Open it again at the current line.": "The note changed. Open it again at the current line.",
  "Save or cancel the node draft.": "Save or cancel the node draft.",
  "New vector name": "New vector name",
  "New tree name": "New tree name",
  "Use a name without path characters.": "Use a name without path characters.",
  "A file with this name already exists.": "A file with this name already exists.",
  "The Markdown editor has newer text. Wait for it to save and try again.": "The Markdown editor has newer text. Wait for it to save and try again.",
  "Branch copied": "Branch copied",
  "Branch saved to the plugin clipboard": "Branch saved to the plugin clipboard",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.",
  "Save or cancel the node draft before navigating.": "Save or cancel the node draft before navigating.",
  "Waiting for Obsidian to be ready\u2026": "Waiting for Obsidian to be ready\u2026",
  "Wait for Obsidian to load, then open the map.": "Wait for Obsidian to load, then open the map.",
  "This address is duplicated. Fix the block ID in Markdown.": "This address is duplicated. Fix the block ID in Markdown.",
  "The linked node was not found.": "The linked node was not found.",
  "Collapse levels": "Collapse levels",
  "Delete selected branch": "Delete selected branch",
  "Sibling node": "Sibling node",
  Edit: "Edit",
  "Multiple selection: taps or rectangle": "Multiple selection: taps or rectangle",
  Search: "Search",
  "Layout and node width": "Layout and node width",
  "Map actions": "Map actions",
  "Open now": "Open now",
  Map: "Map",
  Outline: "Outline",
  Table: "Table",
  "Expand entire map": "Expand entire map",
  "All child levels": "All child levels",
  "The map will open after the workspace loads\u2026": "The map will open after the workspace loads\u2026",
  "File missing or deleted. Open another map.": "File missing or deleted. Open another map.",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.",
  "The file no longer exists.": "The file no longer exists.",
  "Select a map node first": "Select a map node first",
  "Another map is open. The selection was copied, but not cut.": "Another map is open. The selection was copied, but not cut.",
  "This command requires one selected node.": "This command requires one selected node.",
  "The map was closed or renamed. Copy the address again.": "The map was closed or renamed. Copy the address again.",
  "Node link copied.": "Node link copied.",
  "Another map is open. The branch was copied, but not cut.": "Another map is open. The branch was copied, but not cut.",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "Branch cut. Ctrl+V to paste, Undo to restore.",
  "The note was renamed. Copy the draft and reopen the editor.": "The note was renamed. Copy the draft and reopen the editor.",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "The map changed externally. Your draft is preserved. Copy it before editing again.",
  "The node no longer exists. Your draft is preserved.": "The node no longer exists. Your draft is preserved.",
  "Steps \xB7 Deadlines \xB7 QA": "Steps \xB7 Deadlines \xB7 QA",
  "Step deadline\u2026": "Step deadline\u2026",
  "Completed / incomplete": "Completed / incomplete",
  "Move up": "Move up",
  "Move down": "Move down",
  "Nest in previous branch": "Nest in previous branch",
  "Open text in editor": "Open text in editor",
  "Delete branch\u2026": "Delete branch\u2026",
  "Export HTML\u2026": "Export HTML\u2026",
  "Export SVG\u2026": "Export SVG\u2026",
  "Paste branch text\u2026": "Paste branch text\u2026",
  "Paste child Markdown branch": "Paste child Markdown branch",
  "Renumber steps": "Renumber steps",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "The target map changed. Reopen link suggestions. Your draft is preserved.",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "This block is not a separate map node. Use \u201CCopy link to node\u201D.",
  "Native editor unavailable. Using text input. ": "Native editor unavailable. Using text input. ",
  "The note does not exist.": "The note does not exist.",
  "File already exists. Choose another name.": "File already exists. Choose another name.",
  Steps: "Steps",
  Deadlines: "Deadlines",
  "Open QA": "Open QA",
  Refresh: "Refresh",
  "Collapse all": "Collapse all",
  "Expand all": "Expand all",
  "Search steps": "Search steps",
  "Find\u2026": "Find\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.",
  Expand: "Expand",
  Collapse: "Collapse",
  "No open items match this filter.": "No open items match this filter.",
  "Mark completed": "Mark completed",
  "Move earlier in execution order": "Move earlier in execution order",
  "Move later in execution order": "Move later in execution order",
  "Deadline ?": "Deadline ?",
  "Node editor": "Node editor",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.",
  "Native Obsidian": "Native Obsidian",
  "Text input": "Text input",
  "Automatically restore large maps": "Automatically restore large maps",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.",
  "Hide frozen steps": "Hide frozen steps",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.",
  "Left arrow collapses the branch first": "Left arrow collapses the branch first",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.",
  "Show [ ] in list text": "Show [ ] in list text",
  "Show #step in list text": "Show #step in list text",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.",
  "Map node width": "Map node width",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "Applies immediately to all open maps. Outline and Table keep their own widths.",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.",
  "Map hotkeys": "Map hotkeys",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.",
  Unassigned: "Unassigned",
  "Record shortcut": "Record shortcut",
  Disable: "Disable",
  "Default shortcuts": "Default shortcuts",
  "Search map\u2026": "Search map\u2026",
  "Search map": "Search map",
  " A\u2013Z": " A\u2013Z",
  "Close search": "Close search",
  "Search results": "Search results",
  "No results": "No results",
  "This Obsidian version has no compatible native editor.": "This Obsidian version has no compatible native editor.",
  "Could not prepare the native editor.": "Could not prepare the native editor.",
  "The native editor cannot protect a single-line draft.": "The native editor cannot protect a single-line draft.",
  "Native Obsidian link": "Native Obsidian link",
  "Map filter": "Map filter",
  "All maps": "All maps",
  Maps: "Maps",
  "No maps match this search.": "No maps match this search.",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "The note changed in another window or device. The map was refreshed. Retry on the latest text.",
  "History stopped because the text changed externally. Undo will preserve those changes.": "History stopped because the text changed externally. Undo will preserve those changes.",
  "Loading map\u2026": "Loading map\u2026",
  "Node address: ^": "Node address: ^",
  "Branch ready to move": "Branch ready to move",
  "Before: ": "Before: ",
  "After: ": "After: ",
  "As children: ": "As children: ",
  "Expand node": "Expand node",
  "Collapse node": "Collapse node",
  "Collapse branch": "Collapse branch",
  "Expand branch": "Expand branch",
  "Paste after node": "Paste after node",
  Language: "Language",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "Automatic follows Obsidian. Restart Obsidian to apply a language change.",
  "Automatic (Obsidian)": "Automatic (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "Language saved. Restart Obsidian to apply it.",
  "Selected nodes: {count}": "Selected nodes: {count}",
  "Child levels: {count}": "Child levels: {count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "Nodes: {nodes} \xB7 Open steps: {steps}",
  "Export {format} \u2014 file name": "Export {format} \u2014 file name",
  "Saved {path}": "Saved {path}",
  "Expand map: {name}": "Expand map: {name}",
  "Collapse map: {name}": "Collapse map: {name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.",
  "Next action": "Next action",
  "First action": "First action",
  "Active now": "Active now",
  "Frozen / someday": "Frozen / someday",
  "First step": "First step",
  "{path} \xB7 References: {count}": "{path} \xB7 References: {count}",
  "Attachment saved, but the editor is already closed: {link}": "Attachment saved, but the editor is already closed: {link}",
  "Copy selection": "Copy selection",
  "Cut selection": "Cut selection",
  "Delete selection": "Delete selection",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.",
  "This map contains no outline nodes.": "This map contains no outline nodes.",
  "This node no longer exists. Reopen the map and try again.": "This node no longer exists. Reopen the map and try again.",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "A map node must fit on one line. Use a child node or a linked note for more text.",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown supports at most six heading levels. Add a bullet child in source view.",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "This branch uses ambiguous indentation. Adjust it in source view before moving it.",
  "That move would exceed Markdown\u2019s six heading levels.": "That move would exceed Markdown\u2019s six heading levels.",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.",
  "A branch cannot be moved into itself or one of its descendants.": "A branch cannot be moved into itself or one of its descendants.",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "A Markdown heading cannot become a bullet child. Change its format in source view first.",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.",
  "Paste an outline branch, or paste one line as a new node.": "Paste an outline branch, or paste one line as a new node.",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "The clipboard contains content outside the outline. Paste it in source view to preserve it.",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.",
  "That calendar date does not exist.": "That calendar date does not exist.",
  "The execution order contains the same step twice.": "The execution order contains the same step twice.",
  "Only numbered, undated steps can be placed in an execution order.": "Only numbered, undated steps can be placed in an execution order.",
  Untitled: "Untitled",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "This map has no nodes. Open the source and add a heading or bullet to begin.",
  "Mark incomplete": "Mark incomplete",
  "Invalid saved map patterns. Default patterns are active.": "Invalid saved map patterns. Default patterns are active.",
  "Automatically open matching notes as maps": "Automatically open matching notes as maps",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.",
  "Invalid pattern on line {line}: {error}": "Invalid pattern on line {line}: {error}",
  "Patterns saved.": "Patterns saved.",
  "Pattern syntax": "Pattern syntax",
  "Glob (wildcards)": "Glob (wildcards)",
  "Regular expressions": "Regular expressions",
  "Map file patterns": "Map file patterns",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.",
  "This JSON map format is not supported.": "This JSON map format is not supported.",
  "Restore default patterns": "Restore default patterns",
  "Restore default settings": "Restore default settings",
  "Restore defaults": "Restore defaults",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.",
  "Default settings restored. Restart Obsidian to apply the language.": "Default settings restored. Restart Obsidian to apply the language."
};

// src/locales/uk.json
var uk_default = {
  "A node with its own Markdown line is required.": "\u041F\u043E\u0442\u0440\u0456\u0431\u0435\u043D \u0432\u0443\u0437\u043E\u043B \u0456\u0437 \u0432\u043B\u0430\u0441\u043D\u0438\u043C Markdown-\u0440\u044F\u0434\u043A\u043E\u043C.",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "\u0426\u0435\u0439 block ID \u043F\u043E\u0432\u0442\u043E\u0440\u044E\u0454\u0442\u044C\u0441\u044F \u0443 \u043A\u0430\u0440\u0442\u0456. \u0423\u0441\u0443\u043D\u044C \u0434\u0443\u0431\u043B\u044C \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u043C\u0443 Markdown \u043F\u0435\u0440\u0435\u0434 \u043A\u043E\u043F\u0456\u044E\u0432\u0430\u043D\u043D\u044F\u043C \u0430\u0434\u0440\u0435\u0441\u0438.",
  "A unique block ID is required.": "\u041F\u043E\u0442\u0440\u0456\u0431\u0435\u043D \u0443\u043D\u0456\u043A\u0430\u043B\u044C\u043D\u0438\u0439 block ID.",
  "The selection changed. Run the command again.": "\u0412\u0438\u0431\u0456\u0440\u043A\u0430 \u0437\u043C\u0456\u043D\u0438\u043B\u0430\u0441\u044F. \u041F\u043E\u0432\u0442\u043E\u0440\u0438 \u043A\u043E\u043C\u0430\u043D\u0434\u0443.",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "\u041D\u0435 \u043C\u043E\u0436\u043D\u0430 \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0433\u0456\u043B\u043A\u0443 \u0432 \u0441\u0435\u0431\u0435, \u0441\u0432\u043E\u0433\u043E \u043D\u0430\u0449\u0430\u0434\u043A\u0430 \u0430\u0431\u043E \u043D\u0435\u0441\u0443\u043C\u0456\u0441\u043D\u0438\u0439 Markdown-\u0432\u0443\u0437\u043E\u043B.",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "\u041F\u0456\u0441\u043B\u044F \u043F\u0456\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 bullet \u043D\u0430\u043B\u0435\u0436\u0430\u0442\u0438\u043C\u0435 \u0439\u043E\u043C\u0443. \u041E\u0431\u0435\u0440\u0438 bullet-\u0431\u0430\u0442\u044C\u043A\u0430 \u0430\u0431\u043E \u0437\u043C\u0456\u043D\u0438 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0432 Markdown.",
  "Sibling above": "\u0421\u0443\u0441\u0456\u0434 \u0432\u0438\u0449\u0435",
  "Sibling below": "\u0421\u0443\u0441\u0456\u0434 \u043D\u0438\u0436\u0447\u0435",
  "Child node": "\u0414\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Parent node": "\u0411\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Find a map\u2026": "\u0417\u043D\u0430\u0439\u0442\u0438 \u043A\u0430\u0440\u0442\u0443\u2026",
  "Note name, alias or new link\u2026": "\u041D\u0430\u0437\u0432\u0430 \u043D\u043E\u0442\u0430\u0442\u043A\u0438, alias \u0430\u0431\u043E \u043D\u043E\u0432\u0435 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F\u2026",
  select: "\u043E\u0431\u0440\u0430\u0442\u0438",
  "insert link": "\u0432\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F",
  "return to node": "\u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438\u0441\u044F \u0434\u043E \u0432\u0443\u0437\u043B\u0430",
  "file not created yet": "\u0449\u0435 \u043D\u0435\u043C\u0430\u0454 \u0444\u0430\u0439\u043B\u0443",
  "new link": "\u043D\u043E\u0432\u0435 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F",
  "Insert a link without creating a file": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F; \u0444\u0430\u0439\u043B \u0437\u0430\u0440\u0430\u0437 \u043D\u0435 \u0441\u0442\u0432\u043E\u0440\u044E\u0454\u0442\u044C\u0441\u044F",
  "The file changed or was deleted. Search again.": "\u0424\u0430\u0439\u043B \u0437\u043C\u0456\u043D\u0438\u0432\u0441\u044F \u0430\u0431\u043E \u0431\u0443\u0432 \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u0438\u0439. \u0412\u0456\u0434\u043A\u0440\u0438\u0439 \u043F\u043E\u0448\u0443\u043A \u0449\u0435 \u0440\u0430\u0437.",
  "Link (Ctrl+K)": "\u041F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F (Ctrl+K)",
  "Highlight text": "\u0412\u0438\u0434\u0456\u043B\u0438\u0442\u0438 \u0442\u0435\u043A\u0441\u0442",
  "Mark as question": "\u041F\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u0438 \u044F\u043A \u043F\u0438\u0442\u0430\u043D\u043D\u044F",
  "Step deadline": "\u0421\u0442\u0440\u043E\u043A \u043A\u0440\u043E\u043A\u0443",
  Date: "\u0414\u0430\u0442\u0430",
  " Unknown deadline (?)": " \u041D\u0435\u0432\u0456\u0434\u043E\u043C\u0438\u0439 \u0441\u0442\u0440\u043E\u043A (?)",
  "Previous month": "\u041F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u0439 \u043C\u0456\u0441\u044F\u0446\u044C",
  "Next month": "\u041D\u0430\u0441\u0442\u0443\u043F\u043D\u0438\u0439 \u043C\u0456\u0441\u044F\u0446\u044C",
  Mon: "\u041F\u043D",
  Tue: "\u0412\u0442",
  Wed: "\u0421\u0440",
  Thu: "\u0427\u0442",
  Fri: "\u041F\u0442",
  Sat: "\u0421\u0431",
  Sun: "\u041D\u0434",
  Cancel: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438",
  Save: "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438",
  "Enter to save, Esc to cancel.": "Enter \u2014 \u0437\u0431\u0435\u0440\u0435\u0433\u0442\u0438, Esc \u2014 \u0441\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438.",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Enter \u2014 \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438, Esc \u2014 \u0441\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438.",
  "Delete branch": "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0433\u0456\u043B\u043A\u0443",
  "Extend selection up": "\u0420\u043E\u0437\u0448\u0438\u0440\u0438\u0442\u0438 \u0432\u0438\u0431\u0456\u0440 \u0443\u0433\u043E\u0440\u0443",
  "Extend selection down": "\u0420\u043E\u0437\u0448\u0438\u0440\u0438\u0442\u0438 \u0432\u0438\u0431\u0456\u0440 \u0443\u043D\u0438\u0437",
  "Extend selection to parent": "\u0420\u043E\u0437\u0448\u0438\u0440\u0438\u0442\u0438 \u0432\u0438\u0431\u0456\u0440 \u0434\u043E \u0431\u0430\u0442\u044C\u043A\u0430",
  "Extend selection to child": "\u0420\u043E\u0437\u0448\u0438\u0440\u0438\u0442\u0438 \u0432\u0438\u0431\u0456\u0440 \u0434\u043E \u0434\u0438\u0442\u0438\u043D\u0438",
  "Select all visible nodes": "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0432\u0441\u0456 \u0432\u0438\u0434\u0438\u043C\u0456 \u0432\u0443\u0437\u043B\u0438",
  "Cut branch": "\u0412\u0438\u0440\u0456\u0437\u0430\u0442\u0438 \u0433\u0456\u043B\u043A\u0443",
  "Copy link to node": "\u041A\u043E\u043F\u0456\u044E\u0432\u0430\u0442\u0438 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u043D\u0430 \u0432\u0443\u0437\u043E\u043B",
  "Copy branch": "\u041A\u043E\u043F\u0456\u044E\u0432\u0430\u0442\u0438 \u0433\u0456\u043B\u043A\u0443",
  "Paste as child branch": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u044E \u0433\u0456\u043B\u043A\u0443",
  "Paste branch after node": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0433\u0456\u043B\u043A\u0443 \u043F\u0456\u0441\u043B\u044F \u0432\u0443\u0437\u043B\u0430",
  Undo: "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438 \u0437\u043C\u0456\u043D\u0443",
  Redo: "\u041F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438 \u0437\u043C\u0456\u043D\u0443",
  "Edit node": "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438 \u0432\u0443\u0437\u043E\u043B",
  "Add child node": "\u0414\u043E\u0434\u0430\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Add parent node": "\u0414\u043E\u0434\u0430\u0442\u0438 \u0431\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Add sibling above": "\u0414\u043E\u0434\u0430\u0442\u0438 \u0441\u0443\u0441\u0456\u0434\u043D\u0456\u0439 \u0432\u0443\u0437\u043E\u043B \u0432\u0438\u0449\u0435",
  "Add sibling node": "\u0414\u043E\u0434\u0430\u0442\u0438 \u0441\u0443\u0441\u0456\u0434\u043D\u0456\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Move branch up": "\u041F\u0435\u0440\u0435\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u0433\u0456\u043B\u043A\u0443 \u0432\u0438\u0449\u0435",
  "Move branch down": "\u041F\u0435\u0440\u0435\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u0433\u0456\u043B\u043A\u0443 \u043D\u0438\u0436\u0447\u0435",
  "Make child of previous node": "\u0417\u0440\u043E\u0431\u0438\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u043C \u0434\u043E \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044C\u043E\u0433\u043E",
  "Move up one level": "\u041F\u0456\u0434\u043D\u044F\u0442\u0438 \u043D\u0430 \u0440\u0456\u0432\u0435\u043D\u044C",
  "Toggle completion": "\u041F\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u0438 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F",
  "Make numbered step": "\u0417\u0440\u043E\u0431\u0438\u0442\u0438 \u043D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u0438\u043C \u043A\u0440\u043E\u043A\u043E\u043C",
  "Set date": "\u0412\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u0438 \u0434\u0430\u0442\u0443",
  "Open source Markdown": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0432\u0438\u0445\u0456\u0434\u043D\u0438\u0439 Markdown",
  "Select parent node": "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0431\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Select child node": "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Select previous sibling": "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u0456\u0439 \u0441\u0443\u0441\u0456\u0434\u043D\u0456\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Select next sibling": "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u0438\u0439 \u0441\u0443\u0441\u0456\u0434\u043D\u0456\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Select first node": "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043F\u0435\u0440\u0448\u0438\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Select last node": "\u0412\u0438\u0431\u0440\u0430\u0442\u0438 \u043E\u0441\u0442\u0430\u043D\u043D\u0456\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Collapse / expand node": "\u0417\u0433\u043E\u0440\u043D\u0443\u0442\u0438 / \u0440\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0443\u0437\u043E\u043B",
  "Collapse all roots": "\u0417\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0441\u0456 \u043A\u043E\u0440\u0435\u043D\u0456",
  "Collapse selected branch": "\u0417\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0441\u044E \u0432\u0438\u0431\u0440\u0430\u043D\u0443 \u0433\u0456\u043B\u043A\u0443",
  "Expand selected branch": "\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0441\u044E \u0432\u0438\u0431\u0440\u0430\u043D\u0443 \u0433\u0456\u043B\u043A\u0443",
  "Selected node only": "\u041B\u0438\u0448\u0435 \u0432\u0438\u0431\u0440\u0430\u043D\u0438\u0439 \u0432\u0443\u0437\u043E\u043B",
  "Show one child level": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u043E\u0434\u0438\u043D \u0440\u0456\u0432\u0435\u043D\u044C \u043D\u0430\u0449\u0430\u0434\u043A\u0456\u0432",
  "Show two child levels": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0434\u0432\u0430 \u0440\u0456\u0432\u043D\u0456 \u043D\u0430\u0449\u0430\u0434\u043A\u0456\u0432",
  "Show three child levels": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0442\u0440\u0438 \u0440\u0456\u0432\u043D\u0456 \u043D\u0430\u0449\u0430\u0434\u043A\u0456\u0432",
  "Show four child levels": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u0447\u043E\u0442\u0438\u0440\u0438 \u0440\u0456\u0432\u043D\u0456 \u043D\u0430\u0449\u0430\u0434\u043A\u0456\u0432",
  "Show five child levels": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u0438 \u043F\u2019\u044F\u0442\u044C \u0440\u0456\u0432\u043D\u0456\u0432 \u043D\u0430\u0449\u0430\u0434\u043A\u0456\u0432",
  "Expand all child levels": "\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0441\u0456 \u0440\u0456\u0432\u043D\u0456 \u043D\u0430\u0449\u0430\u0434\u043A\u0456\u0432",
  "Find in map": "\u0417\u043D\u0430\u0439\u0442\u0438 \u0432 \u043A\u0430\u0440\u0442\u0456",
  "Fit map": "\u0412\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u043A\u0430\u0440\u0442\u0443",
  "Specify a key after the modifiers.": "\u0412\u043A\u0430\u0436\u0456\u0442\u044C \u043A\u043B\u0430\u0432\u0456\u0448\u0443 \u043F\u0456\u0441\u043B\u044F \u043C\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0456\u0432.",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "\u041C\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0438: Ctrl, Alt, Shift, Meta \u0430\u0431\u043E Mod.",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "\u041D\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u044E\u0439\u0442\u0435 \u043C\u043E\u0434\u0438\u0444\u0456\u043A\u0430\u0442\u043E\u0440\u0438; Mod \u0443\u0436\u0435 \u043E\u0437\u043D\u0430\u0447\u0430\u0454 Ctrl \u0430\u0431\u043E Cmd.",
  "This image format is not supported.": "\u0426\u0435\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u044C\u0441\u044F.",
  "The clipboard image is empty.": "\u0423 \u0431\u0443\u0444\u0435\u0440\u0456 \u043F\u043E\u0440\u043E\u0436\u043D\u0454 \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F.",
  "Could not save the attachment.": "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u0437\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0432\u043A\u043B\u0430\u0434\u0435\u043D\u043D\u044F.",
  "Saving image\u2026": "\u0417\u0431\u0435\u0440\u0456\u0433\u0430\u044E \u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F\u2026",
  "Node text": "\u0422\u0435\u043A\u0441\u0442 \u0432\u0443\u0437\u043B\u0430",
  "Save (Enter)": "\u0417\u0431\u0435\u0440\u0435\u0433\u0442\u0438 (Enter)",
  "Cancel (Escape)": "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438 (Escape)",
  "Close the editor and discard your changes?": "\u0427\u0438 \u0442\u043E\u0447\u043D\u043E \u0437\u0430\u043A\u0440\u0438\u0442\u0438 \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F? \u0417\u043C\u0456\u043D\u0438 \u0431\u0443\u0434\u0443\u0442\u044C \u0432\u0442\u0440\u0430\u0447\u0435\u043D\u0456!",
  "Continue editing": "\u041F\u0440\u043E\u0434\u043E\u0432\u0436\u0438\u0442\u0438",
  "Discard changes": "\u0412\u0456\u0434\u043A\u0438\u043D\u0443\u0442\u0438 \u0437\u043C\u0456\u043D\u0438",
  "A node cannot be empty.": "\u0412\u0443\u0437\u043E\u043B \u043D\u0435 \u043C\u043E\u0436\u0435 \u0431\u0443\u0442\u0438 \u043F\u043E\u0440\u043E\u0436\u043D\u0456\u043C.",
  "Multiple cursors are available in source Markdown.": "\u041A\u0456\u043B\u044C\u043A\u0430 \u043A\u0443\u0440\u0441\u043E\u0440\u0456\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0456 \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u043C\u0443 Markdown.",
  "This command requires the source Markdown editor.": "\u0426\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u043F\u043E\u0442\u0440\u0435\u0431\u0443\u0454 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u0433\u043E Markdown-\u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430.",
  "Fixed width": "\u0424\u0456\u043A\u0441\u043E\u0432\u0430\u043D\u0430 \u0448\u0438\u0440\u0438\u043D\u0430",
  "Fit node content": "\u0417\u0430 \u0432\u043C\u0456\u0441\u0442\u043E\u043C \u0432\u0443\u0437\u043B\u0430",
  "Fit visible column": "\u0417\u0430 \u0432\u0438\u0434\u0438\u043C\u0438\u043C \u0441\u0442\u043E\u0432\u043F\u0447\u0438\u043A\u043E\u043C",
  "TraceView Mindmap: open map": "TraceView Mindmap: \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u043A\u0430\u0440\u0442\u0443",
  "Open current note as a map": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u043F\u043E\u0442\u043E\u0447\u043D\u0443 \u043D\u043E\u0442\u0430\u0442\u043A\u0443 \u044F\u043A \u043A\u0430\u0440\u0442\u0443",
  "Open map at the Markdown cursor": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u043A\u0430\u0440\u0442\u0443 \u043D\u0430 \u0432\u0443\u0437\u043B\u0456 \u043F\u0456\u0434 \u043A\u0443\u0440\u0441\u043E\u0440\u043E\u043C Markdown",
  "Find a map": "\u0417\u043D\u0430\u0439\u0442\u0438 \u043A\u0430\u0440\u0442\u0443",
  "Create a simple tree": "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u043F\u0440\u043E\u0441\u0442\u0435 \u0434\u0435\u0440\u0435\u0432\u043E",
  "Create a vector (separate template)": "\u0421\u0442\u0432\u043E\u0440\u0438\u0442\u0438 \u0432\u0435\u043A\u0442\u043E\u0440 (\u043E\u043A\u0440\u0435\u043C\u0438\u0439 \u0448\u0430\u0431\u043B\u043E\u043D)",
  "Steps, deadlines and QA": "\u041A\u0440\u043E\u043A\u0438, \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0438 \u0442\u0430 QA",
  "Mark as atomic step": "\u041F\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u0438 \u0430\u0442\u043E\u043C\u0430\u0440\u043D\u0438\u0439 \u043A\u0440\u043E\u043A",
  "Add step deadline": "\u0414\u043E\u0434\u0430\u0442\u0438 \u0441\u0442\u0440\u043E\u043A \u043A\u0440\u043E\u043A\u0443",
  "Mark as QA": "\u041F\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u0438 QA",
  "Toggle step completion": "\u041F\u0435\u0440\u0435\u043C\u043A\u043D\u0443\u0442\u0438 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u043A\u0440\u043E\u043A\u0443",
  "Paste as sibling branch": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0433\u0456\u043B\u043A\u0443 \u043F\u043E\u0440\u0443\u0447",
  "Undo map change": "\u0421\u043A\u0430\u0441\u0443\u0432\u0430\u0442\u0438 \u0437\u043C\u0456\u043D\u0443 \u043A\u0430\u0440\u0442\u0438",
  "Redo map change": "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0438 \u0437\u043C\u0456\u043D\u0443 \u043A\u0430\u0440\u0442\u0438",
  "Insert QA in Markdown editor": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 QA \u0443 Markdown-\u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0456",
  "Insert unnumbered step in Markdown editor": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043D\u0435\u043D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u0438\u0439 \u043A\u0440\u043E\u043A \u0443 Markdown-\u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0456",
  "Open map at this node": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u043A\u0430\u0440\u0442\u0443 \u043D\u0430 \u0446\u044C\u043E\u043C\u0443 \u0432\u0443\u0437\u043B\u0456",
  "Open in TraceView Mindmap": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0432 TraceView Mindmap",
  "The note changed. Open it again at the current line.": "\u041D\u043E\u0442\u0430\u0442\u043A\u0430 \u0437\u043C\u0456\u043D\u0438\u043B\u0430\u0441\u044F. \u041F\u043E\u0432\u0442\u043E\u0440\u0438 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0442\u044F \u043D\u0430 \u043F\u043E\u0442\u043E\u0447\u043D\u043E\u043C\u0443 \u0440\u044F\u0434\u043A\u0443.",
  "Save or cancel the node draft.": "\u0417\u0431\u0435\u0440\u0435\u0436\u0438 \u0430\u0431\u043E \u0441\u043A\u0430\u0441\u0443\u0439 \u0447\u0435\u0440\u043D\u0435\u0442\u043A\u0443 \u0432\u0443\u0437\u043B\u0430.",
  "New vector name": "\u041D\u0430\u0437\u0432\u0430 \u043D\u043E\u0432\u043E\u0433\u043E \u0432\u0435\u043A\u0442\u043E\u0440\u0430",
  "New tree name": "\u041D\u0430\u0437\u0432\u0430 \u043D\u043E\u0432\u043E\u0433\u043E \u0434\u0435\u0440\u0435\u0432\u0430",
  "Use a name without path characters.": "\u0412\u043A\u0430\u0436\u0438 \u043D\u0430\u0437\u0432\u0443 \u0431\u0435\u0437 \u0441\u0438\u043C\u0432\u043E\u043B\u0456\u0432 \u0448\u043B\u044F\u0445\u0443.",
  "A file with this name already exists.": "\u0424\u0430\u0439\u043B \u0456\u0437 \u0446\u0456\u0454\u044E \u043D\u0430\u0437\u0432\u043E\u044E \u0432\u0436\u0435 \u0456\u0441\u043D\u0443\u0454.",
  "The Markdown editor has newer text. Wait for it to save and try again.": "\u0423 Markdown-\u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0456 \u0454 \u043D\u043E\u0432\u0456\u0448\u0438\u0439 \u0442\u0435\u043A\u0441\u0442. \u0414\u043E\u0447\u0435\u043A\u0430\u0439\u0441\u044F \u0439\u043E\u0433\u043E \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F \u0439 \u043F\u043E\u0432\u0442\u043E\u0440\u0438 \u0434\u0456\u044E.",
  "Branch copied": "\u0413\u0456\u043B\u043A\u0443 \u0441\u043A\u043E\u043F\u0456\u0439\u043E\u0432\u0430\u043D\u043E",
  "Branch saved to the plugin clipboard": "\u0413\u0456\u043B\u043A\u0443 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E \u0443 \u0431\u0443\u0444\u0435\u0440\u0456 \u043F\u043B\u0430\u0433\u0456\u043D\u0430",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "\u0411\u0443\u0444\u0435\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439. \u0413\u0456\u043B\u043A\u0443 \u043D\u0435 \u0432\u0438\u0440\u0456\u0437\u0430\u043D\u043E. \u0414\u043E\u0437\u0432\u043E\u043B\u044C \u0434\u043E\u0441\u0442\u0443\u043F \u0434\u043E \u0431\u0443\u0444\u0435\u0440\u0430 \u0442\u0430 \u043F\u043E\u0432\u0442\u043E\u0440\u0438 \u0434\u0456\u044E.",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "\u0411\u0443\u0444\u0435\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439. \u0421\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0439\u0441\u044F \xAB\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0442\u0435\u043A\u0441\u0442 \u0433\u0456\u043B\u043A\u0438\xBB \u0443 \u043C\u0435\u043D\u044E \u22EF.",
  "Save or cancel the node draft before navigating.": "\u0417\u0431\u0435\u0440\u0435\u0436\u0438 \u0430\u0431\u043E \u0441\u043A\u0430\u0441\u0443\u0439 \u0447\u0435\u0440\u043D\u0435\u0442\u043A\u0443 \u0432\u0443\u0437\u043B\u0430 \u043F\u0435\u0440\u0435\u0434 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u043E\u043C.",
  "Waiting for Obsidian to be ready\u2026": "\u041E\u0447\u0456\u043A\u0443\u0454\u043C\u043E \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u0456 Obsidian\u2026",
  "Wait for Obsidian to load, then open the map.": "\u0414\u043E\u0447\u0435\u043A\u0430\u0439\u0441\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F Obsidian, \u043F\u043E\u0442\u0456\u043C \u0432\u0456\u0434\u043A\u0440\u0438\u0439 \u043A\u0430\u0440\u0442\u0443.",
  "This address is duplicated. Fix the block ID in Markdown.": "\u0426\u044F \u0430\u0434\u0440\u0435\u0441\u0430 \u043F\u043E\u0432\u0442\u043E\u0440\u044E\u0454\u0442\u044C\u0441\u044F \u0443 \u043A\u0430\u0440\u0442\u0456. \u0423\u0441\u0443\u043D\u044C \u0434\u0443\u0431\u043B\u044C block ID \u0443 Markdown.",
  "The linked node was not found.": "\u0412\u0443\u0437\u043E\u043B \u0437\u0430 \u0446\u0438\u043C \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F\u043C \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E.",
  "Collapse levels": "\u0420\u0456\u0432\u043D\u0456 \u0437\u0433\u043E\u0440\u0442\u0430\u043D\u043D\u044F",
  "Delete selected branch": "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0432\u0438\u0431\u0440\u0430\u043D\u0443 \u0433\u0456\u043B\u043A\u0443",
  "Sibling node": "\u0412\u0443\u0437\u043E\u043B \u043F\u043E\u0440\u0443\u0447",
  Edit: "\u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u0442\u0438",
  "Multiple selection: taps or rectangle": "\u041C\u043D\u043E\u0436\u0438\u043D\u043D\u0435 \u0432\u0438\u0434\u0456\u043B\u0435\u043D\u043D\u044F: \u0434\u043E\u0442\u0438\u043A\u0438 \u0430\u0431\u043E \u0440\u0430\u043C\u043A\u0430",
  Search: "\u041F\u043E\u0448\u0443\u043A",
  "Layout and node width": "\u0412\u0438\u0433\u043B\u044F\u0434 \u0456 \u0448\u0438\u0440\u0438\u043D\u0430 \u0432\u0443\u0437\u043B\u0456\u0432",
  "Map actions": "\u0414\u0456\u0457 \u043A\u0430\u0440\u0442\u0438",
  "Open now": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0437\u0430\u0440\u0430\u0437",
  Map: "\u041A\u0430\u0440\u0442\u0430",
  Outline: "\u0421\u043F\u0438\u0441\u043E\u043A",
  Table: "\u0422\u0430\u0431\u043B\u0438\u0446\u044F",
  "Expand entire map": "\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0441\u044E \u043A\u0430\u0440\u0442\u0443",
  "All child levels": "\u0423\u0441\u0456 \u043F\u0456\u0434\u0440\u0456\u0432\u043D\u0456",
  "The map will open after the workspace loads\u2026": "\u041A\u0430\u0440\u0442\u0430 \u0432\u0456\u0434\u043A\u0440\u0438\u0454\u0442\u044C\u0441\u044F \u043F\u0456\u0441\u043B\u044F \u0437\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u0440\u043E\u0431\u043E\u0447\u043E\u0457 \u043E\u0431\u043B\u0430\u0441\u0442\u0456\u2026",
  "File missing or deleted. Open another map.": "\u0424\u0430\u0439\u043B \u0432\u0456\u0434\u0441\u0443\u0442\u043D\u0456\u0439 \u0430\u0431\u043E \u0432\u0438\u0434\u0430\u043B\u0435\u043D\u0438\u0439. \u0412\u0456\u0434\u043A\u0440\u0438\u0439 \u0456\u043D\u0448\u0443 \u043A\u0430\u0440\u0442\u0443.",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "\u041A\u0430\u0440\u0442\u0430 \u0432\u0436\u0435 \u0437\u043C\u0456\u043D\u0438\u043B\u0430\u0441\u044F \u0430\u0431\u043E \u0432\u0438\u043A\u043E\u043D\u0443\u0454\u0442\u044C\u0441\u044F \u0437\u0430\u043F\u0438\u0441. \u0422\u0435\u043A\u0441\u0442 \u0447\u0435\u0440\u043D\u0435\u0442\u043A\u0438 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E \u0443 \u043F\u043E\u043B\u0456; \u0441\u043A\u043E\u043F\u0456\u044E\u0439 \u0439\u043E\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u0441\u043A\u0430\u0441\u0443\u0432\u0430\u043D\u043D\u044F\u043C \u0456 \u043F\u043E\u0432\u0442\u043E\u0440\u0438 \u0434\u0456\u044E \u043D\u0430 \u043F\u043E\u0442\u043E\u0447\u043D\u0456\u0439 \u043A\u0430\u0440\u0442\u0456.",
  "The file no longer exists.": "\u0424\u0430\u0439\u043B \u0431\u0456\u043B\u044C\u0448\u0435 \u043D\u0435 \u0456\u0441\u043D\u0443\u0454.",
  "Select a map node first": "\u0421\u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u0432\u0438\u0431\u0435\u0440\u0438 \u0432\u0443\u0437\u043E\u043B \u043A\u0430\u0440\u0442\u0438",
  "Another map is open. The selection was copied, but not cut.": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u043E \u0456\u043D\u0448\u0443 \u043A\u0430\u0440\u0442\u0443. \u0412\u0438\u0431\u0456\u0440\u043A\u0443 \u0441\u043A\u043E\u043F\u0456\u0439\u043E\u0432\u0430\u043D\u043E, \u0430\u043B\u0435 \u043D\u0435 \u0432\u0438\u0440\u0456\u0437\u0430\u043D\u043E.",
  "This command requires one selected node.": "\u0426\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u043F\u0440\u0430\u0446\u044E\u0454 \u0437 \u043E\u0434\u043D\u0438\u043C \u0432\u0443\u0437\u043B\u043E\u043C. \u0417\u0430\u043B\u0438\u0448\u0438 \u0432\u0438\u0431\u0440\u0430\u043D\u0438\u043C \u043B\u0438\u0448\u0435 \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u0438\u0439 \u0432\u0443\u0437\u043E\u043B.",
  "The map was closed or renamed. Copy the address again.": "\u041A\u0430\u0440\u0442\u0443 \u0437\u0430\u043A\u0440\u0438\u0442\u043E \u0430\u0431\u043E \u043F\u0435\u0440\u0435\u0439\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u043E. \u041F\u043E\u0432\u0442\u043E\u0440\u0438 \u043A\u043E\u043F\u0456\u044E\u0432\u0430\u043D\u043D\u044F \u0430\u0434\u0440\u0435\u0441\u0438.",
  "Node link copied.": "\u041F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u043D\u0430 \u0432\u0443\u0437\u043E\u043B \u0441\u043A\u043E\u043F\u0456\u0439\u043E\u0432\u0430\u043D\u043E.",
  "Another map is open. The branch was copied, but not cut.": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u043E \u0456\u043D\u0448\u0443 \u043A\u0430\u0440\u0442\u0443. \u0413\u0456\u043B\u043A\u0443 \u0441\u043A\u043E\u043F\u0456\u0439\u043E\u0432\u0430\u043D\u043E, \u0430\u043B\u0435 \u043D\u0435 \u0432\u0438\u0440\u0456\u0437\u0430\u043D\u043E.",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "\u0413\u0456\u043B\u043A\u0443 \u0432\u0438\u0440\u0456\u0437\u0430\u043D\u043E. Ctrl+V \u2014 \u0432\u0441\u0442\u0430\u0432\u0438\u0442\u0438, Undo \u2014 \u043F\u043E\u0432\u0435\u0440\u043D\u0443\u0442\u0438.",
  "The note was renamed. Copy the draft and reopen the editor.": "\u041D\u043E\u0442\u0430\u0442\u043A\u0443 \u043F\u0435\u0440\u0435\u0439\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u043E. \u0421\u043A\u043E\u043F\u0456\u044E\u0439 \u0447\u0435\u0440\u043D\u0435\u0442\u043A\u0443 \u0442\u0430 \u0432\u0456\u0434\u043A\u0440\u0438\u0439 \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u0449\u0435 \u0440\u0430\u0437.",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "\u0417\u043C\u0456\u0441\u0442 \u043A\u0430\u0440\u0442\u0438 \u0437\u043C\u0456\u043D\u0438\u0432\u0441\u044F \u0437\u0437\u043E\u0432\u043D\u0456. \u0427\u0435\u0440\u043D\u0435\u0442\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u0430; \u0441\u043A\u043E\u043F\u0456\u044E\u0439 \u0457\u0457 \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u0438\u043C \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F\u043C.",
  "The node no longer exists. Your draft is preserved.": "\u0412\u0443\u0437\u043E\u043B \u0431\u0456\u043B\u044C\u0448\u0435 \u043D\u0435 \u0456\u0441\u043D\u0443\u0454. \u0427\u0435\u0440\u043D\u0435\u0442\u043A\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u0430.",
  "Steps \xB7 Deadlines \xB7 QA": "\u041A\u0440\u043E\u043A\u0438 \xB7 \u0414\u0435\u0434\u043B\u0430\u0439\u043D\u0438 \xB7 QA",
  "Step deadline\u2026": "\u0421\u0442\u0440\u043E\u043A \u043A\u0440\u043E\u043A\u0443\u2026",
  "Completed / incomplete": "\u0412\u0438\u043A\u043E\u043D\u0430\u043D\u043E / \u043D\u0435 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043E",
  "Move up": "\u041F\u0435\u0440\u0435\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u0432\u0438\u0449\u0435",
  "Move down": "\u041F\u0435\u0440\u0435\u043C\u0456\u0441\u0442\u0438\u0442\u0438 \u043D\u0438\u0436\u0447\u0435",
  "Nest in previous branch": "\u0412\u043A\u043B\u0430\u0441\u0442\u0438 \u0432 \u043F\u043E\u043F\u0435\u0440\u0435\u0434\u043D\u044E \u0433\u0456\u043B\u043A\u0443",
  "Open text in editor": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0442\u0435\u043A\u0441\u0442 \u0443 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0456",
  "Delete branch\u2026": "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0433\u0456\u043B\u043A\u0443\u2026",
  "Export HTML\u2026": "\u0415\u043A\u0441\u043F\u043E\u0440\u0442 HTML\u2026",
  "Export SVG\u2026": "\u0415\u043A\u0441\u043F\u043E\u0440\u0442 SVG\u2026",
  "Paste branch text\u2026": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0442\u0435\u043A\u0441\u0442 \u0433\u0456\u043B\u043A\u0438\u2026",
  "Paste child Markdown branch": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u044E Markdown-\u0433\u0456\u043B\u043A\u0443",
  "Renumber steps": "\u0412\u043F\u043E\u0440\u044F\u0434\u043A\u0443\u0432\u0430\u0442\u0438 \u043D\u043E\u043C\u0435\u0440\u0438 \u043A\u0440\u043E\u043A\u0456\u0432",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "\u041A\u0430\u0440\u0442\u0430 \u0430\u0434\u0440\u0435\u0441\u0430\u0442\u0430 \u0437\u043C\u0456\u043D\u0438\u043B\u0430\u0441\u044F. \u0412\u0456\u0434\u043A\u0440\u0438\u0439 \u043F\u0456\u0434\u043A\u0430\u0437\u043A\u0438 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u0449\u0435 \u0440\u0430\u0437; \u0447\u0435\u0440\u043D\u0435\u0442\u043A\u0443 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E.",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "\u0426\u0435\u0439 \u0431\u043B\u043E\u043A \u043D\u0435 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454 \u043E\u043A\u0440\u0435\u043C\u043E\u043C\u0443 \u0432\u0443\u0437\u043B\u0443 \u043A\u0430\u0440\u0442\u0438. \u0421\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0439\u0441\u044F \u043A\u043E\u043C\u0430\u043D\u0434\u043E\u044E \xAB\u041A\u043E\u043F\u0456\u044E\u0432\u0430\u0442\u0438 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u043D\u0430 \u0432\u0443\u0437\u043E\u043B\xBB.",
  "Native editor unavailable. Using text input. ": "\u041D\u0430\u0442\u0438\u0432\u043D\u0438\u0439 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u043D\u0438\u0439. \u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u044E \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u0438\u0439 \u0432\u0432\u0456\u0434. ",
  "The note does not exist.": "\u041D\u043E\u0442\u0430\u0442\u043A\u0430 \u043D\u0435 \u0456\u0441\u043D\u0443\u0454.",
  "File already exists. Choose another name.": "\u0424\u0430\u0439\u043B \u0443\u0436\u0435 \u0456\u0441\u043D\u0443\u0454. \u041E\u0431\u0435\u0440\u0438 \u0456\u043D\u0448\u0443 \u043D\u0430\u0437\u0432\u0443.",
  Steps: "\u041A\u0440\u043E\u043A\u0438",
  Deadlines: "\u0414\u0435\u0434\u043B\u0430\u0439\u043D\u0438",
  "Open QA": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0456 QA",
  Refresh: "\u041E\u043D\u043E\u0432\u0438\u0442\u0438",
  "Collapse all": "\u0417\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0441\u0456",
  "Expand all": "\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0441\u0456",
  "Search steps": "\u041F\u043E\u0448\u0443\u043A \u043A\u0440\u043E\u043A\u0456\u0432",
  "Find\u2026": "\u0417\u043D\u0430\u0439\u0442\u0438\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u043A\u0440\u043E\u043A\u0456\u0432 \u0437\u043C\u0456\u043D\u044E\u0454 \u043B\u0438\u0448\u0435 \u043D\u043E\u043C\u0435\u0440\u0438 \u0432 \u043E\u0434\u043D\u043E\u043C\u0443 \u0444\u0430\u0439\u043B\u0456. \u0413\u0456\u043B\u043A\u0438 \u043B\u0438\u0448\u0430\u044E\u0442\u044C\u0441\u044F \u043D\u0430 \u043C\u0456\u0441\u0446\u0456. \u0414\u0430\u0442\u043E\u0432\u0430\u043D\u0456 \u0442\u0430 \u043D\u0435\u043D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u0456 \u043A\u0440\u043E\u043A\u0438 \u043C\u0430\u044E\u0442\u044C \u043E\u043A\u0440\u0435\u043C\u0438\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A.",
  Expand: "\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438",
  Collapse: "\u0417\u0433\u043E\u0440\u043D\u0443\u0442\u0438",
  "No open items match this filter.": "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438\u0445 \u043F\u0443\u043D\u043A\u0442\u0456\u0432 \u0437\u0430 \u0446\u0438\u043C \u0444\u0456\u043B\u044C\u0442\u0440\u043E\u043C \u043D\u0435\u043C\u0430\u0454.",
  "Mark completed": "\u041F\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u0438 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u0438\u043C",
  "Move earlier in execution order": "\u041F\u0456\u0434\u043D\u044F\u0442\u0438 \u0443 \u043F\u043E\u0440\u044F\u0434\u043A\u0443 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F",
  "Move later in execution order": "\u041E\u043F\u0443\u0441\u0442\u0438\u0442\u0438 \u0443 \u043F\u043E\u0440\u044F\u0434\u043A\u0443 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F",
  "Deadline ?": "\u0421\u0442\u0440\u043E\u043A ?",
  "Node editor": "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0432\u0443\u0437\u043B\u0456\u0432",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "\u0417\u0430\u0441\u0442\u043E\u0441\u043E\u0432\u0443\u0454\u0442\u044C\u0441\u044F \u043F\u0440\u0438 \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u043E\u043C\u0443 \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u0456. \u041D\u0430\u0442\u0438\u0432\u043D\u0438\u0439 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454 Live Preview \u0439 \u043F\u0456\u0434\u043A\u0430\u0437\u043A\u0438 Obsidian; \u044F\u043A\u0449\u043E \u043D\u0435\u0441\u0443\u043C\u0456\u0441\u043D\u0438\u0439 \u2014 \u0432\u0456\u0434\u043A\u0440\u0438\u0454\u0442\u044C\u0441\u044F \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u0438\u0439 \u0432\u0432\u0456\u0434.",
  "Native Obsidian": "\u041D\u0430\u0442\u0438\u0432\u043D\u0438\u0439 Obsidian",
  "Text input": "\u041F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u0438\u0439",
  "Automatically restore large maps": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u044E\u0432\u0430\u0442\u0438 \u0432\u0435\u043B\u0438\u043A\u0456 \u043A\u0430\u0440\u0442\u0438",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "\u041F\u0456\u0441\u043B\u044F \u0437\u0430\u043F\u0443\u0441\u043A\u0443 \u0430\u043A\u0442\u0438\u0432\u043D\u0430 \u043A\u0430\u0440\u0442\u0430 \u0447\u0435\u043A\u0430\u0454 \u0441\u0442\u0430\u0431\u0456\u043B\u044C\u043D\u043E\u0433\u043E \u0432\u0456\u0434\u0433\u0443\u043A\u0443 Obsidian. \u041A\u043D\u043E\u043F\u043A\u0430 \xAB\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0437\u0430\u0440\u0430\u0437\xBB \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0454 \u043E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u043D\u044F.",
  "Hide frozen steps": "\u041F\u0440\u0438\u0445\u043E\u0432\u0443\u0432\u0430\u0442\u0438 \u0437\u0430\u043C\u043E\u0440\u043E\u0436\u0435\u043D\u0456 \u043A\u0440\u043E\u043A\u0438",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "\u0423 \u0441\u043F\u0438\u0441\u043A\u0430\u0445 \u043A\u0440\u043E\u043A\u0456\u0432 \u0456 \u0434\u0435\u0434\u043B\u0430\u0439\u043D\u0456\u0432 \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0442\u0438 \u0433\u0456\u043B\u043A\u0438 \u{1F9CA}. \u0421\u0430\u043C\u0456 \u043A\u0430\u0440\u0442\u0438 \u043F\u043E\u043A\u0430\u0437\u0443\u044E\u0442\u044C \u0443\u0432\u0435\u0441\u044C \u0442\u0435\u043A\u0441\u0442.",
  "Left arrow collapses the branch first": "\u0421\u0442\u0440\u0456\u043B\u043A\u0430 \u0432\u043B\u0456\u0432\u043E \u0441\u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u0437\u0433\u043E\u0440\u0442\u0430\u0454 \u0433\u0456\u043B\u043A\u0443",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "\u0412\u0438\u043C\u043A\u043D\u0435\u043D\u043E: \u043E\u0434\u0440\u0430\u0437\u0443 \u043F\u0435\u0440\u0435\u0439\u0442\u0438 \u0434\u043E \u0431\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u043E\u0433\u043E \u0432\u0443\u0437\u043B\u0430. \u0423\u0432\u0456\u043C\u043A\u043D\u0435\u043D\u043E: \u0441\u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0443 \u0433\u0456\u043B\u043A\u0443, \u043D\u0430\u0441\u0442\u0443\u043F\u043D\u0438\u043C \u043D\u0430\u0442\u0438\u0441\u043A\u043E\u043C \u043F\u0435\u0440\u0435\u0439\u0442\u0438 \u0434\u043E \u0431\u0430\u0442\u044C\u043A\u0430.",
  "Show [ ] in list text": "\u041F\u043E\u043A\u0430\u0437\u0443\u0432\u0430\u0442\u0438 [ ] \u0443 \u0442\u0435\u043A\u0441\u0442\u0456 \u0441\u043F\u0438\u0441\u043A\u0456\u0432",
  "Show #step in list text": "\u041F\u043E\u043A\u0430\u0437\u0443\u0432\u0430\u0442\u0438 #step \u0443 \u0442\u0435\u043A\u0441\u0442\u0456 \u0441\u043F\u0438\u0441\u043A\u0456\u0432",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "\u041B\u0438\u0448\u0435 \u0432\u0456\u0434\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u043D\u044F \u0443 \xAB\u041A\u0440\u043E\u043A\u0438 \xB7 \u0414\u0435\u0434\u043B\u0430\u0439\u043D\u0438 \xB7 QA\xBB. \u0422\u0435\u043A\u0441\u0442 \u043D\u043E\u0442\u0430\u0442\u043E\u043A \u0456 \u043A\u043D\u043E\u043F\u043A\u0430 \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u043D\u0435 \u0437\u043C\u0456\u043D\u044E\u044E\u0442\u044C\u0441\u044F.",
  "Map node width": "\u0428\u0438\u0440\u0438\u043D\u0430 \u0432\u0443\u0437\u043B\u0456\u0432 \u043A\u0430\u0440\u0442\u0438",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "\u0417\u043C\u0456\u043D\u044E\u0454\u0442\u044C\u0441\u044F \u043E\u0434\u0440\u0430\u0437\u0443 \u0432 \u0443\u0441\u0456\u0445 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0438\u0445 \u043A\u0430\u0440\u0442\u0430\u0445. \u0420\u0435\u0436\u0438\u043C\u0438 \xAB\u0421\u043F\u0438\u0441\u043E\u043A\xBB \u0456 \xAB\u0422\u0430\u0431\u043B\u0438\u0446\u044F\xBB \u0437\u0431\u0435\u0440\u0456\u0433\u0430\u044E\u0442\u044C \u0441\u0432\u043E\u044E \u0448\u0438\u0440\u0438\u043D\u0443.",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "\u0417\u0433\u043E\u0440\u0442\u0430\u043D\u043D\u044F \u0439 \u043A\u0430\u043C\u0435\u0440\u0430 \u0437\u0431\u0435\u0440\u0456\u0433\u0430\u044E\u0442\u044C\u0441\u044F \u043D\u0430 \u0446\u044C\u043E\u043C\u0443 \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457. \u041F\u043B\u0430\u0433\u0456\u043D \u043D\u0435 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u0443\u0454 Markdown \u043F\u0440\u0438 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0456 \u0442\u0430 \u043D\u0435 \u0434\u043E\u0434\u0430\u0454 \u043F\u0440\u0438\u0445\u043E\u0432\u0430\u043D\u0438\u0445 ID. Windows \u0456 Android \u043C\u043E\u0436\u0443\u0442\u044C \u043C\u0430\u0442\u0438 \u0440\u0456\u0437\u043D\u0438\u0439 \u0441\u0442\u0430\u043D \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443.",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "\u041D\u0430\u0442\u0438\u0432\u043D\u0438\u0439 \u0432\u0432\u0456\u0434 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0454 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 Obsidian, \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u0438\u0439 \u2014 Editor API. \u041A\u043E\u043C\u0430\u043D\u0434\u0438, \u044F\u043A\u0456 \u0432\u0438\u043C\u0430\u0433\u0430\u044E\u0442\u044C \u043F\u043E\u0432\u043D\u043E\u0433\u043E Markdown-\u0432\u0456\u043A\u043D\u0430, \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u043E\u0432\u0443\u0439 \u0447\u0435\u0440\u0435\u0437 \u22EF \u2192 \u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0442\u0435\u043A\u0441\u0442 \u0443 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0456.",
  "Map hotkeys": "\u041A\u043B\u0430\u0432\u0456\u0448\u0456 \u043A\u0430\u0440\u0442\u0438",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "\u0417\u043C\u0456\u043D\u0438 \u0434\u0456\u044E\u0442\u044C \u043E\u0434\u0440\u0430\u0437\u0443 \u0432 \u0443\u0441\u0456\u0445 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0438\u0445 \u043A\u0430\u0440\u0442\u0430\u0445. \u041D\u0430\u0442\u0438\u0441\u043D\u0438 \u2328, \u043F\u043E\u0442\u0456\u043C \u043F\u043E\u0442\u0440\u0456\u0431\u043D\u0443 \u043A\u043E\u043C\u0431\u0456\u043D\u0430\u0446\u0456\u044E. \u0410\u0431\u043E \u0432\u0432\u0435\u0434\u0438 \u0457\u0457 \u0432\u0440\u0443\u0447\u043D\u0443: Ctrl+C, Alt+Shift+1; \u043A\u0456\u043B\u044C\u043A\u0430 \u0432\u0430\u0440\u0456\u0430\u043D\u0442\u0456\u0432 \u2014 \u0447\u0435\u0440\u0435\u0437 \u043A\u043E\u043C\u0443. \xD7 \u0432\u0438\u043C\u0438\u043A\u0430\u0454 \u043A\u043E\u043C\u0430\u043D\u0434\u0443, \u21BA \u043F\u043E\u0432\u0435\u0440\u0442\u0430\u0454 \u043F\u043E\u0447\u0430\u0442\u043A\u043E\u0432\u0456 \u043A\u043B\u0430\u0432\u0456\u0448\u0456. \u041F\u0456\u0434 \u0447\u0430\u0441 \u0432\u0432\u0435\u0434\u0435\u043D\u043D\u044F \u0442\u0435\u043A\u0441\u0442\u0443 \u043F\u0440\u0430\u0446\u044E\u044E\u0442\u044C \u0437\u0432\u0438\u0447\u0430\u0439\u043D\u0456 \u043A\u043B\u0430\u0432\u0456\u0448\u0456 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430.",
  Unassigned: "\u041D\u0435 \u043F\u0440\u0438\u0437\u043D\u0430\u0447\u0435\u043D\u043E",
  "Record shortcut": "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438 \u043A\u043E\u043C\u0431\u0456\u043D\u0430\u0446\u0456\u044E",
  Disable: "\u0412\u0438\u043C\u043A\u043D\u0443\u0442\u0438",
  "Default shortcuts": "\u041F\u043E\u0447\u0430\u0442\u043A\u043E\u0432\u0456 \u043A\u043B\u0430\u0432\u0456\u0448\u0456",
  "Search map\u2026": "\u041F\u043E\u0448\u0443\u043A \u0443 \u043A\u0430\u0440\u0442\u0456\u2026",
  "Search map": "\u041F\u043E\u0448\u0443\u043A \u0443 \u043A\u0430\u0440\u0442\u0456",
  " A\u2013Z": " \u0410\u2013\u042F",
  "Close search": "\u0417\u0430\u043A\u0440\u0438\u0442\u0438 \u043F\u043E\u0448\u0443\u043A",
  "Search results": "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u0438 \u043F\u043E\u0448\u0443\u043A\u0443",
  "No results": "\u041D\u0456\u0447\u043E\u0433\u043E \u043D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E",
  "This Obsidian version has no compatible native editor.": "\u0426\u044F \u0432\u0435\u0440\u0441\u0456\u044F Obsidian \u043D\u0435 \u043D\u0430\u0434\u0430\u0454 \u0441\u0443\u043C\u0456\u0441\u043D\u043E\u0433\u043E \u043D\u0430\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430.",
  "Could not prepare the native editor.": "\u041D\u0435 \u0432\u0434\u0430\u043B\u043E\u0441\u044F \u043F\u0456\u0434\u0433\u043E\u0442\u0443\u0432\u0430\u0442\u0438 \u043D\u0430\u0442\u0438\u0432\u043D\u0438\u0439 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440.",
  "The native editor cannot protect a single-line draft.": "\u041D\u0430\u0442\u0438\u0432\u043D\u0438\u0439 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454 \u0437\u0430\u0445\u0438\u0441\u0442 \u043E\u0434\u043D\u043E\u0440\u044F\u0434\u043A\u043E\u0432\u043E\u0457 \u0447\u0435\u0440\u043D\u0435\u0442\u043A\u0438.",
  "Native Obsidian link": "\u041D\u0430\u0442\u0438\u0432\u043D\u0435 \u043F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F Obsidian",
  "Map filter": "\u0424\u0456\u043B\u044C\u0442\u0440 \u043A\u0430\u0440\u0442\u0438",
  "All maps": "\u0423\u0441\u0456 \u043A\u0430\u0440\u0442\u0438",
  Maps: "\u041A\u0430\u0440\u0442\u0438",
  "No maps match this search.": "\u041A\u0430\u0440\u0442 \u0437\u0430 \u0446\u0438\u043C \u0437\u0430\u043F\u0438\u0442\u043E\u043C \u043D\u0435\u043C\u0430\u0454.",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "\u041D\u043E\u0442\u0430\u0442\u043A\u0443 \u0432\u0436\u0435 \u0437\u043C\u0456\u043D\u0438\u043B\u0438 \u0432 \u0456\u043D\u0448\u043E\u043C\u0443 \u0432\u0456\u043A\u043D\u0456 \u0430\u0431\u043E \u043D\u0430 \u0456\u043D\u0448\u043E\u043C\u0443 \u043F\u0440\u0438\u0441\u0442\u0440\u043E\u0457. \u041A\u0430\u0440\u0442\u0443 \u043E\u043D\u043E\u0432\u043B\u0435\u043D\u043E; \u043F\u043E\u0432\u0442\u043E\u0440\u0438 \u0434\u0456\u044E \u043D\u0430 \u0441\u0432\u0456\u0436\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0456.",
  "History stopped because the text changed externally. Undo will preserve those changes.": "\u0406\u0441\u0442\u043E\u0440\u0456\u044F \u0437\u0443\u043F\u0438\u043D\u0435\u043D\u0430: \u0442\u0435\u043A\u0441\u0442 \u0437\u043C\u0456\u043D\u0438\u0432\u0441\u044F \u0437\u0437\u043E\u0432\u043D\u0456. Undo \u043D\u0435 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0438\u0448\u0435 \u0446\u0456 \u0437\u043C\u0456\u043D\u0438.",
  "Loading map\u2026": "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0435\u043D\u043D\u044F \u043A\u0430\u0440\u0442\u0438\u2026",
  "Node address: ^": "\u0410\u0434\u0440\u0435\u0441\u0430 \u0432\u0443\u0437\u043B\u0430: ^",
  "Branch ready to move": "\u0413\u0456\u043B\u043A\u0443 \u043C\u043E\u0436\u043D\u0430 \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0438\u0442\u0438",
  "Before: ": "\u041F\u0435\u0440\u0435\u0434: ",
  "After: ": "\u041F\u0456\u0441\u043B\u044F: ",
  "As children: ": "\u0414\u043E\u0447\u0456\u0440\u043D\u0456\u043C\u0438: ",
  "Expand node": "\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0443\u0437\u043E\u043B",
  "Collapse node": "\u0417\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0443\u0437\u043E\u043B",
  "Collapse branch": "\u0417\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0441\u044E \u0433\u0456\u043B\u043A\u0443",
  "Expand branch": "\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0432\u0441\u044E \u0433\u0456\u043B\u043A\u0443",
  "Paste after node": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u0438 \u043F\u0456\u0441\u043B\u044F \u0432\u0443\u0437\u043B\u0430",
  Language: "\u041C\u043E\u0432\u0430",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u0438\u0439 \u0432\u0438\u0431\u0456\u0440 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u0454 \u043C\u043E\u0432\u0456 Obsidian. \u0417\u043C\u0456\u043D\u0430 \u043C\u043E\u0432\u0438 \u0437\u0430\u0441\u0442\u043E\u0441\u043E\u0432\u0443\u0454\u0442\u044C\u0441\u044F \u043F\u0456\u0441\u043B\u044F \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u043A\u0443 Obsidian.",
  "Automatic (Obsidian)": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "\u041C\u043E\u0432\u0443 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E. \u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438 Obsidian, \u0449\u043E\u0431 \u0437\u0430\u0441\u0442\u043E\u0441\u0443\u0432\u0430\u0442\u0438 \u0457\u0457.",
  "Selected nodes: {count}": "\u0412\u0438\u0431\u0440\u0430\u043D\u043E \u0432\u0443\u0437\u043B\u0456\u0432: {count}",
  "Child levels: {count}": "\u0420\u0456\u0432\u043D\u0456\u0432 \u043D\u0430\u0449\u0430\u0434\u043A\u0456\u0432: {count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "\u0412\u0443\u0437\u043B\u0456\u0432: {nodes} \xB7 \u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438\u0445 \u043A\u0440\u043E\u043A\u0456\u0432: {steps}",
  "Export {format} \u2014 file name": "\u0415\u043A\u0441\u043F\u043E\u0440\u0442 {format} \u2014 \u043D\u0430\u0437\u0432\u0430 \u0444\u0430\u0439\u043B\u0443",
  "Saved {path}": "\u0417\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E {path}",
  "Expand map: {name}": "\u0420\u043E\u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u043A\u0430\u0440\u0442\u0443: {name}",
  "Collapse map: {name}": "\u0417\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u043A\u0430\u0440\u0442\u0443: {name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "\u041E\u0434\u043D\u0430\u043A\u043E\u0432\u0456 \u043A\u043B\u0430\u0432\u0456\u0448\u0456: {shortcuts}. \u0421\u043F\u0440\u0430\u0446\u044E\u0454 \u043F\u0435\u0440\u0448\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0443 \u0441\u043F\u0438\u0441\u043A\u0443.",
  "Next action": "\u041D\u0430\u0441\u0442\u0443\u043F\u043D\u0430 \u0434\u0456\u044F",
  "First action": "\u041F\u0435\u0440\u0448\u0430 \u0434\u0456\u044F",
  "Active now": "\u0416\u0438\u0432\u0435 \u0437\u0430\u0440\u0430\u0437",
  "Frozen / someday": "\u0417\u0430\u043C\u043E\u0440\u043E\u0436\u0435\u043D\u043E / \u043A\u043E\u043B\u0438\u0441\u044C",
  "First step": "\u041F\u0435\u0440\u0448\u0438\u0439 \u043A\u0440\u043E\u043A",
  "{path} \xB7 References: {count}": "{path} \xB7 \u0417\u0433\u0430\u0434\u043E\u043A: {count}",
  "Attachment saved, but the editor is already closed: {link}": "\u0412\u043A\u043B\u0430\u0434\u0435\u043D\u043D\u044F \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E, \u0430\u043B\u0435 \u0440\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043D\u043D\u044F \u0432\u0436\u0435 \u0437\u0430\u043A\u0440\u0438\u0442\u0435: {link}",
  "Copy selection": "\u041A\u043E\u043F\u0456\u044E\u0432\u0430\u0442\u0438 \u0432\u0438\u0431\u0456\u0440\u043A\u0443",
  "Cut selection": "\u0412\u0438\u0440\u0456\u0437\u0430\u0442\u0438 \u0432\u0438\u0431\u0456\u0440\u043A\u0443",
  "Delete selection": "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438 \u0432\u0438\u0431\u0456\u0440\u043A\u0443",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "\u041F\u043E\u0432\u043D\u0430 \u043A\u0430\u0440\u0442\u0430 \xB7 \u0412\u0443\u0437\u043B\u0456\u0432: {count} \xB7 \u0415\u043A\u0441\u043F\u043E\u0440\u0442 \u0434\u043B\u044F \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443. \u041D\u0430\u0442\u0438\u0441\u043D\u0438 \u043F\u043E\u0437\u043D\u0430\u0447\u043A\u0443 \u0433\u0456\u043B\u043A\u0438, \u0449\u043E\u0431 \u0437\u0433\u043E\u0440\u043D\u0443\u0442\u0438 \u0457\u0457. \u0422\u0435\u043A\u0441\u0442\u0438 \u0437\u0431\u0435\u0440\u0456\u0433\u0430\u044E\u0442\u044C Markdown. \u041F\u043E\u0441\u0438\u043B\u0430\u043D\u043D\u044F \u0442\u0430 \u0432\u043A\u043B\u0430\u0434\u0435\u043D\u043D\u044F \u0441\u0445\u043E\u0432\u0438\u0449\u0430 \u043F\u043E\u0442\u0440\u0435\u0431\u0443\u044E\u0442\u044C Obsidian.",
  "This map contains no outline nodes.": "\u0423 \u0446\u0456\u0439 \u043A\u0430\u0440\u0442\u0456 \u043D\u0435\u043C\u0430\u0454 \u0432\u0443\u0437\u043B\u0456\u0432.",
  "This node no longer exists. Reopen the map and try again.": "\u0426\u0435\u0439 \u0432\u0443\u0437\u043E\u043B \u0431\u0456\u043B\u044C\u0448\u0435 \u043D\u0435 \u0456\u0441\u043D\u0443\u0454. \u0412\u0456\u0434\u043A\u0440\u0438\u0439 \u043A\u0430\u0440\u0442\u0443 \u0439 \u043F\u043E\u0432\u0442\u043E\u0440\u0438 \u0434\u0456\u044E.",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "\u0412\u0443\u0437\u043E\u043B \u043C\u0430\u0454 \u0432\u043C\u0456\u0449\u0443\u0432\u0430\u0442\u0438\u0441\u044F \u0432 \u043E\u0434\u0438\u043D \u0440\u044F\u0434\u043E\u043A. \u0414\u043B\u044F \u0440\u0435\u0448\u0442\u0438 \u0442\u0435\u043A\u0441\u0442\u0443 \u0432\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0439 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u0432\u0443\u0437\u043E\u043B \u0430\u0431\u043E \u043F\u043E\u0432\u2019\u044F\u0437\u0430\u043D\u0443 \u043D\u043E\u0442\u0430\u0442\u043A\u0443.",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "\u0426\u0435\u0439 \u0442\u0435\u043A\u0441\u0442 \u0441\u0442\u0430\u043D\u0435 \u0431\u043B\u043E\u043A\u043E\u043C \u043A\u043E\u0434\u0443 \u0430\u0431\u043E \u0440\u043E\u0437\u0434\u0456\u043B\u044E\u0432\u0430\u0447\u0435\u043C Markdown. \u0415\u043A\u0440\u0430\u043D\u0443\u0439 \u043F\u043E\u0437\u043D\u0430\u0447\u043A\u0443 \u0430\u0431\u043E \u0437\u043C\u0456\u043D\u0438 \u0439\u043E\u0433\u043E \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0456.",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454 \u0434\u043E \u0448\u0435\u0441\u0442\u0438 \u0440\u0456\u0432\u043D\u0456\u0432 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0456\u0432. \u0414\u043E\u0434\u0430\u0439 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u0439 \u043F\u0443\u043D\u043A\u0442 \u0441\u043F\u0438\u0441\u043A\u0443 \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0456.",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "\u0426\u0435\u0439 \u0442\u0435\u043A\u0441\u0442 \u043D\u0435 \u043F\u0456\u0434\u0445\u043E\u0434\u0438\u0442\u044C \u0434\u043B\u044F \u0431\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u043E\u0433\u043E \u0432\u0443\u0437\u043B\u0430 Markdown. \u0415\u043A\u0440\u0430\u043D\u0443\u0439 \u043F\u043E\u0437\u043D\u0430\u0447\u043A\u0443 \u0430\u0431\u043E \u0437\u043C\u0456\u043D\u0438 \u0439\u043E\u0433\u043E \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0456.",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "\u0413\u0456\u043B\u043A\u0430 \u043C\u0456\u0441\u0442\u0438\u0442\u044C \u0430\u0431\u0437\u0430\u0446, \u043A\u043E\u0434 \u0430\u0431\u043E \u0456\u043D\u0448\u0438\u0439 Markdown \u043F\u043E\u0437\u0430 \u0440\u044F\u0434\u043A\u0430\u043C\u0438 \u0432\u0443\u0437\u043B\u0456\u0432. \u0417\u043C\u0456\u043D\u0438 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0456, \u0449\u043E\u0431 \u0437\u0431\u0435\u0440\u0435\u0433\u0442\u0438 \u0446\u0435\u0439 \u0432\u043C\u0456\u0441\u0442.",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "\u0412\u0456\u0434\u0441\u0442\u0443\u043F\u0438 \u0433\u0456\u043B\u043A\u0438 \u043D\u0435\u043E\u0434\u043D\u043E\u0437\u043D\u0430\u0447\u043D\u0456. \u0412\u0438\u043F\u0440\u0430\u0432 \u0457\u0445 \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0456 \u043F\u0435\u0440\u0435\u0434 \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u043E\u043C.",
  "That move would exceed Markdown\u2019s six heading levels.": "\u0426\u0435\u0439 \u043F\u0435\u0440\u0435\u043D\u043E\u0441 \u043F\u0435\u0440\u0435\u0432\u0438\u0449\u0438\u0442\u044C \u0448\u0456\u0441\u0442\u044C \u0440\u0456\u0432\u043D\u0456\u0432 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0456\u0432 Markdown.",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "\u041F\u0435\u0440\u0435\u043D\u043E\u0441 \u043C\u0456\u0436 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C \u0456 \u043F\u0443\u043D\u043A\u0442\u043E\u043C \u0441\u043F\u0438\u0441\u043A\u0443 \u0437\u043C\u0456\u043D\u044E\u0454 \u0457\u0445\u043D\u0456\u0439 \u0437\u043C\u0456\u0441\u0442. \u0417\u043C\u0456\u043D\u0438 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0456.",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "\u0412\u043A\u043B\u0430\u0434\u0435\u043D\u043D\u044F \u043C\u0456\u0436 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430\u043C\u0438 \u0439 \u043F\u0443\u043D\u043A\u0442\u0430\u043C\u0438 \u0441\u043F\u0438\u0441\u043A\u0443 \u043D\u0435\u043E\u0434\u043D\u043E\u0437\u043D\u0430\u0447\u043D\u0435. \u0421\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0439\u0441\u044F \u0432\u0438\u0445\u0456\u0434\u043D\u0438\u043C \u0442\u0435\u043A\u0441\u0442\u043E\u043C.",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "\u0412\u0438\u043D\u0435\u0441\u0435\u043D\u043D\u044F \u043F\u0443\u043D\u043A\u0442\u0443 \u0437-\u043F\u0456\u0434 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 \u043F\u043E\u0442\u0440\u0435\u0431\u0443\u0454 \u0437\u043C\u0456\u043D\u0438 \u0444\u043E\u0440\u043C\u0430\u0442\u0443 Markdown. \u0421\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0439\u0441\u044F \u0432\u0438\u0445\u0456\u0434\u043D\u0438\u043C \u0442\u0435\u043A\u0441\u0442\u043E\u043C.",
  "A branch cannot be moved into itself or one of its descendants.": "\u041D\u0435 \u043C\u043E\u0436\u043D\u0430 \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0433\u0456\u043B\u043A\u0443 \u0432 \u0441\u0435\u0431\u0435 \u0447\u0438 \u0441\u0432\u043E\u0433\u043E \u043D\u0430\u0449\u0430\u0434\u043A\u0430.",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A Markdown \u043D\u0435 \u043C\u043E\u0436\u0435 \u0441\u0442\u0430\u0442\u0438 \u0434\u043E\u0447\u0456\u0440\u043D\u0456\u043C \u043F\u0443\u043D\u043A\u0442\u043E\u043C \u0441\u043F\u0438\u0441\u043A\u0443. \u0421\u043F\u043E\u0447\u0430\u0442\u043A\u0443 \u0437\u043C\u0456\u043D\u0438 \u0444\u043E\u0440\u043C\u0430\u0442 \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0456.",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "\u041F\u0443\u043D\u043A\u0442 \u043F\u0456\u0441\u043B\u044F \u043F\u0456\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 \u043D\u0430\u043B\u0435\u0436\u0430\u0442\u0438\u043C\u0435 \u0439\u043E\u043C\u0443. \u041E\u0431\u0435\u0440\u0438 \u0431\u0430\u0442\u044C\u043A\u0456\u0432\u0441\u044C\u043A\u0438\u0439 \u043F\u0443\u043D\u043A\u0442 \u0441\u043F\u0438\u0441\u043A\u0443 \u0430\u0431\u043E \u0437\u043C\u0456\u043D\u0438 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u043C\u0443 \u0442\u0435\u043A\u0441\u0442\u0456.",
  "Paste an outline branch, or paste one line as a new node.": "\u0412\u0441\u0442\u0430\u0432 \u0433\u0456\u043B\u043A\u0443 \u0441\u043F\u0438\u0441\u043A\u0443 \u0430\u0431\u043E \u043E\u0434\u0438\u043D \u0440\u044F\u0434\u043E\u043A \u044F\u043A \u043D\u043E\u0432\u0438\u0439 \u0432\u0443\u0437\u043E\u043B.",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "\u0412\u0441\u0442\u0430\u0432\u043B\u044F\u0439 \u043F\u0443\u043D\u043A\u0442\u0438 \u043F\u043E\u0440\u0443\u0447 \u0456\u0437 \u043F\u0443\u043D\u043A\u0442\u0430\u043C\u0438, \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u2014 \u0456\u0437 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430\u043C\u0438. \u0414\u043B\u044F \u0437\u043C\u0456\u043D\u0438 \u0444\u043E\u0440\u043C\u0430\u0442\u0443 \u0441\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0439\u0441\u044F \u0432\u0438\u0445\u0456\u0434\u043D\u0438\u043C \u0442\u0435\u043A\u0441\u0442\u043E\u043C.",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "\u0411\u0443\u0444\u0435\u0440 \u043C\u0456\u0441\u0442\u0438\u0442\u044C \u0432\u043C\u0456\u0441\u0442 \u043F\u043E\u0437\u0430 \u0441\u043F\u0438\u0441\u043A\u043E\u043C. \u0412\u0441\u0442\u0430\u0432 \u0439\u043E\u0433\u043E \u0443 \u0432\u0438\u0445\u0456\u0434\u043D\u0438\u0439 \u0442\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043D\u044F.",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "\u0412\u0438\u043A\u043E\u0440\u0438\u0441\u0442\u0430\u0439 \u0434\u0430\u0442\u0443 \u0420\u0420\u0420\u0420-\u041C\u041C-\u0414\u0414 \u0430\u0431\u043E ? \u0434\u043B\u044F \u043D\u0435\u0432\u0456\u0434\u043E\u043C\u043E\u0433\u043E \u0441\u0442\u0440\u043E\u043A\u0443.",
  "That calendar date does not exist.": "\u0422\u0430\u043A\u043E\u0457 \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u043D\u043E\u0457 \u0434\u0430\u0442\u0438 \u043D\u0435 \u0456\u0441\u043D\u0443\u0454.",
  "The execution order contains the same step twice.": "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u043C\u0456\u0441\u0442\u0438\u0442\u044C \u0442\u043E\u0439 \u0441\u0430\u043C\u0438\u0439 \u043A\u0440\u043E\u043A \u0434\u0432\u0456\u0447\u0456.",
  "Only numbered, undated steps can be placed in an execution order.": "\u0423 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0432\u0438\u043A\u043E\u043D\u0430\u043D\u043D\u044F \u043C\u043E\u0436\u043D\u0430 \u0434\u043E\u0434\u0430\u0442\u0438 \u043B\u0438\u0448\u0435 \u043D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u0456 \u043A\u0440\u043E\u043A\u0438 \u0431\u0435\u0437 \u0434\u0430\u0442\u0438.",
  Untitled: "\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0438",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "\u0423 \u0446\u0456\u0439 \u043A\u0430\u0440\u0442\u0456 \u043D\u0435\u043C\u0430\u0454 \u0432\u0443\u0437\u043B\u0456\u0432. \u0412\u0456\u0434\u043A\u0440\u0438\u0439 \u0432\u0438\u0445\u0456\u0434\u043D\u0438\u0439 \u0442\u0435\u043A\u0441\u0442 \u0456 \u0434\u043E\u0434\u0430\u0439 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0430\u0431\u043E \u043F\u0443\u043D\u043A\u0442 \u0441\u043F\u0438\u0441\u043A\u0443.",
  "Mark incomplete": "\u041F\u043E\u0437\u043D\u0430\u0447\u0438\u0442\u0438 \u043D\u0435\u0432\u0438\u043A\u043E\u043D\u0430\u043D\u0438\u043C",
  "Invalid saved map patterns. Default patterns are active.": "\u0417\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u0456 \u043F\u0430\u0442\u0435\u0440\u043D\u0438 \u043D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u0456. \u0414\u0456\u044E\u0442\u044C \u043F\u043E\u0447\u0430\u0442\u043A\u043E\u0432\u0456 \u043F\u0440\u0430\u0432\u0438\u043B\u0430.",
  "Automatically open matching notes as maps": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E \u0432\u0456\u0434\u043A\u0440\u0438\u0432\u0430\u0442\u0438 \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u043D\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438 \u044F\u043A \u043A\u0430\u0440\u0442\u0438",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "\u0414\u043B\u044F \u043D\u043E\u0442\u0430\u0442\u043E\u043A, \u0449\u043E \u0432\u0456\u0434\u043F\u043E\u0432\u0456\u0434\u0430\u044E\u0442\u044C \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C \u043D\u0438\u0436\u0447\u0435. \u042F\u0432\u043D\u0435 \u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0442\u044F \u0432\u0438\u0445\u0456\u0434\u043D\u043E\u0433\u043E Markdown \u0437\u0430\u043B\u0438\u0448\u0430\u0454 \u043D\u043E\u0442\u0430\u0442\u043A\u0443 \u0432 \u0440\u0435\u0436\u0438\u043C\u0456 Markdown.",
  "Invalid pattern on line {line}: {error}": "\u041D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u0438\u0439 \u043F\u0430\u0442\u0435\u0440\u043D \u0443 \u0440\u044F\u0434\u043A\u0443 {line}: {error}",
  "Patterns saved.": "\u041F\u0430\u0442\u0435\u0440\u043D\u0438 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u043E.",
  "Pattern syntax": "\u0421\u0438\u043D\u0442\u0430\u043A\u0441\u0438\u0441 \u043F\u0430\u0442\u0435\u0440\u043D\u0456\u0432",
  "Glob (wildcards)": "Glob (\u043C\u0430\u0441\u043A\u0438)",
  "Regular expressions": "\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u0456 \u0432\u0438\u0440\u0430\u0437\u0438",
  "Map file patterns": "\u041F\u0430\u0442\u0435\u0440\u043D\u0438 \u0444\u0430\u0439\u043B\u0456\u0432 \u043A\u0430\u0440\u0442",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "\u041E\u0434\u0438\u043D \u043F\u0430\u0442\u0435\u0440\u043D \u043D\u0430 \u0440\u044F\u0434\u043E\u043A; \u0434\u043E\u0441\u0442\u0430\u0442\u043D\u044C\u043E \u0437\u0431\u0456\u0433\u0443 \u0437 \u0431\u0443\u0434\u044C-\u044F\u043A\u0438\u043C. Glob \u0431\u0435\u0437 / \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u044F\u0454 \u043D\u0430\u0437\u0432\u0443 \u0444\u0430\u0439\u043B\u0443 \u0432 \u0443\u0441\u0456\u0445 \u043F\u0430\u043F\u043A\u0430\u0445, \u0456\u0437 / \u2014 \u0448\u043B\u044F\u0445 \u0432\u0456\u0434 \u043A\u043E\u0440\u0435\u043D\u044F \u0441\u0445\u043E\u0432\u0438\u0449\u0430. \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u0456 *, ** \u0456 ?. Regex \u043F\u0435\u0440\u0435\u0432\u0456\u0440\u044F\u0454 \u0448\u043B\u044F\u0445 \u0432\u0456\u0434 \u043A\u043E\u0440\u0435\u043D\u044F \u0441\u0445\u043E\u0432\u0438\u0449\u0430, \u0431\u0435\u0437 \u043E\u0431\u0433\u043E\u0440\u0442\u043A\u0438 /\u2026/. \u0420\u0435\u0433\u0456\u0441\u0442\u0440 \u043D\u0435 \u0432\u0440\u0430\u0445\u043E\u0432\u0443\u0454\u0442\u044C\u0441\u044F. \u041B\u0438\u0448\u0435 Markdown-\u0444\u0430\u0439\u043B\u0438.",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "\u0412\u043B\u0430\u0441\u0442\u0438\u0432\u0456\u0441\u0442\u044C mindmap: true \u0442\u0430\u043A\u043E\u0436 \u043F\u043E\u0437\u043D\u0430\u0447\u0430\u0454 \u043A\u0430\u0440\u0442\u0443. \u041D\u0435\u043A\u043E\u0440\u0435\u043A\u0442\u043D\u0438\u0439 \u0432\u0432\u0456\u0434 \u0437\u0430\u043B\u0438\u0448\u0430\u0454 \u0430\u043A\u0442\u0438\u0432\u043D\u0438\u043C\u0438 \u043E\u0441\u0442\u0430\u043D\u043D\u0456 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u0456 \u043F\u0440\u0430\u0432\u0438\u043B\u0430. \u041F\u0430\u0442\u0435\u0440\u043D\u0438 \u0441\u043F\u0456\u043B\u044C\u043D\u0456 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u0432\u0456\u0434\u043A\u0440\u0438\u0442\u0442\u044F, \u043F\u043E\u0448\u0443\u043A\u0443 \u043A\u0430\u0440\u0442 \u0456 \u0441\u043F\u0438\u0441\u043A\u0456\u0432 \u043A\u0440\u043E\u043A\u0456\u0432.",
  "This JSON map format is not supported.": "\u0426\u0435\u0439 \u0444\u043E\u0440\u043C\u0430\u0442 JSON-\u043A\u0430\u0440\u0442 \u043D\u0435 \u043F\u0456\u0434\u0442\u0440\u0438\u043C\u0443\u0454\u0442\u044C\u0441\u044F.",
  "Restore default patterns": "\u0412\u0456\u0434\u043D\u043E\u0432\u0438\u0442\u0438 \u043F\u043E\u0447\u0430\u0442\u043A\u043E\u0432\u0456 \u043F\u0430\u0442\u0435\u0440\u043D\u0438",
  "Restore default settings": "\u0412\u0456\u0434\u043D\u043E\u0432\u0438\u0442\u0438 \u043F\u043E\u0447\u0430\u0442\u043A\u043E\u0432\u0456 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F",
  "Restore defaults": "\u0412\u0456\u0434\u043D\u043E\u0432\u0438\u0442\u0438",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "\u0412\u0456\u0434\u043D\u043E\u0432\u0438\u0442\u0438 \u043F\u043E\u0447\u0430\u0442\u043A\u043E\u0432\u0456 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u043F\u043B\u0430\u0433\u0456\u043D\u0430, \u0433\u0430\u0440\u044F\u0447\u0456 \u043A\u043B\u0430\u0432\u0456\u0448\u0456 \u0439 \u043F\u0430\u0442\u0435\u0440\u043D\u0438 \u043A\u0430\u0440\u0442? \u041B\u043E\u043A\u0430\u043B\u044C\u043D\u0456 \u0441\u0442\u0430\u043D\u0438 \u043F\u0435\u0440\u0435\u0433\u043B\u044F\u0434\u0443 \u0442\u0430 \u0437\u0431\u0435\u0440\u0435\u0436\u0435\u043D\u0456 \u043D\u043E\u0442\u0430\u0442\u043A\u0438 \u0437\u0430\u043B\u0438\u0448\u0430\u0442\u044C\u0441\u044F. \u0414\u043B\u044F \u0437\u0430\u0441\u0442\u043E\u0441\u0443\u0432\u0430\u043D\u043D\u044F \u043C\u043E\u0432\u0438 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438 Obsidian.",
  "Default settings restored. Restart Obsidian to apply the language.": "\u041F\u043E\u0447\u0430\u0442\u043A\u043E\u0432\u0456 \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u043D\u044F \u0432\u0456\u0434\u043D\u043E\u0432\u043B\u0435\u043D\u043E. \u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438 Obsidian, \u0449\u043E\u0431 \u0437\u0430\u0441\u0442\u043E\u0441\u0443\u0432\u0430\u0442\u0438 \u043C\u043E\u0432\u0443."
};

// src/locales/pl.json
var pl_default = {
  "A node with its own Markdown line is required.": "Wymagany jest w\u0119ze\u0142 z w\u0142asnym wierszem Markdown.",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "Powielone ID bloku. Popraw je w Markdown przed skopiowaniem adresu.",
  "A unique block ID is required.": "Wymagane jest unikalne ID bloku.",
  "The selection changed. Run the command again.": "Zaznaczenie si\u0119 zmieni\u0142o. Powt\xF3rz polecenie.",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "Nie mo\u017Cna przenie\u015B\u0107 ga\u0142\u0119zi do niej samej, jej potomka ani niezgodnego w\u0119z\u0142a Markdown.",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "Punkt po podnag\u0142\xF3wku nale\u017Cy do niego. Wybierz nadrz\u0119dny punkt listy lub zmie\u0144 struktur\u0119 Markdown.",
  "Sibling above": "W\u0119ze\u0142 r\xF3wnorz\u0119dny powy\u017Cej",
  "Sibling below": "W\u0119ze\u0142 r\xF3wnorz\u0119dny poni\u017Cej",
  "Child node": "W\u0119ze\u0142 potomny",
  "Parent node": "W\u0119ze\u0142 nadrz\u0119dny",
  "Find a map\u2026": "Znajd\u017A map\u0119\u2026",
  "Note name, alias or new link\u2026": "Nazwa notatki, alias lub nowy link\u2026",
  select: "wybierz",
  "insert link": "wstaw link",
  "return to node": "wr\xF3\u0107 do w\u0119z\u0142a",
  "file not created yet": "plik jeszcze nie istnieje",
  "new link": "nowy link",
  "Insert a link without creating a file": "Wstaw link bez tworzenia pliku",
  "The file changed or was deleted. Search again.": "Plik zmieniono lub usuni\u0119to. Wyszukaj ponownie.",
  "Link (Ctrl+K)": "Link (Ctrl+K)",
  "Highlight text": "Wyr\xF3\u017Cnij tekst",
  "Mark as question": "Oznacz jako pytanie",
  "Step deadline": "Termin kroku",
  Date: "Data",
  " Unknown deadline (?)": " Nieznany termin (?)",
  "Previous month": "Poprzedni miesi\u0105c",
  "Next month": "Nast\u0119pny miesi\u0105c",
  Mon: "Pon",
  Tue: "Wt",
  Wed: "\u015Ar",
  Thu: "Czw",
  Fri: "Pt",
  Sat: "Sob",
  Sun: "Ndz",
  Cancel: "Anuluj",
  Save: "Zapisz",
  "Enter to save, Esc to cancel.": "Enter \u2014 zapisz, Esc \u2014 anuluj.",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Enter \u2014 potwierd\u017A, Esc \u2014 anuluj.",
  "Delete branch": "Usu\u0144 ga\u0142\u0105\u017A",
  "Extend selection up": "Rozszerz zaznaczenie w g\xF3r\u0119",
  "Extend selection down": "Rozszerz zaznaczenie w d\xF3\u0142",
  "Extend selection to parent": "Rozszerz zaznaczenie do rodzica",
  "Extend selection to child": "Rozszerz zaznaczenie do dziecka",
  "Select all visible nodes": "Zaznacz wszystkie widoczne w\u0119z\u0142y",
  "Cut branch": "Wytnij ga\u0142\u0105\u017A",
  "Copy link to node": "Kopiuj link do w\u0119z\u0142a",
  "Copy branch": "Kopiuj ga\u0142\u0105\u017A",
  "Paste as child branch": "Wklej jako ga\u0142\u0105\u017A potomn\u0105",
  "Paste branch after node": "Wklej ga\u0142\u0105\u017A po w\u0119\u017Ale",
  Undo: "Cofnij",
  Redo: "Pon\xF3w",
  "Edit node": "Edytuj w\u0119ze\u0142",
  "Add child node": "Dodaj w\u0119ze\u0142 potomny",
  "Add parent node": "Dodaj w\u0119ze\u0142 nadrz\u0119dny",
  "Add sibling above": "Dodaj w\u0119ze\u0142 r\xF3wnorz\u0119dny powy\u017Cej",
  "Add sibling node": "Dodaj w\u0119ze\u0142 r\xF3wnorz\u0119dny",
  "Move branch up": "Przenie\u015B ga\u0142\u0105\u017A wy\u017Cej",
  "Move branch down": "Przenie\u015B ga\u0142\u0105\u017A ni\u017Cej",
  "Make child of previous node": "Uczy\u0144 dzieckiem poprzedniego w\u0119z\u0142a",
  "Move up one level": "Przenie\u015B o poziom wy\u017Cej",
  "Toggle completion": "Prze\u0142\u0105cz wykonanie",
  "Make numbered step": "Utw\xF3rz numerowany krok",
  "Set date": "Ustaw dat\u0119",
  "Open source Markdown": "Otw\xF3rz \u017Ar\xF3d\u0142owy Markdown",
  "Select parent node": "Wybierz rodzica",
  "Select child node": "Wybierz dziecko",
  "Select previous sibling": "Wybierz poprzedni w\u0119ze\u0142 r\xF3wnorz\u0119dny",
  "Select next sibling": "Wybierz nast\u0119pny w\u0119ze\u0142 r\xF3wnorz\u0119dny",
  "Select first node": "Wybierz pierwszy w\u0119ze\u0142",
  "Select last node": "Wybierz ostatni w\u0119ze\u0142",
  "Collapse / expand node": "Zwi\u0144 / rozwi\u0144 w\u0119ze\u0142",
  "Collapse all roots": "Zwi\u0144 wszystkie korzenie",
  "Collapse selected branch": "Zwi\u0144 wybran\u0105 ga\u0142\u0105\u017A",
  "Expand selected branch": "Rozwi\u0144 wybran\u0105 ga\u0142\u0105\u017A",
  "Selected node only": "Tylko wybrany w\u0119ze\u0142",
  "Show one child level": "Poka\u017C jeden poziom potomk\xF3w",
  "Show two child levels": "Poka\u017C dwa poziomy potomk\xF3w",
  "Show three child levels": "Poka\u017C trzy poziomy potomk\xF3w",
  "Show four child levels": "Poka\u017C cztery poziomy potomk\xF3w",
  "Show five child levels": "Poka\u017C pi\u0119\u0107 poziom\xF3w potomk\xF3w",
  "Expand all child levels": "Rozwi\u0144 wszystkie poziomy potomk\xF3w",
  "Find in map": "Znajd\u017A w mapie",
  "Fit map": "Dopasuj map\u0119",
  "Specify a key after the modifiers.": "Podaj klawisz po modyfikatorach.",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "Modyfikatory: Ctrl, Alt, Shift, Meta lub Mod.",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "Nie powtarzaj modyfikator\xF3w. Mod oznacza Ctrl lub Cmd.",
  "This image format is not supported.": "Nieobs\u0142ugiwany format obrazu.",
  "The clipboard image is empty.": "Obraz w schowku jest pusty.",
  "Could not save the attachment.": "Nie uda\u0142o si\u0119 zapisa\u0107 za\u0142\u0105cznika.",
  "Saving image\u2026": "Zapisywanie obrazu\u2026",
  "Node text": "Tekst w\u0119z\u0142a",
  "Save (Enter)": "Zapisz (Enter)",
  "Cancel (Escape)": "Anuluj (Escape)",
  "Close the editor and discard your changes?": "Zamkn\u0105\u0107 edytor i odrzuci\u0107 zmiany?",
  "Continue editing": "Kontynuuj edycj\u0119",
  "Discard changes": "Odrzu\u0107 zmiany",
  "A node cannot be empty.": "W\u0119ze\u0142 nie mo\u017Ce by\u0107 pusty.",
  "Multiple cursors are available in source Markdown.": "Wiele kursor\xF3w jest dost\u0119pnych w \u017Ar\xF3d\u0142owym Markdown.",
  "This command requires the source Markdown editor.": "To polecenie wymaga \u017Ar\xF3d\u0142owego edytora Markdown.",
  "Fixed width": "Sta\u0142a szeroko\u015B\u0107",
  "Fit node content": "Dopasuj do tre\u015Bci w\u0119z\u0142a",
  "Fit visible column": "Dopasuj do widocznej kolumny",
  "TraceView Mindmap: open map": "TraceView Mindmap: otw\xF3rz map\u0119",
  "Open current note as a map": "Otw\xF3rz bie\u017C\u0105c\u0105 notatk\u0119 jako map\u0119",
  "Open map at the Markdown cursor": "Otw\xF3rz map\u0119 w miejscu kursora Markdown",
  "Find a map": "Znajd\u017A map\u0119",
  "Create a simple tree": "Utw\xF3rz proste drzewo",
  "Create a vector (separate template)": "Utw\xF3rz wektor (osobny szablon)",
  "Steps, deadlines and QA": "Kroki, terminy i QA",
  "Mark as atomic step": "Oznacz jako krok atomowy",
  "Add step deadline": "Dodaj termin kroku",
  "Mark as QA": "Oznacz jako QA",
  "Toggle step completion": "Prze\u0142\u0105cz wykonanie kroku",
  "Paste as sibling branch": "Wklej jako ga\u0142\u0105\u017A r\xF3wnorz\u0119dn\u0105",
  "Undo map change": "Cofnij zmian\u0119 mapy",
  "Redo map change": "Pon\xF3w zmian\u0119 mapy",
  "Insert QA in Markdown editor": "Wstaw QA w edytorze Markdown",
  "Insert unnumbered step in Markdown editor": "Wstaw nienumerowany krok w edytorze Markdown",
  "Open map at this node": "Otw\xF3rz map\u0119 na tym w\u0119\u017Ale",
  "Open in TraceView Mindmap": "Otw\xF3rz w TraceView Mindmap",
  "The note changed. Open it again at the current line.": "Notatka si\u0119 zmieni\u0142a. Otw\xF3rz ponownie na bie\u017C\u0105cym wierszu.",
  "Save or cancel the node draft.": "Zapisz lub anuluj szkic w\u0119z\u0142a.",
  "New vector name": "Nazwa nowego wektora",
  "New tree name": "Nazwa nowego drzewa",
  "Use a name without path characters.": "U\u017Cyj nazwy bez znak\xF3w \u015Bcie\u017Cki.",
  "A file with this name already exists.": "Plik o tej nazwie ju\u017C istnieje.",
  "The Markdown editor has newer text. Wait for it to save and try again.": "Edytor Markdown ma nowszy tekst. Poczekaj na zapis i spr\xF3buj ponownie.",
  "Branch copied": "Ga\u0142\u0105\u017A skopiowana",
  "Branch saved to the plugin clipboard": "Ga\u0142\u0105\u017A zapisana w schowku wtyczki",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "Schowek niedost\u0119pny. Ga\u0142\u0119zi nie wyci\u0119to. Zezw\xF3l na dost\u0119p i spr\xF3buj ponownie.",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "Schowek niedost\u0119pny. U\u017Cyj \u201EWklej tekst ga\u0142\u0119zi\u201D w menu \u22EF.",
  "Save or cancel the node draft before navigating.": "Zapisz lub anuluj szkic przed przej\u015Bciem.",
  "Waiting for Obsidian to be ready\u2026": "Oczekiwanie na gotowo\u015B\u0107 Obsidian\u2026",
  "Wait for Obsidian to load, then open the map.": "Poczekaj na za\u0142adowanie Obsidian, potem otw\xF3rz map\u0119.",
  "This address is duplicated. Fix the block ID in Markdown.": "Powielony adres. Popraw ID bloku w Markdown.",
  "The linked node was not found.": "Nie znaleziono wskazanego w\u0119z\u0142a.",
  "Collapse levels": "Poziomy zwijania",
  "Delete selected branch": "Usu\u0144 wybran\u0105 ga\u0142\u0105\u017A",
  "Sibling node": "W\u0119ze\u0142 r\xF3wnorz\u0119dny",
  Edit: "Edytuj",
  "Multiple selection: taps or rectangle": "Wielokrotny wyb\xF3r: dotyk lub ramka",
  Search: "Szukaj",
  "Layout and node width": "Uk\u0142ad i szeroko\u015B\u0107 w\u0119z\u0142\xF3w",
  "Map actions": "Dzia\u0142ania mapy",
  "Open now": "Otw\xF3rz teraz",
  Map: "Mapa",
  Outline: "Lista",
  Table: "Tabela",
  "Expand entire map": "Rozwi\u0144 ca\u0142\u0105 map\u0119",
  "All child levels": "Wszystkie poziomy potomk\xF3w",
  "The map will open after the workspace loads\u2026": "Mapa otworzy si\u0119 po za\u0142adowaniu obszaru roboczego\u2026",
  "File missing or deleted. Open another map.": "Plik nie istnieje lub zosta\u0142 usuni\u0119ty. Otw\xF3rz inn\u0105 map\u0119.",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "Mapa si\u0119 zmieni\u0142a lub trwa zapis. Szkic jest w polu. Skopiuj go przed anulowaniem i powt\xF3rz na aktualnej mapie.",
  "The file no longer exists.": "Plik ju\u017C nie istnieje.",
  "Select a map node first": "Najpierw wybierz w\u0119ze\u0142 mapy",
  "Another map is open. The selection was copied, but not cut.": "Otwarta jest inna mapa. Wyb\xF3r skopiowano, ale nie wyci\u0119to.",
  "This command requires one selected node.": "To polecenie wymaga jednego wybranego w\u0119z\u0142a.",
  "The map was closed or renamed. Copy the address again.": "Map\u0119 zamkni\u0119to lub zmieniono jej nazw\u0119. Skopiuj adres ponownie.",
  "Node link copied.": "Link do w\u0119z\u0142a skopiowany.",
  "Another map is open. The branch was copied, but not cut.": "Otwarta jest inna mapa. Ga\u0142\u0105\u017A skopiowano, ale nie wyci\u0119to.",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "Ga\u0142\u0105\u017A wyci\u0119ta. Ctrl+V \u2014 wklej, Cofnij \u2014 przywr\xF3\u0107.",
  "The note was renamed. Copy the draft and reopen the editor.": "Notatk\u0119 przemianowano. Skopiuj szkic i otw\xF3rz edytor ponownie.",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "Mapa zmieniona z zewn\u0105trz. Szkic zachowany. Skopiuj go przed ponown\u0105 edycj\u0105.",
  "The node no longer exists. Your draft is preserved.": "W\u0119ze\u0142 ju\u017C nie istnieje. Szkic zachowany.",
  "Steps \xB7 Deadlines \xB7 QA": "Kroki \xB7 Terminy \xB7 QA",
  "Step deadline\u2026": "Termin kroku\u2026",
  "Completed / incomplete": "Wykonane / niewykonane",
  "Move up": "Przenie\u015B wy\u017Cej",
  "Move down": "Przenie\u015B ni\u017Cej",
  "Nest in previous branch": "Zagnie\u017Ad\u017A w poprzedniej ga\u0142\u0119zi",
  "Open text in editor": "Otw\xF3rz tekst w edytorze",
  "Delete branch\u2026": "Usu\u0144 ga\u0142\u0105\u017A\u2026",
  "Export HTML\u2026": "Eksportuj HTML\u2026",
  "Export SVG\u2026": "Eksportuj SVG\u2026",
  "Paste branch text\u2026": "Wklej tekst ga\u0142\u0119zi\u2026",
  "Paste child Markdown branch": "Wklej potomn\u0105 ga\u0142\u0105\u017A Markdown",
  "Renumber steps": "Przenumeruj kroki",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "Mapa docelowa si\u0119 zmieni\u0142a. Otw\xF3rz ponownie podpowiedzi link\xF3w. Szkic zachowany.",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "Ten blok nie jest osobnym w\u0119z\u0142em mapy. U\u017Cyj \u201EKopiuj link do w\u0119z\u0142a\u201D.",
  "Native editor unavailable. Using text input. ": "Natywny edytor niedost\u0119pny. U\u017Cywam tekstowego. ",
  "The note does not exist.": "Notatka nie istnieje.",
  "File already exists. Choose another name.": "Plik ju\u017C istnieje. Wybierz inn\u0105 nazw\u0119.",
  Steps: "Kroki",
  Deadlines: "Terminy",
  "Open QA": "Otwarte QA",
  Refresh: "Od\u015Bwie\u017C",
  "Collapse all": "Zwi\u0144 wszystko",
  "Expand all": "Rozwi\u0144 wszystko",
  "Search steps": "Szukaj krok\xF3w",
  "Find\u2026": "Znajd\u017A\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "Zmiana kolejno\u015Bci zmienia tylko numery krok\xF3w w jednym pliku. Ga\u0142\u0119zie pozostaj\u0105 na miejscu. Kroki datowane i nienumerowane maj\u0105 osobn\u0105 kolejno\u015B\u0107.",
  Expand: "Rozwi\u0144",
  Collapse: "Zwi\u0144",
  "No open items match this filter.": "Brak otwartych pozycji pasuj\u0105cych do filtra.",
  "Mark completed": "Oznacz jako wykonane",
  "Move earlier in execution order": "Wykonaj wcze\u015Bniej",
  "Move later in execution order": "Wykonaj p\xF3\u017Aniej",
  "Deadline ?": "Termin ?",
  "Node editor": "Edytor w\u0119z\u0142\xF3w",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "Dotyczy nast\u0119pnej edycji. Natywny u\u017Cywa Live Preview i podpowiedzi Obsidian, a w razie potrzeby zast\u0119puje go pole tekstowe.",
  "Native Obsidian": "Natywny Obsidian",
  "Text input": "Pole tekstowe",
  "Automatically restore large maps": "Automatycznie przywracaj du\u017Ce mapy",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "Przy starcie aktywna mapa czeka na stabiln\u0105 reakcj\u0119 Obsidian. \u201EOtw\xF3rz teraz\u201D pomija oczekiwanie.",
  "Hide frozen steps": "Ukryj zamro\u017Cone kroki",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "Pomijaj ga\u0142\u0119zie \u{1F9CA} na listach krok\xF3w i termin\xF3w. Mapy pokazuj\u0105 ca\u0142y tekst.",
  "Left arrow collapses the branch first": "Strza\u0142ka w lewo najpierw zwija ga\u0142\u0105\u017A",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "Wy\u0142\u0105czone: przejd\u017A do rodzica. W\u0142\u0105czone: zwi\u0144 otwart\u0105 ga\u0142\u0105\u017A, kolejne naci\u015Bni\u0119cie wybiera rodzica.",
  "Show [ ] in list text": "Poka\u017C [ ] w tre\u015Bci list",
  "Show #step in list text": "Poka\u017C #step w tre\u015Bci list",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "Dotyczy tylko widoku Kroki \xB7 Terminy \xB7 QA. Tre\u015B\u0107 notatek i przyciski wykonania zostaj\u0105 zachowane.",
  "Map node width": "Szeroko\u015B\u0107 w\u0119z\u0142\xF3w mapy",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "Dotyczy od razu wszystkich otwartych map. Lista i Tabela zachowuj\u0105 w\u0142asn\u0105 szeroko\u015B\u0107.",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "Zwini\u0119cia i kamera s\u0105 zapisywane na tym urz\u0105dzeniu. Przegl\u0105danie nie zmienia Markdown ani nie dodaje ukrytych ID. Windows i Android mog\u0105 mie\u0107 osobne widoki.",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "Natywny tryb u\u017Cywa edytora Obsidian, tekstowy \u2014 Editor API. Polecenia wymagaj\u0105ce pe\u0142nego widoku Markdown uruchamiaj przez \u22EF \u2192 Otw\xF3rz tekst w edytorze.",
  "Map hotkeys": "Skr\xF3ty mapy",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "Zmiany dzia\u0142aj\u0105 od razu we wszystkich mapach. Naci\u015Bnij \u2328, potem skr\xF3t lub wpisz: Ctrl+C, Alt+Shift+1. Warianty oddziel przecinkami. \xD7 wy\u0142\u0105cza, \u21BA przywraca domy\u015Blne. W edytorze dzia\u0142aj\u0105 zwyk\u0142e skr\xF3ty.",
  Unassigned: "Nieprzypisane",
  "Record shortcut": "Nagraj skr\xF3t",
  Disable: "Wy\u0142\u0105cz",
  "Default shortcuts": "Domy\u015Blne skr\xF3ty",
  "Search map\u2026": "Szukaj w mapie\u2026",
  "Search map": "Szukaj w mapie",
  " A\u2013Z": " A\u2013Z",
  "Close search": "Zamknij wyszukiwanie",
  "Search results": "Wyniki wyszukiwania",
  "No results": "Brak wynik\xF3w",
  "This Obsidian version has no compatible native editor.": "Ta wersja Obsidian nie ma zgodnego natywnego edytora.",
  "Could not prepare the native editor.": "Nie uda\u0142o si\u0119 przygotowa\u0107 natywnego edytora.",
  "The native editor cannot protect a single-line draft.": "Natywny edytor nie mo\u017Ce zabezpieczy\u0107 jednowierszowego szkicu.",
  "Native Obsidian link": "Natywny link Obsidian",
  "Map filter": "Filtr map",
  "All maps": "Wszystkie mapy",
  Maps: "Mapy",
  "No maps match this search.": "Brak map pasuj\u0105cych do zapytania.",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "Notatka zmieniona w innym oknie lub na innym urz\u0105dzeniu. Mapa od\u015Bwie\u017Cona. Powt\xF3rz na najnowszym tek\u015Bcie.",
  "History stopped because the text changed externally. Undo will preserve those changes.": "Historia zatrzymana z powodu zewn\u0119trznej zmiany tekstu. Cofni\u0119cie zachowa te zmiany.",
  "Loading map\u2026": "\u0141adowanie mapy\u2026",
  "Node address: ^": "Adres w\u0119z\u0142a: ^",
  "Branch ready to move": "Ga\u0142\u0105\u017A gotowa do przeniesienia",
  "Before: ": "Przed: ",
  "After: ": "Po: ",
  "As children: ": "Jako dzieci: ",
  "Expand node": "Rozwi\u0144 w\u0119ze\u0142",
  "Collapse node": "Zwi\u0144 w\u0119ze\u0142",
  "Collapse branch": "Zwi\u0144 ga\u0142\u0105\u017A",
  "Expand branch": "Rozwi\u0144 ga\u0142\u0105\u017A",
  "Paste after node": "Wklej po w\u0119\u017Ale",
  Language: "J\u0119zyk",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "Automatycznie u\u017Cywa j\u0119zyka Obsidian. Uruchom ponownie Obsidian, aby zastosowa\u0107 zmian\u0119.",
  "Automatic (Obsidian)": "Automatycznie (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "J\u0119zyk zapisany. Uruchom ponownie Obsidian.",
  "Selected nodes: {count}": "Wybrane w\u0119z\u0142y: {count}",
  "Child levels: {count}": "Poziomy potomk\xF3w: {count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "W\u0119z\u0142y: {nodes} \xB7 Otwarte kroki: {steps}",
  "Export {format} \u2014 file name": "Eksport {format} \u2014 nazwa pliku",
  "Saved {path}": "Zapisano {path}",
  "Expand map: {name}": "Rozwi\u0144 map\u0119: {name}",
  "Collapse map: {name}": "Zwi\u0144 map\u0119: {name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "Powielone skr\xF3ty: {shortcuts}. Pierwsze polecenie na li\u015Bcie ma pierwsze\u0144stwo.",
  "Next action": "Nast\u0119pna czynno\u015B\u0107",
  "First action": "Pierwsza czynno\u015B\u0107",
  "Active now": "Aktywne teraz",
  "Frozen / someday": "Zamro\u017Cone / kiedy\u015B",
  "First step": "Pierwszy krok",
  "{path} \xB7 References: {count}": "{path} \xB7 Odwo\u0142ania: {count}",
  "Attachment saved, but the editor is already closed: {link}": "Za\u0142\u0105cznik zapisany, ale edytor jest ju\u017C zamkni\u0119ty: {link}",
  "Copy selection": "Kopiuj zaznaczenie",
  "Cut selection": "Wytnij zaznaczenie",
  "Delete selection": "Usu\u0144 zaznaczenie",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "Pe\u0142na mapa \xB7 W\u0119z\u0142y: {count} \xB7 Eksport do odczytu. Kliknij znacznik ga\u0142\u0119zi, aby j\u0105 zwin\u0105\u0107. Etykiety zachowuj\u0105 Markdown. Linki i za\u0142\u0105czniki wymagaj\u0105 Obsidian.",
  "This map contains no outline nodes.": "Mapa nie zawiera w\u0119z\u0142\xF3w.",
  "This node no longer exists. Reopen the map and try again.": "Ten w\u0119ze\u0142 ju\u017C nie istnieje. Otw\xF3rz map\u0119 ponownie.",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "W\u0119ze\u0142 musi mie\u015Bci\u0107 si\u0119 w jednym wierszu. U\u017Cyj dziecka lub powi\u0105zanej notatki.",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "Tekst stanie si\u0119 blokiem kodu lub separatorem. U\u017Cyj znaku ucieczki lub edytuj \u017Ar\xF3d\u0142o.",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown obs\u0142uguje sze\u015B\u0107 poziom\xF3w nag\u0142\xF3wk\xF3w. Dodaj punkt potomny w \u017Ar\xF3dle.",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "Tekst nie nadaje si\u0119 na rodzica Markdown. U\u017Cyj znaku ucieczki lub edytuj \u017Ar\xF3d\u0142o.",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "Ga\u0142\u0105\u017A zawiera tre\u015B\u0107 poza w\u0119z\u0142ami. Edytuj struktur\u0119 w \u017Ar\xF3dle, aby jej nie utraci\u0107.",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "Niejednoznaczne wci\u0119cia. Popraw je w \u017Ar\xF3dle przed przeniesieniem.",
  "That move would exceed Markdown\u2019s six heading levels.": "Przeniesienie przekroczy sze\u015B\u0107 poziom\xF3w nag\u0142\xF3wk\xF3w.",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "Przenoszenie mi\u0119dzy nag\u0142\xF3wkiem a punktem zmienia znaczenie. U\u017Cyj \u017Ar\xF3d\u0142a.",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "Wci\u0119cia mieszanych nag\u0142\xF3wk\xF3w i punkt\xF3w s\u0105 niejednoznaczne. U\u017Cyj \u017Ar\xF3d\u0142a.",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "Wycofanie punktu spod nag\u0142\xF3wka wymaga zmiany formatu. U\u017Cyj \u017Ar\xF3d\u0142a.",
  "A branch cannot be moved into itself or one of its descendants.": "Nie mo\u017Cna przenie\u015B\u0107 ga\u0142\u0119zi do siebie ani potomka.",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "Nag\u0142\xF3wek nie mo\u017Ce by\u0107 dzieckiem punktu. Zmie\u0144 format w \u017Ar\xF3dle.",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "Punkt po podnag\u0142\xF3wku nale\u017Cy do niego. Wybierz rodzica z listy lub edytuj \u017Ar\xF3d\u0142o.",
  "Paste an outline branch, or paste one line as a new node.": "Wklej ga\u0142\u0105\u017A listy lub jeden wiersz jako nowy w\u0119ze\u0142.",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "Wklejaj punkty obok punkt\xF3w, a nag\u0142\xF3wki obok nag\u0142\xF3wk\xF3w. Format zmie\u0144 w \u017Ar\xF3dle.",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "Schowek zawiera tre\u015B\u0107 poza list\u0105. Wklej w \u017Ar\xF3dle, aby j\u0105 zachowa\u0107.",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "U\u017Cyj daty RRRR-MM-DD lub ? dla nieznanego terminu.",
  "That calendar date does not exist.": "Ta data nie istnieje.",
  "The execution order contains the same step twice.": "Kolejno\u015B\u0107 zawiera ten sam krok dwa razy.",
  "Only numbered, undated steps can be placed in an execution order.": "Kolejno\u015B\u0107 dotyczy tylko numerowanych krok\xF3w bez daty.",
  Untitled: "Bez tytu\u0142u",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "Mapa nie ma w\u0119z\u0142\xF3w. Otw\xF3rz \u017Ar\xF3d\u0142o i dodaj nag\u0142\xF3wek lub punkt listy.",
  "Mark incomplete": "Oznacz jako niewykonane",
  "Invalid saved map patterns. Default patterns are active.": "Zapisane wzorce s\u0105 nieprawid\u0142owe. Dzia\u0142aj\u0105 regu\u0142y domy\u015Blne.",
  "Automatically open matching notes as maps": "Automatycznie otwieraj pasuj\u0105ce notatki jako mapy",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "Dotyczy notatek pasuj\u0105cych do poni\u017Cszych wzorc\xF3w. Jawne otwarcie \u017Ar\xF3d\u0142a pozostawia notatk\u0119 w Markdown.",
  "Invalid pattern on line {line}: {error}": "Nieprawid\u0142owy wzorzec w wierszu {line}: {error}",
  "Patterns saved.": "Wzorce zapisane.",
  "Pattern syntax": "Sk\u0142adnia wzorc\xF3w",
  "Glob (wildcards)": "Glob (symbole wieloznaczne)",
  "Regular expressions": "Wyra\u017Cenia regularne",
  "Map file patterns": "Wzorce plik\xF3w map",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "Jeden wzorzec na wiersz; wystarczy dowolne dopasowanie. Glob bez / sprawdza nazwy w ka\u017Cdej teczce, z / \u015Bcie\u017Cki wzgl\u0119dem skarbca. U\u017Cyj *, ** i ?. Regex sprawdza \u015Bcie\u017Cki bez otaczaj\u0105cych /. Wielko\u015B\u0107 liter nie ma znaczenia. Tylko pliki Markdown.",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "W\u0142a\u015Bciwo\u015B\u0107 mindmap: true te\u017C oznacza map\u0119. Nieprawid\u0142owy wpis zachowuje ostatnie zapisane regu\u0142y. Wzorce s\u0105 wsp\xF3lne dla automatycznego otwierania, wyszukiwania map i list krok\xF3w.",
  "This JSON map format is not supported.": "Ten format map JSON nie jest obs\u0142ugiwany.",
  "Restore default patterns": "Przywr\xF3\u0107 domy\u015Blne wzorce",
  "Restore default settings": "Przywr\xF3\u0107 ustawienia domy\u015Blne",
  "Restore defaults": "Przywr\xF3\u0107",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "Przywr\xF3ci\u0107 ustawienia, skr\xF3ty i wzorce map? Lokalne stany widoku i zapisane notatki zostan\u0105 zachowane. Uruchom ponownie Obsidian, aby zastosowa\u0107 j\u0119zyk.",
  "Default settings restored. Restart Obsidian to apply the language.": "Przywr\xF3cono ustawienia domy\u015Blne. Uruchom ponownie Obsidian, aby zastosowa\u0107 j\u0119zyk."
};

// src/locales/de.json
var de_default = {
  "A node with its own Markdown line is required.": "Ein Knoten mit eigener Markdown-Zeile ist erforderlich.",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "Doppelte Block-ID. Vor dem Kopieren im Markdown korrigieren.",
  "A unique block ID is required.": "Eine eindeutige Block-ID ist erforderlich.",
  "The selection changed. Run the command again.": "Auswahl ge\xE4ndert. Befehl erneut ausf\xFChren.",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "Ein Zweig kann nicht in sich selbst, einen Nachfahren oder einen inkompatiblen Markdown-Knoten verschoben werden.",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "Ein Listenpunkt nach einer Unter\xFCberschrift geh\xF6rt zu ihr. Einen Listenpunkt als Elternknoten w\xE4hlen oder Markdown-Struktur \xE4ndern.",
  "Sibling above": "Geschwisterknoten dar\xFCber",
  "Sibling below": "Geschwisterknoten darunter",
  "Child node": "Kindknoten",
  "Parent node": "Elternknoten",
  "Find a map\u2026": "Karte suchen\u2026",
  "Note name, alias or new link\u2026": "Notizname, Alias oder neuer Link\u2026",
  select: "ausw\xE4hlen",
  "insert link": "Link einf\xFCgen",
  "return to node": "zum Knoten zur\xFCck",
  "file not created yet": "Datei noch nicht erstellt",
  "new link": "neuer Link",
  "Insert a link without creating a file": "Link ohne Dateierstellung einf\xFCgen",
  "The file changed or was deleted. Search again.": "Datei ge\xE4ndert oder gel\xF6scht. Erneut suchen.",
  "Link (Ctrl+K)": "Link (Ctrl+K)",
  "Highlight text": "Text hervorheben",
  "Mark as question": "Als Frage markieren",
  "Step deadline": "Schrittfrist",
  Date: "Datum",
  " Unknown deadline (?)": " Unbekannte Frist (?)",
  "Previous month": "Vorheriger Monat",
  "Next month": "N\xE4chster Monat",
  Mon: "Mo",
  Tue: "Di",
  Wed: "Mi",
  Thu: "Do",
  Fri: "Fr",
  Sat: "Sa",
  Sun: "So",
  Cancel: "Abbrechen",
  Save: "Speichern",
  "Enter to save, Esc to cancel.": "Enter zum Speichern, Esc zum Abbrechen.",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Enter zum Best\xE4tigen, Esc zum Abbrechen.",
  "Delete branch": "Zweig l\xF6schen",
  "Extend selection up": "Auswahl nach oben erweitern",
  "Extend selection down": "Auswahl nach unten erweitern",
  "Extend selection to parent": "Auswahl zum Elternknoten erweitern",
  "Extend selection to child": "Auswahl zum Kind erweitern",
  "Select all visible nodes": "Alle sichtbaren Knoten ausw\xE4hlen",
  "Cut branch": "Zweig ausschneiden",
  "Copy link to node": "Link zum Knoten kopieren",
  "Copy branch": "Zweig kopieren",
  "Paste as child branch": "Als Kindzweig einf\xFCgen",
  "Paste branch after node": "Zweig nach Knoten einf\xFCgen",
  Undo: "R\xFCckg\xE4ngig",
  Redo: "Wiederholen",
  "Edit node": "Knoten bearbeiten",
  "Add child node": "Kindknoten hinzuf\xFCgen",
  "Add parent node": "Elternknoten hinzuf\xFCgen",
  "Add sibling above": "Geschwisterknoten dar\xFCber hinzuf\xFCgen",
  "Add sibling node": "Geschwisterknoten hinzuf\xFCgen",
  "Move branch up": "Zweig nach oben verschieben",
  "Move branch down": "Zweig nach unten verschieben",
  "Make child of previous node": "Als Kind des vorherigen Knotens einordnen",
  "Move up one level": "Eine Ebene nach oben verschieben",
  "Toggle completion": "Erledigt-Status umschalten",
  "Make numbered step": "Als nummerierten Schritt markieren",
  "Set date": "Datum festlegen",
  "Open source Markdown": "Markdown-Quelltext \xF6ffnen",
  "Select parent node": "Elternknoten ausw\xE4hlen",
  "Select child node": "Kindknoten ausw\xE4hlen",
  "Select previous sibling": "Vorherigen Geschwisterknoten ausw\xE4hlen",
  "Select next sibling": "N\xE4chsten Geschwisterknoten ausw\xE4hlen",
  "Select first node": "Ersten Knoten ausw\xE4hlen",
  "Select last node": "Letzten Knoten ausw\xE4hlen",
  "Collapse / expand node": "Knoten ein-/ausklappen",
  "Collapse all roots": "Alle Wurzeln einklappen",
  "Collapse selected branch": "Ausgew\xE4hlten Zweig einklappen",
  "Expand selected branch": "Ausgew\xE4hlten Zweig ausklappen",
  "Selected node only": "Nur ausgew\xE4hlter Knoten",
  "Show one child level": "Eine Kindebene anzeigen",
  "Show two child levels": "Zwei Kindebenen anzeigen",
  "Show three child levels": "Drei Kindebenen anzeigen",
  "Show four child levels": "Vier Kindebenen anzeigen",
  "Show five child levels": "F\xFCnf Kindebenen anzeigen",
  "Expand all child levels": "Alle Kindebenen ausklappen",
  "Find in map": "In Karte suchen",
  "Fit map": "Karte einpassen",
  "Specify a key after the modifiers.": "Nach den Modifikatoren eine Taste angeben.",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "Modifikatoren: Ctrl, Alt, Shift, Meta oder Mod.",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "Modifikatoren nicht wiederholen. Mod bedeutet bereits Ctrl oder Cmd.",
  "This image format is not supported.": "Dieses Bildformat wird nicht unterst\xFCtzt.",
  "The clipboard image is empty.": "Das Bild in der Zwischenablage ist leer.",
  "Could not save the attachment.": "Anhang konnte nicht gespeichert werden.",
  "Saving image\u2026": "Bild wird gespeichert\u2026",
  "Node text": "Knotentext",
  "Save (Enter)": "Speichern (Enter)",
  "Cancel (Escape)": "Abbrechen (Escape)",
  "Close the editor and discard your changes?": "Editor schlie\xDFen und \xC4nderungen verwerfen?",
  "Continue editing": "Weiter bearbeiten",
  "Discard changes": "\xC4nderungen verwerfen",
  "A node cannot be empty.": "Ein Knoten darf nicht leer sein.",
  "Multiple cursors are available in source Markdown.": "Mehrere Cursor sind im Markdown-Quelltext verf\xFCgbar.",
  "This command requires the source Markdown editor.": "Dieser Befehl erfordert den Markdown-Quelltexteditor.",
  "Fixed width": "Feste Breite",
  "Fit node content": "An Knoteninhalt anpassen",
  "Fit visible column": "An sichtbare Spalte anpassen",
  "TraceView Mindmap: open map": "TraceView Mindmap: Karte \xF6ffnen",
  "Open current note as a map": "Aktuelle Notiz als Karte \xF6ffnen",
  "Open map at the Markdown cursor": "Karte am Markdown-Cursor \xF6ffnen",
  "Find a map": "Karte suchen",
  "Create a simple tree": "Einfachen Baum erstellen",
  "Create a vector (separate template)": "Vektor erstellen (eigene Vorlage)",
  "Steps, deadlines and QA": "Schritte, Fristen und QA",
  "Mark as atomic step": "Als atomaren Schritt markieren",
  "Add step deadline": "Schrittfrist hinzuf\xFCgen",
  "Mark as QA": "Als QA markieren",
  "Toggle step completion": "Schrittabschluss umschalten",
  "Paste as sibling branch": "Als Geschwisterzweig einf\xFCgen",
  "Undo map change": "Karten\xE4nderung r\xFCckg\xE4ngig machen",
  "Redo map change": "Karten\xE4nderung wiederholen",
  "Insert QA in Markdown editor": "QA im Markdown-Editor einf\xFCgen",
  "Insert unnumbered step in Markdown editor": "Unnummerierten Schritt im Markdown-Editor einf\xFCgen",
  "Open map at this node": "Karte an diesem Knoten \xF6ffnen",
  "Open in TraceView Mindmap": "In TraceView Mindmap \xF6ffnen",
  "The note changed. Open it again at the current line.": "Notiz ge\xE4ndert. Erneut an der aktuellen Zeile \xF6ffnen.",
  "Save or cancel the node draft.": "Knotenentwurf speichern oder abbrechen.",
  "New vector name": "Name des neuen Vektors",
  "New tree name": "Name des neuen Baums",
  "Use a name without path characters.": "Namen ohne Pfadzeichen verwenden.",
  "A file with this name already exists.": "Eine Datei mit diesem Namen existiert bereits.",
  "The Markdown editor has newer text. Wait for it to save and try again.": "Der Markdown-Editor enth\xE4lt neueren Text. Speichern abwarten und erneut versuchen.",
  "Branch copied": "Zweig kopiert",
  "Branch saved to the plugin clipboard": "Zweig in Plugin-Zwischenablage gespeichert",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "Zwischenablage nicht verf\xFCgbar. Zweig wurde nicht ausgeschnitten. Zugriff erlauben und erneut versuchen.",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "Zwischenablage nicht verf\xFCgbar. \u201EZweigtext einf\xFCgen\u201C im Men\xFC \u22EF verwenden.",
  "Save or cancel the node draft before navigating.": "Entwurf vor der Navigation speichern oder abbrechen.",
  "Waiting for Obsidian to be ready\u2026": "Warten auf Obsidian\u2026",
  "Wait for Obsidian to load, then open the map.": "Obsidian laden lassen, dann die Karte \xF6ffnen.",
  "This address is duplicated. Fix the block ID in Markdown.": "Doppelte Adresse. Block-ID im Markdown korrigieren.",
  "The linked node was not found.": "Verlinkter Knoten nicht gefunden.",
  "Collapse levels": "Einklappebenen",
  "Delete selected branch": "Ausgew\xE4hlten Zweig l\xF6schen",
  "Sibling node": "Geschwisterknoten",
  Edit: "Bearbeiten",
  "Multiple selection: taps or rectangle": "Mehrfachauswahl: Tippen oder Rahmen",
  Search: "Suchen",
  "Layout and node width": "Layout und Knotenbreite",
  "Map actions": "Kartenaktionen",
  "Open now": "Jetzt \xF6ffnen",
  Map: "Karte",
  Outline: "Gliederung",
  Table: "Tabelle",
  "Expand entire map": "Gesamte Karte ausklappen",
  "All child levels": "Alle Kindebenen",
  "The map will open after the workspace loads\u2026": "Die Karte \xF6ffnet sich nach dem Laden des Arbeitsbereichs\u2026",
  "File missing or deleted. Open another map.": "Datei fehlt oder wurde gel\xF6scht. Andere Karte \xF6ffnen.",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "Karte ge\xE4ndert oder Speichern l\xE4uft. Entwurf steht noch im Feld. Vor dem Abbrechen kopieren und auf aktueller Karte erneut versuchen.",
  "The file no longer exists.": "Die Datei existiert nicht mehr.",
  "Select a map node first": "Zuerst einen Kartenknoten ausw\xE4hlen",
  "Another map is open. The selection was copied, but not cut.": "Andere Karte ge\xF6ffnet. Auswahl kopiert, aber nicht ausgeschnitten.",
  "This command requires one selected node.": "Dieser Befehl erfordert genau einen ausgew\xE4hlten Knoten.",
  "The map was closed or renamed. Copy the address again.": "Karte geschlossen oder umbenannt. Adresse erneut kopieren.",
  "Node link copied.": "Knotenlink kopiert.",
  "Another map is open. The branch was copied, but not cut.": "Andere Karte ge\xF6ffnet. Zweig kopiert, aber nicht ausgeschnitten.",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "Zweig ausgeschnitten. Ctrl+V zum Einf\xFCgen, R\xFCckg\xE4ngig zum Wiederherstellen.",
  "The note was renamed. Copy the draft and reopen the editor.": "Notiz umbenannt. Entwurf kopieren und Editor erneut \xF6ffnen.",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "Karte extern ge\xE4ndert. Entwurf bleibt erhalten. Vor erneutem Bearbeiten kopieren.",
  "The node no longer exists. Your draft is preserved.": "Knoten existiert nicht mehr. Entwurf bleibt erhalten.",
  "Steps \xB7 Deadlines \xB7 QA": "Schritte \xB7 Fristen \xB7 QA",
  "Step deadline\u2026": "Schrittfrist\u2026",
  "Completed / incomplete": "Erledigt / offen",
  "Move up": "Nach oben verschieben",
  "Move down": "Nach unten verschieben",
  "Nest in previous branch": "In vorherigen Zweig einordnen",
  "Open text in editor": "Text im Editor \xF6ffnen",
  "Delete branch\u2026": "Zweig l\xF6schen\u2026",
  "Export HTML\u2026": "HTML exportieren\u2026",
  "Export SVG\u2026": "SVG exportieren\u2026",
  "Paste branch text\u2026": "Zweigtext einf\xFCgen\u2026",
  "Paste child Markdown branch": "Markdown-Kindzweig einf\xFCgen",
  "Renumber steps": "Schritte neu nummerieren",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "Zielkarte ge\xE4ndert. Linkvorschl\xE4ge erneut \xF6ffnen. Entwurf bleibt erhalten.",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "Dieser Block ist kein eigener Kartenknoten. \u201ELink zum Knoten kopieren\u201C verwenden.",
  "Native editor unavailable. Using text input. ": "Nativer Editor nicht verf\xFCgbar. Texteingabe wird verwendet. ",
  "The note does not exist.": "Die Notiz existiert nicht.",
  "File already exists. Choose another name.": "Datei existiert bereits. Anderen Namen w\xE4hlen.",
  Steps: "Schritte",
  Deadlines: "Fristen",
  "Open QA": "Offene QA",
  Refresh: "Aktualisieren",
  "Collapse all": "Alle einklappen",
  "Expand all": "Alle ausklappen",
  "Search steps": "Schritte suchen",
  "Find\u2026": "Suchen\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "Umsortieren \xE4ndert nur Schrittnummern innerhalb einer Datei. Zweige bleiben an ihrem Platz. Datierte und unnummerierte Schritte haben eine eigene Reihenfolge.",
  Expand: "Ausklappen",
  Collapse: "Einklappen",
  "No open items match this filter.": "Keine offenen Eintr\xE4ge f\xFCr diesen Filter.",
  "Mark completed": "Als erledigt markieren",
  "Move earlier in execution order": "In Ausf\xFChrungsreihenfolge vorziehen",
  "Move later in execution order": "In Ausf\xFChrungsreihenfolge nach hinten setzen",
  "Deadline ?": "Frist ?",
  "Node editor": "Knoteneditor",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "Gilt ab der n\xE4chsten Bearbeitung. Nativ nutzt Obsidian Live Preview und Vorschl\xE4ge, bei Bedarf mit Texteingabe als Ersatz.",
  "Native Obsidian": "Natives Obsidian",
  "Text input": "Texteingabe",
  "Automatically restore large maps": "Gro\xDFe Karten automatisch wiederherstellen",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "Beim Start wartet die aktive Karte auf gleichm\xE4\xDFige Reaktion von Obsidian. \u201EJetzt \xF6ffnen\u201C \xFCberspringt das Warten.",
  "Hide frozen steps": "Eingefrorene Schritte ausblenden",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "\u{1F9CA}-Zweige in Schritt- und Fristenlisten \xFCberspringen. Karten zeigen den gesamten Text.",
  "Left arrow collapses the branch first": "Linkspfeil klappt zuerst den Zweig ein",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "Aus: direkt zum Elternknoten. An: offenen Zweig einklappen, beim n\xE4chsten Druck Elternknoten ausw\xE4hlen.",
  "Show [ ] in list text": "[ ] im Listentext anzeigen",
  "Show #step in list text": "#step im Listentext anzeigen",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "Betrifft nur Schritte \xB7 Fristen \xB7 QA. Notiztext und Erledigt-Schaltfl\xE4chen bleiben erhalten.",
  "Map node width": "Knotenbreite der Karte",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "Gilt sofort f\xFCr alle offenen Karten. Gliederung und Tabelle behalten eigene Breiten.",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "Faltzustand und Kamera werden auf diesem Ger\xE4t gespeichert. Anzeigen schreibt kein Markdown um und f\xFCgt keine versteckten IDs hinzu. Windows und Android k\xF6nnen eigene Ansichten behalten.",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "Native Eingabe nutzt den Obsidian-Editor, Texteingabe die Editor API. Befehle mit vollst\xE4ndiger Markdown-Ansicht \xFCber \u22EF \u2192 Text im Editor \xF6ffnen ausf\xFChren.",
  "Map hotkeys": "Karten-Tastenk\xFCrzel",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "\xC4nderungen gelten sofort f\xFCr alle Karten. \u2328 dr\xFCcken, dann Tastenk\xFCrzel, oder eingeben: Ctrl+C, Alt+Shift+1. Alternativen mit Kommas trennen. \xD7 deaktiviert, \u21BA setzt zur\xFCck. Beim Bearbeiten gelten normale Editor-K\xFCrzel.",
  Unassigned: "Nicht zugewiesen",
  "Record shortcut": "Tastenk\xFCrzel aufnehmen",
  Disable: "Deaktivieren",
  "Default shortcuts": "Standard-Tastenk\xFCrzel",
  "Search map\u2026": "Karte durchsuchen\u2026",
  "Search map": "Karte durchsuchen",
  " A\u2013Z": " A\u2013Z",
  "Close search": "Suche schlie\xDFen",
  "Search results": "Suchergebnisse",
  "No results": "Keine Ergebnisse",
  "This Obsidian version has no compatible native editor.": "Diese Obsidian-Version hat keinen kompatiblen nativen Editor.",
  "Could not prepare the native editor.": "Nativer Editor konnte nicht vorbereitet werden.",
  "The native editor cannot protect a single-line draft.": "Der native Editor kann keinen einzeiligen Entwurf sch\xFCtzen.",
  "Native Obsidian link": "Nativer Obsidian-Link",
  "Map filter": "Kartenfilter",
  "All maps": "Alle Karten",
  Maps: "Karten",
  "No maps match this search.": "Keine Karten f\xFCr diese Suche.",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "Notiz in anderem Fenster oder Ger\xE4t ge\xE4ndert. Karte aktualisiert. Auf neuestem Text erneut versuchen.",
  "History stopped because the text changed externally. Undo will preserve those changes.": "Verlauf wegen externer Text\xE4nderung angehalten. R\xFCckg\xE4ngig bewahrt diese \xC4nderungen.",
  "Loading map\u2026": "Karte wird geladen\u2026",
  "Node address: ^": "Knotenadresse: ^",
  "Branch ready to move": "Zweig bereit zum Verschieben",
  "Before: ": "Davor: ",
  "After: ": "Danach: ",
  "As children: ": "Als Kinder: ",
  "Expand node": "Knoten ausklappen",
  "Collapse node": "Knoten einklappen",
  "Collapse branch": "Zweig einklappen",
  "Expand branch": "Zweig ausklappen",
  "Paste after node": "Nach Knoten einf\xFCgen",
  Language: "Sprache",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "Automatisch folgt der Obsidian-Sprache. Obsidian neu starten, um \xC4nderungen anzuwenden.",
  "Automatic (Obsidian)": "Automatisch (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "Sprache gespeichert. Obsidian neu starten.",
  "Selected nodes: {count}": "Ausgew\xE4hlte Knoten: {count}",
  "Child levels: {count}": "Kindebenen: {count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "Knoten: {nodes} \xB7 Offene Schritte: {steps}",
  "Export {format} \u2014 file name": "{format}-Export \u2014 Dateiname",
  "Saved {path}": "Gespeichert: {path}",
  "Expand map: {name}": "Karte ausklappen: {name}",
  "Collapse map: {name}": "Karte einklappen: {name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "Doppelte Tastenk\xFCrzel: {shortcuts}. Der erste Befehl hat Vorrang.",
  "Next action": "N\xE4chste Aktion",
  "First action": "Erste Aktion",
  "Active now": "Jetzt aktiv",
  "Frozen / someday": "Eingefroren / irgendwann",
  "First step": "Erster Schritt",
  "{path} \xB7 References: {count}": "{path} \xB7 Verweise: {count}",
  "Attachment saved, but the editor is already closed: {link}": "Anhang gespeichert, aber Editor bereits geschlossen: {link}",
  "Copy selection": "Auswahl kopieren",
  "Cut selection": "Auswahl ausschneiden",
  "Delete selection": "Auswahl l\xF6schen",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "Vollst\xE4ndige Karte \xB7 Knoten: {count} \xB7 Leseexport. Zweigmarkierung zum Einklappen ausw\xE4hlen. Beschriftungen behalten Markdown. Vault-Links und Anh\xE4nge erfordern Obsidian.",
  "This map contains no outline nodes.": "Diese Karte enth\xE4lt keine Gliederungsknoten.",
  "This node no longer exists. Reopen the map and try again.": "Knoten existiert nicht mehr. Karte erneut \xF6ffnen.",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "Ein Knoten muss einzeilig sein. F\xFCr mehr Text einen Kindknoten oder eine verlinkte Notiz nutzen.",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "Diese Beschriftung wird zum Codeblock oder Trenner. Markierung maskieren oder Quelltext bearbeiten.",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown unterst\xFCtzt sechs \xDCberschriftenebenen. Kind-Listenpunkt im Quelltext hinzuf\xFCgen.",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "Diese Beschriftung eignet sich nicht als Markdown-Elternknoten. Maskieren oder im Quelltext bearbeiten.",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "Zweig enth\xE4lt Inhalte au\xDFerhalb der Knoten. Struktur im Quelltext bearbeiten, um sie zu erhalten.",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "Mehrdeutige Einr\xFCckung. Vor dem Verschieben im Quelltext korrigieren.",
  "That move would exceed Markdown\u2019s six heading levels.": "Verschieben \xFCberschreitet sechs \xDCberschriftenebenen.",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "Verschieben zwischen \xDCberschrift und Listenpunkt \xE4ndert die Bedeutung. Quelltext verwenden.",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "Einr\xFCcken gemischter Knoten ist mehrdeutig. Quelltext verwenden.",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "Ausr\xFCcken eines Listenpunkts unter einer \xDCberschrift erfordert Formatwechsel. Quelltext verwenden.",
  "A branch cannot be moved into itself or one of its descendants.": "Ein Zweig kann nicht in sich selbst oder Nachfahren verschoben werden.",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "\xDCberschrift kann kein Kind eines Listenpunkts werden. Format im Quelltext \xE4ndern.",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "Listenpunkt nach Unter\xFCberschrift geh\xF6rt zu ihr. Listen-Elternknoten w\xE4hlen oder Struktur \xE4ndern.",
  "Paste an outline branch, or paste one line as a new node.": "Gliederungszweig oder einzelne Zeile als neuen Knoten einf\xFCgen.",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "Listen neben Listen, \xDCberschriften neben \xDCberschriften einf\xFCgen. Format im Quelltext \xE4ndern.",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "Zwischenablage enth\xE4lt Inhalte au\xDFerhalb der Gliederung. Zum Erhalten im Quelltext einf\xFCgen.",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "Datum im Format JJJJ-MM-TT oder ? f\xFCr unbekannte Frist verwenden.",
  "That calendar date does not exist.": "Dieses Kalenderdatum existiert nicht.",
  "The execution order contains the same step twice.": "Ausf\xFChrungsreihenfolge enth\xE4lt denselben Schritt zweimal.",
  "Only numbered, undated steps can be placed in an execution order.": "Nur nummerierte Schritte ohne Datum k\xF6nnen einsortiert werden.",
  Untitled: "Unbenannt",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "Karte hat keine Knoten. Quelltext \xF6ffnen und \xDCberschrift oder Listenpunkt hinzuf\xFCgen.",
  "Mark incomplete": "Als unerledigt markieren",
  "Invalid saved map patterns. Default patterns are active.": "Gespeicherte Muster ung\xFCltig. Standardregeln sind aktiv.",
  "Automatically open matching notes as maps": "Passende Notizen automatisch als Karten \xF6ffnen",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "F\xFCr Notizen nach den folgenden Mustern. Explizites \xD6ffnen des Markdown-Quelltexts beh\xE4lt den Markdown-Modus bei.",
  "Invalid pattern on line {line}: {error}": "Ung\xFCltiges Muster in Zeile {line}: {error}",
  "Patterns saved.": "Muster gespeichert.",
  "Pattern syntax": "Mustersyntax",
  "Glob (wildcards)": "Glob (Platzhalter)",
  "Regular expressions": "Regul\xE4re Ausdr\xFCcke",
  "Map file patterns": "Dateimuster f\xFCr Karten",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "Ein Muster pro Zeile; ein Treffer gen\xFCgt. Glob ohne / pr\xFCft Dateinamen in allen Ordnern, mit / vault-relative Pfade. *, ** und ? sind verf\xFCgbar. Regex pr\xFCft vault-relative Pfade ohne umschlie\xDFende /. Gro\xDF-/Kleinschreibung wird ignoriert. Nur Markdown-Dateien.",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "Auch mindmap: true kennzeichnet eine Karte. Bei ung\xFCltiger Eingabe gelten die zuletzt gespeicherten Regeln. Muster gelten gemeinsam f\xFCr automatisches \xD6ffnen, Kartensuche und Schrittlisten.",
  "This JSON map format is not supported.": "Dieses JSON-Kartenformat wird nicht unterst\xFCtzt.",
  "Restore default patterns": "Standardmuster wiederherstellen",
  "Restore default settings": "Standardeinstellungen wiederherstellen",
  "Restore defaults": "Wiederherstellen",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "Einstellungen, Tastenk\xFCrzel und Kartenmuster zur\xFCcksetzen? Lokale Ansichten und gespeicherte Notizen bleiben erhalten. Obsidian zum Anwenden der Sprache neu starten.",
  "Default settings restored. Restart Obsidian to apply the language.": "Standardeinstellungen wiederhergestellt. Obsidian zum Anwenden der Sprache neu starten."
};

// src/locales/es.json
var es_default = {
  "A node with its own Markdown line is required.": "Se necesita un nodo con su propia l\xEDnea Markdown.",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "ID de bloque duplicado. Corr\xEDgelo en Markdown antes de copiar la direcci\xF3n.",
  "A unique block ID is required.": "Se necesita un ID de bloque \xFAnico.",
  "The selection changed. Run the command again.": "La selecci\xF3n cambi\xF3. Repite el comando.",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "No se puede mover una rama a s\xED misma, a un descendiente ni a un nodo Markdown incompatible.",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "Una vi\xF1eta tras un subt\xEDtulo pertenece a \xE9l. Elige una vi\xF1eta como padre o cambia la estructura Markdown.",
  "Sibling above": "Hermano arriba",
  "Sibling below": "Hermano abajo",
  "Child node": "Nodo hijo",
  "Parent node": "Nodo padre",
  "Find a map\u2026": "Buscar mapa\u2026",
  "Note name, alias or new link\u2026": "Nombre de nota, alias o enlace nuevo\u2026",
  select: "seleccionar",
  "insert link": "insertar enlace",
  "return to node": "volver al nodo",
  "file not created yet": "archivo a\xFAn sin crear",
  "new link": "enlace nuevo",
  "Insert a link without creating a file": "Insertar enlace sin crear archivo",
  "The file changed or was deleted. Search again.": "El archivo cambi\xF3 o se elimin\xF3. Busca de nuevo.",
  "Link (Ctrl+K)": "Enlace (Ctrl+K)",
  "Highlight text": "Resaltar texto",
  "Mark as question": "Marcar como pregunta",
  "Step deadline": "Fecha l\xEDmite del paso",
  Date: "Fecha",
  " Unknown deadline (?)": " Fecha l\xEDmite desconocida (?)",
  "Previous month": "Mes anterior",
  "Next month": "Mes siguiente",
  Mon: "Lun",
  Tue: "Mar",
  Wed: "Mi\xE9",
  Thu: "Jue",
  Fri: "Vie",
  Sat: "S\xE1b",
  Sun: "Dom",
  Cancel: "Cancelar",
  Save: "Guardar",
  "Enter to save, Esc to cancel.": "Enter para guardar, Esc para cancelar.",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Enter para confirmar, Esc para cancelar.",
  "Delete branch": "Eliminar rama",
  "Extend selection up": "Ampliar selecci\xF3n hacia arriba",
  "Extend selection down": "Ampliar selecci\xF3n hacia abajo",
  "Extend selection to parent": "Ampliar selecci\xF3n al padre",
  "Extend selection to child": "Ampliar selecci\xF3n al hijo",
  "Select all visible nodes": "Seleccionar todos los nodos visibles",
  "Cut branch": "Cortar rama",
  "Copy link to node": "Copiar enlace al nodo",
  "Copy branch": "Copiar rama",
  "Paste as child branch": "Pegar como rama hija",
  "Paste branch after node": "Pegar rama despu\xE9s del nodo",
  Undo: "Deshacer",
  Redo: "Rehacer",
  "Edit node": "Editar nodo",
  "Add child node": "A\xF1adir nodo hijo",
  "Add parent node": "A\xF1adir nodo padre",
  "Add sibling above": "A\xF1adir hermano arriba",
  "Add sibling node": "A\xF1adir nodo hermano",
  "Move branch up": "Mover rama arriba",
  "Move branch down": "Mover rama abajo",
  "Make child of previous node": "Hacer hijo del nodo anterior",
  "Move up one level": "Subir un nivel",
  "Toggle completion": "Alternar finalizaci\xF3n",
  "Make numbered step": "Convertir en paso numerado",
  "Set date": "Establecer fecha",
  "Open source Markdown": "Abrir Markdown fuente",
  "Select parent node": "Seleccionar padre",
  "Select child node": "Seleccionar hijo",
  "Select previous sibling": "Seleccionar hermano anterior",
  "Select next sibling": "Seleccionar hermano siguiente",
  "Select first node": "Seleccionar primer nodo",
  "Select last node": "Seleccionar \xFAltimo nodo",
  "Collapse / expand node": "Contraer / expandir nodo",
  "Collapse all roots": "Contraer todas las ra\xEDces",
  "Collapse selected branch": "Contraer rama seleccionada",
  "Expand selected branch": "Expandir rama seleccionada",
  "Selected node only": "Solo nodo seleccionado",
  "Show one child level": "Mostrar un nivel de hijos",
  "Show two child levels": "Mostrar dos niveles de hijos",
  "Show three child levels": "Mostrar tres niveles de hijos",
  "Show four child levels": "Mostrar cuatro niveles de hijos",
  "Show five child levels": "Mostrar cinco niveles de hijos",
  "Expand all child levels": "Expandir todos los niveles de hijos",
  "Find in map": "Buscar en el mapa",
  "Fit map": "Ajustar mapa",
  "Specify a key after the modifiers.": "Indica una tecla tras los modificadores.",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "Modificadores: Ctrl, Alt, Shift, Meta o Mod.",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "No repitas modificadores. Mod ya significa Ctrl o Cmd.",
  "This image format is not supported.": "Formato de imagen no compatible.",
  "The clipboard image is empty.": "La imagen del portapapeles est\xE1 vac\xEDa.",
  "Could not save the attachment.": "No se pudo guardar el adjunto.",
  "Saving image\u2026": "Guardando imagen\u2026",
  "Node text": "Texto del nodo",
  "Save (Enter)": "Guardar (Enter)",
  "Cancel (Escape)": "Cancelar (Escape)",
  "Close the editor and discard your changes?": "\xBFCerrar el editor y descartar los cambios?",
  "Continue editing": "Seguir editando",
  "Discard changes": "Descartar cambios",
  "A node cannot be empty.": "Un nodo no puede estar vac\xEDo.",
  "Multiple cursors are available in source Markdown.": "Los cursores m\xFAltiples est\xE1n disponibles en Markdown fuente.",
  "This command requires the source Markdown editor.": "Este comando requiere el editor Markdown fuente.",
  "Fixed width": "Ancho fijo",
  "Fit node content": "Ajustar al contenido del nodo",
  "Fit visible column": "Ajustar a la columna visible",
  "TraceView Mindmap: open map": "TraceView Mindmap: abrir mapa",
  "Open current note as a map": "Abrir nota actual como mapa",
  "Open map at the Markdown cursor": "Abrir mapa en el cursor Markdown",
  "Find a map": "Buscar mapa",
  "Create a simple tree": "Crear \xE1rbol simple",
  "Create a vector (separate template)": "Crear vector (plantilla aparte)",
  "Steps, deadlines and QA": "Pasos, plazos y QA",
  "Mark as atomic step": "Marcar como paso at\xF3mico",
  "Add step deadline": "A\xF1adir plazo al paso",
  "Mark as QA": "Marcar como QA",
  "Toggle step completion": "Alternar finalizaci\xF3n del paso",
  "Paste as sibling branch": "Pegar como rama hermana",
  "Undo map change": "Deshacer cambio del mapa",
  "Redo map change": "Rehacer cambio del mapa",
  "Insert QA in Markdown editor": "Insertar QA en el editor Markdown",
  "Insert unnumbered step in Markdown editor": "Insertar paso sin numerar en el editor Markdown",
  "Open map at this node": "Abrir mapa en este nodo",
  "Open in TraceView Mindmap": "Abrir en TraceView Mindmap",
  "The note changed. Open it again at the current line.": "La nota cambi\xF3. \xC1brela de nuevo en la l\xEDnea actual.",
  "Save or cancel the node draft.": "Guarda o cancela el borrador del nodo.",
  "New vector name": "Nombre del vector nuevo",
  "New tree name": "Nombre del \xE1rbol nuevo",
  "Use a name without path characters.": "Usa un nombre sin caracteres de ruta.",
  "A file with this name already exists.": "Ya existe un archivo con este nombre.",
  "The Markdown editor has newer text. Wait for it to save and try again.": "El editor Markdown tiene texto m\xE1s reciente. Espera a que se guarde e int\xE9ntalo de nuevo.",
  "Branch copied": "Rama copiada",
  "Branch saved to the plugin clipboard": "Rama guardada en el portapapeles del complemento",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "Portapapeles no disponible. La rama no se cort\xF3. Permite el acceso e int\xE9ntalo de nuevo.",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "Portapapeles no disponible. Usa \xABPegar texto de rama\xBB en el men\xFA \u22EF.",
  "Save or cancel the node draft before navigating.": "Guarda o cancela el borrador antes de navegar.",
  "Waiting for Obsidian to be ready\u2026": "Esperando a que Obsidian est\xE9 listo\u2026",
  "Wait for Obsidian to load, then open the map.": "Espera a que cargue Obsidian y abre el mapa.",
  "This address is duplicated. Fix the block ID in Markdown.": "Direcci\xF3n duplicada. Corrige el ID de bloque en Markdown.",
  "The linked node was not found.": "No se encontr\xF3 el nodo enlazado.",
  "Collapse levels": "Niveles de contracci\xF3n",
  "Delete selected branch": "Eliminar rama seleccionada",
  "Sibling node": "Nodo hermano",
  Edit: "Editar",
  "Multiple selection: taps or rectangle": "Selecci\xF3n m\xFAltiple: toques o rect\xE1ngulo",
  Search: "Buscar",
  "Layout and node width": "Dise\xF1o y ancho de nodos",
  "Map actions": "Acciones del mapa",
  "Open now": "Abrir ahora",
  Map: "Mapa",
  Outline: "Esquema",
  Table: "Tabla",
  "Expand entire map": "Expandir mapa completo",
  "All child levels": "Todos los niveles de hijos",
  "The map will open after the workspace loads\u2026": "El mapa se abrir\xE1 al cargar el espacio de trabajo\u2026",
  "File missing or deleted. Open another map.": "El archivo falta o se elimin\xF3. Abre otro mapa.",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "El mapa cambi\xF3 o se est\xE1 guardando. El borrador sigue en el campo. C\xF3pialo antes de cancelar y reintenta en el mapa actual.",
  "The file no longer exists.": "El archivo ya no existe.",
  "Select a map node first": "Selecciona un nodo primero",
  "Another map is open. The selection was copied, but not cut.": "Hay otro mapa abierto. La selecci\xF3n se copi\xF3, pero no se cort\xF3.",
  "This command requires one selected node.": "Este comando requiere un \xFAnico nodo seleccionado.",
  "The map was closed or renamed. Copy the address again.": "El mapa se cerr\xF3 o renombr\xF3. Copia la direcci\xF3n de nuevo.",
  "Node link copied.": "Enlace al nodo copiado.",
  "Another map is open. The branch was copied, but not cut.": "Hay otro mapa abierto. La rama se copi\xF3, pero no se cort\xF3.",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "Rama cortada. Ctrl+V para pegar, Deshacer para restaurar.",
  "The note was renamed. Copy the draft and reopen the editor.": "La nota se renombr\xF3. Copia el borrador y reabre el editor.",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "El mapa cambi\xF3 externamente. El borrador se conserva. C\xF3pialo antes de volver a editar.",
  "The node no longer exists. Your draft is preserved.": "El nodo ya no existe. El borrador se conserva.",
  "Steps \xB7 Deadlines \xB7 QA": "Pasos \xB7 Plazos \xB7 QA",
  "Step deadline\u2026": "Fecha l\xEDmite del paso\u2026",
  "Completed / incomplete": "Completado / pendiente",
  "Move up": "Mover arriba",
  "Move down": "Mover abajo",
  "Nest in previous branch": "Anidar en la rama anterior",
  "Open text in editor": "Abrir texto en el editor",
  "Delete branch\u2026": "Eliminar rama\u2026",
  "Export HTML\u2026": "Exportar HTML\u2026",
  "Export SVG\u2026": "Exportar SVG\u2026",
  "Paste branch text\u2026": "Pegar texto de rama\u2026",
  "Paste child Markdown branch": "Pegar rama hija Markdown",
  "Renumber steps": "Renumerar pasos",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "El mapa de destino cambi\xF3. Reabre las sugerencias de enlaces. El borrador se conserva.",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "Este bloque no es un nodo independiente. Usa \xABCopiar enlace al nodo\xBB.",
  "Native editor unavailable. Using text input. ": "Editor nativo no disponible. Se usa entrada de texto. ",
  "The note does not exist.": "La nota no existe.",
  "File already exists. Choose another name.": "El archivo ya existe. Elige otro nombre.",
  Steps: "Pasos",
  Deadlines: "Plazos",
  "Open QA": "QA abiertas",
  Refresh: "Actualizar",
  "Collapse all": "Contraer todo",
  "Expand all": "Expandir todo",
  "Search steps": "Buscar pasos",
  "Find\u2026": "Buscar\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "Reordenar solo cambia los n\xFAmeros de pasos en un archivo. Las ramas permanecen en su sitio. Los pasos con fecha y sin n\xFAmero tienen un orden aparte.",
  Expand: "Expandir",
  Collapse: "Contraer",
  "No open items match this filter.": "No hay elementos abiertos con este filtro.",
  "Mark completed": "Marcar completado",
  "Move earlier in execution order": "Adelantar en el orden de ejecuci\xF3n",
  "Move later in execution order": "Retrasar en el orden de ejecuci\xF3n",
  "Deadline ?": "Plazo ?",
  "Node editor": "Editor de nodos",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "Se aplica en la pr\xF3xima edici\xF3n. El nativo usa Live Preview y sugerencias de Obsidian, con entrada de texto como alternativa.",
  "Native Obsidian": "Nativo de Obsidian",
  "Text input": "Entrada de texto",
  "Automatically restore large maps": "Restaurar mapas grandes autom\xE1ticamente",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "Al iniciar, el mapa activo espera a que Obsidian responda de forma estable. \xABAbrir ahora\xBB omite la espera.",
  "Hide frozen steps": "Ocultar pasos congelados",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "Omitir ramas \u{1F9CA} en listas de pasos y plazos. Los mapas muestran todo el texto.",
  "Left arrow collapses the branch first": "La flecha izquierda contrae primero la rama",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "Desactivado: ir al padre. Activado: contraer la rama abierta y volver a pulsar para seleccionar el padre.",
  "Show [ ] in list text": "Mostrar [ ] en el texto de listas",
  "Show #step in list text": "Mostrar #step en el texto de listas",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "Solo afecta a Pasos \xB7 Plazos \xB7 QA. El texto de notas y los controles de finalizaci\xF3n se conservan.",
  "Map node width": "Ancho de nodos del mapa",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "Se aplica al instante a todos los mapas abiertos. Esquema y Tabla conservan sus anchos.",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "Los pliegues y la c\xE1mara se guardan en este dispositivo. Ver no reescribe Markdown ni a\xF1ade ID ocultos. Windows y Android pueden conservar vistas distintas.",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "La entrada nativa usa el editor Obsidian y la de texto, la Editor API. Para comandos que requieren la vista Markdown completa, usa \u22EF \u2192 Abrir texto en el editor.",
  "Map hotkeys": "Atajos del mapa",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "Los cambios se aplican a todos los mapas al instante. Pulsa \u2328 y el atajo, o escribe: Ctrl+C, Alt+Shift+1. Separa alternativas con comas. \xD7 desactiva, \u21BA restaura valores. Al editar se usan los atajos normales.",
  Unassigned: "Sin asignar",
  "Record shortcut": "Registrar atajo",
  Disable: "Desactivar",
  "Default shortcuts": "Atajos predeterminados",
  "Search map\u2026": "Buscar en el mapa\u2026",
  "Search map": "Buscar en el mapa",
  " A\u2013Z": " A\u2013Z",
  "Close search": "Cerrar b\xFAsqueda",
  "Search results": "Resultados de b\xFAsqueda",
  "No results": "Sin resultados",
  "This Obsidian version has no compatible native editor.": "Esta versi\xF3n de Obsidian no tiene un editor nativo compatible.",
  "Could not prepare the native editor.": "No se pudo preparar el editor nativo.",
  "The native editor cannot protect a single-line draft.": "El editor nativo no puede proteger un borrador de una l\xEDnea.",
  "Native Obsidian link": "Enlace nativo de Obsidian",
  "Map filter": "Filtro de mapas",
  "All maps": "Todos los mapas",
  Maps: "Mapas",
  "No maps match this search.": "Ning\xFAn mapa coincide con la b\xFAsqueda.",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "La nota cambi\xF3 en otra ventana o dispositivo. Se actualiz\xF3 el mapa. Reintenta sobre el texto m\xE1s reciente.",
  "History stopped because the text changed externally. Undo will preserve those changes.": "Historial detenido por cambios externos. Deshacer conservar\xE1 esos cambios.",
  "Loading map\u2026": "Cargando mapa\u2026",
  "Node address: ^": "Direcci\xF3n del nodo: ^",
  "Branch ready to move": "Rama lista para mover",
  "Before: ": "Antes: ",
  "After: ": "Despu\xE9s: ",
  "As children: ": "Como hijos: ",
  "Expand node": "Expandir nodo",
  "Collapse node": "Contraer nodo",
  "Collapse branch": "Contraer rama",
  "Expand branch": "Expandir rama",
  "Paste after node": "Pegar despu\xE9s del nodo",
  Language: "Idioma",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "Autom\xE1tico usa el idioma de Obsidian. Reinicia Obsidian para aplicar el cambio.",
  "Automatic (Obsidian)": "Autom\xE1tico (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "Idioma guardado. Reinicia Obsidian.",
  "Selected nodes: {count}": "Nodos seleccionados: {count}",
  "Child levels: {count}": "Niveles de hijos: {count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "Nodos: {nodes} \xB7 Pasos abiertos: {steps}",
  "Export {format} \u2014 file name": "Exportar {format} \u2014 nombre del archivo",
  "Saved {path}": "Guardado {path}",
  "Expand map: {name}": "Expandir mapa: {name}",
  "Collapse map: {name}": "Contraer mapa: {name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "Atajos en conflicto: {shortcuts}. Tiene prioridad el primer comando de la lista.",
  "Next action": "Pr\xF3xima acci\xF3n",
  "First action": "Primera acci\xF3n",
  "Active now": "Activo ahora",
  "Frozen / someday": "Congelado / alg\xFAn d\xEDa",
  "First step": "Primer paso",
  "{path} \xB7 References: {count}": "{path} \xB7 Referencias: {count}",
  "Attachment saved, but the editor is already closed: {link}": "Adjunto guardado, pero el editor ya est\xE1 cerrado: {link}",
  "Copy selection": "Copiar selecci\xF3n",
  "Cut selection": "Cortar selecci\xF3n",
  "Delete selection": "Eliminar selecci\xF3n",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "Mapa completo \xB7 {count} nodos \xB7 Exportaci\xF3n de solo lectura. Selecciona el marcador de rama para contraerla. Las etiquetas conservan Markdown. Los enlaces y adjuntos de la b\xF3veda requieren Obsidian.",
  "This map contains no outline nodes.": "Este mapa no contiene nodos de esquema.",
  "This node no longer exists. Reopen the map and try again.": "El nodo ya no existe. Reabre el mapa.",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "El nodo debe ocupar una l\xEDnea. Usa un hijo o una nota enlazada para m\xE1s texto.",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "Este texto se convertir\xEDa en c\xF3digo o separador. Escapa el marcador o edita la fuente.",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown admite seis niveles de t\xEDtulos. A\xF1ade una vi\xF1eta hija en la fuente.",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "Este texto no sirve como nodo padre Markdown. Escapa el marcador o edita la fuente.",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "La rama contiene texto fuera de los nodos. Edita su estructura en la fuente para conservarlo.",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "Sangr\xEDa ambigua. Corr\xEDgela en la fuente antes de mover.",
  "That move would exceed Markdown\u2019s six heading levels.": "El movimiento exceder\xEDa seis niveles de t\xEDtulos.",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "Mover entre t\xEDtulo y vi\xF1eta cambia su significado. Usa la fuente.",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "Sangrar t\xEDtulos y vi\xF1etas mezclados es ambiguo. Usa la fuente.",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "Sacar una vi\xF1eta de un t\xEDtulo requiere cambiar el formato. Usa la fuente.",
  "A branch cannot be moved into itself or one of its descendants.": "No se puede mover una rama a s\xED misma ni a sus descendientes.",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "Un t\xEDtulo no puede ser hijo de una vi\xF1eta. Cambia el formato en la fuente.",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "Una vi\xF1eta tras un subt\xEDtulo le pertenece. Elige un padre de lista o cambia la estructura.",
  "Paste an outline branch, or paste one line as a new node.": "Pega una rama de esquema o una l\xEDnea como nodo nuevo.",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "Pega vi\xF1etas junto a vi\xF1etas y t\xEDtulos junto a t\xEDtulos. Convierte el formato en la fuente.",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "El portapapeles contiene texto fuera del esquema. P\xE9galo en la fuente para conservarlo.",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "Usa AAAA-MM-DD o ? para un plazo desconocido.",
  "That calendar date does not exist.": "Esa fecha no existe.",
  "The execution order contains the same step twice.": "El orden contiene el mismo paso dos veces.",
  "Only numbered, undated steps can be placed in an execution order.": "Solo los pasos numerados sin fecha pueden ordenarse.",
  Untitled: "Sin t\xEDtulo",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "El mapa no tiene nodos. Abre la fuente y a\xF1ade un t\xEDtulo o una vi\xF1eta.",
  "Mark incomplete": "Marcar incompleto",
  "Invalid saved map patterns. Default patterns are active.": "Patrones guardados inv\xE1lidos. Se usan los predeterminados.",
  "Automatically open matching notes as maps": "Abrir notas coincidentes como mapas autom\xE1ticamente",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "Para notas que coincidan con los patrones siguientes. Abrir expl\xEDcitamente el Markdown fuente conserva ese modo.",
  "Invalid pattern on line {line}: {error}": "Patr\xF3n inv\xE1lido en la l\xEDnea {line}: {error}",
  "Patterns saved.": "Patrones guardados.",
  "Pattern syntax": "Sintaxis de patrones",
  "Glob (wildcards)": "Glob (comodines)",
  "Regular expressions": "Expresiones regulares",
  "Map file patterns": "Patrones de archivos de mapas",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "Un patr\xF3n por l\xEDnea; basta una coincidencia. Glob sin / compara nombres en cualquier carpeta; con /, rutas relativas a la b\xF3veda. Usa *, ** y ?. Regex compara rutas relativas sin delimitadores /. Sin distinguir may\xFAsculas. Solo archivos Markdown.",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "La propiedad mindmap: true tambi\xE9n identifica un mapa. Una entrada inv\xE1lida conserva las \xFAltimas reglas guardadas. Los patrones se comparten entre apertura autom\xE1tica, b\xFAsqueda y listas de pasos.",
  "This JSON map format is not supported.": "Este formato de mapa JSON no es compatible.",
  "Restore default patterns": "Restaurar patrones predeterminados",
  "Restore default settings": "Restaurar ajustes predeterminados",
  "Restore defaults": "Restaurar",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "\xBFRestaurar ajustes, atajos y patrones de mapas? Se conservan las vistas locales y las notas guardadas. Reinicia Obsidian para aplicar el idioma.",
  "Default settings restored. Restart Obsidian to apply the language.": "Ajustes predeterminados restaurados. Reinicia Obsidian para aplicar el idioma."
};

// src/locales/fr.json
var fr_default = {
  "A node with its own Markdown line is required.": "Un n\u0153ud avec sa propre ligne Markdown est requis.",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "ID de bloc dupliqu\xE9. Corrigez-le dans le Markdown avant de copier l\u2019adresse.",
  "A unique block ID is required.": "Un ID de bloc unique est requis.",
  "The selection changed. Run the command again.": "La s\xE9lection a chang\xE9. Relancez la commande.",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "Impossible de d\xE9placer une branche dans elle-m\xEAme, un descendant ou un n\u0153ud Markdown incompatible.",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "Une puce apr\xE8s un sous-titre lui appartient. Choisissez une puce parente ou modifiez la structure Markdown.",
  "Sibling above": "N\u0153ud fr\xE8re au-dessus",
  "Sibling below": "N\u0153ud fr\xE8re en dessous",
  "Child node": "N\u0153ud enfant",
  "Parent node": "N\u0153ud parent",
  "Find a map\u2026": "Rechercher une carte\u2026",
  "Note name, alias or new link\u2026": "Nom de note, alias ou nouveau lien\u2026",
  select: "s\xE9lectionner",
  "insert link": "ins\xE9rer le lien",
  "return to node": "revenir au n\u0153ud",
  "file not created yet": "fichier pas encore cr\xE9\xE9",
  "new link": "nouveau lien",
  "Insert a link without creating a file": "Ins\xE9rer un lien sans cr\xE9er de fichier",
  "The file changed or was deleted. Search again.": "Le fichier a chang\xE9 ou a \xE9t\xE9 supprim\xE9. Relancez la recherche.",
  "Link (Ctrl+K)": "Lien (Ctrl+K)",
  "Highlight text": "Surligner le texte",
  "Mark as question": "Marquer comme question",
  "Step deadline": "\xC9ch\xE9ance de l\u2019\xE9tape",
  Date: "Date",
  " Unknown deadline (?)": " \xC9ch\xE9ance inconnue (?)",
  "Previous month": "Mois pr\xE9c\xE9dent",
  "Next month": "Mois suivant",
  Mon: "Lun",
  Tue: "Mar",
  Wed: "Mer",
  Thu: "Jeu",
  Fri: "Ven",
  Sat: "Sam",
  Sun: "Dim",
  Cancel: "Annuler",
  Save: "Enregistrer",
  "Enter to save, Esc to cancel.": "Entr\xE9e pour enregistrer, \xC9chap pour annuler.",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Entr\xE9e pour confirmer, \xC9chap pour annuler.",
  "Delete branch": "Supprimer la branche",
  "Extend selection up": "\xC9tendre la s\xE9lection vers le haut",
  "Extend selection down": "\xC9tendre la s\xE9lection vers le bas",
  "Extend selection to parent": "\xC9tendre la s\xE9lection au parent",
  "Extend selection to child": "\xC9tendre la s\xE9lection \xE0 l\u2019enfant",
  "Select all visible nodes": "S\xE9lectionner tous les n\u0153uds visibles",
  "Cut branch": "Couper la branche",
  "Copy link to node": "Copier le lien du n\u0153ud",
  "Copy branch": "Copier la branche",
  "Paste as child branch": "Coller comme branche enfant",
  "Paste branch after node": "Coller la branche apr\xE8s le n\u0153ud",
  Undo: "Annuler l\u2019action",
  Redo: "R\xE9tablir",
  "Edit node": "Modifier le n\u0153ud",
  "Add child node": "Ajouter un n\u0153ud enfant",
  "Add parent node": "Ajouter un n\u0153ud parent",
  "Add sibling above": "Ajouter un fr\xE8re au-dessus",
  "Add sibling node": "Ajouter un n\u0153ud fr\xE8re",
  "Move branch up": "D\xE9placer la branche vers le haut",
  "Move branch down": "D\xE9placer la branche vers le bas",
  "Make child of previous node": "Rattacher au n\u0153ud pr\xE9c\xE9dent",
  "Move up one level": "Remonter d\u2019un niveau",
  "Toggle completion": "Basculer l\u2019\xE9tat termin\xE9",
  "Make numbered step": "Cr\xE9er une \xE9tape num\xE9rot\xE9e",
  "Set date": "D\xE9finir la date",
  "Open source Markdown": "Ouvrir le Markdown source",
  "Select parent node": "S\xE9lectionner le parent",
  "Select child node": "S\xE9lectionner l\u2019enfant",
  "Select previous sibling": "S\xE9lectionner le fr\xE8re pr\xE9c\xE9dent",
  "Select next sibling": "S\xE9lectionner le fr\xE8re suivant",
  "Select first node": "S\xE9lectionner le premier n\u0153ud",
  "Select last node": "S\xE9lectionner le dernier n\u0153ud",
  "Collapse / expand node": "Replier / d\xE9plier le n\u0153ud",
  "Collapse all roots": "Replier toutes les racines",
  "Collapse selected branch": "Replier la branche s\xE9lectionn\xE9e",
  "Expand selected branch": "D\xE9plier la branche s\xE9lectionn\xE9e",
  "Selected node only": "N\u0153ud s\xE9lectionn\xE9 uniquement",
  "Show one child level": "Afficher un niveau enfant",
  "Show two child levels": "Afficher deux niveaux enfants",
  "Show three child levels": "Afficher trois niveaux enfants",
  "Show four child levels": "Afficher quatre niveaux enfants",
  "Show five child levels": "Afficher cinq niveaux enfants",
  "Expand all child levels": "D\xE9plier tous les niveaux enfants",
  "Find in map": "Rechercher dans la carte",
  "Fit map": "Ajuster la carte",
  "Specify a key after the modifiers.": "Indiquez une touche apr\xE8s les modificateurs.",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "Modificateurs : Ctrl, Alt, Shift, Meta ou Mod.",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "Ne r\xE9p\xE9tez pas les modificateurs. Mod signifie d\xE9j\xE0 Ctrl ou Cmd.",
  "This image format is not supported.": "Ce format d\u2019image n\u2019est pas pris en charge.",
  "The clipboard image is empty.": "L\u2019image du presse-papiers est vide.",
  "Could not save the attachment.": "Impossible d\u2019enregistrer la pi\xE8ce jointe.",
  "Saving image\u2026": "Enregistrement de l\u2019image\u2026",
  "Node text": "Texte du n\u0153ud",
  "Save (Enter)": "Enregistrer (Entr\xE9e)",
  "Cancel (Escape)": "Annuler (\xC9chap)",
  "Close the editor and discard your changes?": "Fermer l\u2019\xE9diteur et abandonner les modifications ?",
  "Continue editing": "Continuer \xE0 modifier",
  "Discard changes": "Abandonner les modifications",
  "A node cannot be empty.": "Un n\u0153ud ne peut pas \xEAtre vide.",
  "Multiple cursors are available in source Markdown.": "Les curseurs multiples sont disponibles dans le Markdown source.",
  "This command requires the source Markdown editor.": "Cette commande n\xE9cessite l\u2019\xE9diteur Markdown source.",
  "Fixed width": "Largeur fixe",
  "Fit node content": "Adapter au contenu du n\u0153ud",
  "Fit visible column": "Adapter \xE0 la colonne visible",
  "TraceView Mindmap: open map": "TraceView Mindmap : ouvrir une carte",
  "Open current note as a map": "Ouvrir la note actuelle en carte",
  "Open map at the Markdown cursor": "Ouvrir la carte au curseur Markdown",
  "Find a map": "Rechercher une carte",
  "Create a simple tree": "Cr\xE9er un arbre simple",
  "Create a vector (separate template)": "Cr\xE9er un vecteur (mod\xE8le distinct)",
  "Steps, deadlines and QA": "\xC9tapes, \xE9ch\xE9ances et QA",
  "Mark as atomic step": "Marquer comme \xE9tape atomique",
  "Add step deadline": "Ajouter une \xE9ch\xE9ance \xE0 l\u2019\xE9tape",
  "Mark as QA": "Marquer comme QA",
  "Toggle step completion": "Basculer la r\xE9alisation de l\u2019\xE9tape",
  "Paste as sibling branch": "Coller comme branche s\u0153ur",
  "Undo map change": "Annuler une modification de la carte",
  "Redo map change": "R\xE9tablir une modification de la carte",
  "Insert QA in Markdown editor": "Ins\xE9rer QA dans l\u2019\xE9diteur Markdown",
  "Insert unnumbered step in Markdown editor": "Ins\xE9rer une \xE9tape non num\xE9rot\xE9e dans l\u2019\xE9diteur Markdown",
  "Open map at this node": "Ouvrir la carte \xE0 ce n\u0153ud",
  "Open in TraceView Mindmap": "Ouvrir dans TraceView Mindmap",
  "The note changed. Open it again at the current line.": "La note a chang\xE9. Rouvrez-la \xE0 la ligne actuelle.",
  "Save or cancel the node draft.": "Enregistrez ou annulez le brouillon du n\u0153ud.",
  "New vector name": "Nom du nouveau vecteur",
  "New tree name": "Nom du nouvel arbre",
  "Use a name without path characters.": "Utilisez un nom sans caract\xE8res de chemin.",
  "A file with this name already exists.": "Un fichier portant ce nom existe d\xE9j\xE0.",
  "The Markdown editor has newer text. Wait for it to save and try again.": "L\u2019\xE9diteur Markdown contient un texte plus r\xE9cent. Attendez son enregistrement et r\xE9essayez.",
  "Branch copied": "Branche copi\xE9e",
  "Branch saved to the plugin clipboard": "Branche enregistr\xE9e dans le presse-papiers de l\u2019extension",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "Presse-papiers indisponible. La branche n\u2019a pas \xE9t\xE9 coup\xE9e. Autorisez l\u2019acc\xE8s et r\xE9essayez.",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "Presse-papiers indisponible. Utilisez \xAB Coller le texte d\u2019une branche \xBB dans le menu \u22EF.",
  "Save or cancel the node draft before navigating.": "Enregistrez ou annulez le brouillon avant de naviguer.",
  "Waiting for Obsidian to be ready\u2026": "En attente d\u2019Obsidian\u2026",
  "Wait for Obsidian to load, then open the map.": "Attendez le chargement d\u2019Obsidian, puis ouvrez la carte.",
  "This address is duplicated. Fix the block ID in Markdown.": "Adresse dupliqu\xE9e. Corrigez l\u2019ID du bloc dans le Markdown.",
  "The linked node was not found.": "Le n\u0153ud li\xE9 est introuvable.",
  "Collapse levels": "Niveaux de repli",
  "Delete selected branch": "Supprimer la branche s\xE9lectionn\xE9e",
  "Sibling node": "N\u0153ud fr\xE8re",
  Edit: "Modifier",
  "Multiple selection: taps or rectangle": "S\xE9lection multiple : touchers ou rectangle",
  Search: "Rechercher",
  "Layout and node width": "Disposition et largeur des n\u0153uds",
  "Map actions": "Actions de la carte",
  "Open now": "Ouvrir maintenant",
  Map: "Carte",
  Outline: "Plan",
  Table: "Tableau",
  "Expand entire map": "D\xE9plier toute la carte",
  "All child levels": "Tous les niveaux enfants",
  "The map will open after the workspace loads\u2026": "La carte s\u2019ouvrira apr\xE8s le chargement de l\u2019espace de travail\u2026",
  "File missing or deleted. Open another map.": "Fichier absent ou supprim\xE9. Ouvrez une autre carte.",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "La carte a chang\xE9 ou s\u2019enregistre. Le brouillon reste dans le champ. Copiez-le avant d\u2019annuler et r\xE9essayez sur la carte actuelle.",
  "The file no longer exists.": "Le fichier n\u2019existe plus.",
  "Select a map node first": "S\xE9lectionnez d\u2019abord un n\u0153ud",
  "Another map is open. The selection was copied, but not cut.": "Une autre carte est ouverte. La s\xE9lection a \xE9t\xE9 copi\xE9e, mais pas coup\xE9e.",
  "This command requires one selected node.": "Cette commande n\xE9cessite un seul n\u0153ud s\xE9lectionn\xE9.",
  "The map was closed or renamed. Copy the address again.": "La carte a \xE9t\xE9 ferm\xE9e ou renomm\xE9e. Recopiez l\u2019adresse.",
  "Node link copied.": "Lien du n\u0153ud copi\xE9.",
  "Another map is open. The branch was copied, but not cut.": "Une autre carte est ouverte. La branche a \xE9t\xE9 copi\xE9e, mais pas coup\xE9e.",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "Branche coup\xE9e. Ctrl+V pour coller, Annuler pour restaurer.",
  "The note was renamed. Copy the draft and reopen the editor.": "La note a \xE9t\xE9 renomm\xE9e. Copiez le brouillon et rouvrez l\u2019\xE9diteur.",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "La carte a chang\xE9 ailleurs. Le brouillon est conserv\xE9. Copiez-le avant de modifier \xE0 nouveau.",
  "The node no longer exists. Your draft is preserved.": "Le n\u0153ud n\u2019existe plus. Le brouillon est conserv\xE9.",
  "Steps \xB7 Deadlines \xB7 QA": "\xC9tapes \xB7 \xC9ch\xE9ances \xB7 QA",
  "Step deadline\u2026": "\xC9ch\xE9ance de l\u2019\xE9tape\u2026",
  "Completed / incomplete": "Termin\xE9 / en cours",
  "Move up": "Monter",
  "Move down": "Descendre",
  "Nest in previous branch": "Imbriquer dans la branche pr\xE9c\xE9dente",
  "Open text in editor": "Ouvrir le texte dans l\u2019\xE9diteur",
  "Delete branch\u2026": "Supprimer la branche\u2026",
  "Export HTML\u2026": "Exporter en HTML\u2026",
  "Export SVG\u2026": "Exporter en SVG\u2026",
  "Paste branch text\u2026": "Coller le texte d\u2019une branche\u2026",
  "Paste child Markdown branch": "Coller une branche Markdown enfant",
  "Renumber steps": "Renum\xE9roter les \xE9tapes",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "La carte cible a chang\xE9. Rouvrez les suggestions de liens. Le brouillon est conserv\xE9.",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "Ce bloc n\u2019est pas un n\u0153ud distinct. Utilisez \xAB Copier le lien du n\u0153ud \xBB.",
  "Native editor unavailable. Using text input. ": "\xC9diteur natif indisponible. Saisie de texte utilis\xE9e. ",
  "The note does not exist.": "La note n\u2019existe pas.",
  "File already exists. Choose another name.": "Le fichier existe d\xE9j\xE0. Choisissez un autre nom.",
  Steps: "\xC9tapes",
  Deadlines: "\xC9ch\xE9ances",
  "Open QA": "QA ouvertes",
  Refresh: "Actualiser",
  "Collapse all": "Tout replier",
  "Expand all": "Tout d\xE9plier",
  "Search steps": "Rechercher des \xE9tapes",
  "Find\u2026": "Rechercher\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "Le r\xE9ordonnancement modifie seulement les num\xE9ros d\u2019\xE9tapes d\u2019un fichier. Les branches restent en place. Les \xE9tapes dat\xE9es et non num\xE9rot\xE9es ont un ordre distinct.",
  Expand: "D\xE9plier",
  Collapse: "Replier",
  "No open items match this filter.": "Aucun \xE9l\xE9ment ouvert ne correspond \xE0 ce filtre.",
  "Mark completed": "Marquer comme termin\xE9",
  "Move earlier in execution order": "Avancer dans l\u2019ordre d\u2019ex\xE9cution",
  "Move later in execution order": "Reculer dans l\u2019ordre d\u2019ex\xE9cution",
  "Deadline ?": "\xC9ch\xE9ance ?",
  "Node editor": "\xC9diteur de n\u0153uds",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "S\u2019applique \xE0 la prochaine modification. Le mode natif utilise Live Preview et les suggestions d\u2019Obsidian, avec une saisie texte de secours.",
  "Native Obsidian": "Natif Obsidian",
  "Text input": "Saisie de texte",
  "Automatically restore large maps": "Restaurer automatiquement les grandes cartes",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "Au d\xE9marrage, la carte active attend une r\xE9ponse stable d\u2019Obsidian. \xAB Ouvrir maintenant \xBB ignore l\u2019attente.",
  "Hide frozen steps": "Masquer les \xE9tapes gel\xE9es",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "Ignorer les branches \u{1F9CA} dans les listes d\u2019\xE9tapes et d\u2019\xE9ch\xE9ances. Les cartes affichent tout le texte.",
  "Left arrow collapses the branch first": "La fl\xE8che gauche replie d\u2019abord la branche",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "D\xE9sactiv\xE9 : aller au parent. Activ\xE9 : replier la branche ouverte, puis appuyer \xE0 nouveau pour s\xE9lectionner le parent.",
  "Show [ ] in list text": "Afficher [ ] dans les listes",
  "Show #step in list text": "Afficher #step dans les listes",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "Concerne seulement \xC9tapes \xB7 \xC9ch\xE9ances \xB7 QA. Le texte des notes et les contr\xF4les de r\xE9alisation sont conserv\xE9s.",
  "Map node width": "Largeur des n\u0153uds de la carte",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "S\u2019applique imm\xE9diatement \xE0 toutes les cartes ouvertes. Plan et Tableau gardent leur largeur.",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "Le repli et la cam\xE9ra sont enregistr\xE9s sur cet appareil. La consultation ne r\xE9\xE9crit pas le Markdown et n\u2019ajoute pas d\u2019ID cach\xE9s. Windows et Android peuvent garder des vues distinctes.",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "La saisie native utilise l\u2019\xE9diteur Obsidian, la saisie texte l\u2019Editor API. Pour les commandes n\xE9cessitant la vue Markdown compl\xE8te, utilisez \u22EF \u2192 Ouvrir le texte dans l\u2019\xE9diteur.",
  "Map hotkeys": "Raccourcis de la carte",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "Les changements s\u2019appliquent imm\xE9diatement \xE0 toutes les cartes. Appuyez sur \u2328 puis le raccourci, ou saisissez Ctrl+C, Alt+Shift+1. S\xE9parez les variantes par des virgules. \xD7 d\xE9sactive, \u21BA r\xE9tablit les valeurs par d\xE9faut. En \xE9dition, les raccourcis habituels s\u2019appliquent.",
  Unassigned: "Non attribu\xE9",
  "Record shortcut": "Enregistrer un raccourci",
  Disable: "D\xE9sactiver",
  "Default shortcuts": "Raccourcis par d\xE9faut",
  "Search map\u2026": "Rechercher dans la carte\u2026",
  "Search map": "Rechercher dans la carte",
  " A\u2013Z": " A\u2013Z",
  "Close search": "Fermer la recherche",
  "Search results": "R\xE9sultats de recherche",
  "No results": "Aucun r\xE9sultat",
  "This Obsidian version has no compatible native editor.": "Cette version d\u2019Obsidian n\u2019a pas d\u2019\xE9diteur natif compatible.",
  "Could not prepare the native editor.": "Impossible de pr\xE9parer l\u2019\xE9diteur natif.",
  "The native editor cannot protect a single-line draft.": "L\u2019\xE9diteur natif ne peut pas prot\xE9ger un brouillon d\u2019une seule ligne.",
  "Native Obsidian link": "Lien natif Obsidian",
  "Map filter": "Filtre de cartes",
  "All maps": "Toutes les cartes",
  Maps: "Cartes",
  "No maps match this search.": "Aucune carte ne correspond \xE0 cette recherche.",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "La note a chang\xE9 dans une autre fen\xEAtre ou sur un autre appareil. La carte a \xE9t\xE9 actualis\xE9e. R\xE9essayez sur le texte \xE0 jour.",
  "History stopped because the text changed externally. Undo will preserve those changes.": "Historique arr\xEAt\xE9 suite \xE0 une modification externe. L\u2019annulation pr\xE9servera ces changements.",
  "Loading map\u2026": "Chargement de la carte\u2026",
  "Node address: ^": "Adresse du n\u0153ud : ^",
  "Branch ready to move": "Branche pr\xEAte \xE0 d\xE9placer",
  "Before: ": "Avant : ",
  "After: ": "Apr\xE8s : ",
  "As children: ": "Comme enfants : ",
  "Expand node": "D\xE9plier le n\u0153ud",
  "Collapse node": "Replier le n\u0153ud",
  "Collapse branch": "Replier la branche",
  "Expand branch": "D\xE9plier la branche",
  "Paste after node": "Coller apr\xE8s le n\u0153ud",
  Language: "Langue",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "Le mode automatique suit la langue d\u2019Obsidian. Red\xE9marrez Obsidian pour appliquer le changement.",
  "Automatic (Obsidian)": "Automatique (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "Langue enregistr\xE9e. Red\xE9marrez Obsidian.",
  "Selected nodes: {count}": "N\u0153uds s\xE9lectionn\xE9s : {count}",
  "Child levels: {count}": "Niveaux enfants : {count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "N\u0153uds : {nodes} \xB7 \xC9tapes ouvertes : {steps}",
  "Export {format} \u2014 file name": "Export {format} \u2014 nom du fichier",
  "Saved {path}": "Enregistr\xE9 : {path}",
  "Expand map: {name}": "D\xE9plier la carte : {name}",
  "Collapse map: {name}": "Replier la carte : {name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "Raccourcis en conflit : {shortcuts}. La premi\xE8re commande de la liste est prioritaire.",
  "Next action": "Prochaine action",
  "First action": "Premi\xE8re action",
  "Active now": "Actif maintenant",
  "Frozen / someday": "Gel\xE9 / un jour",
  "First step": "Premi\xE8re \xE9tape",
  "{path} \xB7 References: {count}": "{path} \xB7 R\xE9f\xE9rences : {count}",
  "Attachment saved, but the editor is already closed: {link}": "Pi\xE8ce jointe enregistr\xE9e, mais l\u2019\xE9diteur est d\xE9j\xE0 ferm\xE9 : {link}",
  "Copy selection": "Copier la s\xE9lection",
  "Cut selection": "Couper la s\xE9lection",
  "Delete selection": "Supprimer la s\xE9lection",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "Carte compl\xE8te \xB7 {count} n\u0153uds \xB7 Export en lecture seule. S\xE9lectionnez un marqueur de branche pour la replier. Les libell\xE9s gardent le Markdown. Les liens et pi\xE8ces jointes du coffre n\xE9cessitent Obsidian.",
  "This map contains no outline nodes.": "Cette carte ne contient aucun n\u0153ud de plan.",
  "This node no longer exists. Reopen the map and try again.": "Ce n\u0153ud n\u2019existe plus. Rouvrez la carte.",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "Un n\u0153ud doit tenir sur une ligne. Utilisez un enfant ou une note li\xE9e pour le reste.",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "Ce texte deviendrait un bloc de code ou un s\xE9parateur. \xC9chappez le marqueur ou modifiez la source.",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown accepte six niveaux de titres. Ajoutez une puce enfant dans la source.",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "Ce texte ne peut pas servir de parent Markdown. \xC9chappez le marqueur ou modifiez la source.",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "La branche contient du contenu hors des n\u0153uds. Modifiez sa structure dans la source pour le pr\xE9server.",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "Retrait ambigu. Corrigez-le dans la source avant de d\xE9placer.",
  "That move would exceed Markdown\u2019s six heading levels.": "Ce d\xE9placement d\xE9passerait six niveaux de titres.",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "D\xE9placer entre titre et puce change leur sens. Utilisez la source.",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "Le retrait de titres et puces m\xE9lang\xE9s est ambigu. Utilisez la source.",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "Sortir une puce d\u2019un titre exige un changement de format. Utilisez la source.",
  "A branch cannot be moved into itself or one of its descendants.": "Impossible de d\xE9placer une branche dans elle-m\xEAme ou un descendant.",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "Un titre ne peut pas devenir enfant d\u2019une puce. Changez son format dans la source.",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "Une puce apr\xE8s un sous-titre lui appartient. Choisissez un parent de liste ou modifiez la structure.",
  "Paste an outline branch, or paste one line as a new node.": "Collez une branche de plan ou une ligne comme nouveau n\u0153ud.",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "Collez les puces pr\xE8s des puces, les titres pr\xE8s des titres. Convertissez dans la source.",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "Le presse-papiers contient du contenu hors du plan. Collez dans la source pour le pr\xE9server.",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "Utilisez AAAA-MM-JJ ou ? pour une \xE9ch\xE9ance inconnue.",
  "That calendar date does not exist.": "Cette date n\u2019existe pas.",
  "The execution order contains the same step twice.": "L\u2019ordre contient deux fois la m\xEAme \xE9tape.",
  "Only numbered, undated steps can be placed in an execution order.": "Seules les \xE9tapes num\xE9rot\xE9es sans date peuvent \xEAtre ordonn\xE9es.",
  Untitled: "Sans titre",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "Cette carte n\u2019a pas de n\u0153uds. Ouvrez la source et ajoutez un titre ou une puce.",
  "Mark incomplete": "Marquer comme non termin\xE9",
  "Invalid saved map patterns. Default patterns are active.": "Motifs enregistr\xE9s invalides. Les r\xE8gles par d\xE9faut sont actives.",
  "Automatically open matching notes as maps": "Ouvrir automatiquement les notes correspondantes en cartes",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "Pour les notes correspondant aux motifs ci-dessous. Ouvrir explicitement le Markdown source conserve ce mode.",
  "Invalid pattern on line {line}: {error}": "Motif invalide \xE0 la ligne {line} : {error}",
  "Patterns saved.": "Motifs enregistr\xE9s.",
  "Pattern syntax": "Syntaxe des motifs",
  "Glob (wildcards)": "Glob (caract\xE8res g\xE9n\xE9riques)",
  "Regular expressions": "Expressions r\xE9guli\xE8res",
  "Map file patterns": "Motifs de fichiers de cartes",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "Un motif par ligne ; une correspondance suffit. Glob sans / compare les noms dans tous les dossiers ; avec /, les chemins relatifs au coffre. Utilisez *, ** et ?. Regex compare ces chemins sans d\xE9limiteurs /. La casse est ignor\xE9e. Fichiers Markdown uniquement.",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "La propri\xE9t\xE9 mindmap: true identifie aussi une carte. Une saisie invalide conserve les derni\xE8res r\xE8gles enregistr\xE9es. Les motifs sont partag\xE9s entre ouverture automatique, recherche et listes d\u2019\xE9tapes.",
  "This JSON map format is not supported.": "Ce format de carte JSON n\u2019est pas pris en charge.",
  "Restore default patterns": "R\xE9tablir les motifs par d\xE9faut",
  "Restore default settings": "R\xE9tablir les param\xE8tres par d\xE9faut",
  "Restore defaults": "R\xE9tablir",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "R\xE9tablir les param\xE8tres, raccourcis et motifs de cartes ? Les vues locales et les notes enregistr\xE9es sont conserv\xE9es. Red\xE9marrez Obsidian pour appliquer la langue.",
  "Default settings restored. Restart Obsidian to apply the language.": "Param\xE8tres par d\xE9faut r\xE9tablis. Red\xE9marrez Obsidian pour appliquer la langue."
};

// src/locales/pt-BR.json
var pt_BR_default = {
  "A node with its own Markdown line is required.": "\xC9 necess\xE1rio um n\xF3 com sua pr\xF3pria linha Markdown.",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "ID de bloco duplicado. Corrija no Markdown antes de copiar o endere\xE7o.",
  "A unique block ID is required.": "\xC9 necess\xE1rio um ID de bloco \xFAnico.",
  "The selection changed. Run the command again.": "A sele\xE7\xE3o mudou. Repita o comando.",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "N\xE3o \xE9 poss\xEDvel mover um ramo para si mesmo, um descendente ou um n\xF3 Markdown incompat\xEDvel.",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "Um item ap\xF3s um subt\xEDtulo pertence a ele. Escolha um item pai ou altere a estrutura Markdown.",
  "Sibling above": "Irm\xE3o acima",
  "Sibling below": "Irm\xE3o abaixo",
  "Child node": "N\xF3 filho",
  "Parent node": "N\xF3 pai",
  "Find a map\u2026": "Buscar mapa\u2026",
  "Note name, alias or new link\u2026": "Nome da nota, alias ou novo link\u2026",
  select: "selecionar",
  "insert link": "inserir link",
  "return to node": "voltar ao n\xF3",
  "file not created yet": "arquivo ainda n\xE3o criado",
  "new link": "novo link",
  "Insert a link without creating a file": "Inserir link sem criar arquivo",
  "The file changed or was deleted. Search again.": "O arquivo mudou ou foi exclu\xEDdo. Busque novamente.",
  "Link (Ctrl+K)": "Link (Ctrl+K)",
  "Highlight text": "Destacar texto",
  "Mark as question": "Marcar como pergunta",
  "Step deadline": "Prazo da etapa",
  Date: "Data",
  " Unknown deadline (?)": " Prazo desconhecido (?)",
  "Previous month": "M\xEAs anterior",
  "Next month": "Pr\xF3ximo m\xEAs",
  Mon: "Seg",
  Tue: "Ter",
  Wed: "Qua",
  Thu: "Qui",
  Fri: "Sex",
  Sat: "S\xE1b",
  Sun: "Dom",
  Cancel: "Cancelar",
  Save: "Salvar",
  "Enter to save, Esc to cancel.": "Enter para salvar, Esc para cancelar.",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Enter para confirmar, Esc para cancelar.",
  "Delete branch": "Excluir ramo",
  "Extend selection up": "Estender sele\xE7\xE3o para cima",
  "Extend selection down": "Estender sele\xE7\xE3o para baixo",
  "Extend selection to parent": "Estender sele\xE7\xE3o ao pai",
  "Extend selection to child": "Estender sele\xE7\xE3o ao filho",
  "Select all visible nodes": "Selecionar todos os n\xF3s vis\xEDveis",
  "Cut branch": "Recortar ramo",
  "Copy link to node": "Copiar link do n\xF3",
  "Copy branch": "Copiar ramo",
  "Paste as child branch": "Colar como ramo filho",
  "Paste branch after node": "Colar ramo ap\xF3s o n\xF3",
  Undo: "Desfazer",
  Redo: "Refazer",
  "Edit node": "Editar n\xF3",
  "Add child node": "Adicionar n\xF3 filho",
  "Add parent node": "Adicionar n\xF3 pai",
  "Add sibling above": "Adicionar irm\xE3o acima",
  "Add sibling node": "Adicionar n\xF3 irm\xE3o",
  "Move branch up": "Mover ramo para cima",
  "Move branch down": "Mover ramo para baixo",
  "Make child of previous node": "Tornar filho do n\xF3 anterior",
  "Move up one level": "Subir um n\xEDvel",
  "Toggle completion": "Alternar conclus\xE3o",
  "Make numbered step": "Tornar etapa numerada",
  "Set date": "Definir data",
  "Open source Markdown": "Abrir Markdown de origem",
  "Select parent node": "Selecionar pai",
  "Select child node": "Selecionar filho",
  "Select previous sibling": "Selecionar irm\xE3o anterior",
  "Select next sibling": "Selecionar pr\xF3ximo irm\xE3o",
  "Select first node": "Selecionar primeiro n\xF3",
  "Select last node": "Selecionar \xFAltimo n\xF3",
  "Collapse / expand node": "Recolher / expandir n\xF3",
  "Collapse all roots": "Recolher todas as ra\xEDzes",
  "Collapse selected branch": "Recolher ramo selecionado",
  "Expand selected branch": "Expandir ramo selecionado",
  "Selected node only": "Apenas n\xF3 selecionado",
  "Show one child level": "Mostrar um n\xEDvel de filhos",
  "Show two child levels": "Mostrar dois n\xEDveis de filhos",
  "Show three child levels": "Mostrar tr\xEAs n\xEDveis de filhos",
  "Show four child levels": "Mostrar quatro n\xEDveis de filhos",
  "Show five child levels": "Mostrar cinco n\xEDveis de filhos",
  "Expand all child levels": "Expandir todos os n\xEDveis de filhos",
  "Find in map": "Buscar no mapa",
  "Fit map": "Ajustar mapa",
  "Specify a key after the modifiers.": "Informe uma tecla ap\xF3s os modificadores.",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "Modificadores: Ctrl, Alt, Shift, Meta ou Mod.",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "N\xE3o repita modificadores. Mod j\xE1 significa Ctrl ou Cmd.",
  "This image format is not supported.": "Formato de imagem n\xE3o suportado.",
  "The clipboard image is empty.": "A imagem da \xE1rea de transfer\xEAncia est\xE1 vazia.",
  "Could not save the attachment.": "N\xE3o foi poss\xEDvel salvar o anexo.",
  "Saving image\u2026": "Salvando imagem\u2026",
  "Node text": "Texto do n\xF3",
  "Save (Enter)": "Salvar (Enter)",
  "Cancel (Escape)": "Cancelar (Escape)",
  "Close the editor and discard your changes?": "Fechar o editor e descartar as altera\xE7\xF5es?",
  "Continue editing": "Continuar editando",
  "Discard changes": "Descartar altera\xE7\xF5es",
  "A node cannot be empty.": "Um n\xF3 n\xE3o pode ficar vazio.",
  "Multiple cursors are available in source Markdown.": "V\xE1rios cursores est\xE3o dispon\xEDveis no Markdown de origem.",
  "This command requires the source Markdown editor.": "Este comando requer o editor Markdown de origem.",
  "Fixed width": "Largura fixa",
  "Fit node content": "Ajustar ao conte\xFAdo do n\xF3",
  "Fit visible column": "Ajustar \xE0 coluna vis\xEDvel",
  "TraceView Mindmap: open map": "TraceView Mindmap: abrir mapa",
  "Open current note as a map": "Abrir nota atual como mapa",
  "Open map at the Markdown cursor": "Abrir mapa no cursor Markdown",
  "Find a map": "Buscar mapa",
  "Create a simple tree": "Criar \xE1rvore simples",
  "Create a vector (separate template)": "Criar vetor (modelo separado)",
  "Steps, deadlines and QA": "Etapas, prazos e QA",
  "Mark as atomic step": "Marcar como etapa at\xF4mica",
  "Add step deadline": "Adicionar prazo \xE0 etapa",
  "Mark as QA": "Marcar como QA",
  "Toggle step completion": "Alternar conclus\xE3o da etapa",
  "Paste as sibling branch": "Colar como ramo irm\xE3o",
  "Undo map change": "Desfazer altera\xE7\xE3o do mapa",
  "Redo map change": "Refazer altera\xE7\xE3o do mapa",
  "Insert QA in Markdown editor": "Inserir QA no editor Markdown",
  "Insert unnumbered step in Markdown editor": "Inserir etapa sem n\xFAmero no editor Markdown",
  "Open map at this node": "Abrir mapa neste n\xF3",
  "Open in TraceView Mindmap": "Abrir no TraceView Mindmap",
  "The note changed. Open it again at the current line.": "A nota mudou. Abra novamente na linha atual.",
  "Save or cancel the node draft.": "Salve ou cancele o rascunho do n\xF3.",
  "New vector name": "Nome do novo vetor",
  "New tree name": "Nome da nova \xE1rvore",
  "Use a name without path characters.": "Use um nome sem caracteres de caminho.",
  "A file with this name already exists.": "J\xE1 existe um arquivo com este nome.",
  "The Markdown editor has newer text. Wait for it to save and try again.": "O editor Markdown tem texto mais recente. Aguarde o salvamento e tente novamente.",
  "Branch copied": "Ramo copiado",
  "Branch saved to the plugin clipboard": "Ramo salvo na \xE1rea de transfer\xEAncia do plugin",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "\xC1rea de transfer\xEAncia indispon\xEDvel. O ramo n\xE3o foi recortado. Permita o acesso e tente novamente.",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "\xC1rea de transfer\xEAncia indispon\xEDvel. Use \u201CColar texto do ramo\u201D no menu \u22EF.",
  "Save or cancel the node draft before navigating.": "Salve ou cancele o rascunho antes de navegar.",
  "Waiting for Obsidian to be ready\u2026": "Aguardando Obsidian ficar pronto\u2026",
  "Wait for Obsidian to load, then open the map.": "Aguarde o carregamento do Obsidian e abra o mapa.",
  "This address is duplicated. Fix the block ID in Markdown.": "Endere\xE7o duplicado. Corrija o ID do bloco no Markdown.",
  "The linked node was not found.": "N\xF3 vinculado n\xE3o encontrado.",
  "Collapse levels": "N\xEDveis de recolhimento",
  "Delete selected branch": "Excluir ramo selecionado",
  "Sibling node": "N\xF3 irm\xE3o",
  Edit: "Editar",
  "Multiple selection: taps or rectangle": "Sele\xE7\xE3o m\xFAltipla: toques ou ret\xE2ngulo",
  Search: "Buscar",
  "Layout and node width": "Layout e largura dos n\xF3s",
  "Map actions": "A\xE7\xF5es do mapa",
  "Open now": "Abrir agora",
  Map: "Mapa",
  Outline: "Estrutura",
  Table: "Tabela",
  "Expand entire map": "Expandir mapa inteiro",
  "All child levels": "Todos os n\xEDveis de filhos",
  "The map will open after the workspace loads\u2026": "O mapa abrir\xE1 ap\xF3s carregar o espa\xE7o de trabalho\u2026",
  "File missing or deleted. Open another map.": "Arquivo ausente ou exclu\xEDdo. Abra outro mapa.",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "O mapa mudou ou est\xE1 sendo salvo. O rascunho continua no campo. Copie antes de cancelar e tente no mapa atual.",
  "The file no longer exists.": "O arquivo n\xE3o existe mais.",
  "Select a map node first": "Selecione um n\xF3 primeiro",
  "Another map is open. The selection was copied, but not cut.": "Outro mapa est\xE1 aberto. A sele\xE7\xE3o foi copiada, mas n\xE3o recortada.",
  "This command requires one selected node.": "Este comando requer apenas um n\xF3 selecionado.",
  "The map was closed or renamed. Copy the address again.": "O mapa foi fechado ou renomeado. Copie o endere\xE7o novamente.",
  "Node link copied.": "Link do n\xF3 copiado.",
  "Another map is open. The branch was copied, but not cut.": "Outro mapa est\xE1 aberto. O ramo foi copiado, mas n\xE3o recortado.",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "Ramo recortado. Ctrl+V para colar, Desfazer para restaurar.",
  "The note was renamed. Copy the draft and reopen the editor.": "A nota foi renomeada. Copie o rascunho e reabra o editor.",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "O mapa mudou externamente. O rascunho foi preservado. Copie antes de editar novamente.",
  "The node no longer exists. Your draft is preserved.": "O n\xF3 n\xE3o existe mais. O rascunho foi preservado.",
  "Steps \xB7 Deadlines \xB7 QA": "Etapas \xB7 Prazos \xB7 QA",
  "Step deadline\u2026": "Prazo da etapa\u2026",
  "Completed / incomplete": "Conclu\xEDdo / pendente",
  "Move up": "Mover para cima",
  "Move down": "Mover para baixo",
  "Nest in previous branch": "Aninhar no ramo anterior",
  "Open text in editor": "Abrir texto no editor",
  "Delete branch\u2026": "Excluir ramo\u2026",
  "Export HTML\u2026": "Exportar HTML\u2026",
  "Export SVG\u2026": "Exportar SVG\u2026",
  "Paste branch text\u2026": "Colar texto do ramo\u2026",
  "Paste child Markdown branch": "Colar ramo filho Markdown",
  "Renumber steps": "Renumerar etapas",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "O mapa de destino mudou. Reabra as sugest\xF5es de links. O rascunho foi preservado.",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "Este bloco n\xE3o \xE9 um n\xF3 separado. Use \u201CCopiar link do n\xF3\u201D.",
  "Native editor unavailable. Using text input. ": "Editor nativo indispon\xEDvel. Usando entrada de texto. ",
  "The note does not exist.": "A nota n\xE3o existe.",
  "File already exists. Choose another name.": "O arquivo j\xE1 existe. Escolha outro nome.",
  Steps: "Etapas",
  Deadlines: "Prazos",
  "Open QA": "QA abertas",
  Refresh: "Atualizar",
  "Collapse all": "Recolher tudo",
  "Expand all": "Expandir tudo",
  "Search steps": "Buscar etapas",
  "Find\u2026": "Buscar\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "Reordenar muda apenas os n\xFAmeros das etapas em um arquivo. Os ramos ficam no lugar. Etapas com data e sem n\xFAmero t\xEAm ordem separada.",
  Expand: "Expandir",
  Collapse: "Recolher",
  "No open items match this filter.": "Nenhum item aberto corresponde a este filtro.",
  "Mark completed": "Marcar como conclu\xEDdo",
  "Move earlier in execution order": "Antecipar na ordem de execu\xE7\xE3o",
  "Move later in execution order": "Adiar na ordem de execu\xE7\xE3o",
  "Deadline ?": "Prazo ?",
  "Node editor": "Editor de n\xF3s",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "Vale na pr\xF3xima edi\xE7\xE3o. O nativo usa Live Preview e sugest\xF5es do Obsidian, com entrada de texto como alternativa.",
  "Native Obsidian": "Nativo do Obsidian",
  "Text input": "Entrada de texto",
  "Automatically restore large maps": "Restaurar mapas grandes automaticamente",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "Ao iniciar, o mapa ativo aguarda respostas est\xE1veis do Obsidian. \u201CAbrir agora\u201D pula a espera.",
  "Hide frozen steps": "Ocultar etapas congeladas",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "Ignorar ramos \u{1F9CA} nas listas de etapas e prazos. Os mapas mostram todo o texto.",
  "Left arrow collapses the branch first": "Seta esquerda recolhe o ramo primeiro",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "Desativado: ir direto ao pai. Ativado: recolher o ramo aberto, depois pressionar novamente para selecionar o pai.",
  "Show [ ] in list text": "Mostrar [ ] no texto das listas",
  "Show #step in list text": "Mostrar #step no texto das listas",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "Afeta apenas Etapas \xB7 Prazos \xB7 QA. O texto das notas e os controles de conclus\xE3o s\xE3o preservados.",
  "Map node width": "Largura dos n\xF3s do mapa",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "Aplica imediatamente a todos os mapas abertos. Estrutura e Tabela mant\xEAm suas larguras.",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "Recolhimentos e c\xE2mera s\xE3o salvos neste dispositivo. Visualizar n\xE3o reescreve Markdown nem adiciona IDs ocultos. Windows e Android podem manter vistas diferentes.",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "A entrada nativa usa o editor Obsidian, a de texto usa a Editor API. Para comandos que exigem a vista Markdown completa, use \u22EF \u2192 Abrir texto no editor.",
  "Map hotkeys": "Atalhos do mapa",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "Altera\xE7\xF5es valem imediatamente em todos os mapas. Pressione \u2328 e o atalho, ou digite: Ctrl+C, Alt+Shift+1. Separe alternativas com v\xEDrgulas. \xD7 desativa, \u21BA restaura padr\xF5es. Durante a edi\xE7\xE3o, valem os atalhos normais.",
  Unassigned: "N\xE3o atribu\xEDdo",
  "Record shortcut": "Gravar atalho",
  Disable: "Desativar",
  "Default shortcuts": "Atalhos padr\xE3o",
  "Search map\u2026": "Buscar no mapa\u2026",
  "Search map": "Buscar no mapa",
  " A\u2013Z": " A\u2013Z",
  "Close search": "Fechar busca",
  "Search results": "Resultados da busca",
  "No results": "Nenhum resultado",
  "This Obsidian version has no compatible native editor.": "Esta vers\xE3o do Obsidian n\xE3o tem editor nativo compat\xEDvel.",
  "Could not prepare the native editor.": "N\xE3o foi poss\xEDvel preparar o editor nativo.",
  "The native editor cannot protect a single-line draft.": "O editor nativo n\xE3o pode proteger um rascunho de uma linha.",
  "Native Obsidian link": "Link nativo do Obsidian",
  "Map filter": "Filtro de mapas",
  "All maps": "Todos os mapas",
  Maps: "Mapas",
  "No maps match this search.": "Nenhum mapa corresponde \xE0 busca.",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "A nota mudou em outra janela ou dispositivo. O mapa foi atualizado. Tente no texto mais recente.",
  "History stopped because the text changed externally. Undo will preserve those changes.": "Hist\xF3rico interrompido por altera\xE7\xE3o externa. Desfazer preservar\xE1 essas mudan\xE7as.",
  "Loading map\u2026": "Carregando mapa\u2026",
  "Node address: ^": "Endere\xE7o do n\xF3: ^",
  "Branch ready to move": "Ramo pronto para mover",
  "Before: ": "Antes: ",
  "After: ": "Depois: ",
  "As children: ": "Como filhos: ",
  "Expand node": "Expandir n\xF3",
  "Collapse node": "Recolher n\xF3",
  "Collapse branch": "Recolher ramo",
  "Expand branch": "Expandir ramo",
  "Paste after node": "Colar ap\xF3s o n\xF3",
  Language: "Idioma",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "Autom\xE1tico usa o idioma do Obsidian. Reinicie Obsidian para aplicar a mudan\xE7a.",
  "Automatic (Obsidian)": "Autom\xE1tico (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "Idioma salvo. Reinicie Obsidian.",
  "Selected nodes: {count}": "N\xF3s selecionados: {count}",
  "Child levels: {count}": "N\xEDveis de filhos: {count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "N\xF3s: {nodes} \xB7 Etapas abertas: {steps}",
  "Export {format} \u2014 file name": "Exportar {format} \u2014 nome do arquivo",
  "Saved {path}": "Salvo {path}",
  "Expand map: {name}": "Expandir mapa: {name}",
  "Collapse map: {name}": "Recolher mapa: {name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "Atalhos em conflito: {shortcuts}. O primeiro comando da lista tem prioridade.",
  "Next action": "Pr\xF3xima a\xE7\xE3o",
  "First action": "Primeira a\xE7\xE3o",
  "Active now": "Ativo agora",
  "Frozen / someday": "Congelado / algum dia",
  "First step": "Primeira etapa",
  "{path} \xB7 References: {count}": "{path} \xB7 Refer\xEAncias: {count}",
  "Attachment saved, but the editor is already closed: {link}": "Anexo salvo, mas o editor j\xE1 foi fechado: {link}",
  "Copy selection": "Copiar sele\xE7\xE3o",
  "Cut selection": "Recortar sele\xE7\xE3o",
  "Delete selection": "Excluir sele\xE7\xE3o",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "Mapa completo \xB7 {count} n\xF3s \xB7 Exporta\xE7\xE3o somente leitura. Selecione o marcador de um ramo para recolher. R\xF3tulos mant\xEAm Markdown. Links e anexos do cofre exigem Obsidian.",
  "This map contains no outline nodes.": "Este mapa n\xE3o cont\xE9m n\xF3s de estrutura.",
  "This node no longer exists. Reopen the map and try again.": "O n\xF3 n\xE3o existe mais. Reabra o mapa.",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "O n\xF3 deve caber em uma linha. Use um filho ou uma nota vinculada para mais texto.",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "Este texto viraria c\xF3digo ou separador. Escape o marcador ou edite na origem.",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown suporta seis n\xEDveis de t\xEDtulos. Adicione um item filho na origem.",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "Este texto n\xE3o pode ser pai Markdown. Escape o marcador ou edite na origem.",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "O ramo tem conte\xFAdo fora dos n\xF3s. Edite a estrutura na origem para preserv\xE1-lo.",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "Recuo amb\xEDguo. Ajuste na origem antes de mover.",
  "That move would exceed Markdown\u2019s six heading levels.": "O movimento excederia seis n\xEDveis de t\xEDtulos.",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "Mover entre t\xEDtulo e item muda o significado. Use a origem.",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "Recuar t\xEDtulos e itens misturados \xE9 amb\xEDguo. Use a origem.",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "Retirar um item de um t\xEDtulo exige mudar o formato. Use a origem.",
  "A branch cannot be moved into itself or one of its descendants.": "N\xE3o \xE9 poss\xEDvel mover um ramo para si mesmo ou um descendente.",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "Um t\xEDtulo n\xE3o pode ser filho de um item. Mude o formato na origem.",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "Um item ap\xF3s subt\xEDtulo pertence a ele. Escolha um pai de lista ou mude a estrutura.",
  "Paste an outline branch, or paste one line as a new node.": "Cole um ramo de estrutura ou uma linha como novo n\xF3.",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "Cole itens ao lado de itens e t\xEDtulos ao lado de t\xEDtulos. Converta na origem.",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "A \xE1rea de transfer\xEAncia cont\xE9m conte\xFAdo fora da estrutura. Cole na origem para preservar.",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "Use AAAA-MM-DD ou ? para prazo desconhecido.",
  "That calendar date does not exist.": "Essa data n\xE3o existe.",
  "The execution order contains the same step twice.": "A ordem cont\xE9m a mesma etapa duas vezes.",
  "Only numbered, undated steps can be placed in an execution order.": "Apenas etapas numeradas sem data podem ser ordenadas.",
  Untitled: "Sem t\xEDtulo",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "O mapa n\xE3o tem n\xF3s. Abra a origem e adicione um t\xEDtulo ou item.",
  "Mark incomplete": "Marcar como pendente",
  "Invalid saved map patterns. Default patterns are active.": "Padr\xF5es salvos inv\xE1lidos. Os padr\xF5es iniciais est\xE3o ativos.",
  "Automatically open matching notes as maps": "Abrir notas correspondentes como mapas automaticamente",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "Para notas que correspondam aos padr\xF5es abaixo. Abrir explicitamente o Markdown de origem mant\xE9m esse modo.",
  "Invalid pattern on line {line}: {error}": "Padr\xE3o inv\xE1lido na linha {line}: {error}",
  "Patterns saved.": "Padr\xF5es salvos.",
  "Pattern syntax": "Sintaxe dos padr\xF5es",
  "Glob (wildcards)": "Glob (curingas)",
  "Regular expressions": "Express\xF5es regulares",
  "Map file patterns": "Padr\xF5es de arquivos de mapas",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "Um padr\xE3o por linha; qualquer correspond\xEAncia basta. Glob sem / verifica nomes em qualquer pasta; com /, caminhos relativos ao cofre. Use *, ** e ?. Regex verifica esses caminhos sem delimitadores /. Ignora mai\xFAsculas e min\xFAsculas. Apenas arquivos Markdown.",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "A propriedade mindmap: true tamb\xE9m identifica um mapa. Entrada inv\xE1lida mant\xE9m as \xFAltimas regras salvas. Padr\xF5es s\xE3o compartilhados por abertura autom\xE1tica, busca e listas de etapas.",
  "This JSON map format is not supported.": "Este formato de mapa JSON n\xE3o \xE9 suportado.",
  "Restore default patterns": "Restaurar padr\xF5es iniciais",
  "Restore default settings": "Restaurar configura\xE7\xF5es padr\xE3o",
  "Restore defaults": "Restaurar",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "Restaurar prefer\xEAncias, atalhos e padr\xF5es de mapas? Estados locais de visualiza\xE7\xE3o e notas salvas ser\xE3o preservados. Reinicie Obsidian para aplicar o idioma.",
  "Default settings restored. Restart Obsidian to apply the language.": "Configura\xE7\xF5es padr\xE3o restauradas. Reinicie Obsidian para aplicar o idioma."
};

// src/locales/zh-CN.json
var zh_CN_default = {
  "A node with its own Markdown line is required.": "\u9700\u8981\u5177\u6709\u72EC\u7ACB Markdown \u884C\u7684\u8282\u70B9\u3002",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "\u5757 ID \u91CD\u590D\u3002\u8BF7\u5148\u5728 Markdown \u4E2D\u4FEE\u6B63\uFF0C\u518D\u590D\u5236\u5730\u5740\u3002",
  "A unique block ID is required.": "\u9700\u8981\u552F\u4E00\u7684\u5757 ID\u3002",
  "The selection changed. Run the command again.": "\u6240\u9009\u5185\u5BB9\u5DF2\u66F4\u6539\u3002\u8BF7\u91CD\u8BD5\u547D\u4EE4\u3002",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "\u65E0\u6CD5\u5C06\u5206\u652F\u79FB\u5165\u81EA\u8EAB\u3001\u540E\u4EE3\u8282\u70B9\u6216\u4E0D\u517C\u5BB9\u7684 Markdown \u8282\u70B9\u3002",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "\u5B50\u6807\u9898\u540E\u7684\u5217\u8868\u9879\u5F52\u5C5E\u8BE5\u6807\u9898\u3002\u8BF7\u9009\u62E9\u5217\u8868\u9879\u4F5C\u4E3A\u7236\u8282\u70B9\uFF0C\u6216\u4FEE\u6539 Markdown \u7ED3\u6784\u3002",
  "Sibling above": "\u4E0A\u65B9\u540C\u7EA7\u8282\u70B9",
  "Sibling below": "\u4E0B\u65B9\u540C\u7EA7\u8282\u70B9",
  "Child node": "\u5B50\u8282\u70B9",
  "Parent node": "\u7236\u8282\u70B9",
  "Find a map\u2026": "\u67E5\u627E\u5BFC\u56FE\u2026",
  "Note name, alias or new link\u2026": "\u7B14\u8BB0\u540D\u79F0\u3001\u522B\u540D\u6216\u65B0\u94FE\u63A5\u2026",
  select: "\u9009\u62E9",
  "insert link": "\u63D2\u5165\u94FE\u63A5",
  "return to node": "\u8FD4\u56DE\u8282\u70B9",
  "file not created yet": "\u6587\u4EF6\u5C1A\u672A\u521B\u5EFA",
  "new link": "\u65B0\u94FE\u63A5",
  "Insert a link without creating a file": "\u63D2\u5165\u94FE\u63A5\u800C\u4E0D\u521B\u5EFA\u6587\u4EF6",
  "The file changed or was deleted. Search again.": "\u6587\u4EF6\u5DF2\u66F4\u6539\u6216\u5220\u9664\u3002\u8BF7\u91CD\u65B0\u641C\u7D22\u3002",
  "Link (Ctrl+K)": "\u94FE\u63A5 (Ctrl+K)",
  "Highlight text": "\u9AD8\u4EAE\u6587\u672C",
  "Mark as question": "\u6807\u8BB0\u4E3A\u95EE\u9898",
  "Step deadline": "\u6B65\u9AA4\u622A\u6B62\u65E5\u671F",
  Date: "\u65E5\u671F",
  " Unknown deadline (?)": " \u672A\u77E5\u622A\u6B62\u65E5\u671F (?)",
  "Previous month": "\u4E0A\u4E2A\u6708",
  "Next month": "\u4E0B\u4E2A\u6708",
  Mon: "\u4E00",
  Tue: "\u4E8C",
  Wed: "\u4E09",
  Thu: "\u56DB",
  Fri: "\u4E94",
  Sat: "\u516D",
  Sun: "\u65E5",
  Cancel: "\u53D6\u6D88",
  Save: "\u4FDD\u5B58",
  "Enter to save, Esc to cancel.": "Enter \u4FDD\u5B58\uFF0CEsc \u53D6\u6D88\u3002",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Enter \u786E\u8BA4\uFF0CEsc \u53D6\u6D88\u3002",
  "Delete branch": "\u5220\u9664\u5206\u652F",
  "Extend selection up": "\u5411\u4E0A\u6269\u5C55\u9009\u62E9",
  "Extend selection down": "\u5411\u4E0B\u6269\u5C55\u9009\u62E9",
  "Extend selection to parent": "\u6269\u5C55\u9009\u62E9\u81F3\u7236\u8282\u70B9",
  "Extend selection to child": "\u6269\u5C55\u9009\u62E9\u81F3\u5B50\u8282\u70B9",
  "Select all visible nodes": "\u9009\u62E9\u6240\u6709\u53EF\u89C1\u8282\u70B9",
  "Cut branch": "\u526A\u5207\u5206\u652F",
  "Copy link to node": "\u590D\u5236\u8282\u70B9\u94FE\u63A5",
  "Copy branch": "\u590D\u5236\u5206\u652F",
  "Paste as child branch": "\u7C98\u8D34\u4E3A\u5B50\u5206\u652F",
  "Paste branch after node": "\u5728\u8282\u70B9\u540E\u7C98\u8D34\u5206\u652F",
  Undo: "\u64A4\u9500",
  Redo: "\u91CD\u505A",
  "Edit node": "\u7F16\u8F91\u8282\u70B9",
  "Add child node": "\u6DFB\u52A0\u5B50\u8282\u70B9",
  "Add parent node": "\u6DFB\u52A0\u7236\u8282\u70B9",
  "Add sibling above": "\u5728\u4E0A\u65B9\u6DFB\u52A0\u540C\u7EA7\u8282\u70B9",
  "Add sibling node": "\u6DFB\u52A0\u540C\u7EA7\u8282\u70B9",
  "Move branch up": "\u4E0A\u79FB\u5206\u652F",
  "Move branch down": "\u4E0B\u79FB\u5206\u652F",
  "Make child of previous node": "\u8BBE\u4E3A\u524D\u4E00\u8282\u70B9\u7684\u5B50\u8282\u70B9",
  "Move up one level": "\u4E0A\u79FB\u4E00\u7EA7",
  "Toggle completion": "\u5207\u6362\u5B8C\u6210\u72B6\u6001",
  "Make numbered step": "\u8BBE\u4E3A\u7F16\u53F7\u6B65\u9AA4",
  "Set date": "\u8BBE\u7F6E\u65E5\u671F",
  "Open source Markdown": "\u6253\u5F00 Markdown \u6E90\u6587",
  "Select parent node": "\u9009\u62E9\u7236\u8282\u70B9",
  "Select child node": "\u9009\u62E9\u5B50\u8282\u70B9",
  "Select previous sibling": "\u9009\u62E9\u4E0A\u4E00\u4E2A\u540C\u7EA7\u8282\u70B9",
  "Select next sibling": "\u9009\u62E9\u4E0B\u4E00\u4E2A\u540C\u7EA7\u8282\u70B9",
  "Select first node": "\u9009\u62E9\u7B2C\u4E00\u4E2A\u8282\u70B9",
  "Select last node": "\u9009\u62E9\u6700\u540E\u4E00\u4E2A\u8282\u70B9",
  "Collapse / expand node": "\u6298\u53E0 / \u5C55\u5F00\u8282\u70B9",
  "Collapse all roots": "\u6298\u53E0\u6240\u6709\u6839\u8282\u70B9",
  "Collapse selected branch": "\u6298\u53E0\u6240\u9009\u5206\u652F",
  "Expand selected branch": "\u5C55\u5F00\u6240\u9009\u5206\u652F",
  "Selected node only": "\u4EC5\u6240\u9009\u8282\u70B9",
  "Show one child level": "\u663E\u793A\u4E00\u7EA7\u5B50\u8282\u70B9",
  "Show two child levels": "\u663E\u793A\u4E24\u7EA7\u5B50\u8282\u70B9",
  "Show three child levels": "\u663E\u793A\u4E09\u7EA7\u5B50\u8282\u70B9",
  "Show four child levels": "\u663E\u793A\u56DB\u7EA7\u5B50\u8282\u70B9",
  "Show five child levels": "\u663E\u793A\u4E94\u7EA7\u5B50\u8282\u70B9",
  "Expand all child levels": "\u5C55\u5F00\u6240\u6709\u5B50\u7EA7",
  "Find in map": "\u5728\u5BFC\u56FE\u4E2D\u67E5\u627E",
  "Fit map": "\u9002\u5E94\u5BFC\u56FE",
  "Specify a key after the modifiers.": "\u8BF7\u5728\u4FEE\u9970\u952E\u540E\u6307\u5B9A\u6309\u952E\u3002",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "\u4FEE\u9970\u952E\uFF1ACtrl\u3001Alt\u3001Shift\u3001Meta \u6216 Mod\u3002",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "\u8BF7\u52FF\u91CD\u590D\u4FEE\u9970\u952E\u3002Mod \u5DF2\u8868\u793A Ctrl \u6216 Cmd\u3002",
  "This image format is not supported.": "\u4E0D\u652F\u6301\u6B64\u56FE\u50CF\u683C\u5F0F\u3002",
  "The clipboard image is empty.": "\u526A\u8D34\u677F\u56FE\u50CF\u4E3A\u7A7A\u3002",
  "Could not save the attachment.": "\u65E0\u6CD5\u4FDD\u5B58\u9644\u4EF6\u3002",
  "Saving image\u2026": "\u6B63\u5728\u4FDD\u5B58\u56FE\u50CF\u2026",
  "Node text": "\u8282\u70B9\u6587\u672C",
  "Save (Enter)": "\u4FDD\u5B58 (Enter)",
  "Cancel (Escape)": "\u53D6\u6D88 (Escape)",
  "Close the editor and discard your changes?": "\u5173\u95ED\u7F16\u8F91\u5668\u5E76\u653E\u5F03\u66F4\u6539\uFF1F",
  "Continue editing": "\u7EE7\u7EED\u7F16\u8F91",
  "Discard changes": "\u653E\u5F03\u66F4\u6539",
  "A node cannot be empty.": "\u8282\u70B9\u4E0D\u80FD\u4E3A\u7A7A\u3002",
  "Multiple cursors are available in source Markdown.": "\u591A\u5149\u6807\u529F\u80FD\u53EF\u5728 Markdown \u6E90\u6587\u4E2D\u4F7F\u7528\u3002",
  "This command requires the source Markdown editor.": "\u6B64\u547D\u4EE4\u9700\u8981 Markdown \u6E90\u6587\u7F16\u8F91\u5668\u3002",
  "Fixed width": "\u56FA\u5B9A\u5BBD\u5EA6",
  "Fit node content": "\u9002\u5E94\u8282\u70B9\u5185\u5BB9",
  "Fit visible column": "\u9002\u5E94\u53EF\u89C1\u5217",
  "TraceView Mindmap: open map": "TraceView Mindmap\uFF1A\u6253\u5F00\u5BFC\u56FE",
  "Open current note as a map": "\u5C06\u5F53\u524D\u7B14\u8BB0\u4F5C\u4E3A\u5BFC\u56FE\u6253\u5F00",
  "Open map at the Markdown cursor": "\u5728 Markdown \u5149\u6807\u4F4D\u7F6E\u6253\u5F00\u5BFC\u56FE",
  "Find a map": "\u67E5\u627E\u5BFC\u56FE",
  "Create a simple tree": "\u521B\u5EFA\u7B80\u5355\u6811\u72B6\u56FE",
  "Create a vector (separate template)": "\u521B\u5EFA\u65B9\u5411\u56FE\uFF08\u72EC\u7ACB\u6A21\u677F\uFF09",
  "Steps, deadlines and QA": "\u6B65\u9AA4\u3001\u622A\u6B62\u65E5\u671F\u548C QA",
  "Mark as atomic step": "\u6807\u8BB0\u4E3A\u6700\u5C0F\u6B65\u9AA4",
  "Add step deadline": "\u6DFB\u52A0\u6B65\u9AA4\u622A\u6B62\u65E5\u671F",
  "Mark as QA": "\u6807\u8BB0\u4E3A QA",
  "Toggle step completion": "\u5207\u6362\u6B65\u9AA4\u5B8C\u6210\u72B6\u6001",
  "Paste as sibling branch": "\u7C98\u8D34\u4E3A\u540C\u7EA7\u5206\u652F",
  "Undo map change": "\u64A4\u9500\u5BFC\u56FE\u66F4\u6539",
  "Redo map change": "\u91CD\u505A\u5BFC\u56FE\u66F4\u6539",
  "Insert QA in Markdown editor": "\u5728 Markdown \u7F16\u8F91\u5668\u4E2D\u63D2\u5165 QA",
  "Insert unnumbered step in Markdown editor": "\u5728 Markdown \u7F16\u8F91\u5668\u4E2D\u63D2\u5165\u65E0\u7F16\u53F7\u6B65\u9AA4",
  "Open map at this node": "\u5728\u6B64\u8282\u70B9\u6253\u5F00\u5BFC\u56FE",
  "Open in TraceView Mindmap": "\u5728 TraceView Mindmap \u4E2D\u6253\u5F00",
  "The note changed. Open it again at the current line.": "\u7B14\u8BB0\u5DF2\u66F4\u6539\u3002\u8BF7\u5728\u5F53\u524D\u884C\u91CD\u65B0\u6253\u5F00\u3002",
  "Save or cancel the node draft.": "\u8BF7\u4FDD\u5B58\u6216\u53D6\u6D88\u8282\u70B9\u8349\u7A3F\u3002",
  "New vector name": "\u65B0\u65B9\u5411\u56FE\u540D\u79F0",
  "New tree name": "\u65B0\u6811\u72B6\u56FE\u540D\u79F0",
  "Use a name without path characters.": "\u8BF7\u4F7F\u7528\u4E0D\u542B\u8DEF\u5F84\u5B57\u7B26\u7684\u540D\u79F0\u3002",
  "A file with this name already exists.": "\u5DF2\u5B58\u5728\u540C\u540D\u6587\u4EF6\u3002",
  "The Markdown editor has newer text. Wait for it to save and try again.": "Markdown \u7F16\u8F91\u5668\u4E2D\u6709\u66F4\u65B0\u7684\u6587\u672C\u3002\u8BF7\u7B49\u5F85\u4FDD\u5B58\u540E\u91CD\u8BD5\u3002",
  "Branch copied": "\u5206\u652F\u5DF2\u590D\u5236",
  "Branch saved to the plugin clipboard": "\u5206\u652F\u5DF2\u4FDD\u5B58\u5230\u63D2\u4EF6\u526A\u8D34\u677F",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "\u526A\u8D34\u677F\u4E0D\u53EF\u7528\uFF0C\u5206\u652F\u672A\u526A\u5207\u3002\u8BF7\u5141\u8BB8\u8BBF\u95EE\u540E\u91CD\u8BD5\u3002",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "\u526A\u8D34\u677F\u4E0D\u53EF\u7528\u3002\u8BF7\u4F7F\u7528 \u22EF \u83DC\u5355\u4E2D\u7684\u201C\u7C98\u8D34\u5206\u652F\u6587\u672C\u201D\u3002",
  "Save or cancel the node draft before navigating.": "\u5BFC\u822A\u524D\u8BF7\u4FDD\u5B58\u6216\u53D6\u6D88\u8349\u7A3F\u3002",
  "Waiting for Obsidian to be ready\u2026": "\u6B63\u5728\u7B49\u5F85 Obsidian \u5C31\u7EEA\u2026",
  "Wait for Obsidian to load, then open the map.": "\u8BF7\u7B49\u5F85 Obsidian \u52A0\u8F7D\u5B8C\u6210\u540E\u518D\u6253\u5F00\u5BFC\u56FE\u3002",
  "This address is duplicated. Fix the block ID in Markdown.": "\u5730\u5740\u91CD\u590D\u3002\u8BF7\u5728 Markdown \u4E2D\u4FEE\u6B63\u5757 ID\u3002",
  "The linked node was not found.": "\u627E\u4E0D\u5230\u94FE\u63A5\u7684\u8282\u70B9\u3002",
  "Collapse levels": "\u6298\u53E0\u5C42\u7EA7",
  "Delete selected branch": "\u5220\u9664\u6240\u9009\u5206\u652F",
  "Sibling node": "\u540C\u7EA7\u8282\u70B9",
  Edit: "\u7F16\u8F91",
  "Multiple selection: taps or rectangle": "\u591A\u9009\uFF1A\u70B9\u6309\u6216\u6846\u9009",
  Search: "\u641C\u7D22",
  "Layout and node width": "\u5E03\u5C40\u4E0E\u8282\u70B9\u5BBD\u5EA6",
  "Map actions": "\u5BFC\u56FE\u64CD\u4F5C",
  "Open now": "\u7ACB\u5373\u6253\u5F00",
  Map: "\u5BFC\u56FE",
  Outline: "\u5927\u7EB2",
  Table: "\u8868\u683C",
  "Expand entire map": "\u5C55\u5F00\u6574\u4E2A\u5BFC\u56FE",
  "All child levels": "\u6240\u6709\u5B50\u7EA7",
  "The map will open after the workspace loads\u2026": "\u5DE5\u4F5C\u533A\u52A0\u8F7D\u540E\u5C06\u6253\u5F00\u5BFC\u56FE\u2026",
  "File missing or deleted. Open another map.": "\u6587\u4EF6\u4E0D\u5B58\u5728\u6216\u5DF2\u5220\u9664\u3002\u8BF7\u6253\u5F00\u5176\u4ED6\u5BFC\u56FE\u3002",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "\u5BFC\u56FE\u5DF2\u66F4\u6539\u6216\u6B63\u5728\u4FDD\u5B58\u3002\u8349\u7A3F\u4ECD\u5728\u8F93\u5165\u6846\u4E2D\uFF0C\u8BF7\u5728\u53D6\u6D88\u524D\u590D\u5236\uFF0C\u7136\u540E\u5728\u5F53\u524D\u5BFC\u56FE\u4E0A\u91CD\u8BD5\u3002",
  "The file no longer exists.": "\u6587\u4EF6\u5DF2\u4E0D\u5B58\u5728\u3002",
  "Select a map node first": "\u8BF7\u5148\u9009\u62E9\u5BFC\u56FE\u8282\u70B9",
  "Another map is open. The selection was copied, but not cut.": "\u5DF2\u6253\u5F00\u53E6\u4E00\u5BFC\u56FE\u3002\u6240\u9009\u5185\u5BB9\u5DF2\u590D\u5236\uFF0C\u4F46\u672A\u526A\u5207\u3002",
  "This command requires one selected node.": "\u6B64\u547D\u4EE4\u9700\u8981\u4EC5\u9009\u4E2D\u4E00\u4E2A\u8282\u70B9\u3002",
  "The map was closed or renamed. Copy the address again.": "\u5BFC\u56FE\u5DF2\u5173\u95ED\u6216\u91CD\u547D\u540D\u3002\u8BF7\u91CD\u65B0\u590D\u5236\u5730\u5740\u3002",
  "Node link copied.": "\u8282\u70B9\u94FE\u63A5\u5DF2\u590D\u5236\u3002",
  "Another map is open. The branch was copied, but not cut.": "\u5DF2\u6253\u5F00\u53E6\u4E00\u5BFC\u56FE\u3002\u5206\u652F\u5DF2\u590D\u5236\uFF0C\u4F46\u672A\u526A\u5207\u3002",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "\u5206\u652F\u5DF2\u526A\u5207\u3002Ctrl+V \u7C98\u8D34\uFF0C\u64A4\u9500\u53EF\u6062\u590D\u3002",
  "The note was renamed. Copy the draft and reopen the editor.": "\u7B14\u8BB0\u5DF2\u91CD\u547D\u540D\u3002\u8BF7\u590D\u5236\u8349\u7A3F\u5E76\u91CD\u65B0\u6253\u5F00\u7F16\u8F91\u5668\u3002",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "\u5BFC\u56FE\u88AB\u5916\u90E8\u4FEE\u6539\u3002\u8349\u7A3F\u5DF2\u4FDD\u7559\uFF0C\u8BF7\u5148\u590D\u5236\u518D\u91CD\u65B0\u7F16\u8F91\u3002",
  "The node no longer exists. Your draft is preserved.": "\u8282\u70B9\u5DF2\u4E0D\u5B58\u5728\u3002\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",
  "Steps \xB7 Deadlines \xB7 QA": "\u6B65\u9AA4 \xB7 \u622A\u6B62\u65E5\u671F \xB7 QA",
  "Step deadline\u2026": "\u6B65\u9AA4\u622A\u6B62\u65E5\u671F\u2026",
  "Completed / incomplete": "\u5DF2\u5B8C\u6210 / \u672A\u5B8C\u6210",
  "Move up": "\u4E0A\u79FB",
  "Move down": "\u4E0B\u79FB",
  "Nest in previous branch": "\u5D4C\u5165\u524D\u4E00\u5206\u652F",
  "Open text in editor": "\u5728\u7F16\u8F91\u5668\u4E2D\u6253\u5F00\u6587\u672C",
  "Delete branch\u2026": "\u5220\u9664\u5206\u652F\u2026",
  "Export HTML\u2026": "\u5BFC\u51FA HTML\u2026",
  "Export SVG\u2026": "\u5BFC\u51FA SVG\u2026",
  "Paste branch text\u2026": "\u7C98\u8D34\u5206\u652F\u6587\u672C\u2026",
  "Paste child Markdown branch": "\u7C98\u8D34 Markdown \u5B50\u5206\u652F",
  "Renumber steps": "\u91CD\u65B0\u7F16\u53F7\u6B65\u9AA4",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "\u76EE\u6807\u5BFC\u56FE\u5DF2\u66F4\u6539\u3002\u8BF7\u91CD\u65B0\u6253\u5F00\u94FE\u63A5\u5EFA\u8BAE\uFF0C\u8349\u7A3F\u5DF2\u4FDD\u7559\u3002",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "\u6B64\u5757\u4E0D\u662F\u72EC\u7ACB\u7684\u5BFC\u56FE\u8282\u70B9\u3002\u8BF7\u4F7F\u7528\u201C\u590D\u5236\u8282\u70B9\u94FE\u63A5\u201D\u3002",
  "Native editor unavailable. Using text input. ": "\u539F\u751F\u7F16\u8F91\u5668\u4E0D\u53EF\u7528\uFF0C\u6539\u7528\u6587\u672C\u8F93\u5165\u3002 ",
  "The note does not exist.": "\u7B14\u8BB0\u4E0D\u5B58\u5728\u3002",
  "File already exists. Choose another name.": "\u6587\u4EF6\u5DF2\u5B58\u5728\u3002\u8BF7\u9009\u62E9\u5176\u4ED6\u540D\u79F0\u3002",
  Steps: "\u6B65\u9AA4",
  Deadlines: "\u622A\u6B62\u65E5\u671F",
  "Open QA": "\u5F85\u5904\u7406 QA",
  Refresh: "\u5237\u65B0",
  "Collapse all": "\u5168\u90E8\u6298\u53E0",
  "Expand all": "\u5168\u90E8\u5C55\u5F00",
  "Search steps": "\u641C\u7D22\u6B65\u9AA4",
  "Find\u2026": "\u67E5\u627E\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "\u6392\u5E8F\u4EC5\u66F4\u6539\u5355\u4E2A\u6587\u4EF6\u4E2D\u7684\u6B65\u9AA4\u7F16\u53F7\uFF0C\u5206\u652F\u4F4D\u7F6E\u4E0D\u53D8\u3002\u6709\u65E5\u671F\u548C\u65E0\u7F16\u53F7\u6B65\u9AA4\u5206\u522B\u6392\u5E8F\u3002",
  Expand: "\u5C55\u5F00",
  Collapse: "\u6298\u53E0",
  "No open items match this filter.": "\u6CA1\u6709\u7B26\u5408\u6B64\u7B5B\u9009\u6761\u4EF6\u7684\u5F85\u5904\u7406\u9879\u3002",
  "Mark completed": "\u6807\u8BB0\u4E3A\u5B8C\u6210",
  "Move earlier in execution order": "\u63D0\u524D\u6267\u884C\u987A\u5E8F",
  "Move later in execution order": "\u63A8\u540E\u6267\u884C\u987A\u5E8F",
  "Deadline ?": "\u622A\u6B62\u65E5\u671F ?",
  "Node editor": "\u8282\u70B9\u7F16\u8F91\u5668",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "\u4E0B\u6B21\u7F16\u8F91\u65F6\u751F\u6548\u3002\u539F\u751F\u6A21\u5F0F\u4F7F\u7528 Obsidian \u5B9E\u65F6\u9884\u89C8\u548C\u5EFA\u8BAE\uFF0C\u5FC5\u8981\u65F6\u56DE\u9000\u5230\u6587\u672C\u8F93\u5165\u3002",
  "Native Obsidian": "Obsidian \u539F\u751F",
  "Text input": "\u6587\u672C\u8F93\u5165",
  "Automatically restore large maps": "\u81EA\u52A8\u6062\u590D\u5927\u578B\u5BFC\u56FE",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "\u542F\u52A8\u65F6\uFF0C\u5F53\u524D\u5BFC\u56FE\u4F1A\u7B49\u5F85 Obsidian \u54CD\u5E94\u7A33\u5B9A\u3002\u201C\u7ACB\u5373\u6253\u5F00\u201D\u53EF\u8DF3\u8FC7\u7B49\u5F85\u3002",
  "Hide frozen steps": "\u9690\u85CF\u51BB\u7ED3\u6B65\u9AA4",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "\u5728\u6B65\u9AA4\u548C\u622A\u6B62\u65E5\u671F\u5217\u8868\u4E2D\u8DF3\u8FC7 \u{1F9CA} \u5206\u652F\u3002\u5BFC\u56FE\u4ECD\u663E\u793A\u5168\u90E8\u6587\u672C\u3002",
  "Left arrow collapses the branch first": "\u5DE6\u7BAD\u5934\u5148\u6298\u53E0\u5206\u652F",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "\u5173\u95ED\uFF1A\u76F4\u63A5\u8F6C\u5230\u7236\u8282\u70B9\u3002\u5F00\u542F\uFF1A\u5148\u6298\u53E0\u5C55\u5F00\u7684\u5206\u652F\uFF0C\u518D\u6309\u4E00\u6B21\u9009\u62E9\u7236\u8282\u70B9\u3002",
  "Show [ ] in list text": "\u5728\u5217\u8868\u6587\u672C\u4E2D\u663E\u793A [ ]",
  "Show #step in list text": "\u5728\u5217\u8868\u6587\u672C\u4E2D\u663E\u793A #step",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "\u4EC5\u5F71\u54CD\u201C\u6B65\u9AA4 \xB7 \u622A\u6B62\u65E5\u671F \xB7 QA\u201D\u7684\u663E\u793A\uFF0C\u7B14\u8BB0\u6587\u672C\u548C\u5B8C\u6210\u63A7\u4EF6\u4FDD\u7559\u3002",
  "Map node width": "\u5BFC\u56FE\u8282\u70B9\u5BBD\u5EA6",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "\u7ACB\u5373\u5E94\u7528\u5230\u6240\u6709\u5DF2\u6253\u5F00\u7684\u5BFC\u56FE\u3002\u5927\u7EB2\u548C\u8868\u683C\u4FDD\u7559\u5404\u81EA\u5BBD\u5EA6\u3002",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "\u6298\u53E0\u72B6\u6001\u548C\u89C6\u89D2\u4FDD\u5B58\u5728\u672C\u8BBE\u5907\u3002\u6D4F\u89C8\u4E0D\u4F1A\u91CD\u5199 Markdown \u6216\u6DFB\u52A0\u9690\u85CF ID\u3002Windows \u548C Android \u53EF\u4FDD\u7559\u4E0D\u540C\u89C6\u56FE\u72B6\u6001\u3002",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "\u539F\u751F\u8F93\u5165\u4F7F\u7528 Obsidian \u7F16\u8F91\u5668\uFF0C\u6587\u672C\u8F93\u5165\u4F7F\u7528 Editor API\u3002\u9700\u8981\u5B8C\u6574 Markdown \u89C6\u56FE\u7684\u547D\u4EE4\u8BF7\u901A\u8FC7 \u22EF \u2192 \u5728\u7F16\u8F91\u5668\u4E2D\u6253\u5F00\u6587\u672C\u4F7F\u7528\u3002",
  "Map hotkeys": "\u5BFC\u56FE\u5FEB\u6377\u952E",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "\u66F4\u6539\u7ACB\u5373\u5E94\u7528\u5230\u6240\u6709\u5BFC\u56FE\u3002\u6309 \u2328 \u540E\u8F93\u5165\u5FEB\u6377\u952E\uFF0C\u6216\u624B\u52A8\u8F93\u5165 Ctrl+C\u3001Alt+Shift+1\u3002\u591A\u4E2A\u7EC4\u5408\u7528\u9017\u53F7\u5206\u9694\u3002\xD7 \u7981\u7528\u547D\u4EE4\uFF0C\u21BA \u6062\u590D\u9ED8\u8BA4\u3002\u7F16\u8F91\u6587\u672C\u65F6\u4F7F\u7528\u5E38\u89C4\u7F16\u8F91\u5668\u5FEB\u6377\u952E\u3002",
  Unassigned: "\u672A\u5206\u914D",
  "Record shortcut": "\u5F55\u5165\u5FEB\u6377\u952E",
  Disable: "\u7981\u7528",
  "Default shortcuts": "\u9ED8\u8BA4\u5FEB\u6377\u952E",
  "Search map\u2026": "\u641C\u7D22\u5BFC\u56FE\u2026",
  "Search map": "\u641C\u7D22\u5BFC\u56FE",
  " A\u2013Z": " \u6309\u5B57\u6BCD\u6392\u5E8F",
  "Close search": "\u5173\u95ED\u641C\u7D22",
  "Search results": "\u641C\u7D22\u7ED3\u679C",
  "No results": "\u65E0\u7ED3\u679C",
  "This Obsidian version has no compatible native editor.": "\u6B64\u7248\u672C Obsidian \u6CA1\u6709\u517C\u5BB9\u7684\u539F\u751F\u7F16\u8F91\u5668\u3002",
  "Could not prepare the native editor.": "\u65E0\u6CD5\u51C6\u5907\u539F\u751F\u7F16\u8F91\u5668\u3002",
  "The native editor cannot protect a single-line draft.": "\u539F\u751F\u7F16\u8F91\u5668\u65E0\u6CD5\u4FDD\u62A4\u5355\u884C\u8349\u7A3F\u3002",
  "Native Obsidian link": "Obsidian \u539F\u751F\u94FE\u63A5",
  "Map filter": "\u5BFC\u56FE\u7B5B\u9009",
  "All maps": "\u6240\u6709\u5BFC\u56FE",
  Maps: "\u5BFC\u56FE",
  "No maps match this search.": "\u6CA1\u6709\u7B26\u5408\u641C\u7D22\u6761\u4EF6\u7684\u5BFC\u56FE\u3002",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "\u7B14\u8BB0\u5728\u5176\u4ED6\u7A97\u53E3\u6216\u8BBE\u5907\u4E2D\u88AB\u66F4\u6539\u3002\u5BFC\u56FE\u5DF2\u5237\u65B0\uFF0C\u8BF7\u5728\u6700\u65B0\u6587\u672C\u4E0A\u91CD\u8BD5\u3002",
  "History stopped because the text changed externally. Undo will preserve those changes.": "\u6587\u672C\u88AB\u5916\u90E8\u4FEE\u6539\uFF0C\u5386\u53F2\u8BB0\u5F55\u5DF2\u6682\u505C\u3002\u64A4\u9500\u5C06\u4FDD\u7559\u8FD9\u4E9B\u66F4\u6539\u3002",
  "Loading map\u2026": "\u6B63\u5728\u52A0\u8F7D\u5BFC\u56FE\u2026",
  "Node address: ^": "\u8282\u70B9\u5730\u5740\uFF1A^",
  "Branch ready to move": "\u5206\u652F\u53EF\u79FB\u52A8",
  "Before: ": "\u4E4B\u524D\uFF1A",
  "After: ": "\u4E4B\u540E\uFF1A",
  "As children: ": "\u4F5C\u4E3A\u5B50\u8282\u70B9\uFF1A",
  "Expand node": "\u5C55\u5F00\u8282\u70B9",
  "Collapse node": "\u6298\u53E0\u8282\u70B9",
  "Collapse branch": "\u6298\u53E0\u5206\u652F",
  "Expand branch": "\u5C55\u5F00\u5206\u652F",
  "Paste after node": "\u5728\u8282\u70B9\u540E\u7C98\u8D34",
  Language: "\u8BED\u8A00",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "\u81EA\u52A8\u6A21\u5F0F\u8DDF\u968F Obsidian \u8BED\u8A00\u3002\u66F4\u6539\u8BED\u8A00\u540E\u8BF7\u91CD\u542F Obsidian\u3002",
  "Automatic (Obsidian)": "\u81EA\u52A8 (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "\u8BED\u8A00\u5DF2\u4FDD\u5B58\u3002\u8BF7\u91CD\u542F Obsidian\u3002",
  "Selected nodes: {count}": "\u5DF2\u9009\u8282\u70B9\uFF1A{count}",
  "Child levels: {count}": "\u5B50\u7EA7\u5C42\u6570\uFF1A{count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "\u8282\u70B9\uFF1A{nodes} \xB7 \u5F85\u5B8C\u6210\u6B65\u9AA4\uFF1A{steps}",
  "Export {format} \u2014 file name": "\u5BFC\u51FA {format} \u2014 \u6587\u4EF6\u540D",
  "Saved {path}": "\u5DF2\u4FDD\u5B58 {path}",
  "Expand map: {name}": "\u5C55\u5F00\u5BFC\u56FE\uFF1A{name}",
  "Collapse map: {name}": "\u6298\u53E0\u5BFC\u56FE\uFF1A{name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "\u5FEB\u6377\u952E\u51B2\u7A81\uFF1A{shortcuts}\u3002\u5217\u8868\u4E2D\u7684\u7B2C\u4E00\u4E2A\u547D\u4EE4\u4F18\u5148\u3002",
  "Next action": "\u4E0B\u4E00\u6B65\u884C\u52A8",
  "First action": "\u7B2C\u4E00\u4E2A\u884C\u52A8",
  "Active now": "\u5F53\u524D\u8FDB\u884C\u4E2D",
  "Frozen / someday": "\u51BB\u7ED3 / \u5C06\u6765",
  "First step": "\u7B2C\u4E00\u6B65",
  "{path} \xB7 References: {count}": "{path} \xB7 \u5F15\u7528\uFF1A{count}",
  "Attachment saved, but the editor is already closed: {link}": "\u9644\u4EF6\u5DF2\u4FDD\u5B58\uFF0C\u4F46\u7F16\u8F91\u5668\u5DF2\u5173\u95ED\uFF1A{link}",
  "Copy selection": "\u590D\u5236\u6240\u9009\u5185\u5BB9",
  "Cut selection": "\u526A\u5207\u6240\u9009\u5185\u5BB9",
  "Delete selection": "\u5220\u9664\u6240\u9009\u5185\u5BB9",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "\u5B8C\u6574\u5BFC\u56FE \xB7 {count} \u4E2A\u8282\u70B9 \xB7 \u53EA\u8BFB\u5BFC\u51FA\u3002\u9009\u62E9\u5206\u652F\u6807\u8BB0\u53EF\u6298\u53E0\u3002\u6807\u7B7E\u4FDD\u7559 Markdown \u6587\u672C\u3002\u4ED3\u5E93\u94FE\u63A5\u548C\u9644\u4EF6\u9700\u8981 Obsidian\u3002",
  "This map contains no outline nodes.": "\u6B64\u5BFC\u56FE\u6CA1\u6709\u5927\u7EB2\u8282\u70B9\u3002",
  "This node no longer exists. Reopen the map and try again.": "\u8282\u70B9\u5DF2\u4E0D\u5B58\u5728\u3002\u8BF7\u91CD\u65B0\u6253\u5F00\u5BFC\u56FE\u540E\u91CD\u8BD5\u3002",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "\u8282\u70B9\u5FC5\u987B\u5728\u4E00\u884C\u5185\u3002\u66F4\u591A\u5185\u5BB9\u8BF7\u4F7F\u7528\u5B50\u8282\u70B9\u6216\u94FE\u63A5\u7B14\u8BB0\u3002",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "\u6B64\u6587\u672C\u4F1A\u53D8\u6210\u4EE3\u7801\u5757\u6216\u5206\u9694\u7EBF\u3002\u8BF7\u8F6C\u4E49\u6807\u8BB0\u6216\u5728\u6E90\u6587\u4E2D\u7F16\u8F91\u3002",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown \u6700\u591A\u652F\u6301\u516D\u7EA7\u6807\u9898\u3002\u8BF7\u5728\u6E90\u6587\u4E2D\u6DFB\u52A0\u5B50\u5217\u8868\u9879\u3002",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "\u6B64\u6587\u672C\u4E0D\u80FD\u7528\u4F5C Markdown \u7236\u8282\u70B9\u3002\u8BF7\u8F6C\u4E49\u6807\u8BB0\u6216\u5728\u6E90\u6587\u4E2D\u7F16\u8F91\u3002",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "\u5206\u652F\u5305\u542B\u8282\u70B9\u884C\u4EE5\u5916\u7684\u6BB5\u843D\u3001\u4EE3\u7801\u6216\u5176\u4ED6\u5185\u5BB9\u3002\u8BF7\u5728\u6E90\u6587\u4E2D\u4FEE\u6539\u7ED3\u6784\u4EE5\u4FDD\u7559\u5185\u5BB9\u3002",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "\u5206\u652F\u7F29\u8FDB\u4E0D\u660E\u786E\u3002\u8BF7\u5728\u79FB\u52A8\u524D\u4E8E\u6E90\u6587\u4E2D\u4FEE\u6B63\u3002",
  "That move would exceed Markdown\u2019s six heading levels.": "\u6B64\u79FB\u52A8\u5C06\u8D85\u51FA Markdown \u7684\u516D\u7EA7\u6807\u9898\u9650\u5236\u3002",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "\u5728\u6807\u9898\u548C\u5217\u8868\u9879\u4E4B\u95F4\u79FB\u52A8\u4F1A\u6539\u53D8\u542B\u4E49\u3002\u8BF7\u5728\u6E90\u6587\u4E2D\u8C03\u6574\u7ED3\u6784\u3002",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "\u6DF7\u5408\u6807\u9898\u548C\u5217\u8868\u9879\u7684\u7F29\u8FDB\u4E0D\u660E\u786E\u3002\u8BF7\u4F7F\u7528\u6E90\u6587\u7F16\u8F91\u3002",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "\u5C06\u5217\u8868\u9879\u79FB\u51FA\u6807\u9898\u9700\u8981\u66F4\u6539\u683C\u5F0F\u3002\u8BF7\u4F7F\u7528\u6E90\u6587\u7F16\u8F91\u3002",
  "A branch cannot be moved into itself or one of its descendants.": "\u65E0\u6CD5\u5C06\u5206\u652F\u79FB\u5165\u81EA\u8EAB\u6216\u5176\u540E\u4EE3\u8282\u70B9\u3002",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "\u6807\u9898\u4E0D\u80FD\u4F5C\u4E3A\u5217\u8868\u9879\u7684\u5B50\u9879\u3002\u8BF7\u5148\u5728\u6E90\u6587\u4E2D\u66F4\u6539\u683C\u5F0F\u3002",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "\u5B50\u6807\u9898\u540E\u7684\u5217\u8868\u9879\u5F52\u5C5E\u8BE5\u6807\u9898\u3002\u8BF7\u9009\u62E9\u5217\u8868\u9879\u4F5C\u4E3A\u7236\u8282\u70B9\u6216\u4FEE\u6539\u7ED3\u6784\u3002",
  "Paste an outline branch, or paste one line as a new node.": "\u8BF7\u7C98\u8D34\u5927\u7EB2\u5206\u652F\uFF0C\u6216\u5C06\u4E00\u884C\u6587\u672C\u7C98\u8D34\u4E3A\u65B0\u8282\u70B9\u3002",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "\u5217\u8868\u5206\u652F\u5E94\u7C98\u8D34\u5728\u5217\u8868\u65C1\uFF0C\u6807\u9898\u5206\u652F\u5728\u6807\u9898\u65C1\u3002\u8BF7\u5728\u6E90\u6587\u4E2D\u8F6C\u6362\u683C\u5F0F\u3002",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "\u526A\u8D34\u677F\u5305\u542B\u5927\u7EB2\u4EE5\u5916\u7684\u5185\u5BB9\u3002\u8BF7\u7C98\u8D34\u5230\u6E90\u6587\u4E2D\u4EE5\u4FDD\u7559\u3002",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "\u8BF7\u4F7F\u7528 YYYY-MM-DD \u683C\u5F0F\u7684\u65E5\u671F\uFF0C\u672A\u77E5\u622A\u6B62\u65E5\u671F\u7528 ?\u3002",
  "That calendar date does not exist.": "\u6B64\u65E5\u671F\u4E0D\u5B58\u5728\u3002",
  "The execution order contains the same step twice.": "\u6267\u884C\u987A\u5E8F\u4E2D\u540C\u4E00\u6B65\u9AA4\u51FA\u73B0\u4E24\u6B21\u3002",
  "Only numbered, undated steps can be placed in an execution order.": "\u53EA\u6709\u7F16\u53F7\u4E14\u65E0\u65E5\u671F\u7684\u6B65\u9AA4\u53EF\u52A0\u5165\u6267\u884C\u987A\u5E8F\u3002",
  Untitled: "\u672A\u547D\u540D",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "\u6B64\u5BFC\u56FE\u6CA1\u6709\u8282\u70B9\u3002\u8BF7\u6253\u5F00\u6E90\u6587\u5E76\u6DFB\u52A0\u6807\u9898\u6216\u5217\u8868\u9879\u3002",
  "Mark incomplete": "\u6807\u8BB0\u4E3A\u672A\u5B8C\u6210",
  "Invalid saved map patterns. Default patterns are active.": "\u4FDD\u5B58\u7684\u89C4\u5219\u65E0\u6548\u3002\u5DF2\u542F\u7528\u9ED8\u8BA4\u89C4\u5219\u3002",
  "Automatically open matching notes as maps": "\u81EA\u52A8\u5C06\u5339\u914D\u7684\u7B14\u8BB0\u4F5C\u4E3A\u5BFC\u56FE\u6253\u5F00",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "\u9002\u7528\u4E8E\u7B26\u5408\u4EE5\u4E0B\u89C4\u5219\u7684\u7B14\u8BB0\u3002\u660E\u786E\u6253\u5F00 Markdown \u6E90\u6587\u540E\uFF0C\u8BE5\u7B14\u8BB0\u4FDD\u6301 Markdown \u6A21\u5F0F\u3002",
  "Invalid pattern on line {line}: {error}": "\u7B2C {line} \u884C\u89C4\u5219\u65E0\u6548\uFF1A{error}",
  "Patterns saved.": "\u89C4\u5219\u5DF2\u4FDD\u5B58\u3002",
  "Pattern syntax": "\u89C4\u5219\u8BED\u6CD5",
  "Glob (wildcards)": "Glob\uFF08\u901A\u914D\u7B26\uFF09",
  "Regular expressions": "\u6B63\u5219\u8868\u8FBE\u5F0F",
  "Map file patterns": "\u5BFC\u56FE\u6587\u4EF6\u89C4\u5219",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "\u6BCF\u884C\u4E00\u6761\u89C4\u5219\uFF0C\u5339\u914D\u4EFB\u4E00\u89C4\u5219\u5373\u53EF\u3002Glob \u4E0D\u542B / \u65F6\u5339\u914D\u4EFB\u610F\u6587\u4EF6\u5939\u4E2D\u7684\u6587\u4EF6\u540D\uFF0C\u542B / \u65F6\u5339\u914D\u4ED3\u5E93\u76F8\u5BF9\u8DEF\u5F84\u3002\u652F\u6301 *\u3001** \u548C ?\u3002\u6B63\u5219\u5339\u914D\u4ED3\u5E93\u76F8\u5BF9\u8DEF\u5F84\uFF0C\u65E0\u9700 / \u5206\u9694\u7B26\u3002\u4E0D\u533A\u5206\u5927\u5C0F\u5199\uFF0C\u4EC5\u9002\u7528\u4E8E Markdown \u6587\u4EF6\u3002",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "\u5C5E\u6027 mindmap: true \u4E5F\u53EF\u6807\u8BC6\u5BFC\u56FE\u3002\u8F93\u5165\u65E0\u6548\u65F6\u7EE7\u7EED\u4F7F\u7528\u4E0A\u6B21\u4FDD\u5B58\u7684\u89C4\u5219\u3002\u81EA\u52A8\u6253\u5F00\u3001\u5BFC\u56FE\u641C\u7D22\u548C\u6B65\u9AA4\u5217\u8868\u4F7F\u7528\u540C\u4E00\u7EC4\u89C4\u5219\u3002",
  "This JSON map format is not supported.": "\u4E0D\u652F\u6301\u6B64 JSON \u5BFC\u56FE\u683C\u5F0F\u3002",
  "Restore default patterns": "\u6062\u590D\u9ED8\u8BA4\u89C4\u5219",
  "Restore default settings": "\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E",
  "Restore defaults": "\u6062\u590D",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "\u91CD\u7F6E\u63D2\u4EF6\u8BBE\u7F6E\u3001\u5FEB\u6377\u952E\u548C\u5BFC\u56FE\u89C4\u5219\uFF1F\u672C\u8BBE\u5907\u7684\u89C6\u56FE\u72B6\u6001\u548C\u5DF2\u4FDD\u5B58\u7684\u7B14\u8BB0\u5C06\u4FDD\u7559\u3002\u8BF7\u91CD\u542F Obsidian \u4EE5\u5E94\u7528\u8BED\u8A00\u3002",
  "Default settings restored. Restart Obsidian to apply the language.": "\u5DF2\u6062\u590D\u9ED8\u8BA4\u8BBE\u7F6E\u3002\u8BF7\u91CD\u542F Obsidian \u4EE5\u5E94\u7528\u8BED\u8A00\u3002"
};

// src/locales/ja.json
var ja_default = {
  "A node with its own Markdown line is required.": "\u72EC\u7ACB\u3057\u305F Markdown \u884C\u3092\u6301\u3064\u30CE\u30FC\u30C9\u304C\u5FC5\u8981\u3067\u3059\u3002",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "\u30D6\u30ED\u30C3\u30AF ID \u304C\u91CD\u8907\u3057\u3066\u3044\u307E\u3059\u3002Markdown \u3067\u4FEE\u6B63\u3057\u3066\u304B\u3089\u30A2\u30C9\u30EC\u30B9\u3092\u30B3\u30D4\u30FC\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "A unique block ID is required.": "\u4E00\u610F\u306E\u30D6\u30ED\u30C3\u30AF ID \u304C\u5FC5\u8981\u3067\u3059\u3002",
  "The selection changed. Run the command again.": "\u9078\u629E\u304C\u5909\u308F\u308A\u307E\u3057\u305F\u3002\u30B3\u30DE\u30F3\u30C9\u3092\u518D\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "\u30D6\u30E9\u30F3\u30C1\u3092\u81EA\u8EAB\u3001\u5B50\u5B6B\u3001\u4E92\u63DB\u6027\u306E\u306A\u3044 Markdown \u30CE\u30FC\u30C9\u3078\u79FB\u52D5\u3067\u304D\u307E\u305B\u3093\u3002",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "\u5C0F\u898B\u51FA\u3057\u306E\u5F8C\u306E\u7B87\u6761\u66F8\u304D\u306F\u305D\u306E\u898B\u51FA\u3057\u306B\u5C5E\u3057\u307E\u3059\u3002\u7B87\u6761\u66F8\u304D\u306E\u89AA\u3092\u9078\u3076\u304B Markdown \u69CB\u9020\u3092\u5909\u66F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Sibling above": "\u4E0A\u306B\u5144\u5F1F\u30CE\u30FC\u30C9",
  "Sibling below": "\u4E0B\u306B\u5144\u5F1F\u30CE\u30FC\u30C9",
  "Child node": "\u5B50\u30CE\u30FC\u30C9",
  "Parent node": "\u89AA\u30CE\u30FC\u30C9",
  "Find a map\u2026": "\u30DE\u30C3\u30D7\u3092\u691C\u7D22\u2026",
  "Note name, alias or new link\u2026": "\u30CE\u30FC\u30C8\u540D\u3001\u30A8\u30A4\u30EA\u30A2\u30B9\u3001\u65B0\u3057\u3044\u30EA\u30F3\u30AF\u2026",
  select: "\u9078\u629E",
  "insert link": "\u30EA\u30F3\u30AF\u3092\u633F\u5165",
  "return to node": "\u30CE\u30FC\u30C9\u306B\u623B\u308B",
  "file not created yet": "\u30D5\u30A1\u30A4\u30EB\u672A\u4F5C\u6210",
  "new link": "\u65B0\u3057\u3044\u30EA\u30F3\u30AF",
  "Insert a link without creating a file": "\u30D5\u30A1\u30A4\u30EB\u3092\u4F5C\u6210\u305B\u305A\u30EA\u30F3\u30AF\u3092\u633F\u5165",
  "The file changed or was deleted. Search again.": "\u30D5\u30A1\u30A4\u30EB\u304C\u5909\u66F4\u307E\u305F\u306F\u524A\u9664\u3055\u308C\u307E\u3057\u305F\u3002\u518D\u691C\u7D22\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Link (Ctrl+K)": "\u30EA\u30F3\u30AF (Ctrl+K)",
  "Highlight text": "\u30C6\u30AD\u30B9\u30C8\u3092\u30CF\u30A4\u30E9\u30A4\u30C8",
  "Mark as question": "\u8CEA\u554F\u3068\u3057\u3066\u30DE\u30FC\u30AF",
  "Step deadline": "\u30B9\u30C6\u30C3\u30D7\u306E\u671F\u9650",
  Date: "\u65E5\u4ED8",
  " Unknown deadline (?)": " \u671F\u9650\u672A\u5B9A (?)",
  "Previous month": "\u524D\u306E\u6708",
  "Next month": "\u6B21\u306E\u6708",
  Mon: "\u6708",
  Tue: "\u706B",
  Wed: "\u6C34",
  Thu: "\u6728",
  Fri: "\u91D1",
  Sat: "\u571F",
  Sun: "\u65E5",
  Cancel: "\u30AD\u30E3\u30F3\u30BB\u30EB",
  Save: "\u4FDD\u5B58",
  "Enter to save, Esc to cancel.": "Enter \u3067\u4FDD\u5B58\u3001Esc \u3067\u30AD\u30E3\u30F3\u30BB\u30EB\u3002",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Enter \u3067\u78BA\u5B9A\u3001Esc \u3067\u30AD\u30E3\u30F3\u30BB\u30EB\u3002",
  "Delete branch": "\u30D6\u30E9\u30F3\u30C1\u3092\u524A\u9664",
  "Extend selection up": "\u9078\u629E\u3092\u4E0A\u306B\u62E1\u5F35",
  "Extend selection down": "\u9078\u629E\u3092\u4E0B\u306B\u62E1\u5F35",
  "Extend selection to parent": "\u9078\u629E\u3092\u89AA\u306B\u62E1\u5F35",
  "Extend selection to child": "\u9078\u629E\u3092\u5B50\u306B\u62E1\u5F35",
  "Select all visible nodes": "\u8868\u793A\u4E2D\u306E\u5168\u30CE\u30FC\u30C9\u3092\u9078\u629E",
  "Cut branch": "\u30D6\u30E9\u30F3\u30C1\u3092\u5207\u308A\u53D6\u308A",
  "Copy link to node": "\u30CE\u30FC\u30C9\u3078\u306E\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC",
  "Copy branch": "\u30D6\u30E9\u30F3\u30C1\u3092\u30B3\u30D4\u30FC",
  "Paste as child branch": "\u5B50\u30D6\u30E9\u30F3\u30C1\u3068\u3057\u3066\u8CBC\u308A\u4ED8\u3051",
  "Paste branch after node": "\u30CE\u30FC\u30C9\u306E\u5F8C\u306B\u30D6\u30E9\u30F3\u30C1\u3092\u8CBC\u308A\u4ED8\u3051",
  Undo: "\u5143\u306B\u623B\u3059",
  Redo: "\u3084\u308A\u76F4\u3059",
  "Edit node": "\u30CE\u30FC\u30C9\u3092\u7DE8\u96C6",
  "Add child node": "\u5B50\u30CE\u30FC\u30C9\u3092\u8FFD\u52A0",
  "Add parent node": "\u89AA\u30CE\u30FC\u30C9\u3092\u8FFD\u52A0",
  "Add sibling above": "\u4E0A\u306B\u5144\u5F1F\u30CE\u30FC\u30C9\u3092\u8FFD\u52A0",
  "Add sibling node": "\u5144\u5F1F\u30CE\u30FC\u30C9\u3092\u8FFD\u52A0",
  "Move branch up": "\u30D6\u30E9\u30F3\u30C1\u3092\u4E0A\u306B\u79FB\u52D5",
  "Move branch down": "\u30D6\u30E9\u30F3\u30C1\u3092\u4E0B\u306B\u79FB\u52D5",
  "Make child of previous node": "\u524D\u306E\u30CE\u30FC\u30C9\u306E\u5B50\u306B\u3059\u308B",
  "Move up one level": "1\u968E\u5C64\u4E0A\u306B\u79FB\u52D5",
  "Toggle completion": "\u5B8C\u4E86\u3092\u5207\u308A\u66FF\u3048",
  "Make numbered step": "\u756A\u53F7\u4ED8\u304D\u30B9\u30C6\u30C3\u30D7\u306B\u3059\u308B",
  "Set date": "\u65E5\u4ED8\u3092\u8A2D\u5B9A",
  "Open source Markdown": "Markdown \u30BD\u30FC\u30B9\u3092\u958B\u304F",
  "Select parent node": "\u89AA\u30CE\u30FC\u30C9\u3092\u9078\u629E",
  "Select child node": "\u5B50\u30CE\u30FC\u30C9\u3092\u9078\u629E",
  "Select previous sibling": "\u524D\u306E\u5144\u5F1F\u30CE\u30FC\u30C9\u3092\u9078\u629E",
  "Select next sibling": "\u6B21\u306E\u5144\u5F1F\u30CE\u30FC\u30C9\u3092\u9078\u629E",
  "Select first node": "\u6700\u521D\u306E\u30CE\u30FC\u30C9\u3092\u9078\u629E",
  "Select last node": "\u6700\u5F8C\u306E\u30CE\u30FC\u30C9\u3092\u9078\u629E",
  "Collapse / expand node": "\u30CE\u30FC\u30C9\u3092\u6298\u308A\u305F\u305F\u3080 / \u5C55\u958B",
  "Collapse all roots": "\u5168\u30EB\u30FC\u30C8\u3092\u6298\u308A\u305F\u305F\u3080",
  "Collapse selected branch": "\u9078\u629E\u30D6\u30E9\u30F3\u30C1\u3092\u6298\u308A\u305F\u305F\u3080",
  "Expand selected branch": "\u9078\u629E\u30D6\u30E9\u30F3\u30C1\u3092\u5C55\u958B",
  "Selected node only": "\u9078\u629E\u30CE\u30FC\u30C9\u306E\u307F",
  "Show one child level": "\u5B50\u30921\u968E\u5C64\u8868\u793A",
  "Show two child levels": "\u5B50\u30922\u968E\u5C64\u8868\u793A",
  "Show three child levels": "\u5B50\u30923\u968E\u5C64\u8868\u793A",
  "Show four child levels": "\u5B50\u30924\u968E\u5C64\u8868\u793A",
  "Show five child levels": "\u5B50\u30925\u968E\u5C64\u8868\u793A",
  "Expand all child levels": "\u5B50\u306E\u5168\u968E\u5C64\u3092\u5C55\u958B",
  "Find in map": "\u30DE\u30C3\u30D7\u5185\u3092\u691C\u7D22",
  "Fit map": "\u30DE\u30C3\u30D7\u3092\u753B\u9762\u306B\u53CE\u3081\u308B",
  "Specify a key after the modifiers.": "\u4FEE\u98FE\u30AD\u30FC\u306E\u5F8C\u306B\u30AD\u30FC\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "\u4FEE\u98FE\u30AD\u30FC: Ctrl\u3001Alt\u3001Shift\u3001Meta\u3001Mod\u3002",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "\u4FEE\u98FE\u30AD\u30FC\u3092\u91CD\u8907\u3055\u305B\u306A\u3044\u3067\u304F\u3060\u3055\u3044\u3002Mod \u306F Ctrl \u307E\u305F\u306F Cmd \u3092\u610F\u5473\u3057\u307E\u3059\u3002",
  "This image format is not supported.": "\u3053\u306E\u753B\u50CF\u5F62\u5F0F\u306F\u975E\u5BFE\u5FDC\u3067\u3059\u3002",
  "The clipboard image is empty.": "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306E\u753B\u50CF\u304C\u7A7A\u3067\u3059\u3002",
  "Could not save the attachment.": "\u6DFB\u4ED8\u30D5\u30A1\u30A4\u30EB\u3092\u4FDD\u5B58\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002",
  "Saving image\u2026": "\u753B\u50CF\u3092\u4FDD\u5B58\u4E2D\u2026",
  "Node text": "\u30CE\u30FC\u30C9\u306E\u30C6\u30AD\u30B9\u30C8",
  "Save (Enter)": "\u4FDD\u5B58 (Enter)",
  "Cancel (Escape)": "\u30AD\u30E3\u30F3\u30BB\u30EB (Escape)",
  "Close the editor and discard your changes?": "\u7DE8\u96C6\u3092\u9589\u3058\u3066\u5909\u66F4\u3092\u7834\u68C4\u3057\u307E\u3059\u304B\uFF1F",
  "Continue editing": "\u7DE8\u96C6\u3092\u7D9A\u3051\u308B",
  "Discard changes": "\u5909\u66F4\u3092\u7834\u68C4",
  "A node cannot be empty.": "\u30CE\u30FC\u30C9\u3092\u7A7A\u306B\u306F\u3067\u304D\u307E\u305B\u3093\u3002",
  "Multiple cursors are available in source Markdown.": "\u8907\u6570\u30AB\u30FC\u30BD\u30EB\u306F Markdown \u30BD\u30FC\u30B9\u3067\u5229\u7528\u3067\u304D\u307E\u3059\u3002",
  "This command requires the source Markdown editor.": "\u3053\u306E\u30B3\u30DE\u30F3\u30C9\u306B\u306F Markdown \u30BD\u30FC\u30B9\u30A8\u30C7\u30A3\u30BF\u30FC\u304C\u5FC5\u8981\u3067\u3059\u3002",
  "Fixed width": "\u56FA\u5B9A\u5E45",
  "Fit node content": "\u30CE\u30FC\u30C9\u306E\u5185\u5BB9\u306B\u5408\u308F\u305B\u308B",
  "Fit visible column": "\u8868\u793A\u5217\u306B\u5408\u308F\u305B\u308B",
  "TraceView Mindmap: open map": "TraceView Mindmap: \u30DE\u30C3\u30D7\u3092\u958B\u304F",
  "Open current note as a map": "\u73FE\u5728\u306E\u30CE\u30FC\u30C8\u3092\u30DE\u30C3\u30D7\u3068\u3057\u3066\u958B\u304F",
  "Open map at the Markdown cursor": "Markdown \u30AB\u30FC\u30BD\u30EB\u4F4D\u7F6E\u3067\u30DE\u30C3\u30D7\u3092\u958B\u304F",
  "Find a map": "\u30DE\u30C3\u30D7\u3092\u691C\u7D22",
  "Create a simple tree": "\u30B7\u30F3\u30D7\u30EB\u306A\u30C4\u30EA\u30FC\u3092\u4F5C\u6210",
  "Create a vector (separate template)": "\u30D9\u30AF\u30C8\u30EB\u3092\u4F5C\u6210\uFF08\u5C02\u7528\u30C6\u30F3\u30D7\u30EC\u30FC\u30C8\uFF09",
  "Steps, deadlines and QA": "\u30B9\u30C6\u30C3\u30D7\u3001\u671F\u9650\u3001QA",
  "Mark as atomic step": "\u6700\u5C0F\u30B9\u30C6\u30C3\u30D7\u3068\u3057\u3066\u30DE\u30FC\u30AF",
  "Add step deadline": "\u30B9\u30C6\u30C3\u30D7\u306E\u671F\u9650\u3092\u8FFD\u52A0",
  "Mark as QA": "QA \u3068\u3057\u3066\u30DE\u30FC\u30AF",
  "Toggle step completion": "\u30B9\u30C6\u30C3\u30D7\u306E\u5B8C\u4E86\u3092\u5207\u308A\u66FF\u3048",
  "Paste as sibling branch": "\u5144\u5F1F\u30D6\u30E9\u30F3\u30C1\u3068\u3057\u3066\u8CBC\u308A\u4ED8\u3051",
  "Undo map change": "\u30DE\u30C3\u30D7\u306E\u5909\u66F4\u3092\u5143\u306B\u623B\u3059",
  "Redo map change": "\u30DE\u30C3\u30D7\u306E\u5909\u66F4\u3092\u3084\u308A\u76F4\u3059",
  "Insert QA in Markdown editor": "Markdown \u30A8\u30C7\u30A3\u30BF\u30FC\u306B QA \u3092\u633F\u5165",
  "Insert unnumbered step in Markdown editor": "Markdown \u30A8\u30C7\u30A3\u30BF\u30FC\u306B\u756A\u53F7\u306A\u3057\u30B9\u30C6\u30C3\u30D7\u3092\u633F\u5165",
  "Open map at this node": "\u3053\u306E\u30CE\u30FC\u30C9\u3067\u30DE\u30C3\u30D7\u3092\u958B\u304F",
  "Open in TraceView Mindmap": "TraceView Mindmap \u3067\u958B\u304F",
  "The note changed. Open it again at the current line.": "\u30CE\u30FC\u30C8\u304C\u5909\u308F\u308A\u307E\u3057\u305F\u3002\u73FE\u5728\u306E\u884C\u3067\u958B\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Save or cancel the node draft.": "\u30CE\u30FC\u30C9\u306E\u4E0B\u66F8\u304D\u3092\u4FDD\u5B58\u307E\u305F\u306F\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "New vector name": "\u65B0\u3057\u3044\u30D9\u30AF\u30C8\u30EB\u540D",
  "New tree name": "\u65B0\u3057\u3044\u30C4\u30EA\u30FC\u540D",
  "Use a name without path characters.": "\u30D1\u30B9\u6587\u5B57\u3092\u542B\u307E\u306A\u3044\u540D\u524D\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "A file with this name already exists.": "\u540C\u540D\u306E\u30D5\u30A1\u30A4\u30EB\u304C\u65E2\u306B\u5B58\u5728\u3057\u307E\u3059\u3002",
  "The Markdown editor has newer text. Wait for it to save and try again.": "Markdown \u30A8\u30C7\u30A3\u30BF\u30FC\u306B\u65B0\u3057\u3044\u30C6\u30AD\u30B9\u30C8\u304C\u3042\u308A\u307E\u3059\u3002\u4FDD\u5B58\u3092\u5F85\u3063\u3066\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Branch copied": "\u30D6\u30E9\u30F3\u30C1\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F",
  "Branch saved to the plugin clipboard": "\u30D6\u30E9\u30F3\u30C1\u3092\u30D7\u30E9\u30B0\u30A4\u30F3\u306E\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u4FDD\u5B58\u3057\u307E\u3057\u305F",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30A2\u30AF\u30BB\u30B9\u3067\u304D\u305A\u5207\u308A\u53D6\u308A\u307E\u305B\u3093\u3067\u3057\u305F\u3002\u30A2\u30AF\u30BB\u30B9\u3092\u8A31\u53EF\u3057\u3066\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u3092\u5229\u7528\u3067\u304D\u307E\u305B\u3093\u3002\u22EF \u30E1\u30CB\u30E5\u30FC\u306E\u300C\u30D6\u30E9\u30F3\u30C1\u306E\u30C6\u30AD\u30B9\u30C8\u3092\u8CBC\u308A\u4ED8\u3051\u300D\u3092\u4F7F\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Save or cancel the node draft before navigating.": "\u79FB\u52D5\u524D\u306B\u4E0B\u66F8\u304D\u3092\u4FDD\u5B58\u307E\u305F\u306F\u30AD\u30E3\u30F3\u30BB\u30EB\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Waiting for Obsidian to be ready\u2026": "Obsidian \u306E\u6E96\u5099\u3092\u5F85\u3063\u3066\u3044\u307E\u3059\u2026",
  "Wait for Obsidian to load, then open the map.": "Obsidian \u306E\u8AAD\u307F\u8FBC\u307F\u5F8C\u306B\u30DE\u30C3\u30D7\u3092\u958B\u3044\u3066\u304F\u3060\u3055\u3044\u3002",
  "This address is duplicated. Fix the block ID in Markdown.": "\u30A2\u30C9\u30EC\u30B9\u304C\u91CD\u8907\u3057\u3066\u3044\u307E\u3059\u3002Markdown \u306E\u30D6\u30ED\u30C3\u30AF ID \u3092\u4FEE\u6B63\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "The linked node was not found.": "\u30EA\u30F3\u30AF\u5148\u306E\u30CE\u30FC\u30C9\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3002",
  "Collapse levels": "\u6298\u308A\u305F\u305F\u307F\u968E\u5C64",
  "Delete selected branch": "\u9078\u629E\u30D6\u30E9\u30F3\u30C1\u3092\u524A\u9664",
  "Sibling node": "\u5144\u5F1F\u30CE\u30FC\u30C9",
  Edit: "\u7DE8\u96C6",
  "Multiple selection: taps or rectangle": "\u8907\u6570\u9078\u629E: \u30BF\u30C3\u30D7\u307E\u305F\u306F\u7BC4\u56F2\u6307\u5B9A",
  Search: "\u691C\u7D22",
  "Layout and node width": "\u30EC\u30A4\u30A2\u30A6\u30C8\u3068\u30CE\u30FC\u30C9\u5E45",
  "Map actions": "\u30DE\u30C3\u30D7\u306E\u64CD\u4F5C",
  "Open now": "\u4ECA\u3059\u3050\u958B\u304F",
  Map: "\u30DE\u30C3\u30D7",
  Outline: "\u30A2\u30A6\u30C8\u30E9\u30A4\u30F3",
  Table: "\u8868",
  "Expand entire map": "\u30DE\u30C3\u30D7\u5168\u4F53\u3092\u5C55\u958B",
  "All child levels": "\u5B50\u306E\u5168\u968E\u5C64",
  "The map will open after the workspace loads\u2026": "\u30EF\u30FC\u30AF\u30B9\u30DA\u30FC\u30B9\u306E\u8AAD\u307F\u8FBC\u307F\u5F8C\u306B\u30DE\u30C3\u30D7\u304C\u958B\u304D\u307E\u3059\u2026",
  "File missing or deleted. Open another map.": "\u30D5\u30A1\u30A4\u30EB\u304C\u5B58\u5728\u3057\u306A\u3044\u304B\u524A\u9664\u3055\u308C\u307E\u3057\u305F\u3002\u5225\u306E\u30DE\u30C3\u30D7\u3092\u958B\u3044\u3066\u304F\u3060\u3055\u3044\u3002",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "\u30DE\u30C3\u30D7\u304C\u5909\u66F4\u3055\u308C\u305F\u304B\u4FDD\u5B58\u4E2D\u3067\u3059\u3002\u4E0B\u66F8\u304D\u306F\u5165\u529B\u6B04\u306B\u6B8B\u3063\u3066\u3044\u307E\u3059\u3002\u30AD\u30E3\u30F3\u30BB\u30EB\u524D\u306B\u30B3\u30D4\u30FC\u3057\u3066\u73FE\u5728\u306E\u30DE\u30C3\u30D7\u3067\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "The file no longer exists.": "\u30D5\u30A1\u30A4\u30EB\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002",
  "Select a map node first": "\u307E\u305A\u30DE\u30C3\u30D7\u306E\u30CE\u30FC\u30C9\u3092\u9078\u629E",
  "Another map is open. The selection was copied, but not cut.": "\u5225\u306E\u30DE\u30C3\u30D7\u304C\u958B\u3044\u3066\u3044\u307E\u3059\u3002\u9078\u629E\u7BC4\u56F2\u306F\u30B3\u30D4\u30FC\u3055\u308C\u307E\u3057\u305F\u304C\u5207\u308A\u53D6\u3089\u308C\u3066\u3044\u307E\u305B\u3093\u3002",
  "This command requires one selected node.": "\u3053\u306E\u30B3\u30DE\u30F3\u30C9\u3067\u306F\u30CE\u30FC\u30C9\u30921\u3064\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "The map was closed or renamed. Copy the address again.": "\u30DE\u30C3\u30D7\u304C\u9589\u3058\u3089\u308C\u305F\u304B\u540D\u524D\u304C\u5909\u308F\u308A\u307E\u3057\u305F\u3002\u30A2\u30C9\u30EC\u30B9\u3092\u518D\u5EA6\u30B3\u30D4\u30FC\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Node link copied.": "\u30CE\u30FC\u30C9\u3078\u306E\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC\u3057\u307E\u3057\u305F\u3002",
  "Another map is open. The branch was copied, but not cut.": "\u5225\u306E\u30DE\u30C3\u30D7\u304C\u958B\u3044\u3066\u3044\u307E\u3059\u3002\u30D6\u30E9\u30F3\u30C1\u306F\u30B3\u30D4\u30FC\u3055\u308C\u307E\u3057\u305F\u304C\u5207\u308A\u53D6\u3089\u308C\u3066\u3044\u307E\u305B\u3093\u3002",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "\u30D6\u30E9\u30F3\u30C1\u3092\u5207\u308A\u53D6\u308A\u307E\u3057\u305F\u3002Ctrl+V \u3067\u8CBC\u308A\u4ED8\u3051\u3001\u5143\u306B\u623B\u3059\u3067\u5FA9\u5143\u3002",
  "The note was renamed. Copy the draft and reopen the editor.": "\u30CE\u30FC\u30C8\u540D\u304C\u5909\u308F\u308A\u307E\u3057\u305F\u3002\u4E0B\u66F8\u304D\u3092\u30B3\u30D4\u30FC\u3057\u3066\u30A8\u30C7\u30A3\u30BF\u30FC\u3092\u958B\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "\u30DE\u30C3\u30D7\u304C\u5916\u90E8\u3067\u5909\u66F4\u3055\u308C\u307E\u3057\u305F\u3002\u4E0B\u66F8\u304D\u306F\u4FDD\u6301\u3055\u308C\u3066\u3044\u307E\u3059\u3002\u518D\u7DE8\u96C6\u524D\u306B\u30B3\u30D4\u30FC\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "The node no longer exists. Your draft is preserved.": "\u30CE\u30FC\u30C9\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\u4E0B\u66F8\u304D\u306F\u4FDD\u6301\u3055\u308C\u3066\u3044\u307E\u3059\u3002",
  "Steps \xB7 Deadlines \xB7 QA": "\u30B9\u30C6\u30C3\u30D7 \xB7 \u671F\u9650 \xB7 QA",
  "Step deadline\u2026": "\u30B9\u30C6\u30C3\u30D7\u306E\u671F\u9650\u2026",
  "Completed / incomplete": "\u5B8C\u4E86 / \u672A\u5B8C\u4E86",
  "Move up": "\u4E0A\u306B\u79FB\u52D5",
  "Move down": "\u4E0B\u306B\u79FB\u52D5",
  "Nest in previous branch": "\u524D\u306E\u30D6\u30E9\u30F3\u30C1\u5185\u306B\u5165\u308C\u308B",
  "Open text in editor": "\u30C6\u30AD\u30B9\u30C8\u3092\u30A8\u30C7\u30A3\u30BF\u30FC\u3067\u958B\u304F",
  "Delete branch\u2026": "\u30D6\u30E9\u30F3\u30C1\u3092\u524A\u9664\u2026",
  "Export HTML\u2026": "HTML \u306B\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u2026",
  "Export SVG\u2026": "SVG \u306B\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u2026",
  "Paste branch text\u2026": "\u30D6\u30E9\u30F3\u30C1\u306E\u30C6\u30AD\u30B9\u30C8\u3092\u8CBC\u308A\u4ED8\u3051\u2026",
  "Paste child Markdown branch": "Markdown \u306E\u5B50\u30D6\u30E9\u30F3\u30C1\u3092\u8CBC\u308A\u4ED8\u3051",
  "Renumber steps": "\u30B9\u30C6\u30C3\u30D7\u3092\u632F\u308A\u76F4\u3059",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "\u30EA\u30F3\u30AF\u5148\u306E\u30DE\u30C3\u30D7\u304C\u5909\u66F4\u3055\u308C\u307E\u3057\u305F\u3002\u30EA\u30F3\u30AF\u5019\u88DC\u3092\u958B\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002\u4E0B\u66F8\u304D\u306F\u4FDD\u6301\u3055\u308C\u3066\u3044\u307E\u3059\u3002",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "\u3053\u306E\u30D6\u30ED\u30C3\u30AF\u306F\u72EC\u7ACB\u3057\u305F\u30CE\u30FC\u30C9\u3067\u306F\u3042\u308A\u307E\u305B\u3093\u3002\u300C\u30CE\u30FC\u30C9\u3078\u306E\u30EA\u30F3\u30AF\u3092\u30B3\u30D4\u30FC\u300D\u3092\u4F7F\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Native editor unavailable. Using text input. ": "\u30CD\u30A4\u30C6\u30A3\u30D6\u30A8\u30C7\u30A3\u30BF\u30FC\u3092\u5229\u7528\u3067\u304D\u307E\u305B\u3093\u3002\u30C6\u30AD\u30B9\u30C8\u5165\u529B\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002 ",
  "The note does not exist.": "\u30CE\u30FC\u30C8\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002",
  "File already exists. Choose another name.": "\u30D5\u30A1\u30A4\u30EB\u306F\u65E2\u306B\u5B58\u5728\u3057\u307E\u3059\u3002\u5225\u306E\u540D\u524D\u3092\u6307\u5B9A\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  Steps: "\u30B9\u30C6\u30C3\u30D7",
  Deadlines: "\u671F\u9650",
  "Open QA": "\u672A\u89E3\u6C7A\u306E QA",
  Refresh: "\u66F4\u65B0",
  "Collapse all": "\u3059\u3079\u3066\u6298\u308A\u305F\u305F\u3080",
  "Expand all": "\u3059\u3079\u3066\u5C55\u958B",
  "Search steps": "\u30B9\u30C6\u30C3\u30D7\u3092\u691C\u7D22",
  "Find\u2026": "\u691C\u7D22\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "\u4E26\u3079\u66FF\u3048\u306F\u540C\u4E00\u30D5\u30A1\u30A4\u30EB\u5185\u306E\u30B9\u30C6\u30C3\u30D7\u756A\u53F7\u306E\u307F\u5909\u66F4\u3057\u307E\u3059\u3002\u30D6\u30E9\u30F3\u30C1\u306E\u4F4D\u7F6E\u306F\u7DAD\u6301\u3055\u308C\u307E\u3059\u3002\u65E5\u4ED8\u4ED8\u304D\u3068\u756A\u53F7\u306A\u3057\u306E\u30B9\u30C6\u30C3\u30D7\u306F\u5225\u306E\u9806\u5E8F\u3067\u3059\u3002",
  Expand: "\u5C55\u958B",
  Collapse: "\u6298\u308A\u305F\u305F\u3080",
  "No open items match this filter.": "\u3053\u306E\u30D5\u30A3\u30EB\u30BF\u30FC\u306B\u4E00\u81F4\u3059\u308B\u672A\u5B8C\u4E86\u9805\u76EE\u306F\u3042\u308A\u307E\u305B\u3093\u3002",
  "Mark completed": "\u5B8C\u4E86\u3068\u3057\u3066\u30DE\u30FC\u30AF",
  "Move earlier in execution order": "\u5B9F\u884C\u9806\u5E8F\u3092\u65E9\u3081\u308B",
  "Move later in execution order": "\u5B9F\u884C\u9806\u5E8F\u3092\u9045\u3089\u305B\u308B",
  "Deadline ?": "\u671F\u9650 ?",
  "Node editor": "\u30CE\u30FC\u30C9\u30A8\u30C7\u30A3\u30BF\u30FC",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "\u6B21\u56DE\u306E\u7DE8\u96C6\u304B\u3089\u9069\u7528\u3002\u30CD\u30A4\u30C6\u30A3\u30D6\u306F Obsidian \u306E\u30E9\u30A4\u30D6\u30D7\u30EC\u30D3\u30E5\u30FC\u3068\u5019\u88DC\u3092\u4F7F\u3044\u3001\u975E\u5BFE\u5FDC\u6642\u306F\u30C6\u30AD\u30B9\u30C8\u5165\u529B\u306B\u5207\u308A\u66FF\u3048\u307E\u3059\u3002",
  "Native Obsidian": "Obsidian \u30CD\u30A4\u30C6\u30A3\u30D6",
  "Text input": "\u30C6\u30AD\u30B9\u30C8\u5165\u529B",
  "Automatically restore large maps": "\u5927\u304D\u306A\u30DE\u30C3\u30D7\u3092\u81EA\u52D5\u5FA9\u5143",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "\u8D77\u52D5\u6642\u306F Obsidian \u306E\u5FDC\u7B54\u304C\u5B89\u5B9A\u3059\u308B\u307E\u3067\u5F85\u3061\u307E\u3059\u3002\u300C\u4ECA\u3059\u3050\u958B\u304F\u300D\u3067\u5F85\u6A5F\u3092\u30B9\u30AD\u30C3\u30D7\u3067\u304D\u307E\u3059\u3002",
  "Hide frozen steps": "\u51CD\u7D50\u30B9\u30C6\u30C3\u30D7\u3092\u975E\u8868\u793A",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "\u30B9\u30C6\u30C3\u30D7\u3068\u671F\u9650\u4E00\u89A7\u3067 \u{1F9CA} \u30D6\u30E9\u30F3\u30C1\u3092\u7701\u304D\u307E\u3059\u3002\u30DE\u30C3\u30D7\u3067\u306F\u5168\u6587\u3092\u8868\u793A\u3057\u307E\u3059\u3002",
  "Left arrow collapses the branch first": "\u5DE6\u77E2\u5370\u3067\u5148\u306B\u30D6\u30E9\u30F3\u30C1\u3092\u6298\u308A\u305F\u305F\u3080",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "\u30AA\u30D5: \u89AA\u3078\u76F4\u63A5\u79FB\u52D5\u3002\u30AA\u30F3: \u5C55\u958B\u4E2D\u306E\u30D6\u30E9\u30F3\u30C1\u3092\u6298\u308A\u305F\u305F\u307F\u3001\u518D\u5EA6\u62BC\u3059\u3068\u89AA\u3092\u9078\u629E\u3002",
  "Show [ ] in list text": "\u4E00\u89A7\u30C6\u30AD\u30B9\u30C8\u306B [ ] \u3092\u8868\u793A",
  "Show #step in list text": "\u4E00\u89A7\u30C6\u30AD\u30B9\u30C8\u306B #step \u3092\u8868\u793A",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "\u30B9\u30C6\u30C3\u30D7 \xB7 \u671F\u9650 \xB7 QA \u306E\u8868\u793A\u306E\u307F\u5909\u66F4\u3057\u307E\u3059\u3002\u30CE\u30FC\u30C8\u672C\u6587\u3068\u5B8C\u4E86\u64CD\u4F5C\u306F\u4FDD\u6301\u3055\u308C\u307E\u3059\u3002",
  "Map node width": "\u30DE\u30C3\u30D7\u306E\u30CE\u30FC\u30C9\u5E45",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "\u958B\u3044\u3066\u3044\u308B\u5168\u30DE\u30C3\u30D7\u306B\u5373\u6642\u9069\u7528\u3002\u30A2\u30A6\u30C8\u30E9\u30A4\u30F3\u3068\u8868\u306F\u305D\u308C\u305E\u308C\u306E\u5E45\u3092\u7DAD\u6301\u3057\u307E\u3059\u3002",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "\u6298\u308A\u305F\u305F\u307F\u72B6\u614B\u3068\u30AB\u30E1\u30E9\u306F\u7AEF\u672B\u3054\u3068\u306B\u4FDD\u5B58\u3055\u308C\u307E\u3059\u3002\u95B2\u89A7\u6642\u306B Markdown \u3092\u66F8\u304D\u63DB\u3048\u305F\u308A\u96A0\u3057 ID \u3092\u8FFD\u52A0\u3057\u307E\u305B\u3093\u3002Windows \u3068 Android \u3067\u7570\u306A\u308B\u8868\u793A\u72B6\u614B\u3092\u4FDD\u5B58\u3067\u304D\u307E\u3059\u3002",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "\u30CD\u30A4\u30C6\u30A3\u30D6\u5165\u529B\u306F Obsidian \u30A8\u30C7\u30A3\u30BF\u30FC\u3001\u30C6\u30AD\u30B9\u30C8\u5165\u529B\u306F Editor API \u3092\u4F7F\u7528\u3057\u307E\u3059\u3002\u5B8C\u5168\u306A Markdown \u753B\u9762\u304C\u5FC5\u8981\u306A\u30B3\u30DE\u30F3\u30C9\u306F \u22EF \u2192 \u30C6\u30AD\u30B9\u30C8\u3092\u30A8\u30C7\u30A3\u30BF\u30FC\u3067\u958B\u304F \u304B\u3089\u5B9F\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Map hotkeys": "\u30DE\u30C3\u30D7\u306E\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "\u5909\u66F4\u306F\u5168\u30DE\u30C3\u30D7\u306B\u5373\u6642\u9069\u7528\u3002\u2328 \u3092\u62BC\u3057\u3066\u30AD\u30FC\u3092\u5165\u529B\u3059\u308B\u304B\u3001Ctrl+C\u3001Alt+Shift+1 \u306E\u3088\u3046\u306B\u624B\u5165\u529B\u3057\u307E\u3059\u3002\u4EE3\u66FF\u30AD\u30FC\u306F\u30B3\u30F3\u30DE\u533A\u5207\u308A\u3002\xD7 \u3067\u7121\u52B9\u5316\u3001\u21BA \u3067\u521D\u671F\u5024\u3078\u3002\u7DE8\u96C6\u4E2D\u306F\u901A\u5E38\u306E\u30A8\u30C7\u30A3\u30BF\u30FC\u64CD\u4F5C\u304C\u6709\u52B9\u3067\u3059\u3002",
  Unassigned: "\u672A\u5272\u308A\u5F53\u3066",
  "Record shortcut": "\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u3092\u8A18\u9332",
  Disable: "\u7121\u52B9\u5316",
  "Default shortcuts": "\u521D\u671F\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8",
  "Search map\u2026": "\u30DE\u30C3\u30D7\u3092\u691C\u7D22\u2026",
  "Search map": "\u30DE\u30C3\u30D7\u3092\u691C\u7D22",
  " A\u2013Z": " \u540D\u524D\u9806",
  "Close search": "\u691C\u7D22\u3092\u9589\u3058\u308B",
  "Search results": "\u691C\u7D22\u7D50\u679C",
  "No results": "\u7D50\u679C\u306A\u3057",
  "This Obsidian version has no compatible native editor.": "\u3053\u306E Obsidian \u30D0\u30FC\u30B8\u30E7\u30F3\u306B\u306F\u4E92\u63DB\u6027\u306E\u3042\u308B\u30CD\u30A4\u30C6\u30A3\u30D6\u30A8\u30C7\u30A3\u30BF\u30FC\u304C\u3042\u308A\u307E\u305B\u3093\u3002",
  "Could not prepare the native editor.": "\u30CD\u30A4\u30C6\u30A3\u30D6\u30A8\u30C7\u30A3\u30BF\u30FC\u3092\u6E96\u5099\u3067\u304D\u307E\u305B\u3093\u3067\u3057\u305F\u3002",
  "The native editor cannot protect a single-line draft.": "\u30CD\u30A4\u30C6\u30A3\u30D6\u30A8\u30C7\u30A3\u30BF\u30FC\u306F\u5358\u4E00\u884C\u306E\u4E0B\u66F8\u304D\u3092\u4FDD\u8B77\u3067\u304D\u307E\u305B\u3093\u3002",
  "Native Obsidian link": "Obsidian \u30CD\u30A4\u30C6\u30A3\u30D6\u30EA\u30F3\u30AF",
  "Map filter": "\u30DE\u30C3\u30D7\u30D5\u30A3\u30EB\u30BF\u30FC",
  "All maps": "\u3059\u3079\u3066\u306E\u30DE\u30C3\u30D7",
  Maps: "\u30DE\u30C3\u30D7",
  "No maps match this search.": "\u4E00\u81F4\u3059\u308B\u30DE\u30C3\u30D7\u304C\u3042\u308A\u307E\u305B\u3093\u3002",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "\u30CE\u30FC\u30C8\u304C\u5225\u306E\u753B\u9762\u3084\u7AEF\u672B\u3067\u5909\u66F4\u3055\u308C\u307E\u3057\u305F\u3002\u30DE\u30C3\u30D7\u3092\u66F4\u65B0\u3057\u307E\u3057\u305F\u3002\u6700\u65B0\u306E\u30C6\u30AD\u30B9\u30C8\u3067\u518D\u8A66\u884C\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "History stopped because the text changed externally. Undo will preserve those changes.": "\u5916\u90E8\u306E\u30C6\u30AD\u30B9\u30C8\u5909\u66F4\u306B\u3088\u308A\u5C65\u6B74\u3092\u505C\u6B62\u3057\u307E\u3057\u305F\u3002\u5143\u306B\u623B\u3057\u3066\u3082\u305D\u306E\u5909\u66F4\u306F\u4FDD\u6301\u3057\u307E\u3059\u3002",
  "Loading map\u2026": "\u30DE\u30C3\u30D7\u3092\u8AAD\u307F\u8FBC\u307F\u4E2D\u2026",
  "Node address: ^": "\u30CE\u30FC\u30C9\u306E\u30A2\u30C9\u30EC\u30B9: ^",
  "Branch ready to move": "\u30D6\u30E9\u30F3\u30C1\u3092\u79FB\u52D5\u3067\u304D\u307E\u3059",
  "Before: ": "\u524D: ",
  "After: ": "\u5F8C: ",
  "As children: ": "\u5B50\u3068\u3057\u3066: ",
  "Expand node": "\u30CE\u30FC\u30C9\u3092\u5C55\u958B",
  "Collapse node": "\u30CE\u30FC\u30C9\u3092\u6298\u308A\u305F\u305F\u3080",
  "Collapse branch": "\u30D6\u30E9\u30F3\u30C1\u3092\u6298\u308A\u305F\u305F\u3080",
  "Expand branch": "\u30D6\u30E9\u30F3\u30C1\u3092\u5C55\u958B",
  "Paste after node": "\u30CE\u30FC\u30C9\u306E\u5F8C\u306B\u8CBC\u308A\u4ED8\u3051",
  Language: "\u8A00\u8A9E",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "\u81EA\u52D5\u306F Obsidian \u306E\u8A00\u8A9E\u306B\u5F93\u3044\u307E\u3059\u3002\u5909\u66F4\u306E\u9069\u7528\u306B\u306F Obsidian \u3092\u518D\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Automatic (Obsidian)": "\u81EA\u52D5 (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "\u8A00\u8A9E\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002Obsidian \u3092\u518D\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Selected nodes: {count}": "\u9078\u629E\u30CE\u30FC\u30C9\u6570: {count}",
  "Child levels: {count}": "\u5B50\u306E\u968E\u5C64\u6570: {count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "\u30CE\u30FC\u30C9\u6570: {nodes} \xB7 \u672A\u5B8C\u4E86\u30B9\u30C6\u30C3\u30D7: {steps}",
  "Export {format} \u2014 file name": "{format} \u30A8\u30AF\u30B9\u30DD\u30FC\u30C8 \u2014 \u30D5\u30A1\u30A4\u30EB\u540D",
  "Saved {path}": "\u4FDD\u5B58\u3057\u307E\u3057\u305F: {path}",
  "Expand map: {name}": "\u30DE\u30C3\u30D7\u3092\u5C55\u958B: {name}",
  "Collapse map: {name}": "\u30DE\u30C3\u30D7\u3092\u6298\u308A\u305F\u305F\u3080: {name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u306E\u7AF6\u5408: {shortcuts}\u3002\u4E00\u89A7\u306E\u6700\u521D\u306E\u30B3\u30DE\u30F3\u30C9\u304C\u512A\u5148\u3055\u308C\u307E\u3059\u3002",
  "Next action": "\u6B21\u306E\u30A2\u30AF\u30B7\u30E7\u30F3",
  "First action": "\u6700\u521D\u306E\u30A2\u30AF\u30B7\u30E7\u30F3",
  "Active now": "\u73FE\u5728\u9032\u884C\u4E2D",
  "Frozen / someday": "\u51CD\u7D50 / \u3044\u3064\u304B",
  "First step": "\u6700\u521D\u306E\u30B9\u30C6\u30C3\u30D7",
  "{path} \xB7 References: {count}": "{path} \xB7 \u53C2\u7167\u6570: {count}",
  "Attachment saved, but the editor is already closed: {link}": "\u6DFB\u4ED8\u30D5\u30A1\u30A4\u30EB\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F\u304C\u3001\u30A8\u30C7\u30A3\u30BF\u30FC\u306F\u65E2\u306B\u9589\u3058\u3066\u3044\u307E\u3059: {link}",
  "Copy selection": "\u9078\u629E\u7BC4\u56F2\u3092\u30B3\u30D4\u30FC",
  "Cut selection": "\u9078\u629E\u7BC4\u56F2\u3092\u5207\u308A\u53D6\u308A",
  "Delete selection": "\u9078\u629E\u7BC4\u56F2\u3092\u524A\u9664",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "\u5168\u30DE\u30C3\u30D7 \xB7 {count} \u30CE\u30FC\u30C9 \xB7 \u8AAD\u307F\u53D6\u308A\u5C02\u7528\u30A8\u30AF\u30B9\u30DD\u30FC\u30C8\u3002\u30D6\u30E9\u30F3\u30C1\u306E\u30DE\u30FC\u30AB\u30FC\u3067\u6298\u308A\u305F\u305F\u3081\u307E\u3059\u3002\u30E9\u30D9\u30EB\u306F Markdown \u3092\u4FDD\u6301\u3057\u307E\u3059\u3002\u4FDD\u7BA1\u5EAB\u306E\u30EA\u30F3\u30AF\u3084\u6DFB\u4ED8\u30D5\u30A1\u30A4\u30EB\u306B\u306F Obsidian \u304C\u5FC5\u8981\u3067\u3059\u3002",
  "This map contains no outline nodes.": "\u3053\u306E\u30DE\u30C3\u30D7\u306B\u30A2\u30A6\u30C8\u30E9\u30A4\u30F3\u30CE\u30FC\u30C9\u306F\u3042\u308A\u307E\u305B\u3093\u3002",
  "This node no longer exists. Reopen the map and try again.": "\u30CE\u30FC\u30C9\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002\u30DE\u30C3\u30D7\u3092\u958B\u304D\u76F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "\u30CE\u30FC\u30C9\u306F1\u884C\u306B\u53CE\u3081\u3066\u304F\u3060\u3055\u3044\u3002\u8FFD\u52A0\u306E\u6587\u7AE0\u306F\u5B50\u30CE\u30FC\u30C9\u3084\u30EA\u30F3\u30AF\u5148\u306E\u30CE\u30FC\u30C8\u3078\u3002",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "\u30B3\u30FC\u30C9\u30D6\u30ED\u30C3\u30AF\u3084\u533A\u5207\u308A\u7DDA\u306B\u306A\u308B\u30C6\u30AD\u30B9\u30C8\u3067\u3059\u3002\u8A18\u53F7\u3092\u30A8\u30B9\u30B1\u30FC\u30D7\u3059\u308B\u304B\u30BD\u30FC\u30B9\u3067\u7DE8\u96C6\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown \u306E\u898B\u51FA\u3057\u306F6\u968E\u5C64\u307E\u3067\u3067\u3059\u3002\u30BD\u30FC\u30B9\u3067\u5B50\u306E\u7B87\u6761\u66F8\u304D\u3092\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "\u3053\u306E\u30C6\u30AD\u30B9\u30C8\u306F Markdown \u306E\u89AA\u306B\u3067\u304D\u307E\u305B\u3093\u3002\u8A18\u53F7\u3092\u30A8\u30B9\u30B1\u30FC\u30D7\u3059\u308B\u304B\u30BD\u30FC\u30B9\u3067\u7DE8\u96C6\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "\u30CE\u30FC\u30C9\u884C\u4EE5\u5916\u306E\u6BB5\u843D\u3084\u30B3\u30FC\u30C9\u304C\u3042\u308A\u307E\u3059\u3002\u5185\u5BB9\u3092\u4FDD\u6301\u3059\u308B\u305F\u3081\u30BD\u30FC\u30B9\u3067\u69CB\u9020\u3092\u5909\u66F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "\u30A4\u30F3\u30C7\u30F3\u30C8\u304C\u66D6\u6627\u3067\u3059\u3002\u79FB\u52D5\u524D\u306B\u30BD\u30FC\u30B9\u3067\u4FEE\u6B63\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "That move would exceed Markdown\u2019s six heading levels.": "\u79FB\u52D5\u3059\u308B\u3068\u898B\u51FA\u3057\u306E6\u968E\u5C64\u5236\u9650\u3092\u8D85\u3048\u307E\u3059\u3002",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "\u898B\u51FA\u3057\u3068\u7B87\u6761\u66F8\u304D\u9593\u306E\u79FB\u52D5\u306F\u610F\u5473\u3092\u5909\u3048\u307E\u3059\u3002\u30BD\u30FC\u30B9\u3067\u5909\u66F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "\u898B\u51FA\u3057\u3068\u7B87\u6761\u66F8\u304D\u306E\u6DF7\u5728\u3057\u305F\u30A4\u30F3\u30C7\u30F3\u30C8\u306F\u66D6\u6627\u3067\u3059\u3002\u30BD\u30FC\u30B9\u3092\u4F7F\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "\u898B\u51FA\u3057\u4E0B\u306E\u7B87\u6761\u66F8\u304D\u306E\u968E\u5C64\u3092\u4E0A\u3052\u308B\u306B\u306F\u5F62\u5F0F\u5909\u66F4\u304C\u5FC5\u8981\u3067\u3059\u3002\u30BD\u30FC\u30B9\u3092\u4F7F\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "A branch cannot be moved into itself or one of its descendants.": "\u30D6\u30E9\u30F3\u30C1\u3092\u81EA\u8EAB\u3084\u5B50\u5B6B\u306B\u79FB\u52D5\u3067\u304D\u307E\u305B\u3093\u3002",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "\u898B\u51FA\u3057\u306F\u7B87\u6761\u66F8\u304D\u306E\u5B50\u306B\u3067\u304D\u307E\u305B\u3093\u3002\u30BD\u30FC\u30B9\u3067\u5F62\u5F0F\u3092\u5909\u66F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "\u5C0F\u898B\u51FA\u3057\u306E\u5F8C\u306E\u7B87\u6761\u66F8\u304D\u306F\u305D\u306E\u898B\u51FA\u3057\u306B\u5C5E\u3057\u307E\u3059\u3002\u7B87\u6761\u66F8\u304D\u306E\u89AA\u3092\u9078\u3076\u304B\u69CB\u9020\u3092\u5909\u66F4\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Paste an outline branch, or paste one line as a new node.": "\u30A2\u30A6\u30C8\u30E9\u30A4\u30F3\u306E\u30D6\u30E9\u30F3\u30C1\u304B\u3001\u65B0\u898F\u30CE\u30FC\u30C9\u3068\u3057\u30661\u884C\u3092\u8CBC\u308A\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044\u3002",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "\u7B87\u6761\u66F8\u304D\u306F\u7B87\u6761\u66F8\u304D\u306E\u96A3\u3001\u898B\u51FA\u3057\u306F\u898B\u51FA\u3057\u306E\u96A3\u306B\u8CBC\u308A\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044\u3002\u5F62\u5F0F\u5909\u66F4\u306F\u30BD\u30FC\u30B9\u3067\u884C\u3044\u307E\u3059\u3002",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "\u30AF\u30EA\u30C3\u30D7\u30DC\u30FC\u30C9\u306B\u30A2\u30A6\u30C8\u30E9\u30A4\u30F3\u4EE5\u5916\u306E\u5185\u5BB9\u304C\u3042\u308A\u307E\u3059\u3002\u4FDD\u6301\u3059\u308B\u305F\u3081\u30BD\u30FC\u30B9\u306B\u8CBC\u308A\u4ED8\u3051\u3066\u304F\u3060\u3055\u3044\u3002",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "\u65E5\u4ED8\u306F YYYY-MM-DD\u3001\u671F\u9650\u672A\u5B9A\u306F ? \u3092\u4F7F\u7528\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "That calendar date does not exist.": "\u305D\u306E\u65E5\u4ED8\u306F\u5B58\u5728\u3057\u307E\u305B\u3093\u3002",
  "The execution order contains the same step twice.": "\u5B9F\u884C\u9806\u5E8F\u306B\u540C\u3058\u30B9\u30C6\u30C3\u30D7\u304C2\u56DE\u542B\u307E\u308C\u3066\u3044\u307E\u3059\u3002",
  "Only numbered, undated steps can be placed in an execution order.": "\u5B9F\u884C\u9806\u5E8F\u3092\u8A2D\u5B9A\u3067\u304D\u308B\u306E\u306F\u65E5\u4ED8\u306E\u306A\u3044\u756A\u53F7\u4ED8\u304D\u30B9\u30C6\u30C3\u30D7\u306E\u307F\u3067\u3059\u3002",
  Untitled: "\u7121\u984C",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "\u30CE\u30FC\u30C9\u304C\u3042\u308A\u307E\u305B\u3093\u3002\u30BD\u30FC\u30B9\u3092\u958B\u3044\u3066\u898B\u51FA\u3057\u304B\u7B87\u6761\u66F8\u304D\u3092\u8FFD\u52A0\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Mark incomplete": "\u672A\u5B8C\u4E86\u3068\u3057\u3066\u30DE\u30FC\u30AF",
  "Invalid saved map patterns. Default patterns are active.": "\u4FDD\u5B58\u3055\u308C\u305F\u30D1\u30BF\u30FC\u30F3\u304C\u7121\u52B9\u3067\u3059\u3002\u521D\u671F\u30EB\u30FC\u30EB\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002",
  "Automatically open matching notes as maps": "\u4E00\u81F4\u3059\u308B\u30CE\u30FC\u30C8\u3092\u81EA\u52D5\u3067\u30DE\u30C3\u30D7\u3068\u3057\u3066\u958B\u304F",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "\u4EE5\u4E0B\u306E\u30D1\u30BF\u30FC\u30F3\u306B\u4E00\u81F4\u3059\u308B\u30CE\u30FC\u30C8\u304C\u5BFE\u8C61\u3067\u3059\u3002Markdown \u30BD\u30FC\u30B9\u3092\u660E\u793A\u7684\u306B\u958B\u304F\u3068\u3001\u305D\u306E\u30CE\u30FC\u30C8\u306F Markdown \u8868\u793A\u3092\u7DAD\u6301\u3057\u307E\u3059\u3002",
  "Invalid pattern on line {line}: {error}": "{line} \u884C\u76EE\u306E\u30D1\u30BF\u30FC\u30F3\u304C\u7121\u52B9\u3067\u3059: {error}",
  "Patterns saved.": "\u30D1\u30BF\u30FC\u30F3\u3092\u4FDD\u5B58\u3057\u307E\u3057\u305F\u3002",
  "Pattern syntax": "\u30D1\u30BF\u30FC\u30F3\u306E\u69CB\u6587",
  "Glob (wildcards)": "Glob\uFF08\u30EF\u30A4\u30EB\u30C9\u30AB\u30FC\u30C9\uFF09",
  "Regular expressions": "\u6B63\u898F\u8868\u73FE",
  "Map file patterns": "\u30DE\u30C3\u30D7\u306E\u30D5\u30A1\u30A4\u30EB\u30D1\u30BF\u30FC\u30F3",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "1\u884C\u306B1\u30D1\u30BF\u30FC\u30F3\u3001\u3044\u305A\u308C\u304B\u306E\u4E00\u81F4\u3067\u5BFE\u8C61\u3068\u306A\u308A\u307E\u3059\u3002Glob \u306F / \u306A\u3057\u306A\u3089\u5168\u30D5\u30A9\u30EB\u30C0\u30FC\u306E\u30D5\u30A1\u30A4\u30EB\u540D\u3001/ \u3042\u308A\u306A\u3089\u4FDD\u7BA1\u5EAB\u304B\u3089\u306E\u76F8\u5BFE\u30D1\u30B9\u306B\u4E00\u81F4\u3057\u307E\u3059\u3002*\u3001**\u3001? \u304C\u4F7F\u3048\u307E\u3059\u3002\u6B63\u898F\u8868\u73FE\u306F / \u3067\u56F2\u307E\u305A\u76F8\u5BFE\u30D1\u30B9\u3092\u6307\u5B9A\u3002\u5927\u6587\u5B57\u5C0F\u6587\u5B57\u3092\u533A\u5225\u305B\u305A\u3001Markdown \u306E\u307F\u5BFE\u8C61\u3067\u3059\u3002",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "mindmap: true \u30D7\u30ED\u30D1\u30C6\u30A3\u3067\u3082\u30DE\u30C3\u30D7\u3092\u6307\u5B9A\u3067\u304D\u307E\u3059\u3002\u7121\u52B9\u306A\u5165\u529B\u6642\u306F\u6700\u5F8C\u306B\u4FDD\u5B58\u3057\u305F\u30EB\u30FC\u30EB\u3092\u7DAD\u6301\u3057\u307E\u3059\u3002\u81EA\u52D5\u8868\u793A\u3001\u30DE\u30C3\u30D7\u691C\u7D22\u3001\u30B9\u30C6\u30C3\u30D7\u4E00\u89A7\u3067\u5171\u901A\u306E\u30D1\u30BF\u30FC\u30F3\u3092\u4F7F\u7528\u3057\u307E\u3059\u3002",
  "This JSON map format is not supported.": "\u3053\u306E JSON \u30DE\u30C3\u30D7\u5F62\u5F0F\u306F\u975E\u5BFE\u5FDC\u3067\u3059\u3002",
  "Restore default patterns": "\u521D\u671F\u30D1\u30BF\u30FC\u30F3\u306B\u623B\u3059",
  "Restore default settings": "\u521D\u671F\u8A2D\u5B9A\u306B\u623B\u3059",
  "Restore defaults": "\u521D\u671F\u5024\u306B\u623B\u3059",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "\u8A2D\u5B9A\u3001\u30B7\u30E7\u30FC\u30C8\u30AB\u30C3\u30C8\u3001\u30DE\u30C3\u30D7\u30D1\u30BF\u30FC\u30F3\u3092\u521D\u671F\u5024\u306B\u623B\u3057\u307E\u3059\u304B\uFF1F\u7AEF\u672B\u306E\u8868\u793A\u72B6\u614B\u3068\u4FDD\u5B58\u6E08\u307F\u30CE\u30FC\u30C8\u306F\u4FDD\u6301\u3055\u308C\u307E\u3059\u3002\u8A00\u8A9E\u306E\u9069\u7528\u306B\u306F Obsidian \u3092\u518D\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044\u3002",
  "Default settings restored. Restart Obsidian to apply the language.": "\u521D\u671F\u8A2D\u5B9A\u306B\u623B\u3057\u307E\u3057\u305F\u3002\u8A00\u8A9E\u306E\u9069\u7528\u306B\u306F Obsidian \u3092\u518D\u8D77\u52D5\u3057\u3066\u304F\u3060\u3055\u3044\u3002"
};

// src/locales/ko.json
var ko_default = {
  "A node with its own Markdown line is required.": "\uB3C5\uB9BD\uB41C Markdown \uC904\uC774 \uC788\uB294 \uB178\uB4DC\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "\uBE14\uB85D ID\uAC00 \uC911\uBCF5\uB429\uB2C8\uB2E4. Markdown\uC5D0\uC11C \uC218\uC815\uD55C \uD6C4 \uC8FC\uC18C\uB97C \uBCF5\uC0AC\uD558\uC138\uC694.",
  "A unique block ID is required.": "\uACE0\uC720\uD55C \uBE14\uB85D ID\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.",
  "The selection changed. Run the command again.": "\uC120\uD0DD\uC774 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uBA85\uB839\uC744 \uB2E4\uC2DC \uC2E4\uD589\uD558\uC138\uC694.",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "\uAC00\uC9C0\uB97C \uC790\uAE30 \uC790\uC2E0, \uD558\uC704 \uB178\uB4DC \uB610\uB294 \uD638\uD658\uB418\uC9C0 \uC54A\uB294 Markdown \uB178\uB4DC\uB85C \uC774\uB3D9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "\uD558\uC704 \uC81C\uBAA9 \uB4A4\uC758 \uBAA9\uB85D\uC740 \uD574\uB2F9 \uC81C\uBAA9\uC5D0 \uC18D\uD569\uB2C8\uB2E4. \uBAA9\uB85D \uD56D\uBAA9\uC744 \uBD80\uBAA8\uB85C \uC120\uD0DD\uD558\uAC70\uB098 Markdown \uAD6C\uC870\uB97C \uBCC0\uACBD\uD558\uC138\uC694.",
  "Sibling above": "\uC704\uCABD \uD615\uC81C \uB178\uB4DC",
  "Sibling below": "\uC544\uB798\uCABD \uD615\uC81C \uB178\uB4DC",
  "Child node": "\uC790\uC2DD \uB178\uB4DC",
  "Parent node": "\uBD80\uBAA8 \uB178\uB4DC",
  "Find a map\u2026": "\uB9C8\uC778\uB4DC\uB9F5 \uCC3E\uAE30\u2026",
  "Note name, alias or new link\u2026": "\uB178\uD2B8 \uC774\uB984, \uBCC4\uCE6D \uB610\uB294 \uC0C8 \uB9C1\uD06C\u2026",
  select: "\uC120\uD0DD",
  "insert link": "\uB9C1\uD06C \uC0BD\uC785",
  "return to node": "\uB178\uB4DC\uB85C \uB3CC\uC544\uAC00\uAE30",
  "file not created yet": "\uD30C\uC77C\uC774 \uC544\uC9C1 \uC5C6\uC74C",
  "new link": "\uC0C8 \uB9C1\uD06C",
  "Insert a link without creating a file": "\uD30C\uC77C\uC744 \uB9CC\uB4E4\uC9C0 \uC54A\uACE0 \uB9C1\uD06C \uC0BD\uC785",
  "The file changed or was deleted. Search again.": "\uD30C\uC77C\uC774 \uBCC0\uACBD\uB418\uC5C8\uAC70\uB098 \uC0AD\uC81C\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uB2E4\uC2DC \uAC80\uC0C9\uD558\uC138\uC694.",
  "Link (Ctrl+K)": "\uB9C1\uD06C (Ctrl+K)",
  "Highlight text": "\uD14D\uC2A4\uD2B8 \uAC15\uC870",
  "Mark as question": "\uC9C8\uBB38\uC73C\uB85C \uD45C\uC2DC",
  "Step deadline": "\uB2E8\uACC4 \uB9C8\uAC10\uC77C",
  Date: "\uB0A0\uC9DC",
  " Unknown deadline (?)": " \uB9C8\uAC10\uC77C \uBBF8\uC815 (?)",
  "Previous month": "\uC774\uC804 \uB2EC",
  "Next month": "\uB2E4\uC74C \uB2EC",
  Mon: "\uC6D4",
  Tue: "\uD654",
  Wed: "\uC218",
  Thu: "\uBAA9",
  Fri: "\uAE08",
  Sat: "\uD1A0",
  Sun: "\uC77C",
  Cancel: "\uCDE8\uC18C",
  Save: "\uC800\uC7A5",
  "Enter to save, Esc to cancel.": "Enter\uB85C \uC800\uC7A5, Esc\uB85C \uCDE8\uC18C.",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Enter\uB85C \uD655\uC778, Esc\uB85C \uCDE8\uC18C.",
  "Delete branch": "\uAC00\uC9C0 \uC0AD\uC81C",
  "Extend selection up": "\uC704\uB85C \uC120\uD0DD \uD655\uC7A5",
  "Extend selection down": "\uC544\uB798\uB85C \uC120\uD0DD \uD655\uC7A5",
  "Extend selection to parent": "\uBD80\uBAA8\uB85C \uC120\uD0DD \uD655\uC7A5",
  "Extend selection to child": "\uC790\uC2DD\uC73C\uB85C \uC120\uD0DD \uD655\uC7A5",
  "Select all visible nodes": "\uD45C\uC2DC\uB41C \uBAA8\uB4E0 \uB178\uB4DC \uC120\uD0DD",
  "Cut branch": "\uAC00\uC9C0 \uC798\uB77C\uB0B4\uAE30",
  "Copy link to node": "\uB178\uB4DC \uB9C1\uD06C \uBCF5\uC0AC",
  "Copy branch": "\uAC00\uC9C0 \uBCF5\uC0AC",
  "Paste as child branch": "\uC790\uC2DD \uAC00\uC9C0\uB85C \uBD99\uC5EC\uB123\uAE30",
  "Paste branch after node": "\uB178\uB4DC \uB4A4\uC5D0 \uAC00\uC9C0 \uBD99\uC5EC\uB123\uAE30",
  Undo: "\uC2E4\uD589 \uCDE8\uC18C",
  Redo: "\uB2E4\uC2DC \uC2E4\uD589",
  "Edit node": "\uB178\uB4DC \uD3B8\uC9D1",
  "Add child node": "\uC790\uC2DD \uB178\uB4DC \uCD94\uAC00",
  "Add parent node": "\uBD80\uBAA8 \uB178\uB4DC \uCD94\uAC00",
  "Add sibling above": "\uC704\uC5D0 \uD615\uC81C \uB178\uB4DC \uCD94\uAC00",
  "Add sibling node": "\uD615\uC81C \uB178\uB4DC \uCD94\uAC00",
  "Move branch up": "\uAC00\uC9C0 \uC704\uB85C \uC774\uB3D9",
  "Move branch down": "\uAC00\uC9C0 \uC544\uB798\uB85C \uC774\uB3D9",
  "Make child of previous node": "\uC774\uC804 \uB178\uB4DC\uC758 \uC790\uC2DD\uC73C\uB85C \uB9CC\uB4E4\uAE30",
  "Move up one level": "\uD55C \uB2E8\uACC4 \uC704\uB85C \uC774\uB3D9",
  "Toggle completion": "\uC644\uB8CC \uC0C1\uD0DC \uC804\uD658",
  "Make numbered step": "\uBC88\uD638\uAC00 \uC788\uB294 \uB2E8\uACC4\uB85C \uB9CC\uB4E4\uAE30",
  "Set date": "\uB0A0\uC9DC \uC124\uC815",
  "Open source Markdown": "Markdown \uC6D0\uBB38 \uC5F4\uAE30",
  "Select parent node": "\uBD80\uBAA8 \uB178\uB4DC \uC120\uD0DD",
  "Select child node": "\uC790\uC2DD \uB178\uB4DC \uC120\uD0DD",
  "Select previous sibling": "\uC774\uC804 \uD615\uC81C \uB178\uB4DC \uC120\uD0DD",
  "Select next sibling": "\uB2E4\uC74C \uD615\uC81C \uB178\uB4DC \uC120\uD0DD",
  "Select first node": "\uCCAB \uB178\uB4DC \uC120\uD0DD",
  "Select last node": "\uB9C8\uC9C0\uB9C9 \uB178\uB4DC \uC120\uD0DD",
  "Collapse / expand node": "\uB178\uB4DC \uC811\uAE30 / \uD3BC\uCE58\uAE30",
  "Collapse all roots": "\uBAA8\uB4E0 \uB8E8\uD2B8 \uC811\uAE30",
  "Collapse selected branch": "\uC120\uD0DD\uD55C \uAC00\uC9C0 \uC811\uAE30",
  "Expand selected branch": "\uC120\uD0DD\uD55C \uAC00\uC9C0 \uD3BC\uCE58\uAE30",
  "Selected node only": "\uC120\uD0DD\uD55C \uB178\uB4DC\uB9CC",
  "Show one child level": "\uC790\uC2DD 1\uB2E8\uACC4 \uD45C\uC2DC",
  "Show two child levels": "\uC790\uC2DD 2\uB2E8\uACC4 \uD45C\uC2DC",
  "Show three child levels": "\uC790\uC2DD 3\uB2E8\uACC4 \uD45C\uC2DC",
  "Show four child levels": "\uC790\uC2DD 4\uB2E8\uACC4 \uD45C\uC2DC",
  "Show five child levels": "\uC790\uC2DD 5\uB2E8\uACC4 \uD45C\uC2DC",
  "Expand all child levels": "\uBAA8\uB4E0 \uC790\uC2DD \uB2E8\uACC4 \uD3BC\uCE58\uAE30",
  "Find in map": "\uB9C8\uC778\uB4DC\uB9F5\uC5D0\uC11C \uCC3E\uAE30",
  "Fit map": "\uB9C8\uC778\uB4DC\uB9F5 \uB9DE\uCDA4",
  "Specify a key after the modifiers.": "\uBCF4\uC870 \uD0A4 \uB4A4\uC5D0 \uD0A4\uB97C \uC9C0\uC815\uD558\uC138\uC694.",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "\uBCF4\uC870 \uD0A4: Ctrl, Alt, Shift, Meta \uB610\uB294 Mod.",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "\uBCF4\uC870 \uD0A4\uB97C \uC911\uBCF5\uD558\uC9C0 \uB9C8\uC138\uC694. Mod\uB294 \uC774\uBBF8 Ctrl \uB610\uB294 Cmd\uB97C \uB73B\uD569\uB2C8\uB2E4.",
  "This image format is not supported.": "\uC9C0\uC6D0\uD558\uC9C0 \uC54A\uB294 \uC774\uBBF8\uC9C0 \uD615\uC2DD\uC785\uB2C8\uB2E4.",
  "The clipboard image is empty.": "\uD074\uB9BD\uBCF4\uB4DC \uC774\uBBF8\uC9C0\uAC00 \uBE44\uC5B4 \uC788\uC2B5\uB2C8\uB2E4.",
  "Could not save the attachment.": "\uCCA8\uBD80 \uD30C\uC77C\uC744 \uC800\uC7A5\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "Saving image\u2026": "\uC774\uBBF8\uC9C0 \uC800\uC7A5 \uC911\u2026",
  "Node text": "\uB178\uB4DC \uD14D\uC2A4\uD2B8",
  "Save (Enter)": "\uC800\uC7A5 (Enter)",
  "Cancel (Escape)": "\uCDE8\uC18C (Escape)",
  "Close the editor and discard your changes?": "\uD3B8\uC9D1\uAE30\uB97C \uB2EB\uACE0 \uBCC0\uACBD \uC0AC\uD56D\uC744 \uBC84\uB9B4\uAE4C\uC694?",
  "Continue editing": "\uACC4\uC18D \uD3B8\uC9D1",
  "Discard changes": "\uBCC0\uACBD \uC0AC\uD56D \uBC84\uB9AC\uAE30",
  "A node cannot be empty.": "\uB178\uB4DC\uB294 \uBE44\uC6CC\uB458 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "Multiple cursors are available in source Markdown.": "\uB2E4\uC911 \uCEE4\uC11C\uB294 Markdown \uC6D0\uBB38\uC5D0\uC11C \uC0AC\uC6A9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
  "This command requires the source Markdown editor.": "\uC774 \uBA85\uB839\uC740 Markdown \uC6D0\uBB38 \uD3B8\uC9D1\uAE30\uAC00 \uD544\uC694\uD569\uB2C8\uB2E4.",
  "Fixed width": "\uACE0\uC815 \uB108\uBE44",
  "Fit node content": "\uB178\uB4DC \uB0B4\uC6A9\uC5D0 \uB9DE\uCDA4",
  "Fit visible column": "\uD45C\uC2DC\uB41C \uC5F4\uC5D0 \uB9DE\uCDA4",
  "TraceView Mindmap: open map": "TraceView Mindmap: \uB9C8\uC778\uB4DC\uB9F5 \uC5F4\uAE30",
  "Open current note as a map": "\uD604\uC7AC \uB178\uD2B8\uB97C \uB9C8\uC778\uB4DC\uB9F5\uC73C\uB85C \uC5F4\uAE30",
  "Open map at the Markdown cursor": "Markdown \uCEE4\uC11C \uC704\uCE58\uC5D0\uC11C \uB9C8\uC778\uB4DC\uB9F5 \uC5F4\uAE30",
  "Find a map": "\uB9C8\uC778\uB4DC\uB9F5 \uCC3E\uAE30",
  "Create a simple tree": "\uAC04\uB2E8\uD55C \uD2B8\uB9AC \uB9CC\uB4E4\uAE30",
  "Create a vector (separate template)": "\uBCA1\uD130 \uB9CC\uB4E4\uAE30 (\uBCC4\uB3C4 \uD15C\uD50C\uB9BF)",
  "Steps, deadlines and QA": "\uB2E8\uACC4, \uB9C8\uAC10\uC77C \uBC0F QA",
  "Mark as atomic step": "\uCD5C\uC18C \uB2E8\uC704 \uB2E8\uACC4\uB85C \uD45C\uC2DC",
  "Add step deadline": "\uB2E8\uACC4 \uB9C8\uAC10\uC77C \uCD94\uAC00",
  "Mark as QA": "QA\uB85C \uD45C\uC2DC",
  "Toggle step completion": "\uB2E8\uACC4 \uC644\uB8CC \uC0C1\uD0DC \uC804\uD658",
  "Paste as sibling branch": "\uD615\uC81C \uAC00\uC9C0\uB85C \uBD99\uC5EC\uB123\uAE30",
  "Undo map change": "\uB9C8\uC778\uB4DC\uB9F5 \uBCC0\uACBD \uCDE8\uC18C",
  "Redo map change": "\uB9C8\uC778\uB4DC\uB9F5 \uBCC0\uACBD \uB2E4\uC2DC \uC2E4\uD589",
  "Insert QA in Markdown editor": "Markdown \uD3B8\uC9D1\uAE30\uC5D0 QA \uC0BD\uC785",
  "Insert unnumbered step in Markdown editor": "Markdown \uD3B8\uC9D1\uAE30\uC5D0 \uBC88\uD638 \uC5C6\uB294 \uB2E8\uACC4 \uC0BD\uC785",
  "Open map at this node": "\uC774 \uB178\uB4DC\uC5D0\uC11C \uB9C8\uC778\uB4DC\uB9F5 \uC5F4\uAE30",
  "Open in TraceView Mindmap": "TraceView Mindmap\uC5D0\uC11C \uC5F4\uAE30",
  "The note changed. Open it again at the current line.": "\uB178\uD2B8\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uD604\uC7AC \uC904\uC5D0\uC11C \uB2E4\uC2DC \uC5EC\uC138\uC694.",
  "Save or cancel the node draft.": "\uB178\uB4DC \uCD08\uC548\uC744 \uC800\uC7A5\uD558\uAC70\uB098 \uCDE8\uC18C\uD558\uC138\uC694.",
  "New vector name": "\uC0C8 \uBCA1\uD130 \uC774\uB984",
  "New tree name": "\uC0C8 \uD2B8\uB9AC \uC774\uB984",
  "Use a name without path characters.": "\uACBD\uB85C \uBB38\uC790\uAC00 \uC5C6\uB294 \uC774\uB984\uC744 \uC0AC\uC6A9\uD558\uC138\uC694.",
  "A file with this name already exists.": "\uAC19\uC740 \uC774\uB984\uC758 \uD30C\uC77C\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4.",
  "The Markdown editor has newer text. Wait for it to save and try again.": "Markdown \uD3B8\uC9D1\uAE30\uC5D0 \uB354 \uCD5C\uC2E0 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uC800\uC7A5 \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
  "Branch copied": "\uAC00\uC9C0\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4",
  "Branch saved to the plugin clipboard": "\uD50C\uB7EC\uADF8\uC778 \uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uAC00\uC9C0\uB97C \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uC811\uADFC\uD560 \uC218 \uC5C6\uC5B4 \uC798\uB77C\uB0B4\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4. \uC811\uADFC\uC744 \uD5C8\uC6A9\uD55C \uD6C4 \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "\uD074\uB9BD\uBCF4\uB4DC\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \u22EF \uBA54\uB274\uC758 \u2018\uAC00\uC9C0 \uD14D\uC2A4\uD2B8 \uBD99\uC5EC\uB123\uAE30\u2019\uB97C \uC0AC\uC6A9\uD558\uC138\uC694.",
  "Save or cancel the node draft before navigating.": "\uC774\uB3D9 \uC804\uC5D0 \uCD08\uC548\uC744 \uC800\uC7A5\uD558\uAC70\uB098 \uCDE8\uC18C\uD558\uC138\uC694.",
  "Waiting for Obsidian to be ready\u2026": "Obsidian \uC900\uBE44 \uB300\uAE30 \uC911\u2026",
  "Wait for Obsidian to load, then open the map.": "Obsidian \uB85C\uB529 \uD6C4 \uB9C8\uC778\uB4DC\uB9F5\uC744 \uC5EC\uC138\uC694.",
  "This address is duplicated. Fix the block ID in Markdown.": "\uC8FC\uC18C\uAC00 \uC911\uBCF5\uB429\uB2C8\uB2E4. Markdown\uC5D0\uC11C \uBE14\uB85D ID\uB97C \uC218\uC815\uD558\uC138\uC694.",
  "The linked node was not found.": "\uB9C1\uD06C\uB41C \uB178\uB4DC\uB97C \uCC3E\uC744 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "Collapse levels": "\uC811\uAE30 \uB2E8\uACC4",
  "Delete selected branch": "\uC120\uD0DD\uD55C \uAC00\uC9C0 \uC0AD\uC81C",
  "Sibling node": "\uD615\uC81C \uB178\uB4DC",
  Edit: "\uD3B8\uC9D1",
  "Multiple selection: taps or rectangle": "\uB2E4\uC911 \uC120\uD0DD: \uD0ED \uB610\uB294 \uC0AC\uAC01\uD615",
  Search: "\uAC80\uC0C9",
  "Layout and node width": "\uB808\uC774\uC544\uC6C3 \uBC0F \uB178\uB4DC \uB108\uBE44",
  "Map actions": "\uB9C8\uC778\uB4DC\uB9F5 \uC791\uC5C5",
  "Open now": "\uC9C0\uAE08 \uC5F4\uAE30",
  Map: "\uB9C8\uC778\uB4DC\uB9F5",
  Outline: "\uAC1C\uC694",
  Table: "\uD45C",
  "Expand entire map": "\uC804\uCCB4 \uB9C8\uC778\uB4DC\uB9F5 \uD3BC\uCE58\uAE30",
  "All child levels": "\uBAA8\uB4E0 \uC790\uC2DD \uB2E8\uACC4",
  "The map will open after the workspace loads\u2026": "\uC791\uC5C5 \uACF5\uAC04 \uB85C\uB529 \uD6C4 \uB9C8\uC778\uB4DC\uB9F5\uC774 \uC5F4\uB9BD\uB2C8\uB2E4\u2026",
  "File missing or deleted. Open another map.": "\uD30C\uC77C\uC774 \uC5C6\uAC70\uB098 \uC0AD\uC81C\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uB2E4\uB978 \uB9C8\uC778\uB4DC\uB9F5\uC744 \uC5EC\uC138\uC694.",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "\uB9C8\uC778\uB4DC\uB9F5\uC774 \uBCC0\uACBD\uB418\uC5C8\uAC70\uB098 \uC800\uC7A5 \uC911\uC785\uB2C8\uB2E4. \uCD08\uC548\uC740 \uC785\uB825\uB780\uC5D0 \uB0A8\uC544 \uC788\uC2B5\uB2C8\uB2E4. \uCDE8\uC18C \uC804\uC5D0 \uBCF5\uC0AC\uD558\uACE0 \uD604\uC7AC \uB9C8\uC778\uB4DC\uB9F5\uC5D0\uC11C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
  "The file no longer exists.": "\uD30C\uC77C\uC774 \uB354 \uC774\uC0C1 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
  "Select a map node first": "\uBA3C\uC800 \uB178\uB4DC\uB97C \uC120\uD0DD\uD558\uC138\uC694",
  "Another map is open. The selection was copied, but not cut.": "\uB2E4\uB978 \uB9C8\uC778\uB4DC\uB9F5\uC774 \uC5F4\uB838\uC2B5\uB2C8\uB2E4. \uC120\uD0DD \uD56D\uBAA9\uC740 \uBCF5\uC0AC\uB418\uC5C8\uC9C0\uB9CC \uC798\uB77C\uB0B4\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",
  "This command requires one selected node.": "\uC774 \uBA85\uB839\uC740 \uB178\uB4DC \uD558\uB098\uB97C \uC120\uD0DD\uD574\uC57C \uD569\uB2C8\uB2E4.",
  "The map was closed or renamed. Copy the address again.": "\uB9C8\uC778\uB4DC\uB9F5\uC774 \uB2EB\uD614\uAC70\uB098 \uC774\uB984\uC774 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uC8FC\uC18C\uB97C \uB2E4\uC2DC \uBCF5\uC0AC\uD558\uC138\uC694.",
  "Node link copied.": "\uB178\uB4DC \uB9C1\uD06C\uB97C \uBCF5\uC0AC\uD588\uC2B5\uB2C8\uB2E4.",
  "Another map is open. The branch was copied, but not cut.": "\uB2E4\uB978 \uB9C8\uC778\uB4DC\uB9F5\uC774 \uC5F4\uB838\uC2B5\uB2C8\uB2E4. \uAC00\uC9C0\uB294 \uBCF5\uC0AC\uB418\uC5C8\uC9C0\uB9CC \uC798\uB77C\uB0B4\uC9C0 \uC54A\uC558\uC2B5\uB2C8\uB2E4.",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "\uAC00\uC9C0\uB97C \uC798\uB77C\uB0C8\uC2B5\uB2C8\uB2E4. Ctrl+V\uB85C \uBD99\uC5EC\uB123\uACE0 \uC2E4\uD589 \uCDE8\uC18C\uB85C \uBCF5\uC6D0\uD569\uB2C8\uB2E4.",
  "The note was renamed. Copy the draft and reopen the editor.": "\uB178\uD2B8 \uC774\uB984\uC774 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uCD08\uC548\uC744 \uBCF5\uC0AC\uD558\uACE0 \uD3B8\uC9D1\uAE30\uB97C \uB2E4\uC2DC \uC5EC\uC138\uC694.",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "\uB9C8\uC778\uB4DC\uB9F5\uC774 \uC678\uBD80\uC5D0\uC11C \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uCD08\uC548\uC740 \uBCF4\uC874\uB429\uB2C8\uB2E4. \uB2E4\uC2DC \uD3B8\uC9D1\uD558\uAE30 \uC804\uC5D0 \uBCF5\uC0AC\uD558\uC138\uC694.",
  "The node no longer exists. Your draft is preserved.": "\uB178\uB4DC\uAC00 \uB354 \uC774\uC0C1 \uC5C6\uC2B5\uB2C8\uB2E4. \uCD08\uC548\uC740 \uBCF4\uC874\uB429\uB2C8\uB2E4.",
  "Steps \xB7 Deadlines \xB7 QA": "\uB2E8\uACC4 \xB7 \uB9C8\uAC10\uC77C \xB7 QA",
  "Step deadline\u2026": "\uB2E8\uACC4 \uB9C8\uAC10\uC77C\u2026",
  "Completed / incomplete": "\uC644\uB8CC / \uBBF8\uC644\uB8CC",
  "Move up": "\uC704\uB85C \uC774\uB3D9",
  "Move down": "\uC544\uB798\uB85C \uC774\uB3D9",
  "Nest in previous branch": "\uC774\uC804 \uAC00\uC9C0 \uC548\uC73C\uB85C \uC774\uB3D9",
  "Open text in editor": "\uD3B8\uC9D1\uAE30\uC5D0\uC11C \uD14D\uC2A4\uD2B8 \uC5F4\uAE30",
  "Delete branch\u2026": "\uAC00\uC9C0 \uC0AD\uC81C\u2026",
  "Export HTML\u2026": "HTML \uB0B4\uBCF4\uB0B4\uAE30\u2026",
  "Export SVG\u2026": "SVG \uB0B4\uBCF4\uB0B4\uAE30\u2026",
  "Paste branch text\u2026": "\uAC00\uC9C0 \uD14D\uC2A4\uD2B8 \uBD99\uC5EC\uB123\uAE30\u2026",
  "Paste child Markdown branch": "Markdown \uC790\uC2DD \uAC00\uC9C0 \uBD99\uC5EC\uB123\uAE30",
  "Renumber steps": "\uB2E8\uACC4 \uBC88\uD638 \uB2E4\uC2DC \uB9E4\uAE30\uAE30",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "\uB300\uC0C1 \uB9C8\uC778\uB4DC\uB9F5\uC774 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uB9C1\uD06C \uC81C\uC548\uC744 \uB2E4\uC2DC \uC5EC\uC138\uC694. \uCD08\uC548\uC740 \uBCF4\uC874\uB429\uB2C8\uB2E4.",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "\uC774 \uBE14\uB85D\uC740 \uBCC4\uB3C4 \uB178\uB4DC\uAC00 \uC544\uB2D9\uB2C8\uB2E4. \u2018\uB178\uB4DC \uB9C1\uD06C \uBCF5\uC0AC\u2019\uB97C \uC0AC\uC6A9\uD558\uC138\uC694.",
  "Native editor unavailable. Using text input. ": "\uAE30\uBCF8 \uD3B8\uC9D1\uAE30\uB97C \uC0AC\uC6A9\uD560 \uC218 \uC5C6\uC5B4 \uD14D\uC2A4\uD2B8 \uC785\uB825\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4. ",
  "The note does not exist.": "\uB178\uD2B8\uAC00 \uC874\uC7AC\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
  "File already exists. Choose another name.": "\uD30C\uC77C\uC774 \uC774\uBBF8 \uC788\uC2B5\uB2C8\uB2E4. \uB2E4\uB978 \uC774\uB984\uC744 \uC120\uD0DD\uD558\uC138\uC694.",
  Steps: "\uB2E8\uACC4",
  Deadlines: "\uB9C8\uAC10\uC77C",
  "Open QA": "\uBBF8\uD574\uACB0 QA",
  Refresh: "\uC0C8\uB85C \uACE0\uCE68",
  "Collapse all": "\uBAA8\uB450 \uC811\uAE30",
  "Expand all": "\uBAA8\uB450 \uD3BC\uCE58\uAE30",
  "Search steps": "\uB2E8\uACC4 \uAC80\uC0C9",
  "Find\u2026": "\uCC3E\uAE30\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "\uC815\uB82C\uC740 \uD55C \uD30C\uC77C\uC758 \uB2E8\uACC4 \uBC88\uD638\uB9CC \uBCC0\uACBD\uD569\uB2C8\uB2E4. \uAC00\uC9C0 \uC704\uCE58\uB294 \uC720\uC9C0\uB429\uB2C8\uB2E4. \uB0A0\uC9DC\uAC00 \uC788\uAC70\uB098 \uBC88\uD638\uAC00 \uC5C6\uB294 \uB2E8\uACC4\uB294 \uBCC4\uB3C4\uB85C \uC815\uB82C\uB429\uB2C8\uB2E4.",
  Expand: "\uD3BC\uCE58\uAE30",
  Collapse: "\uC811\uAE30",
  "No open items match this filter.": "\uC774 \uD544\uD130\uC5D0 \uB9DE\uB294 \uBBF8\uC644\uB8CC \uD56D\uBAA9\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "Mark completed": "\uC644\uB8CC\uB85C \uD45C\uC2DC",
  "Move earlier in execution order": "\uC2E4\uD589 \uC21C\uC11C \uC55E\uB2F9\uAE30\uAE30",
  "Move later in execution order": "\uC2E4\uD589 \uC21C\uC11C \uB4A4\uB85C \uBBF8\uB8E8\uAE30",
  "Deadline ?": "\uB9C8\uAC10\uC77C ?",
  "Node editor": "\uB178\uB4DC \uD3B8\uC9D1\uAE30",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "\uB2E4\uC74C \uD3B8\uC9D1\uBD80\uD130 \uC801\uC6A9\uB429\uB2C8\uB2E4. \uAE30\uBCF8 \uBAA8\uB4DC\uB294 Obsidian \uC2E4\uC2DC\uAC04 \uBBF8\uB9AC\uBCF4\uAE30\uC640 \uC81C\uC548\uC744 \uC0AC\uC6A9\uD558\uBA70, \uD544\uC694\uD558\uBA74 \uD14D\uC2A4\uD2B8 \uC785\uB825\uC73C\uB85C \uC804\uD658\uD569\uB2C8\uB2E4.",
  "Native Obsidian": "Obsidian \uAE30\uBCF8",
  "Text input": "\uD14D\uC2A4\uD2B8 \uC785\uB825",
  "Automatically restore large maps": "\uD070 \uB9C8\uC778\uB4DC\uB9F5 \uC790\uB3D9 \uBCF5\uC6D0",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "\uC2DC\uC791 \uC2DC \uD65C\uC131 \uB9C8\uC778\uB4DC\uB9F5\uC740 Obsidian \uC751\uB2F5\uC774 \uC548\uC815\uB420 \uB54C\uAE4C\uC9C0 \uAE30\uB2E4\uB9BD\uB2C8\uB2E4. \u2018\uC9C0\uAE08 \uC5F4\uAE30\u2019\uB85C \uAC74\uB108\uB701\uB2C8\uB2E4.",
  "Hide frozen steps": "\uB3D9\uACB0\uB41C \uB2E8\uACC4 \uC228\uAE30\uAE30",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "\uB2E8\uACC4\uC640 \uB9C8\uAC10\uC77C \uBAA9\uB85D\uC5D0\uC11C \u{1F9CA} \uAC00\uC9C0\uB97C \uC81C\uC678\uD569\uB2C8\uB2E4. \uB9C8\uC778\uB4DC\uB9F5\uC740 \uBAA8\uB4E0 \uD14D\uC2A4\uD2B8\uB97C \uD45C\uC2DC\uD569\uB2C8\uB2E4.",
  "Left arrow collapses the branch first": "\uC67C\uCABD \uD654\uC0B4\uD45C\uB85C \uBA3C\uC800 \uAC00\uC9C0 \uC811\uAE30",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "\uB054: \uBC14\uB85C \uBD80\uBAA8\uB85C \uC774\uB3D9. \uCF2C: \uC5F4\uB9B0 \uAC00\uC9C0\uB97C \uC811\uACE0, \uB2E4\uC2DC \uB204\uB974\uBA74 \uBD80\uBAA8\uB97C \uC120\uD0DD\uD569\uB2C8\uB2E4.",
  "Show [ ] in list text": "\uBAA9\uB85D \uD14D\uC2A4\uD2B8\uC5D0 [ ] \uD45C\uC2DC",
  "Show #step in list text": "\uBAA9\uB85D \uD14D\uC2A4\uD2B8\uC5D0 #step \uD45C\uC2DC",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "\uB2E8\uACC4 \xB7 \uB9C8\uAC10\uC77C \xB7 QA \uD45C\uC2DC\uC5D0\uB9CC \uC801\uC6A9\uB429\uB2C8\uB2E4. \uB178\uD2B8 \uB0B4\uC6A9\uACFC \uC644\uB8CC \uAE30\uB2A5\uC740 \uC720\uC9C0\uB429\uB2C8\uB2E4.",
  "Map node width": "\uB9C8\uC778\uB4DC\uB9F5 \uB178\uB4DC \uB108\uBE44",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "\uC5F4\uB9B0 \uBAA8\uB4E0 \uB9C8\uC778\uB4DC\uB9F5\uC5D0 \uC989\uC2DC \uC801\uC6A9\uB429\uB2C8\uB2E4. \uAC1C\uC694\uC640 \uD45C\uB294 \uC790\uCCB4 \uB108\uBE44\uB97C \uC720\uC9C0\uD569\uB2C8\uB2E4.",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "\uC811\uAE30\uC640 \uCE74\uBA54\uB77C\uB294 \uC774 \uAE30\uAE30\uC5D0 \uC800\uC7A5\uB429\uB2C8\uB2E4. \uBCF4\uAE30\uB9CC\uC73C\uB85C Markdown\uC744 \uC218\uC815\uD558\uAC70\uB098 \uC228\uACA8\uC9C4 ID\uB97C \uCD94\uAC00\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4. Windows\uC640 Android\uB294 \uC11C\uB85C \uB2E4\uB978 \uBCF4\uAE30 \uC0C1\uD0DC\uB97C \uC720\uC9C0\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "\uAE30\uBCF8 \uC785\uB825\uC740 Obsidian \uD3B8\uC9D1\uAE30\uB97C, \uD14D\uC2A4\uD2B8 \uC785\uB825\uC740 Editor API\uB97C \uC0AC\uC6A9\uD569\uB2C8\uB2E4. \uC804\uCCB4 Markdown \uBCF4\uAE30\uAC00 \uD544\uC694\uD55C \uBA85\uB839\uC740 \u22EF \u2192 \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uD14D\uC2A4\uD2B8 \uC5F4\uAE30\uB97C \uC0AC\uC6A9\uD558\uC138\uC694.",
  "Map hotkeys": "\uB9C8\uC778\uB4DC\uB9F5 \uB2E8\uCD95\uD0A4",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "\uBCC0\uACBD\uC740 \uBAA8\uB4E0 \uB9C8\uC778\uB4DC\uB9F5\uC5D0 \uC989\uC2DC \uC801\uC6A9\uB429\uB2C8\uB2E4. \u2328 \uB2E4\uC74C \uB2E8\uCD95\uD0A4\uB97C \uB204\uB974\uAC70\uB098 Ctrl+C, Alt+Shift+1\uCC98\uB7FC \uC785\uB825\uD558\uC138\uC694. \uB300\uC548\uC740 \uC27C\uD45C\uB85C \uAD6C\uBD84\uD569\uB2C8\uB2E4. \xD7\uB294 \uBE44\uD65C\uC131\uD654, \u21BA\uB294 \uAE30\uBCF8\uAC12 \uBCF5\uC6D0\uC785\uB2C8\uB2E4. \uD3B8\uC9D1 \uC911\uC5D0\uB294 \uC77C\uBC18 \uD3B8\uC9D1\uAE30 \uB2E8\uCD95\uD0A4\uAC00 \uC801\uC6A9\uB429\uB2C8\uB2E4.",
  Unassigned: "\uBBF8\uC9C0\uC815",
  "Record shortcut": "\uB2E8\uCD95\uD0A4 \uAE30\uB85D",
  Disable: "\uBE44\uD65C\uC131\uD654",
  "Default shortcuts": "\uAE30\uBCF8 \uB2E8\uCD95\uD0A4",
  "Search map\u2026": "\uB9C8\uC778\uB4DC\uB9F5 \uAC80\uC0C9\u2026",
  "Search map": "\uB9C8\uC778\uB4DC\uB9F5 \uAC80\uC0C9",
  " A\u2013Z": " \uC774\uB984\uC21C",
  "Close search": "\uAC80\uC0C9 \uB2EB\uAE30",
  "Search results": "\uAC80\uC0C9 \uACB0\uACFC",
  "No results": "\uACB0\uACFC \uC5C6\uC74C",
  "This Obsidian version has no compatible native editor.": "\uC774 Obsidian \uBC84\uC804\uC5D0\uB294 \uD638\uD658\uB418\uB294 \uAE30\uBCF8 \uD3B8\uC9D1\uAE30\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "Could not prepare the native editor.": "\uAE30\uBCF8 \uD3B8\uC9D1\uAE30\uB97C \uC900\uBE44\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "The native editor cannot protect a single-line draft.": "\uAE30\uBCF8 \uD3B8\uC9D1\uAE30\uC5D0\uC11C \uD55C \uC904 \uCD08\uC548\uC744 \uBCF4\uD638\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "Native Obsidian link": "Obsidian \uAE30\uBCF8 \uB9C1\uD06C",
  "Map filter": "\uB9C8\uC778\uB4DC\uB9F5 \uD544\uD130",
  "All maps": "\uBAA8\uB4E0 \uB9C8\uC778\uB4DC\uB9F5",
  Maps: "\uB9C8\uC778\uB4DC\uB9F5",
  "No maps match this search.": "\uAC80\uC0C9\uACFC \uC77C\uCE58\uD558\uB294 \uB9C8\uC778\uB4DC\uB9F5\uC774 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "\uB2E4\uB978 \uCC3D\uC774\uB098 \uAE30\uAE30\uC5D0\uC11C \uB178\uD2B8\uAC00 \uBCC0\uACBD\uB418\uC5C8\uC2B5\uB2C8\uB2E4. \uB9C8\uC778\uB4DC\uB9F5\uC744 \uC0C8\uB85C \uACE0\uCCE4\uC2B5\uB2C8\uB2E4. \uCD5C\uC2E0 \uB0B4\uC6A9\uC5D0\uC11C \uB2E4\uC2DC \uC2DC\uB3C4\uD558\uC138\uC694.",
  "History stopped because the text changed externally. Undo will preserve those changes.": "\uC678\uBD80 \uD14D\uC2A4\uD2B8 \uBCC0\uACBD\uC73C\uB85C \uAE30\uB85D\uC744 \uC911\uC9C0\uD588\uC2B5\uB2C8\uB2E4. \uC2E4\uD589 \uCDE8\uC18C\uB294 \uD574\uB2F9 \uBCC0\uACBD\uC744 \uBCF4\uC874\uD569\uB2C8\uB2E4.",
  "Loading map\u2026": "\uB9C8\uC778\uB4DC\uB9F5 \uB85C\uB529 \uC911\u2026",
  "Node address: ^": "\uB178\uB4DC \uC8FC\uC18C: ^",
  "Branch ready to move": "\uAC00\uC9C0\uB97C \uC774\uB3D9\uD560 \uC218 \uC788\uC2B5\uB2C8\uB2E4",
  "Before: ": "\uC55E: ",
  "After: ": "\uB4A4: ",
  "As children: ": "\uC790\uC2DD\uC73C\uB85C: ",
  "Expand node": "\uB178\uB4DC \uD3BC\uCE58\uAE30",
  "Collapse node": "\uB178\uB4DC \uC811\uAE30",
  "Collapse branch": "\uAC00\uC9C0 \uC811\uAE30",
  "Expand branch": "\uAC00\uC9C0 \uD3BC\uCE58\uAE30",
  "Paste after node": "\uB178\uB4DC \uB4A4\uC5D0 \uBD99\uC5EC\uB123\uAE30",
  Language: "\uC5B8\uC5B4",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "\uC790\uB3D9\uC740 Obsidian \uC5B8\uC5B4\uB97C \uB530\uB985\uB2C8\uB2E4. \uBCC0\uACBD\uC744 \uC801\uC6A9\uD558\uB824\uBA74 Obsidian\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.",
  "Automatic (Obsidian)": "\uC790\uB3D9 (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "\uC5B8\uC5B4\uB97C \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4. Obsidian\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.",
  "Selected nodes: {count}": "\uC120\uD0DD\uD55C \uB178\uB4DC: {count}",
  "Child levels: {count}": "\uC790\uC2DD \uB2E8\uACC4: {count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "\uB178\uB4DC: {nodes} \xB7 \uBBF8\uC644\uB8CC \uB2E8\uACC4: {steps}",
  "Export {format} \u2014 file name": "{format} \uB0B4\uBCF4\uB0B4\uAE30 \u2014 \uD30C\uC77C \uC774\uB984",
  "Saved {path}": "\uC800\uC7A5\uB428: {path}",
  "Expand map: {name}": "\uB9C8\uC778\uB4DC\uB9F5 \uD3BC\uCE58\uAE30: {name}",
  "Collapse map: {name}": "\uB9C8\uC778\uB4DC\uB9F5 \uC811\uAE30: {name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "\uB2E8\uCD95\uD0A4 \uCDA9\uB3CC: {shortcuts}. \uBAA9\uB85D\uC758 \uCCAB \uBA85\uB839\uC774 \uC6B0\uC120\uD569\uB2C8\uB2E4.",
  "Next action": "\uB2E4\uC74C \uD589\uB3D9",
  "First action": "\uCCAB \uD589\uB3D9",
  "Active now": "\uD604\uC7AC \uC9C4\uD589 \uC911",
  "Frozen / someday": "\uB3D9\uACB0 / \uC5B8\uC820\uAC00",
  "First step": "\uCCAB \uB2E8\uACC4",
  "{path} \xB7 References: {count}": "{path} \xB7 \uCC38\uC870: {count}",
  "Attachment saved, but the editor is already closed: {link}": "\uCCA8\uBD80 \uD30C\uC77C\uC740 \uC800\uC7A5\uB418\uC5C8\uC9C0\uB9CC \uD3B8\uC9D1\uAE30\uAC00 \uC774\uBBF8 \uB2EB\uD614\uC2B5\uB2C8\uB2E4: {link}",
  "Copy selection": "\uC120\uD0DD \uD56D\uBAA9 \uBCF5\uC0AC",
  "Cut selection": "\uC120\uD0DD \uD56D\uBAA9 \uC798\uB77C\uB0B4\uAE30",
  "Delete selection": "\uC120\uD0DD \uD56D\uBAA9 \uC0AD\uC81C",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "\uC804\uCCB4 \uB9C8\uC778\uB4DC\uB9F5 \xB7 \uB178\uB4DC {count}\uAC1C \xB7 \uC77D\uAE30 \uC804\uC6A9 \uB0B4\uBCF4\uB0B4\uAE30. \uAC00\uC9C0 \uD45C\uC2DC\uB97C \uC120\uD0DD\uD558\uBA74 \uC811\uD799\uB2C8\uB2E4. \uB808\uC774\uBE14\uC740 Markdown\uC744 \uC720\uC9C0\uD569\uB2C8\uB2E4. \uBCF4\uAD00\uD568 \uB9C1\uD06C\uC640 \uCCA8\uBD80 \uD30C\uC77C\uC740 Obsidian\uC774 \uD544\uC694\uD569\uB2C8\uB2E4.",
  "This map contains no outline nodes.": "\uC774 \uB9C8\uC778\uB4DC\uB9F5\uC5D0\uB294 \uAC1C\uC694 \uB178\uB4DC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "This node no longer exists. Reopen the map and try again.": "\uB178\uB4DC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uB9C8\uC778\uB4DC\uB9F5\uC744 \uB2E4\uC2DC \uC5EC\uC138\uC694.",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "\uB178\uB4DC\uB294 \uD55C \uC904\uC774\uC5B4\uC57C \uD569\uB2C8\uB2E4. \uCD94\uAC00 \uB0B4\uC6A9\uC740 \uC790\uC2DD \uB178\uB4DC\uB098 \uC5F0\uACB0 \uB178\uD2B8\uB97C \uC0AC\uC6A9\uD558\uC138\uC694.",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "\uC774 \uD14D\uC2A4\uD2B8\uB294 \uCF54\uB4DC \uBE14\uB85D\uC774\uB098 \uAD6C\uBD84\uC120\uC774 \uB429\uB2C8\uB2E4. \uAE30\uD638\uB97C \uC774\uC2A4\uCF00\uC774\uD504\uD558\uAC70\uB098 \uC6D0\uBB38\uC5D0\uC11C \uD3B8\uC9D1\uD558\uC138\uC694.",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown \uC81C\uBAA9\uC740 6\uB2E8\uACC4\uAE4C\uC9C0 \uC9C0\uC6D0\uD569\uB2C8\uB2E4. \uC6D0\uBB38\uC5D0\uC11C \uC790\uC2DD \uBAA9\uB85D\uC744 \uCD94\uAC00\uD558\uC138\uC694.",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "\uC774 \uD14D\uC2A4\uD2B8\uB294 Markdown \uBD80\uBAA8 \uB178\uB4DC\uB85C \uC4F8 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uAE30\uD638\uB97C \uC774\uC2A4\uCF00\uC774\uD504\uD558\uAC70\uB098 \uC6D0\uBB38\uC5D0\uC11C \uD3B8\uC9D1\uD558\uC138\uC694.",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "\uAC00\uC9C0\uC5D0 \uB178\uB4DC \uBC16\uC758 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uB0B4\uC6A9\uC744 \uBCF4\uC874\uD558\uB824\uBA74 \uC6D0\uBB38\uC5D0\uC11C \uAD6C\uC870\uB97C \uD3B8\uC9D1\uD558\uC138\uC694.",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "\uB4E4\uC5EC\uC4F0\uAE30\uAC00 \uBAA8\uD638\uD569\uB2C8\uB2E4. \uC774\uB3D9 \uC804\uC5D0 \uC6D0\uBB38\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.",
  "That move would exceed Markdown\u2019s six heading levels.": "\uC774\uB3D9\uD558\uBA74 \uC81C\uBAA9 6\uB2E8\uACC4 \uC81C\uD55C\uC744 \uCD08\uACFC\uD569\uB2C8\uB2E4.",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "\uC81C\uBAA9\uACFC \uBAA9\uB85D \uC0AC\uC774\uC758 \uC774\uB3D9\uC740 \uC758\uBBF8\uB97C \uBC14\uAFC9\uB2C8\uB2E4. \uC6D0\uBB38\uC5D0\uC11C \uC218\uC815\uD558\uC138\uC694.",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "\uC81C\uBAA9\uACFC \uBAA9\uB85D\uC774 \uC11E\uC778 \uB4E4\uC5EC\uC4F0\uAE30\uB294 \uBAA8\uD638\uD569\uB2C8\uB2E4. \uC6D0\uBB38\uC744 \uC0AC\uC6A9\uD558\uC138\uC694.",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "\uC81C\uBAA9 \uC544\uB798 \uBAA9\uB85D\uC758 \uB0B4\uC5B4\uC4F0\uAE30\uB294 \uD615\uC2DD \uBCC0\uACBD\uC774 \uD544\uC694\uD569\uB2C8\uB2E4. \uC6D0\uBB38\uC744 \uC0AC\uC6A9\uD558\uC138\uC694.",
  "A branch cannot be moved into itself or one of its descendants.": "\uAC00\uC9C0\uB97C \uC790\uC2E0\uC774\uB098 \uD558\uC704 \uB178\uB4DC\uB85C \uC774\uB3D9\uD560 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4.",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "\uC81C\uBAA9\uC740 \uBAA9\uB85D\uC758 \uC790\uC2DD\uC774 \uB420 \uC218 \uC5C6\uC2B5\uB2C8\uB2E4. \uC6D0\uBB38\uC5D0\uC11C \uD615\uC2DD\uC744 \uBA3C\uC800 \uBC14\uAFB8\uC138\uC694.",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "\uD558\uC704 \uC81C\uBAA9 \uB4A4\uC758 \uBAA9\uB85D\uC740 \uADF8 \uC81C\uBAA9\uC5D0 \uC18D\uD569\uB2C8\uB2E4. \uBAA9\uB85D \uBD80\uBAA8\uB97C \uC120\uD0DD\uD558\uAC70\uB098 \uAD6C\uC870\uB97C \uBC14\uAFB8\uC138\uC694.",
  "Paste an outline branch, or paste one line as a new node.": "\uAC1C\uC694 \uAC00\uC9C0\uB098 \uC0C8 \uB178\uB4DC\uB85C \uC4F8 \uD55C \uC904\uC744 \uBD99\uC5EC\uB123\uC73C\uC138\uC694.",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "\uBAA9\uB85D\uC740 \uBAA9\uB85D \uC606\uC5D0, \uC81C\uBAA9\uC740 \uC81C\uBAA9 \uC606\uC5D0 \uBD99\uC5EC\uB123\uC73C\uC138\uC694. \uD615\uC2DD\uC740 \uC6D0\uBB38\uC5D0\uC11C \uBCC0\uD658\uD558\uC138\uC694.",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "\uD074\uB9BD\uBCF4\uB4DC\uC5D0 \uAC1C\uC694 \uBC16\uC758 \uB0B4\uC6A9\uC774 \uC788\uC2B5\uB2C8\uB2E4. \uBCF4\uC874\uD558\uB824\uBA74 \uC6D0\uBB38\uC5D0 \uBD99\uC5EC\uB123\uC73C\uC138\uC694.",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "\uB0A0\uC9DC\uB294 YYYY-MM-DD, \uBBF8\uC815\uC740 ?\uB97C \uC0AC\uC6A9\uD558\uC138\uC694.",
  "That calendar date does not exist.": "\uC874\uC7AC\uD558\uC9C0 \uC54A\uB294 \uB0A0\uC9DC\uC785\uB2C8\uB2E4.",
  "The execution order contains the same step twice.": "\uC2E4\uD589 \uC21C\uC11C\uC5D0 \uAC19\uC740 \uB2E8\uACC4\uAC00 \uB450 \uBC88 \uC788\uC2B5\uB2C8\uB2E4.",
  "Only numbered, undated steps can be placed in an execution order.": "\uB0A0\uC9DC \uC5C6\uB294 \uBC88\uD638 \uB2E8\uACC4\uB9CC \uC2E4\uD589 \uC21C\uC11C\uC5D0 \uB123\uC744 \uC218 \uC788\uC2B5\uB2C8\uB2E4.",
  Untitled: "\uC81C\uBAA9 \uC5C6\uC74C",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "\uB178\uB4DC\uAC00 \uC5C6\uC2B5\uB2C8\uB2E4. \uC6D0\uBB38\uC5D0\uC11C \uC81C\uBAA9\uC774\uB098 \uBAA9\uB85D \uD56D\uBAA9\uC744 \uCD94\uAC00\uD558\uC138\uC694.",
  "Mark incomplete": "\uBBF8\uC644\uB8CC\uB85C \uD45C\uC2DC",
  "Invalid saved map patterns. Default patterns are active.": "\uC800\uC7A5\uB41C \uD328\uD134\uC774 \uC798\uBABB\uB418\uC5B4 \uAE30\uBCF8 \uADDC\uCE59\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
  "Automatically open matching notes as maps": "\uC77C\uCE58\uD558\uB294 \uB178\uD2B8\uB97C \uC790\uB3D9\uC73C\uB85C \uB9C8\uC778\uB4DC\uB9F5\uC73C\uB85C \uC5F4\uAE30",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "\uC544\uB798 \uD328\uD134\uC5D0 \uB9DE\uB294 \uB178\uD2B8\uC5D0 \uC801\uC6A9\uB429\uB2C8\uB2E4. Markdown \uC6D0\uBB38\uC744 \uC9C1\uC811 \uC5F4\uBA74 \uD574\uB2F9 \uB178\uD2B8\uB294 Markdown \uBAA8\uB4DC\uB97C \uC720\uC9C0\uD569\uB2C8\uB2E4.",
  "Invalid pattern on line {line}: {error}": "{line}\uC904\uC758 \uD328\uD134 \uC624\uB958: {error}",
  "Patterns saved.": "\uD328\uD134\uC744 \uC800\uC7A5\uD588\uC2B5\uB2C8\uB2E4.",
  "Pattern syntax": "\uD328\uD134 \uBB38\uBC95",
  "Glob (wildcards)": "Glob (\uC640\uC77C\uB4DC\uCE74\uB4DC)",
  "Regular expressions": "\uC815\uADDC\uC2DD",
  "Map file patterns": "\uB9C8\uC778\uB4DC\uB9F5 \uD30C\uC77C \uD328\uD134",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "\uD55C \uC904\uC5D0 \uD328\uD134 \uD558\uB098\uC774\uBA70, \uD558\uB098\uB9CC \uC77C\uCE58\uD574\uB3C4 \uB429\uB2C8\uB2E4. Glob\uC5D0 /\uAC00 \uC5C6\uC73C\uBA74 \uBAA8\uB4E0 \uD3F4\uB354\uC758 \uD30C\uC77C \uC774\uB984, \uC788\uC73C\uBA74 \uBCF4\uAD00\uD568 \uC0C1\uB300 \uACBD\uB85C\uC640 \uBE44\uAD50\uD569\uB2C8\uB2E4. *, **, ?\uB97C \uC9C0\uC6D0\uD569\uB2C8\uB2E4. \uC815\uADDC\uC2DD\uC740 / \uAD6C\uBD84 \uC5C6\uC774 \uC0C1\uB300 \uACBD\uB85C\uC640 \uBE44\uAD50\uD569\uB2C8\uB2E4. \uB300\uC18C\uBB38\uC790\uB97C \uAD6C\uBD84\uD558\uC9C0 \uC54A\uC73C\uBA70 Markdown \uD30C\uC77C\uB9CC \uD574\uB2F9\uD569\uB2C8\uB2E4.",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "mindmap: true \uC18D\uC131\uB3C4 \uB9C8\uC778\uB4DC\uB9F5\uC744 \uB098\uD0C0\uB0C5\uB2C8\uB2E4. \uC798\uBABB\uB41C \uC785\uB825\uC740 \uB9C8\uC9C0\uB9C9 \uC800\uC7A5 \uADDC\uCE59\uC744 \uC720\uC9C0\uD569\uB2C8\uB2E4. \uC790\uB3D9 \uC5F4\uAE30, \uAC80\uC0C9, \uB2E8\uACC4 \uBAA9\uB85D\uC5D0 \uAC19\uC740 \uD328\uD134\uC744 \uC0AC\uC6A9\uD569\uB2C8\uB2E4.",
  "This JSON map format is not supported.": "\uC774 JSON \uB9C8\uC778\uB4DC\uB9F5 \uD615\uC2DD\uC740 \uC9C0\uC6D0\uD558\uC9C0 \uC54A\uC2B5\uB2C8\uB2E4.",
  "Restore default patterns": "\uAE30\uBCF8 \uD328\uD134 \uBCF5\uC6D0",
  "Restore default settings": "\uAE30\uBCF8 \uC124\uC815 \uBCF5\uC6D0",
  "Restore defaults": "\uBCF5\uC6D0",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "\uD50C\uB7EC\uADF8\uC778 \uC124\uC815, \uB2E8\uCD95\uD0A4, \uB9C8\uC778\uB4DC\uB9F5 \uD328\uD134\uC744 \uCD08\uAE30\uD654\uD560\uAE4C\uC694? \uAE30\uAE30\uC758 \uBCF4\uAE30 \uC0C1\uD0DC\uC640 \uC800\uC7A5\uB41C \uB178\uD2B8\uB294 \uC720\uC9C0\uB429\uB2C8\uB2E4. \uC5B8\uC5B4\uB97C \uC801\uC6A9\uD558\uB824\uBA74 Obsidian\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694.",
  "Default settings restored. Restart Obsidian to apply the language.": "\uAE30\uBCF8 \uC124\uC815\uC744 \uBCF5\uC6D0\uD588\uC2B5\uB2C8\uB2E4. \uC5B8\uC5B4\uB97C \uC801\uC6A9\uD558\uB824\uBA74 Obsidian\uC744 \uB2E4\uC2DC \uC2DC\uC791\uD558\uC138\uC694."
};

// src/locales/ru.json
var ru_default = {
  "A node with its own Markdown line is required.": "\u041D\u0443\u0436\u0435\u043D \u0443\u0437\u0435\u043B \u0441 \u0441\u043E\u0431\u0441\u0442\u0432\u0435\u043D\u043D\u043E\u0439 \u0441\u0442\u0440\u043E\u043A\u043E\u0439 Markdown.",
  "This block ID is duplicated. Fix it in the source Markdown before copying the address.": "\u042D\u0442\u043E\u0442 ID \u0431\u043B\u043E\u043A\u0430 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0435\u0442\u0441\u044F. \u0418\u0441\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0435\u0433\u043E \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C Markdown \u043F\u0435\u0440\u0435\u0434 \u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u043C \u0430\u0434\u0440\u0435\u0441\u0430.",
  "A unique block ID is required.": "\u041D\u0443\u0436\u0435\u043D \u0443\u043D\u0438\u043A\u0430\u043B\u044C\u043D\u044B\u0439 ID \u0431\u043B\u043E\u043A\u0430.",
  "The selection changed. Run the command again.": "\u0412\u044B\u0431\u043E\u0440 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0441\u044F. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043A\u043E\u043C\u0430\u043D\u0434\u0443.",
  "Cannot move a branch into itself, a descendant or an incompatible Markdown node.": "\u041D\u0435\u043B\u044C\u0437\u044F \u043F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0435\u0442\u043A\u0443 \u0432 \u0441\u0435\u0431\u044F, \u0441\u0432\u043E\u0435\u0433\u043E \u043F\u043E\u0442\u043E\u043C\u043A\u0430 \u0438\u043B\u0438 \u043D\u0435\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u044B\u0439 \u0443\u0437\u0435\u043B Markdown.",
  "A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure.": "\u041F\u0443\u043D\u043A\u0442 \u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 \u0431\u0443\u0434\u0435\u0442 \u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0430\u0442\u044C \u0435\u043C\u0443. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043F\u0443\u043D\u043A\u0442 \u0441\u043F\u0438\u0441\u043A\u0430 \u0438\u043B\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 Markdown.",
  "Sibling above": "\u0421\u043E\u0441\u0435\u0434 \u0432\u044B\u0448\u0435",
  "Sibling below": "\u0421\u043E\u0441\u0435\u0434 \u043D\u0438\u0436\u0435",
  "Child node": "\u0414\u043E\u0447\u0435\u0440\u043D\u0438\u0439 \u0443\u0437\u0435\u043B",
  "Parent node": "\u0420\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0443\u0437\u0435\u043B",
  "Find a map\u2026": "\u041D\u0430\u0439\u0442\u0438 \u043A\u0430\u0440\u0442\u0443\u2026",
  "Note name, alias or new link\u2026": "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438, \u043F\u0441\u0435\u0432\u0434\u043E\u043D\u0438\u043C \u0438\u043B\u0438 \u043D\u043E\u0432\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430\u2026",
  select: "\u0432\u044B\u0431\u0440\u0430\u0442\u044C",
  "insert link": "\u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443",
  "return to node": "\u0432\u0435\u0440\u043D\u0443\u0442\u044C\u0441\u044F \u043A \u0443\u0437\u043B\u0443",
  "file not created yet": "\u0444\u0430\u0439\u043B \u0435\u0449\u0451 \u043D\u0435 \u0441\u043E\u0437\u0434\u0430\u043D",
  "new link": "\u043D\u043E\u0432\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430",
  "Insert a link without creating a file": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u0431\u0435\u0437 \u0441\u043E\u0437\u0434\u0430\u043D\u0438\u044F \u0444\u0430\u0439\u043B\u0430",
  "The file changed or was deleted. Search again.": "\u0424\u0430\u0439\u043B \u0438\u0437\u043C\u0435\u043D\u0451\u043D \u0438\u043B\u0438 \u0443\u0434\u0430\u043B\u0451\u043D. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u043F\u043E\u0438\u0441\u043A.",
  "Link (Ctrl+K)": "\u0421\u0441\u044B\u043B\u043A\u0430 (Ctrl+K)",
  "Highlight text": "\u0412\u044B\u0434\u0435\u043B\u0438\u0442\u044C \u0442\u0435\u043A\u0441\u0442",
  "Mark as question": "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043A\u0430\u043A \u0432\u043E\u043F\u0440\u043E\u0441",
  "Step deadline": "\u0421\u0440\u043E\u043A \u0448\u0430\u0433\u0430",
  Date: "\u0414\u0430\u0442\u0430",
  " Unknown deadline (?)": " \u041D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u044B\u0439 \u0441\u0440\u043E\u043A (?)",
  "Previous month": "\u041F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0438\u0439 \u043C\u0435\u0441\u044F\u0446",
  "Next month": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u0439 \u043C\u0435\u0441\u044F\u0446",
  Mon: "\u041F\u043D",
  Tue: "\u0412\u0442",
  Wed: "\u0421\u0440",
  Thu: "\u0427\u0442",
  Fri: "\u041F\u0442",
  Sat: "\u0421\u0431",
  Sun: "\u0412\u0441",
  Cancel: "\u041E\u0442\u043C\u0435\u043D\u0430",
  Save: "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C",
  "Enter to save, Esc to cancel.": "Enter \u2014 \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C, Esc \u2014 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C.",
  "Ctrl+Enter to confirm, Esc to cancel.": "Ctrl+Enter \u2014 \u043F\u043E\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u044C, Esc \u2014 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u044C.",
  "Delete branch": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0435\u0442\u043A\u0443",
  "Extend selection up": "\u0420\u0430\u0441\u0448\u0438\u0440\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0432\u0432\u0435\u0440\u0445",
  "Extend selection down": "\u0420\u0430\u0441\u0448\u0438\u0440\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0432\u043D\u0438\u0437",
  "Extend selection to parent": "\u0420\u0430\u0441\u0448\u0438\u0440\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0434\u043E \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044F",
  "Extend selection to child": "\u0420\u0430\u0441\u0448\u0438\u0440\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440 \u0434\u043E \u043F\u043E\u0442\u043E\u043C\u043A\u0430",
  "Select all visible nodes": "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0432\u0441\u0435 \u0432\u0438\u0434\u0438\u043C\u044B\u0435 \u0443\u0437\u043B\u044B",
  "Cut branch": "\u0412\u044B\u0440\u0435\u0437\u0430\u0442\u044C \u0432\u0435\u0442\u043A\u0443",
  "Copy link to node": "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0443\u0437\u0435\u043B",
  "Copy branch": "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u0435\u0442\u043A\u0443",
  "Paste as child branch": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0434\u043E\u0447\u0435\u0440\u043D\u044E\u044E \u0432\u0435\u0442\u043A\u0443",
  "Paste branch after node": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0432\u0435\u0442\u043A\u0443 \u043F\u043E\u0441\u043B\u0435 \u0443\u0437\u043B\u0430",
  Undo: "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435",
  Redo: "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435",
  "Edit node": "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0443\u0437\u0435\u043B",
  "Add child node": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0434\u043E\u0447\u0435\u0440\u043D\u0438\u0439 \u0443\u0437\u0435\u043B",
  "Add parent node": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0443\u0437\u0435\u043B",
  "Add sibling above": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u0441\u0435\u0434\u043D\u0438\u0439 \u0443\u0437\u0435\u043B \u0432\u044B\u0448\u0435",
  "Add sibling node": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u0441\u0435\u0434\u043D\u0438\u0439 \u0443\u0437\u0435\u043B",
  "Move branch up": "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0435\u0442\u043A\u0443 \u0432\u044B\u0448\u0435",
  "Move branch down": "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u0435\u0442\u043A\u0443 \u043D\u0438\u0436\u0435",
  "Make child of previous node": "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u0434\u043E\u0447\u0435\u0440\u043D\u0438\u043C \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0433\u043E \u0443\u0437\u043B\u0430",
  "Move up one level": "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u043D\u0430 \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u0432\u044B\u0448\u0435",
  "Toggle completion": "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435",
  "Make numbered step": "\u0421\u0434\u0435\u043B\u0430\u0442\u044C \u043D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u043C \u0448\u0430\u0433\u043E\u043C",
  "Set date": "\u0423\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0434\u0430\u0442\u0443",
  "Open source Markdown": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0439 Markdown",
  "Select parent node": "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u0443\u0437\u0435\u043B",
  "Select child node": "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0434\u043E\u0447\u0435\u0440\u043D\u0438\u0439 \u0443\u0437\u0435\u043B",
  "Select previous sibling": "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0435\u0433\u043E \u0441\u043E\u0441\u0435\u0434\u0430",
  "Select next sibling": "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0433\u043E \u0441\u043E\u0441\u0435\u0434\u0430",
  "Select first node": "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u0435\u0440\u0432\u044B\u0439 \u0443\u0437\u0435\u043B",
  "Select last node": "\u0412\u044B\u0431\u0440\u0430\u0442\u044C \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0439 \u0443\u0437\u0435\u043B",
  "Collapse / expand node": "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C / \u0440\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0443\u0437\u0435\u043B",
  "Collapse all roots": "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435 \u043A\u043E\u0440\u043D\u0438",
  "Collapse selected branch": "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0432\u0435\u0442\u043A\u0443",
  "Expand selected branch": "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0432\u0435\u0442\u043A\u0443",
  "Selected node only": "\u0422\u043E\u043B\u044C\u043A\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0443\u0437\u0435\u043B",
  "Show one child level": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043E\u0434\u0438\u043D \u0443\u0440\u043E\u0432\u0435\u043D\u044C \u043F\u043E\u0442\u043E\u043C\u043A\u043E\u0432",
  "Show two child levels": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0434\u0432\u0430 \u0443\u0440\u043E\u0432\u043D\u044F \u043F\u043E\u0442\u043E\u043C\u043A\u043E\u0432",
  "Show three child levels": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0442\u0440\u0438 \u0443\u0440\u043E\u0432\u043D\u044F \u043F\u043E\u0442\u043E\u043C\u043A\u043E\u0432",
  "Show four child levels": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u0447\u0435\u0442\u044B\u0440\u0435 \u0443\u0440\u043E\u0432\u043D\u044F \u043F\u043E\u0442\u043E\u043C\u043A\u043E\u0432",
  "Show five child levels": "\u041F\u043E\u043A\u0430\u0437\u0430\u0442\u044C \u043F\u044F\u0442\u044C \u0443\u0440\u043E\u0432\u043D\u0435\u0439 \u043F\u043E\u0442\u043E\u043C\u043A\u043E\u0432",
  "Expand all child levels": "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435 \u0443\u0440\u043E\u0432\u043D\u0438 \u043F\u043E\u0442\u043E\u043C\u043A\u043E\u0432",
  "Find in map": "\u041D\u0430\u0439\u0442\u0438 \u0432 \u043A\u0430\u0440\u0442\u0435",
  "Fit map": "\u0412\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u043A\u0430\u0440\u0442\u0443",
  "Specify a key after the modifiers.": "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0443 \u043F\u043E\u0441\u043B\u0435 \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u043E\u0432.",
  "Modifiers: Ctrl, Alt, Shift, Meta or Mod.": "\u041C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u044B: Ctrl, Alt, Shift, Meta \u0438\u043B\u0438 Mod.",
  "Do not repeat modifiers. Mod already means Ctrl or Cmd.": "\u041D\u0435 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0439\u0442\u0435 \u043C\u043E\u0434\u0438\u0444\u0438\u043A\u0430\u0442\u043E\u0440\u044B. Mod \u0443\u0436\u0435 \u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442 Ctrl \u0438\u043B\u0438 Cmd.",
  "This image format is not supported.": "\u042D\u0442\u043E\u0442 \u0444\u043E\u0440\u043C\u0430\u0442 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F.",
  "The clipboard image is empty.": "\u0412 \u0431\u0443\u0444\u0435\u0440\u0435 \u043F\u0443\u0441\u0442\u043E\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435.",
  "Could not save the attachment.": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u0435.",
  "Saving image\u2026": "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u0435 \u0438\u0437\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u044F\u2026",
  "Node text": "\u0422\u0435\u043A\u0441\u0442 \u0443\u0437\u043B\u0430",
  "Save (Enter)": "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C (Enter)",
  "Cancel (Escape)": "\u041E\u0442\u043C\u0435\u043D\u0430 (Escape)",
  "Close the editor and discard your changes?": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0438 \u043E\u0442\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F?",
  "Continue editing": "\u041F\u0440\u043E\u0434\u043E\u043B\u0436\u0438\u0442\u044C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435",
  "Discard changes": "\u041E\u0442\u0431\u0440\u043E\u0441\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F",
  "A node cannot be empty.": "\u0423\u0437\u0435\u043B \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0431\u044B\u0442\u044C \u043F\u0443\u0441\u0442\u044B\u043C.",
  "Multiple cursors are available in source Markdown.": "\u041D\u0435\u0441\u043A\u043E\u043B\u044C\u043A\u043E \u043A\u0443\u0440\u0441\u043E\u0440\u043E\u0432 \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u044B \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C Markdown.",
  "This command requires the source Markdown editor.": "\u042D\u0442\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430 Markdown.",
  "Fixed width": "\u0424\u0438\u043A\u0441\u0438\u0440\u043E\u0432\u0430\u043D\u043D\u0430\u044F \u0448\u0438\u0440\u0438\u043D\u0430",
  "Fit node content": "\u041F\u043E \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u043C\u0443 \u0443\u0437\u043B\u0430",
  "Fit visible column": "\u041F\u043E \u0432\u0438\u0434\u0438\u043C\u043E\u043C\u0443 \u0441\u0442\u043E\u043B\u0431\u0446\u0443",
  "TraceView Mindmap: open map": "TraceView Mindmap: \u043E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u0443",
  "Open current note as a map": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0442\u0435\u043A\u0443\u0449\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443 \u043A\u0430\u043A \u043A\u0430\u0440\u0442\u0443",
  "Open map at the Markdown cursor": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u0443 \u043D\u0430 \u043F\u043E\u0437\u0438\u0446\u0438\u0438 \u043A\u0443\u0440\u0441\u043E\u0440\u0430 Markdown",
  "Find a map": "\u041D\u0430\u0439\u0442\u0438 \u043A\u0430\u0440\u0442\u0443",
  "Create a simple tree": "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u043F\u0440\u043E\u0441\u0442\u043E\u0435 \u0434\u0435\u0440\u0435\u0432\u043E",
  "Create a vector (separate template)": "\u0421\u043E\u0437\u0434\u0430\u0442\u044C \u0432\u0435\u043A\u0442\u043E\u0440 (\u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u0448\u0430\u0431\u043B\u043E\u043D)",
  "Steps, deadlines and QA": "\u0428\u0430\u0433\u0438, \u0441\u0440\u043E\u043A\u0438 \u0438 QA",
  "Mark as atomic step": "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u0430\u0442\u043E\u043C\u0430\u0440\u043D\u044B\u0439 \u0448\u0430\u0433",
  "Add step deadline": "\u0414\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0441\u0440\u043E\u043A \u0448\u0430\u0433\u0430",
  "Mark as QA": "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C QA",
  "Toggle step completion": "\u041F\u0435\u0440\u0435\u043A\u043B\u044E\u0447\u0438\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435 \u0448\u0430\u0433\u0430",
  "Paste as sibling branch": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0441\u043E\u0441\u0435\u0434\u043D\u044E\u044E \u0432\u0435\u0442\u043A\u0443",
  "Undo map change": "\u041E\u0442\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u044B",
  "Redo map change": "\u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043A\u0430\u0440\u0442\u044B",
  "Insert QA in Markdown editor": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C QA \u0432 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0435 Markdown",
  "Insert unnumbered step in Markdown editor": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043D\u0435\u043D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0439 \u0448\u0430\u0433 \u0432 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0435 Markdown",
  "Open map at this node": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u043A\u0430\u0440\u0442\u0443 \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0437\u043B\u0435",
  "Open in TraceView Mindmap": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0432 TraceView Mindmap",
  "The note changed. Open it again at the current line.": "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0435\u0451 \u0437\u0430\u043D\u043E\u0432\u043E \u043D\u0430 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u0441\u0442\u0440\u043E\u043A\u0435.",
  "Save or cancel the node draft.": "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u0435 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0443\u0437\u043B\u0430.",
  "New vector name": "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0433\u043E \u0432\u0435\u043A\u0442\u043E\u0440\u0430",
  "New tree name": "\u041D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u043D\u043E\u0432\u043E\u0433\u043E \u0434\u0435\u0440\u0435\u0432\u0430",
  "Use a name without path characters.": "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0431\u0435\u0437 \u0441\u0438\u043C\u0432\u043E\u043B\u043E\u0432 \u043F\u0443\u0442\u0438.",
  "A file with this name already exists.": "\u0424\u0430\u0439\u043B \u0441 \u0442\u0430\u043A\u0438\u043C \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435\u043C \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442.",
  "The Markdown editor has newer text. Wait for it to save and try again.": "\u0412 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0435 Markdown \u0435\u0441\u0442\u044C \u0431\u043E\u043B\u0435\u0435 \u043D\u043E\u0432\u044B\u0439 \u0442\u0435\u043A\u0441\u0442. \u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435.",
  "Branch copied": "\u0412\u0435\u0442\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430",
  "Branch saved to the plugin clipboard": "\u0412\u0435\u0442\u043A\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0430 \u0432 \u0431\u0443\u0444\u0435\u0440\u0435 \u043F\u043B\u0430\u0433\u0438\u043D\u0430",
  "Clipboard unavailable. Branch was not cut. Allow clipboard access and try again.": "\u0411\u0443\u0444\u0435\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u0412\u0435\u0442\u043A\u0430 \u043D\u0435 \u0432\u044B\u0440\u0435\u0437\u0430\u043D\u0430. \u0420\u0430\u0437\u0440\u0435\u0448\u0438\u0442\u0435 \u0434\u043E\u0441\u0442\u0443\u043F \u043A \u0431\u0443\u0444\u0435\u0440\u0443 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435.",
  "Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu.": "\u0411\u0443\u0444\u0435\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \xAB\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0432\u0435\u0442\u043A\u0438\xBB \u0432 \u043C\u0435\u043D\u044E \u22EF.",
  "Save or cancel the node draft before navigating.": "\u0421\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u0435 \u0438\u043B\u0438 \u043E\u0442\u043C\u0435\u043D\u0438\u0442\u0435 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043F\u0435\u0440\u0435\u0434 \u043F\u0435\u0440\u0435\u0445\u043E\u0434\u043E\u043C.",
  "Waiting for Obsidian to be ready\u2026": "\u041E\u0436\u0438\u0434\u0430\u043D\u0438\u0435 \u0433\u043E\u0442\u043E\u0432\u043D\u043E\u0441\u0442\u0438 Obsidian\u2026",
  "Wait for Obsidian to load, then open the map.": "\u0414\u043E\u0436\u0434\u0438\u0442\u0435\u0441\u044C \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 Obsidian, \u0437\u0430\u0442\u0435\u043C \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043A\u0430\u0440\u0442\u0443.",
  "This address is duplicated. Fix the block ID in Markdown.": "\u042D\u0442\u043E\u0442 \u0430\u0434\u0440\u0435\u0441 \u043F\u043E\u0432\u0442\u043E\u0440\u044F\u0435\u0442\u0441\u044F. \u0418\u0441\u043F\u0440\u0430\u0432\u044C\u0442\u0435 ID \u0431\u043B\u043E\u043A\u0430 \u0432 Markdown.",
  "The linked node was not found.": "\u0423\u0437\u0435\u043B \u043F\u043E \u044D\u0442\u043E\u0439 \u0441\u0441\u044B\u043B\u043A\u0435 \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D.",
  "Collapse levels": "\u0423\u0440\u043E\u0432\u043D\u0438 \u0441\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u044F",
  "Delete selected branch": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u0443\u044E \u0432\u0435\u0442\u043A\u0443",
  "Sibling node": "\u0421\u043E\u0441\u0435\u0434\u043D\u0438\u0439 \u0443\u0437\u0435\u043B",
  Edit: "\u0420\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u0442\u044C",
  "Multiple selection: taps or rectangle": "\u041C\u043D\u043E\u0436\u0435\u0441\u0442\u0432\u0435\u043D\u043D\u044B\u0439 \u0432\u044B\u0431\u043E\u0440: \u043A\u0430\u0441\u0430\u043D\u0438\u044F \u0438\u043B\u0438 \u0440\u0430\u043C\u043A\u0430",
  Search: "\u041F\u043E\u0438\u0441\u043A",
  "Layout and node width": "\u0412\u0438\u0434 \u0438 \u0448\u0438\u0440\u0438\u043D\u0430 \u0443\u0437\u043B\u043E\u0432",
  "Map actions": "\u0414\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u043A\u0430\u0440\u0442\u044B",
  "Open now": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441",
  Map: "\u041A\u0430\u0440\u0442\u0430",
  Outline: "\u0421\u043F\u0438\u0441\u043E\u043A",
  Table: "\u0422\u0430\u0431\u043B\u0438\u0446\u0430",
  "Expand entire map": "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u044E \u043A\u0430\u0440\u0442\u0443",
  "All child levels": "\u0412\u0441\u0435 \u043F\u043E\u0434\u0443\u0440\u043E\u0432\u043D\u0438",
  "The map will open after the workspace loads\u2026": "\u041A\u0430\u0440\u0442\u0430 \u043E\u0442\u043A\u0440\u043E\u0435\u0442\u0441\u044F \u043F\u043E\u0441\u043B\u0435 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0440\u0430\u0431\u043E\u0447\u0435\u0433\u043E \u043F\u0440\u043E\u0441\u0442\u0440\u0430\u043D\u0441\u0442\u0432\u0430\u2026",
  "File missing or deleted. Open another map.": "\u0424\u0430\u0439\u043B \u043E\u0442\u0441\u0443\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u0438\u043B\u0438 \u0443\u0434\u0430\u043B\u0451\u043D. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0434\u0440\u0443\u0433\u0443\u044E \u043A\u0430\u0440\u0442\u0443.",
  "The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map.": "\u041A\u0430\u0440\u0442\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C \u0438\u043B\u0438 \u0438\u0434\u0451\u0442 \u0437\u0430\u043F\u0438\u0441\u044C. \u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u043E\u0441\u0442\u0430\u043B\u0441\u044F \u0432 \u043F\u043E\u043B\u0435. \u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u043E\u0442\u043C\u0435\u043D\u043E\u0439 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0430 \u0442\u0435\u043A\u0443\u0449\u0435\u0439 \u043A\u0430\u0440\u0442\u0435.",
  "The file no longer exists.": "\u0424\u0430\u0439\u043B \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442.",
  "Select a map node first": "\u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0432\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0437\u0435\u043B \u043A\u0430\u0440\u0442\u044B",
  "Another map is open. The selection was copied, but not cut.": "\u041E\u0442\u043A\u0440\u044B\u0442\u0430 \u0434\u0440\u0443\u0433\u0430\u044F \u043A\u0430\u0440\u0442\u0430. \u0412\u044B\u0431\u043E\u0440 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D, \u043D\u043E \u043D\u0435 \u0432\u044B\u0440\u0435\u0437\u0430\u043D.",
  "This command requires one selected node.": "\u042D\u0442\u0430 \u043A\u043E\u043C\u0430\u043D\u0434\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u043E\u0434\u043D\u043E\u0433\u043E \u0432\u044B\u0431\u0440\u0430\u043D\u043D\u043E\u0433\u043E \u0443\u0437\u043B\u0430.",
  "The map was closed or renamed. Copy the address again.": "\u041A\u0430\u0440\u0442\u0430 \u0437\u0430\u043A\u0440\u044B\u0442\u0430 \u0438\u043B\u0438 \u043F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0430. \u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0430\u0434\u0440\u0435\u0441 \u0435\u0449\u0451 \u0440\u0430\u0437.",
  "Node link copied.": "\u0421\u0441\u044B\u043B\u043A\u0430 \u043D\u0430 \u0443\u0437\u0435\u043B \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430.",
  "Another map is open. The branch was copied, but not cut.": "\u041E\u0442\u043A\u0440\u044B\u0442\u0430 \u0434\u0440\u0443\u0433\u0430\u044F \u043A\u0430\u0440\u0442\u0430. \u0412\u0435\u0442\u043A\u0430 \u0441\u043A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u043D\u0430, \u043D\u043E \u043D\u0435 \u0432\u044B\u0440\u0435\u0437\u0430\u043D\u0430.",
  "Branch cut. Ctrl+V to paste, Undo to restore.": "\u0412\u0435\u0442\u043A\u0430 \u0432\u044B\u0440\u0435\u0437\u0430\u043D\u0430. Ctrl+V \u2014 \u0432\u0441\u0442\u0430\u0432\u0438\u0442\u044C, \u043E\u0442\u043C\u0435\u043D\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u2014 \u0432\u0435\u0440\u043D\u0443\u0442\u044C.",
  "The note was renamed. Copy the draft and reopen the editor.": "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u043F\u0435\u0440\u0435\u0438\u043C\u0435\u043D\u043E\u0432\u0430\u043D\u0430. \u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0438 \u043E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0437\u0430\u043D\u043E\u0432\u043E.",
  "The map changed externally. Your draft is preserved. Copy it before editing again.": "\u0421\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u043A\u0430\u0440\u0442\u044B \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u043E \u0438\u0437\u0432\u043D\u0435. \u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D. \u0421\u043A\u043E\u043F\u0438\u0440\u0443\u0439\u0442\u0435 \u0435\u0433\u043E \u043F\u0435\u0440\u0435\u0434 \u043F\u043E\u0432\u0442\u043E\u0440\u043D\u044B\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0435\u043C.",
  "The node no longer exists. Your draft is preserved.": "\u0423\u0437\u0435\u043B \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442. \u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D.",
  "Steps \xB7 Deadlines \xB7 QA": "\u0428\u0430\u0433\u0438 \xB7 \u0421\u0440\u043E\u043A\u0438 \xB7 QA",
  "Step deadline\u2026": "\u0421\u0440\u043E\u043A \u0448\u0430\u0433\u0430\u2026",
  "Completed / incomplete": "\u0412\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E / \u043D\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043E",
  "Move up": "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u0432\u044B\u0448\u0435",
  "Move down": "\u041F\u0435\u0440\u0435\u043C\u0435\u0441\u0442\u0438\u0442\u044C \u043D\u0438\u0436\u0435",
  "Nest in previous branch": "\u0412\u043B\u043E\u0436\u0438\u0442\u044C \u0432 \u043F\u0440\u0435\u0434\u044B\u0434\u0443\u0449\u0443\u044E \u0432\u0435\u0442\u043A\u0443",
  "Open text in editor": "\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0432 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0435",
  "Delete branch\u2026": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u0435\u0442\u043A\u0443\u2026",
  "Export HTML\u2026": "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 HTML\u2026",
  "Export SVG\u2026": "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 SVG\u2026",
  "Paste branch text\u2026": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0432\u0435\u0442\u043A\u0438\u2026",
  "Paste child Markdown branch": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u0434\u043E\u0447\u0435\u0440\u043D\u044E\u044E Markdown-\u0432\u0435\u0442\u043A\u0443",
  "Renumber steps": "\u0423\u043F\u043E\u0440\u044F\u0434\u043E\u0447\u0438\u0442\u044C \u043D\u043E\u043C\u0435\u0440\u0430 \u0448\u0430\u0433\u043E\u0432",
  "The target map changed. Reopen link suggestions. Your draft is preserved.": "\u041A\u0430\u0440\u0442\u0430 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u0438\u044F \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0430\u0441\u044C. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438 \u0441\u0441\u044B\u043B\u043E\u043A \u0437\u0430\u043D\u043E\u0432\u043E. \u0427\u0435\u0440\u043D\u043E\u0432\u0438\u043A \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D.",
  "This block is not a separate map node. Use \u201CCopy link to node\u201D.": "\u042D\u0442\u043E\u0442 \u0431\u043B\u043E\u043A \u043D\u0435 \u044F\u0432\u043B\u044F\u0435\u0442\u0441\u044F \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u043C \u0443\u0437\u043B\u043E\u043C \u043A\u0430\u0440\u0442\u044B. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \xAB\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0441\u0441\u044B\u043B\u043A\u0443 \u043D\u0430 \u0443\u0437\u0435\u043B\xBB.",
  "Native editor unavailable. Using text input. ": "\u041D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u043D\u0435\u0434\u043E\u0441\u0442\u0443\u043F\u0435\u043D. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442\u0441\u044F \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u0432\u0432\u043E\u0434. ",
  "The note does not exist.": "\u0417\u0430\u043C\u0435\u0442\u043A\u0430 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442.",
  "File already exists. Choose another name.": "\u0424\u0430\u0439\u043B \u0443\u0436\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0434\u0440\u0443\u0433\u043E\u0435 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435.",
  Steps: "\u0428\u0430\u0433\u0438",
  Deadlines: "\u0421\u0440\u043E\u043A\u0438",
  "Open QA": "\u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0435 QA",
  Refresh: "\u041E\u0431\u043D\u043E\u0432\u0438\u0442\u044C",
  "Collapse all": "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435",
  "Expand all": "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0441\u0435",
  "Search steps": "\u041F\u043E\u0438\u0441\u043A \u0448\u0430\u0433\u043E\u0432",
  "Find\u2026": "\u041D\u0430\u0439\u0442\u0438\u2026",
  "Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435 \u043F\u043E\u0440\u044F\u0434\u043A\u0430 \u043C\u0435\u043D\u044F\u0435\u0442 \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u043E\u043C\u0435\u0440\u0430 \u0448\u0430\u0433\u043E\u0432 \u0432 \u043E\u0434\u043D\u043E\u043C \u0444\u0430\u0439\u043B\u0435. \u0412\u0435\u0442\u043A\u0438 \u043E\u0441\u0442\u0430\u044E\u0442\u0441\u044F \u043D\u0430 \u043C\u0435\u0441\u0442\u0435. \u0428\u0430\u0433\u0438 \u0441 \u0434\u0430\u0442\u0430\u043C\u0438 \u0438 \u0431\u0435\u0437 \u043D\u043E\u043C\u0435\u0440\u043E\u0432 \u0438\u043C\u0435\u044E\u0442 \u043E\u0442\u0434\u0435\u043B\u044C\u043D\u044B\u0439 \u043F\u043E\u0440\u044F\u0434\u043E\u043A.",
  Expand: "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
  Collapse: "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C",
  "No open items match this filter.": "\u041D\u0435\u0442 \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u0445 \u043F\u0443\u043D\u043A\u0442\u043E\u0432 \u043F\u043E \u044D\u0442\u043E\u043C\u0443 \u0444\u0438\u043B\u044C\u0442\u0440\u0443.",
  "Mark completed": "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u043C",
  "Move earlier in execution order": "\u041F\u043E\u0434\u043D\u044F\u0442\u044C \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F",
  "Move later in execution order": "\u041E\u043F\u0443\u0441\u0442\u0438\u0442\u044C \u0432 \u043F\u043E\u0440\u044F\u0434\u043A\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F",
  "Deadline ?": "\u0421\u0440\u043E\u043A ?",
  "Node editor": "\u0420\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0443\u0437\u043B\u043E\u0432",
  "Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.": "\u041F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u043F\u0440\u0438 \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u043C \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438. \u041D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 Live Preview \u0438 \u043F\u043E\u0434\u0441\u043A\u0430\u0437\u043A\u0438 Obsidian, \u043F\u0440\u0438 \u043D\u0435\u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0441\u0442\u0438 \u2014 \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u0432\u0432\u043E\u0434.",
  "Native Obsidian": "\u041D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 Obsidian",
  "Text input": "\u0422\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u0432\u0432\u043E\u0434",
  "Automatically restore large maps": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u0430\u0432\u043B\u0438\u0432\u0430\u0442\u044C \u0431\u043E\u043B\u044C\u0448\u0438\u0435 \u043A\u0430\u0440\u0442\u044B",
  "At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.": "\u041F\u0440\u0438 \u0437\u0430\u043F\u0443\u0441\u043A\u0435 \u0430\u043A\u0442\u0438\u0432\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0430 \u0436\u0434\u0451\u0442 \u0441\u0442\u0430\u0431\u0438\u043B\u044C\u043D\u043E\u0433\u043E \u043E\u0442\u043A\u043B\u0438\u043A\u0430 Obsidian. \xAB\u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0441\u0435\u0439\u0447\u0430\u0441\xBB \u043F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0435\u0442 \u043E\u0436\u0438\u0434\u0430\u043D\u0438\u0435.",
  "Hide frozen steps": "\u0421\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u0437\u0430\u043C\u043E\u0440\u043E\u0436\u0435\u043D\u043D\u044B\u0435 \u0448\u0430\u0433\u0438",
  "Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.": "\u041F\u0440\u043E\u043F\u0443\u0441\u043A\u0430\u0442\u044C \u0432\u0435\u0442\u043A\u0438 \u{1F9CA} \u0432 \u0441\u043F\u0438\u0441\u043A\u0430\u0445 \u0448\u0430\u0433\u043E\u0432 \u0438 \u0441\u0440\u043E\u043A\u043E\u0432. \u041A\u0430\u0440\u0442\u044B \u043F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u044E\u0442 \u0432\u0435\u0441\u044C \u0442\u0435\u043A\u0441\u0442.",
  "Left arrow collapses the branch first": "\u0421\u0442\u0440\u0435\u043B\u043A\u0430 \u0432\u043B\u0435\u0432\u043E \u0441\u043D\u0430\u0447\u0430\u043B\u0430 \u0441\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u0435\u0442 \u0432\u0435\u0442\u043A\u0443",
  "Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.": "\u0412\u044B\u043A\u043B\u044E\u0447\u0435\u043D\u043E: \u0441\u0440\u0430\u0437\u0443 \u043A \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044E. \u0412\u043A\u043B\u044E\u0447\u0435\u043D\u043E: \u0441\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043E\u0442\u043A\u0440\u044B\u0442\u0443\u044E \u0432\u0435\u0442\u043A\u0443, \u0441\u043B\u0435\u0434\u0443\u044E\u0449\u0438\u043C \u043D\u0430\u0436\u0430\u0442\u0438\u0435\u043C \u0432\u044B\u0431\u0440\u0430\u0442\u044C \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044F.",
  "Show [ ] in list text": "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C [ ] \u0432 \u0442\u0435\u043A\u0441\u0442\u0435 \u0441\u043F\u0438\u0441\u043A\u043E\u0432",
  "Show #step in list text": "\u041F\u043E\u043A\u0430\u0437\u044B\u0432\u0430\u0442\u044C #step \u0432 \u0442\u0435\u043A\u0441\u0442\u0435 \u0441\u043F\u0438\u0441\u043A\u043E\u0432",
  "Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.": "\u0422\u043E\u043B\u044C\u043A\u043E \u043E\u0442\u043E\u0431\u0440\u0430\u0436\u0435\u043D\u0438\u0435 \u0432 \xAB\u0428\u0430\u0433\u0438 \xB7 \u0421\u0440\u043E\u043A\u0438 \xB7 QA\xBB. \u0422\u0435\u043A\u0441\u0442 \u0437\u0430\u043C\u0435\u0442\u043E\u043A \u0438 \u0443\u043F\u0440\u0430\u0432\u043B\u0435\u043D\u0438\u0435 \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u0435\u043C \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442\u0441\u044F.",
  "Map node width": "\u0428\u0438\u0440\u0438\u043D\u0430 \u0443\u0437\u043B\u043E\u0432 \u043A\u0430\u0440\u0442\u044B",
  "Applies immediately to all open maps. Outline and Table keep their own widths.": "\u041F\u0440\u0438\u043C\u0435\u043D\u044F\u0435\u0442\u0441\u044F \u0441\u0440\u0430\u0437\u0443 \u043A\u043E \u0432\u0441\u0435\u043C \u043E\u0442\u043A\u0440\u044B\u0442\u044B\u043C \u043A\u0430\u0440\u0442\u0430\u043C. \u0421\u043F\u0438\u0441\u043E\u043A \u0438 \u0422\u0430\u0431\u043B\u0438\u0446\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442 \u0441\u0432\u043E\u044E \u0448\u0438\u0440\u0438\u043D\u0443.",
  "Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.": "\u0421\u0432\u043E\u0440\u0430\u0447\u0438\u0432\u0430\u043D\u0438\u0435 \u0438 \u043A\u0430\u043C\u0435\u0440\u0430 \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442\u0441\u044F \u043D\u0430 \u044D\u0442\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435. \u041F\u0440\u043E\u0441\u043C\u043E\u0442\u0440 \u043D\u0435 \u043F\u0435\u0440\u0435\u043F\u0438\u0441\u044B\u0432\u0430\u0435\u0442 Markdown \u0438 \u043D\u0435 \u0434\u043E\u0431\u0430\u0432\u043B\u044F\u0435\u0442 \u0441\u043A\u0440\u044B\u0442\u044B\u0435 ID. Windows \u0438 Android \u043C\u043E\u0433\u0443\u0442 \u0438\u043C\u0435\u0442\u044C \u0440\u0430\u0437\u043D\u043E\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u0435 \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430.",
  "Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.": "\u041D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0432\u0432\u043E\u0434 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0435\u0442 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 Obsidian, \u0442\u0435\u043A\u0441\u0442\u043E\u0432\u044B\u0439 \u2014 Editor API. \u0414\u043B\u044F \u043A\u043E\u043C\u0430\u043D\u0434, \u0442\u0440\u0435\u0431\u0443\u044E\u0449\u0438\u0445 \u043F\u043E\u043B\u043D\u043E\u0433\u043E \u043E\u043A\u043D\u0430 Markdown, \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u22EF \u2192 \u041E\u0442\u043A\u0440\u044B\u0442\u044C \u0442\u0435\u043A\u0441\u0442 \u0432 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0435.",
  "Map hotkeys": "\u0413\u043E\u0440\u044F\u0447\u0438\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438 \u043A\u0430\u0440\u0442\u044B",
  "Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.": "\u0418\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0442 \u0441\u0440\u0430\u0437\u0443 \u0432\u043E \u0432\u0441\u0435\u0445 \u043A\u0430\u0440\u0442\u0430\u0445. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u2328, \u0437\u0430\u0442\u0435\u043C \u043A\u043E\u043C\u0431\u0438\u043D\u0430\u0446\u0438\u044E, \u0438\u043B\u0438 \u0432\u0432\u0435\u0434\u0438\u0442\u0435 \u0435\u0451: Ctrl+C, Alt+Shift+1. \u0412\u0430\u0440\u0438\u0430\u043D\u0442\u044B \u0440\u0430\u0437\u0434\u0435\u043B\u044F\u0439\u0442\u0435 \u0437\u0430\u043F\u044F\u0442\u044B\u043C\u0438. \xD7 \u043E\u0442\u043A\u043B\u044E\u0447\u0430\u0435\u0442 \u043A\u043E\u043C\u0430\u043D\u0434\u0443, \u21BA \u0432\u043E\u0437\u0432\u0440\u0430\u0449\u0430\u0435\u0442 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438. \u041F\u0440\u0438 \u0440\u0435\u0434\u0430\u043A\u0442\u0438\u0440\u043E\u0432\u0430\u043D\u0438\u0438 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0442 \u043E\u0431\u044B\u0447\u043D\u044B\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430.",
  Unassigned: "\u041D\u0435 \u043D\u0430\u0437\u043D\u0430\u0447\u0435\u043D\u043E",
  "Record shortcut": "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u044C \u043A\u043E\u043C\u0431\u0438\u043D\u0430\u0446\u0438\u044E",
  Disable: "\u041E\u0442\u043A\u043B\u044E\u0447\u0438\u0442\u044C",
  "Default shortcuts": "\u0418\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438",
  "Search map\u2026": "\u041F\u043E\u0438\u0441\u043A \u0432 \u043A\u0430\u0440\u0442\u0435\u2026",
  "Search map": "\u041F\u043E\u0438\u0441\u043A \u0432 \u043A\u0430\u0440\u0442\u0435",
  " A\u2013Z": " \u0410\u2013\u042F",
  "Close search": "\u0417\u0430\u043A\u0440\u044B\u0442\u044C \u043F\u043E\u0438\u0441\u043A",
  "Search results": "\u0420\u0435\u0437\u0443\u043B\u044C\u0442\u0430\u0442\u044B \u043F\u043E\u0438\u0441\u043A\u0430",
  "No results": "\u041D\u0438\u0447\u0435\u0433\u043E \u043D\u0435 \u043D\u0430\u0439\u0434\u0435\u043D\u043E",
  "This Obsidian version has no compatible native editor.": "\u042D\u0442\u0430 \u0432\u0435\u0440\u0441\u0438\u044F Obsidian \u043D\u0435 \u043F\u0440\u0435\u0434\u043E\u0441\u0442\u0430\u0432\u043B\u044F\u0435\u0442 \u0441\u043E\u0432\u043C\u0435\u0441\u0442\u0438\u043C\u043E\u0433\u043E \u043D\u0430\u0442\u0438\u0432\u043D\u043E\u0433\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440\u0430.",
  "Could not prepare the native editor.": "\u041D\u0435 \u0443\u0434\u0430\u043B\u043E\u0441\u044C \u043F\u043E\u0434\u0433\u043E\u0442\u043E\u0432\u0438\u0442\u044C \u043D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440.",
  "The native editor cannot protect a single-line draft.": "\u041D\u0430\u0442\u0438\u0432\u043D\u044B\u0439 \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u0437\u0430\u0449\u0438\u0442\u0443 \u043E\u0434\u043D\u043E\u0441\u0442\u0440\u043E\u0447\u043D\u043E\u0433\u043E \u0447\u0435\u0440\u043D\u043E\u0432\u0438\u043A\u0430.",
  "Native Obsidian link": "\u041D\u0430\u0442\u0438\u0432\u043D\u0430\u044F \u0441\u0441\u044B\u043B\u043A\u0430 Obsidian",
  "Map filter": "\u0424\u0438\u043B\u044C\u0442\u0440 \u043A\u0430\u0440\u0442",
  "All maps": "\u0412\u0441\u0435 \u043A\u0430\u0440\u0442\u044B",
  Maps: "\u041A\u0430\u0440\u0442\u044B",
  "No maps match this search.": "\u041A\u0430\u0440\u0442 \u043F\u043E \u044D\u0442\u043E\u043C\u0443 \u0437\u0430\u043F\u0440\u043E\u0441\u0443 \u043D\u0435\u0442.",
  "The note changed in another window or device. The map was refreshed. Retry on the latest text.": "\u0417\u0430\u043C\u0435\u0442\u043A\u0443 \u0438\u0437\u043C\u0435\u043D\u0438\u043B\u0438 \u0432 \u0434\u0440\u0443\u0433\u043E\u043C \u043E\u043A\u043D\u0435 \u0438\u043B\u0438 \u043D\u0430 \u0434\u0440\u0443\u0433\u043E\u043C \u0443\u0441\u0442\u0440\u043E\u0439\u0441\u0442\u0432\u0435. \u041A\u0430\u0440\u0442\u0430 \u043E\u0431\u043D\u043E\u0432\u043B\u0435\u043D\u0430. \u041F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435 \u043D\u0430 \u0441\u0432\u0435\u0436\u0435\u043C \u0442\u0435\u043A\u0441\u0442\u0435.",
  "History stopped because the text changed externally. Undo will preserve those changes.": "\u0418\u0441\u0442\u043E\u0440\u0438\u044F \u043E\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u0430 \u0438\u0437-\u0437\u0430 \u0432\u043D\u0435\u0448\u043D\u0435\u0433\u043E \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0442\u0435\u043A\u0441\u0442\u0430. \u041E\u0442\u043C\u0435\u043D\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442 \u044D\u0442\u0438 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F.",
  "Loading map\u2026": "\u0417\u0430\u0433\u0440\u0443\u0437\u043A\u0430 \u043A\u0430\u0440\u0442\u044B\u2026",
  "Node address: ^": "\u0410\u0434\u0440\u0435\u0441 \u0443\u0437\u043B\u0430: ^",
  "Branch ready to move": "\u0412\u0435\u0442\u043A\u0443 \u043C\u043E\u0436\u043D\u043E \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u0438\u0442\u044C",
  "Before: ": "\u041F\u0435\u0440\u0435\u0434: ",
  "After: ": "\u041F\u043E\u0441\u043B\u0435: ",
  "As children: ": "\u0414\u043E\u0447\u0435\u0440\u043D\u0438\u043C\u0438: ",
  "Expand node": "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0443\u0437\u0435\u043B",
  "Collapse node": "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0443\u0437\u0435\u043B",
  "Collapse branch": "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0435\u0442\u043A\u0443",
  "Expand branch": "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0432\u0435\u0442\u043A\u0443",
  "Paste after node": "\u0412\u0441\u0442\u0430\u0432\u0438\u0442\u044C \u043F\u043E\u0441\u043B\u0435 \u0443\u0437\u043B\u0430",
  Language: "\u042F\u0437\u044B\u043A",
  "Automatic follows Obsidian. Restart Obsidian to apply a language change.": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438\u0439 \u0432\u044B\u0431\u043E\u0440 \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u0435\u0442 \u044F\u0437\u044B\u043A\u0443 Obsidian. \u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 Obsidian, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u0435.",
  "Automatic (Obsidian)": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 (Obsidian)",
  "Language saved. Restart Obsidian to apply it.": "\u042F\u0437\u044B\u043A \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D. \u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 Obsidian, \u0447\u0442\u043E\u0431\u044B \u043F\u0440\u0438\u043C\u0435\u043D\u0438\u0442\u044C \u0435\u0433\u043E.",
  "Selected nodes: {count}": "\u0412\u044B\u0431\u0440\u0430\u043D\u043E \u0443\u0437\u043B\u043E\u0432: {count}",
  "Child levels: {count}": "\u0423\u0440\u043E\u0432\u043D\u0435\u0439 \u043F\u043E\u0442\u043E\u043C\u043A\u043E\u0432: {count}",
  "Nodes: {nodes} \xB7 Open steps: {steps}": "\u0423\u0437\u043B\u043E\u0432: {nodes} \xB7 \u041E\u0442\u043A\u0440\u044B\u0442\u044B\u0445 \u0448\u0430\u0433\u043E\u0432: {steps}",
  "Export {format} \u2014 file name": "\u042D\u043A\u0441\u043F\u043E\u0440\u0442 {format} \u2014 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u0435 \u0444\u0430\u0439\u043B\u0430",
  "Saved {path}": "\u0421\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E {path}",
  "Expand map: {name}": "\u0420\u0430\u0437\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043A\u0430\u0440\u0442\u0443: {name}",
  "Collapse map: {name}": "\u0421\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u043A\u0430\u0440\u0442\u0443: {name}",
  "Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.": "\u041E\u0434\u0438\u043D\u0430\u043A\u043E\u0432\u044B\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438: {shortcuts}. \u041F\u0440\u0438\u043E\u0440\u0438\u0442\u0435\u0442 \u0443 \u043F\u0435\u0440\u0432\u043E\u0439 \u043A\u043E\u043C\u0430\u043D\u0434\u044B \u0432 \u0441\u043F\u0438\u0441\u043A\u0435.",
  "Next action": "\u0421\u043B\u0435\u0434\u0443\u044E\u0449\u0435\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435",
  "First action": "\u041F\u0435\u0440\u0432\u043E\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435",
  "Active now": "\u0410\u043A\u0442\u0438\u0432\u043D\u043E \u0441\u0435\u0439\u0447\u0430\u0441",
  "Frozen / someday": "\u0417\u0430\u043C\u043E\u0440\u043E\u0436\u0435\u043D\u043E / \u043A\u043E\u0433\u0434\u0430-\u043D\u0438\u0431\u0443\u0434\u044C",
  "First step": "\u041F\u0435\u0440\u0432\u044B\u0439 \u0448\u0430\u0433",
  "{path} \xB7 References: {count}": "{path} \xB7 \u0423\u043F\u043E\u043C\u0438\u043D\u0430\u043D\u0438\u0439: {count}",
  "Attachment saved, but the editor is already closed: {link}": "\u0412\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u043E, \u043D\u043E \u0440\u0435\u0434\u0430\u043A\u0442\u043E\u0440 \u0443\u0436\u0435 \u0437\u0430\u043A\u0440\u044B\u0442: {link}",
  "Copy selection": "\u041A\u043E\u043F\u0438\u0440\u043E\u0432\u0430\u0442\u044C \u0432\u044B\u0431\u043E\u0440",
  "Cut selection": "\u0412\u044B\u0440\u0435\u0437\u0430\u0442\u044C \u0432\u044B\u0431\u043E\u0440",
  "Delete selection": "\u0423\u0434\u0430\u043B\u0438\u0442\u044C \u0432\u044B\u0431\u043E\u0440",
  "Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.": "\u041F\u043E\u043B\u043D\u0430\u044F \u043A\u0430\u0440\u0442\u0430 \xB7 \u0423\u0437\u043B\u043E\u0432: {count} \xB7 \u042D\u043A\u0441\u043F\u043E\u0440\u0442 \u0434\u043B\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430. \u041D\u0430\u0436\u043C\u0438\u0442\u0435 \u043C\u0430\u0440\u043A\u0435\u0440 \u0432\u0435\u0442\u043A\u0438, \u0447\u0442\u043E\u0431\u044B \u0441\u0432\u0435\u0440\u043D\u0443\u0442\u044C \u0435\u0451. \u0422\u0435\u043A\u0441\u0442\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u044E\u0442 Markdown. \u0421\u0441\u044B\u043B\u043A\u0438 \u0438 \u0432\u043B\u043E\u0436\u0435\u043D\u0438\u044F \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430 \u0442\u0440\u0435\u0431\u0443\u044E\u0442 Obsidian.",
  "This map contains no outline nodes.": "\u0412 \u044D\u0442\u043E\u0439 \u043A\u0430\u0440\u0442\u0435 \u043D\u0435\u0442 \u0443\u0437\u043B\u043E\u0432.",
  "This node no longer exists. Reopen the map and try again.": "\u0423\u0437\u0435\u043B \u0431\u043E\u043B\u044C\u0448\u0435 \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u043A\u0430\u0440\u0442\u0443 \u0438 \u043F\u043E\u0432\u0442\u043E\u0440\u0438\u0442\u0435 \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0435.",
  "A map node must fit on one line. Use a child node or a linked note for more text.": "\u0423\u0437\u0435\u043B \u0434\u043E\u043B\u0436\u0435\u043D \u0437\u0430\u043D\u0438\u043C\u0430\u0442\u044C \u043E\u0434\u043D\u0443 \u0441\u0442\u0440\u043E\u043A\u0443. \u0414\u043B\u044F \u043E\u0441\u0442\u0430\u043B\u044C\u043D\u043E\u0433\u043E \u0442\u0435\u043A\u0441\u0442\u0430 \u0438\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0434\u043E\u0447\u0435\u0440\u043D\u0438\u0439 \u0443\u0437\u0435\u043B \u0438\u043B\u0438 \u0441\u0432\u044F\u0437\u0430\u043D\u043D\u0443\u044E \u0437\u0430\u043C\u0435\u0442\u043A\u0443.",
  "This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view.": "\u042D\u0442\u043E\u0442 \u0442\u0435\u043A\u0441\u0442 \u0441\u0442\u0430\u043D\u0435\u0442 \u0431\u043B\u043E\u043A\u043E\u043C \u043A\u043E\u0434\u0430 \u0438\u043B\u0438 \u0440\u0430\u0437\u0434\u0435\u043B\u0438\u0442\u0435\u043B\u0435\u043C. \u042D\u043A\u0440\u0430\u043D\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0430\u0440\u043A\u0435\u0440 \u0438\u043B\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442.",
  "Markdown supports at most six heading levels. Add a bullet child in source view.": "Markdown \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442 \u0448\u0435\u0441\u0442\u044C \u0443\u0440\u043E\u0432\u043D\u0435\u0439 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432. \u0414\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0434\u043E\u0447\u0435\u0440\u043D\u0438\u0439 \u043F\u0443\u043D\u043A\u0442 \u0441\u043F\u0438\u0441\u043A\u0430 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C \u0442\u0435\u043A\u0441\u0442\u0435.",
  "This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view.": "\u042D\u0442\u043E\u0442 \u0442\u0435\u043A\u0441\u0442 \u043D\u0435 \u043F\u043E\u0434\u0445\u043E\u0434\u0438\u0442 \u0434\u043B\u044F \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u043E\u0433\u043E \u0443\u0437\u043B\u0430 Markdown. \u042D\u043A\u0440\u0430\u043D\u0438\u0440\u0443\u0439\u0442\u0435 \u043C\u0430\u0440\u043A\u0435\u0440 \u0438\u043B\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442.",
  "This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact.": "\u0412\u0435\u0442\u043A\u0430 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u0430\u0431\u0437\u0430\u0446, \u043A\u043E\u0434 \u0438\u043B\u0438 \u0438\u043D\u043E\u0439 Markdown \u0432\u043D\u0435 \u0441\u0442\u0440\u043E\u043A \u0443\u0437\u043B\u043E\u0432. \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C \u0442\u0435\u043A\u0441\u0442\u0435, \u0447\u0442\u043E\u0431\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0438\u0442\u044C \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435.",
  "This branch uses ambiguous indentation. Adjust it in source view before moving it.": "\u041E\u0442\u0441\u0442\u0443\u043F\u044B \u0432\u0435\u0442\u043A\u0438 \u043D\u0435\u043E\u0434\u043D\u043E\u0437\u043D\u0430\u0447\u043D\u044B. \u0418\u0441\u043F\u0440\u0430\u0432\u044C\u0442\u0435 \u0438\u0445 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C \u0442\u0435\u043A\u0441\u0442\u0435 \u043F\u0435\u0440\u0435\u0434 \u043F\u0435\u0440\u0435\u043D\u043E\u0441\u043E\u043C.",
  "That move would exceed Markdown\u2019s six heading levels.": "\u042D\u0442\u043E\u0442 \u043F\u0435\u0440\u0435\u043D\u043E\u0441 \u043F\u0440\u0435\u0432\u044B\u0441\u0438\u0442 \u0448\u0435\u0441\u0442\u044C \u0443\u0440\u043E\u0432\u043D\u0435\u0439 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u0432 Markdown.",
  "Moving between a heading and a bullet changes their meaning. Make this structural change in source view.": "\u041F\u0435\u0440\u0435\u043D\u043E\u0441 \u043C\u0435\u0436\u0434\u0443 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u043E\u043C \u0438 \u043F\u0443\u043D\u043A\u0442\u043E\u043C \u0441\u043F\u0438\u0441\u043A\u0430 \u043C\u0435\u043D\u044F\u0435\u0442 \u0438\u0445 \u0441\u043C\u044B\u0441\u043B. \u0418\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C \u0442\u0435\u043A\u0441\u0442\u0435.",
  "Indenting across mixed heading and bullet nodes is ambiguous. Use source view.": "\u0412\u043B\u043E\u0436\u0435\u043D\u0438\u0435 \u043C\u0435\u0436\u0434\u0443 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430\u043C\u0438 \u0438 \u043F\u0443\u043D\u043A\u0442\u0430\u043C\u0438 \u0441\u043F\u0438\u0441\u043A\u0430 \u043D\u0435\u043E\u0434\u043D\u043E\u0437\u043D\u0430\u0447\u043D\u043E. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442.",
  "A bullet under a heading cannot be outdented without changing Markdown formats. Use source view.": "\u0412\u044B\u043D\u043E\u0441 \u043F\u0443\u043D\u043A\u0442\u0430 \u0438\u0437-\u043F\u043E\u0434 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 \u0442\u0440\u0435\u0431\u0443\u0435\u0442 \u0438\u0437\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u0444\u043E\u0440\u043C\u0430\u0442\u0430 Markdown. \u0418\u0441\u043F\u043E\u043B\u044C\u0437\u0443\u0439\u0442\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442.",
  "A branch cannot be moved into itself or one of its descendants.": "\u041D\u0435\u043B\u044C\u0437\u044F \u043F\u0435\u0440\u0435\u043D\u0435\u0441\u0442\u0438 \u0432\u0435\u0442\u043A\u0443 \u0432 \u0441\u0435\u0431\u044F \u0438\u043B\u0438 \u0441\u0432\u043E\u0435\u0433\u043E \u043F\u043E\u0442\u043E\u043C\u043A\u0430.",
  "A Markdown heading cannot become a bullet child. Change its format in source view first.": "\u0417\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A Markdown \u043D\u0435 \u043C\u043E\u0436\u0435\u0442 \u0441\u0442\u0430\u0442\u044C \u0434\u043E\u0447\u0435\u0440\u043D\u0438\u043C \u043F\u0443\u043D\u043A\u0442\u043E\u043C \u0441\u043F\u0438\u0441\u043A\u0430. \u0421\u043D\u0430\u0447\u0430\u043B\u0430 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0444\u043E\u0440\u043C\u0430\u0442 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C \u0442\u0435\u043A\u0441\u0442\u0435.",
  "A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view.": "\u041F\u0443\u043D\u043A\u0442 \u043F\u043E\u0441\u043B\u0435 \u043F\u043E\u0434\u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430 \u0431\u0443\u0434\u0435\u0442 \u043F\u0440\u0438\u043D\u0430\u0434\u043B\u0435\u0436\u0430\u0442\u044C \u0435\u043C\u0443. \u0412\u044B\u0431\u0435\u0440\u0438\u0442\u0435 \u0440\u043E\u0434\u0438\u0442\u0435\u043B\u044C\u0441\u043A\u0438\u0439 \u043F\u0443\u043D\u043A\u0442 \u0441\u043F\u0438\u0441\u043A\u0430 \u0438\u043B\u0438 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u0435 \u0441\u0442\u0440\u0443\u043A\u0442\u0443\u0440\u0443.",
  "Paste an outline branch, or paste one line as a new node.": "\u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0432\u0435\u0442\u043A\u0443 \u0441\u043F\u0438\u0441\u043A\u0430 \u0438\u043B\u0438 \u043E\u0434\u043D\u0443 \u0441\u0442\u0440\u043E\u043A\u0443 \u043A\u0430\u043A \u043D\u043E\u0432\u044B\u0439 \u0443\u0437\u0435\u043B.",
  "Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format.": "\u0412\u0441\u0442\u0430\u0432\u043B\u044F\u0439\u0442\u0435 \u043F\u0443\u043D\u043A\u0442\u044B \u0440\u044F\u0434\u043E\u043C \u0441 \u043F\u0443\u043D\u043A\u0442\u0430\u043C\u0438, \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0438 \u2014 \u0441 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043A\u0430\u043C\u0438. \u0424\u043E\u0440\u043C\u0430\u0442 \u043C\u0435\u043D\u044F\u0439\u0442\u0435 \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u043C \u0442\u0435\u043A\u0441\u0442\u0435.",
  "The clipboard contains content outside the outline. Paste it in source view to preserve it.": "\u0411\u0443\u0444\u0435\u0440 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u043C\u043E\u0435 \u0432\u043D\u0435 \u0441\u043F\u0438\u0441\u043A\u0430. \u0412\u0441\u0442\u0430\u0432\u044C\u0442\u0435 \u0435\u0433\u043E \u0432 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0434\u043B\u044F \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u0438\u044F.",
  "Use a date in YYYY-MM-DD format, or ? for an unknown deadline.": "\u0423\u043A\u0430\u0436\u0438\u0442\u0435 \u0434\u0430\u0442\u0443 \u0413\u0413\u0413\u0413-\u041C\u041C-\u0414\u0414 \u0438\u043B\u0438 ? \u0434\u043B\u044F \u043D\u0435\u0438\u0437\u0432\u0435\u0441\u0442\u043D\u043E\u0433\u043E \u0441\u0440\u043E\u043A\u0430.",
  "That calendar date does not exist.": "\u0422\u0430\u043A\u043E\u0439 \u043A\u0430\u043B\u0435\u043D\u0434\u0430\u0440\u043D\u043E\u0439 \u0434\u0430\u0442\u044B \u043D\u0435 \u0441\u0443\u0449\u0435\u0441\u0442\u0432\u0443\u0435\u0442.",
  "The execution order contains the same step twice.": "\u041F\u043E\u0440\u044F\u0434\u043E\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u0441\u043E\u0434\u0435\u0440\u0436\u0438\u0442 \u043E\u0434\u0438\u043D \u0448\u0430\u0433 \u0434\u0432\u0430\u0436\u0434\u044B.",
  "Only numbered, undated steps can be placed in an execution order.": "\u0412 \u043F\u043E\u0440\u044F\u0434\u043E\u043A \u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u0438\u044F \u043C\u043E\u0436\u043D\u043E \u0434\u043E\u0431\u0430\u0432\u0438\u0442\u044C \u0442\u043E\u043B\u044C\u043A\u043E \u043D\u0443\u043C\u0435\u0440\u043E\u0432\u0430\u043D\u043D\u044B\u0435 \u0448\u0430\u0433\u0438 \u0431\u0435\u0437 \u0434\u0430\u0442\u044B.",
  Untitled: "\u0411\u0435\u0437 \u043D\u0430\u0437\u0432\u0430\u043D\u0438\u044F",
  "This map has no nodes. Open the source and add a heading or bullet to begin.": "\u0412 \u044D\u0442\u043E\u0439 \u043A\u0430\u0440\u0442\u0435 \u043D\u0435\u0442 \u0443\u0437\u043B\u043E\u0432. \u041E\u0442\u043A\u0440\u043E\u0439\u0442\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0439 \u0442\u0435\u043A\u0441\u0442 \u0438 \u0434\u043E\u0431\u0430\u0432\u044C\u0442\u0435 \u0437\u0430\u0433\u043E\u043B\u043E\u0432\u043E\u043A \u0438\u043B\u0438 \u043F\u0443\u043D\u043A\u0442 \u0441\u043F\u0438\u0441\u043A\u0430.",
  "Mark incomplete": "\u041E\u0442\u043C\u0435\u0442\u0438\u0442\u044C \u043D\u0435\u0432\u044B\u043F\u043E\u043B\u043D\u0435\u043D\u043D\u044B\u043C",
  "Invalid saved map patterns. Default patterns are active.": "\u0421\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u044B \u043D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B. \u0414\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0442 \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430.",
  "Automatically open matching notes as maps": "\u0410\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u0435\u0441\u043A\u0438 \u043E\u0442\u043A\u0440\u044B\u0432\u0430\u0442\u044C \u043F\u043E\u0434\u0445\u043E\u0434\u044F\u0449\u0438\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u043A\u0430\u043A \u043A\u0430\u0440\u0442\u044B",
  "Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.": "\u0414\u043B\u044F \u0437\u0430\u043C\u0435\u0442\u043E\u043A, \u0441\u043E\u043E\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044E\u0449\u0438\u0445 \u043F\u0440\u0430\u0432\u0438\u043B\u0430\u043C \u043D\u0438\u0436\u0435. \u042F\u0432\u043D\u043E\u0435 \u043E\u0442\u043A\u0440\u044B\u0442\u0438\u0435 \u0438\u0441\u0445\u043E\u0434\u043D\u043E\u0433\u043E Markdown \u0441\u043E\u0445\u0440\u0430\u043D\u044F\u0435\u0442 \u0440\u0435\u0436\u0438\u043C Markdown \u0434\u043B\u044F \u044D\u0442\u043E\u0439 \u0437\u0430\u043C\u0435\u0442\u043A\u0438.",
  "Invalid pattern on line {line}: {error}": "\u041D\u0435\u043A\u043E\u0440\u0440\u0435\u043A\u0442\u043D\u044B\u0439 \u0448\u0430\u0431\u043B\u043E\u043D \u0432 \u0441\u0442\u0440\u043E\u043A\u0435 {line}: {error}",
  "Patterns saved.": "\u0428\u0430\u0431\u043B\u043E\u043D\u044B \u0441\u043E\u0445\u0440\u0430\u043D\u0435\u043D\u044B.",
  "Pattern syntax": "\u0421\u0438\u043D\u0442\u0430\u043A\u0441\u0438\u0441 \u0448\u0430\u0431\u043B\u043E\u043D\u043E\u0432",
  "Glob (wildcards)": "Glob (\u043C\u0430\u0441\u043A\u0438)",
  "Regular expressions": "\u0420\u0435\u0433\u0443\u043B\u044F\u0440\u043D\u044B\u0435 \u0432\u044B\u0440\u0430\u0436\u0435\u043D\u0438\u044F",
  "Map file patterns": "\u0428\u0430\u0431\u043B\u043E\u043D\u044B \u0444\u0430\u0439\u043B\u043E\u0432 \u043A\u0430\u0440\u0442",
  "One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.": "\u041E\u0434\u0438\u043D \u0448\u0430\u0431\u043B\u043E\u043D \u043D\u0430 \u0441\u0442\u0440\u043E\u043A\u0443; \u0434\u043E\u0441\u0442\u0430\u0442\u043E\u0447\u043D\u043E \u043B\u044E\u0431\u043E\u0433\u043E \u0441\u043E\u0432\u043F\u0430\u0434\u0435\u043D\u0438\u044F. Glob \u0431\u0435\u0437 / \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u0442 \u0438\u043C\u044F \u0432\u043E \u0432\u0441\u0435\u0445 \u043F\u0430\u043F\u043A\u0430\u0445, \u0441 / \u2014 \u043F\u0443\u0442\u044C \u043E\u0442 \u043A\u043E\u0440\u043D\u044F \u0445\u0440\u0430\u043D\u0438\u043B\u0438\u0449\u0430. \u0414\u043E\u0441\u0442\u0443\u043F\u043D\u044B *, ** \u0438 ?. Regex \u043F\u0440\u043E\u0432\u0435\u0440\u044F\u0435\u0442 \u043F\u0443\u0442\u044C \u043E\u0442 \u043A\u043E\u0440\u043D\u044F, \u0431\u0435\u0437 \u043E\u0431\u0451\u0440\u0442\u043A\u0438 /\u2026/. \u0420\u0435\u0433\u0438\u0441\u0442\u0440 \u043D\u0435 \u0443\u0447\u0438\u0442\u044B\u0432\u0430\u0435\u0442\u0441\u044F. \u0422\u043E\u043B\u044C\u043A\u043E Markdown-\u0444\u0430\u0439\u043B\u044B.",
  "The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.": "\u0421\u0432\u043E\u0439\u0441\u0442\u0432\u043E mindmap: true \u0442\u0430\u043A\u0436\u0435 \u043E\u0431\u043E\u0437\u043D\u0430\u0447\u0430\u0435\u0442 \u043A\u0430\u0440\u0442\u0443. \u041F\u0440\u0438 \u043E\u0448\u0438\u0431\u043A\u0435 \u0432\u0432\u043E\u0434\u0430 \u0434\u0435\u0439\u0441\u0442\u0432\u0443\u044E\u0442 \u043F\u043E\u0441\u043B\u0435\u0434\u043D\u0438\u0435 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0435 \u043F\u0440\u0430\u0432\u0438\u043B\u0430. \u0428\u0430\u0431\u043B\u043E\u043D\u044B \u043E\u0431\u0449\u0438\u0435 \u0434\u043B\u044F \u0430\u0432\u0442\u043E\u043E\u0442\u043A\u0440\u044B\u0442\u0438\u044F, \u043F\u043E\u0438\u0441\u043A\u0430 \u043A\u0430\u0440\u0442 \u0438 \u0441\u043F\u0438\u0441\u043A\u043E\u0432 \u0448\u0430\u0433\u043E\u0432.",
  "This JSON map format is not supported.": "\u042D\u0442\u043E\u0442 \u0444\u043E\u0440\u043C\u0430\u0442 JSON-\u043A\u0430\u0440\u0442 \u043D\u0435 \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u0442\u0441\u044F.",
  "Restore default patterns": "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u0448\u0430\u0431\u043B\u043E\u043D\u044B",
  "Restore default settings": "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438",
  "Restore defaults": "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C",
  "Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language.": "\u0412\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u0438\u0442\u044C \u0438\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u043F\u043B\u0430\u0433\u0438\u043D\u0430, \u0433\u043E\u0440\u044F\u0447\u0438\u0435 \u043A\u043B\u0430\u0432\u0438\u0448\u0438 \u0438 \u0448\u0430\u0431\u043B\u043E\u043D\u044B \u043A\u0430\u0440\u0442? \u041B\u043E\u043A\u0430\u043B\u044C\u043D\u044B\u0435 \u0441\u043E\u0441\u0442\u043E\u044F\u043D\u0438\u044F \u043F\u0440\u043E\u0441\u043C\u043E\u0442\u0440\u0430 \u0438 \u0441\u043E\u0445\u0440\u0430\u043D\u0451\u043D\u043D\u044B\u0435 \u0437\u0430\u043C\u0435\u0442\u043A\u0438 \u043E\u0441\u0442\u0430\u043D\u0443\u0442\u0441\u044F. \u0414\u043B\u044F \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u044F\u0437\u044B\u043A\u0430 \u043F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 Obsidian.",
  "Default settings restored. Restart Obsidian to apply the language.": "\u0418\u0441\u0445\u043E\u0434\u043D\u044B\u0435 \u043D\u0430\u0441\u0442\u0440\u043E\u0439\u043A\u0438 \u0432\u043E\u0441\u0441\u0442\u0430\u043D\u043E\u0432\u043B\u0435\u043D\u044B. \u041F\u0435\u0440\u0435\u0437\u0430\u043F\u0443\u0441\u0442\u0438\u0442\u0435 Obsidian \u0434\u043B\u044F \u043F\u0440\u0438\u043C\u0435\u043D\u0435\u043D\u0438\u044F \u044F\u0437\u044B\u043A\u0430."
};

// src/i18n.ts
var LANGUAGES = {
  en: "English",
  uk: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430",
  ru: "\u0420\u0443\u0441\u0441\u043A\u0438\u0439",
  pl: "Polski",
  de: "Deutsch",
  es: "Espa\xF1ol",
  fr: "Fran\xE7ais",
  "pt-BR": "Portugu\xEAs (Brasil)",
  "zh-CN": "\u7B80\u4F53\u4E2D\u6587",
  ja: "\u65E5\u672C\u8A9E",
  ko: "\uD55C\uAD6D\uC5B4"
};
var dictionaries = { en: en_default, uk: uk_default, ru: ru_default, pl: pl_default, de: de_default, es: es_default, fr: fr_default, "pt-BR": pt_BR_default, "zh-CN": zh_CN_default, ja: ja_default, ko: ko_default };
var language = "en";
function resolveLanguage(value) {
  const code = value.trim().replace(/_/g, "-").toLowerCase();
  const exact = Object.keys(LANGUAGES).find((key) => key.toLowerCase() === code);
  if (exact) return exact;
  const base = code.split("-")[0];
  if (base === "pt") return "pt-BR";
  if (base === "zh") return "zh-CN";
  return Object.prototype.hasOwnProperty.call(LANGUAGES, base) ? base : "en";
}
function isLanguageSetting(value) {
  return typeof value === "string" && (value === "auto" || Object.prototype.hasOwnProperty.call(LANGUAGES, value));
}
function setLanguage(value, appLanguage = "en") {
  language = resolveLanguage(value === "auto" ? appLanguage : value);
}
function getLocale() {
  return language;
}
function t(key, values = {}) {
  const text = dictionaries[language][key] || en_default[key];
  return text.replace(/\{(\w+)\}/g, (token, name) => Object.prototype.hasOwnProperty.call(values, name) ? String(values[name]) : token);
}

// src/main.ts
var import_obsidian4 = require("obsidian");

// src/core.ts
function sourceLines(source) {
  const result = [];
  const endings = /\r\n|\n|\r/g;
  let start = 0;
  for (const match of source.matchAll(endings)) {
    const end = match.index;
    result.push({ start, end, after: end + match[0].length, text: source.slice(start, end) });
    start = end + match[0].length;
  }
  result.push({ start, end: source.length, after: source.length, text: source.slice(start) });
  return result;
}
function width(indent) {
  let columns = 0;
  for (const ch of indent) columns += ch === "	" ? 4 - columns % 4 : 1;
  return columns;
}
function anchor(text) {
  const match = /([ \t]+\^([A-Za-z0-9][A-Za-z0-9-]*)[ \t]*)$/.exec(text);
  return match ? { text: text.slice(0, match.index), suffix: match[1], blockId: match[2] } : { text, suffix: "" };
}
function identity(text) {
  return text.replace(/^\[[^\]]\]\s*/, "").replace(/^#step\s+(?:\d+(?:\.\d+)*[a-z]*\)|\))\s*/i, "#step ").replace(/\s+/g, " ").trim();
}
function hash(value) {
  let h = 2166136261;
  for (let i = 0; i < value.length; i++) h = Math.imul(h ^ value.charCodeAt(i), 16777619);
  return (h >>> 0).toString(36);
}
function parseMap(source, previous) {
  const lines = sourceLines(source).map((line) => line.text);
  const doc = { source, lines, eol: /\r\n|\n|\r/.exec(source)?.[0] ?? "\n", nodes: [], roots: [], byId: /* @__PURE__ */ new Map() };
  const headings = [];
  const bullets = [];
  const parents = /* @__PURE__ */ new Map();
  let frontmatter = lines[0]?.replace(/^\uFEFF/, "") === "---";
  let fence = null;
  for (let line = 0; line < lines.length; line++) {
    const raw = lines[line];
    if (frontmatter) {
      if (line > 0 && /^(?:---|\.\.\.)[ \t]*$/.test(raw)) frontmatter = false;
      continue;
    }
    const fenceMatch = /^[ \t]*(?:(?:[-+*]|\d+[.)])[ \t]+)?(`{3,}|~{3,})(.*)$/.exec(raw);
    if (fence) {
      const closing = /^[ \t]*(`{3,}|~{3,})[ \t]*$/.exec(raw);
      if (closing && closing[1][0] === fence.marker && closing[1].length >= fence.length) fence = null;
      continue;
    }
    if (fenceMatch) {
      fence = { marker: fenceMatch[1][0], length: fenceMatch[1].length };
      continue;
    }
    const heading = /^( {0,3})(#{1,6})([ \t]+)(.*)$/.exec(raw);
    const bullet = /^([ \t]*)([-+*]|\d+[.)])([ \t]+)(.*)$/.exec(raw);
    let node;
    let parent;
    if (heading) {
      bullets.length = 0;
      const level = heading[2].length;
      while (headings.length && headings[headings.length - 1].level >= level) headings.pop();
      if (level === 1 && /^\/[ \t]*(?:#+[ \t]*)?$/.test(heading[4])) {
        headings.length = 0;
        continue;
      }
      const content = anchor(heading[4]);
      node = { id: "", text: content.text, blockId: content.blockId, line, endLine: line, indent: level, kind: "heading", prefix: heading[1] + heading[2] + heading[3], parentId: null, children: [] };
      parent = headings[headings.length - 1]?.node ?? null;
      headings.push({ node, level });
    } else if (bullet && !/^([ \t]*)([-*_])(?:[ \t]*\2){2,}[ \t]*$/.test(raw)) {
      const indent = width(bullet[1]);
      while (bullets.length && bullets[bullets.length - 1].indent >= indent) bullets.pop();
      const content = anchor(bullet[4]);
      node = { id: "", text: content.text, blockId: content.blockId, line, endLine: line, indent, kind: "bullet", prefix: bullet[1] + bullet[2] + bullet[3], parentId: null, children: [] };
      parent = bullets[bullets.length - 1] ?? headings[headings.length - 1]?.node ?? null;
      bullets.push(node);
    } else continue;
    parents.set(node, parent);
    doc.nodes.push(node);
  }
  const blocks = /* @__PURE__ */ new Map();
  for (const node of doc.nodes) if (node.blockId) blocks.set(node.blockId, (blocks.get(node.blockId) ?? 0) + 1);
  const occurrence = /* @__PURE__ */ new Map();
  for (const node of doc.nodes) {
    const parent = parents.get(node);
    const key = `${parent?.id ?? "/"}|${identity(node.text)}`;
    const count = (occurrence.get(key) ?? 0) + 1;
    occurrence.set(key, count);
    let id = node.blockId && blocks.get(node.blockId) === 1 ? `block:${node.blockId}` : `node:${hash(key)}:${count}`;
    while (doc.byId.has(id)) id += "_";
    node.id = id;
    node.parentId = parent?.id ?? null;
    if (parent) parent.children.push(id);
    else doc.roots.push(id);
    doc.byId.set(id, node);
  }
  const open = [];
  for (const node of doc.nodes) {
    while (open.length && open[open.length - 1].id !== node.parentId) {
      const done = open.pop();
      done.endLine = node.line - 1;
      while (done.endLine > done.line && !lines[done.endLine].trim()) done.endLine--;
    }
    open.push(node);
  }
  for (const done of open) {
    done.endLine = lines.length - 1;
    while (done.endLine > done.line && !lines[done.endLine].trim()) done.endLine--;
  }
  if (previous) reconcileIds(previous, doc);
  return doc;
}
function reconcileIds(previous, next) {
  const matched = /* @__PURE__ */ new Map();
  const used = /* @__PURE__ */ new Set();
  const oldByLine = new Map(previous.nodes.map((node) => [node.line, node]));
  let prefix = 0;
  while (prefix < previous.lines.length && prefix < next.lines.length && previous.lines[prefix] === next.lines[prefix]) prefix++;
  let suffix = 0;
  while (suffix < previous.lines.length - prefix && suffix < next.lines.length - prefix && previous.lines[previous.lines.length - 1 - suffix] === next.lines[next.lines.length - 1 - suffix]) suffix++;
  const oldBranches = /* @__PURE__ */ new Map(), newBranches = /* @__PURE__ */ new Map();
  for (const [doc, groups] of [[previous, oldBranches], [next, newBranches]]) for (const node of doc.nodes) {
    if (doc === previous ? used.has(node.id) : matched.has(node)) continue;
    const key = doc.lines.slice(node.line, node.endLine + 1).join("\n");
    groups.set(key, [...groups.get(key) ?? [], node]);
  }
  for (const [key, nodes] of newBranches) {
    if (matched.has(nodes[0])) continue;
    const old = oldBranches.get(key);
    if (nodes.length === 1 && old?.length === 1) for (const node of next.nodes) {
      if (node.line < nodes[0].line || node.line > nodes[0].endLine || matched.has(node)) continue;
      const prior = oldByLine.get(old[0].line + node.line - nodes[0].line);
      if (prior && !used.has(prior.id)) {
        matched.set(node, prior.id);
        used.add(prior.id);
      }
    }
  }
  for (const node of next.nodes) {
    if (matched.has(node)) continue;
    const oldLine = node.line < prefix ? node.line : node.line >= next.lines.length - suffix ? node.line + previous.lines.length - next.lines.length : -1;
    const old = oldByLine.get(oldLine);
    if (old && old.kind === node.kind && !used.has(old.id)) {
      matched.set(node, old.id);
      used.add(old.id);
    }
  }
  for (const node of next.nodes) if (!matched.has(node) && !used.has(node.id) && previous.byId.has(node.id)) {
    matched.set(node, node.id);
    used.add(node.id);
  }
  const oldByText = /* @__PURE__ */ new Map();
  const newByText = /* @__PURE__ */ new Map();
  for (const node of previous.nodes) if (!used.has(node.id)) {
    const key = `${node.kind}|${identity(node.text)}`;
    oldByText.set(key, [...oldByText.get(key) ?? [], node]);
  }
  for (const node of next.nodes) if (!matched.has(node)) {
    const key = `${node.kind}|${identity(node.text)}`;
    newByText.set(key, [...newByText.get(key) ?? [], node]);
  }
  for (const [key, nodes] of newByText) {
    const old = oldByText.get(key);
    if (nodes.length === 1 && old?.length === 1 && !nodes[0].blockId && !old[0].blockId) {
      matched.set(nodes[0], old[0].id);
      used.add(old[0].id);
    }
  }
  if (previous.nodes.length === next.nodes.length) for (let index = 0; index < next.nodes.length; index++) {
    const node = next.nodes[index], old = previous.nodes[index];
    if (!matched.has(node) && !used.has(old.id) && !node.blockId && !old.blockId && node.line === old.line && node.kind === old.kind && node.prefix === old.prefix && node.children.length === old.children.length) {
      matched.set(node, old.id);
      used.add(old.id);
    }
  }
  for (const node of next.nodes) {
    const oldId = matched.get(node), old = oldId ? previous.byId.get(oldId) : void 0;
    if (!old || node.children.length !== old.children.length) continue;
    const pairs = node.children.map((id, index) => [next.byId.get(id), previous.byId.get(old.children[index])]);
    if (!pairs.every(([child, prior]) => child.kind === prior.kind && identity(child.text) === identity(prior.text) && child.blockId === prior.blockId && (matched.has(child) ? matched.get(child) === prior.id : !used.has(prior.id)))) continue;
    for (const [child, prior] of pairs) {
      matched.set(child, prior.id);
      used.add(prior.id);
    }
  }
  const remap = /* @__PURE__ */ new Map();
  const reserved = new Set(matched.values());
  for (const node of next.nodes) {
    let id = matched.get(node) ?? node.id;
    if (!matched.has(node)) while (reserved.has(id)) id += "_";
    reserved.add(id);
    remap.set(node.id, id);
  }
  next.byId.clear();
  for (const node of next.nodes) {
    node.id = remap.get(node.id);
    node.parentId = node.parentId ? remap.get(node.parentId) : null;
    node.children = node.children.map((id) => remap.get(id));
    next.byId.set(node.id, node);
  }
  next.roots = next.roots.map((id) => remap.get(id));
}
function required(doc, id) {
  const node = doc.byId.get(id);
  if (!node) throw new Error(t("This node no longer exists. Reopen the map and try again."));
  return node;
}
function singleLine(text) {
  if (/[\r\n\u2028\u2029\x00-\x08]/.test(text)) throw new Error(t("A map node must fit on one line. Use a child node or a linked note for more text."));
}
function assertNodeLine(prefix, text) {
  const line = prefix + text;
  if (/^[ \t]*(?:(?:[-+*]|\d+[.)])[ \t]+)?(`{3,}|~{3,})/.test(line) || /^([ \t]*)([-*_])(?:[ \t]*\2){2,}[ \t]*$/.test(line)) {
    throw new Error(t("This label would become a Markdown code fence or horizontal rule. Escape its marker or edit it in source view."));
  }
}
function editNode(doc, id, text) {
  singleLine(text);
  const node = required(doc, id);
  if (text === node.text) return doc.source;
  const line = sourceLines(doc.source)[node.line];
  const current = anchor(line.text.slice(node.prefix.length));
  const label2 = current.blockId ? anchor(text).text : text;
  assertNodeLine(node.prefix, label2 + current.suffix);
  return doc.source.slice(0, line.start) + node.prefix + label2 + current.suffix + doc.source.slice(line.end);
}
function indentation(doc, node) {
  return /^[ \t]*/.exec(doc.lines[node.line])[0];
}
function childUnit(doc, node) {
  if (node.kind === "bullet") {
    const base = indentation(doc, node);
    for (const id of node.children) {
      const child = required(doc, id), indent = indentation(doc, child);
      if (child.kind === "bullet" && indent.startsWith(base) && indent.length > base.length) return indent.slice(base.length);
    }
    const parent = node.parentId ? required(doc, node.parentId) : null;
    if (parent?.kind === "bullet") {
      const parentIndent = indentation(doc, parent);
      if (base.startsWith(parentIndent) && base.length > parentIndent.length) return base.slice(parentIndent.length);
    }
  }
  for (const item of doc.nodes) if (item.kind === "bullet" && item.parentId) {
    const parent = required(doc, item.parentId);
    if (parent.kind !== "bullet") continue;
    const base = indentation(doc, parent), child = indentation(doc, item);
    if (child.startsWith(base) && child.length > base.length) return child.slice(base.length);
  }
  return "  ";
}
function insertAfter(doc, lineNumber, block) {
  const info = sourceLines(doc.source)[lineNumber];
  const hasEnding = info.after > info.end;
  const clean = block.replace(/(?:\r\n|\n|\r)+$/, "");
  return doc.source.slice(0, info.after) + (hasEnding ? "" : doc.eol) + clean + (hasEnding ? doc.eol : "") + doc.source.slice(info.after);
}
function addNode(doc, id, relation, text) {
  singleLine(text);
  const node = required(doc, id);
  assertStructural(doc, node);
  let prefix;
  if (relation === "sibling" || relation === "before") prefix = node.prefix;
  else if (node.kind === "bullet") prefix = indentation(doc, node) + childUnit(doc, node) + "- ";
  else {
    const headingChild = node.children.map((child) => required(doc, child)).find((child) => child.kind === "heading");
    prefix = headingChild ? "#".repeat(node.indent + 1) + " " : "- ";
    if (headingChild && node.indent >= 6) throw new Error(t("Markdown supports at most six heading levels. Add a bullet child in source view."));
  }
  assertNodeLine(prefix, text);
  if (relation === "before") {
    const start = sourceLines(doc.source)[node.line].start;
    return doc.source.slice(0, start) + prefix + text + doc.eol + doc.source.slice(start);
  }
  return insertAfter(doc, node.endLine, prefix + text);
}
function addParent(doc, id, text) {
  singleLine(text);
  const node = required(doc, id);
  assertNodeLine(node.prefix, text);
  const newIndent = node.kind === "heading" ? node.indent + 1 : indentation(doc, node) + childUnit(doc, node);
  const branch = transformBranch(doc, node, newIndent);
  const bounds = range(doc, node);
  const next = doc.source.slice(0, bounds.start) + node.prefix + text + doc.eol + branch + doc.source.slice(bounds.end);
  const parsed = parseMap(next), parent = parsed.nodes.find((item) => item.line === node.line);
  if (!parent || parent.children.length !== 1 || parsed.byId.get(parent.children[0])?.line !== node.line + 1) {
    throw new Error(t("This label cannot be used as a Markdown parent node. Escape its marker or edit it in source view."));
  }
  return next;
}
function assertStructural(doc, node) {
  const nodeLines = new Set(doc.nodes.filter((item) => item.line >= node.line && item.line <= node.endLine).map((item) => item.line));
  for (let line = node.line; line <= node.endLine; line++) {
    if (doc.lines[line].trim() && !nodeLines.has(line)) throw new Error(t("This branch contains a paragraph, code block, or other Markdown outside its node lines. Edit its structure in source view to keep that content intact."));
  }
}
function range(doc, node) {
  const lines = sourceLines(doc.source);
  return { start: lines[node.line].start, end: lines[node.endLine].after };
}
function copyBranch(doc, id) {
  const bounds = range(doc, required(doc, id));
  return doc.source.slice(bounds.start, bounds.end);
}
function deleteNode(doc, id) {
  const node = required(doc, id);
  assertStructural(doc, node);
  const bounds = range(doc, node);
  return doc.source.slice(0, bounds.start) + doc.source.slice(bounds.end);
}
function selectedBranches(doc, ids) {
  const selected = new Set(ids);
  return doc.nodes.filter((node) => {
    if (!selected.has(node.id)) return false;
    for (let parent = node.parentId; parent; parent = required(doc, parent).parentId) if (selected.has(parent)) return false;
    return true;
  });
}
function deleteNodes(doc, ids) {
  const branches = selectedBranches(doc, ids);
  for (const node of branches) assertStructural(doc, node);
  let source = doc.source;
  for (const node of branches.reverse()) {
    const bounds = range(doc, node);
    source = source.slice(0, bounds.start) + source.slice(bounds.end);
  }
  return source;
}
function copyBranches(doc, ids) {
  return selectedBranches(doc, ids).map((node) => transformBranch(doc, node, node.kind === "heading" ? 1 : "").replace(/(?:\r\n|\n|\r)+$/, "")).join(doc.eol) + doc.eol;
}
function changeNodes(doc, ids, change) {
  const selected = new Set(ids);
  let current = doc;
  for (const node of doc.nodes.filter((node2) => selected.has(node2.id))) {
    const target = current.nodes.find((candidate) => candidate.line === node.line);
    if (!target) throw new Error(t("The selection changed. Run the command again."));
    current = parseMap(change(current, target.id), current);
  }
  return current.source;
}
function shiftIndent(raw, removeColumns, newBase) {
  const indent = /^[ \t]*/.exec(raw)[0];
  let at = 0, columns = 0;
  while (at < indent.length && columns < removeColumns) {
    columns += indent[at] === "	" ? 4 - columns % 4 : 1;
    at++;
  }
  if (columns < removeColumns) throw new Error(t("This branch uses ambiguous indentation. Adjust it in source view before moving it."));
  const shifted = newBase + " ".repeat(Math.max(0, columns - removeColumns)) + indent.slice(at);
  const expected = width(newBase) + width(indent) - removeColumns;
  const adjusted = width(shifted) === expected ? shifted : newBase + " ".repeat(width(indent) - removeColumns);
  return adjusted + raw.slice(indent.length);
}
function transformBranch(doc, node, newIndent) {
  assertStructural(doc, node);
  const info = sourceLines(doc.source);
  let result = "";
  for (let line = node.line; line <= node.endLine; line++) {
    let raw = info[line].text;
    if (raw.trim()) {
      if (node.kind === "heading") {
        const heading = /^( {0,3})(#{1,6})([ \t]+)/.exec(raw);
        if (heading) {
          const level = heading[2].length + Number(newIndent) - node.indent;
          if (level < 1 || level > 6) throw new Error(t("That move would exceed Markdown\u2019s six heading levels."));
          raw = heading[1] + "#".repeat(level) + raw.slice(heading[1].length + heading[2].length);
        }
      } else raw = shiftIndent(raw, node.indent, String(newIndent));
    }
    result += raw + doc.source.slice(info[line].end, info[line].after);
  }
  return result;
}
function relocate(doc, node, destination, block) {
  const bounds = range(doc, node);
  let source = doc.source.slice(0, bounds.start) + doc.source.slice(bounds.end);
  const insertion = destination >= bounds.end ? destination - (bounds.end - bounds.start) : destination;
  if (insertion > 0 && !/[\r\n]$/.test(source.slice(0, insertion))) block = doc.eol + block;
  if (insertion < source.length && !/[\r\n]$/.test(block)) block += doc.eol;
  source = source.slice(0, insertion) + block + source.slice(insertion);
  return source;
}
function moveNode(doc, id, direction) {
  const node = required(doc, id);
  assertStructural(doc, node);
  const parent = node.parentId ? required(doc, node.parentId) : null;
  const siblings = parent?.children ?? doc.roots;
  const index = siblings.indexOf(id);
  if (direction === "up" || direction === "down") {
    const siblingId = siblings[index + (direction === "up" ? -1 : 1)];
    if (!siblingId) return doc.source;
    const sibling = required(doc, siblingId);
    if (sibling.kind !== node.kind || node.kind === "heading" && sibling.indent !== node.indent) throw new Error(t("Moving between a heading and a bullet changes their meaning. Make this structural change in source view."));
    assertStructural(doc, sibling);
    const first = direction === "up" ? sibling : node;
    const second = direction === "up" ? node : sibling;
    const a = range(doc, first), b = range(doc, second);
    let firstText = doc.source.slice(a.start, a.end), secondText = doc.source.slice(b.start, b.end);
    const gap = doc.source.slice(a.end, b.start);
    if (!/[\r\n]$/.test(secondText)) secondText += doc.eol;
    if (b.end === doc.source.length && !/[\r\n]$/.test(doc.source)) firstText = firstText.replace(/(?:\r\n|\n|\r)$/, "");
    return doc.source.slice(0, a.start) + secondText + gap + firstText + doc.source.slice(b.end);
  }
  if (direction === "indent") {
    if (index === 0) return doc.source;
    const target = required(doc, siblings[index - 1]);
    if (target.kind !== node.kind) throw new Error(t("Indenting across mixed heading and bullet nodes is ambiguous. Use source view."));
    const newIndent2 = node.kind === "heading" ? target.indent + 1 : indentation(doc, target) + childUnit(doc, target);
    const bounds = range(doc, node);
    return doc.source.slice(0, bounds.start) + transformBranch(doc, node, newIndent2) + doc.source.slice(bounds.end);
  }
  if (!parent) return doc.source;
  if (node.kind !== parent.kind) throw new Error(t("A bullet under a heading cannot be outdented without changing Markdown formats. Use source view."));
  const newIndent = node.kind === "heading" ? parent.indent : indentation(doc, parent);
  return relocate(doc, node, range(doc, parent).end, transformBranch(doc, node, newIndent));
}
function canDropBranches(doc, ids, targetId, position) {
  const target = doc.byId.get(targetId), selected = new Set(ids);
  if (!target || !ids.length || ids.some((id) => !doc.byId.has(id))) return false;
  for (let node = target; node; node = node.parentId ? doc.byId.get(node.parentId) : void 0) if (selected.has(node.id)) return false;
  const branches = selectedBranches(doc, ids);
  if (position === "child" && target.kind === "heading" && branches.some((node) => node.kind === "heading") && branches.some((node) => node.kind !== "heading")) return false;
  return branches.every((node) => position === "child" ? node.kind !== "heading" || target.kind === "heading" : node.kind === target.kind);
}
function moveBranches(doc, ids, targetId, position) {
  if (!canDropBranches(doc, ids, targetId, position)) throw new Error(t("Cannot move a branch into itself, a descendant or an incompatible Markdown node."));
  const target = required(doc, targetId), branches = selectedBranches(doc, ids);
  assertStructural(doc, target);
  const lines = sourceLines(doc.source);
  const destination = position === "before" ? lines[target.line].start : range(doc, target).end;
  const bounds = branches.map((node) => range(doc, node));
  const blocks = branches.map((node) => {
    let indent;
    if (position !== "child") indent = node.kind === "heading" ? target.indent : indentation(doc, target);
    else if (node.kind === "heading") indent = target.indent + 1;
    else if (target.kind === "bullet") indent = indentation(doc, target) + childUnit(doc, target);
    else {
      if (target.children.some((id) => required(doc, id).kind === "heading")) throw new Error(t("A bullet after a subheading belongs to that heading. Choose a bullet parent or edit the Markdown structure."));
      const sibling = target.children.map((id) => required(doc, id)).find((child) => !ids.includes(child.id));
      indent = sibling ? indentation(doc, sibling) : "";
    }
    return transformBranch(doc, node, indent).replace(/(?:\r\n|\n|\r)+$/, "");
  });
  let source = doc.source;
  for (const bound of [...bounds].reverse()) source = source.slice(0, bound.start) + source.slice(bound.end);
  const insertion = destination - bounds.filter((bound) => bound.end <= destination).reduce((sum, bound) => sum + bound.end - bound.start, 0);
  let block = blocks.join(doc.eol);
  if (insertion > 0 && !/[\r\n]$/.test(source.slice(0, insertion))) block = doc.eol + block;
  if (insertion < source.length || /[\r\n]$/.test(doc.source)) block += doc.eol;
  const moved = source.slice(0, insertion) + block + source.slice(insertion);
  return /[\r\n]$/.test(doc.source) ? moved : moved.replace(/(?:\r\n|\n|\r)$/, "");
}
function pasteBranch(doc, id, text, placement = "after") {
  if (!text.trim()) return doc.source;
  const target = required(doc, id);
  assertStructural(doc, target);
  if (!/[\r\n]/.test(text) && !/^[ \t]*(?:[-+*]|\d+[.)]|#{1,6})[ \t]/.test(text)) return addNode(doc, id, placement === "child" ? "child" : "sibling", anchor(text).text);
  const incoming = parseMap(text);
  if (!incoming.nodes.length) throw new Error(t("Paste an outline branch, or paste one line as a new node."));
  const roots = incoming.roots.map((root) => required(incoming, root));
  const covered = /* @__PURE__ */ new Set();
  for (const root of roots) {
    assertStructural(incoming, root);
    for (let line = root.line; line <= root.endLine; line++) covered.add(line);
    if (placement === "after" && root.kind !== target.kind) throw new Error(t("Paste bullet branches beside bullets and heading branches beside headings. Use source view to convert their format."));
    if (placement === "child" && root.kind === "heading" && target.kind !== "heading") throw new Error(t("A Markdown heading cannot become a bullet child. Change its format in source view first."));
    if (placement === "child" && root.kind === "bullet" && target.kind === "heading" && (target.children.some((child) => required(doc, child).kind === "heading") || roots.some((item) => item.kind === "heading"))) {
      throw new Error(t("A bullet appended after a subheading would belong to that subheading. Choose a bullet parent or change the structure in source view."));
    }
  }
  if (incoming.lines.some((line, index) => line.trim() && !covered.has(index))) throw new Error(t("The clipboard contains content outside the outline. Paste it in source view to preserve it."));
  let output = "";
  for (const root of roots) {
    let newIndent;
    if (placement === "after") newIndent = target.kind === "heading" ? target.indent : indentation(doc, target);
    else if (root.kind === "heading") newIndent = target.indent + 1;
    else if (target.kind === "bullet") newIndent = indentation(doc, target) + childUnit(doc, target);
    else {
      const sibling = target.children.map((child) => required(doc, child)).find((child) => child.kind === "bullet");
      newIndent = sibling ? indentation(doc, sibling) : "";
    }
    const transformed = transformBranch(incoming, root, newIndent);
    const clean = sourceLines(transformed).map((line) => anchor(line.text).text).join(doc.eol).replace(/(?:\r\n|\n|\r)+$/, "");
    output += (output ? doc.eol : "") + clean;
  }
  return insertAfter(doc, target.endLine, output);
}
function taskMatch(text) {
  return /^\[([^\]])\]([ \t]*)/.exec(text);
}
function toggleTask(doc, id) {
  const node = required(doc, id), match = taskMatch(node.text);
  return editNode(doc, id, match ? `[${/[xX]/.test(match[1]) ? " " : "x"}]${node.text.slice(3)}` : "[ ] " + node.text);
}
function stepParts(text) {
  const match = /^(?:\[[^\]]\][ \t]*)?#step(?:[ \t]+|$)(.*)$/i.exec(text);
  if (!match) return null;
  const tail = match[1];
  const bodyStart = text.length - tail.length;
  const numbered = /^(\d+(?:\.\d+)*)([a-z]*)\)[ \t]*/i.exec(tail);
  const bare = !numbered ? /^\)[ \t]*/.exec(tail) : null;
  const orderLength = numbered?.[0].length ?? bare?.[0].length ?? 0;
  const afterNumber = tail.slice(orderLength);
  const dated = /^до([ \t]+)(\[\[(\d{4}-\d{2}-\d{2})(?:\|[^\]]*)?\]\]|(\d{4}-\d{2}-\d{2})|(\?))(?=\)|[ \t]|$)\)?[ \t]*/i.exec(afterNumber);
  const afterDate = dated ? afterNumber.slice(dated[0].length) : afterNumber;
  const trailingNumber = dated && !numbered && !bare ? /^(\d+(?:\.\d+)*)([a-z]*)\)[ \t]*/i.exec(afterDate) : null;
  const order = numbered ?? trailingNumber;
  const orderParts = order ? order[1].split(".").map(Number) : [];
  const dateStart = dated ? bodyStart + orderLength + 2 + dated[1].length : -1;
  return {
    number: orderParts[0] ?? null,
    order: orderParts,
    suffix: order?.[2]?.toLowerCase() ?? "",
    date: dated ? dated[3] ?? dated[4] ?? null : null,
    unknownDate: !!dated?.[5],
    bodyStart,
    label: trailingNumber ? afterDate.slice(trailingNumber[0].length) : afterDate,
    bareLength: bare?.[0].length ?? 0,
    dateStart,
    dateEnd: dated ? dateStart + dated[2].length : -1
  };
}
function getSteps(doc) {
  const result = [];
  for (const node of doc.nodes) {
    const parts = stepParts(node.text);
    if (!parts) continue;
    let frozen = false, ancestor = node;
    while (ancestor) {
      if (/🧊|заморож|frozen/i.test(ancestor.text)) frozen = true;
      ancestor = ancestor.parentId ? doc.byId.get(ancestor.parentId) : void 0;
    }
    result.push({ nodeId: node.id, line: node.line, text: node.text, completed: /^\[[xX]\]/.test(node.text), number: parts.number, order: parts.order, suffix: parts.suffix, date: parts.date, unknownDate: parts.unknownDate, frozen });
  }
  return result;
}
function compareSteps(a, b) {
  if (a.number === null || b.number === null) return a.number === b.number ? a.line - b.line : a.number === null ? 1 : -1;
  const left = a.order?.length ? a.order : [a.number], right = b.order?.length ? b.order : [b.number];
  for (let part = 0; part < Math.min(left.length, right.length); part++) {
    if (left[part] !== right[part]) return left[part] - right[part];
  }
  return left.length - right.length || a.suffix.localeCompare(b.suffix, "en") || a.line - b.line;
}
function setStep(doc, id) {
  const node = required(doc, id);
  if (stepParts(node.text)) return doc.source;
  const next = Math.max(0, ...getSteps(doc).filter((step) => !step.date && !step.unknownDate).map((step) => step.number ?? 0)) + 1;
  const check = taskMatch(node.text);
  return editNode(doc, id, `${check ? check[0].slice(0, 3) : "[ ]"} #step ${next}) ${check ? node.text.slice(check[0].length) : node.text}`);
}
function taskLabel(text) {
  const check = taskMatch(text);
  const label2 = stepParts(text)?.label ?? (check ? text.slice(check[0].length) : text);
  return { checkbox: check ? check[0].slice(0, 3) : "[ ]", label: label2 };
}
function setDated(doc, id, date) {
  if (date !== "?") {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error(t("Use a date in YYYY-MM-DD format, or ? for an unknown deadline."));
    const parsed = /* @__PURE__ */ new Date(date + "T12:00:00Z");
    if (Number.isNaN(parsed.valueOf()) || parsed.toISOString().slice(0, 10) !== date) throw new Error(t("That calendar date does not exist."));
  }
  const node = required(doc, id), parts = stepParts(node.text);
  const deadline = date === "?" ? "?" : `[[${date}]]`;
  if (parts?.dateStart !== void 0 && parts.dateStart >= 0) {
    const old = node.text.slice(parts.dateStart, parts.dateEnd);
    const replacement = date === "?" ? "?" : old === "?" ? deadline : old.replace(/\d{4}-\d{2}-\d{2}/, date);
    return editNode(doc, id, node.text.slice(0, parts.dateStart) + replacement + node.text.slice(parts.dateEnd));
  }
  if (parts) {
    const prefix2 = node.text.slice(0, parts.bodyStart);
    const body = node.text.slice(parts.bodyStart + parts.bareLength);
    return editNode(doc, id, `${prefix2}${/[ \t]$/.test(prefix2) ? "" : " "}\u0434\u043E ${deadline}${body ? " " + body : ""}`);
  }
  const check = taskMatch(node.text);
  const prefix = check ? check[0] + (check[2] ? "" : " ") : "[ ] ";
  const label2 = check ? node.text.slice(check[0].length) : node.text;
  return editNode(doc, id, `${prefix}#step \u0434\u043E ${deadline}${label2 ? " " + label2 : ""}`);
}
function setQuestion(doc, id) {
  const node = required(doc, id);
  if (/^(?:==)?\/\/todo\s+Q:/i.test(node.text)) return doc.source;
  return editNode(doc, id, `==//todo Q: ${taskLabel(node.text).label}==`);
}
function renumberSteps(doc, orderedNodeIds) {
  const numbered = getSteps(doc).filter((step) => step.number !== null && !step.date && !step.unknownDate);
  numbered.sort(compareSteps);
  let ordered = numbered;
  if (orderedNodeIds) {
    const available = new Map(numbered.map((step) => [step.nodeId, step]));
    const seen = /* @__PURE__ */ new Set();
    const requested = [];
    for (const id of orderedNodeIds) {
      if (seen.has(id)) throw new Error(t("The execution order contains the same step twice."));
      seen.add(id);
      const step = available.get(id);
      if (!step) throw new Error(t("Only numbered, undated steps can be placed in an execution order."));
      requested.push(step);
    }
    ordered = [...requested, ...numbered.filter((step) => !seen.has(step.nodeId))];
  }
  const info = sourceLines(doc.source);
  const replacements = ordered.map((step, index) => {
    const node = required(doc, step.nodeId), line = info[node.line];
    const text = line.text.replace(/(#step[ \t]+)\d+(?:\.\d+)*[a-z]*(?=\))/i, (_match, prefix) => prefix + (index + 1));
    return { start: line.start, end: line.end, text };
  }).sort((a, b) => b.start - a.start);
  let source = doc.source;
  for (const replacement of replacements) source = source.slice(0, replacement.start) + replacement.text + source.slice(replacement.end);
  return source;
}

// src/block-links.ts
function addressNode(doc, id, blockId) {
  const node = doc.byId.get(id);
  if (!node || node.kind === "root") throw new Error(t("A node with its own Markdown line is required."));
  if (node.blockId) {
    if (doc.nodes.filter((candidate) => candidate.blockId === node.blockId).length !== 1) throw new Error(t("This block ID is duplicated. Fix it in the source Markdown before copying the address."));
    return { source: doc.source, blockId: node.blockId };
  }
  if (!/^[A-Za-z0-9][A-Za-z0-9-]*$/.test(blockId) || doc.nodes.some((candidate) => candidate.blockId === blockId)) throw new Error(t("A unique block ID is required."));
  const endings = [...doc.source.matchAll(/\r\n|\n|\r/g)];
  const end = endings[node.line]?.index ?? doc.source.length;
  return { source: doc.source.slice(0, end) + " ^" + blockId + doc.source.slice(end), blockId };
}
function onlyAddedBlockIds(before, after) {
  if (before.eol !== after.eol || before.lines.length !== after.lines.length || before.nodes.length !== after.nodes.length) return false;
  const byLine = new Map(before.nodes.map((node) => [node.line, node]));
  return before.lines.every((line, index) => {
    if (line === after.lines[index]) return true;
    const old = byLine.get(index), fresh = after.nodes.find((node) => node.line === index);
    if (!old || !fresh || old.blockId || !fresh.blockId || old.kind !== fresh.kind || old.prefix !== fresh.prefix || old.text !== fresh.text) return false;
    return after.lines[index] === line + " ^" + fresh.blockId;
  });
}

// src/hotkeys.ts
var HOTKEY_DEFINITIONS = [
  { id: "select-previous", get label() {
    return t("Extend selection up");
  }, defaults: ["Shift+ArrowUp"] },
  { id: "select-next", get label() {
    return t("Extend selection down");
  }, defaults: ["Shift+ArrowDown"] },
  { id: "select-parent", get label() {
    return t("Extend selection to parent");
  }, defaults: ["Shift+ArrowLeft"] },
  { id: "select-child", get label() {
    return t("Extend selection to child");
  }, defaults: ["Shift+ArrowRight"] },
  { id: "select-all", get label() {
    return t("Select all visible nodes");
  }, defaults: ["Mod+KeyA"] },
  { id: "cut", get label() {
    return t("Cut branch");
  }, defaults: ["Mod+KeyX"] },
  { id: "copy-node-link", get label() {
    return t("Copy link to node");
  }, defaults: [] },
  { id: "copy", get label() {
    return t("Copy branch");
  }, defaults: ["Mod+KeyC"] },
  { id: "paste", get label() {
    return t("Paste as child branch");
  }, defaults: ["Mod+KeyV"] },
  { id: "paste-after", get label() {
    return t("Paste branch after node");
  }, defaults: [] },
  { id: "undo", get label() {
    return t("Undo");
  }, defaults: ["Mod+KeyZ"] },
  { id: "redo", get label() {
    return t("Redo");
  }, defaults: ["Mod+Shift+KeyZ", "Mod+KeyY"] },
  { id: "edit", get label() {
    return t("Edit node");
  }, defaults: ["F2"] },
  { id: "add-child", get label() {
    return t("Add child node");
  }, defaults: ["Tab"] },
  { id: "add-parent", get label() {
    return t("Add parent node");
  }, defaults: ["Mod+Tab"] },
  { id: "add-sibling-before", get label() {
    return t("Add sibling above");
  }, defaults: [] },
  { id: "add-sibling", get label() {
    return t("Add sibling node");
  }, defaults: ["Enter"] },
  { id: "delete", get label() {
    return t("Delete branch");
  }, defaults: ["Delete"] },
  { id: "move-up", get label() {
    return t("Move branch up");
  }, defaults: ["Mod+Shift+ArrowUp"] },
  { id: "move-down", get label() {
    return t("Move branch down");
  }, defaults: ["Mod+Shift+ArrowDown"] },
  { id: "indent", get label() {
    return t("Make child of previous node");
  }, defaults: [] },
  { id: "outdent", get label() {
    return t("Move up one level");
  }, defaults: ["Shift+Tab"] },
  { id: "toggle-task", get label() {
    return t("Toggle completion");
  }, defaults: ["Mod+Enter"] },
  { id: "make-step", get label() {
    return t("Make numbered step");
  }, defaults: [] },
  { id: "make-dated", get label() {
    return t("Set date");
  }, defaults: [] },
  { id: "make-question", get label() {
    return t("Mark as question");
  }, defaults: [] },
  { id: "source", get label() {
    return t("Open source Markdown");
  }, defaults: [] },
  { id: "parent", get label() {
    return t("Select parent node");
  }, defaults: ["ArrowLeft"] },
  { id: "child", get label() {
    return t("Select child node");
  }, defaults: ["ArrowRight"] },
  { id: "previous", get label() {
    return t("Select previous sibling");
  }, defaults: ["ArrowUp"] },
  { id: "next", get label() {
    return t("Select next sibling");
  }, defaults: ["ArrowDown"] },
  { id: "first", get label() {
    return t("Select first node");
  }, defaults: ["Home"] },
  { id: "last", get label() {
    return t("Select last node");
  }, defaults: ["End"] },
  { id: "fold", get label() {
    return t("Collapse / expand node");
  }, defaults: ["Space"] },
  { id: "collapse-all", get label() {
    return t("Collapse all roots");
  }, defaults: [] },
  { id: "collapse-branch", get label() {
    return t("Collapse selected branch");
  }, defaults: ["Mod+Alt+ArrowLeft"] },
  { id: "expand-branch", get label() {
    return t("Expand selected branch");
  }, defaults: ["Mod+Alt+ArrowRight"] },
  { id: "depth-0", get label() {
    return t("Selected node only");
  }, defaults: ["Alt+Shift+Digit0"] },
  { id: "depth-1", get label() {
    return t("Show one child level");
  }, defaults: ["Alt+Shift+Digit1"] },
  { id: "depth-2", get label() {
    return t("Show two child levels");
  }, defaults: ["Alt+Shift+Digit2"] },
  { id: "depth-3", get label() {
    return t("Show three child levels");
  }, defaults: ["Alt+Shift+Digit3"] },
  { id: "depth-4", get label() {
    return t("Show four child levels");
  }, defaults: ["Alt+Shift+Digit4"] },
  { id: "depth-5", get label() {
    return t("Show five child levels");
  }, defaults: ["Alt+Shift+Digit5"] },
  { id: "depth-all", get label() {
    return t("Expand all child levels");
  }, defaults: ["Alt+Shift+Digit9"] },
  { id: "find", get label() {
    return t("Find in map");
  }, defaults: ["Mod+KeyF"] },
  { id: "fit", get label() {
    return t("Fit map");
  }, defaults: [] }
];
var DEFAULT_HOTKEYS = Object.fromEntries(HOTKEY_DEFINITIONS.map((definition) => [definition.id, definition.defaults.join(", ")]));
function codeFor(key, code = "") {
  if (code && code !== "Unidentified") return code;
  if (/^[a-z]$/i.test(key)) return `Key${key.toUpperCase()}`;
  if (/^\d$/.test(key)) return `Digit${key}`;
  if (key === " " || key === "Spacebar") return "Space";
  if (key === "Esc") return "Escape";
  return key;
}
function captureHotkey(event) {
  if (event.isComposing || event.getModifierState?.("AltGraph")) return null;
  const code = codeFor(event.key, event.code);
  if (!code || /^(?:Control|Shift|Alt|Meta|OS)(?:Left|Right)?$/.test(code)) return null;
  return [event.ctrlKey && "Ctrl", event.metaKey && "Meta", event.altKey && "Alt", event.shiftKey && "Shift", code].filter(Boolean).join("+");
}
function validateHotkeys(binding) {
  if (!binding.trim()) return null;
  for (const value of binding.split(",")) {
    const parts = value.split("+").map((part) => part.trim().toLowerCase());
    const key = parts.pop();
    if (!key || !/^[\w-]+$/.test(key) || /^(?:ctrl|control|alt|shift|meta|cmd|mod)$/.test(key)) return t("Specify a key after the modifiers.");
    const modifiers = parts.map((part) => part === "control" ? "ctrl" : part === "cmd" ? "meta" : part);
    if (modifiers.some((part) => !["ctrl", "alt", "shift", "meta", "mod"].includes(part))) return t("Modifiers: Ctrl, Alt, Shift, Meta or Mod.");
    if (new Set(modifiers).size !== modifiers.length || modifiers.includes("mod") && (modifiers.includes("ctrl") || modifiers.includes("meta"))) return t("Do not repeat modifiers. Mod already means Ctrl or Cmd.");
  }
  return null;
}
function matchesHotkey(event, binding) {
  if (event.isComposing || event.getModifierState?.("AltGraph") || validateHotkeys(binding)) return false;
  const parts = binding.split("+").map((part) => part.trim()).filter(Boolean);
  const key = parts.pop();
  if (!key) return false;
  const modifiers = new Set(parts.map((part) => part.toLowerCase()));
  const mod = modifiers.has("mod");
  if (mod ? event.ctrlKey === event.metaKey : event.ctrlKey !== (modifiers.has("ctrl") || modifiers.has("control"))) return false;
  if (!mod && event.metaKey !== (modifiers.has("meta") || modifiers.has("cmd"))) return false;
  if (event.altKey !== modifiers.has("alt") || event.shiftKey !== modifiers.has("shift")) return false;
  return codeFor(event.key, event.code).toLowerCase() === codeFor(key).toLowerCase();
}
function resolveHotkey(event, bindings = {}) {
  for (const definition of HOTKEY_DEFINITIONS) {
    const binding = bindings[definition.id] ?? DEFAULT_HOTKEYS[definition.id];
    if (binding.split(",").some((value) => matchesHotkey(event, value))) return definition.id;
  }
  return null;
}

// src/map-patterns.ts
var PatternError = class extends Error {
  constructor(line, detail) {
    super(detail);
    this.line = line;
  }
};
function globExpression(pattern) {
  let result = "^";
  for (let index = 0; index < pattern.length; index++) {
    const character = pattern[index];
    if (character === "*" && pattern[index + 1] === "*") {
      index++;
      if (pattern[index + 1] === "/") {
        result += "(?:.*/)?";
        index++;
      } else result += ".*";
    } else if (character === "*") result += "[^/]*";
    else if (character === "?") result += "[^/]";
    else result += character.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }
  return result + "$";
}
function compileMapPatterns(rules) {
  const patterns = rules.mapPatterns.split(/\r?\n/).flatMap((raw, index) => {
    const text = raw.trim();
    if (!text) return [];
    const pattern = rules.patternMode === "glob" ? text.replace(/\\/g, "/") : text;
    try {
      return [{
        expression: new RegExp(rules.patternMode === "glob" ? globExpression(pattern) : pattern, "i"),
        basename: rules.patternMode === "glob" && !pattern.includes("/")
      }];
    } catch (error) {
      throw new PatternError(index + 1, error instanceof Error ? error.message : String(error));
    }
  });
  return (path, frontmatter) => {
    const normalized = path.replace(/\\/g, "/");
    if (!/\.md$/i.test(normalized) || /\.sync-conflict-/i.test(normalized)) return false;
    if (frontmatter?.mindmap === true || frontmatter?.["mindmap-plugin"] === "basic") return true;
    const basename = normalized.slice(normalized.lastIndexOf("/") + 1);
    return patterns.some((pattern) => pattern.expression.test(pattern.basename ? basename : normalized));
  };
}

// src/map-search.ts
var nextSearchId = 0;
var MapSearch = class {
  constructor(host, options) {
    this.options = options;
    this.matches = [];
    this.active = 0;
    const d = host.ownerDocument;
    this.overlay = d.createElement("div");
    this.overlay.className = "tvm-search-overlay";
    this.overlay.hidden = true;
    const bar = d.createElement("div");
    bar.className = "tvm-search-bar";
    this.overlay.append(bar);
    this.input = d.createElement("input");
    this.input.type = "search";
    this.input.placeholder = t("Search map\u2026");
    this.input.setAttribute("aria-label", t("Search map"));
    bar.append(this.input);
    const label2 = d.createElement("label");
    this.alpha = d.createElement("input");
    this.alpha.type = "checkbox";
    label2.append(this.alpha, t(" A\u2013Z"));
    bar.append(label2);
    const close = d.createElement("button");
    close.type = "button";
    close.textContent = "\xD7";
    close.setAttribute("aria-label", t("Close search"));
    close.onclick = () => this.close();
    bar.append(close);
    this.results = d.createElement("div");
    this.results.className = "tvm-search-results";
    this.results.id = "tvm-search-" + ++nextSearchId;
    this.results.setAttribute("role", "listbox");
    this.results.setAttribute("aria-label", t("Search results"));
    this.overlay.append(this.results);
    this.input.setAttribute("role", "combobox");
    this.input.setAttribute("aria-controls", this.results.id);
    this.input.setAttribute("aria-autocomplete", "list");
    this.input.setAttribute("aria-expanded", "false");
    this.input.oninput = () => {
      this.active = 0;
      this.find();
    };
    this.alpha.onchange = () => {
      this.active = 0;
      this.find();
    };
    this.overlay.onkeydown = (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this.close();
      } else if (e.key === "ArrowDown" || e.key === "ArrowUp") {
        e.preventDefault();
        e.stopPropagation();
        if (!this.matches.length) return;
        this.active = (this.active + (e.key === "ArrowDown" ? 1 : -1) + this.matches.length) % this.matches.length;
        this.highlight();
      } else if (e.key === "Enter" && (e.target === this.input || e.target === this.alpha)) {
        e.preventDefault();
        e.stopPropagation();
        this.go(this.active);
      }
    };
    host.append(this.overlay);
  }
  show() {
    this.overlay.hidden = false;
    this.input.setAttribute("aria-expanded", "true");
    this.find();
    this.input.focus({ preventScroll: true });
  }
  close() {
    this.overlay.hidden = true;
    this.input.setAttribute("aria-expanded", "false");
    this.options.search("", false);
    this.options.focusMap();
  }
  find() {
    this.matches = this.options.search(this.input.value, this.alpha.checked);
    this.active = Math.min(this.active, Math.max(0, this.matches.length - 1));
    this.results.replaceChildren();
    this.matches.forEach((node, index) => {
      const button2 = this.results.ownerDocument.createElement("button");
      button2.type = "button";
      button2.className = "tvm-result";
      button2.id = this.results.id + "-" + index;
      button2.textContent = node.text;
      button2.setAttribute("role", "option");
      button2.onclick = () => this.go(index);
      this.results.append(button2);
    });
    if (this.input.value && !this.matches.length) this.results.textContent = t("No results");
    this.highlight();
  }
  highlight() {
    [...this.results.children].forEach((el, index) => {
      el.setAttribute("aria-selected", String(index === this.active));
      el.classList.toggle("is-active", index === this.active);
    });
    const selected = this.results.children[this.active];
    if (selected) {
      this.input.setAttribute("aria-activedescendant", selected.id);
      selected.scrollIntoView?.({ block: "nearest" });
    } else this.input.removeAttribute("aria-activedescendant");
  }
  go(index) {
    const node = this.matches[index];
    if (node) {
      this.options.reveal(node.id);
      this.close();
    }
  }
};

// src/types.ts
var MIN_SCALE = 0.15;
var MAX_SCALE = 32;

// src/creation-handles.ts
var directions = [
  { action: "add-sibling-before", x: 0, y: -1, get label() {
    return t("Sibling above");
  } },
  { action: "add-sibling", x: 0, y: 1, get label() {
    return t("Sibling below");
  } },
  { action: "add-child", x: 1, y: 0, get label() {
    return t("Child node");
  } },
  { action: "add-parent", x: -1, y: 0, get label() {
    return t("Parent node");
  } }
];
var nextPreview = 0;
var CreationHandles = class {
  constructor(viewport, create) {
    this.viewport = viewport;
    this.create = create;
    this.id = null;
    this.buttons = [];
    this.hovered = -1;
    this.hover = (event) => {
      if (this.coarse || this.gesture || !this.node || this.host.hidden) return;
      if (event.target.closest(".tvm-create-handles button")) return;
      const rect = this.nodeRect;
      if (!rect) return;
      const inside = event.clientX >= rect.left - 10 && event.clientX <= rect.right + 10 && event.clientY >= rect.top - 10 && event.clientY <= rect.bottom + 10;
      const distances = [Math.abs(event.clientY - rect.top), Math.abs(event.clientY - rect.bottom), Math.abs(event.clientX - rect.right), Math.abs(event.clientX - rect.left)];
      const distance = Math.min(...distances);
      this.hovered = inside && distance <= 10 ? distances.indexOf(distance) : -1;
      this.visibility();
    };
    this.interrupt = (event) => {
      if (this.gesture && event.pointerId !== this.gesture.pointer) {
        this.cancel();
        event.preventDefault();
        event.stopPropagation();
      }
    };
    this.leave = () => {
      if (!this.gesture) {
        this.hovered = -1;
        this.visibility();
      }
    };
    const d = viewport.ownerDocument;
    this.coarse = d.defaultView?.matchMedia?.("(pointer: coarse)").matches ?? true;
    this.host = d.createElement("div");
    this.host.className = "tvm-create-handles";
    this.host.hidden = true;
    this.host.dataset.coarse = String(this.coarse);
    viewport.append(this.host);
    const ns = "http://www.w3.org/2000/svg";
    this.preview = d.createElementNS(ns, "svg");
    this.preview.classList.add("tvm-create-preview");
    this.preview.style.display = "none";
    this.preview.setAttribute("aria-hidden", "true");
    const defs = d.createElementNS(ns, "defs"), marker = d.createElementNS(ns, "marker"), tip = d.createElementNS(ns, "path");
    const markerId = "tvm-create-arrow-" + ++nextPreview;
    for (const [key, value] of Object.entries({ id: markerId, viewBox: "0 0 8 8", refX: "8", refY: "4", markerWidth: "8", markerHeight: "8", orient: "auto", markerUnits: "userSpaceOnUse" })) marker.setAttribute(key, value);
    tip.setAttribute("d", "M 0 0 L 8 4 L 0 8 Z");
    marker.append(tip);
    defs.append(marker);
    this.path = d.createElementNS(ns, "path");
    this.path.setAttribute("marker-end", "url(#" + markerId + ")");
    this.preview.append(defs, this.path);
    this.host.append(this.preview);
    for (const direction of directions) {
      const button2 = d.createElement("button");
      button2.type = "button";
      button2.textContent = "";
      button2.setAttribute("aria-label", direction.label);
      button2.dataset.createAction = direction.action;
      this.host.append(button2);
      this.buttons.push(button2);
      button2.addEventListener("pointerdown", (event) => {
        if (event.button !== 0 || !this.id) return;
        event.preventDefault();
        event.stopPropagation();
        this.cancel();
        this.viewport.focus({ preventScroll: true });
        this.gesture = { button: button2, pointer: event.pointerId, x: event.clientX, y: event.clientY, dx: direction.x, dy: direction.y, id: this.id, action: direction.action, ready: false };
        try {
          button2.setPointerCapture(event.pointerId);
        } catch {
        }
        this.drawPreview(event.clientX, event.clientY);
      });
      button2.addEventListener("pointermove", (event) => {
        const gesture = this.gesture;
        if (!gesture || gesture.pointer !== event.pointerId) return;
        event.preventDefault();
        event.stopPropagation();
        const x = event.clientX - gesture.x, y = event.clientY - gesture.y;
        const forward = x * gesture.dx + y * gesture.dy, cross = Math.abs(x * gesture.dy - y * gesture.dx);
        gesture.ready = forward >= 24 && cross <= Math.max(12, forward * 0.5);
        button2.classList.toggle("is-ready", gesture.ready);
        this.drawPreview(event.clientX, event.clientY);
      });
      button2.addEventListener("pointerup", (event) => {
        const gesture = this.gesture;
        if (!gesture || gesture.pointer !== event.pointerId) return;
        event.preventDefault();
        event.stopPropagation();
        this.cancel();
        if (gesture.ready) this.create(gesture.action, gesture.id);
      });
      button2.addEventListener("pointercancel", () => this.cancel());
      button2.addEventListener("lostpointercapture", () => this.cancel());
      button2.onclick = (event) => {
        event.preventDefault();
        event.stopPropagation();
      };
    }
    viewport.addEventListener("pointerdown", this.interrupt, true);
    viewport.addEventListener("pointermove", this.hover);
    viewport.addEventListener("pointerleave", this.leave);
    this.host.onkeydown = (event) => {
      if (event.key === "Escape") {
        this.cancel();
        event.preventDefault();
        event.stopPropagation();
      }
    };
  }
  visibility() {
    this.buttons.forEach((button2, index) => {
      button2.hidden = button2.dataset.clipped === "true" || !this.coarse && index !== this.hovered && button2 !== this.gesture?.button;
    });
  }
  drawPreview(x, y) {
    const gesture = this.gesture;
    if (!gesture) return;
    const view = this.viewport.getBoundingClientRect(), port = gesture.button.getBoundingClientRect();
    const sx = port.left + port.width / 2 - view.left, sy = port.top + port.height / 2 - view.top, ex = x - view.left, ey = y - view.top;
    const bend = Math.min(80, Math.max(24, Math.hypot(ex - sx, ey - sy) * 0.4));
    if (Math.hypot(ex - sx, ey - sy) < 3) {
      this.preview.style.display = "none";
      return;
    }
    this.preview.style.display = "";
    this.preview.classList.toggle("is-ready", gesture.ready);
    this.path.setAttribute("d", `M ${sx} ${sy} C ${sx + gesture.dx * bend} ${sy + gesture.dy * bend}, ${ex - gesture.dx * bend} ${ey - gesture.dy * bend}, ${ex} ${ey}`);
  }
  place(node, id, geometry) {
    if (id !== this.id) {
      this.cancel();
      this.hovered = -1;
    }
    this.id = id;
    this.node = node;
    this.host.hidden = !node || !id;
    if (!node || !id) {
      this.nodeRect = void 0;
      return;
    }
    const rect = geometry?.node ?? node.getBoundingClientRect(), view = geometry?.viewport ?? this.viewport.getBoundingClientRect();
    this.nodeRect = rect;
    if (rect.bottom < view.top || rect.top > view.bottom || rect.right < view.left || rect.left > view.right) {
      this.host.hidden = true;
      return;
    }
    const gap = 0;
    const points = [[rect.left + rect.width / 2, rect.top - gap], [rect.left + rect.width / 2, rect.bottom + gap], [rect.right + gap, rect.top + rect.height / 2], [rect.left - gap, rect.top + rect.height / 2]];
    this.buttons.forEach((button2, index) => {
      const x = points[index][0] - view.left, y = points[index][1] - view.top;
      button2.dataset.clipped = String(x < 0 || x > view.width || y < 0 || y > view.height);
      button2.style.left = x + "px";
      button2.style.top = y + "px";
    });
    this.visibility();
  }
  cancelIfActive() {
    if (!this.gesture) return false;
    this.cancel();
    return true;
  }
  cancel() {
    const gesture = this.gesture;
    this.gesture = void 0;
    this.preview.style.display = "none";
    if (gesture) {
      gesture.button.classList.remove("is-ready");
      try {
        if (gesture.button.hasPointerCapture(gesture.pointer)) gesture.button.releasePointerCapture(gesture.pointer);
      } catch {
      }
    }
    this.visibility();
  }
  destroy() {
    this.cancel();
    this.viewport.removeEventListener("pointerdown", this.interrupt, true);
    this.viewport.removeEventListener("pointermove", this.hover);
    this.viewport.removeEventListener("pointerleave", this.leave);
    this.host.remove();
  }
};

// src/inline.ts
var singleLine2 = (text) => text.replace(/[\r\n\u2028\u2029]+/g, " ");
var InlineEditor = class {
  constructor(document, initial, options) {
    this.options = options;
    this.saving = false;
    this.disposed = false;
    this.host = document.createElement("div");
    this.host.className = "tvm-inline-editor";
    this.input = document.createElement("textarea");
    this.input.className = "tvm-inline-input";
    this.input.rows = 1;
    this.input.setAttribute("aria-label", t("Node text"));
    this.input.setAttribute("enterkeyhint", "done");
    this.initial = singleLine2(initial);
    this.input.value = this.initial;
    this.host.append(this.input);
    const tools = document.createElement("div");
    tools.className = "tvm-inline-tools";
    this.host.append(tools);
    const mounted = options.mount?.(this.input, tools, this);
    if (typeof mounted === "function") this.unmount = mounted;
    else if (mounted) {
      this.driver = mounted;
      this.unmount = () => mounted.dispose();
    }
    const button2 = (label2, title, action) => {
      const el = document.createElement("button");
      el.type = "button";
      el.textContent = label2;
      el.title = title;
      el.setAttribute("aria-label", title);
      el.onclick = action;
      tools.append(el);
      return el;
    };
    button2("\u2713", t("Save (Enter)"), () => {
      void this.submit();
    }).classList.add("mod-cta");
    button2("\xD7", t("Cancel (Escape)"), () => this.cancel());
    this.error = document.createElement("div");
    this.error.className = "tvm-inline-error";
    this.error.setAttribute("role", "alert");
    this.host.append(this.error);
    this.input.addEventListener("beforeinput", (event) => {
      if (event.inputType === "insertParagraph" || event.inputType === "insertLineBreak") event.preventDefault();
    });
    const normalize = () => {
      this.dismissConfirmation();
      const value = this.input.value;
      const start = singleLine2(value.slice(0, this.input.selectionStart)).length;
      const end = singleLine2(value.slice(0, this.input.selectionEnd)).length;
      if (value !== singleLine2(value)) {
        this.input.value = singleLine2(value);
        this.input.setSelectionRange(start, end);
      }
      this.resize();
    };
    this.input.addEventListener("input", (event) => {
      if (!event.isComposing) normalize();
    });
    this.input.addEventListener("compositionend", normalize);
    this.input.addEventListener("paste", (event) => {
      if (event.defaultPrevented || this.input.readOnly) return;
      const text = event.clipboardData?.getData("text/plain");
      if (text === void 0 || !/[\r\n\u2028\u2029]/.test(text)) return;
      event.preventDefault();
      this.input.setRangeText(singleLine2(text), this.input.selectionStart, this.input.selectionEnd, "end");
      this.input.dispatchEvent(new document.defaultView.Event("input", { bubbles: true }));
    });
    this.host.addEventListener("keydown", (event) => this.handleKeydown(event));
  }
  handleKeydown(event) {
    if (event.defaultPrevented || event.isComposing || this.driver?.suggestionActive()) return false;
    if (event.key === "Escape") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat) {
        if (this.confirmation) this.dismissConfirmation();
        else this.cancel();
      }
      return true;
    }
    if (this.confirmation && event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      if (!event.repeat && !event.shiftKey && !event.altKey) {
        const target = event.target;
        if (target?.closest(".tvm-inline-keep")) this.dismissConfirmation();
        else if (target?.closest(".tvm-inline-discard")) this.options.cancel();
        else this.focus();
      }
      return true;
    }
    if (event.key !== "Enter" || event.target?.closest("button")) return false;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat && !event.shiftKey && !event.altKey) void this.submit();
    return true;
  }
  focus() {
    const confirmation = this.confirmation?.querySelector(".tvm-inline-discard");
    if (confirmation) confirmation.focus({ preventScroll: true });
    else if (this.driver) this.driver.focus();
    else this.input.focus({ preventScroll: true });
  }
  setMaxHeight(height) {
    (this.driver?.element ?? this.input).style.maxHeight = height + "px";
  }
  resize() {
    if (this.driver) this.driver.resize();
    else {
      this.input.style.height = "auto";
      this.input.style.height = `${Math.max(26, this.input.scrollHeight)}px`;
    }
    this.options.resize();
  }
  reportError(error) {
    this.error.textContent = error instanceof Error ? error.message : String(error);
    this.resize();
    this.focus();
  }
  cancelIfUnchanged() {
    if (this.saving || this.disposed || this.input.readOnly || this.input.getAttribute("aria-busy") === "true" || singleLine2(this.input.value) !== this.initial) return false;
    this.options.cancel();
    return true;
  }
  cancel() {
    if (this.saving || this.disposed) return;
    if (this.confirmation) {
      this.focus();
      return;
    }
    if (singleLine2(this.input.value) === this.initial && this.input.getAttribute("aria-busy") !== "true") {
      this.options.cancel();
      return;
    }
    const document = this.host.ownerDocument;
    const confirmation = document.createElement("div");
    confirmation.className = "tvm-inline-confirm";
    confirmation.setAttribute("role", "alertdialog");
    const warning = t("Close the editor and discard your changes?");
    confirmation.setAttribute("aria-label", warning);
    const text = document.createElement("p");
    text.textContent = warning;
    confirmation.append(text);
    const keep = document.createElement("button");
    keep.type = "button";
    keep.className = "tvm-inline-keep";
    keep.textContent = t("Continue editing");
    keep.onclick = () => this.dismissConfirmation();
    const discard = document.createElement("button");
    discard.type = "button";
    discard.className = "tvm-inline-discard mod-warning";
    discard.textContent = t("Discard changes");
    discard.onclick = () => this.options.cancel();
    confirmation.append(keep, discard);
    this.confirmation = confirmation;
    this.host.append(confirmation);
    this.resize();
    this.focus();
  }
  dismissConfirmation() {
    if (!this.confirmation) return;
    this.confirmation.remove();
    this.confirmation = void 0;
    this.resize();
    this.focus();
  }
  dispose() {
    this.disposed = true;
    this.unmount?.();
    this.host.remove();
  }
  async submit() {
    if (this.saving || this.disposed || this.input.readOnly || this.confirmation) return;
    const text = singleLine2(this.input.value);
    if (!text.trim()) {
      this.error.textContent = t("A node cannot be empty.");
      this.resize();
      return;
    }
    this.saving = true;
    this.input.readOnly = true;
    this.driver?.setReadOnly(true);
    this.error.textContent = "";
    for (const button2 of this.host.querySelectorAll("button")) button2.disabled = true;
    try {
      await this.options.save(text);
    } catch (error) {
      if (!this.disposed) {
        this.error.textContent = error instanceof Error ? error.message : String(error);
        this.resize();
        this.focus();
      }
    } finally {
      this.saving = false;
      this.input.readOnly = false;
      if (!this.disposed) this.driver?.setReadOnly(false);
      for (const button2 of this.host.querySelectorAll("button")) button2.disabled = false;
    }
  }
};

// src/surface.ts
var MARKDOWN_BATCH_SIZE = 8;
var MARKDOWN_LOADING_THRESHOLD = 128;
var WIDTH = 328;
var COLUMN_GAP = 74;
var ROW_GAP = 18;
var ROOT_GAP = 44;
var MIN_WIDTH = 84;
var MapSurface = class {
  constructor(container, options) {
    this.container = container;
    this.options = options;
    this.doc = null;
    this.state = { collapsed: [], selected: null, camera: { x: 36, y: 36, scale: 1 }, focusRoot: null };
    this.collapsed = /* @__PURE__ */ new Set();
    this.selection = /* @__PURE__ */ new Set();
    this.selectionAnchor = null;
    this.selectionMode = false;
    this.elements = /* @__PURE__ */ new Map();
    this.positions = /* @__PURE__ */ new Map();
    this.visible = [];
    this.visibleRoots = [];
    this.query = "";
    this.matches = /* @__PURE__ */ new Set();
    this.cleanup = [];
    this.destroyed = false;
    this.frame = null;
    this.followAfterLayout = false;
    this.observer = null;
    this.menu = null;
    this.touches = /* @__PURE__ */ new Map();
    this.pan = null;
    this.pinch = null;
    this.suppressClickUntil = 0;
    this.bounds = { width: 0, height: 0 };
    this.mode = "map";
    this.rendered = /* @__PURE__ */ new Map();
    this.markdownQueue = [];
    this.markdownInFlight = 0;
    this.loadingMarkdown = false;
    this.renderKey = "";
    this.paintScale = 1;
    this.paintX = 0;
    this.paintY = 0;
    this.settleTimer = 0;
    this.cameraFrame = null;
    this.instanceId = Math.random().toString(36).slice(2, 9);
    const d = container.ownerDocument;
    this.viewport = d.createElement("div");
    this.viewport.className = "tvm-surface";
    this.viewport.dataset.ignoreSwipe = "true";
    this.viewport.tabIndex = 0;
    this.viewport.setAttribute("role", "tree");
    this.viewport.setAttribute("aria-multiselectable", "true");
    this.viewport.setAttribute("aria-label", t("Map"));
    this.world = d.createElement("div");
    this.world.className = "tvm-world";
    this.edges = d.createElementNS("http://www.w3.org/2000/svg", "svg");
    this.edges.classList.add("tvm-edges");
    this.edges.setAttribute("aria-hidden", "true");
    this.nodeLayer = d.createElement("div");
    this.nodeLayer.className = "tvm-nodes";
    this.world.append(this.nodeLayer);
    this.live = d.createElement("div");
    this.live.className = "tvm-sr-only";
    this.live.setAttribute("aria-live", "polite");
    this.loading = d.createElement("div");
    this.loading.className = "tvm-loading-map";
    this.loading.setAttribute("role", "status");
    this.loading.textContent = t("Loading map\u2026");
    this.loading.hidden = true;
    this.viewport.append(this.edges, this.world, this.live, this.loading);
    container.append(this.viewport);
    this.handles = new CreationHandles(this.viewport, (action, id) => this.options.onAction(action, id));
    this.listen(this.viewport, "click", (e) => this.click(e), { capture: true });
    this.listen(this.viewport, "auxclick", (e) => {
      if (e.button === 1 && e.target.closest("a")) this.click(e);
    }, { capture: true });
    this.listen(this.viewport, "mouseover", (event) => {
      if (this.editing) return;
      const anchor2 = event.target.closest("a.internal-link");
      if (!anchor2 || anchor2.contains(event.relatedTarget)) return;
      const link = anchor2.getAttribute("data-href") ?? anchor2.getAttribute("href");
      if (link && this.options.onHoverLink) {
        event.stopPropagation();
        this.options.onHoverLink(event, anchor2, link);
      }
    }, { capture: true });
    this.listen(this.viewport, "dblclick", (e) => this.doubleClick(e));
    this.listen(this.viewport, "contextmenu", (e) => this.contextMenu(e));
    this.listen(this.viewport, "keydown", (e) => this.handleKeydown(e), { capture: true });
    this.listen(this.viewport, "wheel", (e) => this.wheel(e), { passive: false });
    this.listen(this.viewport, "pointerdown", (e) => this.pointerDown(e));
    this.listen(this.viewport, "pointermove", (e) => this.pointerMove(e));
    this.listen(this.viewport, "pointerup", (e) => this.pointerUp(e));
    this.listen(this.viewport, "pointercancel", (e) => this.pointerUp(e));
    this.listen(this.viewport, "lostpointercapture", (event) => {
      if (event.target === this.viewport) {
        this.clearDrag();
        this.cancelMarquee();
      }
    });
    this.listen(this.nodeLayer, "load", () => this.scheduleContentLayout(), { capture: true });
    this.listen(d, "pointerdown", (e) => {
      if (this.menu && !this.menu.contains(e.target)) this.closeMenu();
    });
    const Observer = d.defaultView?.ResizeObserver;
    if (Observer) {
      this.observer = new Observer(() => {
        if (this.editing) this.followEditorViewport();
        else this.scheduleLayout();
      });
      this.observer.observe(this.viewport);
    }
    const win = d.defaultView;
    const followEditor = () => this.followEditorViewport();
    if (win) this.listen(win, "resize", followEditor);
    if (win?.visualViewport) {
      this.listen(win.visualViewport, "resize", followEditor);
      this.listen(win.visualViewport, "scroll", followEditor);
    }
    this.applyCamera();
  }
  update(doc, state) {
    var _a;
    if (this.destroyed) return;
    if (this.editing) {
      this.editing.latest = doc;
      if (state) this.editing.latestState = state;
      return;
    }
    this.clearDrag();
    this.cancelMarquee();
    const previous = this.doc;
    if (state) this.selection.clear();
    this.doc = doc;
    if (state) {
      this.state = {
        collapsed: [...state.collapsed],
        selected: state.selected,
        focusRoot: state.focusRoot,
        camera: this.safeCamera(state.camera)
      };
    }
    this.collapsed = new Set([...state?.collapsed ?? this.collapsed].filter((id) => doc.byId.has(id)));
    if (this.state.focusRoot && !doc.byId.has(this.state.focusRoot)) this.state.focusRoot = null;
    if (this.state.selected && !doc.byId.has(this.state.selected)) {
      let old = previous?.byId.get(this.state.selected);
      while (old && !doc.byId.has(old.id)) old = old.parentId ? previous?.byId.get(old.parentId) : void 0;
      this.state.selected = old?.id ?? null;
    }
    if (!previous && !state) (_a = this.state).selected ?? (_a.selected = this.state.focusRoot ?? doc.roots[0] ?? null);
    this.matches = new Set(this.matchNodes(this.query).map((node) => node.id));
    this.render();
  }
  getState() {
    if (this.editing) return { ...this.editing.state, camera: { ...this.state.camera } };
    return { ...this.state, collapsed: [...this.collapsed], camera: { ...this.state.camera } };
  }
  getSelection() {
    return [...this.selection];
  }
  isSelectionMode() {
    return this.selectionMode;
  }
  toggleSelectionMode() {
    if (this.editing) return;
    this.selectionMode = !this.selectionMode;
    this.viewport.classList.toggle("is-selecting", this.selectionMode);
    this.viewport.focus({ preventScroll: true });
    this.emitState();
  }
  isEditing() {
    return !!this.editing;
  }
  focusEditor() {
    this.editing?.editor.focus();
  }
  invalidateMarkdown() {
    this.markdownQueue = [];
    for (const value of this.rendered.values()) this.options.releaseMarkdown?.(value.content);
    this.rendered.clear();
    if (!this.editing) this.render();
  }
  beginEdit(id, initial, save, mount, draft) {
    if (this.editing || !this.doc || this.destroyed) {
      this.focusEditor();
      return;
    }
    const original = this.doc, state = this.getState();
    const editor = new InlineEditor(this.container.ownerDocument, initial, {
      save: async (text) => {
        const selected = await save(text);
        if (this.editing?.editor === editor) this.finishEdit(selected);
      },
      cancel: () => this.finishEdit(),
      resize: () => this.scheduleLayout(true),
      mount
    });
    this.editing = { id, editor, original, state };
    this.doc = draft ?? original;
    this.reveal(id);
    this.followEditorViewport();
    editor.focus();
    editor.input.setSelectionRange(editor.input.value.length, editor.input.value.length);
  }
  finishEdit(selected) {
    const edit = this.editing;
    if (!edit) return;
    this.editing = void 0;
    edit.editor.dispose();
    const state = { ...edit.latestState ?? edit.state, camera: { ...this.state.camera } };
    this.update(edit.latest ?? edit.original, state);
    if (selected) this.reveal(selected);
    else {
      this.viewport.focus({ preventScroll: true });
      this.emitState();
    }
  }
  setLayout(mode) {
    if (this.destroyed || this.mode === mode) return;
    this.mode = mode;
    this.viewport.dataset.layout = mode;
    this.layout();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
  }
  refreshLayout() {
    const id = this.state.selected;
    const before = id ? this.positions.get(id) : void 0;
    this.layout();
    const after = id ? this.positions.get(id) : void 0;
    if (before && after) {
      this.state.camera.x += (before.x + before.width / 2 - after.x - after.width / 2) * this.state.camera.scale;
      this.state.camera.y += (before.y + before.height / 2 - after.y - after.height / 2) * this.state.camera.scale;
    }
    this.applyCamera();
    this.emitState();
  }
  revealSelection(ids) {
    const valid = ids.filter((id) => this.doc?.byId.has(id));
    for (const id of valid) this.reveal(id);
    this.selection = new Set(valid.filter((id) => this.elements.has(id)));
    this.state.selected = [...this.selection].at(-1) ?? null;
    this.selectionAnchor = this.state.selected;
    this.paintSelection();
    this.emitState();
  }
  reveal(id) {
    if (this.editing && id !== this.editing.id) {
      this.focusEditor();
      return;
    }
    if (!this.doc?.byId.has(id)) return;
    const chain = /* @__PURE__ */ new Set();
    let changed = false;
    let node = this.doc.byId.get(id);
    while (node?.parentId && !chain.has(node.parentId)) {
      chain.add(node.parentId);
      changed = this.collapsed.delete(node.parentId) || changed;
      node = this.doc.byId.get(node.parentId);
    }
    if (this.state.focusRoot && id !== this.state.focusRoot && !chain.has(this.state.focusRoot)) {
      this.state.focusRoot = null;
      changed = true;
    }
    this.state.selected = id;
    if (changed || !this.elements.has(id) || this.editing && !this.editing.editor.host.isConnected) this.render();
    else this.select(id);
    this.ensureVisible(id, true);
    this.viewport.focus({ preventScroll: true });
    this.emitState();
  }
  search(query, alphabetical = false) {
    this.query = query.trim();
    const result = this.matchNodes(this.query);
    this.matches = new Set(result.map((node) => node.id));
    for (const [id, el] of this.elements) el.classList.toggle("is-search-match", this.matches.has(id));
    if (alphabetical) result.sort((a, b) => a.text.localeCompare(b.text, void 0, { numeric: true, sensitivity: "base" }));
    return result;
  }
  setDepth(depth) {
    if (this.editing) return;
    if (!this.doc) return;
    this.collapsed.clear();
    if (Number.isFinite(depth)) {
      const maxLevel = Math.max(1, Math.floor(depth));
      const stack = this.doc.roots.map((id) => ({ id, level: 1 }));
      const seen = /* @__PURE__ */ new Set();
      while (stack.length) {
        const { id, level } = stack.pop();
        if (seen.has(id)) continue;
        seen.add(id);
        const node = this.doc.byId.get(id);
        if (!node) continue;
        if (level >= maxLevel && node.children.length) this.collapsed.add(id);
        for (const child of node.children) stack.push({ id: child, level: level + 1 });
      }
    }
    this.render();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
  }
  setBranchDepth(id, depth) {
    if (this.editing) return;
    if (!this.doc?.byId.has(id)) return;
    const maxLevel = Math.max(0, Math.floor(depth));
    const pending = [{ id, level: 0 }];
    const seen = /* @__PURE__ */ new Set();
    while (pending.length) {
      const item = pending.pop();
      if (seen.has(item.id)) continue;
      seen.add(item.id);
      const node = this.doc.byId.get(item.id);
      if (!node) continue;
      if (node.children.length && item.level >= maxLevel) this.collapsed.add(item.id);
      else this.collapsed.delete(item.id);
      for (const child of node.children) pending.push({ id: child, level: item.level + 1 });
    }
    this.render();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
  }
  fit() {
    if (!this.positions.size) return;
    const size = this.viewportSize();
    const scale = Math.max(MIN_SCALE, Math.min(1, (size.width - 72) / Math.max(this.bounds.width, 1), (size.height - 72) / Math.max(this.bounds.height, 1)));
    this.state.camera = {
      x: (size.width - this.bounds.width * scale) / 2,
      y: (size.height - this.bounds.height * scale) / 2,
      scale
    };
    this.applyCamera();
    this.emitState();
  }
  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.cancelMarkdownFrame?.();
    this.markdownQueue = [];
    this.container.ownerDocument.defaultView?.clearTimeout(this.settleTimer);
    if (this.cameraFrame !== null) this.container.ownerDocument.defaultView?.cancelAnimationFrame(this.cameraFrame);
    for (const value of this.rendered.values()) this.options.releaseMarkdown?.(value.content);
    this.rendered.clear();
    this.editing?.editor.dispose();
    this.editing = void 0;
    this.clearDrag();
    this.cancelMarquee();
    for (const clean of this.cleanup) clean();
    this.cleanup.length = 0;
    this.observer?.disconnect();
    if (this.frame !== null) this.container.ownerDocument.defaultView?.cancelAnimationFrame(this.frame);
    this.closeMenu();
    this.handles.destroy();
    this.viewport.remove();
    this.elements.clear();
    this.positions.clear();
    this.touches.clear();
  }
  listen(target, name, handler, options) {
    target.addEventListener(name, handler, options);
    this.cleanup.push(() => target.removeEventListener(name, handler, options));
  }
  safeCamera(camera) {
    return {
      x: Number.isFinite(camera?.x) ? camera.x : 36,
      y: Number.isFinite(camera?.y) ? camera.y : 36,
      scale: Number.isFinite(camera?.scale) ? Math.max(MIN_SCALE, Math.min(MAX_SCALE, camera.scale)) : 1
    };
  }
  emitState() {
    if (!this.destroyed) {
      this.updateHandles();
      this.options.onState(this.getState());
    }
  }
  matchNodes(query) {
    if (!this.doc || !query) return [];
    const words = query.toLocaleLowerCase().split(/\s+/).filter(Boolean);
    return this.doc.nodes.filter((node) => words.every((word) => node.text.toLocaleLowerCase().includes(word)));
  }
  render() {
    if (!this.doc || this.destroyed) return;
    const key = this.options.getRenderKey?.() ?? "";
    for (const [id, value] of this.rendered) {
      if (key !== this.renderKey || !this.doc.byId.has(id)) {
        this.options.releaseMarkdown?.(value.content);
        this.rendered.delete(id);
      }
    }
    this.renderKey = key;
    this.markdownQueue = [];
    this.closeMenu();
    this.elements.clear();
    this.positions.clear();
    this.nodeLayer.replaceChildren();
    this.edges.replaceChildren();
    this.visible = [];
    this.visibleRoots = this.state.focusRoot ? [this.state.focusRoot] : [...this.doc.roots];
    const stack = [...this.visibleRoots].reverse();
    const visited = /* @__PURE__ */ new Set();
    while (stack.length) {
      const id = stack.pop();
      const node = this.doc.byId.get(id);
      if (!node || visited.has(id)) continue;
      visited.add(id);
      this.visible.push(id);
      if (!this.collapsed.has(id)) for (let i = node.children.length - 1; i >= 0; i--) stack.push(node.children[i]);
    }
    this.reconcileSelection(visited);
    const descendantCounts = /* @__PURE__ */ new Map();
    const all = this.documentOrder();
    for (let i = all.length - 1; i >= 0; i--) {
      const node = this.doc.byId.get(all[i]);
      descendantCounts.set(node.id, node.children.reduce((total, id) => total + 1 + (descendantCounts.get(id) ?? 0), 0));
    }
    const fragment = this.container.ownerDocument.createDocumentFragment();
    const rootSet = new Set(this.visibleRoots);
    let elementIndex = 0;
    for (const id of this.visible) {
      const node = this.doc.byId.get(id);
      const el = this.container.ownerDocument.createElement("div");
      el.className = "tvm-node";
      el.dataset.nodeId = id;
      el.id = `tvm-node-${this.instanceId}-${elementIndex++}`;
      el.setAttribute("role", "treeitem");
      el.setAttribute("aria-selected", String(this.selection.has(id)));
      el.classList.toggle("is-selected", this.selection.has(id));
      el.classList.toggle("is-search-match", this.matches.has(id));
      el.classList.toggle("is-root", rootSet.has(id));
      el.classList.toggle("is-complete", /^\s*\[[xX]\]/.test(node.text));
      el.classList.toggle("is-task", /^\s*\[[ xX]\]/.test(node.text));
      el.style.width = `${WIDTH}px`;
      const task = /^\s*\[([ xX])\][ \t]*/.exec(node.text);
      const label2 = task ? node.text.slice(task[0].length) : node.text;
      if (task) {
        const checkbox = this.container.ownerDocument.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "tvm-task-checkbox";
        checkbox.checked = task[1].toLowerCase() === "x";
        checkbox.tabIndex = -1;
        checkbox.setAttribute("aria-label", `${checkbox.checked ? t("Mark incomplete") : t("Mark completed")}: ${this.plainText(label2)}`);
        el.append(checkbox);
      }
      const cached = this.rendered.get(id);
      const reuse = cached?.label === label2;
      if (cached && !reuse) this.options.releaseMarkdown?.(cached.content);
      const content = reuse ? cached.content : this.container.ownerDocument.createElement("div");
      content.className = "tvm-node-content";
      const entry = reuse ? cached : { label: label2, content, started: false };
      if (!reuse) {
        content.textContent = label2 || t("Untitled");
        this.rendered.set(id, entry);
      }
      if (!entry.started) this.markdownQueue.push(entry);
      el.append(content);
      if (node.blockId) {
        const marker = this.container.ownerDocument.createElement("span");
        marker.className = "tvm-node-address";
        marker.textContent = "\u{1F517}";
        marker.title = t("Node address: ^") + node.blockId;
        marker.setAttribute("aria-label", marker.title);
        marker.setAttribute("role", "img");
        el.append(marker);
      }
      if (node.children.length) {
        const folded = this.collapsed.has(id);
        el.setAttribute("aria-expanded", String(!folded));
        const fold2 = this.container.ownerDocument.createElement("button");
        fold2.className = "tvm-fold";
        fold2.dataset.foldId = id;
        fold2.tabIndex = -1;
        fold2.setAttribute("aria-label", `${folded ? "Expand" : "Collapse"} ${descendantCounts.get(id) ?? node.children.length} descendants`);
        const foldBinding = this.options.getHotkeys?.().fold ?? DEFAULT_HOTKEYS.fold;
        fold2.title = (folded ? t("Expand node") : t("Collapse node")) + (foldBinding ? ` (${foldBinding.replace(/Key|Digit/g, "")})` : "");
        fold2.textContent = folded ? `+${descendantCounts.get(id) ?? node.children.length}` : "\u2212";
        el.append(fold2);
      }
      this.elements.set(id, el);
      fragment.append(el);
    }
    this.nodeLayer.append(fragment);
    this.markdownQueue.reverse();
    this.setMarkdownLoading(this.markdownQueue.length >= MARKDOWN_LOADING_THRESHOLD);
    if (!this.cancelMarkdownFrame) this.renderMarkdownBatch();
    if (this.editing) {
      const el = this.elements.get(this.editing.id);
      if (el) {
        el.classList.add("is-editing");
        el.append(this.editing.editor.host);
      }
    }
    if (!this.visible.length) {
      const empty = this.container.ownerDocument.createElement("div");
      empty.className = "tvm-empty";
      empty.textContent = t("This map has no nodes. Open the source and add a heading or bullet to begin.");
      this.nodeLayer.append(empty);
    }
    this.updateActiveDescendant();
    this.layout();
    this.scheduleContentLayout();
    this.applyCamera();
  }
  renderMarkdownBatch() {
    if (this.destroyed) return;
    for (let count = 0; count < MARKDOWN_BATCH_SIZE && this.markdownInFlight < MARKDOWN_BATCH_SIZE; count++) {
      const entry = this.markdownQueue.pop();
      if (!entry) break;
      const { label: label2, content } = entry;
      entry.started = true;
      try {
        content.replaceChildren();
        const pending = this.options.renderMarkdown(label2 || t("Untitled"), content);
        if (pending && typeof pending.then === "function") {
          this.markdownInFlight++;
          void Promise.resolve(pending).catch(() => {
            if (!this.destroyed) content.textContent = label2;
          }).finally(() => {
            this.markdownInFlight--;
            if (this.loadingMarkdown || this.nodeLayer.contains(content)) this.scheduleContentLayout();
            this.scheduleMarkdownBatch();
          });
        }
      } catch {
        content.textContent = label2;
      }
    }
    this.scheduleMarkdownBatch();
  }
  scheduleMarkdownBatch() {
    if (this.destroyed || this.cancelMarkdownFrame || !this.markdownQueue.length || this.markdownInFlight >= MARKDOWN_BATCH_SIZE) return;
    const win = this.container.ownerDocument.defaultView;
    if (!win) return;
    const frame = win.requestAnimationFrame(() => {
      this.cancelMarkdownFrame = void 0;
      this.renderMarkdownBatch();
      this.scheduleContentLayout();
    });
    this.cancelMarkdownFrame = () => win.cancelAnimationFrame(frame);
  }
  setMarkdownLoading(loading) {
    this.loadingMarkdown = loading;
    this.loading.hidden = !loading;
    this.viewport.classList.toggle("is-loading-map", loading);
    this.viewport.setAttribute("aria-busy", String(loading));
  }
  hasPendingMarkdown() {
    return !!(this.markdownQueue.length || this.markdownInFlight);
  }
  scheduleContentLayout() {
    if (!this.loadingMarkdown || !this.hasPendingMarkdown()) this.scheduleLayout();
  }
  documentOrder() {
    if (!this.doc) return [];
    const stack = [...this.doc.roots].reverse();
    const result = [];
    const seen = /* @__PURE__ */ new Set();
    while (stack.length) {
      const id = stack.pop();
      const node = this.doc.byId.get(id);
      if (!node || seen.has(id)) continue;
      seen.add(id);
      result.push(id);
      for (let i = node.children.length - 1; i >= 0; i--) stack.push(node.children[i]);
    }
    return result;
  }
  reconcileSelection(visible) {
    let id = this.state.selected;
    this.selection = new Set([...this.selection].filter((value) => visible.has(value)));
    if (!id) return;
    const seen = /* @__PURE__ */ new Set();
    while (id && !visible.has(id) && !seen.has(id)) {
      seen.add(id);
      id = this.doc?.byId.get(id)?.parentId ?? null;
    }
    this.state.selected = id && visible.has(id) ? id : this.visible[0] ?? null;
    if (this.state.selected) this.selection.add(this.state.selected);
  }
  scheduleLayout(followSelection = false) {
    this.followAfterLayout || (this.followAfterLayout = followSelection);
    if (this.destroyed || this.frame !== null) return;
    const win = this.container.ownerDocument.defaultView;
    if (!win?.requestAnimationFrame) return;
    this.frame = win.requestAnimationFrame(() => {
      this.frame = null;
      if (!this.destroyed) {
        this.layout();
        if (this.loadingMarkdown && !this.hasPendingMarkdown()) {
          this.setMarkdownLoading(false);
          this.applyCamera();
        }
        if (this.followAfterLayout && this.state.selected) {
          this.ensureVisible(this.state.selected);
          this.emitState();
        }
      }
      this.followAfterLayout = false;
    });
  }
  layout() {
    if (!this.doc || this.destroyed) return;
    const height = /* @__PURE__ */ new Map();
    const branchHeight = /* @__PURE__ */ new Map();
    const visible = new Set(this.visible);
    const widths = /* @__PURE__ */ new Map();
    const levels = /* @__PURE__ */ new Map();
    const columns = /* @__PURE__ */ new Map();
    const widthMode = this.mode === "map" ? this.options.getWidthMode?.() ?? "fixed" : "fixed";
    for (const id of this.visible) {
      const el = this.elements.get(id);
      el.style.height = "";
      el.style.width = widthMode === "fixed" || id === this.editing?.id ? `${WIDTH}px` : "max-content";
      el.style.maxWidth = widthMode === "fixed" ? "" : `${WIDTH}px`;
    }
    for (const id of this.visible) {
      const node = this.doc.byId.get(id);
      const level = node.parentId && levels.has(node.parentId) ? levels.get(node.parentId) + 1 : 0;
      levels.set(id, level);
      const fallback = Math.max(MIN_WIDTH, Math.min(WIDTH, this.plainText(node.text).length * 7.5 + 34));
      const measured = this.elements.get(id).offsetWidth;
      const width2 = widthMode === "fixed" ? WIDTH : measured ? Math.min(WIDTH, measured + 2) : fallback;
      widths.set(id, width2);
      columns.set(level, Math.max(columns.get(level) ?? 0, width2));
    }
    for (const id of this.visible) {
      const width2 = widthMode === "column" ? columns.get(levels.get(id)) : widths.get(id);
      widths.set(id, width2);
      const el = this.elements.get(id);
      el.style.width = `${width2}px`;
      el.style.maxWidth = "";
    }
    for (const id of this.visible) {
      const el = this.elements.get(id);
      height.set(id, el.offsetHeight || this.estimateHeight(this.doc.byId.get(id).text));
    }
    if (this.mode === "outline") {
      this.positions.clear();
      const levels2 = /* @__PURE__ */ new Map();
      const width2 = Math.max(WIDTH, this.viewportSize().width - 88);
      let y = 0;
      let maxX2 = 0;
      for (const id of this.visible) {
        const node = this.doc.byId.get(id);
        const level = node.parentId && levels2.has(node.parentId) ? levels2.get(node.parentId) + 1 : 0;
        levels2.set(id, level);
        const el = this.elements.get(id);
        const ownWidth = Math.max(WIDTH, width2 - level * 28);
        el.style.width = `${ownWidth}px`;
        const ownHeight = el.offsetHeight || height.get(id);
        const pos = { x: level * 28, y, width: ownWidth, height: ownHeight };
        this.positions.set(id, pos);
        el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        el.setAttribute("aria-level", String(level + 1));
        y += ownHeight + 7;
        maxX2 = Math.max(maxX2, pos.x + ownWidth + 20);
      }
      this.bounds = { width: maxX2, height: Math.max(0, y - 7) };
      this.edges.replaceChildren();
      return;
    }
    const rowGap = this.mode === "table" ? 0 : ROW_GAP;
    const columnGap = this.mode === "table" ? 0 : COLUMN_GAP;
    for (let i = this.visible.length - 1; i >= 0; i--) {
      const id = this.visible[i];
      const children = this.doc.byId.get(id).children.filter((child) => visible.has(child));
      const total = children.reduce((sum, child) => sum + (branchHeight.get(child) ?? 0), 0) + Math.max(0, children.length - 1) * rowGap;
      branchHeight.set(id, Math.max(height.get(id), total));
    }
    let rootY = 0;
    const stack = [];
    for (const id of this.visibleRoots) {
      if (!visible.has(id)) continue;
      stack.push({ id, x: 0, y: rootY, level: 1 });
      rootY += branchHeight.get(id) + ROOT_GAP;
    }
    this.positions.clear();
    let maxX = 0;
    let maxY = 0;
    while (stack.length) {
      const item = stack.pop();
      const ownHeight = height.get(item.id);
      const branch = branchHeight.get(item.id);
      const ownWidth = widths.get(item.id);
      const pos = this.mode === "table" ? { x: item.x, y: item.y, width: WIDTH, height: branch } : { x: item.x, y: item.y + (branch - ownHeight) / 2, width: ownWidth, height: ownHeight };
      this.positions.set(item.id, pos);
      const el = this.elements.get(item.id);
      if (this.mode === "table") el.style.height = `${pos.height}px`;
      el.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
      el.setAttribute("aria-level", String(item.level));
      maxX = Math.max(maxX, pos.x + pos.width + 20);
      maxY = Math.max(maxY, pos.y + pos.height);
      const children = this.doc.byId.get(item.id).children.filter((id) => visible.has(id));
      const childTotal = children.reduce((sum, id) => sum + branchHeight.get(id), 0) + Math.max(0, children.length - 1) * rowGap;
      let y = item.y + (branch - childTotal) / 2;
      for (const id of children) {
        stack.push({ id, x: item.x + pos.width + columnGap, y, level: item.level + 1 });
        y += branchHeight.get(id) + rowGap;
      }
    }
    this.bounds = { width: maxX, height: maxY };
    if (this.mode === "table") {
      this.edges.replaceChildren();
      return;
    }
    const fragment = this.container.ownerDocument.createDocumentFragment();
    for (const id of this.visible) {
      const parentId = this.doc.byId.get(id).parentId;
      if (!parentId) continue;
      const from = this.positions.get(parentId);
      const to = this.positions.get(id);
      if (!from || !to) continue;
      const x1 = from.x + from.width;
      const y1 = from.y + from.height / 2;
      const x2 = to.x;
      const y2 = to.y + to.height / 2;
      const path = this.container.ownerDocument.createElementNS("http://www.w3.org/2000/svg", "path");
      path.setAttribute("d", `M ${x1} ${y1} C ${x1 + COLUMN_GAP / 2} ${y1}, ${x2 - COLUMN_GAP / 2} ${y2}, ${x2} ${y2}`);
      fragment.append(path);
    }
    this.edges.replaceChildren(fragment);
    this.paintEdges(this.viewportSize());
  }
  paintEdges(size) {
    if (this.mode !== "map") return;
    const { x, y, scale } = this.state.camera;
    this.edges.setAttribute("viewBox", `${-x / scale} ${-y / scale} ${size.width / scale} ${size.height / scale}`);
  }
  estimateHeight(text) {
    const lines = this.plainText(text).split("\n").reduce((n, line) => n + Math.max(1, Math.ceil(line.length / 36)), 0);
    return Math.max(44, lines * 21 + 24);
  }
  plainText(text) {
    return text.replace(/!?(\[\[)([^\]]+)\]\]/g, "$2").replace(/\[([^\]]+)\]\([^)]*\)/g, "$1").replace(/[*`~]/g, "");
  }
  viewportSize() {
    const rect = this.viewport.getBoundingClientRect();
    return { width: this.viewport.clientWidth || rect.width || 800, height: this.viewport.clientHeight || rect.height || 600 };
  }
  updateHandles(viewportRect) {
    const id = !this.editing && this.selection.size === 1 && !this.selectionMode ? this.state.selected : null;
    const pos = id ? this.positions.get(id) : void 0, c = this.state.camera;
    const geometry = viewportRect && pos ? { viewport: viewportRect, node: {
      left: viewportRect.left + pos.x * c.scale + c.x,
      top: viewportRect.top + pos.y * c.scale + c.y,
      right: viewportRect.left + (pos.x + pos.width) * c.scale + c.x,
      bottom: viewportRect.top + (pos.y + pos.height) * c.scale + c.y,
      width: pos.width * c.scale,
      height: pos.height * c.scale
    } } : void 0;
    this.handles?.place(id ? this.elements.get(id) : void 0, id, geometry);
  }
  applyCamera(fast = false) {
    const win = this.container.ownerDocument.defaultView;
    if (fast && win?.requestAnimationFrame) {
      if (this.cameraFrame === null) this.cameraFrame = win.requestAnimationFrame(() => {
        this.cameraFrame = null;
        if (!this.destroyed) this.paintCamera(true);
      });
      return;
    }
    if (this.cameraFrame !== null) {
      win?.cancelAnimationFrame(this.cameraFrame);
      this.cameraFrame = null;
    }
    this.paintCamera(fast);
  }
  paintCamera(fast = false) {
    const c = this.state.camera;
    const size = this.viewportSize();
    const viewportRect = this.viewport.getBoundingClientRect();
    const win = this.container.ownerDocument.defaultView;
    win?.clearTimeout(this.settleTimer);
    const transformPan = this.options.useTransformPan?.() ?? true;
    if (!transformPan) {
      this.world.style.zoom = "";
      this.world.style.transformOrigin = "0 0";
      this.world.style.transform = c.scale === 1 ? "" : `scale(${c.scale})`;
      this.world.style.willChange = "";
      this.world.style.left = `${c.x}px`;
      this.world.style.top = `${c.y}px`;
    } else if (fast) {
      this.world.style.transformOrigin = "0 0";
      this.world.style.willChange = "transform";
      this.world.style.transform = `translate(${(c.x - this.paintX) / this.paintScale}px, ${(c.y - this.paintY) / this.paintScale}px) scale(${c.scale / this.paintScale})`;
      this.settleTimer = win?.setTimeout(() => {
        if (!this.destroyed) this.applyCamera();
      }, 160) ?? 0;
    } else {
      this.paintScale = c.scale;
      this.paintX = c.x;
      this.paintY = c.y;
      this.world.style.zoom = String(c.scale);
      this.world.style.transform = "";
      this.world.style.willChange = "";
      this.world.style.left = `${c.x / c.scale}px`;
      this.world.style.top = `${c.y / c.scale}px`;
    }
    this.paintEdges(size);
    const grid = 24 * c.scale * 2 ** -Math.floor(Math.log2(c.scale));
    this.viewport.style.backgroundSize = `${grid}px ${grid}px`;
    this.viewport.style.backgroundPosition = `${c.x}px ${c.y}px`;
    this.updateHandles(viewportRect);
    for (const [id, pos] of this.positions) {
      const x = pos.x * c.scale + c.x, y = pos.y * c.scale + c.y;
      const visible = x + pos.width * c.scale >= -120 && y + pos.height * c.scale >= -120 && x <= size.width + 120 && y <= size.height + 120;
      const el = this.elements.get(id);
      if (el) el.style.visibility = visible || this.editing?.id === id ? "" : "hidden";
    }
  }
  editorArea() {
    const size = this.viewportSize(), rect = this.viewport.getBoundingClientRect();
    const visual = this.container.ownerDocument.defaultView?.visualViewport;
    if (!visual) return { left: 0, top: 0, ...size };
    const left = Math.max(0, visual.offsetLeft - rect.left), top = Math.max(0, visual.offsetTop - rect.top);
    const right = Math.min(size.width, visual.offsetLeft + visual.width - rect.left);
    const bottom = Math.min(size.height, visual.offsetTop + visual.height - rect.top);
    return { left, top, width: Math.max(1, right - left), height: Math.max(1, bottom - top) };
  }
  followEditorViewport() {
    if (!this.editing || this.destroyed) return;
    const area = this.editorArea(), editor = this.editing.editor;
    const tools = editor.host.querySelector(".tvm-inline-tools");
    editor.setMaxHeight(Math.max(26, (area.height - 32) / this.state.camera.scale - (tools?.offsetHeight ?? 0) - 28));
    editor.resize();
    this.scheduleLayout(true);
  }
  ensureVisible(id, center = false) {
    const pos = this.positions.get(id);
    if (!pos) return;
    const c = this.state.camera;
    const area = this.editing?.id === id ? this.editorArea() : { left: 0, top: 0, ...this.viewportSize() };
    const size = { width: area.width, height: area.height };
    const padding = this.editing?.id === id ? 12 : 44;
    if (center) {
      c.x = area.left + size.width / 2 - (pos.x + pos.width / 2) * c.scale;
      c.y = area.top + size.height / 2 - (pos.y + pos.height / 2) * c.scale;
    } else {
      const left = pos.x * c.scale + c.x;
      const right = left + pos.width * c.scale;
      const top = pos.y * c.scale + c.y;
      const bottom = top + pos.height * c.scale;
      if (pos.width * c.scale > size.width - padding * 2) c.x = area.left + padding - pos.x * c.scale;
      else if (left < area.left + padding) c.x += area.left + padding - left;
      else if (right > area.left + size.width - padding) c.x -= right - area.left - size.width + padding;
      if (pos.height * c.scale > size.height - padding * 2) c.y = area.top + padding - pos.y * c.scale;
      else if (top < area.top + padding) c.y += area.top + padding - top;
      else if (bottom > area.top + size.height - padding) c.y -= bottom - area.top - size.height + padding;
    }
    this.applyCamera();
  }
  select(id, follow = false, mode = "single") {
    if (!this.elements.has(id)) return;
    if (mode === "range") {
      this.selectionAnchor ?? (this.selectionAnchor = this.state.selected ?? id);
      const from = this.visible.indexOf(this.selectionAnchor), to = this.visible.indexOf(id);
      this.selection = new Set(from < 0 ? [id] : this.visible.slice(Math.min(from, to), Math.max(from, to) + 1));
    } else {
      this.selectionAnchor = id;
      if (mode === "single") this.selection = /* @__PURE__ */ new Set([id]);
      else if (this.selection.has(id)) this.selection.delete(id);
      else this.selection.add(id);
    }
    this.state.selected = this.selection.has(id) ? id : [...this.selection].at(-1) ?? null;
    this.paintSelection();
    if (follow) this.ensureVisible(id);
    this.emitState();
  }
  paintSelection() {
    for (const [nodeId, el] of this.elements) {
      el.classList.toggle("is-selected", this.selection.has(nodeId));
      el.setAttribute("aria-selected", String(this.selection.has(nodeId)));
    }
    this.updateActiveDescendant();
  }
  updateActiveDescendant() {
    const el = this.state.selected ? this.elements.get(this.state.selected) : null;
    if (el) this.viewport.setAttribute("aria-activedescendant", el.id);
    else this.viewport.removeAttribute("aria-activedescendant");
  }
  nodeFrom(target) {
    const element = target;
    return element?.closest?.(".tvm-node")?.dataset.nodeId ?? null;
  }
  click(event) {
    if (event.target.closest(".tvm-create-handles")) return;
    if (this.editing) {
      if (Date.now() < this.suppressClickUntil) {
        event.preventDefault();
        return;
      }
      const target2 = event.target;
      if (!target2.closest(".tvm-inline-editor")) {
        event.preventDefault();
        if (!target2.closest(".tvm-node") && this.editing.editor.cancelIfUnchanged()) return;
        this.focusEditor();
      }
      return;
    }
    if (Date.now() < this.suppressClickUntil || this.menu?.contains(event.target)) {
      event.preventDefault();
      return;
    }
    const target = event.target;
    const id = this.nodeFrom(target);
    if (id && (this.selectionMode || !target.closest("a") && (event.ctrlKey || event.metaKey || event.shiftKey))) {
      event.preventDefault();
      event.stopPropagation();
      this.select(id, false, event.shiftKey ? "range" : "toggle");
      this.viewport.focus({ preventScroll: true });
      return;
    }
    const fold2 = target.closest("[data-fold-id]");
    if (fold2?.dataset.foldId) {
      event.preventDefault();
      event.stopPropagation();
      this.select(fold2.dataset.foldId);
      this.toggleFold(fold2.dataset.foldId);
      this.viewport.focus({ preventScroll: true });
      return;
    }
    const anchor2 = target.closest("a");
    if (anchor2) {
      if (id) this.select(id);
      const link = anchor2.getAttribute("data-href") ?? anchor2.getAttribute("href");
      const internal = anchor2.classList.contains("internal-link") || anchor2.hasAttribute("data-href") && !!link && !/^(?:[a-z][a-z\d+.-]*:|\/\/)/i.test(link);
      if (internal && link && this.options.onOpenLink) {
        event.preventDefault();
        event.stopPropagation();
        this.options.onOpenLink(link, event);
      }
      return;
    }
    if (id) {
      this.select(id);
      if (target.closest('input[type="checkbox"]')) {
        event.preventDefault();
        this.options.onAction("toggle-task", id);
      }
    } else this.deselect();
    this.viewport.focus({ preventScroll: true });
  }
  deselect() {
    this.state.selected = null;
    this.selection.clear();
    this.selectionAnchor = null;
    for (const element of this.elements.values()) {
      element.classList.remove("is-selected");
      element.setAttribute("aria-selected", "false");
    }
    this.updateActiveDescendant();
    this.emitState();
  }
  doubleClick(event) {
    if (this.selectionMode || event.shiftKey || event.ctrlKey || event.metaKey) return;
    if (this.editing) return;
    if (event.target.closest("a, button, input") || Date.now() < this.suppressClickUntil) return;
    const id = this.nodeFrom(event.target);
    if (!id) return;
    event.preventDefault();
    this.select(id);
    this.options.onAction("edit", id);
  }
  toggleFold(id) {
    if (!this.doc?.byId.get(id)?.children.length) return;
    if (this.collapsed.has(id)) this.collapsed.delete(id);
    else this.collapsed.add(id);
    this.render();
    if (this.state.selected) this.ensureVisible(this.state.selected);
    this.emitState();
  }
  handleKeydown(event) {
    if (this.destroyed || event.defaultPrevented) return false;
    if (event.key === "Escape" && this.handles.cancelIfActive()) {
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
    if (this.editing) return this.editing.editor.handleKeydown(event);
    if (event.key === "Escape" && this.marquee) {
      this.cancelMarquee();
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
    if (event.key === "Escape" && this.drag) {
      this.clearDrag();
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
    const target = event.target;
    if (target?.closest?.('input, textarea, select, button, [contenteditable]:not([contenteditable="false"])') || target && this.menu?.contains(target)) return false;
    if (event.key === "Escape" && (this.selection.size > 1 || this.selectionMode)) {
      this.selectionMode = false;
      this.viewport.classList.remove("is-selecting");
      this.deselect();
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
    const action = resolveHotkey(event, this.options.getHotkeys?.());
    if (event.repeat && action && ["delete", "cut", "add-child", "add-sibling", "add-sibling-before", "add-parent", "edit", "paste", "paste-after"].includes(action)) {
      event.preventDefault();
      event.stopPropagation();
      return true;
    }
    if (!action || !this.runHotkey(action)) return false;
    event.preventDefault();
    event.stopPropagation();
    return true;
  }
  runHotkey(action) {
    if (this.destroyed || !this.doc) return false;
    if (this.editing) {
      this.focusEditor();
      return true;
    }
    const id = this.state.selected;
    const node = id ? this.doc.byId.get(id) : void 0;
    if (action === "select-all") {
      this.selection = new Set(this.visible);
      this.state.selected = this.visible[0] ?? null;
      this.selectionAnchor = this.state.selected;
      this.paintSelection();
      this.emitState();
      return true;
    }
    if (action.startsWith("select-")) {
      const index = id ? this.visible.indexOf(id) : -1;
      const next2 = action === "select-next" ? this.visible[index + 1] : action === "select-previous" ? this.visible[Math.max(0, index - 1)] : action === "select-parent" ? node?.parentId : node?.children[0];
      if (next2) this.select(next2, true, "range");
      return true;
    }
    if (action === "find") {
      this.options.onFind?.();
      return true;
    }
    if (action === "fit") {
      this.fit();
      return true;
    }
    if (action === "collapse-all") {
      this.setDepth(1);
      return true;
    }
    if (action.startsWith("depth-")) {
      const depth = action === "depth-all" ? Infinity : Number(action.slice(6));
      if (id) for (const target of this.getSelection()) this.setBranchDepth(target, depth);
      else this.setDepth(depth + 1);
      return true;
    }
    if (action === "collapse-branch" || action === "expand-branch") {
      if (!id) return false;
      for (const target of this.getSelection()) this.setBranchDepth(target, action === "collapse-branch" ? 0 : Infinity);
      return true;
    }
    if (action === "fold") {
      if (!id) return false;
      for (const target of this.getSelection()) this.toggleFold(target);
      return true;
    }
    const navigation = ["parent", "child", "previous", "next", "first", "last"].includes(action);
    if (!navigation) {
      if (!id && action !== "undo" && action !== "redo" && action !== "paste") return false;
      this.options.onAction(action, id);
      return true;
    }
    let next;
    if (action === "first") next = this.visible[0];
    else if (action === "last") next = this.visible[this.visible.length - 1];
    else if (!id || !node) next = this.visible[0];
    else if (action === "parent") {
      if (this.options.getCollapseOnLeft?.() && node.children.length && !this.collapsed.has(id)) {
        this.toggleFold(id);
        return true;
      }
      next = node.parentId ?? void 0;
    } else if (action === "child") {
      if (this.collapsed.has(id)) {
        this.toggleFold(id);
        return true;
      }
      next = node.children[0];
    } else {
      const siblings = node.parentId ? this.doc.byId.get(node.parentId)?.children ?? [] : this.doc.roots;
      const index = siblings.indexOf(id);
      next = siblings[index + (action === "previous" ? -1 : 1)];
    }
    if (next) this.select(next, true);
    return true;
  }
  wheel(event) {
    if (event.target.closest(".tvm-inline-editor")) return;
    if (this.menu?.contains(event.target)) return;
    event.preventDefault();
    const multiplier = event.deltaMode === 1 ? 18 : event.deltaMode === 2 ? this.viewportSize().height : 1;
    if (event.ctrlKey || event.metaKey) {
      const rect = this.viewport.getBoundingClientRect();
      this.zoomAt(event.clientX - rect.left, event.clientY - rect.top, Math.exp(-event.deltaY * multiplier * 6e-3 / Math.max(1, Math.sqrt(this.state.camera.scale))));
    } else {
      this.state.camera.x -= (event.shiftKey && !event.deltaX ? event.deltaY : event.deltaX) * multiplier;
      this.state.camera.y -= (event.shiftKey && !event.deltaX ? 0 : event.deltaY) * multiplier;
      this.applyCamera(true);
    }
    this.emitState();
  }
  zoomAt(x, y, factor) {
    const c = this.state.camera;
    const next = Math.max(MIN_SCALE, Math.min(MAX_SCALE, c.scale * factor));
    c.x = x - (x - c.x) * next / c.scale;
    c.y = y - (y - c.y) * next / c.scale;
    c.scale = next;
    this.applyCamera(true);
  }
  pointerDown(event) {
    if (event.target.closest(".tvm-create-handles")) return;
    if (this.editing && event.target.closest(".tvm-inline-editor")) return;
    if (this.editing) event.preventDefault();
    if (this.menu?.contains(event.target)) return;
    if (this.drag && this.drag.pointer !== event.pointerId) this.clearDrag();
    const id = this.nodeFrom(event.target);
    const groupDrag = !this.editing && id && this.selection.has(id) && (this.selection.size > 1 || this.selectionMode);
    if (groupDrag && event.pointerType === "mouse" && event.button === 0 && !event.shiftKey && !event.ctrlKey && !event.metaKey && !event.target.closest("a, button, input, textarea")) {
      this.drag = { id, ids: this.getSelection(), position: "child", pointer: event.pointerId, x: event.clientX, y: event.clientY, active: false, target: null };
      return;
    }
    if (!this.editing && !this.selectionMode && this.selection.size <= 1 && !event.shiftKey && !event.ctrlKey && !event.metaKey && event.pointerType === "mouse" && event.button === 0 && id && !event.target.closest("a, button, input, textarea")) {
      const last = this.lastPress;
      if (last?.id === id && Date.now() - last.time < 500 && Math.hypot(last.x - event.clientX, last.y - event.clientY) < 8) {
        this.drag = { id, ids: [id], position: "child", pointer: event.pointerId, x: event.clientX, y: event.clientY, active: false, target: null };
        this.lastPress = void 0;
      } else this.lastPress = { id, time: Date.now(), x: event.clientX, y: event.clientY };
    }
    if (!this.editing && !id && event.button === 0 && (this.selectionMode || event.shiftKey) && this.touches.size === 0) {
      const element = this.container.ownerDocument.createElement("div");
      element.className = "tvm-selection-box";
      this.viewport.append(element);
      this.marquee = { pointer: event.pointerId, x: event.clientX, y: event.clientY, moved: false, base: event.ctrlKey || event.metaKey ? [...this.selection] : [], before: [...this.selection], element };
      try {
        this.viewport.setPointerCapture(event.pointerId);
      } catch {
      }
      return;
    }
    if (this.marquee) return;
    if (event.pointerType === "touch") {
      this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
      if (this.touches.size === 2) {
        this.cancelTouchHold();
        const [a, b] = [...this.touches.values()];
        const rect = this.viewport.getBoundingClientRect();
        const x = (a.x + b.x) / 2 - rect.left;
        const y = (a.y + b.y) / 2 - rect.top;
        const c = this.state.camera;
        this.pinch = { distance: Math.max(1, Math.hypot(a.x - b.x, a.y - b.y)), scale: c.scale, worldX: (x - c.x) / c.scale, worldY: (y - c.y) / c.scale };
        this.pan = null;
      }
    }
    if (event.button !== 0 && event.button !== 1) return;
    if (this.touches.size < 2 && (this.editing || event.pointerType === "touch" || event.button === 1 || !event.target.closest(".tvm-node"))) {
      this.pan = { pointer: event.pointerId, x: event.clientX, y: event.clientY, camera: { ...this.state.camera }, moved: false };
      if (event.button === 1) event.preventDefault();
    }
    if (!this.editing && event.pointerType === "touch" && this.touches.size === 1 && id && !event.target.closest("a, button, input, textarea")) {
      this.cancelTouchHold();
      const pointer = event.pointerId, x = event.clientX, y = event.clientY;
      const timer = this.container.ownerDocument.defaultView.setTimeout(() => {
        this.touchHold = void 0;
        if (this.destroyed || this.editing || this.touches.size !== 1 || !this.touches.has(pointer) || this.pan?.moved || !this.doc?.byId.has(id)) return;
        if (!this.selection.has(id)) this.select(id);
        this.drag = { id, ids: this.getSelection(), position: "child", pointer, x, y, active: true, target: null };
        this.pan = null;
        this.viewport.classList.add("is-dragging");
        for (const selected of this.drag.ids) this.elements.get(selected)?.classList.add("is-drag-source");
        try {
          this.viewport.setPointerCapture(pointer);
        } catch {
        }
        this.live.textContent = t("Branch ready to move");
      }, 450);
      this.touchHold = { pointer, x, y, timer };
    }
    if (this.pinch || this.pan && !event.target.closest(".tvm-node")) {
      try {
        this.viewport.setPointerCapture(event.pointerId);
      } catch {
      }
    }
  }
  pointerMove(event) {
    if (this.touches.has(event.pointerId)) this.touches.set(event.pointerId, { x: event.clientX, y: event.clientY });
    if (this.touchHold?.pointer === event.pointerId && Math.hypot(event.clientX - this.touchHold.x, event.clientY - this.touchHold.y) > 4) this.cancelTouchHold();
    if (this.marquee?.pointer === event.pointerId) {
      const box = this.marquee;
      if (!box.moved && Math.hypot(event.clientX - box.x, event.clientY - box.y) < 5) return;
      box.moved = true;
      const rect = this.viewport.getBoundingClientRect();
      const left = Math.min(box.x, event.clientX), top = Math.min(box.y, event.clientY);
      const right = Math.max(box.x, event.clientX), bottom = Math.max(box.y, event.clientY);
      Object.assign(box.element.style, { left: left - rect.left + "px", top: top - rect.top + "px", width: right - left + "px", height: bottom - top + "px" });
      this.selection = new Set(box.base);
      for (const [id, element] of this.elements) {
        const bounds = element.getBoundingClientRect();
        if (bounds.right >= left && bounds.left <= right && bounds.bottom >= top && bounds.top <= bottom) this.selection.add(id);
      }
      this.state.selected = [...this.selection].at(-1) ?? null;
      this.selectionAnchor = this.state.selected;
      this.paintSelection();
      this.emitState();
      event.preventDefault();
      return;
    }
    if (this.drag?.pointer === event.pointerId) {
      const drag = this.drag;
      if (!drag.active && Math.hypot(event.clientX - drag.x, event.clientY - drag.y) < 6) return;
      drag.active = true;
      try {
        this.viewport.setPointerCapture(event.pointerId);
      } catch {
      }
      this.viewport.classList.add("is-dragging");
      for (const id of drag.ids) this.elements.get(id)?.classList.add("is-drag-source");
      const previous = this.elements.get(drag.target ?? "");
      previous?.classList.remove("is-drop-target");
      previous?.removeAttribute("data-drop-position");
      const hit = this.container.ownerDocument.elementFromPoint(event.clientX, event.clientY);
      let target = this.nodeFrom(hit);
      if (!target) {
        for (const [id, element] of this.elements) {
          const rect = element.getBoundingClientRect();
          if (event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top - 12 && event.clientY <= rect.bottom + 12) {
            target = id;
            break;
          }
        }
      }
      let position = "child";
      if (target) {
        const rect = this.elements.get(target).getBoundingClientRect();
        const relative = (event.clientY - rect.top) / Math.max(1, rect.height);
        position = rect.height > 0 ? relative < 0.25 ? "before" : relative > 0.75 ? "after" : "child" : "child";
        if (!this.doc || !canDropBranches(this.doc, drag.ids, target, position)) target = null;
      }
      drag.target = target;
      drag.position = position;
      if (target) {
        const element = this.elements.get(target);
        element.classList.add("is-drop-target");
        element.dataset.dropPosition = position;
        this.live.textContent = (position === "before" ? t("Before: ") : position === "after" ? t("After: ") : t("As children: ")) + this.doc.byId.get(target).text;
      }
      event.preventDefault();
      return;
    }
    if (this.pinch && this.touches.size >= 2) {
      const [a, b] = [...this.touches.values()];
      const rect = this.viewport.getBoundingClientRect();
      const scale = Math.max(MIN_SCALE, Math.min(MAX_SCALE, this.pinch.scale * Math.hypot(a.x - b.x, a.y - b.y) / this.pinch.distance));
      this.state.camera = { x: (a.x + b.x) / 2 - rect.left - this.pinch.worldX * scale, y: (a.y + b.y) / 2 - rect.top - this.pinch.worldY * scale, scale };
      this.suppressClickUntil = Date.now() + 350;
      this.applyCamera(true);
      return;
    }
    if (this.pan?.pointer !== event.pointerId) return;
    const dx = event.clientX - this.pan.x;
    const dy = event.clientY - this.pan.y;
    if (Math.hypot(dx, dy) > 4) this.pan.moved = true;
    if (!this.pan.moved) return;
    try {
      this.viewport.setPointerCapture(event.pointerId);
    } catch {
    }
    this.state.camera.x = this.pan.camera.x + dx;
    this.state.camera.y = this.pan.camera.y + dy;
    this.viewport.classList.add("is-panning");
    this.suppressClickUntil = Date.now() + 350;
    this.applyCamera(true);
  }
  cancelMarquee() {
    if (!this.marquee) return;
    const box = this.marquee;
    box.element.remove();
    this.marquee = void 0;
    this.selection = new Set(box.before);
    this.state.selected = [...this.selection].at(-1) ?? null;
    this.paintSelection();
    this.emitState();
    this.suppressClickUntil = Date.now() + 350;
    try {
      if (this.viewport.hasPointerCapture(box.pointer)) this.viewport.releasePointerCapture(box.pointer);
    } catch {
    }
  }
  pointerUp(event) {
    if (this.touchHold?.pointer === event.pointerId) this.cancelTouchHold();
    if (event.type === "pointercancel" && this.marquee?.pointer === event.pointerId) {
      this.cancelMarquee();
      return;
    }
    if (this.marquee?.pointer === event.pointerId) {
      const box = this.marquee;
      box.element.remove();
      this.marquee = void 0;
      if (box.moved) this.suppressClickUntil = Date.now() + 350;
      try {
        if (this.viewport.hasPointerCapture(event.pointerId)) this.viewport.releasePointerCapture(event.pointerId);
      } catch {
      }
      this.viewport.focus({ preventScroll: true });
      return;
    }
    if (this.drag?.pointer === event.pointerId) {
      const drag = this.drag;
      this.clearDrag();
      if (drag.active) {
        this.suppressClickUntil = Date.now() + 400;
        if (event.type === "pointerup" && drag.target) {
          if (this.options.onMoveBranches) this.options.onMoveBranches(drag.ids, drag.target, drag.position);
          else if (drag.position === "child" && drag.ids.length === 1) this.options.onReparent?.(drag.id, drag.target);
        }
      }
    }
    const wasPinching = !!this.pinch;
    const changed = wasPinching || this.pan?.moved;
    this.touches.delete(event.pointerId);
    if (this.pan?.pointer === event.pointerId) this.pan = null;
    if (this.touches.size < 2) this.pinch = null;
    if (wasPinching && this.touches.size === 1) {
      const [id, point] = [...this.touches.entries()][0];
      this.pan = { pointer: id, x: point.x, y: point.y, camera: { ...this.state.camera }, moved: false };
    }
    this.viewport.classList.remove("is-panning");
    try {
      if (this.viewport.hasPointerCapture(event.pointerId)) this.viewport.releasePointerCapture(event.pointerId);
    } catch {
    }
    if (changed) this.emitState();
  }
  contextMenu(event) {
    if (this.drag?.active) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (this.editing) return;
    const id = this.nodeFrom(event.target);
    if (!id) return;
    event.preventDefault();
    event.stopPropagation();
    if (!this.selection.has(id)) this.select(id);
    else {
      this.state.selected = id;
      this.updateActiveDescendant();
    }
    this.closeMenu();
    const menu = this.container.ownerDocument.createElement("div");
    menu.className = "tvm-context-menu";
    menu.setAttribute("role", "menu");
    const entries = [
      { label: t("Edit node"), action: "edit" },
      { label: t("Add child node"), action: "add-child" },
      { label: t("Add sibling node"), action: "add-sibling" },
      { label: t("Add parent node"), action: "add-parent" },
      { label: this.collapsed.has(id) ? t("Expand node") : t("Collapse node"), action: "fold" },
      { label: t("Collapse branch"), action: "collapse-branch" },
      { label: t("Expand branch"), action: "expand-branch" },
      { label: t("Toggle completion"), action: "toggle-task" },
      { label: t("Make numbered step"), action: "make-step" },
      { label: t("Set date"), action: "make-dated" },
      { label: t("Mark as question"), action: "make-question" },
      { label: t("Copy link to node"), action: "copy-node-link" },
      { label: t("Copy branch"), action: "copy" },
      { label: t("Cut branch"), action: "cut" },
      { label: t("Paste as child branch"), action: "paste" },
      { label: t("Paste after node"), action: "paste-after" },
      { label: t("Move up"), action: "move-up" },
      { label: t("Move down"), action: "move-down" },
      { label: t("Make child of previous node"), action: "indent" },
      { label: t("Move up one level"), action: "outdent" },
      { label: t("Open source Markdown"), action: "source" },
      { label: t("Delete branch"), action: "delete" }
    ];
    for (const entry of entries) {
      if (["fold", "collapse-branch", "expand-branch"].includes(entry.action) && !this.doc?.byId.get(id)?.children.length) continue;
      const button2 = this.container.ownerDocument.createElement("button");
      button2.type = "button";
      button2.setAttribute("role", "menuitem");
      const label2 = this.container.ownerDocument.createElement("span");
      label2.textContent = this.selection.size > 1 && ["delete", "copy", "cut"].includes(entry.action) ? t(entry.action === "copy" ? "Copy selection" : entry.action === "cut" ? "Cut selection" : "Delete selection") : entry.label;
      if (this.selection.size > 1 && ["edit", "add-child", "add-sibling", "add-parent", "paste", "paste-after", "move-up", "move-down", "indent", "outdent"].includes(entry.action)) button2.disabled = true;
      button2.append(label2);
      const binding = this.options.getHotkeys?.()[entry.action] ?? DEFAULT_HOTKEYS[entry.action];
      if (binding) {
        const shortcut = this.container.ownerDocument.createElement("span");
        shortcut.className = "tvm-menu-shortcut";
        shortcut.textContent = binding.replace(/Key|Digit/g, "").replace(/Mod/g, "Ctrl/Cmd");
        button2.append(shortcut);
      }
      if (entry.action === "delete") button2.classList.add("is-danger");
      button2.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.closeMenu();
        this.runHotkey(entry.action);
      });
      menu.append(button2);
    }
    menu.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        this.closeMenu();
        this.viewport.focus({ preventScroll: true });
        return;
      }
      if (e.key !== "ArrowUp" && e.key !== "ArrowDown") return;
      e.preventDefault();
      e.stopPropagation();
      const buttons = [...menu.querySelectorAll("button")];
      const index = buttons.indexOf(this.container.ownerDocument.activeElement);
      buttons[(index + (e.key === "ArrowDown" ? 1 : buttons.length - 1)) % buttons.length]?.focus();
    });
    this.menu = menu;
    this.viewport.append(menu);
    const rect = this.viewport.getBoundingClientRect();
    const size = this.viewportSize();
    menu.style.left = `${Math.max(8, Math.min(event.clientX - rect.left, size.width - (menu.offsetWidth || 260) - 8))}px`;
    menu.style.top = `${Math.max(8, Math.min(event.clientY - rect.top, size.height - (menu.offsetHeight || 480) - 8))}px`;
    menu.querySelector("button")?.focus();
  }
  closeMenu() {
    this.menu?.remove();
    this.menu = null;
  }
  cancelTouchHold() {
    if (!this.touchHold) return;
    this.container.ownerDocument.defaultView?.clearTimeout(this.touchHold.timer);
    this.touchHold = void 0;
  }
  clearDrag() {
    this.cancelTouchHold();
    if (!this.drag) return;
    const drag = this.drag;
    this.drag = void 0;
    if (drag.active) this.suppressClickUntil = Date.now() + 400;
    this.viewport.classList.remove("is-dragging");
    for (const id of drag.ids) this.elements.get(id)?.classList.remove("is-drag-source");
    if (drag.target) {
      const element = this.elements.get(drag.target);
      element?.classList.remove("is-drop-target");
      element?.removeAttribute("data-drop-position");
    }
    try {
      if (this.viewport.hasPointerCapture(drag.pointer)) this.viewport.releasePointerCapture(drag.pointer);
    } catch {
    }
  }
};

// src/queue-controls.ts
function queueLabel(text, showTask = true, showStep = true) {
  const match = /^(\[[^\]]\][ \t]*)?(#step(?:[ \t]+|$))?(.*)$/i.exec(text);
  const label2 = (showTask ? match[1] ?? "" : "") + (showStep ? match[2] ?? "" : "") + match[3];
  return label2.trim() || text;
}
var nextFilterId = 0;
function attachMapFilter(parent, getMaps, onSelect) {
  const host = parent.createDiv("tvm-map-filter");
  const input = host.createEl("input", { type: "text", attr: { role: "combobox", "aria-label": t("Map filter"), "aria-autocomplete": "list", "aria-expanded": "false", autocomplete: "off", placeholder: t("All maps") } });
  const list = host.createDiv("tvm-map-options");
  list.id = `tvm-map-options-${++nextFilterId}`;
  list.setAttribute("role", "listbox");
  list.setAttribute("aria-label", t("Maps"));
  input.setAttribute("aria-controls", list.id);
  list.hidden = true;
  let selected = { path: "", basename: t("All maps") };
  let choices = [];
  let active = -1;
  const close = () => {
    list.hidden = true;
    input.setAttribute("aria-expanded", "false");
    input.removeAttribute("aria-activedescendant");
    input.value = selected.path ? selected.basename : "";
  };
  const choose = (choice) => {
    selected = choice;
    close();
    onSelect(choice.path);
  };
  const highlight = () => {
    Array.from(list.children).forEach((element, index) => element.setAttribute("aria-selected", String(index === active)));
    const option = list.children[active];
    if (option) {
      input.setAttribute("aria-activedescendant", option.id);
      option.scrollIntoView({ block: "nearest" });
    } else input.removeAttribute("aria-activedescendant");
  };
  const draw = () => {
    const query = input.value.trim().toLocaleLowerCase();
    choices = [{ path: "", basename: t("All maps") }, ...getMaps().sort((a, b) => a.path.localeCompare(b.path))].filter((choice) => !choice.path || `${choice.basename} ${choice.path}`.toLocaleLowerCase().includes(query));
    list.empty();
    active = -1;
    for (const [index, choice] of choices.entries()) {
      const option = list.createDiv("tvm-map-option");
      option.id = `${list.id}-${index}`;
      option.setAttribute("role", "option");
      option.setAttribute("aria-selected", "false");
      option.createDiv({ text: choice.basename });
      if (choice.path) option.createDiv({ cls: "tvm-map-option-path", text: choice.path });
      option.onmousedown = (event) => event.preventDefault();
      option.onclick = () => choose(choice);
    }
    if (query && choices.length === 1) list.createDiv({ cls: "tvm-map-option-path tvm-map-no-results", text: t("No maps match this search.") });
    list.hidden = false;
    input.setAttribute("aria-expanded", "true");
    input.removeAttribute("aria-activedescendant");
  };
  input.onfocus = () => {
    input.value = "";
    draw();
  };
  input.onclick = () => {
    if (list.hidden) {
      input.value = "";
      draw();
    }
  };
  input.oninput = draw;
  input.onkeydown = (event) => {
    if (event.key === "Escape" && !list.hidden) {
      event.preventDefault();
      event.stopPropagation();
      close();
    } else if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      if (list.hidden) {
        input.value = "";
        draw();
      }
      active = active < 0 ? event.key === "ArrowDown" ? 0 : choices.length - 1 : (active + (event.key === "ArrowDown" ? 1 : -1) + choices.length) % choices.length;
      highlight();
    } else if (event.key === "Enter" && !list.hidden) {
      event.preventDefault();
      if (active < 0 && input.value.trim() && choices.length === 1) return;
      choose(choices[active >= 0 ? active : choices.length > 1 && input.value.trim() ? 1 : 0]);
    }
  };
  input.onblur = () => close();
}

// src/native-editor.ts
var import_obsidian = require("obsidian");
var NativeProbe = class extends import_obsidian.MarkdownView {
  async dispose() {
    await this.onClose();
    this.unload();
    this.containerEl.remove();
  }
};
var constructors = /* @__PURE__ */ new WeakMap();
function prepareNativeEditor(app) {
  const cached = constructors.get(app);
  if (cached) return cached;
  const promise = (async () => {
    const current = app.workspace.getLeavesOfType("markdown").find((leaf) => leaf.view instanceof import_obsidian.MarkdownView);
    const previous = app.workspace.getMostRecentLeaf();
    const temporary = current ? void 0 : app.workspace.getLeaf("tab");
    let probe;
    try {
      const view = current?.view ?? (probe = new NativeProbe(temporary));
      const component = view.editor?.editorComponent ?? view.editMode;
      const prototype = component ? Object.getPrototypeOf(Object.getPrototypeOf(component)) : null;
      if (!prototype || typeof prototype.buildLocalExtensions !== "function" || typeof prototype.getDynamicExtensions !== "function") {
        throw new Error(t("This Obsidian version has no compatible native editor."));
      }
      return prototype.constructor;
    } finally {
      if (probe) await probe.dispose();
      if (temporary) {
        temporary.detach();
        if (previous && previous !== temporary && app.workspace.getMostRecentLeaf() === temporary) app.workspace.setActiveLeaf(previous, { focus: false });
      }
    }
  })();
  constructors.set(app, promise);
  void promise.catch(() => constructors.delete(app));
  return promise;
}
function mountNativeEditor(owner, input, tools, inline, Native, ensureAddress) {
  if (!Native) throw new Error(t("Could not prepare the native editor."));
  const document = input.ownerDocument;
  const host = document.createElement("div");
  host.className = "tvm-native-editor";
  input.before(host);
  const previousEditor = owner.editor, previousMode = owner.editMode;
  let active = true, syncing = false, scoped = false, initializing = true;
  const scope = new import_obsidian.Scope(owner.app.scope);
  for (const key of ["Enter", "Escape"]) scope.register([], key, (event) => {
    if (!native?.editorSuggest.isShowingSuggestion() && inline.handleKeydown(event)) return false;
  });
  const focus = () => {
    if (!scoped && active) {
      owner.app.keymap.pushScope(scope);
      scoped = true;
    }
  };
  const blur = () => {
    if (scoped) {
      owner.app.keymap.popScope(scope);
      scoped = false;
    }
  };
  let native;
  const releaseSuggestions = [];
  const mirror = () => {
    if (!active || syncing || !native) return;
    syncing = true;
    try {
      input.value = singleLine2(native.get());
      const selection = native.editor.listSelections()[0];
      if (selection) input.setSelectionRange(native.editor.posToOffset(selection.anchor), native.editor.posToOffset(selection.head));
      input.dispatchEvent(new document.defaultView.Event("input", { bubbles: true }));
    } finally {
      syncing = false;
    }
  };
  class DraftEditor extends Native {
    get path() {
      return initializing ? "" : owner.file?.path ?? "";
    }
    saveHistory() {
    }
    buildLocalExtensions() {
      const extensions2 = super.buildLocalExtensions();
      const filter = this.cm.state.constructor.transactionFilter;
      if (!filter?.of) throw new Error(t("The native editor cannot protect a single-line draft."));
      extensions2.push(filter.of((transaction) => {
        if (!transaction.docChanged) return transaction;
        if (input.readOnly && !syncing) return [];
        const text = transaction.newDoc.toString(), normalized = singleLine2(text);
        if (text === normalized) return transaction;
        return {
          changes: { from: 0, to: transaction.startState.doc.length, insert: normalized },
          selection: {
            anchor: singleLine2(text.slice(0, transaction.newSelection.main.anchor)).length,
            head: singleLine2(text.slice(0, transaction.newSelection.main.head)).length
          },
          userEvent: "input.paste"
        };
      }));
      return extensions2;
    }
    onUpdate(update, changed) {
      super.onUpdate(update, changed);
      if (update.docChanged || update.selectionSet) mirror();
    }
  }
  const pull = () => {
    if (!active || syncing || !native || native.get() === input.value) return;
    syncing = true;
    try {
      native.set(singleLine2(input.value), false);
    } finally {
      syncing = false;
    }
  };
  const keydown = (event) => {
    if (native?.editorSuggest.isShowingSuggestion()) return;
    if (event.key === "Enter" || event.key === "Escape") inline.handleKeydown(event);
  };
  const beforeinput = (event) => {
    if (event.inputType === "insertParagraph" || event.inputType === "insertLineBreak") event.preventDefault();
  };
  const dispose = () => {
    if (!active) return;
    active = false;
    blur();
    for (const release of releaseSuggestions) release();
    input.removeEventListener("input", pull);
    host.removeEventListener("keydown", keydown, true);
    host.removeEventListener("beforeinput", beforeinput);
    host.removeEventListener("focusin", focus);
    host.removeEventListener("focusout", blur);
    if (native) {
      native.editorSuggest.close();
      owner.removeChild(native);
      native.destroy();
      if (owner.editor === native.editor) owner.editor = previousEditor;
      if (owner.editMode === native) owner.editMode = previousMode;
    } else {
      owner.editor = previousEditor;
      owner.editMode = previousMode;
    }
    if (owner.app.workspace.activeEditor === owner) owner.app.workspace.activeEditor = null;
    host.remove();
    input.hidden = false;
  };
  try {
    owner.editMode = { sourceMode: false };
    native = new DraftEditor(owner.app, host, owner);
    owner.editMode = native;
    owner.editor = native.editor;
    owner.addChild(native);
    native.set(input.value, true);
    initializing = false;
    native.editor.setCursor({ line: 0, ch: input.value.length });
    if (ensureAddress) for (const suggestion of native.editorSuggest.suggests ?? []) {
      if (!suggestion.suggestManager || typeof suggestion.selectSuggestion !== "function") continue;
      const original = suggestion.selectSuggestion;
      let pending = false;
      const select = function(value, event) {
        if (!active || this.context?.editor !== native?.editor || value?.type !== "block" || value.node?.id) return original.call(this, value, event);
        if (pending || input.readOnly) return;
        const line = value.node?.position?.start?.line;
        if (!value.file || typeof line !== "number" || typeof value.content !== "string") return original.call(this, value, event);
        pending = true;
        input.readOnly = true;
        input.setAttribute("aria-busy", "true");
        void ensureAddress(value.file, line - 1, value.content).then((id) => {
          if (!active) return;
          input.readOnly = false;
          if (id) value.node.id = id;
          original.call(this, value, event);
        }).catch((error) => {
          if (active) {
            inline.reportError(error);
            this.close();
          }
        }).finally(() => {
          pending = false;
          if (active) {
            input.readOnly = false;
            input.removeAttribute("aria-busy");
          }
        });
      };
      suggestion.selectSuggestion = select;
      releaseSuggestions.push(() => {
        if (suggestion.selectSuggestion === select) suggestion.selectSuggestion = original;
      });
    }
    native.cm.contentDOM.setAttribute("aria-label", t("Node text"));
    native.cm.contentDOM.setAttribute("enterkeyhint", "done");
    input.hidden = true;
    input.addEventListener("input", pull);
    host.addEventListener("keydown", keydown, true);
    host.addEventListener("beforeinput", beforeinput);
    host.addEventListener("focusin", focus);
    host.addEventListener("focusout", blur);
    const add = (label2, title, action) => {
      const button2 = document.createElement("button");
      button2.type = "button";
      button2.textContent = label2;
      button2.title = title;
      button2.setAttribute("aria-label", title);
      button2.onclick = () => {
        if (!input.readOnly && active) {
          action();
          native?.editor.focus();
        }
      };
      tools.append(button2);
    };
    add("[[\u2026]]", t("Native Obsidian link"), () => native?.editor.triggerWikilink?.());
    add("==", t("Highlight text"), () => native?.editor.replaceSelection("==" + native.editor.getSelection() + "=="));
    add("QA", t("Mark as question"), () => native?.editor.replaceSelection("==//todo Q: =="));
    return {
      element: host,
      focus: () => {
        if (active) native?.editor.focus();
      },
      resize: () => {
        if (active && host.isConnected) native?.onResize();
      },
      setReadOnly: (value) => {
        if (native) native.cm.contentDOM.contentEditable = String(!value);
      },
      suggestionActive: () => !!native?.editorSuggest.isShowingSuggestion(),
      dispose
    };
  } catch (error) {
    dispose();
    throw error;
  }
}

// src/input-editor.ts
var import_obsidian2 = require("obsidian");
var InputEditor = class extends import_obsidian2.Editor {
  constructor(input) {
    super();
    this.input = input;
    this.past = [];
    this.future = [];
    this.restoring = false;
    this.alive = true;
    this.changed = () => {
      const value = this.getValue();
      if (!this.restoring && value !== this.previous) {
        this.past.push(this.previous);
        if (this.past.length > 50) this.past.shift();
        this.future = [];
      }
      this.previous = value;
    };
    this.previous = input.value;
    input.addEventListener("input", this.changed);
  }
  dispose() {
    this.alive = false;
    this.input.removeEventListener("input", this.changed);
  }
  refresh() {
  }
  getValue() {
    return singleLine2(this.input.value);
  }
  setValue(text) {
    this.replaceRange(text, { line: 0, ch: 0 }, { line: 0, ch: this.input.value.length });
  }
  getLine(line) {
    return line === 0 ? this.getValue() : "";
  }
  lineCount() {
    return 1;
  }
  lastLine() {
    return 0;
  }
  getSelection() {
    return this.getValue().slice(this.input.selectionStart, this.input.selectionEnd);
  }
  getRange(from, to) {
    return this.getValue().slice(this.posToOffset(from), this.posToOffset(to));
  }
  replaceSelection(text) {
    this.replaceRange(text, this.getCursor("from"), this.getCursor("to"));
  }
  replaceRange(text, from, to = from) {
    if (!this.alive || this.input.readOnly) return;
    const start = this.posToOffset(from), end = this.posToOffset(to);
    this.input.setRangeText(singleLine2(text), Math.min(start, end), Math.max(start, end), "end");
    this.notify();
  }
  getCursor(side = "head") {
    const backward = this.input.selectionDirection === "backward";
    const start = side === "from" || side === "head" && backward || side === "anchor" && !backward;
    return { line: 0, ch: start ? this.input.selectionStart : this.input.selectionEnd };
  }
  listSelections() {
    return [{ anchor: this.getCursor("anchor"), head: this.getCursor("head") }];
  }
  setSelection(anchor2, head = anchor2) {
    const a = this.posToOffset(anchor2), h = this.posToOffset(head);
    this.input.setSelectionRange(Math.min(a, h), Math.max(a, h), h < a ? "backward" : "forward");
  }
  setSelections(ranges, main = 0) {
    if (ranges.length > 1) throw new Error(t("Multiple cursors are available in source Markdown."));
    if (ranges[main]) this.setSelection(ranges[main].anchor, ranges[main].head);
  }
  focus() {
    if (this.alive) this.input.focus({ preventScroll: true });
  }
  blur() {
    this.input.blur();
  }
  hasFocus() {
    return this.input.ownerDocument.activeElement === this.input;
  }
  getScrollInfo() {
    return { top: this.input.scrollTop, left: this.input.scrollLeft };
  }
  scrollTo(x, y) {
    if (x != null) this.input.scrollLeft = x;
    if (y != null) this.input.scrollTop = y;
  }
  scrollIntoView(_range) {
    this.focus();
  }
  undo() {
    this.restore(this.past, this.future);
  }
  redo() {
    this.restore(this.future, this.past);
  }
  restore(from, to) {
    if (!this.alive || this.input.readOnly || !from.length) return;
    this.restoring = true;
    to.push(this.getValue());
    this.input.value = from.pop();
    this.notify();
    this.restoring = false;
  }
  exec(command) {
    const cursor = this.getCursor();
    if (command === "goStart") this.setSelection({ line: 0, ch: 0 });
    else if (command === "goEnd") this.setSelection({ line: 0, ch: this.getValue().length });
    else if (command === "goLeft" || command === "goRight") this.setSelection({ line: 0, ch: cursor.ch + (command === "goLeft" ? -1 : 1) });
    else if (command === "newlineAndIndent") return;
    else throw new Error(t("This command requires the source Markdown editor."));
  }
  transaction(tx) {
    if (tx.selections && tx.selections.length > 1) throw new Error(t("Multiple cursors are available in source Markdown."));
    if (tx.replaceSelection !== void 0) this.replaceSelection(tx.replaceSelection);
    if (tx.changes) {
      let value = this.getValue();
      const changes = tx.changes.map((change) => ({ from: this.posToOffset(change.from), to: this.posToOffset(change.to ?? change.from), text: singleLine2(change.text) })).sort((a, b) => b.from - a.from);
      for (const change of changes) value = value.slice(0, change.from) + change.text + value.slice(change.to);
      this.setValue(value);
    }
    const selection = tx.selections?.[0] ?? tx.selection;
    if (selection) this.setSelection(selection.from, selection.to);
  }
  wordAt(pos) {
    const value = this.getValue(), offset = this.posToOffset(pos);
    let from = offset, to = offset;
    while (from > 0 && !/\s/.test(value[from - 1])) from--;
    while (to < value.length && !/\s/.test(value[to])) to++;
    return from === to ? null : { from: { line: 0, ch: from }, to: { line: 0, ch: to } };
  }
  posToOffset(pos) {
    return pos.line > 0 ? this.getValue().length : Math.max(0, Math.min(this.getValue().length, pos.ch));
  }
  offsetToPos(offset) {
    return { line: 0, ch: Math.max(0, Math.min(this.getValue().length, offset)) };
  }
  notify() {
    this.input.dispatchEvent(new this.input.ownerDocument.defaultView.Event("input", { bubbles: true }));
  }
};

// src/image-paste.ts
var extensions = { "image/png": "png", "image/x-png": "png", "image/jpeg": "jpg", "image/gif": "gif", "image/webp": "webp", "image/bmp": "bmp", "image/avif": "avif", "image/svg+xml": "svg" };
function extension(file) {
  return extensions[file.type.toLowerCase()] ?? (!file.type ? /\.(png|jpe?g|gif|webp|bmp|avif|svg)$/i.exec(file.name)?.[1].toLowerCase() : void 0);
}
async function saveClipboardImage(app, sourcePath, image) {
  const ext = extension(image);
  if (!ext) throw new Error(t("This image format is not supported."));
  const bytes = await image.arrayBuffer();
  if (!bytes.byteLength) throw new Error(t("The clipboard image is empty."));
  const now = /* @__PURE__ */ new Date();
  const stamp = [now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds()].map((value) => String(value).padStart(2, "0")).join("");
  const name = `Pasted image ${stamp}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
  for (let attempt = 0; attempt < 3; attempt++) {
    const path = await app.fileManager.getAvailablePathForAttachment(name, sourcePath);
    try {
      const file = await app.vault.createBinary(path, bytes);
      const link = app.fileManager.generateMarkdownLink(file, sourcePath);
      return link.startsWith("!") ? link : `!${link}`;
    } catch (error) {
      if (attempt === 2 || !app.vault.getAbstractFileByPath(path)) throw error;
    }
  }
  throw new Error(t("Could not save the attachment."));
}
function attachImagePaste(input, options) {
  let active = true, busy = false;
  const paste = (event) => {
    if (event.defaultPrevented || !active) return;
    const data = event.clipboardData;
    if (!data) return;
    const items = Array.from(data.items ?? []).filter((item) => item.kind === "file").map((item) => item.getAsFile()).filter((file) => !!file);
    const images = (items.length ? items : Array.from(data.files ?? [])).filter((file) => extension(file));
    if (!images.length) return;
    event.preventDefault();
    event.stopPropagation();
    if (busy || input.readOnly) return;
    busy = true;
    input.readOnly = true;
    input.setAttribute("aria-busy", "true");
    let start = input.selectionStart, end = input.selectionEnd;
    options.status(t("Saving image\u2026"));
    void (async () => {
      try {
        for (let index = 0; index < images.length; index++) {
          if (!active) return;
          const embed = await options.save(images[index]);
          if (!active) {
            options.report(t("Attachment saved, but the editor is already closed: {link}", { link: embed }));
            return;
          }
          input.setRangeText((index ? " " : "") + embed, start, end, "end");
          start = end = input.selectionEnd;
          input.dispatchEvent(new input.ownerDocument.defaultView.Event("input", { bubbles: true }));
        }
        options.status("");
      } catch (error) {
        const message2 = error instanceof Error ? error.message : String(error);
        if (active) options.status(message2);
        options.report(message2);
      } finally {
        busy = false;
        if (active) {
          input.readOnly = false;
          input.removeAttribute("aria-busy");
          input.focus({ preventScroll: true });
        }
      }
    })();
  };
  input.addEventListener("paste", paste);
  return () => {
    active = false;
    input.removeEventListener("paste", paste);
  };
}

// src/editor.ts
var import_obsidian3 = require("obsidian");

// src/link-search.ts
function normalizeLinkQuery(value) {
  const trimmed = value.trim();
  return trimmed.startsWith("[[") && trimmed.endsWith("]]") ? trimmed.slice(2, -2).trim() : trimmed;
}
var fold = (value) => value.normalize("NFC").toLowerCase();
var withoutMarkdownExtension = (value) => value.replace(/\.md(?=#|$)/i, "");
var identity2 = (value) => fold(withoutMarkdownExtension(value));
var filePart = (value) => value.split("#", 1)[0];
var titleOf = (path) => withoutMarkdownExtension(path.slice(path.lastIndexOf("/") + 1));
var isLinkTarget = (value) => value.length > 0 && !/[\r\n\u0000-\u001f\u007f|\[\]]/.test(value);
function buildLinkTargets(files, unresolved) {
  const targets = [];
  const resolved = /* @__PURE__ */ new Set();
  const fileEntries = /* @__PURE__ */ new Set();
  for (const file of files) {
    resolved.add(identity2(file.path));
    resolved.add(identity2(file.basename));
    const labels = [file.basename, ...file.aliases.map((alias) => alias.trim()).filter(Boolean)];
    for (let index = 0; index < labels.length; index++) {
      const label2 = labels[index];
      resolved.add(identity2(label2));
      const key = `${fold(file.path)}\0${fold(label2)}`;
      if (fileEntries.has(key)) continue;
      fileEntries.add(key);
      targets.push({ kind: "file", path: file.path, label: label2, ...index > 0 ? { alias: label2 } : {} });
    }
  }
  const ghosts = /* @__PURE__ */ new Map();
  for (const [rawPath, count] of Object.entries(unresolved)) {
    const path = normalizeLinkQuery(rawPath);
    if (!isLinkTarget(path) || !filePart(path) || resolved.has(identity2(filePart(path)))) continue;
    const key = identity2(path);
    const existing = ghosts.get(key);
    const references = Number.isFinite(count) && count > 0 ? count : 0;
    if (existing) existing.references = (existing.references ?? 0) + references;
    else ghosts.set(key, { kind: "ghost", path, label: titleOf(path), references });
  }
  return [...targets, ...ghosts.values()];
}
function subsequenceCost(text, query) {
  let position = 0;
  let first = -1;
  for (const character of query) {
    const found = text.indexOf(character, position);
    if (found < 0) return void 0;
    if (first < 0) first = found;
    position = found + character.length;
  }
  return position - first - query.length + first;
}
function rank(target, query) {
  const title = identity2(target.label);
  const path = identity2(target.path);
  if (!query) return target.kind === "file" ? 0 : 1;
  if (title === query || path === query) return 0;
  if (title.startsWith(query)) return 1;
  if (title.includes(query)) return 2;
  if (subsequenceCost(title, query) !== void 0) return 3;
  if (path.startsWith(query)) return 4;
  if (path.includes(query)) return 5;
  if (subsequenceCost(path, query) !== void 0) return 6;
  return void 0;
}
function searchLinkTargets(targets, rawQuery, limit = 80) {
  const queryText = normalizeLinkQuery(rawQuery);
  const query = identity2(queryText);
  const maxResults = Math.max(0, Math.floor(limit));
  if (!maxResults) return [];
  const ranked = targets.flatMap((target) => {
    const score = rank(target, query);
    return score === void 0 ? [] : [{ target, score }];
  });
  ranked.sort((a, b) => a.score - b.score || (a.target.kind === "file" ? 0 : 1) - (b.target.kind === "file" ? 0 : 1) || Number(!!a.target.alias) - Number(!!b.target.alias) || (a.score === 3 ? (subsequenceCost(identity2(a.target.label), query) ?? 0) - (subsequenceCost(identity2(b.target.label), query) ?? 0) : 0) || a.target.label.length - b.target.label.length || a.target.label.localeCompare(b.target.label) || a.target.path.localeCompare(b.target.path));
  const hasExact = ranked.some(({ score }) => score === 0);
  const offerNew = isLinkTarget(queryText) && !hasExact;
  const result = ranked.slice(0, offerNew ? maxResults - 1 : maxResults).map(({ target }) => target);
  if (offerNew) result.push({ kind: "new", path: queryText, label: queryText });
  return result;
}

// src/editor.ts
function primaryEnter(modal, submit, multiline = false) {
  modal.scope.register([], "Enter", (event) => {
    if (event.isComposing || event.defaultPrevented) return;
    const target = event.target;
    if (target?.closest("button") || multiline && target?.closest("textarea")) return;
    event.preventDefault();
    event.stopPropagation();
    if (!event.repeat) submit();
    return false;
  });
}
var MapPicker = class extends import_obsidian3.FuzzySuggestModal {
  constructor(app, matches, choose) {
    super(app);
    this.matches = matches;
    this.choose = choose;
    this.setPlaceholder(t("Find a map\u2026"));
  }
  getItems() {
    return this.app.vault.getMarkdownFiles().filter((file) => this.matches(file));
  }
  getItemText(file) {
    return file.path.replace(/\.md$/, "");
  }
  onChooseItem(file) {
    this.choose(file);
  }
};
var LinkPicker = class extends import_obsidian3.SuggestModal {
  constructor(app, sourcePath, choose, afterClose = () => {
  }) {
    super(app);
    this.sourcePath = sourcePath;
    this.choose = choose;
    this.afterClose = afterClose;
    this.limit = 80;
    this.setPlaceholder(t("Note name, alias or new link\u2026"));
    this.setInstructions([{ command: "\u2191\u2193", purpose: t("select") }, { command: "Enter", purpose: t("insert link") }, { command: "Esc", purpose: t("return to node") }]);
    const files = this.app.vault.getFiles().map((file) => ({
      path: file.path,
      basename: file.extension === "md" ? file.basename : file.name,
      aliases: (0, import_obsidian3.parseFrontMatterAliases)(this.app.metadataCache.getFileCache(file)?.frontmatter) ?? []
    }));
    const unresolved = /* @__PURE__ */ Object.create(null);
    for (const links of Object.values(this.app.metadataCache.unresolvedLinks ?? {})) {
      for (const [target, count] of Object.entries(links)) unresolved[target] = (unresolved[target] ?? 0) + count;
    }
    this.targets = buildLinkTargets(files, unresolved);
  }
  getSuggestions(query) {
    return searchLinkTargets(this.targets, query, this.limit);
  }
  renderSuggestion(target, el) {
    el.addClass("tvm-link-suggestion");
    const title = el.createDiv("tvm-link-title");
    title.createSpan({ text: target.label });
    if (target.kind !== "file") title.createSpan({ cls: "tvm-link-badge", text: target.kind === "ghost" ? t("file not created yet") : t("new link") });
    const detail = target.kind === "file" ? target.path + (target.alias ? " \xB7 alias" : "") : target.kind === "ghost" ? t("{path} \xB7 References: {count}", { path: target.path, count: target.references ?? 1 }) : t("Insert a link without creating a file");
    el.createDiv({ cls: "tvm-link-path", text: detail });
  }
  onChooseSuggestion(target) {
    if (target.kind === "file") {
      const file = this.app.vault.getAbstractFileByPath(target.path);
      if (!(file instanceof import_obsidian3.TFile)) {
        new import_obsidian3.Notice(t("The file changed or was deleted. Search again."));
        return;
      }
      this.choose(this.app.fileManager.generateMarkdownLink(file, this.sourcePath, "", target.alias));
    } else this.choose(`[[${target.path}]]`);
  }
  onClose() {
    super.onClose();
    window.setTimeout(this.afterClose, 0);
  }
};
function attachNodeTools(app, sourcePath, input, toolbar) {
  let active = true;
  let picker;
  const changed = () => input.dispatchEvent(new input.ownerDocument.defaultView.Event("input", { bubbles: true }));
  const link = (start = input.selectionStart, end = input.selectionEnd) => {
    if (picker || !active || input.readOnly) return;
    picker = new LinkPicker(app, sourcePath, (text) => {
      if (active && !input.readOnly) {
        input.setRangeText(text, start, end, "end");
        changed();
      }
    }, () => {
      picker = void 0;
      if (active && input.isConnected) input.focus({ preventScroll: true });
    });
    picker.open();
  };
  const complete = () => {
    const end = input.selectionStart;
    if (end === input.selectionEnd && input.value.slice(end - 2, end) === "[[") link(end - 2, end + (input.value.slice(end, end + 2) === "]]" ? 2 : 0));
  };
  const keydown = (event) => {
    if (event.isComposing || input.readOnly) return;
    if (event.key === "[" && input.selectionStart === input.selectionEnd && input.value[input.selectionStart - 1] === "[") {
      event.preventDefault();
      event.stopPropagation();
      input.setRangeText("[", input.selectionStart, input.selectionEnd, "end");
      complete();
      changed();
    }
    if ((event.ctrlKey || event.metaKey) && (event.code === "KeyK" || event.key.toLowerCase() === "k")) {
      event.preventDefault();
      event.stopPropagation();
      link();
    }
  };
  const onInput = (event) => {
    if (!event.isComposing) complete();
  };
  input.addEventListener("keydown", keydown);
  input.addEventListener("input", onInput);
  const add = (label2, title, action) => {
    const button2 = toolbar.ownerDocument.createElement("button");
    button2.type = "button";
    button2.textContent = label2;
    button2.title = title;
    button2.setAttribute("aria-label", title);
    button2.onclick = action;
    toolbar.append(button2);
  };
  const insert = (text, back = 0) => {
    if (input.readOnly) return;
    input.setRangeText(text, input.selectionStart, input.selectionEnd, "end");
    input.selectionStart = input.selectionEnd = input.selectionEnd - back;
    input.focus();
    changed();
  };
  add("[[\u2026]]", t("Link (Ctrl+K)"), () => link());
  add("==", t("Highlight text"), () => {
    const selected = input.value.slice(input.selectionStart, input.selectionEnd);
    insert(`==${selected}==`, selected ? 0 : 2);
  });
  add("QA", t("Mark as question"), () => insert("==//todo Q: ==", 2));
  return () => {
    active = false;
    input.removeEventListener("keydown", keydown);
    input.removeEventListener("input", onInput);
    picker?.close();
  };
}
var DateDialog = class extends import_obsidian3.Modal {
  constructor(app, initial, saveDate) {
    super(app);
    this.initial = initial;
    this.saveDate = saveDate;
    this.saving = false;
  }
  onOpen() {
    this.titleEl.setText(t("Step deadline"));
    const input = this.contentEl.createEl("input", { type: "date", attr: { "aria-label": t("Date") } });
    input.value = this.initial === "?" ? "" : this.initial;
    const label2 = this.contentEl.createEl("label", { cls: "tvm-date-unknown" });
    const unknown = label2.createEl("input", { type: "checkbox" });
    unknown.checked = this.initial === "?";
    label2.append(t(" Unknown deadline (?)"));
    const calendar = this.contentEl.createDiv("tvm-calendar");
    let month = input.value ? /* @__PURE__ */ new Date(`${input.value}T12:00:00`) : /* @__PURE__ */ new Date();
    month = new Date(month.getFullYear(), month.getMonth(), 1);
    const dateText = (date) => `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const draw = () => {
      calendar.empty();
      const header = calendar.createDiv("tvm-calendar-header");
      const move = (offset) => {
        month = new Date(month.getFullYear(), month.getMonth() + offset, 1);
        draw();
      };
      header.createEl("button", { text: "\u2039", attr: { type: "button", "aria-label": t("Previous month") } }).onclick = () => move(-1);
      header.createSpan({ text: month.toLocaleDateString(getLocale(), { month: "long", year: "numeric" }) });
      header.createEl("button", { text: "\u203A", attr: { type: "button", "aria-label": t("Next month") } }).onclick = () => move(1);
      const grid = calendar.createDiv("tvm-calendar-grid");
      for (const day of [t("Mon"), t("Tue"), t("Wed"), t("Thu"), t("Fri"), t("Sat"), t("Sun")]) grid.createSpan({ text: day });
      for (let blank = 0; blank < (month.getDay() + 6) % 7; blank++) grid.createSpan();
      const days = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
      for (let day = 1; day <= days; day++) {
        const value = dateText(new Date(month.getFullYear(), month.getMonth(), day));
        const button2 = grid.createEl("button", { text: String(day), attr: { type: "button", "aria-label": value, "aria-pressed": String(!unknown.checked && input.value === value) } });
        button2.classList.toggle("is-selected", !unknown.checked && input.value === value);
        button2.onclick = () => {
          input.value = value;
          unknown.checked = false;
          draw();
          input.focus();
        };
      }
    };
    input.onchange = () => {
      unknown.checked = false;
      if (input.value) {
        const date = /* @__PURE__ */ new Date(`${input.value}T12:00:00`);
        month = new Date(date.getFullYear(), date.getMonth(), 1);
      }
      draw();
    };
    unknown.onchange = draw;
    const submit = async () => {
      if (this.saving) return;
      this.saving = true;
      try {
        await this.saveDate(unknown.checked ? "?" : input.value);
        this.close();
      } catch (error) {
        new import_obsidian3.Notice(error instanceof Error ? error.message : String(error));
      } finally {
        this.saving = false;
      }
    };
    new import_obsidian3.Setting(this.contentEl).addButton((button2) => button2.setButtonText(t("Cancel")).onClick(() => this.close())).addButton((button2) => button2.setButtonText(t("Save")).setCta().onClick(() => {
      void submit();
    }));
    primaryEnter(this, () => {
      void submit();
    });
    draw();
    input.focus();
  }
};
var TextDialog = class extends import_obsidian3.Modal {
  constructor(app, title, initial, saveText, sourcePath = "", nodeEditor = true) {
    super(app);
    this.title = title;
    this.initial = initial;
    this.saveText = saveText;
    this.sourcePath = sourcePath;
    this.nodeEditor = nodeEditor;
    this.saving = false;
  }
  onOpen() {
    this.titleEl.setText(this.title);
    this.contentEl.addClass("tvm-editor");
    this.input = this.contentEl.createEl("textarea", { attr: { "aria-label": this.title, rows: "5", spellcheck: "true" } });
    const singleLine3 = (text) => text.replace(/[\r\n\u2028\u2029]+/g, " ");
    this.input.value = this.nodeEditor ? singleLine3(this.initial) : this.initial;
    const insert = (value, back = 0) => {
      this.input.setRangeText(value, this.input.selectionStart, this.input.selectionEnd, "end");
      this.input.selectionStart = this.input.selectionEnd = this.input.selectionEnd - back;
      this.input.focus();
    };
    if (this.nodeEditor) {
      this.input.addEventListener("beforeinput", (event) => {
        if (event.inputType === "insertParagraph" || event.inputType === "insertLineBreak") event.preventDefault();
      });
      const normalize = () => {
        const before = this.input.value;
        const start = singleLine3(before.slice(0, this.input.selectionStart)).length;
        const end = singleLine3(before.slice(0, this.input.selectionEnd)).length;
        if (before !== singleLine3(before)) {
          this.input.value = singleLine3(before);
          this.input.setSelectionRange(start, end);
        }
      };
      this.input.addEventListener("input", (event) => {
        if (!event.isComposing) normalize();
      });
      this.input.addEventListener("compositionend", normalize);
      this.input.addEventListener("paste", (event) => {
        const text = event.clipboardData?.getData("text/plain");
        if (text === void 0 || !/[\r\n\u2028\u2029]/.test(text)) return;
        event.preventDefault();
        this.input.setRangeText(singleLine3(text), this.input.selectionStart, this.input.selectionEnd, "end");
      });
    }
    if (this.nodeEditor === true) this.unmount = attachNodeTools(this.app, this.sourcePath, this.input, this.contentEl.createDiv("tvm-editor-tools"));
    const note = this.contentEl.createEl("p", { text: this.nodeEditor ? t("Enter to save, Esc to cancel.") : t("Ctrl+Enter to confirm, Esc to cancel.") });
    note.addClass("setting-item-description");
    new import_obsidian3.Setting(this.contentEl).addButton((button2) => button2.setButtonText(t("Cancel")).onClick(() => this.close())).addButton((button2) => button2.setButtonText(t("Save")).setCta().onClick(() => {
      void this.submit();
    }));
    primaryEnter(this, () => {
      void this.submit();
    }, !this.nodeEditor);
    this.input.addEventListener("keydown", (event) => {
      if (event.isComposing || event.defaultPrevented) return;
      if (this.nodeEditor && event.key === "Enter") {
        event.preventDefault();
        event.stopPropagation();
        if (!event.repeat && !event.shiftKey && !event.altKey) void this.submit();
      } else if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        event.stopPropagation();
        if (!event.repeat) void this.submit();
      }
    });
    setTimeout(() => {
      this.input.focus();
      this.input.selectionStart = this.input.selectionEnd = this.input.value.length;
    }, 30);
  }
  async submit() {
    if (this.saving) return;
    this.saving = true;
    try {
      await this.saveText(this.nodeEditor ? this.input.value.replace(/[\r\n\u2028\u2029]+/g, " ") : this.input.value);
      this.close();
    } catch (error) {
      new import_obsidian3.Notice(error instanceof Error ? error.message : String(error), 8e3);
    } finally {
      this.saving = false;
    }
  }
  onClose() {
    this.unmount?.();
    this.contentEl.empty();
  }
};
var ConfirmDialog = class extends import_obsidian3.Modal {
  constructor(app, title, detail, confirm, options = {}) {
    super(app);
    this.title = title;
    this.detail = detail;
    this.confirm = confirm;
    this.options = options;
    this.saving = false;
  }
  onOpen() {
    this.titleEl.setText(this.title);
    this.contentEl.createEl("p", { text: this.detail });
    new import_obsidian3.Setting(this.contentEl).addButton((button2) => {
      button2.setButtonText(t("Cancel")).onClick(() => this.close());
      if (this.options.focusConfirm === false) {
        button2.buttonEl.focus();
        window.setTimeout(() => {
          if (button2.buttonEl.isConnected) button2.buttonEl.focus();
        }, 0);
      }
    }).addButton((button2) => {
      button2.setButtonText(this.options.label ?? t("Delete branch")).setWarning().onClick(() => {
        void this.submit();
      });
      if (this.options.focusConfirm !== false) {
        button2.buttonEl.focus();
        window.setTimeout(() => {
          if (button2.buttonEl.isConnected) button2.buttonEl.focus();
        }, 0);
      }
      button2.buttonEl.addEventListener("keydown", (event) => {
        if (event.key === "Enter" && event.repeat) event.preventDefault();
      });
    });
    if (this.options.focusConfirm !== false) primaryEnter(this, () => {
      void this.submit();
    });
  }
  async submit() {
    if (this.saving) return;
    this.saving = true;
    try {
      await this.confirm();
      this.close();
    } catch (error) {
      new import_obsidian3.Notice(String(error));
    } finally {
      this.saving = false;
    }
  }
};

// src/export.ts
function escape(value) {
  return value.replace(/[^\u0009\u000a\u000d\u0020-\ud7ff\ue000-\ufffd\u{10000}-\u{10ffff}]/gu, "\uFFFD").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function outline(doc) {
  const nodes = [];
  const seen = /* @__PURE__ */ new Set();
  const pending = [...doc.roots, ...doc.nodes.map((node) => node.id)].reverse().map((id) => ({ id, parent: null, depth: 0 }));
  while (pending.length) {
    const item = pending.pop();
    const node = doc.byId.get(item.id);
    if (!node || seen.has(node.id)) continue;
    seen.add(node.id);
    const index = nodes.length;
    nodes.push({ text: node.text, parent: item.parent, children: [], depth: item.depth });
    if (item.parent !== null) nodes[item.parent].children.push(index);
    for (let child = node.children.length - 1; child >= 0; child--) pending.push({ id: node.children[child], parent: index, depth: item.depth + 1 });
  }
  return nodes;
}
function exportHtml(doc, title) {
  const nodes = outline(doc);
  const output = [
    "<!doctype html>",
    `<html lang="${getLocale()}"><head><meta charset="utf-8">`,
    '<meta name="viewport" content="width=device-width, initial-scale=1">',
    `<meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; base-uri 'none'; form-action 'none'">`,
    `<title>${escape(title)}</title>`,
    '<style> :root{color-scheme:light dark;font-family:system-ui,sans-serif}body{margin:0;padding:32px;background:#f5f7fc;color:#172033}header{max-width:80ch;margin-bottom:28px}h1{margin:0 0 8px;font-size:1.8rem;overflow-wrap:anywhere}p{color:#536177;line-height:1.5}.outline{padding:0;list-style:none}.outline ul{list-style:none;margin:12px 0 0 16px;padding:0 0 0 28px;border-left:2px solid #b6c4da}.outline li{position:relative;margin:12px 0}.outline ul>li::before{content:"";position:absolute;left:-28px;top:20px;width:27px;border-top:2px solid #b6c4da}.label{display:inline-block;max-width:70ch;padding:10px 14px;border:1px solid #b6c4da;border-radius:10px;background:#fff;white-space:pre-wrap;overflow-wrap:anywhere;line-height:1.45;vertical-align:top}summary{cursor:pointer;max-width:max-content}summary>.label{vertical-align:middle}summary::marker{color:#4975c8}main{overflow:auto;padding:0 0 24px}@media(prefers-color-scheme:dark){body{background:#151b28;color:#e7edf9}p{color:#aebbd1}.label{background:#222c3e;border-color:#50607b}.outline ul{border-color:#50607b}.outline ul>li::before{border-color:#50607b}}@media print{body{background:white;color:black;padding:8px}.label{background:white;color:black}summary::marker{color:black}}</style>',
    `</head><body><header><h1>${escape(title)}</h1><p>${escape(t("Full map \xB7 {count} nodes \xB7 Read-only export. Select a branch marker to fold it. Labels retain Markdown text. Vault links and attachments require Obsidian.", { count: nodes.length }))}</p></header><main>`
  ];
  if (!nodes.length) output.push(`<p>${escape(t("This map contains no outline nodes."))}</p>`);
  else {
    output.push('<ul class="outline">');
    const tasks = nodes.map((node, index) => node.parent === null ? index : -1).filter((index) => index >= 0).reverse().map((node) => ({ node }));
    while (tasks.length) {
      const task = tasks.pop();
      if ("close" in task) {
        output.push(task.close);
        continue;
      }
      const node = nodes[task.node];
      if (!node.children.length) output.push(`<li><span class="label">${escape(node.text)}</span></li>`);
      else {
        output.push(`<li><details open><summary><span class="label">${escape(node.text)}</span></summary><ul>`);
        tasks.push({ close: "</ul></details></li>" });
        for (let child = node.children.length - 1; child >= 0; child--) tasks.push({ node: node.children[child] });
      }
    }
    output.push("</ul>");
  }
  output.push("</main></body></html>");
  return output.join("\n");
}
var NODE_WIDTH = 320;
var COLUMN_GAP2 = 72;
var ROW_GAP2 = 18;
var PADDING = 32;
var LINE_HEIGHT = 20;
function characterWidth(character) {
  if (/\s/u.test(character)) return 5;
  if (/[ilI.,'`!|:;]/u.test(character)) return 5;
  if (/[MW@#%&]/u.test(character)) return 13;
  if (/\p{Mark}|\u200d|\ufe0f/u.test(character)) return 0;
  const point = character.codePointAt(0);
  return point > 11903 ? 16 : 9;
}
function wrap(text, maxWidth = NODE_WIDTH - 32) {
  const lines = [];
  for (const paragraph of text.split(/\r\n|\n|\r/)) {
    const characters = [...paragraph];
    if (!characters.length) {
      lines.push("");
      continue;
    }
    let start = 0;
    while (start < characters.length) {
      let end = start, width2 = 0, space = -1;
      while (end < characters.length && (width2 + characterWidth(characters[end]) <= maxWidth || end === start)) {
        width2 += characterWidth(characters[end]);
        if (/\s/u.test(characters[end])) space = end;
        end++;
      }
      if (end < characters.length && space > start + (end - start) / 2) end = space + 1;
      lines.push(characters.slice(start, end).join(""));
      start = end;
    }
  }
  return lines;
}
function exportSvg(doc, title) {
  const nodes = outline(doc);
  const titleLines = wrap(title, (600 - PADDING * 2) * 14 / 20);
  const headerHeight = 72 + titleLines.length * 28;
  const lines = nodes.map((node) => wrap(node.text));
  const heights = lines.map((label2) => Math.max(48, label2.length * LINE_HEIGHT + 24));
  const branchHeights = [...heights];
  for (let index = nodes.length - 1; index >= 0; index--) {
    const children = nodes[index].children;
    branchHeights[index] = Math.max(heights[index], children.reduce((total, child) => total + branchHeights[child], 0) + Math.max(0, children.length - 1) * ROW_GAP2);
  }
  const tops = new Array(nodes.length);
  const positions = [];
  let nextRootY = headerHeight, width2 = 600, height = headerHeight + 60;
  for (let index = 0; index < nodes.length; index++) {
    const node = nodes[index];
    if (node.parent === null) {
      tops[index] = nextRootY;
      nextRootY += branchHeights[index] + ROW_GAP2 * 2;
    }
    const x = PADDING + node.depth * (NODE_WIDTH + COLUMN_GAP2);
    const y = tops[index] + (branchHeights[index] - heights[index]) / 2;
    positions.push({ x, y });
    width2 = Math.max(width2, x + NODE_WIDTH + PADDING);
    height = Math.max(height, y + heights[index] + PADDING);
    const childrenHeight = node.children.reduce((total, child) => total + branchHeights[child], 0) + Math.max(0, node.children.length - 1) * ROW_GAP2;
    let childY = tops[index] + (branchHeights[index] - childrenHeight) / 2;
    for (const child of node.children) {
      tops[child] = childY;
      childY += branchHeights[child] + ROW_GAP2;
    }
  }
  const output = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    `<svg xmlns="http://www.w3.org/2000/svg" width="${width2}" height="${height}" viewBox="0 0 ${width2} ${height}" role="img" aria-labelledby="map-title map-description">`,
    `<title id="map-title">${escape(title)}</title>`,
    `<desc id="map-description">Full map, ${nodes.length} nodes. Read-only export with all branches expanded. Labels retain their Markdown text.</desc>`,
    `<rect width="${width2}" height="${height}" fill="#f5f7fc"/>`,
    `<text xml:space="preserve" font-family="system-ui,sans-serif" font-size="20" font-weight="600" fill="#172033">${titleLines.map((line, index) => `<tspan x="${PADDING}" y="${40 + index * 28}">${escape(line)}</tspan>`).join("")}</text>`,
    `<text x="${PADDING}" y="${40 + titleLines.length * 28}" font-family="system-ui,sans-serif" font-size="13" fill="#536177">Full map \xB7 ${nodes.length} nodes \xB7 read-only export</text>`,
    '<g fill="none" stroke="#9baecc" stroke-width="2">'
  ];
  for (let index = 0; index < nodes.length; index++) {
    const parent = nodes[index].parent;
    if (parent === null) continue;
    const x1 = positions[parent].x + NODE_WIDTH, y1 = positions[parent].y + heights[parent] / 2;
    const x2 = positions[index].x, y2 = positions[index].y + heights[index] / 2;
    output.push(`<path d="M ${x1} ${y1} C ${x1 + COLUMN_GAP2 / 2} ${y1}, ${x2 - COLUMN_GAP2 / 2} ${y2}, ${x2} ${y2}"/>`);
  }
  output.push("</g>");
  for (let index = 0; index < nodes.length; index++) {
    const { x, y } = positions[index];
    output.push(`<g class="map-node"><title>${escape(nodes[index].text)}</title><rect x="${x}" y="${y}" width="${NODE_WIDTH}" height="${heights[index]}" rx="10" fill="#fff" stroke="#9baecc"/><text xml:space="preserve" font-family="system-ui,sans-serif" font-size="14" fill="#172033">`);
    for (let line = 0; line < lines[index].length; line++) output.push(`<tspan x="${x + 16}" y="${y + 27 + line * LINE_HEIGHT}">${escape(lines[index][line])}</tspan>`);
    output.push("</text></g>");
  }
  if (!nodes.length) output.push(`<text x="${PADDING}" y="${headerHeight + 16}" font-family="system-ui,sans-serif" font-size="14" fill="#536177">This map contains no outline nodes.</text>`);
  output.push("</svg>");
  return output.join("\n");
}

// src/session.ts
function parseState(value) {
  if (!value) return void 0;
  try {
    const data = JSON.parse(value);
    if (!data || !Array.isArray(data.collapsed) || !data.camera) return void 0;
    const { x, y, scale } = data.camera;
    if (![x, y, scale].every((v) => typeof v === "number" && Number.isFinite(v))) return void 0;
    return {
      collapsed: data.collapsed.filter((id) => typeof id === "string").slice(0, 2e4),
      selected: typeof data.selected === "string" ? data.selected : null,
      focusRoot: typeof data.focusRoot === "string" ? data.focusRoot : null,
      camera: { x, y, scale: Math.max(MIN_SCALE, Math.min(MAX_SCALE, scale)) }
    };
  } catch {
    return void 0;
  }
}
function guardedChange(current, expected, next) {
  if (current !== expected) throw new Error(t("The note changed in another window or device. The map was refreshed. Retry on the latest text."));
  return next;
}
function label(node) {
  return node.text.replace(/^\[[^\]]\]\s*/, "").replace(/^#step\s+(?:\d+(?:\.\d+)*[a-z]*\)|\))\s*/i, "#step ").replace(/\s+/g, " ").trim();
}
function serializeViewState(doc, state) {
  const canonical = parseMap(doc.source);
  const byLine = new Map(canonical.nodes.map((node) => [node.line, node]));
  const refs = [];
  const translate = (id) => {
    if (!id) return null;
    const current = doc.byId.get(id);
    const node = current && byLine.get(current.line);
    if (!node) return null;
    if (!refs.some((ref) => ref.id === node.id)) refs.push({ id: node.id, text: label(node), parent: node.parentId ? label(canonical.byId.get(node.parentId)) : "", kind: node.kind });
    return node.id;
  };
  const saved = { ...state, collapsed: state.collapsed.map(translate).filter((id) => id !== null), selected: translate(state.selected), focusRoot: translate(state.focusRoot) };
  return JSON.stringify({ ...saved, refs });
}
function restoreViewState(doc, value) {
  const saved = parseState(value);
  if (!saved) return void 0;
  let refs = [];
  try {
    const parsed = JSON.parse(value);
    if (Array.isArray(parsed.refs)) refs = parsed.refs.filter((ref) => ref && typeof ref.id === "string" && typeof ref.text === "string" && typeof ref.parent === "string");
  } catch {
  }
  const translate = (id) => {
    if (!id) return null;
    if (doc.byId.has(id)) return id;
    const ref = refs.find((ref2) => ref2.id === id);
    if (!ref) return null;
    const matches = doc.nodes.filter((node) => node.kind === ref.kind && label(node) === ref.text);
    if (matches.length === 1) return matches[0].id;
    const sameParent = matches.filter((node) => (node.parentId ? label(doc.byId.get(node.parentId)) : "") === ref.parent);
    return sameParent.length === 1 ? sameParent[0].id : null;
  };
  return { ...saved, collapsed: saved.collapsed.map(translate).filter((id) => id !== null), selected: translate(saved.selected), focusRoot: translate(saved.focusRoot) };
}
var History = class {
  constructor() {
    this.undoEntries = [];
    this.redoEntries = [];
  }
  can(direction, current) {
    try {
      return this.peek(direction, current) !== null;
    } catch {
      return false;
    }
  }
  push(before, after) {
    if (before === after) return;
    this.undoEntries.push({ before, after });
    while (this.undoEntries.length > 30 || this.undoEntries.length > 1 && this.undoEntries.reduce((n, e) => n + e.before.length + e.after.length, 0) > 8e6) this.undoEntries.shift();
    this.redoEntries = [];
  }
  peek(direction, current) {
    const entries = direction === "undo" ? this.undoEntries : this.redoEntries;
    const item = entries[entries.length - 1];
    if (!item) return null;
    const expected = direction === "undo" ? item.after : item.before;
    if (current !== expected) throw new Error(t("History stopped because the text changed externally. Undo will preserve those changes."));
    return direction === "undo" ? item.before : item.after;
  }
  commit(direction) {
    const from = direction === "undo" ? this.undoEntries : this.redoEntries;
    const to = direction === "undo" ? this.redoEntries : this.undoEntries;
    const item = from.pop();
    if (item) to.push(item);
  }
};

// src/main.ts
var VIEW = "traceview-mindmap-map";
var QUEUE = "traceview-mindmap-queue";
var LARGE_RESTORE_NODE_LIMIT = 400;
function hasLargeVisibleTree(doc, state) {
  const collapsed = new Set(state?.collapsed);
  const pending = state?.focusRoot ? [state.focusRoot] : [...doc.roots];
  let count = 0;
  while (pending.length) {
    const node = doc.byId.get(pending.pop());
    if (!node) continue;
    if (++count >= LARGE_RESTORE_NODE_LIMIT) return true;
    if (!collapsed.has(node.id)) for (const child of node.children) pending.push(child);
  }
  return false;
}
var DEFAULT_SETTINGS = { patternMode: "glob", mapPatterns: "*.mindmap.md\n\u{1F3AF}*.md", language: "auto", nodeEditor: "native", autoOpen: false, autoRestoreLargeMaps: true, hideFrozen: true, queueTaskMarker: true, queueStepTag: true, collapseOnLeft: false, hotkeys: {}, widthMode: "fixed" };
var widthModes = () => [["fixed", t("Fixed width")], ["content", t("Fit node content")], ["column", t("Fit visible column")]];
var message = (error) => error instanceof Error ? error.message : String(error);
var button = (parent, label2, action, title = label2) => {
  const element = parent.createEl("button", { text: label2, attr: { title, "aria-label": title, type: "button" } });
  element.onclick = action;
  return element;
};
var iconButton = (parent, icon, label2, action) => {
  const element = button(parent, "", action, label2);
  element.addClass("tvm-icon-button");
  (0, import_obsidian4.setIcon)(element, icon);
  return element;
};
var TraceViewMindmap = class extends import_obsidian4.Plugin {
  constructor() {
    super(...arguments);
    this.settings = { ...DEFAULT_SETTINGS };
    this.clipboard = "";
    this.matchesMap = compileMapPatterns(DEFAULT_SETTINGS);
    this.saveQueues = /* @__PURE__ */ new Map();
    this.sourceLeaves = /* @__PURE__ */ new WeakMap();
    this.sourcePreferences = /* @__PURE__ */ new Set();
    this.autoTimers = /* @__PURE__ */ new Map();
    this.nativeLinkTargets = /* @__PURE__ */ new WeakMap();
    this.opening = /* @__PURE__ */ new WeakSet();
  }
  async onload() {
    const saved = await this.loadData();
    this.register(() => {
      for (const timer of this.autoTimers.values()) window.clearTimeout(timer);
      this.autoTimers.clear();
    });
    this.settings = { ...DEFAULT_SETTINGS, ...saved, hotkeys: {} };
    if (typeof this.settings.previousPluginId !== "string" || !/^[a-z0-9][a-z0-9-]*$/.test(this.settings.previousPluginId) || this.settings.previousPluginId === "traceview-mindmap") delete this.settings.previousPluginId;
    try {
      let paths = this.app.loadLocalStorage("traceview-mindmap:source-preferences");
      if (!Array.isArray(paths) && this.settings.previousPluginId) paths = this.app.loadLocalStorage(this.settings.previousPluginId + ":source-preferences");
      if (Array.isArray(paths)) {
        this.sourcePreferences = new Set(paths.filter((path) => typeof path === "string"));
        this.rememberSource();
      }
    } catch {
    }
    if (this.settings.nodeEditor !== "native" && this.settings.nodeEditor !== "text") this.settings.nodeEditor = "native";
    if (!isLanguageSetting(this.settings.language)) this.settings.language = "auto";
    setLanguage(this.settings.language, typeof import_obsidian4.getLanguage === "function" ? (0, import_obsidian4.getLanguage)() : "en");
    if (this.settings.patternMode !== "regex") this.settings.patternMode = "glob";
    if (typeof this.settings.mapPatterns !== "string") this.settings.mapPatterns = DEFAULT_SETTINGS.mapPatterns;
    try {
      this.matchesMap = compileMapPatterns(this.settings);
    } catch {
      this.settings.patternMode = DEFAULT_SETTINGS.patternMode;
      this.settings.mapPatterns = DEFAULT_SETTINGS.mapPatterns;
      new import_obsidian4.Notice(t("Invalid saved map patterns. Default patterns are active."));
    }
    if (!widthModes().some(([mode]) => mode === this.settings.widthMode)) this.settings.widthMode = "fixed";
    for (const definition of HOTKEY_DEFINITIONS) {
      const binding = saved?.hotkeys?.[definition.id];
      if (typeof binding === "string" && !validateHotkeys(binding)) this.settings.hotkeys[definition.id] = binding;
    }
    const originalEphemeral = import_obsidian4.MarkdownView.prototype.setEphemeralState;
    let observeLinks = true;
    const plugin = this;
    const receiveEphemeral = function(state) {
      if (observeLinks && this.app === plugin.app && plugin.settings.autoOpen && this.file && plugin.isMap(this.file) && typeof state?.subpath === "string") {
        plugin.nativeLinkTargets.set(this, { path: this.file.path, subpath: state.subpath });
      }
      return originalEphemeral.call(this, state);
    };
    import_obsidian4.MarkdownView.prototype.setEphemeralState = receiveEphemeral;
    this.register(() => {
      observeLinks = false;
      if (import_obsidian4.MarkdownView.prototype.setEphemeralState === receiveEphemeral) import_obsidian4.MarkdownView.prototype.setEphemeralState = originalEphemeral;
    });
    this.registerView(VIEW, (leaf) => new MapView(leaf, this));
    this.registerView(QUEUE, (leaf) => new QueueView(leaf, this));
    if (this.settings.previousPluginId) {
      this.registerView(this.settings.previousPluginId + "-map", (leaf) => new MapView(leaf, this));
      this.registerView(this.settings.previousPluginId + "-queue", (leaf) => new QueueView(leaf, this));
    }
    this.registerHoverLinkSource("traceview-mindmap", { display: "TraceView Mindmap", defaultMod: true });
    this.addSettingTab(new SettingsTab(this));
    this.addRibbonIcon("git-fork", t("TraceView Mindmap: open map"), () => this.pickMap());
    this.addCommand({ id: "open-map", name: t("Open current note as a map"), callback: () => {
      const file = this.activeFile();
      if (file?.extension === "md") void this.openMap(file, this.app.workspace.getMostRecentLeaf() ?? void 0);
      else this.pickMap();
    } });
    this.addCommand({ id: "open-node-at-cursor", name: t("Open map at the Markdown cursor"), editorCheckCallback: (checking, editor, context) => {
      if (!(context instanceof import_obsidian4.MarkdownView) || !context.file) return false;
      const doc = parseMap(editor.getValue()), line = editor.getCursor().line;
      if (!doc.nodes.some((node) => node.line === line)) return false;
      if (!checking) void this.openAtCursor(context).catch((error) => new import_obsidian4.Notice(message(error), 8e3));
      return true;
    } });
    this.addCommand({ id: "find-map", name: t("Find a map"), callback: () => this.pickMap() });
    this.addCommand({ id: "new-map", name: t("Create a simple tree"), callback: () => this.createMap(false) });
    this.addCommand({ id: "new-vector", name: t("Create a vector (separate template)"), callback: () => this.createMap(true) });
    this.addCommand({ id: "open-queue", name: t("Steps, deadlines and QA"), callback: () => {
      void this.openQueue();
    } });
    const commands = [
      ["add-child", t("Add child node"), "add-child"],
      ["add-sibling", t("Add sibling node"), "add-sibling"],
      ["add-parent", t("Add parent node"), "add-parent"],
      ["copy-node-link", t("Copy link to node"), "copy-node-link"],
      ["edit-node", t("Edit node"), "edit"],
      ["make-step", t("Mark as atomic step"), "make-step"],
      ["make-dated", t("Add step deadline"), "make-dated"],
      ["make-question", t("Mark as QA"), "make-question"],
      ["toggle-task", t("Toggle step completion"), "toggle-task"],
      ["copy-branch", t("Copy branch"), "copy"],
      ["cut-branch", t("Cut branch"), "cut"],
      ["paste-branch", t("Paste as child branch"), "paste"],
      ["paste-after", t("Paste as sibling branch"), "paste-after"],
      ["undo", t("Undo map change"), "undo"],
      ["redo", t("Redo map change"), "redo"]
    ];
    for (const [id, name, action] of commands) this.addCommand({ id, name, checkCallback: (checking) => {
      const view = this.app.workspace.getActiveViewOfType(MapView);
      if (!view) return false;
      if (!checking) void view.action(action, view.surface?.getState().selected ?? null);
      return true;
    } });
    for (const definition of HOTKEY_DEFINITIONS.filter((definition2) => !commands.some(([, , action]) => action === definition2.id))) {
      this.addCommand({ id: `map-${definition.id}`, name: definition.label, checkCallback: (checking) => {
        const view = this.app.workspace.getActiveViewOfType(MapView);
        if (!view?.surface) return false;
        if (!checking) view.surface.runHotkey(definition.id);
        return true;
      } });
    }
    this.addCommand({ id: "insert-question-editor", name: t("Insert QA in Markdown editor"), editorCallback: (editor) => editor.replaceSelection("==//todo Q: ==") });
    this.addCommand({ id: "insert-step-editor", name: t("Insert unnumbered step in Markdown editor"), editorCallback: (editor) => editor.replaceSelection("[ ] #step ) ") });
    this.registerEvent(this.app.workspace.on("editor-menu", (menu, editor, context) => {
      if (context instanceof import_obsidian4.MarkdownView && context.file && parseMap(editor.getValue()).nodes.some((node) => node.line === editor.getCursor().line)) {
        menu.addItem((item) => item.setTitle(t("Open map at this node")).setIcon("git-fork").onClick(() => {
          void this.openAtCursor(context).catch((error) => new import_obsidian4.Notice(message(error), 8e3));
        }));
      }
    }));
    this.registerEvent(this.app.workspace.on("file-menu", (menu, file, _source, leaf) => {
      if (!(file instanceof import_obsidian4.TFile) || file.extension !== "md") return;
      const current = leaf ?? this.app.workspace.getMostRecentLeaf();
      if (current?.view instanceof MapView && current.view.path === file.path) {
        menu.addItem((item) => item.setTitle(t("Open source Markdown")).setIcon("file-code").onClick(() => {
          void this.source(file, 0, current);
        }));
      } else menu.addItem((item) => item.setTitle(t("Open in TraceView Mindmap")).setIcon("git-fork").onClick(() => {
        void this.openMap(file, current ?? void 0);
      }));
    }));
    this.registerEvent(this.app.vault.on("modify", (file) => {
      if (!(file instanceof import_obsidian4.TFile)) return;
      for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) {
        const view = leaf.view;
        if (view.path === file.path) view.scheduleReload();
      }
      if (this.isMap(file)) this.refreshQueues();
    }));
    this.registerEvent(this.app.vault.on("rename", (file, oldPath) => {
      this.sourcePreferences = new Set([...this.sourcePreferences].map((path) => path === oldPath || path.startsWith(oldPath + "/") ? file.path + path.slice(oldPath.length) : path));
      this.rememberSource();
      for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
        const explicit = this.sourceLeaves.get(leaf);
        if (explicit === oldPath || explicit?.startsWith(`${oldPath}/`)) this.sourceLeaves.set(leaf, file.path + explicit.slice(oldPath.length));
      }
      this.app.workspace.requestSaveLayout();
      this.refreshQueues();
    }));
    this.registerEvent(this.app.vault.on("delete", (file) => {
      this.sourcePreferences = new Set([...this.sourcePreferences].filter((path) => path !== file.path && !path.startsWith(file.path + "/")));
      this.rememberSource();
      for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) {
        const view = leaf.view;
        if (view.path === file.path) view.scheduleReload();
      }
      this.refreshQueues();
    }));
    this.registerEvent(this.app.vault.on("create", (file) => {
      if (file instanceof import_obsidian4.TFile && this.isMap(file)) this.refreshQueues();
    }));
    this.registerEvent(this.app.workspace.on("file-open", (file) => {
      const leaf = this.app.workspace.getMostRecentLeaf();
      if (leaf && file) this.scheduleAutoOpen(leaf, file.path);
    }));
    this.registerEvent(this.app.workspace.on("active-leaf-change", (leaf) => {
      if (leaf) this.scheduleAutoOpen(leaf);
    }));
    this.registerEvent(this.app.workspace.on("layout-change", () => {
      for (const leaf of this.app.workspace.getLeavesOfType("markdown")) this.scheduleAutoOpen(leaf);
    }));
  }
  rememberSource() {
    try {
      this.app.saveLocalStorage("traceview-mindmap:source-preferences", [...this.sourcePreferences]);
    } catch {
    }
  }
  scheduleAutoOpen(leaf, expectedPath) {
    if (this.opening.has(leaf)) return;
    const previous = this.autoTimers.get(leaf);
    if (previous !== void 0) window.clearTimeout(previous);
    this.autoTimers.set(leaf, window.setTimeout(() => {
      this.autoTimers.delete(leaf);
      const view = leaf.view;
      if (!(view instanceof import_obsidian4.MarkdownView) || !view.file || expectedPath && view.file.path !== expectedPath) return;
      if (this.sourceLeaves.get(leaf) !== view.file.path) this.sourceLeaves.delete(leaf);
      if (!this.settings.autoOpen || !this.isMap(view.file) || this.sourceLeaves.get(leaf) === view.file.path || this.sourcePreferences.has(view.file.path)) return;
      this.opening.add(leaf);
      const file = view.file;
      const linkState = this.nativeLinkTargets.get(view);
      this.nativeLinkTargets.delete(view);
      void (async () => {
        try {
          await view.save();
          if (leaf.view === view && view.file === file && this.settings.autoOpen && !this.sourcePreferences.has(file.path)) {
            await this.openMap(file, leaf);
            if (linkState?.path === file.path && linkState.subpath && leaf.view instanceof MapView) leaf.view.revealSubpath(linkState.subpath);
          }
        } catch (error) {
          new import_obsidian4.Notice(message(error), 8e3);
        } finally {
          this.opening.delete(leaf);
        }
      })();
    }, 0));
  }
  async openAtCursor(view) {
    const file = view.file;
    if (!file) return;
    const source = view.editor.getValue(), line = view.editor.getCursor().line;
    const node = parseMap(source).nodes.find((node2) => node2.line === line);
    if (!node) return;
    await view.save();
    if (view.file !== file || view.editor.getValue() !== source) throw new Error(t("The note changed. Open it again at the current line."));
    await this.openMap(file, view.leaf, node.id);
  }
  pickMap() {
    new MapPicker(this.app, (file) => this.isMap(file), (file) => {
      void this.openMap(file);
    }).open();
  }
  activeFile() {
    const view = this.app.workspace.getActiveViewOfType(MapView);
    if (view?.path) {
      const file = this.app.vault.getAbstractFileByPath(view.path);
      if (file instanceof import_obsidian4.TFile) return file;
    }
    return this.app.workspace.getActiveFile();
  }
  async openMap(file, target, nodeId) {
    const existing = this.app.workspace.getLeavesOfType(VIEW).find((leaf2) => leaf2.view.path === file.path);
    const leaf = target ?? existing ?? this.app.workspace.getLeaf("tab");
    if (leaf.view instanceof MapView && leaf.view.surface?.isEditing()) {
      new import_obsidian4.Notice(t("Save or cancel the node draft."));
      leaf.view.surface.focusEditor();
      return;
    }
    this.sourceLeaves.delete(leaf);
    this.sourcePreferences.delete(file.path);
    this.rememberSource();
    await leaf.setViewState({ type: VIEW, state: { file: file.path, openNow: true }, active: true });
    await this.app.workspace.revealLeaf(leaf);
    if (nodeId && leaf.view instanceof MapView) {
      await leaf.view.reload();
      leaf.view.surface?.reveal(nodeId);
    }
  }
  async openQueue() {
    const leaf = this.app.workspace.getLeavesOfType(QUEUE)[0] ?? this.app.workspace.getLeaf("tab");
    await leaf.setViewState({ type: QUEUE, active: true });
    await this.app.workspace.revealLeaf(leaf);
  }
  isMap(file) {
    return this.matchesMap(file.path, this.app.metadataCache.getFileCache(file)?.frontmatter);
  }
  async setMapRules(rules) {
    const matches = compileMapPatterns(rules);
    await this.saveData({ ...this.settings, ...rules });
    Object.assign(this.settings, rules);
    this.matchesMap = matches;
    this.refreshQueues();
  }
  async resetSettings() {
    const defaults = { ...DEFAULT_SETTINGS, hotkeys: {} };
    if (this.settings.previousPluginId) defaults.previousPluginId = this.settings.previousPluginId;
    await this.saveData(defaults);
    this.settings = defaults;
    this.matchesMap = compileMapPatterns(defaults);
    this.refreshBindings();
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) {
      const view = leaf.view;
      view.surface?.refreshLayout();
      view.refreshRestoreWait();
    }
    this.refreshQueues();
  }
  refreshQueues() {
    for (const leaf of this.app.workspace.getLeavesOfType(QUEUE)) leaf.view.scheduleReload();
  }
  refreshBindings() {
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) leaf.view.refreshBindings();
  }
  async setWidthMode(mode) {
    this.settings.widthMode = mode;
    for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) leaf.view.surface?.refreshLayout();
    await this.saveData(this.settings);
  }
  async source(file, line = 0, target) {
    const leaf = target ?? this.app.workspace.getLeaf(false);
    this.sourceLeaves.set(leaf, file.path);
    this.sourcePreferences.add(file.path);
    this.rememberSource();
    await leaf.setViewState({ type: "markdown", state: { file: file.path, mode: "source" }, active: true });
    await this.app.workspace.revealLeaf(leaf);
    if (leaf.view instanceof import_obsidian4.MarkdownView) {
      leaf.view.editor.setCursor({ line, ch: 0 });
      leaf.view.editor.scrollIntoView({ from: { line, ch: 0 }, to: { line, ch: 0 } }, true);
      leaf.view.editor.focus();
    }
  }
  async openMapLink(link, view, event) {
    if (view.surface?.isEditing()) {
      view.surface.focusEditor();
      return;
    }
    const parts = (0, import_obsidian4.parseLinktext)(link);
    const file = parts.path ? this.app.metadataCache.getFirstLinkpathDest(parts.path, view.path) : view.file;
    const newTab = event.ctrlKey || event.metaKey || event.button === 1;
    if (file && this.isMap(file)) {
      const leaf = newTab ? this.app.workspace.getLeaf("tab") : view.leaf;
      await this.openMap(file, leaf);
      if (leaf.view instanceof MapView) leaf.view.revealSubpath(parts.subpath);
    } else {
      if (file) {
        const leaf = newTab ? this.app.workspace.getLeaf("tab") : view.leaf;
        await leaf.setViewState({ type: "markdown", state: { file: file.path }, active: true });
        if (parts.subpath) leaf.setEphemeralState({ subpath: parts.subpath });
      } else await this.app.workspace.openLinkText(link, view.path, newTab ? "tab" : false, { active: true });
    }
  }
  createMap(vector) {
    new TextDialog(this.app, vector ? t("New vector name") : t("New tree name"), "", async (value) => {
      const name = value.trim().replace(/\.mindmap(?:\.md)?$/i, "");
      if (!name || /[\\/:*?"<>|\r\n]/.test(name) || name === "." || name === "..") throw new Error(t("Use a name without path characters."));
      const parent = this.activeFile()?.parent?.path ?? "";
      const path = (0, import_obsidian4.normalizePath)(`${parent}/${name}.mindmap.md`);
      if (this.app.vault.getAbstractFileByPath(path)) throw new Error(t("A file with this name already exists."));
      const body = vector ? `- ${name}
  - \u25B6\uFE0F ${t("Next action")}
    - [ ] #step ) ${t("First action")}
  - \u{1F525} ${t("Active now")}
  - \u{1F9CA} ${t("Frozen / someday")}
` : `- ${name}
  - [ ] #step 1) ${t("First step")}
`;
      const file = await this.app.vault.create(path, `---
mindmap: true
---

# /

${body}`);
      await this.openMap(file);
    }, "", false).open();
  }
  async write(file, expected, next) {
    if (expected === next) return;
    const previous = this.saveQueues.get(file.path) ?? Promise.resolve();
    const operation = previous.catch(() => void 0).then(async () => {
      for (const leaf of this.app.workspace.getLeavesOfType("markdown")) {
        const view = leaf.view;
        if (view instanceof import_obsidian4.MarkdownView && view.file?.path === file.path && view.editor.getValue() !== expected) throw new Error(t("The Markdown editor has newer text. Wait for it to save and try again."));
      }
      await this.app.vault.process(file, (current) => guardedChange(current, expected, next));
    });
    this.saveQueues.set(file.path, operation);
    try {
      await operation;
    } finally {
      if (this.saveQueues.get(file.path) === operation) this.saveQueues.delete(file.path);
    }
  }
  async copy(text) {
    this.clipboard = text;
    try {
      await navigator.clipboard.writeText(text);
      new import_obsidian4.Notice(t("Branch copied"));
    } catch {
      new import_obsidian4.Notice(t("Branch saved to the plugin clipboard"));
    }
  }
  async copyForCut(text) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      throw new Error(t("Clipboard unavailable. Branch was not cut. Allow clipboard access and try again."));
    }
    this.clipboard = text;
  }
  async paste() {
    try {
      const text = await navigator.clipboard.readText();
      if (text) return text;
    } catch {
    }
    if (this.clipboard) return this.clipboard;
    throw new Error(t("Clipboard unavailable. Use \u201CPaste branch text\u201D in the \u22EF menu."));
  }
};
var MapView = class extends import_obsidian4.EditableFileView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.path = "";
    this.hoverPopover = null;
    this.nativeWarning = false;
    this.history = new History();
    this.renderer = new import_obsidian4.Component();
    this.renderedNodes = /* @__PURE__ */ new Map();
    this.refreshTimer = 0;
    this.stateTimer = 0;
    this.revision = 0;
    this.closed = false;
    this.waitingForLayout = false;
    this.restoredRender = "allowed";
    this.changing = false;
    this.cutting = false;
    this.layoutMode = "map";
    this.scope = new import_obsidian4.Scope(this.app.scope);
    this.scope.register(null, null, (event) => {
      if (event.defaultPrevented) return;
      const target = event.target;
      if (target && this.contentEl.contains(target) && !target.closest("input, textarea, [contenteditable]") && resolveHotkey(event, this.plugin.settings.hotkeys) === "find") {
        event.preventDefault();
        event.stopPropagation();
        this.showSearch?.();
        return false;
      }
      if (target?.closest?.(".tvm-surface") && this.contentEl.contains(target) && this.surface?.handleKeydown(event)) return false;
    });
  }
  getViewType() {
    return VIEW;
  }
  // Native editor commands check this before calling our Editor adapter.
  getMode() {
    return this.editor ? "source" : "preview";
  }
  getDisplayText() {
    return this.path.split("/").pop()?.replace(/\.mindmap\.md$/, "") || "TraceView Mindmap";
  }
  getIcon() {
    return "git-fork";
  }
  canAcceptExtension(_extension) {
    return false;
  }
  getState() {
    return { file: this.path };
  }
  async setState(state, result) {
    if (state.file && this.path !== state.file) {
      if (this.surface?.isEditing()) {
        new import_obsidian4.Notice(t("Save or cancel the node draft before navigating."));
        this.surface.focusEditor();
        return;
      }
      this.restoredRender = import_obsidian4.Platform?.isWin && !state.openNow ? "inspect" : "allowed";
    }
    const activate = state.openNow && state.file === this.path && this.restoredRender !== "allowed";
    await super.setState(state, result);
    if (activate) await this.activateRestoredMap();
    this.refreshTitle();
  }
  async onLoadFile(file) {
    this.cancelRestoreWait?.();
    this.path = file.path;
    this.doc = void 0;
    this.history = new History();
    if (this.startupGate) this.startupGate.hidden = true;
    this.pendingState = this.readState();
    if (this.surface) await this.reload();
  }
  async onUnloadFile() {
    this.cancelRestoreWait?.();
    this.persist();
    this.doc = void 0;
    this.pendingSubpath = void 0;
    this.path = "";
    this.surface?.update(parseMap(""));
  }
  async activateRestoredMap() {
    if (this.closed || this.restoredRender === "allowed") return;
    this.cancelRestoreWait?.();
    this.restoredRender = "allowed";
    if (this.startupGate) this.startupGate.hidden = true;
    await this.reload();
  }
  refreshRestoreWait() {
    this.cancelRestoreWait?.();
    if (this.closed || this.restoredRender !== "paused") return;
    const automatic = this.plugin.settings.autoRestoreLargeMaps;
    this.startupMessage?.setText(automatic ? t("Waiting for Obsidian to be ready\u2026") : t("Wait for Obsidian to load, then open the map."));
    const win = this.startupGate?.ownerDocument?.defaultView;
    if (!automatic || !win) return;
    const workspace = this.app.workspace;
    let previous = win.performance.now(), quietSince = previous;
    let timer = 0, cancelled = false;
    const canOpen = () => workspace.layoutReady && workspace.getMostRecentLeaf() === this.leaf && !win.document.hidden && !!this.startupGate?.isConnected;
    const check = () => {
      if (cancelled || this.closed || this.restoredRender !== "paused") return;
      const now = win.performance.now();
      if (now - previous > 400 || !canOpen()) quietSince = now;
      previous = now;
      if (now - quietSince >= 8e3) {
        win.requestIdleCallback((deadline) => {
          if (cancelled) return;
          if (win.performance.now() - now <= 400 && deadline.timeRemaining() >= 8 && canOpen()) void this.activateRestoredMap();
          else timer = win.setTimeout(check, 250);
        }, { timeout: 250 });
      } else timer = win.setTimeout(check, 250);
    };
    this.cancelRestoreWait = () => {
      cancelled = true;
      win.clearTimeout(timer);
      this.cancelRestoreWait = void 0;
    };
    timer = win.setTimeout(check, 250);
  }
  async onRename(file) {
    if (file !== this.file) return;
    this.path = file.path;
    this.persist();
    await super.onRename(file);
    this.refreshTitle();
    this.surface?.invalidateMarkdown();
    await this.reload();
  }
  setEphemeralState(state) {
    super.setEphemeralState(state);
    if (typeof state?.subpath === "string") this.revealSubpath(state.subpath);
    else if (typeof state?.line === "number" && this.doc) {
      const node = this.doc.nodes.find((node2) => node2.line === state.line);
      if (node) this.surface?.reveal(node.id);
    }
  }
  getEphemeralState() {
    const id = this.surface?.getState().selected, node = id ? this.doc?.byId.get(id) : void 0;
    return node?.blockId ? { subpath: "#^" + node.blockId } : node ? { line: node.line } : {};
  }
  revealSubpath(subpath) {
    if (!subpath) return;
    if (!this.doc || !this.surface) {
      this.pendingSubpath = subpath;
      return;
    }
    this.pendingSubpath = void 0;
    const nodes = subpath.startsWith("#^") ? this.doc.nodes.filter((node) => node.blockId === subpath.slice(2)) : this.doc.nodes.filter((node) => node.kind === "heading" && node.text.toLocaleLowerCase() === subpath.slice(1).toLocaleLowerCase());
    if (nodes.length === 1) this.surface.reveal(nodes[0].id);
    else new import_obsidian4.Notice(nodes.length ? t("This address is duplicated. Fix the block ID in Markdown.") : t("The linked node was not found."));
  }
  async onOpen() {
    await super.onOpen();
    this.closed = false;
    this.contentEl.empty();
    this.contentEl.addClass("tvm-view", "tvm-map-view");
    this.addChild(this.renderer);
    const toolbar = this.contentEl.createDiv("tvm-toolbar");
    this.title = this.containerEl.querySelector(".view-header-title") ?? void 0;
    const actions = toolbar.createDiv("tvm-actions");
    this.undoButton = iconButton(actions, "undo-2", t("Undo"), () => {
      void this.action("undo", null);
    });
    this.redoButton = iconButton(actions, "redo-2", t("Redo"), () => {
      void this.action("redo", null);
    });
    this.undoButton.dataset.tvmAction = "undo";
    this.redoButton.dataset.tvmAction = "redo";
    const levels = iconButton(actions, "list-tree", t("Collapse levels"), () => this.levelMenu(levels));
    this.deleteButton = iconButton(actions, "trash-2", t("Delete selected branch"), () => {
      void this.action("delete", this.selected());
    });
    this.deleteButton.dataset.tvmAction = "delete";
    this.deleteButton.addClass("tvm-delete-node");
    iconButton(actions, "git-branch-plus", t("Child node"), () => {
      void this.action("add-child", this.selected());
    }).dataset.tvmAction = "add-child";
    iconButton(actions, "plus", t("Sibling node"), () => {
      void this.action("add-sibling", this.selected());
    }).dataset.tvmAction = "add-sibling";
    iconButton(actions, "pencil", t("Edit"), () => {
      void this.action("edit", this.selected());
    }).dataset.tvmAction = "edit";
    const selectionButton = iconButton(actions, "scan", t("Multiple selection: taps or rectangle"), () => this.surface?.toggleSelectionMode());
    selectionButton.setAttribute("aria-pressed", "false");
    iconButton(actions, "search", t("Search"), () => this.showSearch?.()).dataset.tvmAction = "find";
    iconButton(actions, "maximize", t("Fit map"), () => this.surface?.fit()).dataset.tvmAction = "fit";
    const layout = iconButton(actions, "panels-top-left", t("Layout and node width"), () => this.layoutMenu(layout));
    const more = iconButton(toolbar, "ellipsis", t("Map actions"), () => this.menu(more));
    this.host = this.contentEl.createDiv("tvm-map-host");
    const search = new MapSearch(this.host, {
      search: (text, alpha) => this.surface?.search(text, alpha) ?? [],
      reveal: (id) => this.surface?.reveal(id),
      focusMap: () => this.host?.querySelector(".tvm-surface")?.focus({ preventScroll: true })
    });
    this.showSearch = () => search.show();
    this.surface = new MapSurface(this.host, {
      getWidthMode: () => this.plugin.settings.widthMode,
      useTransformPan: () => import_obsidian4.Platform.isMobile,
      getHotkeys: () => this.plugin.settings.hotkeys,
      getCollapseOnLeft: () => this.plugin.settings.collapseOnLeft,
      onFind: () => this.showSearch?.(),
      getRenderKey: () => this.path,
      releaseMarkdown: (element) => {
        const component = this.renderedNodes.get(element);
        if (component) {
          this.renderer.removeChild(component);
          this.renderedNodes.delete(element);
        }
      },
      onAction: (action, id) => {
        void this.action(action, id);
      },
      onMoveBranches: (ids, target, position) => {
        void this.reparent(ids, target, position);
      },
      onState: () => {
        const count = this.surface?.getSelection().length ?? 0;
        selectionButton.setAttribute("aria-pressed", String(this.surface?.isSelectionMode() ?? false));
        selectionButton.setAttribute("aria-label", t("Selected nodes: {count}", { count }));
        selectionButton.dataset.count = count > 1 ? String(count) : "";
        this.refreshDeleteButton();
        window.clearTimeout(this.stateTimer);
        this.stateTimer = window.setTimeout(() => this.persist(), 180);
      },
      renderMarkdown: async (text, element) => {
        const component = this.renderer.addChild(new import_obsidian4.Component());
        this.renderedNodes.set(element, component);
        await import_obsidian4.MarkdownRenderer.render(this.app, text, element, this.path, component);
      },
      onOpenLink: (link, event) => {
        void this.plugin.openMapLink(link, this, event).catch((error) => new import_obsidian4.Notice(message(error)));
      },
      onHoverLink: (event, targetEl, linktext) => this.app.workspace.trigger("hover-link", { event, source: "traceview-mindmap", hoverParent: this, targetEl, linktext, sourcePath: this.path })
    });
    this.status = this.host.createDiv("tvm-status tvm-map-status");
    this.startupGate = this.host.createDiv("tvm-startup-gate");
    this.startupGate.hidden = true;
    this.startupMessage = this.startupGate.createDiv({ attr: { role: "status" } });
    button(this.startupGate, t("Open now"), () => {
      void this.activateRestoredMap();
    });
    this.refreshBindings();
    this.refreshHistory();
    await this.reload();
  }
  refreshTitle() {
    this.title?.setText(this.getDisplayText());
  }
  showMenu(menu, anchor2) {
    const rect = anchor2.getBoundingClientRect();
    menu.showAtPosition({ x: rect.left, y: rect.bottom });
  }
  layoutMenu(anchor2) {
    const menu = new import_obsidian4.Menu();
    for (const [mode, label2] of [["map", t("Map")], ["outline", t("Outline")], ["table", t("Table")]]) {
      menu.addItem((item) => item.setTitle(label2).setChecked(this.layoutMode === mode).onClick(() => {
        this.layoutMode = mode;
        this.surface?.setLayout(mode);
        this.persist();
      }));
    }
    menu.addSeparator();
    for (const [mode, label2] of widthModes()) menu.addItem((item) => item.setTitle(label2).setChecked(this.plugin.settings.widthMode === mode).onClick(() => {
      void this.plugin.setWidthMode(mode).catch((error) => new import_obsidian4.Notice(message(error)));
    }));
    this.showMenu(menu, anchor2);
  }
  levelMenu(anchor2) {
    const menu = new import_obsidian4.Menu();
    const id = this.selected();
    menu.addItem((item) => item.setTitle(this.commandLabel(t("Collapse all roots"), "collapse-all")).onClick(() => this.surface?.runHotkey("collapse-all")));
    menu.addItem((item) => item.setTitle(t("Expand entire map")).onClick(() => this.surface?.setDepth(Infinity)));
    menu.addSeparator();
    for (const depth of [0, 1, 2, 3, 4, 5, Infinity]) {
      const label2 = depth === 0 ? t("Selected node only") : depth === Infinity ? t("All child levels") : t("Child levels: {count}", { count: depth });
      const action = depth === Infinity ? "depth-all" : "depth-" + depth;
      menu.addItem((item) => item.setTitle(this.commandLabel(label2, action)).setDisabled(!id).onClick(() => {
        if (id) this.surface?.runHotkey(action);
      }));
    }
    this.showMenu(menu, anchor2);
  }
  commandLabel(label2, action) {
    const shortcut = displayBinding(this.plugin.settings.hotkeys[action] ?? DEFAULT_HOTKEYS[action] ?? "");
    return label2 + (shortcut ? " (" + shortcut + ")" : "");
  }
  refreshBindings() {
    for (const element of this.contentEl.querySelectorAll("[data-tvm-action]")) {
      const id = element.dataset.tvmAction;
      const label2 = HOTKEY_DEFINITIONS.find((definition) => definition.id === id)?.label ?? id;
      const shortcut = displayBinding(this.plugin.settings.hotkeys[id] ?? DEFAULT_HOTKEYS[id] ?? "");
      const title = label2 + (shortcut ? ` (${shortcut})` : "");
      element.title = title;
      element.setAttribute("aria-label", title);
    }
  }
  refreshDeleteButton() {
    if (this.deleteButton) this.deleteButton.disabled = !this.surface?.getSelection().length || this.surface.isEditing() || this.changing || this.cutting;
  }
  refreshHistory() {
    this.refreshDeleteButton();
    if (this.undoButton) this.undoButton.disabled = !this.doc || !this.history.can("undo", this.doc.source);
    if (this.redoButton) this.redoButton.disabled = !this.doc || !this.history.can("redo", this.doc.source);
  }
  selected() {
    return this.surface?.getState().selected ?? null;
  }
  stateKey() {
    return `traceview-mindmap:v1:${this.path}`;
  }
  readState() {
    try {
      const current = this.app.loadLocalStorage(this.stateKey());
      if (typeof current === "string") return current;
      const previous = this.plugin.settings.previousPluginId;
      const imported = previous ? this.app.loadLocalStorage(previous + ":v1:" + this.path) : void 0;
      return typeof imported === "string" ? imported : void 0;
    } catch {
      return void 0;
    }
  }
  persist() {
    if (!this.path || !this.surface || !this.doc) return;
    try {
      this.app.saveLocalStorage(this.stateKey(), JSON.stringify({ ...JSON.parse(serializeViewState(this.doc, this.surface.getState())), layout: this.layoutMode }));
    } catch {
    }
  }
  scheduleReload() {
    window.clearTimeout(this.refreshTimer);
    this.refreshTimer = window.setTimeout(() => {
      void this.reload();
    }, 120);
  }
  async reload() {
    const revision = ++this.revision;
    if (this.closed || !this.path || !this.surface) return;
    if (this.restoredRender === "paused") return;
    this.refreshTitle();
    const workspace = this.app.workspace;
    if (!this.doc && workspace.layoutReady === false) {
      this.status?.setText(t("The map will open after the workspace loads\u2026"));
      if (!this.waitingForLayout) {
        this.waitingForLayout = true;
        workspace.onLayoutReady(() => {
          this.waitingForLayout = false;
          void this.reload();
        });
      }
      return;
    }
    const file = this.app.vault.getAbstractFileByPath(this.path);
    if (!(file instanceof import_obsidian4.TFile)) {
      this.status?.setText(t("File missing or deleted. Open another map."));
      this.doc = void 0;
      this.surface.update(parseMap(""));
      return;
    }
    try {
      const source = await this.app.vault.read(file);
      if (revision !== this.revision || this.closed) return;
      if (/^---\r?\n[\s\S]*?^mindmap-plugin:\s*['"]?rich['"]?\s*$/m.test(source.split(/^---\s*$/m).slice(0, 2).join("---"))) {
        this.doc = void 0;
        this.surface.update(parseMap(""));
        this.status?.setText(t("This JSON map format is not supported."));
        return;
      }
      if (this.doc?.source === source) return;
      const first = !this.doc;
      const before = this.doc;
      const next = parseMap(source, this.doc);
      const saved = this.pendingState ?? (first ? this.readState() : before && onlyAddedBlockIds(before, next) ? serializeViewState(before, this.surface.getState()) : void 0);
      const state = saved ? restoreViewState(next, saved) : void 0;
      if (this.restoredRender === "inspect" && hasLargeVisibleTree(next, state)) {
        this.restoredRender = "paused";
        if (this.startupGate) this.startupGate.hidden = false;
        this.refreshRestoreWait();
        return;
      }
      this.restoredRender = "allowed";
      this.doc = next;
      if (saved) {
        try {
          const mode = JSON.parse(saved).layout;
          if (["map", "outline", "table"].includes(mode)) this.layoutMode = mode;
        } catch {
        }
      }
      this.surface.setLayout(this.layoutMode);
      this.surface.update(next, state);
      this.pendingState = void 0;
      if (this.pendingSubpath) this.revealSubpath(this.pendingSubpath);
      this.persist();
      this.refreshTitle();
      const steps = getSteps(next);
      this.status?.setText(t("Nodes: {nodes} \xB7 Open steps: {steps}", { nodes: next.nodes.length, steps: steps.filter((step) => !step.completed).length }));
      this.refreshHistory();
    } catch (error) {
      this.status?.setText(message(error));
    }
  }
  async apply(expected, next, history = "record") {
    if (this.doc !== expected || this.closed || this.changing) throw new Error(t("The map changed or is being saved. Your draft is still in the field. Copy it before cancelling and retry on the current map."));
    const path = this.path;
    const file = this.app.vault.getAbstractFileByPath(this.path);
    if (!(file instanceof import_obsidian4.TFile)) throw new Error(t("The file no longer exists."));
    this.changing = true;
    this.refreshDeleteButton();
    try {
      await this.plugin.write(file, expected.source, next);
      if (this.closed || this.path !== path) return;
      if (history === "record") this.history.push(expected.source, next);
      else this.history.commit(history);
      await this.reload();
      this.refreshHistory();
    } catch (error) {
      await this.reload();
      throw error;
    } finally {
      this.changing = false;
      this.refreshDeleteButton();
    }
  }
  async reparent(ids, target, position) {
    const doc = this.doc;
    if (!doc || this.changing || this.cutting || this.surface?.isEditing()) return;
    try {
      await this.apply(doc, moveBranches(doc, ids, target, position));
      this.surface?.revealSelection(ids);
    } catch (error) {
      new import_obsidian4.Notice(message(error), 8e3);
    }
  }
  async action(action, id) {
    const doc = this.doc;
    const path = this.path;
    if (!doc) return;
    if (this.changing || this.cutting) return;
    if (this.surface?.isEditing()) {
      this.surface.focusEditor();
      return;
    }
    try {
      if (action === "undo" || action === "redo") {
        const next2 = this.history.peek(action, doc.source);
        if (next2 !== null) await this.apply(doc, next2, action);
        return;
      }
      if (!id) {
        new import_obsidian4.Notice(t("Select a map node first"));
        return;
      }
      const node = doc.byId.get(id);
      if (!node) return;
      const selection = this.surface?.getSelection() ?? [];
      const ids = selection.includes(id) ? selection : [id];
      if (ids.length > 1) {
        if (action === "copy") {
          await this.plugin.copy(copyBranches(doc, ids));
          return;
        }
        if (action === "delete" || action === "cut") {
          const next2 = deleteNodes(doc, ids);
          if (action === "cut") {
            this.cutting = true;
            try {
              await this.plugin.copyForCut(copyBranches(doc, ids));
              if (this.path !== path) throw new Error(t("Another map is open. The selection was copied, but not cut."));
              await this.apply(doc, next2);
            } finally {
              this.cutting = false;
            }
          } else await this.apply(doc, next2);
          return;
        }
        if (action === "make-dated") {
          new DateDialog(this.app, "?", async (value) => this.apply(doc, changeNodes(doc, ids, (current, target) => setDated(current, target, value)))).open();
          return;
        }
        const change = action === "toggle-task" ? toggleTask : action === "make-step" ? setStep : action === "make-question" ? setQuestion : null;
        if (change) {
          await this.apply(doc, changeNodes(doc, ids, change));
          return;
        }
        if (action !== "source") {
          new import_obsidian4.Notice(t("This command requires one selected node."));
          return;
        }
      }
      if (action === "copy-node-link") {
        const random = globalThis.crypto?.randomUUID?.().replace(/-/g, "") ?? Date.now().toString(36) + Math.random().toString(36).slice(2);
        const address = addressNode(doc, id, "tvm-" + random.slice(0, 16));
        if (address.source !== doc.source) await this.apply(doc, address.source);
        const file = this.file;
        if (!file || this.path !== path) throw new Error(t("The map was closed or renamed. Copy the address again."));
        await this.plugin.copy("[[" + this.app.metadataCache.fileToLinktext(file, "", true) + "#^" + address.blockId + "]]");
        new import_obsidian4.Notice(t("Node link copied."));
        return;
      }
      if (action === "source") {
        const file = this.app.vault.getAbstractFileByPath(this.path);
        if (file instanceof import_obsidian4.TFile) await this.plugin.source(file, node.line, this.leaf);
        return;
      }
      if (action === "copy") {
        await this.plugin.copy(copyBranch(doc, id));
        return;
      }
      if (action === "cut") {
        const next2 = deleteNode(doc, id);
        this.cutting = true;
        try {
          await this.plugin.copyForCut(copyBranch(doc, id));
          if (this.path !== path) throw new Error(t("Another map is open. The branch was copied, but not cut."));
          await this.apply(doc, next2);
          new import_obsidian4.Notice(t("Branch cut. Ctrl+V to paste, Undo to restore."));
        } finally {
          this.cutting = false;
        }
        return;
      }
      if (action === "paste" || action === "paste-after") {
        await this.apply(doc, pasteBranch(doc, id, await this.plugin.paste(), action === "paste" ? "child" : "after"));
        if (this.path === path) {
          const created = this.doc?.nodes.find((candidate) => !doc.byId.has(candidate.id));
          if (created) this.surface?.reveal(created.id);
        }
        return;
      }
      if (action === "edit" || action === "add-child" || action === "add-sibling" || action === "add-sibling-before" || action === "add-parent") {
        if (this.plugin.settings.nodeEditor === "native") {
          try {
            this.nativeConstructor = await prepareNativeEditor(this.app);
          } catch (error) {
            this.nativeConstructor = void 0;
            console.warn("TraceView Mindmap: preparing native editor failed", error);
          }
          if (this.path !== path || this.doc !== doc || this.surface?.isEditing()) return;
        }
        const transformOn = (base, selected, text) => action === "edit" ? editNode(base, selected, text) : action === "add-parent" ? addParent(base, selected, text) : addNode(base, selected, action === "add-child" ? "child" : action === "add-sibling-before" ? "before" : "sibling", text);
        const transform = (text) => transformOn(doc, id, text);
        const placeholder = `tvm-draft-${Date.now()}-${Math.random().toString(36).slice(2)}`;
        const draft = action === "edit" ? doc : parseMap(transform(placeholder), doc);
        const draftId = action === "edit" ? id : draft.nodes.find((candidate) => candidate.text === placeholder).id;
        this.surface?.beginEdit(draftId, action === "edit" ? node.text : "", async (text) => {
          if (this.path !== path) throw new Error(t("The note was renamed. Copy the draft and reopen the editor."));
          await this.reload();
          const base = this.doc;
          if (!base || base !== doc && !onlyAddedBlockIds(doc, base)) throw new Error(t("The map changed externally. Your draft is preserved. Copy it before editing again."));
          const selected = base.nodes.find((candidate) => candidate.line === node.line)?.id;
          if (!selected) throw new Error(t("The node no longer exists. Your draft is preserved."));
          await this.apply(base, transformOn(base, selected, text));
          return action === "edit" ? selected : action === "add-parent" ? this.doc?.nodes.find((candidate) => candidate.line === node.line)?.id : this.doc?.nodes.find((candidate) => !base.byId.has(candidate.id))?.id;
        }, (input, tools, inline) => this.mountEditor(input, tools, path, inline), draft);
        return;
      }
      if (action === "delete") {
        await this.apply(doc, deleteNode(doc, id));
        return;
      }
      if (action === "make-dated") {
        new DateDialog(this.app, getSteps(doc).find((step) => step.nodeId === id)?.date ?? "?", async (value) => this.apply(doc, setDated(doc, id, value))).open();
        return;
      }
      const next = action === "toggle-task" ? toggleTask(doc, id) : action === "make-step" ? setStep(doc, id) : action === "make-question" ? setQuestion(doc, id) : moveNode(doc, id, action === "move-up" ? "up" : action === "move-down" ? "down" : action === "indent" ? "indent" : "outdent");
      await this.apply(doc, next);
    } catch (error) {
      new import_obsidian4.Notice(message(error), 8e3);
    }
  }
  menu(anchor2) {
    const menu = new import_obsidian4.Menu();
    menu.addItem((item) => item.setTitle(t("Find a map\u2026")).setIcon("git-fork").onClick(() => this.plugin.pickMap()));
    menu.addItem((item) => item.setTitle(t("Steps \xB7 Deadlines \xB7 QA")).setIcon("list-checks").onClick(() => {
      void this.plugin.openQueue();
    }));
    menu.addSeparator();
    const actions = [[t("Mark as atomic step"), "make-step"], [t("Step deadline\u2026"), "make-dated"], [t("Mark as QA"), "make-question"], [t("Completed / incomplete"), "toggle-task"], [t("Copy link to node"), "copy-node-link"], [t("Copy branch"), "copy"], [t("Cut branch"), "cut"], [t("Paste as child branch"), "paste"], [t("Paste as sibling branch"), "paste-after"], [t("Add parent node"), "add-parent"], [t("Move up"), "move-up"], [t("Move down"), "move-down"], [t("Nest in previous branch"), "indent"], [t("Move up one level"), "outdent"], [t("Open text in editor"), "source"], [t("Delete branch\u2026"), "delete"]];
    for (const [label2, action] of actions) menu.addItem((item) => item.setTitle(this.commandLabel(label2, action)).onClick(() => {
      void this.action(action, this.selected());
    }));
    menu.addSeparator();
    menu.addItem((item) => item.setTitle(t("Export HTML\u2026")).onClick(() => this.export("html")));
    menu.addItem((item) => item.setTitle(t("Export SVG\u2026")).onClick(() => this.export("svg")));
    menu.addItem((item) => item.setTitle(t("Paste branch text\u2026")).onClick(() => {
      const doc = this.doc, id = this.selected();
      if (doc && id) new TextDialog(this.app, t("Paste child Markdown branch"), "", async (text) => this.apply(doc, pasteBranch(doc, id, text, "child")), this.path, false).open();
    }));
    menu.addItem((item) => item.setTitle(t("Renumber steps")).onClick(() => {
      if (this.doc) void this.apply(this.doc, renumberSteps(this.doc)).catch((error) => new import_obsidian4.Notice(message(error)));
    }));
    const rect = anchor2.getBoundingClientRect();
    menu.showAtPosition({ x: rect.left, y: rect.bottom });
  }
  async nativeAddress(file, line, expected) {
    if (!this.plugin.isMap(file)) return void 0;
    const target = this.app.workspace.getLeavesOfType(VIEW).map((leaf) => leaf.view).find((view) => view.path === file.path);
    if (target) await target.reload();
    const source = await this.app.vault.read(file);
    if (source !== expected) throw new Error(t("The target map changed. Reopen link suggestions. Your draft is preserved."));
    const doc = target?.doc?.source === source ? target.doc : parseMap(source);
    const node = doc.nodes.find((node2) => node2.line === line);
    if (!node || node.kind === "root") throw new Error(t("This block is not a separate map node. Use \u201CCopy link to node\u201D."));
    const random = globalThis.crypto?.randomUUID?.().replace(/-/g, "") ?? Date.now().toString(36) + Math.random().toString(36).slice(2);
    const address = addressNode(doc, node.id, "tvm-" + random.slice(0, 16));
    if (address.source !== source) {
      if (target) await target.apply(doc, address.source);
      else await this.plugin.write(file, source, address.source);
    }
    return address.blockId;
  }
  mountEditor(input, tools, path, inline) {
    if (this.plugin.settings.nodeEditor === "native") {
      try {
        return mountNativeEditor(this, input, tools, inline, this.nativeConstructor, (file, line, expected) => this.nativeAddress(file, line, expected));
      } catch (error) {
        if (!this.nativeWarning) {
          console.warn("TraceView Mindmap: native editor unavailable", error);
          new import_obsidian4.Notice(t("Native editor unavailable. Using text input. ") + message(error), 8e3);
          this.nativeWarning = true;
        }
      }
    }
    const detachTools = attachNodeTools(this.app, path, input, tools);
    const upload = tools.ownerDocument.createElement("div");
    upload.className = "tvm-inline-upload";
    upload.setAttribute("role", "status");
    tools.after(upload);
    const detachPaste = attachImagePaste(input, {
      save: (image) => saveClipboardImage(this.app, path, image),
      status: (text) => {
        upload.textContent = text;
        this.surface?.refreshLayout();
      },
      report: (text) => {
        new import_obsidian4.Notice(text, 8e3);
      }
    });
    const editor = new InputEditor(input);
    this.editor = editor;
    const updateToolbar = () => {
      this.app.mobileToolbar?.update?.();
    };
    let scoped = false;
    const scope = new import_obsidian4.Scope(this.app.scope);
    for (const key of ["Enter", "Escape"]) scope.register([], key, (event) => {
      if (inline.handleKeydown(event)) return false;
    });
    const activate = () => {
      this.app.workspace.activeEditor = this;
      if (!scoped) {
        this.app.keymap?.pushScope(scope);
        scoped = true;
      }
      updateToolbar();
    };
    const deactivate = () => {
      if (scoped) {
        this.app.keymap?.popScope(scope);
        scoped = false;
      }
      updateToolbar();
    };
    input.addEventListener("focus", activate);
    activate();
    input.addEventListener("blur", deactivate);
    const keys = (event) => {
      if (event.defaultPrevented || !(event.ctrlKey || event.metaKey)) return;
      if (event.code === "KeyZ" || event.code === "KeyY") {
        event.preventDefault();
        event.stopPropagation();
        if (event.shiftKey || event.code === "KeyY") editor.redo();
        else editor.undo();
      }
    };
    input.addEventListener("keydown", keys);
    return () => {
      detachPaste();
      detachTools();
      editor.dispose();
      deactivate();
      input.removeEventListener("focus", activate);
      input.removeEventListener("keydown", keys);
      input.removeEventListener("blur", deactivate);
      if (this.editor === editor) this.editor = void 0;
      if (this.app.workspace.activeEditor === this) this.app.workspace.activeEditor = null;
      updateToolbar();
    };
  }
  export(format) {
    const doc = this.doc;
    if (!doc) return;
    const suggested = this.getDisplayText().replace(/[\\/:*?"<>|]/g, "-");
    new TextDialog(this.app, t("Export {format} \u2014 file name", { format: format.toUpperCase() }), suggested, async (name) => {
      const clean = name.trim().replace(new RegExp(`\\.${format}$`, "i"), "");
      if (!clean || /[\\/:*?"<>|\r\n]/.test(clean) || clean === "." || clean === "..") throw new Error(t("Use a name without path characters."));
      const source = this.app.vault.getAbstractFileByPath(this.path);
      if (!(source instanceof import_obsidian4.TFile)) throw new Error(t("The note does not exist."));
      const target = (0, import_obsidian4.normalizePath)(`${source.parent?.path ?? ""}/${clean}.${format}`);
      if (this.app.vault.getAbstractFileByPath(target)) throw new Error(t("File already exists. Choose another name."));
      await this.app.vault.create(target, format === "html" ? exportHtml(doc, clean) : exportSvg(doc, clean));
      new import_obsidian4.Notice(t("Saved {path}", { path: target }));
    }, this.path, "single-line").open();
  }
  async onClose() {
    this.cancelRestoreWait?.();
    this.persist();
    this.closed = true;
    this.revision++;
    window.clearTimeout(this.refreshTimer);
    window.clearTimeout(this.stateTimer);
    this.surface?.destroy();
    this.renderer.unload();
    this.contentEl.empty();
  }
};
var QueueView = class extends import_obsidian4.ItemView {
  constructor(leaf, plugin) {
    super(leaf);
    this.plugin = plugin;
    this.cache = /* @__PURE__ */ new Map();
    this.mode = "steps";
    this.collapsed = /* @__PURE__ */ new Set();
    this.filter = "";
    this.query = "";
    this.timer = 0;
    this.generation = 0;
    this.closed = false;
  }
  getViewType() {
    return QUEUE;
  }
  getDisplayText() {
    return t("Steps \xB7 Deadlines \xB7 QA");
  }
  getIcon() {
    return "list-checks";
  }
  async onOpen() {
    this.closed = false;
    this.contentEl.empty();
    this.contentEl.addClass("tvm-view", "tvm-queue-view");
    const toolbar = this.contentEl.createDiv("tvm-toolbar");
    for (const [value, label2] of [["steps", t("Steps")], ["dates", t("Deadlines")], ["qa", t("Open QA")]]) button(toolbar, label2, () => {
      this.mode = value;
      this.draw();
    });
    button(toolbar, t("Refresh"), () => {
      this.cache.clear();
      void this.reload();
    });
    attachMapFilter(toolbar, () => this.app.vault.getMarkdownFiles().filter((file) => this.plugin.isMap(file)), (path) => {
      this.filter = path;
      this.draw();
    });
    this.foldControls = toolbar.createDiv("tvm-queue-fold-controls");
    button(this.foldControls, t("Collapse all"), () => {
      for (const path of this.cache.keys()) if (!this.filter || path === this.filter) this.collapsed.add(path);
      this.draw();
    });
    button(this.foldControls, t("Expand all"), () => {
      for (const path of this.cache.keys()) if (!this.filter || path === this.filter) this.collapsed.delete(path);
      this.draw();
    });
    const search = toolbar.createEl("input", { type: "search", attr: { "aria-label": t("Search steps"), placeholder: t("Find\u2026") } });
    search.oninput = () => {
      this.query = search.value.toLocaleLowerCase();
      this.draw();
    };
    this.contentEl.createEl("p", { cls: "tvm-status", text: t("Reordering changes only step numbers within one file. Branches stay in place. Dated and unnumbered steps have separate ordering.") });
    this.host = this.contentEl.createDiv("tvm-panel");
    await this.reload();
  }
  scheduleReload() {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => {
      void this.reload();
    }, 250);
  }
  async reload() {
    const generation = ++this.generation;
    const files = this.app.vault.getMarkdownFiles().filter((file) => this.plugin.isMap(file));
    const paths = new Set(files.map((file) => file.path));
    for (const path of this.cache.keys()) if (!paths.has(path)) this.cache.delete(path);
    for (let offset = 0; offset < files.length; offset += 8) {
      if (this.closed || generation !== this.generation) return;
      await Promise.all(files.slice(offset, offset + 8).map(async (file) => {
        const cached = this.cache.get(file.path);
        if (cached && cached.mtime === file.stat.mtime) return;
        try {
          const mtime = file.stat.mtime;
          const source = await this.app.vault.read(file);
          if (!this.closed && generation === this.generation) {
            this.cache.set(file.path, { file, doc: parseMap(source, cached?.doc), mtime });
            if (mtime !== file.stat.mtime) this.scheduleReload();
          }
        } catch {
          this.cache.delete(file.path);
        }
      }));
      await new Promise((resolve) => window.setTimeout(resolve, 0));
    }
    if (!this.closed && generation === this.generation) this.draw();
  }
  draw() {
    if (!this.host) return;
    this.host.empty();
    if (this.foldControls) this.foldControls.hidden = this.mode === "dates";
    let count = 0;
    const maps = [...this.cache.values()].filter((map) => !this.filter || map.file.path === this.filter).sort((a, b) => a.file.path.localeCompare(b.file.path));
    if (this.mode === "dates") {
      const rows = maps.flatMap((map) => getSteps(map.doc).filter((step) => !step.completed && (step.date || step.unknownDate) && (!this.plugin.settings.hideFrozen || !step.frozen)).map((step) => ({ map, step })));
      rows.sort((a, b) => (a.step.unknownDate ? "" : a.step.date).localeCompare(b.step.unknownDate ? "" : b.step.date));
      for (const { map, step } of rows) if (!this.query || step.text.toLocaleLowerCase().includes(this.query)) {
        this.stepRow(this.host, map, step, false);
        count++;
      }
    } else for (const map of maps) {
      const steps = getSteps(map.doc).filter((step) => !step.completed && (!this.plugin.settings.hideFrozen || !step.frozen) && (!this.query || step.text.toLocaleLowerCase().includes(this.query)));
      const questions = map.doc.nodes.filter((node) => /\[\[QA ❓(?:\||\]\])|\/\/todo\s+Q\s*:/i.test(node.text) && !node.text.includes("\u2705") && (!this.query || node.text.toLocaleLowerCase().includes(this.query)));
      if (!(this.mode === "qa" ? questions.length : steps.length)) continue;
      const section = this.host.createDiv("tvm-queue-group");
      const header = section.createDiv("tvm-queue-heading");
      const collapsed = this.collapsed.has(map.file.path);
      const toggle = button(header, collapsed ? "\u25B8" : "\u25BE", () => {
        if (this.collapsed.has(map.file.path)) this.collapsed.delete(map.file.path);
        else this.collapsed.add(map.file.path);
        this.draw();
        Array.from(this.host.querySelectorAll("[data-fold-path]")).find((element) => element.dataset.foldPath === map.file.path)?.focus();
      }, t(collapsed ? "Expand map: {name}" : "Collapse map: {name}", { name: map.file.basename }));
      toggle.classList.add("tvm-queue-fold");
      toggle.dataset.foldPath = map.file.path;
      toggle.setAttribute("aria-expanded", String(!collapsed));
      button(header, map.file.basename, () => {
        void this.plugin.openMap(map.file);
      }).addClass("tvm-queue-title");
      header.createSpan({ cls: "tvm-badge", text: String(this.mode === "qa" ? questions.length : steps.length) });
      if (collapsed) {
        count += this.mode === "qa" ? questions.length : steps.length;
        continue;
      }
      if (this.mode === "qa") for (const node of questions) {
        const row = section.createDiv("tvm-step-row");
        button(row, this.label(node.text), () => {
          void this.plugin.openMap(map.file, void 0, node.id);
        }).addClass("tvm-step-text");
        count++;
      }
      else {
        steps.sort(compareSteps);
        for (const step of steps) {
          this.stepRow(section, map, step, step.number !== null && !step.date && !step.unknownDate);
          count++;
        }
      }
    }
    if (!count) this.host.createDiv({ cls: "tvm-empty", text: t("No open items match this filter.") });
  }
  label(text) {
    return queueLabel(text, this.plugin.settings.queueTaskMarker, this.plugin.settings.queueStepTag);
  }
  stepRow(parent, map, step, reorder) {
    const row = parent.createDiv("tvm-step-row");
    const checkbox = row.createEl("input", { type: "checkbox", attr: { "aria-label": t("Mark completed") } });
    checkbox.onchange = () => {
      void this.change(map, toggleTask(map.doc, step.nodeId));
    };
    if (reorder) {
      const controls = row.createDiv("tvm-step-controls");
      button(controls, "\u2191", () => {
        void this.reorder(map, step.nodeId, -1);
      }, t("Move earlier in execution order"));
      button(controls, "\u2193", () => {
        void this.reorder(map, step.nodeId, 1);
      }, t("Move later in execution order"));
      row.draggable = true;
      row.ondragstart = (event) => {
        this.dragged = { path: map.file.path, id: step.nodeId };
        event.dataTransfer?.setData("text/plain", step.nodeId);
      };
      row.ondragend = () => {
        this.dragged = void 0;
      };
      row.ondragover = (event) => {
        if (this.dragged?.path === map.file.path) event.preventDefault();
      };
      row.ondrop = (event) => {
        event.preventDefault();
        if (this.dragged?.path === map.file.path) void this.reorder(map, this.dragged.id, step.nodeId);
        this.dragged = void 0;
      };
    }
    const content = row.createDiv("tvm-step-content");
    if (this.mode === "dates") {
      const metadata = content.createDiv("tvm-step-meta");
      metadata.createSpan({ cls: "tvm-badge", text: step.unknownDate ? t("Deadline ?") : step.date });
      metadata.createSpan({ cls: "tvm-badge tvm-step-map", text: map.file.basename });
    }
    button(content, this.label(step.text), () => {
      void this.plugin.openMap(map.file, void 0, step.nodeId);
    }).addClass("tvm-step-text");
  }
  async reorder(map, id, target) {
    const numbered = getSteps(map.doc).filter((step) => step.number !== null && !step.date && !step.unknownDate).sort(compareSteps);
    const ids = numbered.map((step) => step.nodeId), from = ids.indexOf(id);
    if (from < 0) return;
    let to;
    if (typeof target === "string") to = ids.indexOf(target);
    else {
      const visible = numbered.filter((step) => !step.completed && (!this.plugin.settings.hideFrozen || !step.frozen) && (!this.query || step.text.toLocaleLowerCase().includes(this.query)));
      const position = visible.findIndex((step) => step.nodeId === id);
      to = ids.indexOf(visible[position + target]?.nodeId ?? "");
    }
    if (to < 0 || to === from) return;
    ids.splice(from, 1);
    ids.splice(to, 0, id);
    await this.change(map, renumberSteps(map.doc, ids));
  }
  async change(map, next) {
    try {
      await this.plugin.write(map.file, map.doc.source, next);
    } catch (error) {
      new import_obsidian4.Notice(message(error), 8e3);
    }
    this.cache.delete(map.file.path);
    await this.reload();
  }
  async onClose() {
    this.closed = true;
    this.generation++;
    window.clearTimeout(this.timer);
    this.cache.clear();
    this.contentEl.empty();
  }
};
var SettingsTab = class extends import_obsidian4.PluginSettingTab {
  constructor(plugin) {
    super(plugin.app, plugin);
    this.plugin = plugin;
    this.stopRecording = () => {
    };
    this.patternRevision = 0;
    this.savingPatterns = Promise.resolve();
    plugin.register(() => this.stopRecording());
  }
  hide() {
    this.stopRecording();
  }
  display() {
    this.stopRecording();
    this.patternRevision++;
    this.containerEl.empty();
    const header = this.containerEl.createDiv("tvm-settings-header");
    header.createEl("h2", { text: "TraceView Mindmap" });
    button(header, t("Restore default settings"), () => {
      new ConfirmDialog(this.app, t("Restore default settings"), t("Reset plugin preferences, shortcuts and map patterns? Device-local view states and saved notes are retained. Restart Obsidian to apply the language."), async () => {
        this.patternRevision++;
        await this.savingPatterns;
        await this.plugin.resetSettings();
        this.display();
        new import_obsidian4.Notice(t("Default settings restored. Restart Obsidian to apply the language."));
      }, { label: t("Restore defaults"), focusConfirm: false }).open();
    });
    new import_obsidian4.Setting(this.containerEl).setName(t("Language")).setDesc(t("Automatic follows Obsidian. Restart Obsidian to apply a language change.")).addDropdown((dropdown) => {
      dropdown.addOption("auto", t("Automatic (Obsidian)"));
      for (const [code, name] of Object.entries(LANGUAGES)) dropdown.addOption(code, name);
      dropdown.setValue(this.plugin.settings.language).onChange(async (value) => {
        if (!isLanguageSetting(value)) return;
        this.plugin.settings.language = value;
        await this.plugin.saveData(this.plugin.settings);
        new import_obsidian4.Notice(t("Language saved. Restart Obsidian to apply it."));
      });
    });
    new import_obsidian4.Setting(this.containerEl).setName(t("Node editor")).setDesc(t("Applies next time you edit. Native uses Obsidian Live Preview and suggestions, with text input as a fallback.")).addDropdown((dropdown) => {
      dropdown.addOption("native", t("Native Obsidian")).addOption("text", t("Text input"));
      dropdown.setValue(this.plugin.settings.nodeEditor).onChange(async (value) => {
        this.plugin.settings.nodeEditor = value === "text" ? "text" : "native";
        await this.plugin.saveData(this.plugin.settings);
      });
    });
    new import_obsidian4.Setting(this.containerEl).setName(t("Automatically open matching notes as maps")).setDesc(t("Applies to notes matching the patterns below. Opening source Markdown explicitly keeps that note in Markdown mode.")).addToggle((toggle) => toggle.setValue(this.plugin.settings.autoOpen).onChange(async (value) => {
      this.plugin.settings.autoOpen = value;
      await this.plugin.saveData(this.plugin.settings);
    }));
    let patternMode = this.plugin.settings.patternMode, mapPatterns = this.plugin.settings.mapPatterns;
    const patternStatus = this.containerEl.createEl("p", { cls: "setting-item-description", attr: { role: "status", "aria-live": "polite" } });
    const savePatterns = () => {
      const revision = ++this.patternRevision;
      const rules = { patternMode, mapPatterns };
      try {
        compileMapPatterns(rules);
      } catch (error) {
        patternStatus.setText(error instanceof PatternError ? t("Invalid pattern on line {line}: {error}", { line: error.line, error: error.message }) : message(error));
        return;
      }
      this.savingPatterns = this.savingPatterns.then(async () => {
        if (revision !== this.patternRevision) return;
        try {
          await this.plugin.setMapRules(rules);
          if (revision === this.patternRevision) patternStatus.setText(t("Patterns saved."));
        } catch (error) {
          if (revision === this.patternRevision) patternStatus.setText(message(error));
        }
      });
    };
    let syntaxInput, patternsInput;
    new import_obsidian4.Setting(this.containerEl).setName(t("Pattern syntax")).addDropdown((dropdown) => {
      syntaxInput = dropdown.selectEl;
      dropdown.addOption("glob", t("Glob (wildcards)")).addOption("regex", t("Regular expressions"));
      dropdown.setValue(patternMode).onChange((value) => {
        patternMode = value;
        savePatterns();
      });
    });
    const patternsSetting = new import_obsidian4.Setting(this.containerEl).setName(t("Map file patterns")).setDesc(t("One pattern per line; any match is enough. Glob without a slash matches file names in any folder. With a slash it matches vault-relative paths. Use *, ** and ?. Regex matches vault-relative paths, without / delimiters. Matching ignores case. Only Markdown files qualify.")).addTextArea((text) => {
      patternsInput = text.inputEl;
      text.setValue(mapPatterns).setPlaceholder("*.mindmap.md\n\u{1F3AF}*.md").onChange((value) => {
        mapPatterns = value;
        savePatterns();
      });
      text.inputEl.rows = 5;
      text.inputEl.setAttribute("aria-label", t("Map file patterns"));
      text.inputEl.spellcheck = false;
    }).addButton((button2) => button2.setButtonText(t("Restore default patterns")).onClick(() => {
      patternMode = DEFAULT_SETTINGS.patternMode;
      mapPatterns = DEFAULT_SETTINGS.mapPatterns;
      syntaxInput.value = patternMode;
      patternsInput.value = mapPatterns;
      savePatterns();
    }));
    patternsSetting.settingEl.addClass("tvm-pattern-setting");
    this.containerEl.createEl("p", { cls: "setting-item-description", text: t("The mindmap: true property also identifies a map. Invalid input keeps the last saved rules active. Patterns are shared by automatic opening, map search and step lists.") });
    if (import_obsidian4.Platform?.isWin) new import_obsidian4.Setting(this.containerEl).setName(t("Automatically restore large maps")).setDesc(t("At startup the active map waits for Obsidian to respond steadily. \u201COpen now\u201D skips the wait.")).addToggle((toggle) => toggle.setValue(this.plugin.settings.autoRestoreLargeMaps).onChange(async (value) => {
      this.plugin.settings.autoRestoreLargeMaps = value;
      for (const leaf of this.app.workspace.getLeavesOfType(VIEW)) leaf.view.refreshRestoreWait();
      await this.plugin.saveData(this.plugin.settings);
    }));
    new import_obsidian4.Setting(this.containerEl).setName(t("Hide frozen steps")).setDesc(t("Skip \u{1F9CA} branches in step and deadline lists. Maps display all text.")).addToggle((toggle) => toggle.setValue(this.plugin.settings.hideFrozen).onChange(async (value) => {
      this.plugin.settings.hideFrozen = value;
      await this.plugin.saveData(this.plugin.settings);
      this.plugin.refreshQueues();
    }));
    new import_obsidian4.Setting(this.containerEl).setName(t("Left arrow collapses the branch first")).setDesc(t("Off: go straight to the parent. On: collapse the open branch first, then press again to select the parent.")).addToggle((toggle) => toggle.setValue(this.plugin.settings.collapseOnLeft).onChange(async (value) => {
      this.plugin.settings.collapseOnLeft = value;
      await this.plugin.saveData(this.plugin.settings);
    }));
    for (const [key, label2] of [["queueTaskMarker", t("Show [ ] in list text")], ["queueStepTag", t("Show #step in list text")]]) {
      new import_obsidian4.Setting(this.containerEl).setName(label2).setDesc(t("Affects only Steps \xB7 Deadlines \xB7 QA display. Note text and completion controls are preserved.")).addToggle((toggle) => toggle.setValue(this.plugin.settings[key]).onChange(async (value) => {
        this.plugin.settings[key] = value;
        await this.plugin.saveData(this.plugin.settings);
        this.plugin.refreshQueues();
      }));
    }
    new import_obsidian4.Setting(this.containerEl).setName(t("Map node width")).setDesc(t("Applies immediately to all open maps. Outline and Table keep their own widths.")).addDropdown((dropdown) => {
      for (const [mode, label2] of widthModes()) dropdown.addOption(mode, label2);
      dropdown.setValue(this.plugin.settings.widthMode).onChange((value) => {
        void this.plugin.setWidthMode(value).catch((error) => new import_obsidian4.Notice(message(error)));
      });
    });
    this.containerEl.createEl("p", { text: t("Folds and camera are saved on this device. Viewing does not rewrite Markdown or add hidden IDs. Windows and Android can keep different view states.") });
    this.containerEl.createEl("p", { text: t("Native input uses the Obsidian editor, text input uses the Editor API. For commands requiring a full Markdown view, use \u22EF \u2192 Open text in editor.") });
    this.containerEl.createEl("h3", { text: t("Map hotkeys") });
    this.containerEl.createEl("p", { cls: "setting-item-description", text: t("Changes apply immediately to all open maps. Press \u2328 then a shortcut, or type it: Ctrl+C, Alt+Shift+1. Separate alternatives with commas. \xD7 disables a command, \u21BA restores defaults. While editing, normal editor shortcuts apply.") });
    const conflicts = this.containerEl.createDiv("tvm-hotkey-conflicts");
    const updateConflicts = () => {
      const seen = /* @__PURE__ */ new Map();
      const duplicate = /* @__PURE__ */ new Set();
      for (const definition of HOTKEY_DEFINITIONS) {
        const binding = this.plugin.settings.hotkeys[definition.id] ?? DEFAULT_HOTKEYS[definition.id];
        for (const value of binding.split(",").filter((value2) => value2.trim())) {
          const key = value.toLowerCase().replace(/\s+/g, "").replace(/key(?=[a-z](?:$|\+))/g, "").replace(/digit(?=\d)/g, "").replace(/mod|control/g, "ctrl").replace(/cmd/g, "meta").split("+").sort().join("+");
          const previous = seen.get(key);
          if (previous && previous !== definition.label) duplicate.add(`${previous} / ${definition.label}`);
          else seen.set(key, definition.label);
        }
      }
      conflicts.setText(duplicate.size ? t("Conflicting shortcuts: {shortcuts}. The first command in the list takes priority.", { shortcuts: [...duplicate].join("; ") }) : "");
      conflicts.hidden = !duplicate.size;
    };
    for (const definition of HOTKEY_DEFINITIONS) {
      const row = new import_obsidian4.Setting(this.containerEl).setName(definition.label);
      let input;
      let recording = false;
      const save = (value) => {
        const error = validateHotkeys(value);
        input.setAttribute("aria-invalid", error ? "true" : "false");
        row.setDesc(error ?? "");
        if (error) return;
        this.plugin.settings.hotkeys[definition.id] = value.trim();
        this.plugin.refreshBindings();
        updateConflicts();
        void this.plugin.saveData(this.plugin.settings).catch((error2) => new import_obsidian4.Notice(message(error2)));
      };
      row.addText((text) => {
        input = text.inputEl;
        input.setAttribute("aria-label", definition.label);
        text.setPlaceholder(t("Unassigned")).setValue(displayBinding(this.plugin.settings.hotkeys[definition.id] ?? DEFAULT_HOTKEYS[definition.id])).onChange(save);
        input.addEventListener("blur", () => {
          if (recording) this.stopRecording();
        });
      });
      row.addExtraButton((button2) => button2.setIcon("keyboard").setTooltip(t("Record shortcut")).onClick(() => {
        this.stopRecording();
        const scope = new import_obsidian4.Scope();
        scope.register(null, null, (event) => {
          event.preventDefault();
          event.stopPropagation();
          const binding = captureHotkey(event);
          if (binding) {
            this.stopRecording();
            input.value = displayBinding(binding);
            save(binding);
          }
          return false;
        });
        this.stopRecording = () => {
          this.app.keymap.popScope(scope);
          recording = false;
          input.classList.remove("is-recording");
          this.stopRecording = () => {
          };
        };
        this.app.keymap.pushScope(scope);
        recording = true;
        input.classList.add("is-recording");
        input.focus();
        input.select();
      }));
      row.addExtraButton((button2) => button2.setIcon("x").setTooltip(t("Disable")).onClick(() => {
        input.value = "";
        save("");
      }));
      row.addExtraButton((button2) => button2.setIcon("rotate-ccw").setTooltip(t("Default shortcuts")).onClick(() => {
        input.value = displayBinding(DEFAULT_HOTKEYS[definition.id]);
        save(DEFAULT_HOTKEYS[definition.id]);
      }));
    }
    updateConflicts();
  }
};
function displayBinding(value) {
  return value.replace(/Key([A-Z])/g, "$1").replace(/Digit(\d)/g, "$1").replace(/Mod/g, "Ctrl");
}
