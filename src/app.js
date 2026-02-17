import express from 'express'
import cors from 'cors'
import {createDatabase, seedDatabase} from './seed.js'
import {
    fetchCredentials, 
    fetchCredentialCount, 
    addCredential, 
    updateCredential, 
    getCredential, 
    getReportData, 
    fetchBatches, 
    fetchTemplates, 
    fetchAllTemplates, 
    fetchHolders,
    fetchHolderCount,
    getHolder,
    addHolder,
    updateHolder,
    fetchCredentialsForHolder,
    fetchCredentialCountForHolder
} from './queries.js'

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
    res.json({ message: 'cred-store server status: ok.', healthy: true })
  })

  app.get('/', function (req, res) {
    res.json({ message: 'cred-store server status: ok.' })
  })

  app.get('/seed', async function (req, res) {
    await createDatabase()
    await seedDatabase()

    res.json({ message: 'created and seeded db' })
  })

  app.post('/credential', async function (req, res) {
    let submittedCred = req.body;
    try {
        const result = await addCredential(submittedCred)
        console.log("result in app.js: ", result)
        res.json({message: 'credential created'});
    } catch (err) {
        throw err;
    }
  })

  app.post('/credentials/query', async function (req, res) {
    let query = req.body;
        try {
            const result = await fetchCredentials(query.queryTerm, query.currentPage);
        res.json(result);
        } catch (err) {
            throw err;
        }
    })

    app.get('/holder/credentials/:id', async function (req, res) {
        const id = req.params.id
        try {
            const result = await fetchCredentialsForHolder(id);
        res.json(result);
        } catch (err) {
            throw err;
        }
    })

    app.post('/holder/credentials/count/:id', async function (req, res) {
        const id = req.params.id
        let query = req.body;
        try {
            const result = await fetchCredentialCountForHolder(id,query.queryTerm);
        res.json(result);
        } catch (err) {
            throw err;
        }
    })

    app.post('/holders/query', async function (req, res) {
    let query = req.body;
        try {
            const result = await fetchHolders(query.queryTerm, query.currentPage);
        res.json(result);
        } catch (err) {
            throw err;
        }
    })

    app.post('/holder', async function (req, res) {
    let submittedHolder = req.body;
    try {
        const result = await addHolder(submittedHolder)
        res.json(result);
    } catch (err) {
        throw err;
    }
  })

   app.get('/holder/:id', async function (req, res) {
    const id = req.params.id
        try {
            const result = await getHolder(id);
            res.send(result);
        } catch (err) {
            throw err;
        }
  })

      app.put('/holder/:id', async function (req, res) {
        const id = req.params.id
        let updatedValues = req.body;
        try {
            const result = updateHolder(id, updatedValues);
        res.send(result);
        } catch (err) {
            throw err;
        }
  })

    app.post('/credentials/count', async function (req, res) {
        let query = req.body;
        try {
            const result = await fetchCredentialCount(query.queryTerm);
        res.json(result);
        } catch (err) {
            throw err;
        }
    })

    app.post('/holders/count', async function (req, res) {
        let query = req.body;
        try {
            const result = await fetchHolderCount(query.queryTerm);
        res.json(result);
        } catch (err) {
            throw err;
        }
    })

  app.get('/credential/:id', async function (req, res) {
    const id = req.params.id
        try {
            const result = await getCredential(id);
            res.send(result);
        } catch (err) {
            throw err;
        }
  })

    app.put('/credential/:id', async function (req, res) {
        const id = req.params.id
        let updatedValues = req.body;
        try {
            const result = updateCredential(id, updatedValues);
        res.send(result);
        } catch (err) {
            throw err;
        }
  })


  app.get('/report', async function (req, res) {
        try {
            const result = await getReportData();
            res.send(result);
        } catch (err) {
            throw err;
        }
  })

  app.get('/batches', async function (req, res) {
        try {
            const result = await fetchBatches(5);
            res.send(result);
        } catch (err) {
            throw err;
        }
  })

  app.get('/templates', async function (req, res) {
        try {
            const result = await fetchAllTemplates();
            res.send(result);
        } catch (err) {
            throw err;
        }
  })

    app.post('/templates/query', async function (req, res) {
    let query = req.body;
        try {
            const result = await fetchTemplates(query.queryTerm);
        res.json(result);
        } catch (err) {
            throw err;
        }
    })



  return app
}