import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const FormContainer = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background: #f9f9f9;
  border: 1px solid #ccc;
  border-radius: 5px;
  text-align: center;
`;

const Input = styled.input`
  width: 100%;
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  background: #007bff;
  color: #fff;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
`;

const SuccessMessage = styled.p`
  color: green;
`;

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [succMsg, setSuccMsg] = useState("");
    const Navigate = useNavigate();
    const handleLogin = async () => {
        let payload = { email: email, pass: password };
        try {
            const res = await axios.post(`https://tiny-pink-brown-bear-hem.cyclic.app/users/login`, payload);
            console.log(res);
            if (res.status === 200) {
                setSuccMsg(res.data.msg);
                localStorage.setItem("AuthToken", res.data.token);
                setErrorMsg("");
                Navigate("/");
            }
        } catch (error) {
            console.error("Login failed", error);
            if (error.response) {
                if (error.response.status === 400 && error.response.data && error.response.data.msg) {
                    setErrorMsg(error.response.data.msg);
                    setSuccMsg("");
                } else {
                    setErrorMsg("Server Error");
                    setSuccMsg("");
                }
            }
        }
    };

    return (
        <FormContainer>
            <h2>Login Form</h2>
            <Input
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => {
                    setEmail(e.target.value);
                }}
            />
            <Input
                type="password"
                placeholder="Enter your Password"
                value={password}
                onChange={(e) => {
                    setPassword(e.target.value);
                }}
            />
            <Button onClick={handleLogin}>Login</Button>
            {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
            {succMsg && <SuccessMessage>{succMsg}</SuccessMessage>}
        </FormContainer>
    );
};

export { Login };