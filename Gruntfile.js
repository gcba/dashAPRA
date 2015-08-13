'use strict';
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                files: {
                    'client/css/app.css': 'client/css/app.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass','cssmin','beep:2']
            }
        },
        cssmin: {
            target:{
                files:{
                    'client/css/app.min.css': 'client/css/app.css'
                }
            }
        }
    });


    //Register modules to user
    grunt.loadNpmTasks('grunt-beep');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');

    //Register tasks
    grunt.registerTask('default', ['watch']);
};