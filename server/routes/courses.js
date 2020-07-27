const express = require('express')
const router = express.Router()

const Courses = require('../models/Courses');
const CourseModules = require('../models/CourseModules');
const Unit = require('../models/Units')

router.get('/',(req,res)=>{

    const { code } = req.query

    if(code){
        Courses.findOne({
            where:{
                code
            }
        })
        .then(course=>{
            res.json(course)
        })
        .catch(e=>{
            res.status(500).json({error:true,message:e.parent.sqlMessage})
        })
    }else{
        Courses.findAll()
        .then(courses=>{
            res.json(courses)
        })
        .catch(e=>{
            res.status(500).json({error:true,message:e.parent.sqlMessage})
        })
    }
})

router.get('/available',(req,res)=>{
    Courses.findAll({
        attributes: ['name','code']
    })
    .then(courses=>{
        res.json({success:true,data:courses})
    })
    .catch(e=>{
        res.json({error:true,message:e.parent.sqlMessage})
    })
})

router.get('/single',(req,res)=>{
    const { code } = req.query

    Courses.findOne({
        where:{
            code
        },
        include:[
            {
                model:CourseModules,
                as:'courseModules',
                include:[
                    {
                        model:Unit,
                        as:'moduleUnits'
                    }
                ]
            }
        ]
    })
    .then(course=>{
        res.json(course)
    })
    .catch(e=>{
        res.json({error:true,message:e.parent.sqlMessage})
    })
})

router.post('/add',(req,res)=>{
    const { name,code, phases, modules, duration } = req.body

    Courses.create({
        name,
        code,
        phases,
        modules,
        duration
    })
    .then(course=>{
        res.json(course)
    })
    .catch(e=>{
        if(e.parent.code === 'ER_DUP_ENTRY'){
            res.status(400).send(e.parent.sqlMessage)
        }else{
            res.status(500).send(e.parent.sqlMessage)
        }
    })
})

router.post('/edit',(req,res)=>{
    const { name,code, phases, modules, duration, cover, description,oldId } = req.body

    Courses.update({
        name,
        code,
        phases,
        modules,
        duration,
        cover,
        description
    },
    {
        where:{
            code:oldId
        }
    })
    .then(newCourse=>{
        res.json(newCourse)
    })
    .catch(e=>{
        if(e.parent.code === 'ER_DUP_ENTRY'){
            res.status(400).send('Course Code must be unique')
        }else{
            res.status(500).json(e.parent.sqlMessage)
        }
    })
})

router.delete('/delete',(req,res)=>{
    const { code } = req.query

    Courses.destroy({
        where:{
            code
        }
    })
    .then(deleted=>{
        res.json(deleted)
    })
    .catch(e=>{
        res.status(500).send(e.parent.sqlMessage)
    })
})

module.exports = router