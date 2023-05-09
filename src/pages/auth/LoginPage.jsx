import React, { useState } from "react";
import axios from "axios";

import classes from "./LoginPage.module.css";
import ImageRow from "../../components/ImageRow";
import insta_logo from "../../assets/insta.svg";
import { BsApple, BsAndroid2, BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";

const LoginPage = () => {
  const { dispatch } = useAuthContext();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const loginNow = async () => {
    console.log("Login Now");
    const url = `${import.meta.env.VITE_API_URL}/api/v1/login`;
    await axios
      .post(url, {
        email: formData.email,
        password: formData.password,
      })
      .then(function (response) {
        console.log("res", response.data);
        dispatch({ type: "LOGIN", payload: response.data });
        localStorage.setItem("instaCloneUser", JSON.stringify(response.data));
        navigate("/");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className={classes.loginContainer}>
      <div className={classes.loginLeftContainer}>
        <h1>
          Bringing you closer to the people and things you <span>love.</span>
        </h1>
        <div className={classes.imageRowContainer}>
          <ImageRow />
        </div>
      </div>
      <div className={classes.loginForm}>
        <div>
          <img width='175px' height='51px' src={insta_logo} alt='' />
        </div>
        <p>from</p>
        <h3>FACEBOOK</h3>
        <br />
        <button className={classes.socialButton}>
          <BsFacebook
            size={20}
            style={{
              marginRight: "10px",
            }}
          />
          Continue with Facebook
        </button>
        <br />
        <div className={classes.or}> </div>
        <p className={classes.ortext}>or</p>
        <br />
        <form className={classes.LoginFormInputContainer}>
          <input
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, email: e.target.value });
            }}
            type='text'
            placeholder='Phone number, username, or email'
          />
          <input
            value={formData.password}
            onChange={(e) => {
              setFormData({ ...formData, password: e.target.value });
            }}
            type='password'
            placeholder='Password'
          />
          <button
            onClick={(e) => {
              e.preventDefault();
              loginNow();
            }}>
            Log In
          </button>
        </form>
        <div className={classes.forgotPassword}>
          <p
            style={{
              color: "#A4A4A4",
            }}>
            Forgot Password?
          </p>

          <p
            style={{
              color: "#6f6f6f",
              fontWeight: 500,
            }}>
            Don't have an account?{" "}
            <span
              style={{
                color: "#1876f2cb",
                fontWeight: 700,
              }}>
              Sign up
            </span>
          </p>
        </div>
        <br />
        <br />
        <p
          style={{
            color: "#A4A4A4",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "10px",
          }}>
          Get app for
          <span>
            <BsApple size={25} />
          </span>
          <span>
            <BsAndroid2 size={25} />
          </span>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
