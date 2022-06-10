import React, { useState, useEffect } from 'react';
import { Button, HeaderText, Textbox, Toast } from '..';
import style from './AuthForm.module.css';
import { FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth, useTheme } from '../../Contexts';
import { emailRegex, passwordRegex } from '../../Regex/Regex';
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { HiEye } from 'react-icons/hi';
import { RiEyeCloseFill } from 'react-icons/ri';

const defaultForm = {
    email: "",
    password: "",
}

const LoginForm = () => {
    let navigate = useNavigate();
    const location = useLocation();
    const { setUserToken, setResponse } = useAuth();
    const [form, setForm] = useState(defaultForm);
    const [submitMode, setSubmitMode] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState({
        email: {
        isError: false, 
        errorMessage: "Enter a valid mail",
        }, password: {
        isError: false, 
        errorMessage: "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        }
    });
    const { themeState } = useTheme();
    const { mode } = themeState;
    const textAuth = mode==="light" ? style.text_light : style.text_dark;

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        const validateError = validateForm(name, value);
        setError((prevValue) => ({
          ...prevValue,
          [name]: {
            ...prevValue[name],
            isError: validateError
          }
        }));
        setForm({...form, [name]: value})
      }

    const setGuestLogin = () => setForm({email: "nishasen@gmail.com", password: "Nisha@1234"})

    const SubmitHandler = async(event) => {
      event.preventDefault();
      try {
        const res = await axios.post(`/api/auth/login`, {
        email: form.email,
        password: form.password,
      });
        if(res.status===200){
          setForm(defaultForm);
          localStorage.setItem('userToken', res.data.encodedToken)
          setResponse(res.data.foundUser)
          setUserToken(localStorage.getItem('userToken'))
          Toast("Successfully logged in", "success")
          navigate(location.state?.from?.pathname || "/");
        } 
      } catch (error) {
          Toast("Could not login, try again later.", "error")
          console.error(error);
      }  
    }

    const validateForm = (name, value) => {
      switch (name) {
        case "email":
          return !emailRegex.test(value);
        case "password":
          return !passwordRegex.test(value); 
        default:
          return false;
      }
    };
    
    useEffect(() => {
      let flag = false;
      Object.entries(error).forEach((i) => {
        if (i[1].isError) {
          flag = true;
        }
      });
      setSubmitMode(flag);
    }, [error]);

  return (
    <div className="centered">
        <form className={`centered ${style.auth_card}`} onSubmit={(e)=>SubmitHandler(e)}>
           <HeaderText text="Login" />
           <Textbox label="Email" name="email" type="email" value={form.email} onChange={(e)=>handleChange(e)} error={error.email.isError} required/>
           {error.email.isError && <span className="text-span text-center">{error.email.errorMessage}</span>}
           <div className={style.password_fields}>
                <Textbox label="Password" name="password" type={showPassword ? "text" : "password"} value={form.password} onChange={(e)=>handleChange(e)} error={error.password.isError} required/>
                {showPassword ? 
                    <HiEye className={style.eye_icon} onClick={()=>setShowPassword(!showPassword)}/> 
                    : 
                    <RiEyeCloseFill className={style.eye_icon} onClick={()=>setShowPassword(!showPassword)}/>
                }
            </div>
            {error.password.isError && <span className="text-span text-center">{error.password.errorMessage}</span>}
           <Button text="Login" contained={true} large={true} disabled={submitMode} type="submit" />
           <Button text="Guest Login" large={true} onClick={setGuestLogin} type="submit"/>
           <div className={textAuth}>Do not have an account? <Link to="/signup" className="btn-link"><span className={`text-span dis-flex ${style.account_check}`}>Signup <FaSignInAlt /></span></Link></div>
        </form>
    </div>
  )
}

export { LoginForm };