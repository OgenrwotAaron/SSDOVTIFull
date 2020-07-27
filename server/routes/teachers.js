const express = require('express')
const router = express.Router()
const passFather = require('passfather');

const Users = require('../models/Users');
const Teachers = require('../models/Teachers')

//get all teachers
router.get('/',(req,res)=>{
    Teachers.findAll()
    .then(teachers=>{
        res.json(teachers)
    })
    .catch(e=>{
        res.json({error:true,message:e.parent.sqlMessage})
    })
})

//create a teacher
router.post('/register',(req,res)=>{
    const { fname, lname, email, phone, status, course_code } = req.body

    Users.create({
        user_name:phone,
        password:phone,
        role:1
    })
    .then(user=>{
        Teachers.create({
            fname,
            lname,
            email,
            phone,
            status,
            course_code
        })
        .then(teacher=>{
            res.json(teacher)
        })
        .catch(e=>{
            res.json({error:true,message:e.parent.sqlMessage})
        })
    })
    .catch(e=>{
        if(e.parent.code === 'ER_DUP_ENTRY'){
            Teachers.create({
                fname,
                lname,
                email,
                phone,
                status
            })
            .then(teacher=>{
                res.json(teacher)
            })
            .catch(e=>{
                res.json({error:true,message:e.parent.sqlMessage})
            })
        }else{
            res.json({error:true,message:e.parent.sqlMessage})
        }
    })
})

//edit teacher details
router.post('/edit',(req,res)=>{
    const { email, fname, id, lname, phone, status, avatar} = req.body

    //use id to get user
    Users.findOne({
        where:{
            user_name:phone
        }
    })
    .then(user=>{
        if(user){
            Teachers.findOne({
                where:{
                    phone:user.user_name
                }
            })
            .then(teacher=>{
                if(teacher.id === id){
                    teacher.update({
                        fname,
                        lname,
                        phone,
                        status,
                        email,
                        avatar
                    })
                    .then(newTeacher=>{
                        res.json(newTeacher)
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
            Teachers.findOne({
                where:{
                    id
                }
            })
            .then(teacher=>{
                Users.update({
                    user_name:phone
                },{
                    where:{
                        user_name:teacher.phone
                    }
                })
                .then(user=>{
                    if(user.length>0){
                        teacher.update({
                            fname,
                            lname,
                            phone,
                            status,
                            email,
                            avatar
                        })
                        .then(newTeacher=>{
                            res.json(newTeacher)
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