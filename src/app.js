import express from 'express'
import cors from 'cors'
import {createDatabase, seedDatabase} from './seed.js'
import pool from './pool.js'

export async function build() {
  var app = express()

  app.use(express.json())
  app.use(express.urlencoded({ extended: false }))
  app.use(cors())

  app.get('/healthz', async function (req, res) {
    try {
      // TODO add some meaningful check like a select from the DB
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

  app.get('/seed', async function (req, res) {
    await createDatabase()
    await seedDatabase()

    res.send({ message: 'created and seeded db' })
  })

  app.post('/credential', async function (req, res) {
    let submittedCred = req.body;
    try {
        const result = await pool.query("insert into credentials (cred_name, holder, email) values (?,?,?)", ['test cred', 'me', 'chartraj@mit.edu']);
        res.send(result);
    } catch (err) {
        throw err;
    }
  })

  app.get('/credentials', async function (req, res) {
        try {
        const result = await pool.query("select * from credentials");
        res.send(result);
        } catch (err) {
            throw err;
        }
    })

  app.get('/credentials/:id', async function (req, res) {
    const id = req.params.id
    if (id === '0') {
        res.send({ message: '0 test worked properly' })
    } else {
        try {
        const result = await pool.query("select * from credentials where id = ?", [id]);
        res.send(result);
        } catch (err) {
            throw err;
        }
    }

  })



  return app
}