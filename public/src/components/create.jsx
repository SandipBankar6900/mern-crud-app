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

const NoteForm = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [succMsg, setSuccMsg] = useState("");

  const handleCreateNote = async () => {
    const newNote = { title, body };

    try {
      const response = await axios.post("https://tiny-pink-brown-bear-hem.cyclic.app/notes/create", newNote, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
        },
      });

      if (response.status === 200) {
        setSuccMsg(response.data.msg);
        setErrorMsg("");
      }
    } catch (error) {
      console.error("Note creation failed", error);
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
      <h2>Add a Note</h2>
      <Input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
        }}
      />
      <Input
        type="text"
        placeholder="Enter body"
        value={body}
        onChange={(e) => {
          setBody(e.target.value);
        }}
      />
      <Button onClick={handleCreateNote}>Add Note</Button>
      {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      {succMsg && <SuccessMessage>{succMsg}</SuccessMessage>}
    </FormContainer>
  );
};

export default NoteForm;