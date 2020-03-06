//import router from express
const router = require('express').Router()

const {insert, findAll, findOne, deleteTarget, updateTarget} = require('../services/dbServices')
const {isEmpty} = require('../utils/isEmpty')
const {sort} = require('../utils/sort')

//TODO huoltotehtävät: muokkaus

// @route   POST api/insert
// @desc    Adds a new maintenance task
// @access  Public
router.post('/insert', async (req, res) => {
    // check received data for errors
    if(isEmpty(req.body.target) || isEmpty(req.body.description) || !req.body.criticality) res.sendStatus(400)
    else {
        // if no errors, proceed on inserting a new maintenance task
        const result = await insert(req.body)
        if(!result.success) res.sendStatus(result.status)
        else res.sendStatus(200)
    }
})

router.put('/update', async (req, res) => {
    const result = await updateTarget(req.body)
    if(!result.success) res.sendStatus(400)
    else res.sendStatus(200)
})

// @route   GET api/delete?target=[target_id]
// @desc    Deletes a maintenance log
// @access  Public
router.delete('/delete', async (req,res) => {
    const result = await deleteTarget(req.body)
    if(!result.success) res.sendStatus(result.status)
    else res.sendStatus(200)
})

// @route   GET api/fetch
// @desc    Fetches all maintenance tasks
// @access  Public
router.get('/fetch', async (req, res) => {
    const response = await findAll()
    if(response.success) res.sendStatus(response.status)
    else {
        const result = await sort(response)
        res.send(result)
    }
})

// @route   GET api/fetch_one?target=[target_id]
// @desc    Fetches maintenance logs of one device
// @access  Public
router.get('/fetch_one', async (req, res) => {
    const response = await findOne(req.query)
    if(!response.success) res.sendStatus(response.status)
    else {
        const result = sort(response.device)
        res.send(result)
    }
})


module.exports = router;