function getFields(request) {
  var cc = DataStudioApp.createCommunityConnector();
  var fields = cc.getFields();
  var types = cc.FieldType;
  var aggregations = cc.AggregationType;
  
  Object.keys(dimensions).forEach(function(key){
    if(dimensions[key].hide != true){
      fields.newDimension()
      .setId(key)
      .setName(dimensions[key].label)
      .setType(dimensions[key].type); 
    }
  });
  
  fields.newMetric()
    .setId('total_leads')
    .setName('Total Leads')
    .setType(types.NUMBER)
    .setAggregation(aggregations.SUM);

  Logger.log(fields);
  return fields;
}

function getSchema(request) {
  var fields = getFields(request).build();
  Logger.log("fields", fields);
  return { schema: fields };
}
