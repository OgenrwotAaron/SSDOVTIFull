const express = require('express')
const router = express.Router()

const Users = require('../models/Users');
const Admins = require('../models/Admins');

router.get('/',(req,res)=>{
    const { phone } = req.query

    if(phone){
        Admins.findOne({
            where:{
                phone
            }
        })
        .then(admin=>{
            res.json(admin)
        })
        .catch(e=>{
            res.status(500).send(e.parent.sqlMessage)
        })  
    }else{
        Admins.findAll()
        .then(admins=>{
            res.json(admins)
        })
        .catch(e=>{
            res.status(500).send(e.parent.sqlMessage)
        }) 
    }
})

router.post('/register',(req,res)=>{

    const { email,fname,lname,phone,position } = req.body

    Users.create({
        user_name:phone,
        password:phone
    })
    .then(user=>{
        Admins.create({
            email,
            fname,
            lname,
            phone,
            position
        })
        .then(admin=>{
            res.json(admin)
        })
        .catch(e=>{
            res.status(500).json({error:true,message:e.parent.sqlMessage})
        })
    })
    .catch(e=>{
        if(e.parent.code === 'ER_DUP_ENTRY'){
            Admins.create({
                email,
                fname,
                lname,
                phone,
                position
            })
            .then(admin=>{
                res.json(admin)
            })
            .catch(e=>{
                res.status(400).json({error:true,message:e.parent.sqlMessage})
            })
        }else{
            res.status(500).json({error:true,message:e.parent.sqlMessage})
        }
    })
})

router.post('/edit',(req,res)=>{
    const { id, fname, lname, email, phone, position, description, avatar } = req.body

    //if phone !== admin, create new user

    //use id to get user
    Users.findOne({
        where:{
            user_name:phone
        }
    })
    .then(user=>{
        if(user){
            Admins.findOne({
                where:{
                    phone:user.user_name
                }
            })
            .then(admin=>{
                if(admin.id === id){
                    admin.update({
                        fname,
                        lname,
                        phone,
                        email,
                        position,
                        description,
                        avatar
                    })
                    .then(newAdmin=>{
                        res.json(newAdmin)
                    })
                    .catch(e=>{
                        res.status(500).json({error:true,message:e.parent.sqlMessage})
                    })
                }else{
                    res.status(400).send({error:true,message:'Phone Number must be Unique'})
                }
            })
            .catch(e=>{
                res.status(500).json({error:true,message:e.parent.sqlMessage})
            })
        }else{
            Admins.findOne({
                where:{
                    id
                }
            })
            .then(admin=>{
                Users.update({
                    user_name:phone
                },{
                    where:{
                        user_name:admin.phone
                    }
                })
                .then(user=>{
                    if(user.length>0){
                        admin.update({
                            fname,
                            lname,
                            phone,
                            email,
                            position,
                            description,
                            avatar
                        })
                        .then(newAdmin=>{
                            res.json(newAdmin)
                        })
                        .catch(e=>{
                            res.status(500).json({error:true,message:e.parent.sqlMessage})
                        })
                    }
                })
                .catch(e=>{
                    res.status(500).json({error:true,message:e.parent.sqlMessage})
                })
            })
            .catch(e=>{
                res.status(500).json({error:true,message:e.parent.sqlMessage})
            })
        }
    })
    .catch(e=>{
        res.status(500).send({error:true,message:e.parent.sqlMessage})
    })
})

router.delete('/delete',(req,res)=>{
    const { user_name } = req.query;

    Users.destroy({
        where:{
            user_name
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