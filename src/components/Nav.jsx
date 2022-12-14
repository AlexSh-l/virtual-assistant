import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import { logOutUserAction } from "../reducers/UserReducer";

const Nav = () => {
    const user = useSelector(state => state.userReducer)
    const isAuthorized = user.isAuthorized
    const username = user.name
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <nav className="navBar">
            <ul>
                <li><Link to="/">Main page</Link></li>
                {isAuthorized
                    ?
                    <li><Link to="/profile">{username}</Link></li>
                    :
                    <li><Link to="/login">Your profile</Link></li>}
                {!isAuthorized && <li><Link to="/login">Login</Link></li>}
                <li><Link to="/info">About us</Link></li>
                {isAuthorized && <input type="button" value="Log out" className="logOutButton" onClick={() => {
                    dispatch(logOutUserAction())
                    navigate("/")
                }}></input>}
            </ul>
        </nav>
    );
}

export default Nav