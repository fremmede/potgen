const fs = require('fs-extra');
const path = require('path');
const glob = require('glob');

class PotGenerator {
  constructor(config) {
    this.config = config;
    this.pluginPath = process.cwd();
    this.potFile = path.join(this.pluginPath, this.config.destFile.replace('${domain}', this.config.domain));
    this.pluginInfo = this.getPluginInfo();
  }

  getPluginInfo() {
    return {
      name: this.config.package,
      version: this.config.version,
      author: this.config.lastTranslator.split('<')[0].trim(),
      email: this.config.lastTranslator.split('<')[1].split('>')[0],
      uri: this.config.bugReport,
      textDomain: this.config.domain,
    };
  }

  static validateConfig(config) {
    const requiredFields = ['destFile', 'package', 'lastTranslator', 'domain', 'bugReport', 'version'];
    for (const field of requiredFields) {
      if (!config[field]) {
        throw new Error(`Required field '${field}' not found in the configuration`);
      }
    }
  }

  generatePotContent() {
    const currentYear = new Date().getFullYear();
    const currentDate = new Date().toISOString();
    let potContent = `# Copyright (C) ${currentYear} ${this.pluginInfo.name}
# This file is distributed under the GPLv3 or later.
msgid ""
msgstr ""
"Project-Id-Version: ${this.pluginInfo.name} ${this.pluginInfo.version}\\n"
"Report-Msgid-Bugs-To: ${this.pluginInfo.uri}\\n"
"Last-Translator: ${this.pluginInfo.author} <${this.pluginInfo.email}>\\n"
"Language-Team: LANGUAGE <LL@li.org>\\n"
"MIME-Version: 1.0\\n"
"Content-Type: text/plain; charset=UTF-8\\n"
"Content-Transfer-Encoding: 8bit\\n"
"POT-Creation-Date: ${currentDate}\\n"
"PO-Revision-Date: YEAR-MO-DA HO:MI+ZONE\\n"
"X-Generator: PotGen 1.0.0\\n"
"X-Domain: ${this.pluginInfo.textDomain}\\n
`;

    return potContent;
  }

  generatePotFile() {
    const languagesDir = path.join(this.pluginPath, 'languages');
    fs.ensureDirSync(languagesDir);

    const sourcePattern = this.config.sourcePattern || '**/*.{php,js}';
    const orderedFiles = glob.sync(sourcePattern, { cwd: this.pluginPath, nodir: true });

    let potContent = this.generatePotContent();

    orderedFiles.forEach(file => {
      const content = fs.readFileSync(path.join(this.pluginPath, file), 'utf8');
      const regex = /(?:__|_e|esc_html__|esc_html_e|esc_attr__|esc_attr_e)\(\s*(['"])((?:(?!\1).|\\\1)*)\1\s*(?:,\s*(['"])((?:(?!\3).|\\\3)*)\3)?\s*\)/g;
      let match;

      while ((match = regex.exec(content)) !== null) {
        const quoteType = match[1];
        let msgid = match[2];
        const domain = match[4] || 'default';

        // Decode HTML entities
        msgid = this.decodeHtmlEntities(msgid);

        if (this.isValidDomain(domain)) {
          const lineNumber = content.substr(0, match.index).split('\n').length;
          potContent += `\n#: ${file}:${lineNumber}\n`;
          potContent += `msgid "${this.escapeString(msgid).replace(/"/g, '\\"')}"\n`;
          potContent += `msgstr ""\n`;
        }
      }
    });

    try {
      console.log('Generating .pot file...');
      fs.writeFileSync(path.join(languagesDir, path.basename(this.potFile)), potContent);
      console.log(`Successful generation of .pot file: ${path.basename(this.potFile)}`);

      // Check if createPoFiles is set to true before generating .po files
      if (this.config.createPoFiles) {
        this.generatePoFile(languagesDir, 0);
      }
    } catch (error) {
      console.error('Error writing the .pot file:', error.message);
    }
  }

  generatePoFile(languagesDir, index) {
    const languages = this.config.languages || [];

    if (index < languages.length) {
      const lang = languages[index];
      const poFile = path.join(languagesDir, `${this.config.domain}-${lang}.po`);

      // Print the language being processed
      console.log(`Generating .po files for: ${lang}...`);

      let poContent = `msgid ""\nmsgstr ""\n`;
      poContent += `"Project-Id-Version: ${this.pluginInfo.name} ${this.pluginInfo.version}\\n"\n`;
      poContent += `"Report-Msgid-Bugs-To: ${this.pluginInfo.uri}\\n"\n`;
      poContent += `"POT-Creation-Date: ${new Date().toISOString()}\\n"\n`;
      poContent += `"PO-Revision-Date: ${new Date().toISOString()}\\n"\n`;
      poContent += `"Last-Translator: ${this.pluginInfo.author} <${this.pluginInfo.email}>\\n"\n`;
      poContent += `"Language-Team: ${lang} <LL@li.org>\\n"\n`;
      poContent += `"Language: ${lang}\\n"\n`;
      poContent += `"Plural-Forms: nplurals=2; plural=n != 1;\\n"\n`;
      poContent += `"MIME-Version: 1.0\\n"\n`;
      poContent += `"Content-Type: text/plain; charset=UTF-8\\n"\n`;
      poContent += `"Content-Transfer-Encoding: 8bit\\n"\n`;
      poContent += `"X-Generator: PotGen 1.0.0\\n"\n`;
      poContent += `"X-Domain: ${this.pluginInfo.textDomain}\\n"\n\n`;

      // Read the content of the .pot file
      const potContent = fs.readFileSync(path.join(languagesDir, path.basename(this.potFile)), 'utf8');
      const regex = /#: (.*?)\nmsgid "(.*?)"\nmsgstr ""/g;
      let match;

      while ((match = regex.exec(potContent)) !== null) {
        const reference = match[1]; // Reference line
        const msgid = match[2]; // msgid
        poContent += `#: ${reference}\n`;
        poContent += `msgid "${msgid}"\nmsgstr ""\n\n`;
      }

      // Write the .po file
      fs.writeFileSync(poFile, poContent);

      console.log(`.po file generated successfully: ${path.basename(poFile)}`);

      // Recursively call the method to generate the next .po file
      setTimeout(() => {
        this.generatePoFile(languagesDir, index + 1);
      }, 2000);
    }
  }

  isValidDomain(domain) {
    return domain === this.pluginInfo.textDomain || 
           domain === 'wc-swift-qr-payment-woo' || 
           (domain === 'default' && this.pluginInfo.textDomain === 'default-domain');
  }

  decodeHtmlEntities(str) {
    return str.replace(/&#(\d+);/g, (match, dec) => String.fromCharCode(dec));
  }

  escapeString(str) {
    return str
      .replace(/\\'/g, "'")
      .replace(/\\"/g, '"')
      .replace(/\\n/g, '\n')
      .replace(/\\t/g, '\t')
      .replace(/\\\\/g, '\\');
  }
}

// Main execution
let config;
try {
  const potJsonPath = path.join(process.cwd(), 'pot.json');
  config = require(potJsonPath);
  PotGenerator.validateConfig(config);
  const potGenerator = new PotGenerator(config);
  potGenerator.generatePotFile();
} catch (error) {
  console.error('Error:', error.message);
  process.exit(1);
}