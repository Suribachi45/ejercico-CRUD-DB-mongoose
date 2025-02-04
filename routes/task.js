const express = require('express')
const router = express.Router()
const Task = require('../models/Task')
const { triggerAsyncId } = require('async_hooks')

router. post('/create', async (req,res) => {
    try {
        const task = await Task.create(req.body)
        res.status(201).send(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'There was a problem trying to create a task'})
    }
})


router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find()
        res.status(200).send(tasks)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error gettings taks'})
    }
})


router.get('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findById(req.params._id)
        if (!task) {
            return res.status(404).send({message: 'Task not found'})
        }
        res.status(200).send(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error getting task'})
    }
})


router.put('/markAsCompleted/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, {completed: true}, {new: true})
        if (!task) {
            return res.status(404).send({message: 'Task not found'})
        }
        res.status(200).send(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error marking task'})
    }
})


router.put('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params._id, {title: req.body.title}, {new: true})
        if (!task) {
            return res.status(404).send({message: 'Task not found'})
        }
        res.status(200).send(task)
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error updating title'})
    }
})

//DELETE /id/:_id: Endpoint para eliminar una tarea.
router.delete('/id/:_id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params._id)
        if (!task) {
            return res.status(404).send({message: 'Task not found'})
        }
        res.status(200).send({message: 'Task deleted successfully'})
    } catch (error) {
        console.error(error)
        res.status(500).send({message: 'Error deleting task'})
    }
})

module.exports = router