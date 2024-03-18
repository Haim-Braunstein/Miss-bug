import express from 'express'
import { bugService } from './services/bug.service.js'

const app = express()
app.get('/', (req, res) => res.send('Hello there!!'))
app.listen(3033, () => console.log('Server ready at port 3033'))


// Get bugs (READ)

app.get('/api/bug', (req, res) => {
    bugService.query()
        .then(bugs => {
            res.send(bugs)
        })
        .catch(err => {
            // loggerService.error('Cannot get bugs', err)
            // res.status(400).send('Cannot get bugs')
            console.log('Cannot get bugs', err)
        })
})

// Get bug (READ)
app.get('/api/bug/save', (req, res) => {
    const bugToSave = {
        title: req.query.title,
        severity: +req.query.severity,
        desc: req.query.desc,
        _id: req.query._id
    }
   bugService.save(bugToSave)
        .then(bug => res.send(bug))
        .catch((err) => {
            // loggerService.error('Cannot save car', err)
            // res.status(400).send('Cannot save car')
        })
})

app.get('/api/bug/:id', (req, res) => {
    const bugId = req.params.id
    bugService.getById(bugId)
        .then(bug => res.send(bug))
        .catch(err => {
            // loggerService.error(err)
            // res.status(400).send('Cannot get bug')
        })
})

app.get('/api/bug/:id/remove', (req, res) => {
    const bugId = req.params.id
    bugService.remove(bugId)
        .then(() => res.send(bugId))
        .catch((err) => {
            // loggerService.error('Cannot remove bug', err)
            // res.status(400).send('Cannot remove bug')
        })
})

