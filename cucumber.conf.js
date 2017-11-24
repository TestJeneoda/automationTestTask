exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  baseUrl: 'https://www.thomascook.com/',
  capabilities: {
      browserName:'chrome'
  },
  framework: 'custom', 
  frameworkPath: require.resolve('protractor-cucumber-framework'), 
  specs: [
    'features/*.feature'    
  ],
  cucumberOpts: {
    require: ['features/step_definitions/*.js'], 
    tags: [],
    strict: true,
    'dry-run': false,             
    compiler: ['js:babel-register'],                
    profile: false,
    'no-source': true                   
  },
  onPrepare: function () { 
    browser.manage().window().maximize();
  }
};
