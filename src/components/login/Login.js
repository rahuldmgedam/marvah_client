import React from 'react'
import '../login/login.css'
import axios from 'axios';
import  {useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

export default function Login() {

  const [mail, setMail] = useState('admin');
  const [pass, setPass] = useState('admin');
  const [umail, setuMail] = useState('mastermail');
  const [upass, setuPass] = useState('masterpass');

  // const getInfo = async () => {
  //   const result = await axios.get(dbpath1+"logintest.php");
  //   setMail(result.data.phpresult[0]['email']);
  //   setPass(result.data.phpresult[0]['password'])
  // }
  
  const navigate = useNavigate();

  // useEffect(() => {
  //   getInfo();
  // }, []); 

  const onLogin = () =>{
    if(mail==="admin" || pass==="admin")
    {
      Cookies.set('userLoggedIn', 'true');
      navigate('/Day_Start');
  
    }
    else
    {
      alert("Invalid Username or password!");
    }
  }

  return (
    <>
    <div class="logindiv container shadow-lg p-3 bg-body-tertiary rounded">
          <h1>Login</h1>
          <form>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" class="form-control"  aria-describedby="emailHelp" onChange={(e) => setuMail(e.target.value)} />
            </div>
            <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" class="form-control"  onChange={(e) => setuPass(e.target.value)} />
            </div>

            <center><button type="button" onClick={onLogin} class="btn mt-3 btn-primary">Login</button>
            <br /><br />
            <label class="form-check-label " for="exampleCheck1">Forgot Passowrd?... Contact your IT Support :)</label></center>
           </form>
      </div>
    <div className='loginbg'>
      
     
   
   
  
    </div>
    </>
  )
}
