

// import React, { useState, useContext } from 'react';
// import classes from './Signup.module.css';
// import LayOut from '../../Components/LayOut/LayOut';
// import { Link, useNavigate, useLocation } from 'react-router-dom';
// import { auth } from "../../Utility/firebase"; // Adjusted path
// import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
// import { ClipLoader } from "react-spinners";
// import { DataContext } from '../../Components/DataProvider/DataProvider';
// import { Type } from '../../Utility/actiontype'; // Adjusted path

// function Auth() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [{ user, loading }, dispatch] = useContext(DataContext);
//   const navigate = useNavigate();
//   const location = useLocation();
//   const navStateData = location.state || {};

//   const authHandler = async (e) => {
//     e.preventDefault();
//     if (e.target.name === "signin") {
//       // Firebase sign in
//       dispatch({ type: Type.SET_LOADING, payload: true });
//       try {
//         const userInfo = await signInWithEmailAndPassword(auth, email, password);
//         dispatch({ type: Type.SET_USER, user: userInfo.user });
//         dispatch({ type: Type.SET_LOADING, payload: false });
//         navigate(navStateData?.state?.redirect || "/");
//       } catch (err) {
//         setError(err.message);
//         dispatch({ type: Type.SET_LOADING, payload: false });
//       }
//     } else if (e.target.name === "signup") {
//       // Firebase sign up
//       dispatch({ type: Type.SET_LOADING, payload: true });
//       try {
//         const userInfo = await createUserWithEmailAndPassword(auth, email, password);
//         dispatch({ type: Type.SET_USER, user: userInfo.user });
//         dispatch({ type: Type.SET_LOADING, payload: false });
//         navigate(navStateData?.state?.redirect || "/");
//       } catch (err) {
//         setError(err.message);
//         dispatch({ type: Type.SET_LOADING, payload: false });
//       }
//     }
//   };

//   return (
//     <section className={classes.login}>
//       {/* Logo */}
//       <Link to="/">
//         <img
//           src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
//           alt=""
//         />
//       </Link>
      
//       {/* Form */}
//       <div className={classes.login__container}>
//         <h1>Sign In</h1>
//         {navStateData?.state?.msg && (
//           <small style={{ padding: '5px', textAlign: 'center', color: 'red', fontWeight: 'bold' }}>
//             {navStateData?.state?.msg}
//           </small>
//         )}
//         <form action="">
//           <div>
//             <label htmlFor="email">Email</label>
//             <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" />
//           </div>
//           <div>
//             <label htmlFor="password">Password</label>
//             <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" id="password" />
//           </div>
//           <button name="signin" onClick={authHandler} className={classes.login__signInButton}>
//             {loading.signIn ? <ClipLoader color="#000" size={15} /> : "Sign In"}
//           </button>
//         </form>

//         {/* Agreement */}
//         <p>
//           By signing in, you agree to the AMAZON FAKE CLONE Conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice, and our Interest-Based Ads Notice.
//         </p>

//         {/* Create account button */}
//         <button name="signup" onClick={authHandler} className={classes.login__registerButton}>
//           {loading.signUP ? <ClipLoader color="#000" size={15} /> : "Create your Amazon Account"}
//         </button>

//         {error && <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>}
//       </div>
//     </section>
//   );
// }

// export default Auth;


import React, { useState,useContext } from 'react'
import classes from './Signup.module.css'
import LayOut from '../../Components/LayOut/LayOut';
import { Link,useNavigate,useLocation } from 'react-router-dom'
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { ClipLoader } from "react-spinners";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import {Type} from '../../Utility/actiontype' 
function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUP: false,
  });
  const navigate = useNavigate();
  const navStateData = useLocation()
  const [{ user }, dispatch] = useContext(DataContext);
  const authHandler = async (e) => {
    e.preventDefault();
    if (e.target.name == "signin") {
      // firebase auth
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
    } else {
      setLoading({ ...loading, signUP: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUP: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signUP: false });
        });
    }
  };

  return (
   <section className={classes.login}>
    {/* logo */}
<Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>
      {/* form */}
      <div className={classes.login__container} >
        <h1>Sign In</h1>
        {navStateData?.state?.msg && (
           <small style={
            {padding:'5px',
             textAlign:'center',
             color :'red',
             fontWeight :'bold'
            }
           } >
             {navStateData?.state?.msg}
           </small>
        )}
        <form action="">
          <div>
        <label htmlFor="email">Email</label>
        <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id='email' />
          </div>
          <div>
          <label htmlFor="password">Email</label>
        <input   value={password} onChange={(e) => setPassword(e.target.value)} type="password" id='password' />
          </div>
          <button    name="signin"  onClick={authHandler}  className={classes.login__signInButton}>
            {
              loading.signIn ? ( <ClipLoader color="#000" size={15}></ClipLoader>) :(  " Sign In")
            }
          </button>
        </form>
        {/* agreement */}
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE Conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        {/* create account btn */}
        <button 
          name="signup"
           onClick={authHandler} 
          className={classes.login__registerButton}
        >
{loading.signUP ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}


        </button>
           {error && (
          <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
        )}
      </div>
   </section>
 

  )
}

export default Auth