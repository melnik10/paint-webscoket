const express = require('express')
const cors = require('cors')
const app = express()
const fs = require('fs')
const path = require('path')

const WSServer = require('express-ws')(app)
const aWss = WSServer.getWss()
const PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

function broadcastConnection(ws, msg) {
    aWss.clients.forEach(client => {
        if(client.id === msg.id) {
            client.send(JSON.stringify(msg))
        }
    })
}

function connectionHandler(ws, msg) {
    ws.send(JSON.stringify({
        method: 'connection',
        message: 'Вы подключены к серверу'
    }))
    ws.id = msg.id
    broadcastConnection(ws, msg)
}
app.post('/image', (req, res) => {
    try {
        const img = req.body.img.replace('data:image/png;base64,', '')
        if(req.query.id) {
            fs.writeFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`),img, 'base64')
        }
    } catch (e) {
        console.log(e)
    }
})
app.get('/image',(req, res) => {
    try {
        const file = fs.readFileSync(path.resolve(__dirname, 'files', `${req.query.id}.jpg`))
        const data = 'data:image/png;base64,' + file.toString('base64')
        if(file) {
            return res.json({img: data})
        }
    } catch (e) {
        console.log(e)
    }

})

app.ws('/', (ws, req) => {
    console.log('Подключение ws установлено')
    ws.on('message', (msg) => {
        msg = JSON.parse(msg)
        switch (msg.method) {
            case 'connection':
                connectionHandler(ws, msg)
                break
            case 'draw':
                broadcastConnection(ws, msg)
            default: return
        }
    })
})

app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`))


