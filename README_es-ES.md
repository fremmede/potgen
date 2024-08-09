# PotGen

[![npm version](https://img.shields.io/npm/v/potgen.svg)](https://npmjs.org/package/potgen)
[![npm downloads](https://img.shields.io/npm/dm/potgen.svg)](https://npmjs.org/package/potgen)
[![Node Status](https://github.com/fremmede/potgen/actions/workflows/ci.yml/badge.svg)](https://github.com/fremmede/potgen/actions/workflows/node.js.yml)
[![Node Version](https://img.shields.io/node/v/potgen.svg)](https://npmjs.org/package/potgen)
[![GitHub issues](https://img.shields.io/github/issues/fremmede/potgen)](https://github.com/fremmede/potgen/issues)
[![NPM License](https://img.shields.io/npm/l/potgen)](https://npmjs.org/package/potgen)

PotGen simplifies the generation of `.pot`, `.po`, and `.mo` files, allowing you to create translation files quickly and efficiently, thus facilitating the localization of your projects.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Create Configuration File](#create-configuration-file)
- [Configure Script in `package.json`](#configure-script-in-packagejson)
- [Run PotGen](#run-potgen)
- [Configuration](#configuration)
- [Features](#features)
- [Recent Updates](#recent-updates)
- [Contribution](#contribution)
- [Donate](#donate)
- [License](#license)

## Installation

To install PotGen, use npm:

```bash
npm install potgen
```

### Additional Requirements

To create `.mo` files, you need to have GetText installed. If you are on Windows, you can download and install GetText from:

*GetText for Windows*

- **GetText V 0.14.4** [here](https://gnuwin32.sourceforge.net/packages/gettext.htm)

## Usage

### Create Configuration File

If PotGen does not generate a `pot.json` file in the root of your project after installation, create it manually with the following configuration:

```json
{
  "sourcePattern": "**/*.{php,js}",
  "destFile": "languages/${domain}.pot",
  "package": "Default Package",
  "domain": "default-domain",
  "lastTranslator": "DEFAULT TRANSLATOR",
  "bugReport": "https://default.com/bugs",
  "version": "1.0.0",
  "createPoFiles": false,
  "languages": ["es_ES", "es_PE", "ru_RU"]
}
```

### Configure Script in `package.json`

Add the following scripts to your `package.json` file:

```json
"scripts": {
  "pot": "node node_modules/potgen/pot.js",
  "watch": "gulp --gulpfile pogen.js default",
  "po2mo": "gulp --gulpfile pogen.js po2mo",
  "lang": "gulp --gulpfile pogen.js lang"
}
```

### Run PotGen

Depending on the configuration of `createPoFiles` in `pot.json`:

#### If `createPoFiles` is `true`:

```bash
npm run pot
```

**Expected output:**
```
Generating .pot file...
Successfully generated .pot file: default-domain.pot ✓
Generating .po files for: es_PE
.po file generated successfully: default-domain-es_PE.po ✓
Generating .po files for: ru_RU
.po file generated successfully: default-domain-ru_RU.po ✓
```

#### If `createPoFiles` is `false`:

```bash
npm run pot
```

**Expected output:**
```
Generating .pot file...
Successfully generated .pot file: default-domain.pot ✓
```

### Using Gulp

You can use the following commands to manage translation files:

```bash
gulp --gulpfile pogen.js default
```
or

```bash
npm run watch
```

This will start the monitoring process for changes in `.po` files:

```
Starting 'default'...
Watching for changes in .po files
```

To convert `.po` files to `.mo`:

```bash
gulp --gulpfile pogen.js po2mo
```
or

```bash
npm run po2mo
```

**Expected output:**
```
Starting 'po2mo'...
Converting .po files to .mo
Conversion completed ✓
```

To convert `.po` files for a specific language:

```bash
gulp --gulpfile pogen.js lang --lang=es_PE
```
or

```bash
npm run lang -- --lang=es_PE
```

**Expected output:**
```
Starting 'lang'...
Converting files matching es_PE.po
Files found matching es_PE.po
Conversion completed for es_PE.po ✓
```

## Configuration

| Option               | Description                                                                 | Default Value               |
|----------------------|-----------------------------------------------------------------------------|------------------------------|
| **`sourcePattern`**  | Glob pattern that specifies the files to search                           | `**/*.{php,js}`             |
| **`destFile`**       | Path and name of the destination `.pot` file.                             | `languages/${domain}.pot`    |
| **`package`**        | Name of the package.                                                       | `Default Package`            |
| **`domain`**         | Domain for the `.pot` file.                                               | `default-domain`             |
| **`lastTranslator`** | Information about the last translator.                                     | `DEFAULT TRANSLATOR`         |
| **`bugReport`**      | URL for reporting bugs.                                                    | `https://default.com/bugs`   |
| **`version`**        | Version of the translation file.                                          | `1.0.0`                      |
| **`createPoFiles`**  | **`true`**: Generates `.po` files in addition to the `.pot` file <br> **`false`**: Only generates the `.pot` file. | `false`                      |
| **`languages`**      | List of languages for generating `.po` files. You can add more as needed. | `["es_ES", "es_PE", "ru_RU"]` |

## Features

- 🚀 **Automatically generates `.pot`, `.po`, and `.mo` files** for WordPress plugins and themes.
- 💻 **Supports PHP and JavaScript files**.
- ⚙️ **Configurable through a simple JSON file**.
- 🔠 **Handles multiple WordPress translation functions** (`__`, `_e`, `_n`, `_x`).
- ⚠️ **Warns about undefined domains**.
- 🔄 **Options to convert `.po` files to `.mo` and generate `.po` files based on configuration**.

## Recent Updates

### Changes Implemented in Version 3.0.0

- **Generation of `.po` and `.mo` Files:** PotGen can now also generate `.po` files and convert them to `.mo`, in addition to `.pot` files.
- **Improved Gulp Support:** New Gulp commands have been added to watch for changes, convert `.po` files to `.mo`, and generate files for specific languages.
- **Configuration Update:** The `createPoFiles` option now allows you to specify whether to generate `.po` files along with the `.pot` file.

### Changes Implemented in Version 2.0.0

- **HTML Handling and Format Markers:** Improved handling of HTML tags and format markers in translation strings.
- **HTML Links and Multiple Markers:** Correct escaping of quotes in HTML attributes.
- **Long Texts with HTML and Apostrophes:** Proper handling of apostrophes and long texts with HTML.
- **HTML Entity Decoding:** Decoding of HTML entities for better readability in `.pot` files.

## Contribution

If you find any issues or have suggestions for improvements, feel free to open an issue or submit a pull request in the PotGen repository on GitHub.

## Donate

If you appreciate this project and would like to support its ongoing development, you can make a donation through [Ko-fi](https://ko-fi.com/fremmede). Your support is greatly appreciated!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J710SIW5)

## License

PotGen is licensed under the [MIT License](https://opensource.org/licenses/MIT)