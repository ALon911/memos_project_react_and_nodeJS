import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Container from '@mui/material/Container';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import './App.css';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';

function Dashboard (props) {

  const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
  }));
  
  const BootstrapDialogTitle = (props) => {
    const { children, onClose, ...other } = props;
  
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  };
  
  BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
  };
  

  
  const [renderedData, setRenderedData] = React.useState('');
  const [bigMessage, setBigMessage] = React.useState('');
  const [currentFullName, setCurrentFullName] = React.useState('');
  const [currentFirstName, setFirstName] = React.useState('');
  const [currentLastName, setLastName] = React.useState('');


  const [increment, setIncrement] = React.useState(0);
  const [realData, setRealData] = React.useState([]);
  const [temp, setTemp] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const navigate = useNavigate();  
  const no = (e) => {
      e.preventDefault();
      setIncrement(increment+1);
  }
  const deleteUser = async (id) => {
    var deleteResponse = await fetch("/user", {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
      },
      body: JSON.stringify({
        targetUser: id
      })
   });
   var deleteResponse1 = await deleteResponse.json();
   console.log(deleteResponse1.message);
   setIncrement(0);
  };

   const toggleAdmin = async (id) => {
    var toggleResponse = await fetch("/user", {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
      },
      body: JSON.stringify({
        _id: id
      })
   });
   console.log('toggle Admin response',toggleResponse);
   setIncrement(0);
   };
 
   
 
  const columns = [
    { field: 'id', headerName: 'ID', width: 250},
    { field: 'email', headerName: 'Email' ,width: 210},
    { field: 'first_name', headerName: 'First name' },
    { field: 'last_name', headerName: 'Last name'},
    { field: 'userType', headerName: 'Role'},
    {field: 'delete', headerName: 'Delete', 
    renderCell: (params) => (
      <IconButton aria-label="delete" color="primary" onClick={async ()=>{
        if(window.confirm(`Delete item ${params.row.first_name} ${params.row.last_name}?`)){
        console.log(params.row.id);
        deleteUser(params.row.id);
        }
        }}>
<DeleteIcon/>
    </IconButton>
    )},
    {field: 'edit', headerName: 'Edit', 
    renderCell: (params) => (
      <IconButton aria-label="edit" color="primary" onClick={async ()=>{
        console.log(params.row)
        }}>
      <EditIcon onClick={()=>
      {
        handleClickOpen();
        setCurrentFullName(`${params.row.first_name} ${params.row.last_name}`);
        setFirstName(params.row.first_name);
        setLastName(params.row.last_name);
    }}/></IconButton>
    )},
    {field: 'toggle_admin', headerName: 'Toggle Admin', 
    renderCell: (params) => (
      <IconButton aria-label="toggle_admin" color="primary" onClick={async ()=>{
        console.log(params.row);
        toggleAdmin(params.row.id);
        }}>
      <AdminPanelSettingsIcon/></IconButton>
    ),width: 165}
  ];
  React.useEffect(() => {
    
    //changing the html to hebrew
    var newLang = 'he';
    document.documentElement.lang = newLang; 
    document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
    document.title = "Alon's Memo App";
    var users;
    if ((increment)== 0 ){
      render1();
    
      }
  
  async function render1 (){
try {
  var fetchData = await fetch("/users", {
  method: 'GET',
  headers: {
    'Content-type': 'application/json',
    'x-access-token': `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
  }
});


var dataItems = await fetchData.json();
console.log('my data' ,dataItems.result);
    users = await dataItems.result.map((val)=> {
      val.id = val._id;
      return val;
    });

  console.log(users);

  console.log('this data', users);

    setRealData(users);
  
} catch (error) {
  setBigMessage('not authorized');
  setIncrement(increment+1);
}
 
        setIncrement(increment+1);
  
      }

 



}, [renderedData,increment]) // this diff is necessary


  return (

<div>{!bigMessage ? (<Container>
    <h1>Dashboard</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          hideBackdrop
          rows={realData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}      
        />
      </div>

      <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Open dialog
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
          {currentFullName}
        </BootstrapDialogTitle>
        <DialogContent dividers>
        <TextField
        id="outlined-name"
        label="First Name"
        value={currentFirstName}
      />
          <Typography gutterBottom>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
            Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
          </Typography>
          <Typography gutterBottom>
            Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
            magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
            ullamcorper nulla non metus auctor fringilla.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Save changes
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
      </Container>) : (<h1>Not Authorized!</h1>)}</div>
  );
}

export default Dashboard;