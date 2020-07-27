import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import axios from 'axios'

import TableIcons from '../../common/tableIcons'
import MaterialTable from 'material-table';

const useStyles = makeStyles(theme=>({
    root:{
        padding:theme.spacing(3)
    }
}))

const EditUnit = props => {

    const classes = useStyles()

    const { match:{params}, history } = props

    const [units, setUnits] = useState([]);
    const [info, setInfo] = useState({
        name:'',
        code:'',
        duration:''
    });
    const [reload, setReload] = useState(false);

    useEffect(() => {
        axios.get(`/api/v1/modules?code=${params.module}`)
        .then(res=>setInfo(res.data))
    }, [params.module]);

    useEffect(() => {
        axios.get(`/api/v1/units?module=${params.module}`)
        .then(res=>setUnits(res.data))
    }, [params.module,reload]);

    const handleRowClick = (event,rowData) =>{
        history.push(`/module/${params.course}/${params.module}/${rowData.id}`)
    }

    const handleAddUnit = data =>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/v1/units/add',{...data, module_code:params.module })
            .then(res=>{
                setReload(!reload)
                resolve()
            })
            .catch(e=>{
                setReload(!reload)
                resolve()
            })
        })
    }

    const handleUpdateUnit = (newData,oldData) =>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/v1/units/edit',{...newData,oldCode:oldData.code})
            .then(res=>{
                setReload(!reload)
                resolve()
            })
            .catch(e=>{
                setReload(!reload)
                resolve()
            })
        })
    }

    const handleDeleteUnit = data =>{
        return new Promise((resolve,reject)=>{
            axios.delete(`/api/v1/units?code=${data.code}`)
            .then(res=>{
                setReload(!reload)
                resolve()
            })
            .catch(e=>{
                setReload(!reload)
                resolve()
            })
        })
    }

    return ( 
        <div className={classes.root}>
            <Typography variant='h4'>Module Name: {info.name}</Typography>
            <Typography variant='h5' color='textSecondary'>Code: {info.code}</Typography>
            <Typography color='textSecondary'>Duration: {info.duration} Days</Typography>
            <MaterialTable
                title='Units'
                columns={[
                    {title:'Code',field:'code',initialEditValue:info.code},
                    {title:'Name',field:'name'},
                    {title:'Duration(Days)',field:'duration',type:'numeric'},
                ]}
                data={units}
                icons={TableIcons}
                onRowClick={handleRowClick}
                editable={{
                    onRowAdd:handleAddUnit,
                    onRowDelete:handleDeleteUnit,
                    onRowUpdate:handleUpdateUnit
                }}
            />
        </div>
     );
}
 
export default EditUnit;