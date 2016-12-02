(function (context) {
  var url = 'http://httpbin.org/ip';
  var request = new Request(url);
  var xhr = new XMLHttpRequest();

  xhr.onload = function() {

    print('onload...')
    var options = {
      status: xhr.status,
      statusText: xhr.statusText,
      headers: parseHeaders(xhr.getAllResponseHeaders() || '')
    }
    options.url = 'responseURL' in xhr ? xhr.responseURL : options.headers.get('X-Request-URL')
    var body = 'response' in xhr ? xhr.response : xhr.responseText

    var response = new Response(body, options);
    print(JSON.stringify(response));
    if (response.status != 200) throw new Error ('Fail to get url ' + url);
  }

  xhr.ontimeout = function() {
    context.System.err.print('Network request failed')
  }

  xhr.open('GET', url);

  xhr.send(typeof request._bodyInit === 'undefined' ? null : request._bodyInit);

})(this);
