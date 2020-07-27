const express = require('express')
const router = express.Router();
const passFather = require('passfather')

const Users = require('../models/Users');
const Student = require('../models/Students');

//get all students
router.get('/',(req,res)=>{

    const { course } = req.query

    if(course){
        Student.findAll({
            where:{
                course_code:course
            },
            order:[
                ['reg_number']
            ]
        })
        .then(users=>{
            res.json(users)
        })
        .catch(e=>{
            res.status(500).json({error:true,message:e.parent.sqlMessage})
        })
    }else{
        Student.findAll({
            order:[
                ['reg_number']
            ]
        })
        .then(users=>{
            res.json(users)
        })
        .catch(e=>{
            res.status(500).json({error:true,message:e.parent.sqlMessage})
        })
    }
})

//create a student
router.post('/register',(req,res)=>{
    const { reg_number, fname, lname, phone, course_code, joined, status } = req.body;

    Users.create({
        user_name:reg_number,
        password:reg_number
    })
    .then(user=>{
        Student.create({
            reg_number:user.user_name,
            fname,
            lname,
            phone,
            course_code,
            joined,
            status
        })
        .then(student=>{
            res.json(student)
        })
        .catch(e=>{
            res.status(500).json({error:true,message:e.parent.sqlMessage})
        })
    })
    .catch(e=>{
        if(e.parent.code === 'ER_DUP_ENTRY'){
            Student.create({
                reg_number,
                fname,
                lname,
                phone,
                course_code,
                joined
            })
            .then(student=>{
                res.json(student)
            })
            .catch(e=>{
                res.status(400).json({error:true,message:e.parent.sqlMessage})
            })
        }else{
            res.status(500).json({error:true,message:e.parent.sqlMessage})
        }
    })
})

//edit student details
router.post('/edit',(req,res)=>{
    const { course_code, fname, id, joined, lname, phone, reg_number, status, avatar } = req.body

    //use id to get user
    Users.findOne({
        where:{
            user_name:reg_number
        }
    })
    .then(user=>{
        if(user){
            Student.findOne({
                where:{
                    reg_number:user.user_name
                }
            })
            .then(student=>{
                if(student.id === id){
                    student.update({
                        fname,
                        lname,
                        phone,
                        course_code,
                        status,
                        joined,
                        avatar
                    })
                    .then(newStudent=>{
                        res.json(newStudent)
                    })
                    .catch(e=>{
                        res.status(500).json({error:true,message:e.parent.sqlMessage})
                    })
                }else{
                    res.status(400).json({error:true,message:'Registration Number must be Unique'})
                }
            })
            .catch(e=>{
                res.status(500).json({error:true,message:e.parent.sqlMessage})
            })
        }else{
            Student.findOne({
                where:{
                    id
                }
            })
            .then(student=>{
                Users.update({
                    user_name:reg_number
                },{
                    where:{
                        user_name:student.reg_number
                    }
                })
                .then(user=>{
                    if(user.length>0){
                        student.update({
                            fname,
                            lname,
                            phone,
                            course_code,
                            status,
                            joined
                        })
                        .then(newStudent=>{
                            res.json(newStudent)
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

module.exports = router;