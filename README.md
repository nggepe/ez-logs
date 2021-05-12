# ez-logs
It is a node-js simple logger.

# Features
1. Write your log at your log path with the <code>log</code> subfolder
2. Write your error log at your log path with the <code>error</code> subfolder
3. Write the error/log counter at your log path
4. If you need the log or error counter, you can use the <code>callback</code> function. Actually it's can be use for <code>warn</code>, For example, if you want to send an email when the log as many as 2000.

# Installing
1. Download: run <code>npm install @nggepe/ez-logs</code>
2. Import:

```javascript
const log = require('@nggepe/ez-logs')
```

# Usage

This. package used to write logs file into your projects.
so you can create your own helper to declare the log.

example helper in express:

```javascript
const ezLog = require('@nggepe/ez-logs')
const basePath = __dirname
module.exports = {
  log: () => {
    const dir = path.join(basePath, "log")
    const logs = ezLog({ basePath: dir })
    return {
      sign: (req) => logs.log(`${JSON.stringify(req.method)} ${JSON.stringify(req.url)}\nPARAMS:\t${JSON.stringify(req.params)}\nQUERY:\t${JSON.stringify(req.query)}\nHEADERS:\t${JSON.stringify(req.headers)}\nBODY:\t${JSON.stringify(req.body)}`,
        (totalLog) => {
          // console.log(totalLog)
        }),
      res: (req, res) => logs.log(`${JSON.stringify(req.method)} ${JSON.stringify(req.url)}\nPARAMS:\t${JSON.stringify(req.params)}\nQUERY:\t${JSON.stringify(req.query)}\nHEADERS:\t${JSON.stringify(req.headers)}\nBODY:\t${JSON.stringify(req.body)}\nRESPONSE: ${JSON.stringify(res)}`,
        (totalLog) => {
          // console.log(totalLog)
        }),
      error: (err, req) => logs.error(`${JSON.stringify(req.method)} ${JSON.stringify(req.url)}\nPARAMS:\t${JSON.stringify(req.params)}\nQUERY:\t${JSON.stringify(req.query)}\nHEADERS:\t${JSON.stringify(req.headers)}\nBODY:\t${JSON.stringify(req.body)}\nERROR:\t${err}`,
        (totalError) => {
          // console.log(totalError)
        }
      )
    }
  }
}
```
