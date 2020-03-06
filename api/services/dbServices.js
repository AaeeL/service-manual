// This file contains all database handlers

// Import database models
const {Maintenance, Device} = require('../models/models')
// Module to create an id
const id = require('shortid')

// Function for inserting a new maintenance task
const insert = async (data) => {
    try {
        const target = data.target
        // first check if there even is a device to which maintenance task is about to be added
        const device = await Device.findOne({'name':target})
        // if not, return
        if(!device) return {success: false, status: 400}
        else {
            // else proceed on inserting a new task
            const date = new Date()
            const description = data.description
            const criticality = data.criticality

            const result = await Maintenance.insertMany({
                _id: id(),
                target: target,
                date: date.getTime(),
                description: description,
                criticality: criticality,
                state: 'avoin'
            })
            return {success: true}
        }
    } catch (error) {
        // if something goes terribly wrong, end up here
        return {success: false, status: 500}
    }
}

// Function to fetch all the maintenance tasks
const findAll = async () => {
    try {
        // fetch all tasks
        const result = await Maintenance.find({})
        return result
    } catch (error) {
        // again if something goes wrong
        return {success: false, status: 500}
    }
}

// Function to fetch maintenance tasks of just one device
const findOne = async (device) => {
    try {
        const target = device.name
        const result = await Maintenance.find({'target':target})
        if(result.length == 0) return {success: false, status: 400}
        else return {success:true, device: result}
    } catch (error) {
        return {success: false, status: 500}
    }
}

// Function to delete maintenance task
const deleteTarget = async (target) => {
    try {
        const date = new Date()
        const response = await Maintenance.deleteOne({'_id':target.target})
        if(response.deletedCount > 1) return {success: false, status: 400}
        else return {success: true}
    } catch (error) {
        return {success: false, status: 500}
    }
}

const updateTarget = async (data) => {
    try {
        const date = new Date()
        const response = await Maintenance
            .updateOne({filter: {'_id':data.target}, 
                $set: {
                    'description':data.updates.description,
                    'criticality':data.updates.criticality,
                    'state': data.updates.state,
                    'updated': date.getTime()
                }})
                console.log(response)
                console.log(response.ok == 1)
        if(response.ok == 1) return {success: true}
        else return {success: false, status: 400}
    } catch (error) {
        console.log(error)
        return {success: false, status: 500}
    }

    return 'öäääääöööö'
}

module.exports = {insert, findAll, findOne, deleteTarget, updateTarget}