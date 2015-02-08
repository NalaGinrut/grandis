function myCallback (data) {
  $('#demo').innerHTML = data.name;
}

function start () {
  //$('#demo').innerHTML = $('#mmr input').length;

  var req = HTTP_Request('jsonp');
  req.send('http://api.szdiy.org/jsonp/myCallback');
}

