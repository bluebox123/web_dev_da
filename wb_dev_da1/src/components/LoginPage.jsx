import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./login_page.css";

const LoginPage = () => {
    const navigate = useNavigate(); // Initialize navigate function

    const handleLogin = () => {
        navigate("/"); // Redirect to FrontPage
    };

    return (
        <>
            <div id="structure">
                <div id="box1"></div>
                <div id="box2">
                    <div id="login_box">
                        <center><h3 id="title">Login</h3></center>
                        <h3 className="tag1">Email</h3>
                        <input type="text" id="input1" placeholder="Email"/>
                        <h3 className="tag2">Password</h3>
                        <input type="password" id="input2" placeholder="Password"/>
                        <button id="login_button" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
