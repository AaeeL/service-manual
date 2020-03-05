//import router from express
const router = require('express').Router()

const {insert, findAll, findOne, deleteTarget} = require('../services/dbServices')
const {isEmpty} = require('../services/isEmpty')
const {sort} = require('../services/sort')

//TODO huoltotehtävät: lisäys OK, muokkaus, poistaminen OK

router.post('/add', async (req, res) => {
    if(isEmpty(req.body.target) || isEmpty(req.body.description) || !req.body.criticality) res.sendStatus(400)
    else {
        const result = await insert(req.body)
        if(result.success) res.sendStatus(result.status)
        else res.sendStatus(200)
    }
})

router.put('/update', (req, res) => {
    console.log('öäääää')
})

router.delete('/delete', async (req,res) => {
    const result = await deleteTarget(req.body)
    if(!result.success) res.sendStatus(result.status)
    else res.sendStatus(200)
})

router.get('/search_all', async (req, res) => {
    const response = await findAll()
    if(!response.success) res.sendStatus(response.status)
    else {
        const result = await sort(response)
        res.send(result)
    }
})

router.get('/search_one', async (req, res) => {
    const response = await findOne(req.query)
    if(!response.success) res.sendStatus(response.status)
    else {
        const result = sort(response.device)
        res.send(result)
    }
})


module.exports = router;