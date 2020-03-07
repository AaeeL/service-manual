// This file contains all routes

// import router from express
const router = require('express').Router()

// import database services
const {insert, findAll, findOne, deleteTarget, updateTarget} = require('../services/dbServices')

// import some functions
const {isEmpty} = require('../utils/isEmpty')
const {sort} = require('../utils/sort')

// @route   POST api/insert
// @desc    Adds a new maintenance task
// @access  Public
router.post('/insert', async (req, res) => {
    // check received data for errors
    try {
        if(isEmpty(req.body.target) || isEmpty(req.body.description) || isEmpty(req.body.criticality)) res.sendStatus(400)
        else {
            // if no errors, proceed on inserting a new maintenance task
            const result = await insert(req.body)
            if(!result.success) res.sendStatus(result.status)
            else res.sendStatus(200)
        }
    } catch (error) {
        res.sendStatus(500)
    }
})

// @route   PUT /api/update
// @desc    Updates an existing maintenance task
// @access  Public
router.put('/update', async (req, res) => {
    // check what fields are set for updating
    try {
        if(!isEmpty(req.body.updates.description)) req.body.disc = true
        if(!isEmpty(req.body.updates.state)) req.body.state = true
        if(!isEmpty(req.body.updates.criticality)) req.body.crit = true
        // after check proceed on updating
        const result = await updateTarget(req.body)
        if(result.success) res.sendStatus(200)
        else res.sendStatus(400)
    } catch (error) {
        res.sendStatus(500)
    }
})

// @route   GET api/delete?target=[target_id]
// @desc    Deletes a maintenance log
// @access  Public
router.delete('/delete', async (req,res) => {
    // proceed to delete target
    try {
        const result = await deleteTarget(req.body)
        if(result.success == false) res.sendStatus(400)
        else res.sendStatus(200)
    } catch (error) {
        res.sendStatus(500)
    }
})

// @route   GET api/fetch
// @desc    Fetches all maintenance tasks
// @access  Public
router.get('/fetch', async (req, res) => {
    // proceed to fetch all tasks
    const response = await findAll()
    if(response.success == false) res.sendStatus(400)
    else {
        const result = await sort(response)
        res.send(result)
    }
})

// @route   GET api/fetch_one?target=[target_id]
// @desc    Fetches maintenance logs of one device
// @access  Public
router.get('/fetch_one', async (req, res) => {
    // proceed to find tasks of a certain device
    const response = await findOne(req.query)
    if(response.success == false) res.sendStatus(400)
    else {
        // sort tasks
        const sorted = await sort(response)
        res.send(sorted)
    }
})


module.exports = router;