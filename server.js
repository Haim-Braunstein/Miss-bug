import express from 'express'
import cookieParser from 'cookie-parser'

import { bugService } from './services/bug.service.js'

const app = express()

// Express Config:
app.use(express.static('public'))
app.use(cookieParser())
app.use(express.json())

app.listen(3033, () => console.log('Server ready at port 3033'))

// Get bugs (READ)

app.get('/api/bug', (req, res) => {
    const filterBy = {
        title: req.query.title || '',
        minSeverity: +req.query.minSeverity || 0,
        labels: req.query.labels || '',
    }

    const sortBy = {
        type: req.query.type || '',
        dir: +req.query.dir || 1,
    }
    bugService.query(filterBy, sortBy)
        .then(bugs => {
            console.log('bugs from server', bugs);
            res.send(bugs)
        })
        .catch(err => {
            // loggerService.error('Cannot get bugs', err)
            res.status(400).send('Cannot get bugs')
            console.log('Cannot get bugs', err)
        })
})


app.get('/api/bug/:id', (req, res) => {
    const bugId = req.params.id
    const { visitedBugs = [] } = req.cookies
    console.log('visitedBugs', visitedBugs)

    if (!visitedBugs.includes(bugId)) {
        if (visitedBugs.length >= 3) return res.status(401).send('wait a little bit')
        else visitedBugs.push(bugId)
    }


    res.cookie('visitedBugs', visitedBugs, { maxAge: 1000 * 50 })


    bugService.getById(bugId)
        .then(bug => res.send(bug))
        .catch(err => {
            // loggerService.error(err)
            res.status(400).send('Cannot get bug')
        })
})

// Update Bug
app.put('/api/bug', (req, res) => {
    console.log(req.body);
    const bugToSave = {
        title: req.body.title,
        severity: +req.body.severity,
        description: req.body.description,
        _id: req.body._id
    }
    bugService.save(bugToSave)
        .then(bug => res.send(bug))
        .catch((err) => {
            // loggerService.error('Cannot save bug', err)
            res.status(400).send('Cannot save bug')
        })
})

app.post('/api/bug', (req, res) => {
    console.log('req.body:', req.body)
    const bugToSave = req.body
    bugService.save(bugToSave)
        .then(bug => res.send(bug))
        .catch((err) => {
            // loggerService.error('Cannot save bug', err)
            res.status(400).send('Cannot save bug')
        })
})


// Remove Bug (Delete)
app.delete('/api/bug/:id/', (req, res) => {
    const bugId = req.params.id
    bugService.remove(bugId)
        .then(() => res.send(bugId))
        .catch((err) => {
            // loggerService.error('Cannot remove bug', err)
            res.status(400).send('Cannot remove bug')
        })
})

