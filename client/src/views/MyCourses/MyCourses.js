import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core'
import MaterialTable from 'material-table';
import axios from 'axios'

import icons from '../../common/tableIcons'

const useStyles = makeStyles(theme => ({
    root: {
      padding: theme.spacing(3)
    },
    content: {
      marginTop: theme.spacing(2)
    }
  }));

const MyCourses = props => {

    const { history } = props

    const classes = useStyles()

    const [ courses, setCourses] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        axios.get('/api/v1/courses')
        .then(res=>{
            setCourses(res.data)
        })
    }, [reload]);

    const state = {
        columns:[
            {title:'Code',field:'code'},
            {title:'Name',field:'name'},
            {
                title:'Phases',
                field:'phases',
                type:'numeric'
            },
            {
                title:'Modules',
                field:'modules',
                type:'numeric'
            },
            {
                title:'Duration(Days)',
                field:'duration',
                type:'numeric'
            }
        ]
    }

    const handleRowClick = (event,rowData) =>{
        history.push(`/edit-course/${rowData.code}`)
    }

    const handleAddCourse = data =>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/v1/courses/add',{...data})
            .then(res=>{
                setReload(!reload)
                resolve()
            })
            .catch(e=>{
                reject()
            })
        })
    }

    const handleUpdateCourse = (newData,oldData) =>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/v1/courses/edit',{...newData,oldId:oldData.code})
            .then(res=>{
                setReload(!reload)
                resolve()
            })
            .catch(e=>{
                console.log(e)
                reject()
            })
        })
    }

    const handleDeleteCourse = data =>{
        return new Promise((resolve,reject)=>{
            axios.delete(`/api/v1/courses/delete?code=${data.code}`)
            .then(res=>{
                setReload(!reload)
                resolve()
            })
            .catch(e=>{
                reject()
            })
        })
    }

    return ( 
        <div className={classes.root}>
            <MaterialTable
                title='All Courses'
                columns={state.columns}
                data={courses}
                icons={icons}
                options={{
                    pageSizeOptions:[5,10,20,50,100,150]
                }}
                editable={{
                    onRowAdd:newData=>handleAddCourse(newData),
                    onRowUpdate:handleUpdateCourse,
                    onRowDelete:oldData=>handleDeleteCourse(oldData)
                }}
                onRowClick={handleRowClick}
            />
        </div>
     );
}
 
export default MyCourses;