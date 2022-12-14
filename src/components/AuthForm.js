import React from "react";
import { useState } from "react";
import { authService, firebaseInstance } from "../myBase";

const AuthForm = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (e) => {
        const {target:{name, value}}=e;
        if(name === "email"){
            setEmail(value);
        } else if(name==="password"){
            setPassword(value);
        }
    };
    const onSubmit = async(e) => {
        e.preventDefault();
        try{
            let data;
            if(newAccount){
                //create account
                data = await authService.createUserWithEmailAndPassword(email, password)
            }else{
                //log in
                data = await authService.signInWithEmailAndPassword(email, password)
            }
            console.log(data)
        } catch(error){
            setError(error.message);
        }
    };
    const toggleAccount = () => setNewAccount((prev) => !prev);
    return (
        <>
        <form onSubmit={onSubmit} className="container">
            <input name="email" type="meial" placeholder="Email" required value={email} onChange={onChange} className="authInput"/>
            <input name="password" type="password" placeholder="Password" required value={password} onChange={onChange} className="authInput"/>
            <input type="submit" value={newAccount ? "Create Account" : "Sign In"} className="authInput authSubmit"/><br />
            {error && <span className="authError">{error}</span>}
        </form>
        <span onClick={toggleAccount} className="authSwitch">{newAccount ? "Sign in" : "Create Account"}</span>
        </>
    )
}
export default AuthForm;