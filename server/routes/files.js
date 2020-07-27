const express = require('express');
const router = express.Router()

const Files = require('../models/Files')

router.get('/',(req,res)=>{

    Files.findAll({
        where:{
            video_id:req.query.video
        }
    })
    .then(files=>{
        res.json(files);
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage});
    })

})

router.post('/add',(req,res)=>{

    const { name, url, video_id } = req.body

    Files.create({
        name,
        url,
        video_id
    })
    .then(file=>{
        res.json(file);
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage});
    })

})

router.delete('/',(req,res)=>{
    const { id } = req.query

    Files.destroy({
        where:{
            id
        }
    })
    .then(deleted=>{
        res.json(deleted)
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage});
    })
})

module.exports = router