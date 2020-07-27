import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';

import TableIcons from '../../../../common/tableIcons'

const CourseModules = props => {

    const { code, history, courseModules, reload, setReload } = props

    const [modules, setModules] = useState([]);

    useEffect(() => {
        if(courseModules){
            setModules(courseModules)
        }
    }, [reload, courseModules]);

    const handleRowClick = (event,rowData) =>{
        history.push(`/edit-unit/${code}/${rowData.id}`)
    }

    const handleAddModule = data =>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/v1/modules/add',{...data, course_code:code})
            .then(res=>{
                setReload(!reload)
                resolve()
            })
            .catch(e=>{
                setReload(!reload)
                reject()
            })
        })
    }

    const handleDeleteModule = data =>{
        return new Promise((resolve,reject)=>{
            axios.delete(`/api/v1/modules?code=${data.code}`)
            .then(res=>{
                setReload(!reload)
                resolve()
            })
            .catch(e=>{
                setReload(!reload)
                reject()
            })
        })
    }

    const handleUpateModule = (newData, oldData) =>{
        return new Promise((resolve,reject)=>{
            axios.post('/api/v1/modules/edit',{...newData,oldCode:oldData.code})
            .then(res=>{
                setReload(!reload)
                resolve()
            })
            .catch(e=>{
                setReload(!reload)
                reject()
            })
        })
    }

    return ( 
        <div>
            <MaterialTable
                title={code}
                icons={TableIcons}
                columns={[
                    {title:'Code',field:'code'},
                    {title:'Name',field:'name'},
                    {title:'Phase',field:'phase',type:'numeric'},
                    {
                        title:'Units',
                        field:'units',
                        type:"numeric",
                        render:rowData=><div>{rowData.moduleUnits.length}</div>
                    },
                    {
                        title:'Duration(Days)',
                        field:'duration',
                        type:"numeric",
                        render:rowData=><div>{rowData.moduleUnits.map(unit=>unit.duration).reduce((a,b)=>a+b,0)}</div>
                    }
                ]}
                data={modules}
                onRowClick={handleRowClick}
                editable={{
                    onRowAdd:handleAddModule,
                    onRowDelete:handleDeleteModule,
                    onRowUpdate:handleUpateModule
                }}
            />
        </div>
     );
}
 
export default CourseModules;