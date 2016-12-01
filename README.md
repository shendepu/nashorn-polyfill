# Nashorn Polyfill

This is the polyfill for Nashorn:

- [global, window, self, console, process](./global-polyfill.js)
- [Blob](./lib/blob-polyfill.js)
- [setTimeout, clearTimeout, setInterval, clearInterval](./lib/timer-polyfill.js)
- [URLSearchParams](https://www.npmjs.com/package/url-search-params)
- [XmlHttpRequest](./lib/xml-http-request.polyfill.js)
- [core-js:shim](https://github.com/zloirock/core-js/blob/master/shim.js)

Missing polyfill:

- FormData


## Required Java Jars:

gradle
```

    compile group: 'org.apache.httpcomponents', name: 'httpclient', version: '4.5.2'
    compile group: 'org.apache.httpcomponents', name: 'httpasyncclient', version: '4.1.2'
    compile group: 'org.apache.commons', name: 'commons-pool2', version: '2.4.2'
```

# License

[MIT](./LICENSE)
