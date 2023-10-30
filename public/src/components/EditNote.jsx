import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useParams } from "react-router-dom";

const EditNoteContainer = styled.div`
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

const TextArea = styled.textarea`
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

const EditNote = () => {
    const { noteId } = useParams()
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [errorMsg, setErrorMsg] = useState("");
    const [succMsg, setSuccMsg] = useState("");
    useEffect(() => {
        const fetchNoteData = async () => {
            try {
                const response = await axios.get(`https://tiny-pink-brown-bear-hem.cyclic.app/notes/${noteId}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
                    },
                });

                const note = response.data;
                setTitle(note.title);
                setBody(note.body);
            } catch (error) {
                console.error("Error fetching note data", error);
            }
        };

        fetchNoteData();
    }, [noteId]);

    const handleSave = async () => {
        const paylaod = {
            title,
            body
        }
        try {
             await axios.patch(`https://tiny-pink-brown-bear-hem.cyclic.app/notes/update/${noteId}`, paylaod, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
                },
            });
            setSuccMsg("Note updated successfully");
        } catch (error) {
            setErrorMsg("Error updating note: " + error.message);
        }
    };

    return (
        <EditNoteContainer>
            <h2>Edit Note</h2>
            <Input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
            />
            <TextArea
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Note content"
            />
            <Button onClick={handleSave}>Save</Button>
            {succMsg && <p style={{ color: "green" }}>{succMsg}</p>}
            {errorMsg&& <p style={{ color: "red" }}>{errorMsg}</p>}
        </EditNoteContainer>
    );
};
export { EditNote };