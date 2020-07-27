import React, { useState, useEffect } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios'
import { Table, TableHead, TableRow, TableCell, TableBody, Chip, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme=>({
    pending:{
        backgroundColor:theme.palette.warning.light,
        color:theme.palette.warning.contrastText
    },
    enrolled:{
        backgroundColor:theme.palette.success.light,
        color:theme.palette.success.contrastText
    }
}))

const Students = props => {

    const { code } = props

    const classes = useStyles()

    const [students, setStudents] = useState([]);

    useEffect(() => {
        axios.get(`/api/v1/students?course=${code}`)
        .then(res=>{
            setStudents(res.data)
        })
    }, [code]);

    return ( 
        <div>
            <PerfectScrollbar>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Reg  &#8470;</TableCell>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Phone</TableCell>
                            <TableCell>Status</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            students.map(student=>(
                                <TableRow hover key={student.id}>
                                    <TableCell>{student.reg_number}</TableCell>
                                    <TableCell>{student.fname}</TableCell>
                                    <TableCell>{student.lname}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.phone}</TableCell>
                                    <TableCell>
                                        <Chip className={classes[student.status]} label={student.status} size='small' />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </PerfectScrollbar>
        </div>
     );
}
 
export default Students;