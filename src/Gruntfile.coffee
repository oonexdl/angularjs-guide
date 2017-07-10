module.exports = (grunt) ->
  grunt.initConfig
    pkg: grunt.file.readJSON 'package.json'
    sass:
      dist:
        options:
          sourcemap: 'none'
        files: [{
          expand: true,
          cwd: 'static/scss'
          src: ['app.scss']
          dest: 'dist/css'
          ext: '.css'
        }]
    coffee:
      dist:
        options:
          bare: true
        expand: true,
        cwd: 'static/coffee'
        src: ['*.coffee']
        dest: 'dist/js'
        ext: '.js'
    copy:
      dist:
        files: [
          {expand: true, cwd: 'static/img', src: ['**'], dest: 'dist/img'}
          {expand: true, cwd: 'static/templates', src: ['**'], dest: 'dist/templates'}
        ]
    clean: ['dist/*']
    watch:
      js:
        files: [
          'static/{coffee,templates,scss}/*.{coffee,html,scss}'
          'ppt/*.html'
          'ppt/md/*.md'
        ]
        tasks: ['build']
        options:
          livereload: true
          reload: true

  grunt.loadNpmTasks 'grunt-contrib-sass'
  grunt.loadNpmTasks 'grunt-contrib-coffee'
  grunt.loadNpmTasks 'grunt-contrib-copy'
  grunt.loadNpmTasks 'grunt-contrib-clean'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.registerTask 'default', ['watch']
  grunt.registerTask 'build', [
    'clean'
    'coffee'
    'sass'
    'copy'
  ]
