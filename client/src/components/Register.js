import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
function Register(props) {

  const [increment, setIncrement] = React.useState(0);
  const navigate = useNavigate();  
  const no = (e) => {
      e.preventDefault();
      setIncrement(increment+1);
  }
  React.useEffect(() => {
    
  if (increment != 0) {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      var first_name = document.getElementById('first_name').value;
      var last_name = document.getElementById('last_name').value;
      console.log("email: " + email);
      console.log("password: " + password);
      fetch('/register1', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password
        })
      })
    .then((res) => res.json())
    .then((data) => 
    {
      
      console.log(data);
      localStorage.setItem('currentName',(data.first_name + ' '+ data.last_name));
      localStorage.setItem(data.email, data.token);
      localStorage.setItem('currentEmail', data.email);
      if ( data.token != undefined){
        props.Changedata(email);
        props.activateLogin();
        navigate('/memos');
        }
    }
    );
  }

  
}, [increment]) // this diff is necessary


  return (
    <div className="register">
          <div className="home d-flex justify-content-center">

      <div class="container">
        <input type="text" name="first_name" id="first_name"  placeholder="first name"/><br/>
        <input type="text" name="last_name" id="last_name" placeholder="last name"/><br/>
        <input type="text" name="email" id="email" placeholder="email"/><br/>
        <input type="text" name="password" id="password" placeholder="password"/><br/>
        <input type="button" name="SignIn" value="SignIn" onClick={(e) => no(e)} />
</div>
      </div>
    </div>
  );
}

export default Register;