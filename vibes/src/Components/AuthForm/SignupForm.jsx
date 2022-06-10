import React, { useState, useEffect } from 'react';
import { Button, HeaderText, Textbox, Toast } from '..';
import style from './AuthForm.module.css';
import { GoSignIn } from 'react-icons/go';
import { Link } from 'react-router-dom';
import { useTheme } from '../../Contexts';
import { emailRegex, passwordRegex } from '../../Regex/Regex';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { HiEye } from 'react-icons/hi';
import { RiEyeCloseFill } from 'react-icons/ri';

const defaultForm = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
}

const SignupForm = () => {
    let navigate = useNavigate();
    const [form, setForm] = useState(defaultForm);
    const [submitMode, setSubmitMode] = useState(false);
    const [checkPassword, setCheckPassword] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [error, setError] = useState({
        email: {
        isError: false, 
        errorMessage: "Enter a valid mail",
        }, password: {
        isError: false, 
        errorMessage: "Password must contain minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character",
        }, confirmPassword: {
        isError: false,
        errorMessage: "Password does not match",
        }
    });
    const { themeState } = useTheme();
    const { mode } = themeState;
    const textAuth = mode==="light" ? style.text_light : style.text_dark;

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        if(name==="password") {
          setCheckPassword(value)
        }
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

      const SubmitHandler = async(event) => {
        event.preventDefault();
        try {
            const res = await axios.post(`/api/auth/signup`, {
            firstName: form.firstName,
            lastName: form.lastName,
            email: form.email,
            password: form.password,
          });
          if(res.status===201){
            setForm(defaultForm);
            Toast("Successfully signed up", "success")
            navigate("../login", { replace: true });
          } 
        } catch (error) {
          Toast("Could not signed up, try again later.", "error")
          console.error(error);
        }
      }

      const validateForm = (name, value) => {
        switch (name) {
          case "email":
            return !emailRegex.test(value);
          case "password":
            return !passwordRegex.test(value); 
          case "confirmPassword": 
            return checkPassword !== value;
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
            <HeaderText text="Sign up" />
            <div className={`dis-flex ${style.name_input}`}>
                <Textbox label="Firstname" name="firstName" type="text" value={form.firstName} onChange={(e)=>handleChange(e)} required/>
                <Textbox label="Lastname" name="lastName" type="text" value={form.lastName} onChange={(e)=>handleChange(e)} required/>
            </div>
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
            <div className={style.password_fields}>
                <Textbox label="Confirm Password" name="confirmPassword" type={showConfirmPassword ? "text" : "password"} value={form.confirmPassword} onChange={(e)=>handleChange(e)} error={error.confirmPassword.isError} required/>
                {showConfirmPassword ? 
                    <HiEye className={style.eye_icon} onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/> 
                    : 
                    <RiEyeCloseFill className={style.eye_icon} onClick={()=>setShowConfirmPassword(!showConfirmPassword)}/>
                }
            </div>
            {error.confirmPassword.isError && <span className="text-span text-center">{error.confirmPassword.errorMessage}</span>}
            <Button text="Sign up" contained={true} large={true} disabled={submitMode} error={submitMode} type="submit"/>
            <div className={textAuth}>Already have an account? <Link to="/login" className="btn-link"><span className={`text-span dis-flex ${style.account_check}`}>Login <GoSignIn /></span></Link></div>
        </form>
    </div>
  )
}

export { SignupForm };