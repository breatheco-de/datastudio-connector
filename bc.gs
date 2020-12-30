

var BreatheCode = {
//  host: "https://breathecode.herokuapp.com",
  host: "https://8000-e7f7c9f7-d9b4-41e7-9e9e-c5399f297d9a.ws-us03.gitpod.io",
  token: null,
  validateToken: function(token){
    var response = UrlFetchApp.fetch(this.host+'/v1/auth/token/'+token); 
    Logger.log(response.getContentText());
    if(response.getResponseCode() == 200){
      this.token =  token;
      return true;
    }
    
    return false;
  },
  fetch: function(url, options){
    
    if(this.token == null){ 
      var userProperties = PropertiesService.getUserProperties();
      this.token = userProperties.getProperty('dscc.key');
    }
    
    if(!options || options===undefined) options = {}
    var resp = UrlFetchApp.fetch(this.host+url, Object.assign(options, {
         headers: { "Authorization": "Token "+this.token },
    })); 

    const content = resp.getContentText();
    Logger.log("content", content)
    if(resp.getResponseCode() == 200){
      return JSON.parse(content);
    }
    else throw Error(JSON.parse(resp.getContentText()));
  },
  getMe:function(){
    try{
      
      var data = this.fetch('/v1/auth/user/me'); 
      Logger.log(data);
      return data;
    }
    catch(error){
      Logger.log("Error", error);
      throw error;
    }
  },
  getLeads:function(params){
    try{
      
      const qs = Object.keys(params).map(function(key){ return key+'='+params[key]; }).join('&');
      var data = this.fetch('/v1/marketing/report/lead?'+qs); 
      Logger.log(data);
      return data;
    }
    catch(error){
      Logger.log("Error", error);
      throw error;
    }
  }
  
}
