#!/usr/bin/env node
(function(){
    
    if(process.argv.length !== 4){
        console.log("Usage: swagger-doc <swagger json file> <output directory>");
        process.exit();
    }   
    
    var swaggerJsonFile = process.argv[2];
    var outputDir = process.argv[3]
    console.log(swaggerJsonFile);
    // Load bootprint 
    require('bootprint')
    // Load bootprint-swagger 
    .load(require('bootprint-swagger'))
    // Customize configuration, override any options 
    .merge({ /* Any other configuration */})
    // Specify build source and target 
    .build(swaggerJsonFile, outputDir)
    // Generate swagger-documentation into "target" directory 
    .generate()
    .done(console.log);
})();