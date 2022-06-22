module.exports = function(grunt) {
    // Gruntfile.js
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        // configure uglify to minify js files -------------------------------------
        uglify: {
            build: {
            files: [{
                expand: true,
                src: ['**/*.js', '!**/*.mini.js'],
                dest: 'build/scripts',
                cwd: 'public/agil client/www/js',
                ext:  '.min.js'
            }]
            }
        },
        watch: {
            uglify: {
                files: ['public/agil client/www/js/**/*.js', '!public/agil client/www/js/**/*.mini.js'],
                tasks: ['uglify'],
                options: {
                    spawn: false,
                },
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default', ['watch']);
}