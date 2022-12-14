import React, { useState } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { Navigate } from "react-router-dom";
import { authorizeUserAction } from "../reducers/UserReducer";

const Authorization = () => {
    const [nameValue, setName] = useState("")
    const [passwordValue, setPassword] = useState("")
    const dispatch = useDispatch()
    const user = useSelector(state => state.userReducer)
    const isAuthorized = user.isAuthorized
    const username = user.name

    return (
        <div className="authCard">
            <div className="authContent">
                <strong className="authText">Please, sign in to your account to use calendar.</strong>
                <input type="text" placeholder="username" className="textInput" value={nameValue} onChange={e => {
                    setName(e.target.value)
                }} />
                <input type="password" placeholder="password" className="textInput" value={passwordValue} onChange={e => {
                    setPassword(e.target.value)
                }} />
                <input type="button" value="Log in" className="button" onClick={() => {
                    dispatch(authorizeUserAction({
                        name: nameValue,
                        password: passwordValue
                    }))
                }} />
                {username === "" && <div className="authDeniedText">Incorrect username or password</div>}
                {isAuthorized && <Navigate replace to="/profile" />}
            </div>
        </div>
    )
}

export default Authorization;