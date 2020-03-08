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
        if(!device) return {success: false}
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
        // if something goes wrong
        return {success: false}
    }
}

// Function to fetch all the maintenance tasks
const findAll = async () => {
    try {
        // fetch all tasks
        return await Maintenance.find({})
    } catch (error) {
        // if something goes wrong
        return {success: false}
    }
}

// Function to fetch maintenance tasks of just one device
const findOne = async (device) => {
    try {
        return await Maintenance.find({'target':device.name})
    } catch (error) {
        // if something goes wrong
        return {success: false}
    }
}

// Function to delete maintenance task
const deleteTarget = async (target) => {
    try {
        const response = await Maintenance.deleteOne({'_id':target.target})
        // if delete count is not equal to 1, deletion was not successful
        if(response.deletedCount != 1) return {success: false}
        else return {success: true}
    } catch (error) {
        // if something goes wrong
        return {success: false}
    }
}

// Function to update data
const updateTarget = async (data) => {
    try {
        // first check if maintenance exists
        if(!await Maintenance.findById({'_id':data.target})) return {success: false}
        // update data based on what data is new
        const target = data.target
        if(data.disc) await Maintenance.findByIdAndUpdate(target, {description:data.updates.description})
        if(data.state) await Maintenance.findByIdAndUpdate(target, {state:data.updates.state})
        if(data.crit) await Maintenance.findByIdAndUpdate(target, {criticality:data.updates.criticality})
        // set update time
        await Maintenance.findByIdAndUpdate(target, {updated: new Date().getTime()})
        return {success: true}
    } catch (error) {
        // if something goes wrong
        return {success: false}
    }
}

module.exports = {insert, findAll, findOne, deleteTarget, updateTarget}