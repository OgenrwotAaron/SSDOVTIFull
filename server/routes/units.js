const express = require('express');
const router = express.Router()

const Units = require('../models/Units');
const Vidoe = require('../models/Videos')

router.get('/',(req,res)=>{
    const { module, unit } = req.query

    if(unit){
        Units.findOne({
            where:{
                code:unit
            }
        })
        .then(unit=>{
            res.json(unit);
        })
        .catch(e=>{
            res.status(500).send({error:true,message:e.parent.sqlMessage});
        }) 
    }else{
       Units.findAll({
            where:{
                module_code:module
            }
        })
        .then(units=>{
            res.json(units);
        })
        .catch(e=>{
            res.status(500).send({error:true,message:e.parent.sqlMessage});
        }) 
    }

    
})

router.get('/joined',(req,res)=>{
    const { id } = req.query

    Units.findOne({
        where:{
            id
        },
        include:[
            {
                model:Vidoe
            }
        ]
    })
    .then(unit=>{
        res.json(unit)
    })
    .catch(e=>{
        res.json(e)
    })
})

router.post('/add',(req,res)=>{
    const { name, code, duration, module_code, description } = req.body;

    Units.create({
        name,
        code,
        module_code,
        duration,
        description
    })
    .then(unit=>{
        res.json(unit);
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage});
    })
})

router.post('/edit',(req,res)=>{
    const { name, code, duration, description, oldCode } = req.body;

    Units.update({
        name,
        code,
        duration,
        description
    },{
        where:{
            code:oldCode
        }
    })
    .then(unit=>{
        res.json(unit);
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage});
    })
})

router.delete('/',(req,res)=>{
    const { code } = req.query

    Units.destroy({
        where:{
            code
        }
    })
    .then(deleted=>{
        res.json(deleted);
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage});
    })
})

module.exports = router