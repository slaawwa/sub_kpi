import path from 'node:path'
import { fileURLToPath } from 'node:url'
import RP from 'request-promise'
import { stat, createReadStream } from 'node:fs'
import { promisify } from 'util'


const statAsync = promisify(stat)

const existsAsync = fPath => statAsync(fPath)
  .then(({ size = 0 } = {}) => size > 0)
  .catch(err => err?.code !== 'ENOENT')

const { post } = RP;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (filePath, {
  to,
  type = 'zip',
  project,
  appToken,
  usid,
  url,
} = {}) => {
  try {
    let has = await existsAsync(filePath)
    const file = has ? filePath : `${__dirname}/${filePath}`
    has = await existsAsync(file)
    console.log(' - has:14 >', has) // eslint-disable-line no-console
    if (!has || !project) {
      throw new Error('"file" and "project" is required')
    }

    const data = await post({
      url,
      formData: {
        type,
        project,
        appToken,
        usid,
        file: createReadStream(file),
        ...(!to ? null : { to }),
      },
    })
    if (data !== 'true') {
      throw new Error(data);
    }
    console.log(' - result:81 >', data) // eslint-disable-line no-console
    return true
  } catch (err) {
    console.log('Error:::', `${err?.message || err}`) // eslint-disable-line no-console
  }
}
