(function(){
// Load bootprint 
require('bootprint')
// Load bootprint-swagger 
.load(require('bootprint-swagger'))
// Customize configuration, override any options 
.merge({ /* Any other configuration */})
// Specify build source and target 
.build('swagger.json', 'bin')
// Generate swagger-documentation into "target" directory 
.generate()
.done(console.log)
})();