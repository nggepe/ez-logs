const fs = require('fs')
const shell = require('shelljs')
const awPath = require('path')

module.exports = ({ basePath = "" }) => {
  var date = new Date()
  var fileName = date.getDate().toString() + "-" + date.getMonth() + "-" + date.getFullYear() + ".log"

  return {
    log: (message, cb = (totalLog) => { }) => {
      submitLog({ message: message, fileName: fileName, basePath: basePath, type: "logs", cb: cb })
    },
    error: (message, cb = (totalError) => { }) => {
      submitLog({ message: message, fileName: fileName, basePath: basePath, type: "errors", cb: cb })
    }
  }
}

function submitLog({ message = "", fileName, basePath, type = "", cb = (value) => { } }) {
  let dir = awPath.join(basePath, type)
  const fileDir = dir + "/" + fileName
  fs.access(fileDir, err => {
    if (err) {
      shell.mkdir('-p', dir)
      fs.writeFile(fileDir, `========================\n${fileName.split(".")[0]}\n================================================================================\n\n${message}\n\n================================================================================`, e => {
        if (e) console.error(e)
      })
    }
    else {
      fs.appendFile(fileDir, `================================================================================\n\n${message}\n\n`, err => {
        if (err) console.log(err)
      })
    }
  })

  fileCounter(type, basePath, cb)
}

function fileCounter(type, basePath, cb = (value) => { }) {
  const fileDir = basePath + "/file-counter.log"
  fs.access(fileDir, err => {
    if (err) {
      fs.writeFile(fileDir, type === 'logs' ? `logs = 1\nerrors = 0` : `logs = 0\nerrors = 1`, e => {
        if (e) console.error(e)
      })
    }
    else {
      fs.readFile(fileDir, 'utf8', (err, file) => {
        if (err) console.error(err)
        else {
          let data = {}
          file.split("\n").forEach((v, i) => {
            let el = v.split(" = ")
            data[el[0]] = parseInt(el[1])
          })
          if (typeof data[type] !== undefined) writeTheCounter(data, cb, type, fileDir)
        }
      })
    }
  })
}

function writeTheCounter(data, cb, type, fileDir) {
  data[type] += 1
  let toCb = {}
  toCb[type] = data[type]
  cb(toCb)

  let toWrite = []
  for (const key in data) {
    toWrite.push(`${key} = ${data[key]}`)
  }

  fs.writeFile(fileDir, toWrite.join("\n"), e => {
    if (e) console.error(e)
  })
}
