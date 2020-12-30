var cc = DataStudioApp.createCommunityConnector();
var types = cc.FieldType;

var dimensions = {
  date: { key: "created_at__date", label: "Creation Date", type: types.YEAR_MONTH_DAY },
  total_leads: { key: "total_leads", label: "Number of leads", type: types.NUMBER, hide: true },
  academy: { key: "location", label: "Academy Slug", type: types.TEXT },
  course: { key: "course", label: "Course Slug", type: types.TEXT },
  country: { key: "country", label: "Country name", type: types.TEXT },
  language: { key: "language", label: "Lang Code", type: types.TEXT },
  city: { key: "city", label: "City Name", type: types.TEXT },
  utm_url: { key: "utm_url", label: "UTM URL", type: types.TEXT },
  utm_medium: { key: "utm_medium", label: "UTM Medium", type: types.TEXT },
  utm_campaign: { key: "utm_campaign", label: "UTM Campaign", type: types.TEXT },
  utm_source: { key: "utm_source", label: "UTM Source", type: types.TEXT },
  browser_lang: { key: "browser_lang", label: "Browser Lang", type: types.TEXT },
  lead_type: { key: "lead_type", label: "Lead Type", type: types.TEXT },
}

function responseToRows(requestedFields, data) {
  // Transform parsed data and filter for requested fields
  return data.map(function(d) {
    var row = [];
    requestedFields.asArray().forEach(function (field) {
      row.push(d[dimensions[field.getId()].key]);
    });
    return { values: row };
  });
}

function getData(request) {
  var params = {};
  var requestedFieldIds = request.fields.map(function(field) { 
    return field.name;
  });
  var requestedFields = getFields().forIds(requestedFieldIds);
  Logger.log("requestedFields", requestedFields);

  if(request.dateRange){
    params.start = request.dateRange.startDate;
    params.end = request.dateRange.endDate;
  }
  params.by = requestedFieldIds.filter(function(f){ return dimensions[f].hide != true }).map(function(f){ return dimensions[f].key }).join(",");
  // Fetch and parse data from API
  var data = BreatheCode.getLeads(params);

  var rows = responseToRows(requestedFields, data);

  return {
    schema: requestedFields.build(),
    rows: rows
  };
}
