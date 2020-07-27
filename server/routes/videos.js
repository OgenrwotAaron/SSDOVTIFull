const express = require('express');
const router = express.Router()

const Videos = require('../models/Videos')

router.get('/',(req,res)=>{

    const { id } = req.query

    if(id){
        Videos.findOne({
            where:{
                id
            }
        })
        .then(video=>{
            res.json(video);
        })
        .catch(e=>{
            res.status(500).send({error:true,message:e.parent.sqlMessage});
        })
    }else{
        Videos.findAll({
            where:{
                unit_code:req.query.unit
            }
        })
        .then(videos=>{
            res.json(videos);
        })
        .catch(e=>{
            res.status(500).send({error:true,message:e.parent.sqlMessage});
        })
    }
})

router.post('/add',(req,res)=>{
    const { name, description, unit_code, url } = req.body

    Videos.create({
        name,
        description,
        unit_code,
        url
    })
    .then(video=>{
        res.json(video);
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage});
    })
})

router.post('/edit',(req,res)=>{
    const { id, name, description, transcript } = req.body

    Videos.update({
        name,
        description,
        transcript 
    },
    {
        where:{
            id
        }
    })
    .then(video=>{
        res.json(video)
    })
    .catch(e=>{
        console.log(e)
        res.status(500).send({error:true,message:e.parent.sqlMessage});
    })
})

router.delete('/',(req,res)=>{
    const { id } = req.query

    Videos.destroy({
        where:{
            id
        }
    })
    .then(deleted=>{
        res.json(deleted)
    })
    .catch(e=>{
        console.log(e)
        res.status(500).send({error:true,message:e.parent.sqlMessage});
    })
})

module.exports = router