import express from 'express'

const app = express()
app.get('/', (req, res) => res.send('Hello there!!'))
app.listen(3033, () => console.log('Server ready at port 3033'))
