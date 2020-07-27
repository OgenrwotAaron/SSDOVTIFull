const express = require('express');
const router = express.Router();

const CourseModules = require('../models/CourseModules');

//get all modules
router.get('/',(req,res)=>{

    const { code } = req.query

    if(code){
        CourseModules.findOne({
            where:{
                id:code
            }
        })
        .then(module=>{
            res.json(module)
        })
        .catch(e=>{
            res.status(500).send({error:true,message:e.parent.sqlMessage})
        })
    }else{
        CourseModules.findAll({
            where:{
                course_code:req.query.course
            }
        })
        .then(modules=>{
            res.json(modules)
        })
        .catch(e=>{
            res.status(500).send({error:true,message:e.parent.sqlMessage})
        })
    }
})

//add a modules
router.post('/add',(req,res)=>{
    const { name, code, units, description, duration, phase, course_code } = req.body

    CourseModules.create({
        name,
        code,
        units,
        duration,
        phase,
        course_code,
        description
    })
    .then(module=>{
        res.json(module)
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage})
    })
})

router.post('/edit',(req,res)=>{
    const { name, code, units, description, duration, phase, oldCode } = req.body

    CourseModules.update({
        name,
        code,
        units,
        description,
        duration,
        phase
    },{
        where:{
            code:oldCode
        }
    })
    .then(newModule=>{
        res.json(newModule)
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage})
    })
})

router.delete('/',(req,res)=>{
    const { code } = req.query

    CourseModules.destroy({
        where:{
            code
        }
    })
    .then(deleted=>{
        res.json(deleted)
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage})
    })
})

module.exports = router