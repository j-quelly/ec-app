module.exports = (grunt) ->
	grunt.initConfig
		pkg: grunt.file.readJSON("package.json") 
		path: require "path"


		# list our available tasks
		availabletasks:
			tasks:
				options:
					filter: "include", 
					tasks: [ 
						"serve-dev"
					]
					descriptions:
						"serve-dev": "Boots up server and opens your default browser.",
						"build" : "Prepares assets for production."


		# runs tasks concurrently				
		concurrent:
			dev: [
				"nodemon:dev",
				"watch"
			]
			options:
				logConcurrentOutput: true


		# boots up nodemon
		nodemon:
			dev:
				scripts: "bin<%= path.sep %>www"
				options:
					env: { 
						"NODE_ENV": "dev" 
					}				
					delay: 1000
					callback: (nodemon) ->

						nodemon.on "log", (event) ->
							console.log event.colour
                        
						nodemon.on "config:update", ->
							setTimeout ->
								require("open") "http://localhost:3000"
							, 1000

						nodemon.on "restart", -> 
							setTimeout ->
								require("fs").writeFileSync(".rebooted", "rebooted")
							, 1000


		# wire bower dependencies
		wiredep:
			tasks:  
				directory: "bower_components"
				src: [
					"views<%= path.sep %>layout.jade"
				]
				cwd: './'
				exclude: [
					"bin/materialize.css"
				]
				ignorePath: /^(\.\.\/\.\.\/)/


		# compile sass to css
		sass:
			dev:
				options:  
					compress: false 
				files: [
					"public<%= path.sep %>css<%= path.sep %>app.css" : "sass<%= path.sep %>materialize.scss"
				]
			build:
				options:  
					compress: false 
				files: [
					".tmp<%= path.sep %>css<%= path.sep %>app.css" : "sass<%= path.sep %>materialize.scss"
				]				


		# watches files and runs tasks when the files change
		watch:
			options:
				livereload: true

			sassfiles:
				files: [
					"sass<%= path.sep %>**<%= path.sep %>*.scss"
				]
				tasks: ['sass:dev']
				options:
					spawn: false

			jadefiles:
				files: [
					"views<%= path.sep %>**<%= path.sep %>*.jade"
				]
				options:
					spawn: false

			jsfiles:
				files: [
					"public<%= path.sep %>js<%= path.sep %>**<%= path.sep %>*.js"
				]					
				options:
					spawn: false


		# concat bower components
		bower_concat: 
			build: 
	    		dest: 'public<%= path.sep %>js<%= path.sep %>lib.js' 		    	
		    	dependencies: 
		    		'materialize' : 'jquery'
		    		'angular-materialize' : 'materialize'
		    	include: [
		    		'jquery',
		    		'materialize',
		    		'angular',
		    		'angular-route',
		    		'angular-materialize',
		    		'angular-animate',
		    		'angular-cookies'
		    	]



		# minify js
		uglify:
			build:
				options:
					beautify: false
				files:	
					"public<%= path.sep %>js<%= path.sep %>lib.min.js" : [
																			'public<%= path.sep %>js<%= path.sep %>lib.js',
																			'bower_components<%= path.sep %>materialize<%= path.sep %>bin<%= path.sep %>materialize.js'
																	 	],
					"public<%= path.sep %>js<%= path.sep %>app.min.js" : [
																			'.tmp<%= path.sep %>js<%= path.sep %>app.js',
																			'.tmp<%= path.sep %>js<%= path.sep %>controllers.js',
																			'.tmp<%= path.sep %>js<%= path.sep %>services.js',
																			'.tmp<%= path.sep %>js<%= path.sep %>directives.js',
																		]									


		# compress our css files		
		cssmin:
			build:
				files:
					"public<%= path.sep %>css<%= path.sep %>app.min.css" : ['.tmp<%= path.sep %>css<%= path.sep %>app.css']


		# annotate angular dependencies
		ngAnnotate:
			options:
				singleQuotes: true
			app:
				files:
					'.tmp<%= path.sep %>js<%= path.sep %>app.js' : ['public<%= path.sep %>js<%= path.sep %>app.js'],
					'.tmp<%= path.sep %>js<%= path.sep %>controllers.js' : ['public<%= path.sep %>js<%= path.sep %>controllers.js'],
					'.tmp<%= path.sep %>js<%= path.sep %>services.js' : ['public<%= path.sep %>js<%= path.sep %>services.js'],
					'.tmp<%= path.sep %>js<%= path.sep %>directives.js' : ['public<%= path.sep %>js<%= path.sep %>directives.js'],

		# replace dev dep with build dependencies
		'string-replace': 
			dev:
				files:
					'views<%= path.sep %>layout.jade' : 'views<%= path.sep %>layout.jade'
				options:
					replacements: [
						{
							pattern: 'link(rel="stylesheet", href="css/app.min.css")' 
							replacement: 'link(rel="stylesheet", href="css/app.css")' 
						},
						{
							pattern: "script(src='js/lib.min.js')"
							replacement: ""
						},																		

						# angular dependencies
						{
							pattern: "// app"
							replacement: "script(src='js/app.js')"
						},	
						{
							pattern: "// directives"
							replacement: "script(src='js/directives.js')"
						},		
						{
							pattern: "// controllers"
							replacement: "script(src='js/controllers.js')"
						},
						{
							pattern: "script(src='js/app.min.js')"
							replacement: "script(src='js/services.js')"
						},	
						{
							pattern: "// livereload"
							replacement: "script(src='//localhost:35729/livereload.js')"
						}																		
					]								
			prebuild:
				files:
					'views<%= path.sep %>layout.jade' : 'views<%= path.sep %>layout.jade'
				options:
					replacements: [
						{
							pattern: 'link(rel="stylesheet", href="css/app.css")' 
							replacement: 'link(rel="stylesheet", href="css/app.css")' 
						},					
						{
							pattern: "script(src='../bower_components/jquery/dist/jquery.js')"
							replacement: ""
						},
						{
							pattern: "script(src='../bower_components/Materialize/bin/materialize.js')"
							replacement: ""
						},					
						{
							pattern: "script(src='../bower_components/angular/angular.js')"
							replacement: ""
						},
						{
							pattern: "script(src='../bower_components/angular-route/angular-route.js')"
							replacement: ""
						},
						{
							pattern: "script(src='../bower_components/angular-materialize/src/angular-materialize.js')"
							replacement: ""
						},
						{
							pattern: "script(src='../bower_components/angular-animate/angular-animate.js')"
							replacement: ""
						},						
						{
							pattern: "script(src='../bower_components/angular-cookies/angular-cookies.js')"
							replacement: "script(src='js/lib.min.js')"
						},				
						

						# angular dependencies
						{
							pattern: "script(src='js/app.js')"
							replacement: "// app"
						},	
						{
							pattern: "script(src='js/directives.js')"
							replacement: "// directives"
						},		
						{
							pattern: "script(src='js/controllers.js')"
							replacement: "// controllers"
						},
						{
							pattern: "script(src='js/services.js')"
							replacement: "script(src='js/app.min.js')"
						},
						{
							pattern: "script(src='//localhost:35729/livereload.js')"
							replacement: "// livereload"
						}
					]	
			postbuild:
				files:
					'views<%= path.sep %>layout.jade' : 'views<%= path.sep %>layout.jade'
				options:
					replacements: [
						{
							pattern: 'link(rel="stylesheet", href="css/app.css")' 
							replacement: 'link(rel="stylesheet", href="css/app.min.css")' 
						}	
					]													


		# automagically prefix our css
		postcss:
			options:
				map: false,
				processors: [
					require('pixrem')(), # add fallbacks for rem units
        			require('autoprefixer')({browsers: ['last 2 versions']}), # add vendor prefixes
        		]
			build:
				src: [
						'.tmp<%= path.sep %>css<%= path.sep %>app.css'
					] 


		# compile jade to html
		jade:
			compile:
				options:
					data:
						debug: false
					pretty: true
				files:
					".tmp<%= path.sep %>index.html" : ["views<%= path.sep %>index.jade", "views<%= path.sep %>partials<%= path.sep %>*.jade"]


		# remove unused css
		uncss:
			build:
				files: { 
					'.tmp<%= path.sep %>css<%= path.sep %>app.optimized.css' : ['.tmp<%= path.sep %>index.html']
				}


		# cleans folders for us
		clean:
			tmp:
				src: ['.tmp']


	# require our tasks
	require('time-grunt')(grunt);
	require('load-grunt-tasks')(grunt); 
	grunt.loadNpmTasks "grunt-string-replace"


	# register our grunt tasks
	grunt.registerTask("default", ["availabletasks"])
	grunt.registerTask("serve-dev", ["string-replace:dev", "wiredep", "sass:dev", "concurrent:dev"])
	grunt.registerTask("build", [
		"clean:tmp",
		"bower_concat:build", 
		"ngAnnotate", 
		"sass:build",
		"postcss:build",
		"string-replace:prebuild", 
		"jade:compile", 
		# "uncss:build", 
		"cssmin:build", 
		"uglify:build",
		"string-replace:postbuild", 
		"nodemon"
	])