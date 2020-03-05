const {Maintenance, Device} = require('../models/models')
const id = require('shortid')

const insert = async (data) => {
    try {
        const target = data.target
        const device = await Device.findOne({'name':target})
        if(!device) return {success: false, status: 400}
        else {
            const date = new Date()
            const description = data.description
            const criticality = data.criticality
            const state = 'avoin'

            const result = await Maintenance.insertMany({
                _id: id(),
                target: target,
                date: date.getTime(),
                description: description,
                criticality: criticality,
                state: state
            })
            console.log(result)
            return {success: true}
        }
    } catch (error) {
        return {success: false, status: 500}
    }
}

const findAll = async () => {
    try {
        const result = await Maintenance.find({})
        return result
    } catch (error) {
        return {success: false, status: 500}
    }
}

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

const deleteTarget = async (target) => {
    try {
        const response = await Maintenance.deleteOne({'_id':target.target})
        if(response.deletedCount == 1) return {success: false, status: 400}
        else return {success: true}
    } catch (error) {
        return {success: false, status: 500}
    }
}

module.exports = {insert, findAll, findOne, deleteTarget}