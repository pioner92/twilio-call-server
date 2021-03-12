import express from 'express'
import SchemaDb from './schema-db/schema-db'
import { urls } from './routes/urls'
import VoiceResponse from 'twilio/lib/twiml/VoiceResponse'
import { GetCompanyDataFromDb } from './schema-db/configDb'

const dataDb = require('./dataDb.json')
const fileUpload = require('express-fileupload')
const path = require('path')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
mongoose.set('useFindAndModify', true)
mongoose.set('useNewUrlParser', true)

const ms = require('mediaserver')
const cors = require('cors')

const app = express()
app.use(fileUpload())

const http = require('http').createServer(app)
import socket from 'socket.io'
import { SocketConnectionsService } from './store/socket-connections-service'
import request from 'request'

export const io = socket(http)

app.use(cors())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hjs')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

const token = require('./routes/token/token')
const tokenMobile = require('./routes/token/token-mobile')
const connect = require('./routes/connect/connect')
const call = require('./routes/call/call')
const connectToConference = require('./routes/connect-to-conference/connect-to-conference')
const statusEvent = require('./routes/status-event/status-event')
const fax = require('./routes/fax/fax')
const getDispatcher = require('./routes/get-availables-dispatchers/get-availables-dispatchers')
const setDispatcher = require('./routes/set-dispatcher-list/set-dispatcher-list')
const callToDispatcher = require('./routes/call-to-dispathcer/call-to-dispatcher')
const dialCalStatus = require('./routes/dial-call-status/dial-call-status')
const recordingLink = require('./routes/record-link-voice-mail/record-link-voice-mail')
const getCallResource = require('./routes/get-call-resource/get-call-resource')
const isAvailable = require('./routes/is-available/is-available')

// Генерация токена
app.use(`${urls.token}`, token)
app.use(`${urls.token}`, tokenMobile)

// Хук на номера диспетчеров
app.use(`${urls.dispatcher}`, connect)

// Исходящий звонок
app.use(`${urls.call}`, call)

// Первый звонок на диспетчера
app.use(`${urls.callToDispatcher}`, callToDispatcher)

// Подключение к звонку
app.use(`${urls.connectToAgent}`, connectToConference)

// Событие после звонка
app.use(`${urls.statusEvent}`, statusEvent)

// Прием факса
app.use(`${urls.fax}`, fax)

// Получить диспетчера
app.use(`${urls.getDispatchersList}`, getDispatcher)

// is Available
app.use(`${urls.isAvailable}`, isAvailable)

// Добавить / Удалить диспетчера
app.use(`${urls.setDispatchersList}`, setDispatcher)

// Событие исходящего звонка
app.use(`${urls.dialCallStatus}`, dialCalStatus)

// Ссыылка на запись звонка
app.use(`${urls.event}`, recordingLink)

app.use('/get_call_resource', getCallResource)

// app.get("/template", (req: express.Request, res: express.Response) => {
//     res.sendFile(__dirname + "/test.html");
// });

app.get('/audio', (req: express.Request, res: express.Response) => {
    ms.pipe(req, res, './Alliance IVR.mp3')
})

app.get('/incoming_sound', (req: express.Request, res: express.Response) => {
    ms.pipe(req, res, './ringtone.mp3')
})

app.use('/get_logs', async (req: express.Request, res: express.Response) => {
    const data = await SchemaDb.find({})
    res.json({ data })
})

app.get(
    '/get_company_data/:name',
    async (req: express.Request, res: express.Response) => {
        const name = req.params.name
        const company = await GetCompanyDataFromDb.byName(name)
        if (company) {
            const {
                dispatcher_numbers,
                numbers_available,
                name,
                fax,
                company_number,
            } = company
            res.json({
                company: {
                    dispatcher_numbers,
                    numbers_available,
                    name,
                    fax,
                    company_number,
                },
            })
        } else {
            res.json({ company: {} })
        }
    }
)

app.post('/send_fax', (req: express.Request, res: express.Response) => {
    //@ts-ignore
    console.log(req.files)
    //@ts-ignore
    console.log(req.body)
    res.json({ msg: 'ok' })
})

app.post('/fax/received', (req: express.Request, res: express.Response) => {
    // log the URL of the PDF received in the fax
    //@ts-ignore
    console.log(req.body.MediaUrl)
    console.log('SEND')
    // Respond with empty 200/OK to Twilio
    res.status(200)
    res.send('ok')
})

app.use('/ring_signal/play', (req: express.Request, res: express.Response) => {
    const twiml = new VoiceResponse()
    twiml.play(
        {
            loop: 10,
        },
        'https://zvukogram.com/mp3/862/30-sekund-ojidaniya-poka-vozmut-trubku-na-tom-kontse-provoda-9356.mp3'
    )

    res.type('text/xml')
    res.send(twiml.toString())
})

let isConnected = false

export const getConnectedStatus = () => {
    if (isConnected) {
        isConnected = false
        return true
    }
    return false
}

type socketStatusType = 'no-answer' | 'answered' | 'busy' | 'out coming'

type socketDataType = {
    name: string
    From: string
    To: string
    status: socketStatusType
    duration: number
}

io.on('connection', (socket) => {
    console.log('Connect')

    const { number, company } = socket.handshake.query || {}
    SocketConnectionsService.add({
        number,
        company,
        socketId: socket.client.id,
    })
})

const start = async () => {
    try {
        await mongoose.connect(
            `mongodb+srv://${dataDb.login}:${dataDb.pass}@cluster0.vm8wc.mongodb.net/altek`,
            {
                useNewUrlParser: true,
                useFindAndModify: true,
                useUnifiedTopology: true,
            }
        )
        http.listen(8082, () => {
            console.log('listening on *:8082')
        })
    } catch (e) {
        console.log(e)
    }
}

start()
