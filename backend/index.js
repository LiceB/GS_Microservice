const express = require('express')
const mysql2 = require('mysql2')
const bodyParser = require('body-parser')

const PORT = 3000;
const HOST = '0.0.0.0'

const connection = mysql2.createConnection({
    // host: 'database-mysql',
    host: 'localhost',
    user: 'root',
    password: '123',
    database: 'fiap'
})

connection.connect((err) => {
    if (err) {
        console.log('Error connecting to MySQL:', err)
        return
    }
    console.log('Connected to database')
})

const app = express()
const jsonParser = bodyParser.json()

app.get('/', (req, res) => {
    const query = 'SELECT ods, descricao_global as global, descricao_brasil as brasil from objetivos;'

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.log('Error executing SELECT query:', err)
            return
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Dados não encontrados.' })
            } else {
                res.json(results)
                // res.send(results.map(item => ({ ods: item.ods, global: item.descricao_global, brasil: descricao_brasil })))
            }
        }
    })
})

// endpoint GET /objetivos
app.get('/objetivos', (req, res) => {
    const query = `SELECT ods.codigo as id, objetivos.descricao_global as global, objetivos.descricao_brasil as brasil, indicadores.ods, indicadores.descricao
      FROM ods
      JOIN objetivos ON ods.id_objetivo = objetivos.id
      JOIN indicadores ON ods.id_indicadores = indicadores.id;
      `

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.error('Error executing SELECT query:', err)
            return
        } else {
            res.json(results)
        }

        // res.send(results.map(item => ({ id: item.id_ods, global: item.descricao_global, brasil: item.descricao_brasil, objetivo: id_objetivo, descricao: item.descricao })))
    })
})

app.get('/indicador/:id', (req, res) => {
    const { id } = req.params;

    const query = `select ano, taxa as consumo from ods where id = ${id};`

    connection.query(query, (err, results, fields) => {
        if (err) {
            console.error('Error executing SELECT query:', err)
            return
        } else {
            if (results.length === 0) {
                res.status(404).json({ message: 'Dados não encontrados.' })
            } else {
                res.send(results.map(item => ({ ano: item.ano, consumo: item.consumo })))
            }
        }

    })
})

app.listen(PORT, HOST)