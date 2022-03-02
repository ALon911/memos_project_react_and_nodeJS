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
import Modal from '@mui/material/Modal';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import DialogContentText from '@mui/material/DialogContentText';

function Dashboard (props) {


  const [editIndicator, setEditIndicator] = React.useState(0);
  const [renderedData, setRenderedData] = React.useState('');
  const [bigMessage, setBigMessage] = React.useState('');
  const [currentFullName, setCurrentFullName] = React.useState('');
  const [currentFirstName, setFirstName] = React.useState('');
  const [currentLastName, setLastName] = React.useState('');
  const [currentEmail, setEmail] = React.useState('');
  const [currentID, setID] = React.useState('');

  const [emailError, setEmailError] = React.useState('');


  const [increment, setIncrement] = React.useState(0);
  const [realData, setRealData] = React.useState([]);
  const [temp, setTemp] = React.useState([]);
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    userEdit({
     id: currentID,
     first_name: currentFirstName,
     last_name: currentLastName,
     email: currentEmail
   })
    setOpen(false);
    
  };
  const handleCancel = () => {
    setOpen(false);
    setEditIndicator(editIndicator+1);
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
    var toggleResponse = await fetch("/user/toggle", {
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
 
   const userEdit = async (userObj) => {
    var editResponse = await fetch("/user/edit", {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
      },
      body: JSON.stringify({
        _id: userObj.id,
        first_name: userObj.first_name,
        last_name: userObj.last_name,
        email: userObj.email
      })
   });
   console.log('User edit response',editResponse);
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
        setCurrentFullName(`${params.row.first_name} ${params.row.last_name}`);
        setFirstName(params.row.first_name);
        setLastName(params.row.last_name);
        setEmail(params.row.email);
        setID(params.row.id);
        handleClickOpen();
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
if (editIndicator != 0){
  var el = document.querySelector(".email input");
  console.log(el);
}
 



}, [increment,editIndicator]) // this diff is necessary


  return (
<div>
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

    
      </Container>) : (<h1>Not Authorized!</h1>)}</div>
      <div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <Box      sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column',
          p: 1,
          m: 1,
          bgcolor: 'background.paper',
          borderRadius: 1,
        }}>
          <TextField sx={{ my: 2 }}
          id="outlined-name"
          className="first_name"
          label="First Name"
          defaultValue={currentFirstName}
          onChange={e => setFirstName(e.target.value)}
          
        />
          <TextField sx={{ my: 2 }}
          id="outlined-name"
          className="last_name"
          label="Last Name"
          defaultValue={currentLastName}
          onChange={e => setLastName(e.target.value)}
        />
             <TextField sx={{ my: 2 }}
          error={emailError}   
          type="email"
          id="outlined-name"
          className="email"
          label="email"
          defaultValue={currentEmail}
          onChange={e => { if (/^[^@]+@[^@]+\.[^@]+$/.test(e.target.value) ) 
            {setEmail( e.target.value);
              setEmailError('');
            }else{
              setEmailError('issue');
            }} }
        />
        </Box >
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={handleClose}>Save</Button>
          <Button color="info" onClick={handleCancel}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </div>
    

      </div>
  );
}

export default Dashboard;