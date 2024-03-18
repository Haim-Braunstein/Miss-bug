import express from 'express'
import { bugService } from './services/bug.service.js'

const app = express()
app.get('/', (req, res) => res.send('Hello there!!'))
app.listen(3033, () => console.log('Server ready at port 3033'))



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