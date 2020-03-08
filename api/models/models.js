// This file contains the databse schemas and models
const mongoose = require('mongoose')

//Model and schema for maintenances tasks
const MaintenanceSchema = new mongoose.Schema({
    _id: {type: String, required: true, unique: true},
    target: {type: String, required: true},
    date: {type: Date, required: true},
    description: {type: String, required: true},
    criticality: {type: Number, required: true},
    state: {type: String, required: true},
    updated: {type: Date, default: null}
})

const Maintenance = mongoose.model('Maintenance', MaintenanceSchema)

//Model and schema for devices
const DeviceSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true},
    year: {type: Number, required: true},
    type: {type: String, required: true}
})
const Device = mongoose.model('Device', DeviceSchema)

module.exports={
    Maintenance:Maintenance,
    Device:Device
}