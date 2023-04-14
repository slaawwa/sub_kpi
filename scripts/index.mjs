import { unlink } from 'fs'
import { promisify } from 'util'
import zip from './zip.mjs'
import upload from './upload.mjs'
import creds from './creds.mjs'

const unlinkAsync = promisify(unlink)


const start = async (isBackend) => {
  console.log(' - isBackend:12 >', isBackend); // eslint-disable-line no-console

  const zipPath = await zip(isBackend ? '../_backend/' : '../client/dist/')
  const uploaded = await upload(zipPath, {
    ...creds,
    pathKey: isBackend ? 'path:back' : 'path:client',
  })
  console.log(' - Uploaded:18 >', uploaded); // eslint-disable-line no-console

  await unlinkAsync(zipPath)
  console.log(' - Deleted:18 >', zipPath); // eslint-disable-line no-console
}

const isBack = `${process.argv[2]}`.trim() === '--isBack';
start(isBack)

// npm i -D archiver@5.2.0 request@2.88.2 request-promise@4.2.6
