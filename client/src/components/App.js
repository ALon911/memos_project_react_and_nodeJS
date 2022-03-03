import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Button from 'react-bootstrap/Button';
import Navbar1 from './navbar1';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
function App(props) {


  const [name, setName] = React.useState('');
  const [text, setText] = React.useState('');
  const [data, setData] = React.useState(null);
  const [info, setInfo] = React.useState(null);
  const [delete1, setDelete1] = React.useState([]);
  const [count1, setCount1] = React.useState(0);
  const [deleted1, setDeleted1] = React.useState([]);


  const handleText = (event) => {
    setText(event.target.value);
  };
  const softDelete = (event1) => {


    // setInfo(info => info.filter((el) => el._id !== event1.target.id));
    setInfo(
      info => info.map( (el)=>{
      if (el._id == event1.target.id ) {
        el.deleted = !el.deleted;
        console.log('test start here');
        console.log(el.deleted);
        console.log(el.deleted);
        console.log(el.deleted);
        console.log(el.deleted);
        console.log(el.deleted);
        console.log(el.deleted);
        console.log(el.deleted);
        console.log(el.deleted);
        console.log(el.deleted);
        console.log('test end here');
  
          
          fetch('/edit', {
            credentials: 'include',
            headers: {
              'Content-Type': 'application/json',
              'x-access-token': `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
            },
            method: 'PUT',
            body: JSON.stringify({
              _id: event1.target.id,
              deleted: el.deleted,
              
            })
          }).then(data => {
            console.log('Success:', data);
            setCount1(count1+1);
          })
          .catch((error) => {
            console.error('Error:', error);
            

          });

          


      };
      return el;   
      })
    );
   
    
    
  };

  const hardDeleteAll = () =>{ 
    var ids =[];
    info.map(
      (val)=> {  
        if (val.deleted == true){
        ids.push(val._id);
        }
      }
    );

  setCount1(count1+1);    

  fetch('/delete', {
    headers: {
      'Content-type': 'application/json',
      'x-access-token': `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
    },
    method: 'DELETE',
    body: JSON.stringify({
      _id: ids,
      description: text,
      token: `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
    })
  }).then(
    setInfo(
    info => info.map( (el)=>{
      if (el.deleted == true ) el.deleted = true;
      return el;   
      })
    )
  )

};
  const handleAddMemo = () => {
 
    
    fetch('/main', {
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
      },
      method: 'POST',
      body: JSON.stringify({
        description: text,
        deleted: false
      })
    }).then((res) => res.json())
    .then((data) => 
    {
      console.log(data);
       
      setInfo(info.concat({_id: data._id, description: text, deleted: false}));
      setText('');
    })
    setCount1(count1+1); 
    
  };
  const handleAddMemoEnter = (e) => {
    console.log(e);
    if (e.key == 'Enter'){
    fetch('/main', {
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
      },
      method: 'POST',
      body: JSON.stringify({
        description: text,
        deleted: false
      })
    }).then((res) => res.json())
    .then((data) => 
    {
      console.log(data);
       
      setInfo(info.concat({_id: data._id, description: text, deleted: false}));
      setText('');
    })
    setCount1(count1+1); 
  }
  };

  const filterDeleted = () => {
    
 
    
    setInfo(info => info.filter((el) => el.deleted == true));

  };
  React.useEffect(() => {
    setName(localStorage.getItem('currentName'));
    console.log('alon test start');
    console.log(props);
    console.log(props);
    console.log(props.email1);
    console.log(localStorage.getItem(props.email1));
    console.log('alon test end');
    //changing the html to hebrew
    var newLang = 'he';
    document.documentElement.lang = newLang; 
    document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
    document.title = "Alon's Memo App";

    firstTime();

    function renderElements (elementObj){
        return elementObj.map((data1) =>{
            console.log(data1.deleted);
            console.log(data1.deleted);
            console.log(data1.deleted);
            if (data1.deleted == false){
            var currentList = <div> 
              <li className="m-4 memo">{data1.description}
              <br/>
        תאריך: {data1.createdAt}
            <Button id={data1._id} name={data1._id} type="button" onClick={
            (event) =>
            softDelete(event)    
          }
            >מחק תזכורת</Button></li>
            <hr/>
            </div>;
            
        }else{
          var currentList = <div> 
        <li className="m-4 memo"><strike>{data1.description}</strike>
        <br/>
        תאריך: {data1.createdAt}
        <Button id={data1._id} name={data1._id} type="button" onClick={
        (event) => 
        softDelete(event)
        }
        >מחק תזכורת</Button></li>
        <hr/>
        </div>;
        }
        return currentList;
            
          });

    }
    
    function firstTime(){
    
    fetch("/allMemos", {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'x-access-token': `${localStorage.getItem(localStorage.getItem('currentEmail'))}`
      }
      ,body: 
        JSON.stringify({token: `${localStorage.getItem(localStorage.getItem('currentEmail'))}`})
   })
      .then((res) => res.json())
      .then((dataItems) => 
      {
        
        
        console.log(dataItems);
        var memos = renderElements(dataItems);
      setData(memos);
      setInfo(dataItems);
      console.log(dataItems);
      }
  );
    }

  }, [count1]);



  return (
    <div className="App">

      <h1>Welcome {name} !!</h1>
      <header className="App-header" >
        
        <input className="memo" type="text" value={text} onKeyPress={(e) => handleAddMemoEnter(e)} onChange={handleText} />
        <Button type="button" variant="success"  onClick={handleAddMemo}>
        הוסף תזכורת
        </Button>
        <p>{!data ? "Loading..." : data}</p>
 
        
        <Button type="button" variant="danger" onClick={hardDeleteAll}>
        מחיקה סופית
        </Button>
      </header>
    </div>
  );
}

export default App;