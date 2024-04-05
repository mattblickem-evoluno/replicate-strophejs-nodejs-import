# Cannot import strophe.js using NodeJS

```
npm i
node strophe.js
```

```
replicate-strophejs-nodejs-import/node_modules/strophe.js/src/index.js:3
import Strophe from './core.js';
^^^^^^

SyntaxError: Cannot use import statement outside a module
    at internalCompileFunction (node:internal/vm:77:18)
    at wrapSafe (node:internal/modules/cjs/loader:1288:20)
    at Module._compile (node:internal/modules/cjs/loader:1340:27)
    at Module._extensions..js (node:internal/modules/cjs/loader:1435:10)
    at Module.load (node:internal/modules/cjs/loader:1207:32)
    at Module._load (node:internal/modules/cjs/loader:1023:12)
    at Module.require (node:internal/modules/cjs/loader:1235:19)
    at require (node:internal/modules/helpers:176:18)
    at Object.<anonymous> (replicate-strophejs-nodejs-import/strophe.js:2:21)
    at Module._compile (node:internal/modules/cjs/loader:1376:14)
```

If we apply the following to `strophe.js/package.json`: 

```json
  "exports": {
    "node": {
      "import": "./dist/strophe.esm.js",
      "require": "./dist/strophe.common.js"
    }
  },
```

Then the import works, but another issue hits:

```
TypeError: _node.querySelector is not a function
    at Request.getResponse (replicate-strophejs-nodejs-import/node_modules/strophe.js/dist/strophe.common.js:3836:88)
    at Bosh._reqToData (replicate-strophejs-nodejs-import/node_modules/strophe.js/dist/strophe.common.js:4510:18)
    at Connection._connect_cb (replicate-strophejs-nodejs-import/node_modules/strophe.js/dist/strophe.common.js:2556:49)
    at Bosh._onRequestStateChange (replicate-strophejs-nodejs-import/node_modules/strophe.js/dist/strophe.common.js:4351:7)
    at XMLHttpRequest.dispatchEvent (replicate-strophejs-nodejs-import/node_modules/xhr2/lib/xhr2.js:76:20)
    at XMLHttpRequest._setReadyState (replicate-strophejs-nodejs-import/node_modules/xhr2/lib/xhr2.js:422:14)
    at XMLHttpRequest._onHttpResponseEnd (replicate-strophejs-nodejs-import/node_modules/xhr2/lib/xhr2.js:616:14)
    at IncomingMessage.<anonymous> (replicate-strophejs-nodejs-import/node_modules/xhr2/lib/xhr2.js:568:23)
    at IncomingMessage.emit (node:events:526:35)
    at endReadableNT (node:internal/streams/readable:1589:12)
```

`querySelector` is not a function because it is not implemented by the XML parsing library.

This can be fixed by doing `node.tagName === 'parsererror'` instead.
