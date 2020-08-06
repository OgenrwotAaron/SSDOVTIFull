const express = require('express');
const router = express.Router()
const Mail = require('../models/Mail')

router.get('/',(req,res)=>{

    const { id } = req.query

    if(id){
        Mail.findOne({
            where:{
                id
            }
        })
        .then(mail=>{
            res.json(mail)
        })
        .catch(e=>{
            res.status(500).send(e)
        })
    }else{
        Mail.findAll()
        .then(mails=>{
            res.json(mails)
        })
        .catch(e=>{
            res.status(500).send(e)
        })
    }
})

router.post('/add',(req,res)=>{
    const { sender, email, subject, body } = req.body

    Mail.create({
        sender,
        email,
        subject,
        body
    })
    .then(email=>{
        res.json(email)
    })
    .catch(e=>{
        console.log(e)
        res.status(500).send(e)
    })
})

router.post('/read',(req,res)=>{

    const { id } = req.body

    Mail.update({
        seen:1
    },{
        where:{
            id
        }
    })
    .then(mail=>{
        res.json(mail)
    })
    .catch(e=>{
        res.status(500).send(e)
    })
})

router.delete('/',(req,res)=>{
    const { id } = req.query

    Mail.destroy({
        where:{
            id
        }
    })
    .then(deleted=>{
        res.json(deleted)
    })
    .catch(e=>{
        res.status(500).send(e)
    })
})

module.exports = router