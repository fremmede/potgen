var gulp = require('gulp');
var gulpPo2Mo = require('gulp-po2mo');
const path = require('path');
const kleur = require('kleur');

// Function used by default to convert .po files to .mo and watch for changes
function convertPoToMo(filePath) {
    const fileName = path.basename(filePath);
    console.log(kleur.cyan(`Converting ${fileName} to .mo`));

    return gulp.src(path.resolve(filePath), { allowEmpty: true })
        .pipe(gulpPo2Mo())
        .pipe(gulp.dest(path.dirname(filePath)))
        .on('end', function() {
            console.log(`Conversion completed ${kleur.green('✓')}\n`);
        })
        .on('error', function(err) {
            console.error(kleur.red(`Error converting ${fileName}:`), err.message);
        });
}

// Default task to watch for changes in .po files
gulp.task('default', function(done) {
    console.log(kleur.cyan('Watching for changes in .po files\n'));

    gulp.watch('languages/**/*.po', { ignoreInitial: true })
        .on('change', function(filePath) {
            return convertPoToMo(filePath);
        });

});

// Task to convert all .po files to .mo
gulp.task('po2mo', function(done) {
    console.log(kleur.cyan('Converting .po files to .mo')); // Log to verify execution

    return gulp.src('languages/**/*.po') // Selects all .po files in the languages folder
        .pipe(gulpPo2Mo()) // Converts .po to .mo
        .pipe(gulp.dest('languages')) // Saves .mo files in the same folder
        .on('end', function() {
            console.log(`Conversion completed ${kleur.green('✓')}\n`); // Log the completion message
            done(); // Call done() to signal the end of the task
        })
        .on('error', function(err) {
            console.error(kleur.red(`Error:`), err.message);
            done(err); // Pass the error to done() if there's an error
        });
});

// Task to convert a specific .po file to .mo
gulp.task('lang', function() {
    const specificLang = process.argv.find(arg => arg.includes('--lang='));

    if (!specificLang) {
        console.error('Please provide a language code. Example: gulp lang --lang=es_ES');
        return Promise.reject('Language code not provided.');
    }

    const lang = specificLang.split('=')[1];
    console.log(kleur.cyan(`Converting files matching ${lang}.po\n`));

    // Create a file stream matching the pattern
    const stream = gulp.src([
      `languages/**/*${lang}.po`,   // Matches domain_text.po
      `languages/**/${lang}.po`     // Matches es_ES.po
    ])
    .pipe(gulpPo2Mo())                // Converts .po to .mo
    .pipe(gulp.dest('languages'))     // Saves .mo files in the same folder
    .on('end', function() {
        if (this._fileCount > 0) {
            console.log(`Converting`);
        }
    });

    // Error handling for the stream
    stream.on('error', function(err) {
        console.error('Error during conversion:', err.message);
    });

    // Check if there are files in the stream
    return new Promise((resolve, reject) => {
        let fileCount = 0;

        stream.on('data', function(file) {
            fileCount++;
        });

        stream.on('end', function() {
            if (fileCount === 0) {
                console.error(kleur.red(`No files found matching ${lang}.po\n`));
                resolve();
            } else {
                console.log(kleur.cyan(`Files found matching ${lang}.po`));
                console.log(`Conversion completed for ${lang}.po ${kleur.green('✓')}\n`);
                resolve();
            }
        });
    });
});