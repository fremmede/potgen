# PotGen

[![npm version](https://img.shields.io/npm/v/potgen.svg)](https://npmjs.org/package/potgen)
[![npm downloads](https://img.shields.io/npm/dm/potgen.svg)](https://npmjs.org/package/potgen)
[![Node Status](https://github.com/fremmede/potgen/actions/workflows/ci.yml/badge.svg)](https://github.com/fremmede/potgen/actions/workflows/node.js.yml)
[![Node Version](https://img.shields.io/node/v/potgen.svg)](https://npmjs.org/package/potgen)
[![GitHub issues](https://img.shields.io/github/issues/fremmede/potgen)](https://github.com/fremmede/potgen/issues)
[![NPM License](https://img.shields.io/npm/l/potgen)](https://npmjs.org/package/potgen)

PotGen simplifies the generation of `.pot` files, allowing you to create translation files quickly and efficiently, thereby facilitating the localization of your projects.

Read in other languages: English | [Spanish](./README_es-ES.md)

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

## Usage

### Create Configuration File

If PotGen does not generate a `pot.json` in the root of your project upon installation, create it manually with the following configuration:

```json
{
  "sourcePattern": "**/*.{php,js}",
  "destFile": "languages/${domain}.pot",
  "package": "Default Package",
  "domain": "default-domain",
  "lastTranslator": "DEFAULT TRANSLATOR <default@example.com>",
  "bugReport": "https://default.com/bugs",
  "version": "1.0.0"
}
```

### Configure Script in `package.json`

Add a script to run PotGen in your `package.json` file:

```json
{
  "scripts": {
    "pot": "node node_modules/potgen/pot.js"
  }
}
```

### Run PotGen

Execute the script using npm:

```bash
npm run pot
```

PotGen will generate a `.pot` file at the location specified in `destFile` (for example, `languages/default-domain.pot`).

## Configuration

The `pot.json` file contains the following configuration options:

| Option           | Description                                             | Default Value                               |
|------------------|---------------------------------------------------------|---------------------------------------------|
| `sourcePattern`  | Glob pattern specifying the files to search             | `**/*.{php,js}`                             |
| `destFile`       | Path for the generated `.pot` file                      | `languages/${domain}.pot`                   |
| `package`        | Name of your package or plugin                          | `Default Package`                           |
| `domain`         | Text domain used for your package or plugin             | `default-domain`                            |
| `lastTranslator` | Name and email of the last translator                   | `DEFAULT TRANSLATOR <default@example.com>`  |
| `bugReport`      | URL for reporting bugs                                  | `https://default.com/bugs`                  |
| `version`        | Version of your package or plugin                       | `1.0.0`                                     |

## Features

- 🚀 Automatically generates `.pot` files for WordPress plugins and themes
- 💻 Supports PHP and JavaScript files
- ⚙️ Configurable via a simple JSON file
- 🔠 Handles various WordPress translation functions (`__`, `_e`, `_n`, `_x`)
- ⚠️ Warns about undefined domains

## Recent Updates

### Changes Implemented in Version 2.0.0

We've updated PotGen to handle various special cases in WordPress internationalization correctly. Here are the main changes with examples:

#### 1. Handling HTML and Format Markers

**PHP Code:**
```php
printf( __('Hey, I noticed you\'ve been using <strong>%1$s</strong> for more than 2 weeks.', 'text-domain'), 'WooCommerce' );
```

**Generated in .pot:**
```
msgid "Hey, I noticed you've been using <strong>%1$s</strong> for more than 2 weeks."
msgstr ""
```

**Change:** Keeps HTML tags and format markers intact.

#### 2. HTML Links and Multiple Placeholders

**PHP Code:**
```php
__( 'Thanks for installing %1$s v%2$s plugin. Click <a href="%3$s">here</a> to configure plugin settings.', 'text-domain' )
```

**Generated in .pot:**
```
msgid "Thanks for installing %1$s v%2$s plugin. Click <a href=\"%3$s\">here</a> to configure plugin settings."
msgstr ""
```

**Change:** Properly escapes quotes in HTML attributes (`href=\"%3$s\"`).

#### 3. Long Texts with HTML and Apostrophes

**PHP Code:**
```php
__('Hey, I noticed you\'ve been using <strong>%1$s</strong> for more than 2 week – that's awesome! Could you please do me a BIG favor and give it a <strong>5-star</strong> rating on WordPress? Just to help me spread the word and boost my motivation.', 'text-domain')
```

**Generated in .pot:**
```
msgid "Hey, I noticed you've been using <strong>%1$s</strong> for more than 2 week – that's awesome! Could you please do me a BIG favor and give it a <strong>5-star</strong> rating on WordPress? Just to help me spread the word and boost my motivation."
msgstr ""
```

**Change:** Correctly handles apostrophes and long texts with HTML.

#### 4. Decoding HTML Entities

**PHP Code:**
```php
esc_html_e( 'Nope&#44; maybe later', 'text-domain' );
```

**Generated in .pot:**
```
msgid "Nope, maybe later"
msgstr ""
```

**Change:** Decodes HTML entities (&#44; becomes ,) for better readability.

### Implementation

These changes were made in the `generatePotFile()` function of PotGen:

1. Improved regular expression to capture various internationalization functions.
2. Added `decodeHtmlEntities()` function to handle HTML entities.
3. Updated `escapeString()` function to correctly escape special characters.

## Contribution

If you encounter any issues or have suggestions for improvements, please feel free to open an issue or submit a pull request on the PotGen GitHub repository.

## Donate

If you appreciate this project and would like to support its continued development, you can make a donation via [Ko-fi](https://ko-fi.com/fremmede). Your support is greatly appreciated!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J710SIW5)

## License

PotGen is licensed under the [MIT License](https://opensource.org/licenses/MIT).