import { build } from './src/app.js'
import https from 'https'
import http from 'http'
import fs from 'fs'

const run = async () => {
  const port = 4008;
  const enableHttpsForDev = false;

  const app = await build()

  if (enableHttpsForDev) {
    https
      .createServer(
        {
          key: fs.readFileSync('server-dev-only.key'),
          cert: fs.readFileSync('server-dev-only.cert')
        },
        app
      )
      .listen(port, () => console.log(`Server running on port ${port}`))
  } else {
    http
      .createServer(app)
      .listen(port, () => console.log(`Server running on port ${port}`))
  }
}

run()