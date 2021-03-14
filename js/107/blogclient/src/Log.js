import React from 'react';
import useForm from './useForm';
import { useHistory } from "react-router-dom";
// import MessageBox from './MessageBox';

function Log ({setUserName /*login*/}){
    let history = useHistory();
    const [values, handleValueChange] = useForm({ name: '', password: '' });
    let url;//, msgBox;

    const submit = async e => {
      e.preventDefault();
  
      try {
        const response = await fetch(`http://localhost/${url}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(values)
        });
        if (!response.ok) {
          throw new Error(`${response.status} - ${response.statusText}`);
        }
        history.push('/');
        setUserName(values.name);
        // login(true);
      } catch (err) {
        console.error(err);
        // msgBox = <MessageBox msg={err} />    useRef().current
      alert(err);
      }
    };

        return (
            <>
            {/* {msgBox} */}
            <form id="log" onSubmit={submit}>
                <label>User Name:
                    <input name="name" required value={values.name} onChange={handleValueChange} />
                </label>
                <label>Password:
                    <input type="password" name="password" value={values.password} onChange={handleValueChange}></input>
                </label>
                <button  onClick={() => url = 'register'} >register</button>     {/*name="register" value="register"*/}
                <button onClick={() => url = 'login'} >login</button>      {/*name="login" value="login"*/}
            </form>
            </>
        );
    }

export default Log;