import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';

import './App.css';

function Dashboard (props) {

  const [renderedData, setRenderedData] = React.useState('');
  const [increment, setIncrement] = React.useState(0);
  const [realData, setRealData] = React.useState([]);
  const [temp, setTemp] = React.useState([]);
  const navigate = useNavigate();  
  const no = (e) => {
      e.preventDefault();
      setIncrement(increment+1);
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 250},
    { field: 'first_name', headerName: 'First name' },
    { field: 'last_name', headerName: 'Last name'},
    { field: 'userType', headerName: 'Role'},
    {field: 'delete', headerName: 'Delete', 
    renderCell: (params) => (
      <IconButton aria-label="delete" color="primary" onClick={async ()=>{
        console.log(params.row);
        }}>
<DeleteIcon/>
    </IconButton>
    )},
    {field: 'edit', headerName: 'Edit', 
    renderCell: (params) => (
      <IconButton aria-label="edit" color="primary" onClick={async ()=>{
        console.log(params.row)
        }}>
      <EditIcon/></IconButton>
    )}
  ];
  React.useEffect(() => {
    

    var users;
    if ((increment)== 0 ){
      render1();
    
      }
  
  async function render1 (){
    if (realData.length == 0){
      var fetchData = await fetch("/users", {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
      }
   })
  
   
   var dataItems = await fetchData.json();
  
        users = await dataItems.map((val)=> {
          val.id = val._id;
          return val;
        });
    
      console.log(users);

      console.log('this data', users);

        setRealData(users);
        runOnce();
      }
  
      }

 
  function runOnce(){
    if (users != 'undefined'){
      if (users[0].length > 0){
      setIncrement(increment+1);
      }
  }
}


}, [renderedData]) // this diff is necessary


  return (

<div><Container>
    <h1>Dashboard</h1>
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={realData}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}      
        />
      </div>
      </Container></div>
  );
}

export default Dashboard;