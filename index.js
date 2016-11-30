if (global._nashornPolyfill) {
  throw new Error("only one instance of nashorn-polyfill is allowed")
}
global._nashornPolyfill = true

import 'core-js/shim'


import 'core-js/library/web/timers'
import 'core-js/library/fn/set-timeout'
import 'core-js/library/fn/set-interval'

import 'core-js/library/web/immediate'
import 'core-js/library/fn/set-immediate'
import 'core-js/library/fn/clear-immediate'

import './lib/blob-polyfill'
import './lib/xml-http-request-polyfill'
import URLSearchParams from 'url-search-params'


global.URLSearchParams = URLSearchParams

