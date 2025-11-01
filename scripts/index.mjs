import { unlink } from 'fs'
import { promisify } from 'util'
import zip from './zip.mjs'
import upload from './upload.mjs'
import creds from './creds.mjs'

import { createInterface } from 'node:readline/promises'
import { stdin as input, stdout as output } from 'node:process'

const unlinkAsync = promisify(unlink)

async function prompts(helpTextLine=' > ') {
  const rl = createInterface({ input, output })
  const response = await rl.question(helpTextLine)
  rl.close()
  return response
}


const start = async (isBackend) => {
  const envs = Object.keys(creds).join('|')
  let _env = ''
  try {
    do {
      _env = await prompts(`${_env ? 'Try again': 'Pls'}, input env[${envs}]:`);
    } while (!creds[_env])
  } catch(e) {
    console.log('\nINPUT ERROR // 28')
  }

  const zipPath = await zip(isBackend ? '../_backend/' : '../client/dist/')
  const uploaded = await upload(zipPath, {
    ...creds[_env],
    pathKey: isBackend ? 'path:back' : 'path:client',
  })
  console.log(' - Uploaded:18 >', uploaded); // eslint-disable-line no-console

  await unlinkAsync(zipPath)
  console.log(' - Deleted:18 >', zipPath); // eslint-disable-line no-console
}

const isBack = `${process.argv[2]}`.trim() === '--isBack';
start(isBack)

// npm i -D archiver@5.2.0 request@2.88.2 request-promise@4.2.6
