import express from 'express'
import cors from 'cors'

export async function build() {
  var app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())

  app.get('/healthz', async function (req, res) {
    try {
      
     
    } catch (e) {
      console.log(`exception in healthz: ${JSON.stringify(e)}`)
      return res.status(503).json({
        error: `cred-store healthz check failed with error: ${e}`,
        healthy: false
      })
    }
    res.send({ message: 'cred-store server status: ok.', healthy: true })
  })

  app.get('/', function (req, res) {
    res.send({ message: 'cred-store server status: ok.' })
  })

  return app
}