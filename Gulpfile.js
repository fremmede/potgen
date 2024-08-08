var gulp = require('gulp');
var gulpPo2Mo = require('gulp-po2mo');

// Tarea para convertir archivos .po a .mo
gulp.task('po2mo', function() {
    console.log('Convirtiendo archivos .po a .mo...'); // Log para verificar ejecución
    return gulp.src('languages/**/*.po')               // Selecciona todos los archivos .po en la carpeta languages
        .pipe(gulpPo2Mo())                            // Convierte .po a .mo
        .pipe(gulp.dest('languages'));                // Guarda los archivos .mo en la misma carpeta
});

// Tarea por defecto para observar cambios en archivos .po y .pot
gulp.task('default', function() {
    console.log('Observando cambios en archivos .po y .pot...'); // Log para verificar observación
    gulp.watch([
        'languages/**/*.po', // Observa todos los archivos .po
        'languages/**/*.pot' // Observa todos los archivos .pot
    ], gulp.series('po2mo')); // Ejecuta la tarea po2mo al detectar cambios
});

// Tarea para convertir un archivo .po específico a .mo
gulp.task('lang', function() {
    const specificLang = process.argv.find(arg => arg.includes('--lang='));

    if (!specificLang) {
        console.error('Por favor, proporciona un código de idioma. Ejemplo: gulp lang --lang=es_ES');
        return Promise.reject('Código de idioma no proporcionado.');
    }

    const lang = specificLang.split('=')[1];
    console.log(`Convirtiendo archivos que coincidan con ${lang}.po...`);

    // Crea un flujo de archivos que coincidan con el patrón
    const stream = gulp.src([
      `languages/**/*${lang}.po`,   // Coincide con wc-swift-qr-payment-woo-es_ES.po
      `languages/**/${lang}.po`     // Coincide con es_ES.po
    ])
    .pipe(gulpPo2Mo())                // Convierte .po a .mo
    .pipe(gulp.dest('languages'))     // Guarda los archivos .mo en la misma carpeta
    .on('end', function() {
        if (this._fileCount > 0) {
            console.log(`Conversión completada para ${lang}.po`);
        }
    });

    // Manejo de errores del flujo
    stream.on('error', function(err) {
        console.error('Error durante la conversión:', err.message);
    });

    // Verifica si hay archivos en el flujo
    return new Promise((resolve, reject) => {
    let fileCount = 0;

    stream.on('data', function(file) {
        fileCount++;
    });

    stream.on('end', function() {
        if (fileCount === 0) {
            console.error(`No se encontraron archivos que coincidan con ${lang}.po`);
            resolve();
        } else {
            console.log(`Se encontraron archivos que coinciden con ${lang}.po`);
            resolve();
        }
    });
    });
});