import * as express from 'express'
import * as cors from 'cors'

const app:express.Application = express()

app.use(express.json())
app.use(cors())

// this removes the 'x-powered-by' header from the responses we send
// if this were enabled it would reveal that our app is running in node.js
// this could reveal possible attack vectors to malicious actors
// alternately we could install and use the helmet middleware
app.disable('x-powered-by')

app.get('/', (_: express.Request, res: express.Response) => res.sendStatus(200))

export default app
