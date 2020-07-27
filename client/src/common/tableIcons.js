import React, { forwardRef } from 'react'

import SearchIcon from '@material-ui/icons/Search';
import HighlightOffOutlinedIcon from '@material-ui/icons/HighlightOffOutlined';
import DeleteOutlineOutlinedIcon from '@material-ui/icons/DeleteOutlineOutlined';
import ChevronLeftOutlinedIcon from '@material-ui/icons/ChevronLeftOutlined';
import ChevronRightOutlinedIcon from '@material-ui/icons/ChevronRightOutlined';
import LastPageOutlinedIcon from '@material-ui/icons/LastPageOutlined';
import FirstPageOutlinedIcon from '@material-ui/icons/FirstPageOutlined';
import DoneOutlinedIcon from '@material-ui/icons/DoneOutlined';
import CloseOutlinedIcon from '@material-ui/icons/CloseOutlined';
import ImportExportIcon from '@material-ui/icons/ImportExport';
import PostAddOutlinedIcon from '@material-ui/icons/PostAddOutlined';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';

const icons={
    Search: forwardRef((props,ref) => <SearchIcon {...props} ref={ref}/>),
    ResetSearch: forwardRef((props,ref)=><HighlightOffOutlinedIcon {...props} ref={ref}/>),
    Delete:forwardRef((props,ref)=><DeleteOutlineOutlinedIcon {...props} ref={ref}/>),
    PreviousPage:forwardRef((props,ref)=><ChevronLeftOutlinedIcon {...props} ref={ref}/>),
    NextPage:forwardRef((props,ref)=><ChevronRightOutlinedIcon {...props} ref={ref}/>),
    FirstPage:forwardRef((props,ref)=><FirstPageOutlinedIcon {...props} ref={ref}/>),
    LastPage:forwardRef((props,ref)=><LastPageOutlinedIcon {...props} ref={ref}/>),
    Check:forwardRef((props,ref)=><DoneOutlinedIcon {...props} ref={ref}/>),
    Clear:forwardRef((props,ref)=><CloseOutlinedIcon {...props} ref={ref}/>),
    SortArrow:forwardRef((props,ref)=><ImportExportIcon {...props} ref={ref}/>),
    Add:forwardRef((props,ref)=><PostAddOutlinedIcon {...props} ref={ref}/>),
    Edit:forwardRef((props,ref)=><EditOutlinedIcon {...props} ref={ref}/>)
}

export default icons