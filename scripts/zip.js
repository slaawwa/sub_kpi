const archiver = require('archiver')
const { existsSync, mkdirSync, createWriteStream } = require('fs')

if (!existsSync(`${__dirname}/builds/`)) {
  mkdirSync(`${__dirname}/builds/`);
}

module.exports = (distPath, globMap=false) => {
  return new Promise((res, rej) => {
    const d = new Date()
    const f = n => `${n > 9 ? '' : 0}${n}` /* format */
    const date = `${d.getFullYear()}-${f(d.getMonth())}-${f(d.getDate())}_${f(d.getHours())}_${f(d.getMinutes())}`
    const buildPath = `${__dirname}/builds/build_${date}.zip`;
    const output = createWriteStream(buildPath)

    const archive = archiver('zip', {
      zlib: { level: 9 } // Sets the compression level.
    })

    output
      // .on('end', function() {
      //   console.log('Data has been drained')
      // })
      .on('close', function() {
        console.log(archive.pointer() + ' total bytes') // eslint-disable-line no-console
        console.log('archiver has been finalized and the output file descriptor has closed.') // eslint-disable-line no-console
        res(buildPath)
      })

    archive.on('error', function(err) {
      throw err
      rej(err) // eslint-disable-line
    })
    archive.pipe(output)
    archive.directory(`${__dirname}/${distPath}`, globMap)
    archive.finalize()
  })
}
