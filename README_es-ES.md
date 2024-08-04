# PotGen
[![npm version](https://img.shields.io/npm/v/potgen.svg)](https://npmjs.org/package/potgen)
[![npm type definitions](https://img.shields.io/npm/types/potgen)](https://npmjs.org/package/potgen)
[![Build Status](https://img.shields.io/github/workflow/status/fremmede/potgen/CI)](https://github.com/fremmede/potgen/actions)
[![Coverage Status](https://img.shields.io/codecov/c/github/fremmede/potgen)](https://codecov.io/gh/fremmede/potgen)
[![npm downloads](https://img.shields.io/npm/dm/potgen.svg)](https://npmjs.org/package/potgen)
[![GitHub issues](https://img.shields.io/github/issues/fremmede/potgen)](https://github.com/fremmede/potgen/issues)
[![NPM License](https://img.shields.io/npm/l/potgen)](https://npmjs.org/package/potgen)

PotGen simplifica la generación de archivos `.pot`, permitiéndote crear archivos de traducción de manera rápida y eficiente, facilitando así la localización de tus proyectos.

## Tabla de Contenidos

- [Instalación](#instalación)
- [Uso](#uso)
  - [Crear Archivo de Configuración](#crear-archivo-de-configuración)
  - [Configurar Script en `package.json`](#configurar-script-en-packagejson)
  - [Ejecutar PotGen](#ejecutar-potgen)
- [Configuración](#configuración)
- [Características](#características)
- [Actualizaciones Recientes](#actualizaciones-recientes)
- [Contribución](#contribución)
- [Licencia](#licencia)

## Instalación

Para instalar PotGen, usa npm:

```bash
npm install potgen
```

## Uso

### Crear Archivo de Configuración

Si PotGen no genera un archivo `pot.json` en la raíz de tu proyecto tras la instalación, créalo manualmente con la siguiente configuración:

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

### Configurar Script en `package.json`

Agrega un script para ejecutar PotGen en tu archivo `package.json`:

```json
{
  "scripts": {
    "pot": "node node_modules/potgen/pot.js"
  }
}
```

### Ejecutar PotGen

Ejecuta el script usando npm:

```bash
npm run pot
```

PotGen generará un archivo `.pot` en la ubicación especificada en `destFile` (por ejemplo, `languages/default-domain.pot`).

## Configuración

El archivo `pot.json` contiene las siguientes opciones de configuración:

| Opción            | Descripción                                             | Valor Predeterminado                      |
|-------------------|---------------------------------------------------------|-------------------------------------------|
| `sourcePattern`   | Patrón glob que especifica los archivos a buscar        | `**/*.{php,js}`                           |
| `destFile`        | Ruta para el archivo `.pot` generado                    | `languages/${domain}.pot`                 |
| `package`         | Nombre de tu paquete o plugin                           | `Default Package`                         |
| `domain`          | Dominio de texto utilizado para tu paquete o plugin     | `default-domain`                          |
| `lastTranslator`  | Nombre y correo electrónico del último traductor        | `DEFAULT TRANSLATOR <default@example.com>`|
| `bugReport`       | URL para reportar errores                               | `https://default.com/bugs`                |
| `version`         | Versión de tu paquete o plugin                          | `1.0.0`                                   |

## Características

- 🚀 Genera automáticamente archivos `.pot` para plugins y temas de WordPress
- 💻 Soporta archivos PHP y JavaScript
- ⚙️ Configurable a través de un archivo JSON simple
- 🔠 Maneja varias funciones de traducción de WordPress (`__`, `_e`, `_n`, `_x`)
- ⚠️ Advierte sobre dominios no definidos

## Actualizaciones Recientes

### Cambios Implementados en la Versión 2.0.0

Hemos actualizado PotGen para manejar correctamente varios casos especiales en la internacionalización de WordPress. Aquí están los principales cambios con ejemplos:

#### 1. Manejo de HTML y Marcadores de Formato

**Código PHP:**
```php
printf( __('Hey, I noticed you\'ve been using <strong>%1$s</strong> for more than 2 weeks.', 'text-domain'), 'WC Swift QR Payment' );
```

**Generado en .pot:**
```
msgid "Hey, I noticed you've been using <strong>%1$s</strong> for more than 2 weeks."
msgstr ""
```

**Cambio:** Mantiene las etiquetas HTML y los marcadores de formato intactos.

#### 2. Enlaces HTML y Múltiples Marcadores

**Código PHP:**
```php
__( 'Thanks for installing %1$s v%2$s plugin. Click <a href="%3$s">here</a> to configure plugin settings.', 'text-domain' )
```

**Generado en .pot:**
```
msgid "Thanks for installing %1$s v%2$s plugin. Click <a href=\"%3$s\">here</a> to configure plugin settings."
msgstr ""
```

**Cambio:** Escapa correctamente las comillas en atributos HTML (`href=\"%3$s\"`).

#### 3. Textos Largos con HTML y Apóstrofes

**Código PHP:**
```php
__('Hey, I noticed you\'ve been using <strong>%1$s</strong> for more than 2 week – that's awesome! Could you please do me a BIG favor and give it a <strong>5-star</strong> rating on WordPress? Just to help me spread the word and boost my motivation.', 'text-domain')
```

**Generado en .pot:**
```
msgid "Hey, I noticed you've been using <strong>%1$s</strong> for more than 2 week – that's awesome! Could you please do me a BIG favor and give it a <strong>5-star</strong> rating on WordPress? Just to help me spread the word and boost my motivation."
msgstr ""
```

**Cambio:** Maneja correctamente apóstrofes y textos largos con HTML.

#### 4. Decodificación de Entidades HTML

**Código PHP:**
```php
esc_html_e( 'Nope&#44; maybe later', 'text-domain' );
```

**Generado en .pot:**
```
msgid "Nope, maybe later"
msgstr ""
```

**Cambio:** Decodifica entidades HTML (&#44; se convierte en ,) para mejor legibilidad.

### Implementación

Estos cambios se realizaron en la función `generatePotFile()` de PotGen:

1. Expresión regular mejorada para capturar diversas funciones de internacionalización.
2. Función `decodeHtmlEntities()` para manejar entidades HTML.
3. Función `escapeString()` actualizada para escapar correctamente caracteres especiales.

## Contribución

Si encuentras algún problema o tienes sugerencias para mejoras, no dudes en abrir un problema o enviar una solicitud de extracción en el repositorio de PotGen en GitHub.

## Licencia

PotGen está licenciado bajo la [Licencia MIT](https://opensource.org/licenses/MIT).