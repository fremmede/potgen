Aquí tienes el contenido del README en formato `README.md`, mejorado y estructurado para mayor claridad y presentación:

```markdown
# PotGen

[![npm version](https://img.shields.io/npm/v/potgen.svg)](https://npmjs.org/package/potgen)
[![npm downloads](https://img.shields.io/npm/dm/potgen.svg)](https://npmjs.org/package/potgen)
[![Node Status](https://github.com/fremmede/potgen/actions/workflows/ci.yml/badge.svg)](https://github.com/fremmede/potgen/actions/workflows/node.js.yml)
[![Node Version](https://img.shields.io/node/v/potgen.svg)](https://npmjs.org/package/potgen)
[![GitHub issues](https://img.shields.io/github/issues/fremmede/potgen)](https://github.com/fremmede/potgen/issues)
[![NPM License](https://img.shields.io/npm/l/potgen)](https://npmjs.org/package/potgen)

PotGen simplifica la generación de archivos `.pot`, `.po` y `.mo`, permitiéndote crear archivos de traducción de manera rápida y eficiente, facilitando así la localización de tus proyectos.

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
- [Donar](#donar)
- [Licencia](#licencia)

## Instalación

Para instalar PotGen, usa npm:

```bash
npm install potgen
```

### Requisitos Adicionales

Para la creación de archivos `.mo`, necesitas tener instalado GetText. Si estás en Windows, puedes descargar e instalar GetText desde:

- **GetText V 0.14.4** [aquí](https://gnuwin32.sourceforge.net/packages/gettext.htm)

## Uso

### Crear Archivo de Configuración

Si PotGen no genera un archivo `pot.json` en la raíz de tu proyecto tras la instalación, créalo manualmente con la siguiente configuración:

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

### Configurar Script en `package.json`

Agrega los siguientes scripts a tu archivo `package.json`:

```json
"scripts": {
  "pot": "node node_modules/potgen/pot.js",
  "watch": "gulp --gulpfile pogen.js default",
  "po2mo": "gulp --gulpfile pogen.js po2mo",
  "lang": "gulp --gulpfile pogen.js lang"
}
```

### Ejecutar PotGen

Dependiendo de la configuración de `createPoFiles` en `pot.json`:

#### Si `createPoFiles` es `true`:

```bash
npm run pot
```

**Salida esperada:**
```
Generating .pot file...
Successfully generated .pot file: default-domain.pot ✓
Generating .po files for: es_PE
.po file generated successfully: default-domain-es_PE.po ✓
Generating .po files for: ru_RU
.po file generated successfully: default-domain-ru_RU.po ✓
```

#### Si `createPoFiles` es `false`:

```bash
npm run pot
```

**Salida esperada:**
```
Generating .pot file...
Successfully generated .pot file: default-domain.pot ✓
```

### Usar Gulp

Puedes usar los siguientes comandos para manejar los archivos de traducción:

```bash
gulp --gulpfile pogen.js default
```
o

```bash
npm run watch
```

Esto iniciará el proceso de monitoreo para cambios en archivos `.po`:

```
Starting 'default'...
Watching for changes in .po files
```

Para convertir archivos `.po` a `.mo`:

```bash
gulp --gulpfile pogen.js po2mo
```
o

```bash
npm run po2mo
```

**Salida esperada:**
```
Starting 'po2mo'...
Converting .po files to .mo
Conversion completed ✓
```

Para convertir archivos `.po` para un idioma específico:

```bash
gulp --gulpfile pogen.js lang --lang=es_PE
```
o

```bash
npm run lang -- --lang=es_PE
```

**Salida esperada:**
```
Starting 'lang'...
Converting files matching es_PE.po
Files found matching es_PE.po
Conversion completed for es_PE.po ✓
```

## Configuración

| Opción               | Descripción                                                                 | Valor Predeterminado         |
|----------------------|-----------------------------------------------------------------------------|------------------------------|
| **`sourcePattern`**  | Patrón glob que especifica los archivos a buscar                          | `**/*.{php,js}`             |
| **`destFile`**       | Ruta y nombre del archivo `.pot` de destino.                               | `languages/${domain}.pot`    |
| **`package`**        | Nombre del paquete.                                                         | `Default Package`            |
| **`domain`**         | Dominio para el archivo `.pot`.                                            | `default-domain`             |
| **`lastTranslator`** | Información del último traductor.                                          | `DEFAULT TRANSLATOR`         |
| **`bugReport`**      | URL para reportar errores.                                                 | `https://default.com/bugs`   |
| **`version`**        | Versión del archivo de traducción.                                         | `1.0.0`                      |
| **`createPoFiles`**  | **`true`**: Genera archivos `.po` además del archivo `.pot` <br> **`false`**: Solo genera el archivo `.pot`. | `false`                      |
| **`languages`**      | Lista de idiomas para generar archivos `.po`. Puedes agregar los que necesites. | `["es_ES", "es_PE", "ru_RU"]` |

## Características

- 🚀 **Genera automáticamente archivos `.pot`, `.po` y `.mo`** para plugins y temas de WordPress.
- 💻 **Soporta archivos PHP y JavaScript**.
- ⚙️ **Configurable a través de un archivo JSON** simple.
- 🔠 **Maneja varias funciones de traducción de WordPress** (`__`, `_e`, `_n`, `_x`).
- ⚠️ **Advierte sobre dominios no definidos**.
- 🔄 **Opciones para convertir archivos `.po` a `.mo`** y generar archivos `.po` según la configuración.

## Actualizaciones Recientes

### Cambios Implementados en la Versión 3.0.0

- **Generación de Archivos `.po` y `.mo`:** Ahora PotGen también puede generar archivos `.po` y convertirlos a `.mo`, además de los archivos `.pot`.
- **Soporte Mejorado para Gulp:** Se han agregado nuevos comandos Gulp para observar cambios, convertir archivos `.po` a `.mo`, y generar archivos para idiomas específicos.
- **Actualización en la Configuración:** La opción `createPoFiles` ahora permite especificar si se deben generar archivos `.po` junto con el archivo `.pot`.

### Cambios Implementados en la Versión 2.0.0

- **Manejo de HTML y Marcadores de Formato:** Mejora en la captura de etiquetas HTML y marcadores de formato en cadenas de traducción.
- **Enlaces HTML y Múltiples Marcadores:** Escapado correcto de comillas en atributos HTML.
- **Textos Largos con HTML y Apóstrofes:** Manejo adecuado de apóstrofes y textos largos con HTML.
- **Decodificación de Entidades HTML:** Decodificación de entidades HTML para mejor legibilidad en los archivos `.pot`.

## Contribución

Si encuentras algún problema o tienes sugerencias para mejoras, no dudes en abrir un problema o enviar una solicitud de extracción en el repositorio de PotGen en GitHub.

## Donar

Si aprecias este proyecto y te gustaría apoyar su desarrollo continuo, puedes hacer una donación a través de [Ko-fi](https://ko-fi.com/fremmede). ¡Tu apoyo es muy apreciado!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](https://ko-fi.com/J3J710SIW5)

## Licencia

PotGen está licenciado bajo la [Licencia MIT](https://opensource.org/licenses/MIT).
```

### Notas sobre el Formato

- **Encabezados y Secciones**: Se han utilizado encabezados y secciones para mejorar la organización.
- **Listas y Tablas**: Se han utilizado listas y tablas para presentar la información de manera clara y concisa.
- **Comandos y Salidas**: Se han formateado los comandos y las salidas esperadas para facilitar la lectura.

Si necesitas más ajustes o tienes otras preguntas, ¡no dudes en preguntar!

Citations:
[1] https://ppl-ai-file-upload.s3.amazonaws.com/web/direct-files/1374474/15523791-3dfc-4467-854c-ba73587ddb16/paste.txt