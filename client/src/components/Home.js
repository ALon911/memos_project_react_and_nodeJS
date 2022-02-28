import React from "react";
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Container, Col, Button ,Form } from 'react-bootstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import { useNavigate } from 'react-router-dom';



function Home(props) {
  const navigate = useNavigate();
    const [increment, setIncrement] = React.useState(0);
    
    const no = (e) => {
        e.preventDefault();
        setIncrement(increment+1);
    }
    React.useEffect(() => {

      props.getPath(window.location.pathname);

    if (increment != 0) {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        console.log("email: " + email);
        console.log("password: " + password);
        fetch('/login', {
          headers: { "Content-Type": "application/json; charset=utf-8" },
          method: 'POST',
          body: JSON.stringify({
            email: email,
            password: password
          })
        })
      .then((res) => res.json())
      .then((data) => 
      {
        localStorage.setItem('currentName',(data.first_name + ' '+ data.last_name));
        localStorage.setItem(email, data.token);
        localStorage.setItem('currentEmail', data.email);
        if ( data.token != undefined){
        props.Changedata(email);
        props.activateLogin(true);
        console.log(props.activateLogin);
        navigate("/memos");
        }
        console.log(data);

      }
  );
    }

    console.log(props.currentPath);
  }, [increment,props.location]) // this diff is necessary

  return (
    <div className="home d-flex justify-content-center">

    <Container>
    <Row  className="d-flex justify-content-center">
    <Col sm={6}>
<Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control id="email" name="email" type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control id="password" name="password" type="password" placeholder="Password" />
  </Form.Group>

  <Button variant="primary" type="submit" onClick={(e) => no(e)}>
    Submit
  </Button>
</Form>
</Col>
</Row>
    </Container>
    </div>
  );
}

export default Home;