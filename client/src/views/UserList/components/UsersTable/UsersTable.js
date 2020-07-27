import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import moment from 'moment'
import PerfectScrollbar from 'react-perfect-scrollbar';
import axios from 'axios';
import {
  Card,
  CardContent,
  Chip,
  makeStyles
} from '@material-ui/core';
import MaterialTable from 'material-table';
import TableIcons from '../../../../common/tableIcons';

const useStyles = makeStyles(theme => ({
  root: {},
  content: {
    padding: 0
  },
  pending:{
    backgroundColor:theme.palette.warning.dark,
    color:theme.palette.warning.contrastText
  },
  parttime:{
    backgroundColor:theme.palette.warning.dark,
    color:theme.palette.warning.contrastText
  },
  enrolled:{
    backgroundColor:theme.palette.success.main,
    color:theme.palette.success.contrastText
  },
  fulltime:{
    backgroundColor:theme.palette.success.main,
    color:theme.palette.success.contrastText
  },
  trainee:{
    backgroundColor:theme.palette.error.dark,
    color:theme.palette.warning.contrastText
  },
}));

const UsersTable = props => {
  const { className, users, type, ...rest } = props;

  const classes = useStyles();

  const [ students, setStudents ] = useState([]);
  const [ teachers, setTeachers] = useState([]);
  const [admins, setAdmins] = useState([]);
  const [ courses, setCourses ] = useState({})
  const [ reloadStudent, setReloadStudent ] = useState(false)
  const [ reloadTeacher, setReloadTeacher ] = useState(false)
  const [reloadAdmin, setReloadAdmin] = useState(false);

  useEffect(()=>{
    axios.get('/api/v1/courses/available')
    .then(res=>{
      if(res.data.success){
        const opts = {}
        res.data.data.forEach(item => {
          opts[item.code] = item.name
        });
        setCourses(opts)
      }
    })
  },[])

  useEffect(()=>{
    axios.get('/api/v1/students')
    .then(res=>{
      setStudents(res.data)
    })
  },[reloadStudent])

  useEffect(() => {
    axios.get('/api/v1/teachers')
    .then(res=>{
      setTeachers(res.data)
    })
  }, [reloadTeacher]);

  useEffect(() => {
    axios.get('/api/v1/admins')
    .then(res=>{
      setAdmins(res.data)
    })
  }, [reloadAdmin]);

  const handleAddStudent = (data) =>{
    return new Promise((resolve,reject)=>{
      axios.post('/api/v1/students/register',{...data})
      .then(res=>{
        setReloadStudent(!reloadStudent)
        resolve()
      })
      .catch(e=>{
        reject()
      })
    })
  }

  const handleAddTeacher = data =>{
    return new Promise((resolve,reject)=>{
      axios.post('/api/v1/teachers/register',{...data})
      .then(res=>{
        setReloadTeacher(!reloadTeacher)
        resolve()
      })
      .catch(e=>{
        reject()
      })
    })
  }

  const handleAddAdmin = data =>{
    return new Promise((resolve,reject)=>{
      axios.post('/api/v1/admins/register',{...data})
      .then(res=>{
        setReloadAdmin(!reloadAdmin)
        resolve()
      })
      .catch(e=>{
        reject()
      })
    })
  }

  const handleEditStudent = (data) =>{
    return new Promise((resolve,reject)=>{
      axios.post('/api/v1/students/edit',{...data})
      .then(res=>{
        setReloadStudent(!reloadStudent)
        resolve()
      })
      .catch(e=>{
        reject()
      })
    })
  }

  const handleEditTecher = data =>{
    return new Promise((resolve,reject)=>{
      axios.post('/api/v1/teachers/edit',{...data})
      .then(res=>{
        setReloadTeacher(!reloadTeacher)
        resolve()
      })
      .catch(e=>{
        reject()
      })
    })
  }

  const handleEditAdmin = data =>{
    return new Promise((resolve,reject)=>{
      axios.post('/api/v1/admins/edit',{...data})
      .then(res=>{
        setReloadAdmin(!reloadAdmin)
        resolve()
      })
      .catch(e=>{
        reject()
      })
    })
  }

  const handleDeleteStudent = (data) =>{
    return new Promise((resolve,reject)=>{
      axios.delete(`/api/v1/students/delete?user_name=${data.reg_number}`)
      .then(res=>{
        setReloadStudent(!reloadStudent)
        resolve()
      })
      .catch(e=>{
        reject()
      })
    })
  }

  const handleDeleteTeacher = data =>{
    return new Promise((resolve,reject)=>{
      axios.delete(`/api/v1/teachers/delete?user_name=${data.phone}`)
      .then(res=>{
        setReloadTeacher(!reloadTeacher)
        resolve()
      })
      .catch(e=>{
        reject()
      })
    })
  }

  const handleDeleteAdmin = data =>{
    return new Promise((resolve,reject)=>{
      axios.delete(`/api/v1/admins/delete?user_name=${data.phone}`)
      .then(res=>{
        setReloadAdmin(!reloadAdmin)
        resolve()
      })
      .catch(e=>{
        reject()
      })
    })
  }

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <CardContent className={classes.content}>
        <PerfectScrollbar>
          <div className={classes.inner}>
            {
              type === 'students' ? 
                <MaterialTable
                  title='Students'
                  icons={TableIcons}
                  options={{
                      pageSizeOptions:[5,10,20,50,100,150]
                  }}
                  columns={[
                    {title:'Reg Number',field:'reg_number',initialEditValue:'SSDOVT-'},
                    {title:'First Name',field:'fname'},
                    {title:'Last Name',field:'lname'},
                    {title:'Phone Number',field:'phone'},
                    {
                      title:'Status',
                      field:'status',
                      lookup:{'pending':'pending','enrolled':'enrolled'},
                      render:rowData=><div> <Chip className={classes[rowData.status]} size='small' label={rowData.status}/></div>
                    },
                    {
                      title:'Course',
                      field:'course_code',
                      lookup:courses
                    },
                    {
                      title:'Joined',
                      field:'joined',
                      type:'datetime',
                      render:rowData=><div>{moment(rowData.joined).format('LL')}</div>
                    }
                  ]}
                  data={students}
                  editable={{
                    onRowAdd:newData=>handleAddStudent(newData),
                    onRowDelete:oldData=>handleDeleteStudent(oldData),
                    onRowUpdate:newData=>handleEditStudent(newData)
                  }}
                />
              :
                type === 'teachers' ?
                  <MaterialTable
                    title='Teachers'
                    icons={TableIcons}
                    options={{
                        pageSizeOptions:[5,10,20,50,100,150]
                    }}
                    columns={[
                      {title:'First Name',field:'fname'},
                      {title:'Last Name',field:'lname'},
                      {title:'Email',field:'email'},
                      {title:'Phone Number',field:'phone'},
                      {
                        title:'Status',
                        field:'status',
                        lookup:{'parttime':'parttime','fulltime':'fulltime','trainee':'trainee'},
                        render:rowData=><div> <Chip className={classes[rowData.status]} size='small' label={rowData.status}/></div>
                      },
                      {title:'Course',field:'course_code',lookup:courses},
                      {title:'Modules',field:'modules',editable:'never'}
                    ]}
                    data={teachers}
                    editable={{
                      onRowAdd:newData=>handleAddTeacher(newData),
                      onRowDelete:oldData=>handleDeleteTeacher(oldData),
                      onRowUpdate:newData=>handleEditTecher(newData)
                    }}
                  />
                :
                <MaterialTable
                    title='Admins'
                    icons={TableIcons}
                    options={{
                        pageSizeOptions:[5,10,20,50,100,150]
                    }}
                    columns={[
                      {title:'First Name',field:'fname'},
                      {title:'Last Name',field:'lname'},
                      {title:'Email',field:'email'},
                      {
                        title:'Position',
                        field:'position'
                      },
                    ]}
                    data={admins}
                    editable={{
                      onRowAdd:newData=>handleAddAdmin(newData),
                      onRowDelete:oldData=>handleDeleteAdmin(oldData),
                      onRowUpdate:newData=>handleEditAdmin(newData)
                    }}
                  />
            }
          </div>
        </PerfectScrollbar>
      </CardContent>
    </Card>
  );
};

UsersTable.propTypes = {
  className: PropTypes.string,
  users: PropTypes.array.isRequired
};

export default UsersTable;
