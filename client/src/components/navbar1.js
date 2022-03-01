import React from 'react';
import {Container, Nav,Navbar} from 'react-bootstrap';
import {Link, Navigate} from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Navbar1 = (props) => {
  const navigate = useNavigate();
  const logout=(e) =>{
    var trick = localStorage.getItem('currentEmail');
    localStorage.removeItem(trick);
    localStorage.removeItem('currentEmail');
    props.disconnect();
    console.log(props.isLoggedIn);
    Navigate('/login');
  };
  React.useEffect(()=> {
    console.log(props.isLoggedIn);
    console.log(props.isLoggedIn);
    console.log(props.isLoggedIn);
    console.log(props.isLoggedIn);
    



  },[props.isLoggedIn])
    return (
       <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Navbar.Brand href="#home">תוכנת תזכורות</Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
         
            
           
 <Nav>
 <Nav.Link as={Link} to='/dashboard'>דשבורד</Nav.Link>
 {  !props.isLoggedIn && (<Nav.Link as={Link} to='/login'>התחברות</Nav.Link>)}
         {!props.isLoggedIn &&  (<Nav.Link as={Link} to='/register'>הרשמה</Nav.Link>)}
         {props.isLoggedIn &&  (<Nav.Link as={Link} to='/memos'>תזכורות</Nav.Link>)}
          {props.isLoggedIn && (<Nav.Link onClick={   (event) => logout(event) }>התנתקות</Nav.Link>)}
</Nav>
          
         
      </Navbar.Collapse>
  </Navbar>
      );
    
    

}

export default Navbar1;