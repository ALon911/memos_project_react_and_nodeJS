
import React from "react";
import { useNavigate } from 'react-router-dom';
// import { useSearchParams } from 'react-router-dom';


import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card, Row, Container, Col, Button ,Form } from 'react-bootstrap';
function RequestReset(props) {
  // let [searchParams, setSearchParams] = useSearchParams();
  const [increment, setIncrement] = React.useState(0);
  const [greet, setGreet] = React.useState('');
  const navigate = useNavigate();  
  const no = (e) => {
      e.preventDefault();
      setIncrement(increment+1);
  }
  React.useEffect(() => {
        //changing the html to hebrew
        var newLang = 'he';
        document.documentElement.lang = newLang; 
        document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
        document.title = "Alon's Memo App";
  if (increment != 0) {
      alert('please wait few seconds for an email regarding the reset');
      var email = document.querySelector('.email').value;

      console.log("email: " + email);
      fetch('/auth/requestResetPassword', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
          email: email,
        })
      })
    .then((data) => 
    {
      
      console.log(data);
      // localStorage.setItem('currentName',(data.first_name + ' '+ data.last_name));
      // localStorage.setItem(data.email, data.token);
      // localStorage.setItem('currentEmail', data.email);
      // if ( data != undefined){

        setGreet(<Card className="mt-5" body text="success">Please check email for the reset email.</Card> );
      //   }
    }
    );
  }

  
}, [increment]) // this diff is necessary


  return (
<div className="d-flex justify-content-center">
      <Form>
    <Form.Group className="mb-3" controlId="formBasicEmail">
      <Form.Label>Email address</Form.Label>
      <Form.Control className="email" type="email" placeholder="Enter email" />
    </Form.Group>
  
    <Button variant="primary" type="submit" onClick={(e) => no(e)}>
    Reset Password
    </Button>
           
    {greet ? greet : '' }
  </Form>
   
  </div>



 

  );
}

export default RequestReset;