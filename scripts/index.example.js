const { unlink } = require('fs')
const { promisify } = require('util')
const zip = require('./zip')
const upload = require('./upload')

const unlinkAsync = promisify(unlink)


(async () => {
  const zipPath = await zip('../client/dist/')
  const uloaded = await upload(zipPath, {
    project: '<Project>',
    appToken: '<Token>',
    usid: '<User>',
    url: '<Url>',
  })
  console.log(' - Uploaded:18 >', uloaded); // eslint-disable-line no-console

  await unlinkAsync(zipPath)
  console.log(' - Deleted:18 >', zipPath); // eslint-disable-line no-console
})()

// npm i -D archiver@5.2.0 request@2.88.2 request-promise@4.2.6
