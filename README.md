# Luminflow Studio
[![License: AGPL v3](https://img.shields.io/badge/License-AGPL_v3-blue.svg)](./LICENSE)

## About
This SVG editor and animation application is being continuously developed as [Luminflow Studio](https://github.com/luminflow-software/studio) at Luminflow.
If you wish to collaborate, then you can become a contributor through [luminflow.app](https://luminflow.app).

[Please fill out this quick survey](https://form.typeform.com/to/Joe43P9Z) if you work with SVG image files.

## Installation and Setup Instructions

- To clone this repository to your local machine run this command in your terminal:

```sh
git clone https://github.com/luminflow-software/studio.git
```

- Make sure you have `pnpm` installed on your system, then install dependencies inside the studio folder:

```sh
pnpm install
```

- After installing dependencies, you can run the dev server:

```sh
pnpm dev
```

Type `q` + `Enter` to quit the server. For refresh or open browser, use `r` or `o`.

### React with Vite
The main dependencies for React with Vite are included within the `App/studio-react` folder.
The alternate root: `../../` was specified for vite in `vite.config.js` in `App/studio-react` so that React-Vite detects and uses index.html from the root.

The React implementation is in the `studio-react` folder. Currently react is used on a component basis, but functionality will continue to be refactored into React.

## Source Code
Current and maintained development of this software is available in the
official Luminflow repository as "Luminflow Studio":
https://github.com/luminflow-software/studio

## [License](./LICENSE)
© 2025 Luminflow — https://luminflow.app

This project is licensed under the GNU Affero General Public License v3.0 (AGPL-3.0).
You must preserve this copyright notice and the full license text
in all copies or substantial portions of the software.

For complete license terms, see the LICENSE file or:
https://www.gnu.org/licenses/agpl-3.0.html