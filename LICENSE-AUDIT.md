# Licensing review snapshot

Reviewed on 2026-11-06 for TraceView Mindmap 1.0.2.

## Scope and findings

This review covered the tracked file inventory, runtime import graph, esbuild
configuration and generated bootstrap code, the native editor bridge, the locked
dependency license metadata and the installed esbuild and Obsidian SDK notices.

The production build has 30 source inputs: 19 project TypeScript modules and 11
translation dictionaries under src/. Its sole external module is obsidian. No
node_modules file is an esbuild input. The plugin runtime contains no bundled
image, font, WebAssembly or host application archive assets. The stylesheet has
no external imports or asset URLs. Documentation media added after the initial
review consists of GIF and PNG captures from the maintainer's demonstrations in
a test vault. These captures show the Obsidian interface; the project license
does not grant rights over third-party interface elements or trademarks.

Classifying a file as project source does not establish its originality. This
review did not run an external source-similarity search or determine authorship
of individual AI-assisted fragments. It is not a legal opinion about their
copyrightability, title or freedom from third-party claims.

The JavaScript output includes esbuild-generated CommonJS bootstrap helpers.
THIRD-PARTY-NOTICES.md preserves esbuild's MIT notice for these helpers. An
Obsidian SDK MIT notice is also preserved for the development type declarations.
That SDK license does not license the proprietary host application.

## Host integration

The plugin imports Obsidian's API at runtime and obtains the host's native editor
constructor and extension facilities from existing Markdown views. It does not
bundle the host editor implementation. The Obsidian host additional permission
addresses this specific combination while retaining GPLv3 obligations for the
plugin itself. It supplies no rights over the host or copied third-party code.

An optional integration test reads a separately supplied local Obsidian archive.
That archive is excluded from the repository and release. The test remains
disabled unless its environment variable is supplied.

## Development dependencies

All direct npm dependencies are declared as devDependencies. The locked versions
and declared licenses at this snapshot are:

| Package | Version | Declared license |
| --- | --- | --- |
| @playwright/test | 1.63.0 | Apache-2.0 |
| @types/jsdom | 21.1.7 | MIT |
| @types/node | 22.20.4 | MIT |
| esbuild | 0.25.12 | MIT |
| jsdom | 26.1.0 | MIT |
| obsidian | 1.13.1 | MIT |
| tsx | 4.23.13 | MIT |
| typescript | 5.9.3 | Apache-2.0 |

Across the non-root package-lock entries, declared license counts are MIT 103,
MIT-0 1, Apache-2.0 5, BSD-2-Clause 2, ISC 2 and BSD-3-Clause 1. These counts include
platform-specific optional packages. This was a metadata review of the complete
lockfile, not a verification of every file in every tool dependency. These
packages are not redistributed as plugin library inputs in this build.

## License texts and release delivery

LICENSE was copied verbatim from the [SPDX GPL-3.0-only text](https://raw.githubusercontent.com/spdx/license-list-data/main/text/GPL-3.0-only.txt).
Its SHA-256 with LF line endings is
fb981668c18a279e285fc4d83fba1e836cc84dd4daa73c9697d3cfd2d8aca6e0.

The GPL text, host permission and third-party notices are embedded in the
main.js banner and supplied as separate documents in the complete plugin
package. The GPL text itself is unmodified. package.json points to LICENSING.md
using npm's SEE LICENSE IN convention to describe the combined terms.

The publication checklist requires the complete Corresponding Source and build
scripts at the matching release tag with equivalent access alongside binaries.
The repository had not been published at the time of this review.

## Reproducing the technical checks

Run npm ci, then npm run audit:licenses. The build emits release/build-audit.json
with esbuild's input/output graph and the compiled bundle hash. The audit checks
that the metadata matches main.js, every input is project source, the sole
external module is obsidian, and the complete notices are present in the bundle.
Packaging runs the same check before producing the installable directory.

Review added third-party sources, assets, changed dependencies and changed host
integration before updating this snapshot. Future commercial relicensing of
outside contributions requires appropriate rights from their rights holders.
The project-specific host permission has not received independent legal review.
