import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
    const [credentials, setCredentials] = useState({ fullName: "", email: "", password: "" });
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                fullname: credentials.fullName, // Change to fullname
                email: credentials.email,
                password: credentials.password,
            }),
        });
        const json = await response.json();
        console.log(json); // Log the response
        if (json.success) {
            localStorage.setItem("token", json.token); // Change to json.token
            navigate("/");
            setCredentials({ fullName: "", email: "", password: "" });
            props.showAlert("Account Created Successfully", "success")
        } else {
            props.showAlert("Invalid Credentials", "danger")
        }
    };

    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="fullName" className="form-label">
                        Full Name
                    </label>
                    <input
                        type="text"
                        onChange={onChange}
                        value={credentials.fullName}
                        className="form-control"
                        id="fullName"
                        name="fullName"
                        aria-describedby="emailHelp"
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        onChange={onChange}
                        value={credentials.email}
                        className="form-control"
                        id="email"
                        name="email"
                        aria-describedby="emailHelp"
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        onChange={onChange}
                        value={credentials.password}
                        className="form-control"
                        name="password"
                        id="password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form>
        </div>
    );
};

export default SignUp;