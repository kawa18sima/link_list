let app = new Vue({
  el:"#app",
  data: {
    load:true,
    links:[],
    hasError:false
  },
  methods:{
    moveSite:function(url){
      chrome.tabs.create({url:url, active:false});
    }
  },
  created:function(){
    chrome.tabs.query({active: true, currentWindow:true}, function(tab){
        getSite(tab[0].url);
      }.bind(this));
  }
});


function getSite(url){
  let req = new XMLHttpRequest();
  req.onreadystatechange = function(){
    if(this.status === 200){
      const aList = this.responseXML.getElementsByTagName('a');
      let array = [];
      for(let i=0; i<aList.length; i++){
        let link = aList[i].getAttribute("href");
        if(link === null)continue;
        if(link.match(/^http/)){
          array.push(link);
        }
      }
      app.links = array;
      app.load = false;
    }
  };
  req.open('GET', url);
  req.responseType = "document";
  req.send();
}