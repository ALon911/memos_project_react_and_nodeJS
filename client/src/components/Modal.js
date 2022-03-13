import React from 'react';
import Modal from 'react-modal';
import { jsx, css } from '@emotion/react'
import styled from '@emotion/styled';
import { Button, Container, Col, Row} from 'react-bootstrap';
import './App.css';
const styles = {}
const containerStyles = css`
top: 50%;
left: 50%;
position: fixed !important;
`;

export default function CalendarModal({
  children,
  isOpen,
  onRequestClose,
}) {
    function changingToRTL(){
        document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
    }
    const [someHtml, setSomeHtml] = React.useState([]);
   
    React.useEffect(() => {
      if (isOpen){
        document.getElementsByTagName('html')[0].setAttribute("dir", "ltr");
      }else{
        document.getElementsByTagName('html')[0].setAttribute("dir", "rtl");
      }
 console.log(children);

 var someData = [];
 for (var item in children){
     console.log('wtf',children[item]);
     if (children != 'Cancel'){
         console.log('this is props' ,children[item]);
         console.log('wtf',children[item]);
     console.log(children[item], 'test123 alon123');
     if (children[item].key =='iCal'){
      someData.push(<li>{children[item]}</li>);
     }else{ someData.push(<a href={encodeURI(children[item].props.href)}><li>{children[item].key}</li></a>);}
   
    // console.log(children[item].props.href,'test123');
     }
 }
 console.log(someData);
  setSomeHtml(someData);
  }, []);
  return (
    <Modal
    style={{}}
    className="mymodal"
    portalClassName="modal1"
    overlayClassName="myoverlay"
      isOpen={isOpen}
      onRequestClose={
        (e) =>{
            changingToRTL();
            onRequestClose(e); 
        }}
      shouldCloseOnOverlayClick={true}
    >
        <Container className="align-items-center" >
      <h2>Add to calendar</h2>
        <ul>
        {someHtml}
        </ul>
        <Button onClick={
        (e) =>{
            changingToRTL();
            onRequestClose(e); 
        }}>Cancel</Button>
        </Container>
      

   
    
    </Modal>
    
  );
}