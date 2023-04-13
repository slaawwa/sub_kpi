import { unlink } from 'fs'
import { promisify } from 'util'
import zip from './zip.mjs'
import upload from './upload.mjs'

const unlinkAsync = promisify(unlink)


const start = async () => {
  const zipPath = await zip('../dist/')
  const uloaded = await upload(zipPath, {
    project: '<Project>',
    appToken: '<Token>',
    usid: '<User>',
    url: '<Url>',
  })
  console.log(' - Uloaded:18 >', uloaded); // eslint-disable-line no-console

  await unlinkAsync(zipPath)
  console.log(' - Deleted:18 >', zipPath); // eslint-disable-line no-console
}

start()

// npm i -D archiver@5.3.1 request@2.88.2 request-promise@4.2.6
