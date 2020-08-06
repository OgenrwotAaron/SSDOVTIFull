import React, { useState, useEffect } from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import MaterialTable from 'material-table';
import axios from 'axios'
import moment from 'moment'

import icons from '../../common/tableIcons'

const useStyles = makeStyles(theme=>({
    root:{
        padding:theme.spacing(3)
    }
}))

const Messages = props => {

    const { history } = props

    const classes = useStyles()

    const [messages, setMessages] = useState([]);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        axios.get('/api/v1/mail')
        .then(res=>{
            setMessages(res.data)
        })
        .catch(e=>{
            setMessages([])
        })
    }, [reload]);

    const handleRowDelete = rowData =>{
        return new Promise((resolve,reject)=>{
            axios.delete(`/api/v1/mail?id=${rowData.id}`)
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

    const handleRowClick = (event,rowData) =>{
        history.push(`/view-mail/${rowData.id}`)
    }

    return ( 
        <div className={classes.root}>
            <Typography variant='h4'>Messages</Typography>
            <MaterialTable
                icons={icons}
                columns={[
                    {title:'Sender',field:'sender',
                    render:rowData=>(
                        <div>
                            {rowData.seen === 0 ? 
                                <b>{rowData.sender}</b>
                            :
                                rowData.sender
                            }
                        </div>
                    )
                    },
                    {title:'Email',field:'email',
                    render:rowData=>(
                        <div>
                            {rowData.seen === 0 ? 
                                <b>{rowData.email}</b>
                            :
                                rowData.email
                            }
                        </div>
                    )
                    },
                    {title:'Subject',field:'subject',
                    render:rowData=>(
                        <div>
                            {rowData.seen === 0 ? 
                                <b>{rowData.subject}</b>
                            :
                                rowData.subject
                            }
                        </div>
                    )
                    },
                    {
                        title:'Time Sent',
                        field:'createdAt',
                        render:rowData=>(
                            <div>
                                {rowData.seen === 0 ? 
                                    <b>{moment(rowData.createdAt).fromNow()}</b>
                                :
                                    moment(rowData.createdAt).fromNow()
                                }
                            </div>
                        )
                    }
                ]}
                data={messages}
                editable={{
                    onRowDelete:oldData => handleRowDelete(oldData)
                }}
                onRowClick={handleRowClick}
            />
        </div>
     );
}
 
export default Messages;