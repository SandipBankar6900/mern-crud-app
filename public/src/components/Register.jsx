import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
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

const Registration = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const handleRegister = async () => {
    let payload = { name: username, email: email, pass: pass };
    try {
      const res = await axios.post(`https://tiny-pink-brown-bear-hem.cyclic.app/users/register`,payload);
      if (res.status === 200) {
        setSuccMsg(res.data.msg);
        setErrorMsg("");
      }
    } catch (error) {
      console.error("Registration failed", error);
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
      <h2>Registration Form</h2>
      <Input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />
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
        value={pass}
        onChange={(e) => {
          setPass(e.target.value);
        }}
      />
      <Button onClick={handleRegister}>Register</Button>
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      {succMsg && <SuccessMessage>{succMsg}</SuccessMessage>}
    </FormContainer>
  );
};

export { Registration };