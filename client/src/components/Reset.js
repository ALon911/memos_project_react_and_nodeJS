import React from "react";
import { useNavigate } from 'react-router-dom';
import { useSearchParams } from 'react-router-dom';
function Reset(props) {
  let [searchParams, setSearchParams] = useSearchParams();
  const [increment, setIncrement] = React.useState(0);
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

      var password = document.getElementById('password').value;
      var userId = props.userId;
      var userToken = props.userToken;
      console.log("password: " + password);
      fetch('/register1', {
        headers: { "Content-Type": "application/json; charset=utf-8" },
        method: 'POST',
        body: JSON.stringify({
          user_id: searchParams.get("id"),
          token: searchParams.get("token"),
          password: password
        })
      })
    .then((res) => res.json())
    .then((data) => 
    {
      
      console.log(data);
      // localStorage.setItem('currentName',(data.first_name + ' '+ data.last_name));
      // localStorage.setItem(data.email, data.token);
      // localStorage.setItem('currentEmail', data.email);
      if ( data != undefined){

        navigate('/login');
        }
    }
    );
  }

  
}, [increment]) // this diff is necessary


  return (

    <div className="reset">
     
          <div className="home d-flex justify-content-center">
          <p>Please login again after changing the password successfully.</p>
      <div class="container">
        <input type="text" name="password" id="password" placeholder="password"/><br/>
        <input type="button" name="SignIn" value="SignIn" onClick={(e) => no(e)} />
</div>
      </div>
    </div>
  );
}

export default Reset;