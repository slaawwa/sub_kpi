const { post } = require('request-promise')
const { exists, createReadStream } = require('fs')
const { promisify } = require('util')

const existsAsync = promisify(exists);


module.exports = async (filePath, {
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
    console.log(' - file:14 >', file)
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
    console.log(' - result:81 >', data, ) // eslint-disable-line no-console
    return true
  } catch (err) {
    console.log('Error:::', `${err?.message || err}`) // eslint-disable-line no-console
  }
}
