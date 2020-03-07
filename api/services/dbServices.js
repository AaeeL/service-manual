// This file contains all database handlers

// Import database models
const {Maintenance, Device} = require('../models/models')
// Module to create an id
const id = require('shortid')

// Function for inserting a new maintenance task
const insert = async (data) => {
    try {
        // first check if there even is a device to which maintenance task is about to be added
        const device = await Device.findOne({'name':data.target})
        // if not, return
        if(!device) return {success: false, status: 400}
        else {
            // else proceed on inserting a new task
            await Maintenance.insertMany({
                _id: id(),
                target: data.target,
                date: new Date().getTime(),
                description: data.description,
                criticality: data.criticality,
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
        return await Maintenance.find({'target':target})
    } catch (error) {
        return {success: false, status: 500}
    }
}

// Function to delete maintenance task
const deleteTarget = async (target) => {
    try {
        const response = await Maintenance.deleteOne({'_id':target.target})
        if(response.deletedCount != 1) return {success: false, status: 400}
        else return {success: true}
    } catch (error) {
        return {success: false, status: 500}
    }
}

// Function to update data
const updateTarget = async (data) => {
    try {
        // update data
        if(data.disc) await Maintenance.updateOne({filter: {'_id':data.target}, $set: {'description':data.updates.description}})
        if(data.state) await Maintenance.updateOne({filter: {'_id':data.target}, $set: {'state':data.updates.state}})
        if(data.crit) await Maintenance.updateOne({filter: {'_id':data.target}, $set: {'criticality':parseInt(data.updates.criticality)}})
        // set update time
        await Maintenance.updateOne({filter: {'_id':data.target}, $set: {'updated': new Date().getTime()}})
        return {success: true}
    } catch (error) {
        return {success: false, status: 500}
    }
}

module.exports = {insert, findAll, findOne, deleteTarget, updateTarget}