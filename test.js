function myCallback (data) {
  $('#demo').innerHTML = data.name;
}

function ajax_callback (data) {
  $('#demo').innerHTML = data;
}

function start () {
  //$('#demo').innerHTML = $('#mmr input').length;

  //var http = HTTP('jsonp');
  //http.get('http://api.szdiy.org/jsonp/myCallback');

  var http = HTTP('ajax', ajax_callback);
  http.get('/test');
}

