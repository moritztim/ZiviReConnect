# Contributing

Thank you for considering contributing to this project! This document outlines the process of doing so.

## Making Changes

### Development Environment

#### Building and Running

1. Install [Deno](https://deno.land/).
2. Have a look at the available tasks by running `deno task` from the command line.

This project is developed using the following technologies:

- [TypeScript](https://www.typescriptlang.org/) (main language)
- [Deno](https://deno.land/) (runtime)
- [Prettier](https://prettier.io/) (main code formatter)
- [EditorConfig](https://editorconfig.org/) (code formatting configuration)
- [LintStaged](https://github.com/okonet/lint-staged) (formatting git hook)
- [Visual Studio Code](https://github.com/microsoft/vscode) (editor)

### Editor Configuration

- Install the recommended extensions (or equivalents), listed in [`.vscode/extensions.json](../.vscode/extensions.json) and will show up in the Extensions view in VSCode.
- Apply the recommended basic settings, described in [`.editorconfig`](../.editorconfig). The EditorConfig extension will do this automatically.
- Apply the recommended advanced settings, described in `.vscode/settings.json`. VSCode will do this automatically.

### Formatting

If you've followed the [Editor Configuration](#editor-configuration) instructions, your code should be formatted automatically.

When writing Code, Try to keep your line length within at most the second vertical rulers displayed in your editor.

Formatting is guided by the following files:

- `.editorconfig` defines some original rules and acts as a fallback for others.
- `.prettierrc` defines some rules and acts as a fallback for others.
- `deno.json`.`fmt` acts as a fallback.
- `.vscode/settings.json` defines visual reminders of recommended maximal line widths with vertical rulers.
