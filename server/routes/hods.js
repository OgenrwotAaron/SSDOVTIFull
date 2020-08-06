const express = require('express');
const router = express.Router()

const HOD = require('../models/HODS')
const Users = require('../models/Users')

router.get('/',(req,res)=>{
    HOD.findAll()
    .then(hods=>{
        res.json(hods)
    })
    .catch(e=>{
        res.json({error:true,message:e.parent.sqlMessage})
    })
})

router.post('/register',(req,res)=>{
    const { fname, lname, email, phone, description, course_code } = req.body

    Users.create({
        user_name:phone,
        password:phone,
        role:3
    })
    .then(user=>{
        HOD.create({
            fname,
            lname,
            email,
            phone,
            description,
            course_code
        })
        .then(hod=>{
            res.json(hod)
        })
        .catch(e=>{
            res.json({error:true,message:e.parent.sqlMessage})
        })
    })
    .catch(e=>{
        if(e.parent.code === 'ER_DUP_ENTRY'){
            HOD.create({
                fname,
                lname,
                email,
                phone,
                description
            })
            .then(hod=>{
                res.json(hod)
            })
            .catch(e=>{
                res.json({error:true,message:e.parent.sqlMessage})
            })
        }else{
            res.json({error:true,message:e.parent.sqlMessage})
        }
    })
})

router.post('/edit',(req,res)=>{
    const { email, fname, id, lname, phone, description, avatar} = req.body

    //use id to get user
    Users.findOne({
        where:{
            user_name:phone
        }
    })
    .then(user=>{
        if(user){
            HOD.findOne({
                where:{
                    phone:user.user_name
                }
            })
            .then(hod=>{
                if(hod.id === id){
                    hod.update({
                        fname,
                        lname,
                        phone,
                        description,
                        email,
                        avatar
                    })
                    .then(newHod=>{
                        res.json({newHod,user})
                    })
                    .catch(e=>{
                        res.status(500).json({error:true,message:e.parent.sqlMessage})
                    })
                }else{
                    res.status(400).json({error:true,message:'Phone Number must be Unique'})
                }
            })
            .catch(e=>{
                res.status(500).json({error:true,message:e.parent.sqlMessage})
            })
        }else{
            HOD.findOne({
                where:{
                    id
                }
            })
            .then(hod=>{
                Users.update({
                    user_name:phone,
                },{
                    where:{
                        user_name:hod.phone
                    }
                })
                .then(user=>{
                    if(user.length>0){
                        hod.update({
                            fname,
                            lname,
                            phone,
                            description,
                            email,
                            avatar
                        })
                        .then(newHod=>{
                            res.json({newHod,user})
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
        res.status(500).json({error:true,message:e.parent.sqlMessage})
    })
})

router.delete('/delete',(req,res)=>{
    const { user_name } = req.query

    Users.destroy({
        where:{
            user_name
        }
    })
    .then(deleted=>{
        res.json({message:'deleting '+user_name,deleted})
    })
    .catch(e=>{
        res.status(500).json({error:true,message:e.parent.sqlMessage})
    })
})

module.exports = router