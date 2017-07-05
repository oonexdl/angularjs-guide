module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      js: {
        files: [
          '{js,templates,css}/*.{js,html,css}',
          'ppt/*.html',
          'ppt/md/*.md'
        ],
        tasks: [],
        options: {
          livereload: true,
          reload: true
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.registerTask('default', ['watch']);
};
