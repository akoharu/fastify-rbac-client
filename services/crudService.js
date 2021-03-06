const model = require('../models').models;
const Boom = require('@hapi/boom');
const response = require('../config/response');
const {MongooseQueryParser} = require('mongoose-query-parser');
const axios = require('axios').default;

const parser = new MongooseQueryParser();

const find = async (req, res, collection) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let limit = 10, skip = 0, filter = {}, select = {}, populate = [];
    if (req.url.split('?').length > 1) filter = parsed.filter;
    if (parsed.limit) limit = parsed.limit;
    if (parsed.skip) skip = parsed.skip;
    if (parsed.populate) populate = parsed.populate;
    if (parsed.select) select = parsed.select;
    try {
        let data = await model[collection].find(filter).select(select).populate(populate).limit(limit).skip(skip);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const count = async (req, res, collection) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let filter = {}
    if (req.url.split('?').length > 1) filter = parsed.filter;
    try {
        let data = await model[collection].count(filter)
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}

const findDeleted = async (req, res, collection) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let limit = 10, skip = 0, filter = {}, select = {}, populate = [];
    if (req.url.split('?').length > 1) filter = parsed.filter;
    if (parsed.limit) limit = parsed.limit;
    if (parsed.skip) skip = parsed.skip;
    if (parsed.populate) populate = parsed.populate;
    if (parsed.select) select = parsed.select;
    try {
        let data = await model[collection].findDeleted(filter).select(select).populate(populate).limit(limit).skip(skip);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const countDeleted = async (req, res, collection) => {
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let filter = {}
    if (req.url.split('?').length > 1) filter = parsed.filter;
    try {
        let data = await model[collection].countDeleted(filter)
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const findOne = async (req, res, collection) => {
    let id = req.params;
    const url = req.url.split('?').length > 1 ? req.url.split('?')[1] : ''; 
    const parsed = parser.parse(url);
    let select = {}, populate = [];
    if (parsed.populate) populate = parsed.populate;
    if (parsed.select) select = parsed.select;
    try {
        let data = await model[collection].findOne(id).select(select).populate(populate);
        return response.singleData(data, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}

const createClient = async (req, res, collection) => {
    try {
        const data = new model[collection](req.body);
        const newData = await data.save();
        if (req.body.photo) {
            const file = await req.body.photo[0];
            let uploadedFile = await axios.post(process.env.STORAGE_SERVER+'/local/client/upload', file, {
                headers: { 'Authorization': process.env.STORAGE_SERVER_API_KEY }
            })
            let photo = {
                photo: uploadedFile.data.data
            };
            let _newData = JSON.parse(JSON.stringify(newData))
            let updatedData = await model[collection].findOneAndUpdate(_newData._id, photo, {upsert: true, new: true});
            return response.singleData(updatedData, 'Success', res)
        }
        return response.singleData(newData, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}

const create = async (req, res, collection) => {
    try {
        const data = new model[collection](req.body);
        const newData = await data.save();
        return response.singleData(newData, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const updateClient = async (req, res, collection) => {
    const id = req.params;
    try {
        let dataOld = await model[collection].findOne(id, req.body);
        if (!dataOld) {
            res.code(404);
            throw Boom.notFound('Data not found!')
        }
        if (req.body.photo) {
            let _dataOld = JSON.parse(JSON.stringify(dataOld));
            if (_dataOld.hasOwnProperty('photo')) {
                console.log(`Deleting file key : ${_dataOld.photo.key} ...`)
                await axios.post(process.env.STORAGE_SERVER+'/local/delete', _dataOld.photo, {
                    headers: { 'Authorization': process.env.STORAGE_SERVER_API_KEY }
                })              
            }
            const file = await req.body.photo[0];
            let uploadedFile = await axios.post(process.env.STORAGE_SERVER+'/local/client/upload', file, {
                headers: { 'Authorization': process.env.STORAGE_SERVER_API_KEY }
            })
            req.body.photo = uploadedFile.data.data
            let updatedData = await model[collection].findOneAndUpdate(id, req.body, {upsert: true, new: true});
            return response.singleData(updatedData, 'Success', res)
        }
        let newData = await model[collection].findOneAndUpdate(id, req.body, {upsert: true, new: true});
        return response.singleData(newData, 'Success', res);   
    } catch (error) {
        throw Boom.boomify(error);
    }
}

const update = async (req, res, collection) => {
    const id = req.params;
    try {
        let newData = await model[collection].findOneAndUpdate(id, req.body, {upsert: true, new: true});
        return response.singleData(newData, 'Success', res);   
    } catch (error) {
        throw Boom.boomify(error);
    }
}

const destroy = async (req, res, collection) => {
    const id = req.params;
    const user = req.state.user;
    try {
        await model[collection].delete(id, user._id);
        let deletedData = await model[collection].findOneDeleted(id);
        return response.singleData(deletedData, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}
const restore = async (req, res, collection) => {
    const id = req.params;
    try {
        await model[collection].restore(id);
        let restoredData = await model[collection].findOne(id);
        return response.singleData(restoredData, 'Success', res)
    } catch (error) {
        throw Boom.boomify(error);
    }
}

module.exports = {
    find, findOne, create, createClient, update,updateClient, destroy, findDeleted, count, countDeleted, restore
}