# Publishing 1.0.2

- Review LICENSING.md, the GPLv3 text and the Obsidian host additional permission. Independent legal review of the permission remains recommended.
- Run npm ci, npm run package and npm test. Package runs the build/license composition check.
- Make the complete Corresponding Source, including build scripts, available from the exact release tag with equivalent access alongside the compiled assets.
- Review the current limitations in README and manually check the release on desktop and Android.
- Publish this repository under the intended GitHub account.
- Create a GitHub release with the exact tag 1.0.2, matching manifest.json.
- Attach main.js, manifest.json and styles.css from release/traceview-mindmap as individual assets. Also provide the packaged licensing documents or the complete plugin ZIP.
- Sign in to the Obsidian Community directory, link the GitHub account and add the plugin repository.
- Address automated review feedback with a new version and matching GitHub release.

The directory reads the manifest at the default branch HEAD. The source repository and the matching release must both be accessible. Follow the current [official submission instructions](https://docs.obsidian.md/Plugins/Releasing/Submit%20your%20plugin).

Review the native editor integration during community review. It uses an internal host implementation with a text-input fallback.
