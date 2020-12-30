
function getConfig(request) {
//  var configParams = request.configParams;
//  var isFirstRequest = configParams === undefined;
  var config = cc.getConfig();
    /*
  config.newInfo()
    .setId('instructions')
    .setText('What academies do you want to query?');
  
  const me = BreatheCode.getMe();
  var academyOptions = [];
  const options = me.roles.map(function(r){
    return config.newOptionBuilder()
    .setLabel(r.academy.name)
    .setValue(r.academy.slug);
  })
  
  var info1 = config.newSelectMultiple()
  .setId("academies")
  .setName("Academies")
  .setHelpText("Select the academies you're interested in.")
  .setAllowOverride(true);
  
  options.forEach(function(o){
     info1.addOption(o)
  })
  */
  config.setIsSteppedConfig(false);
  return config.build();
}
