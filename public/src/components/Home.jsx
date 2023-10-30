import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
const Home = () => {
    const [notes, setNotes] = useState([]);
    const authToken = localStorage.getItem("AuthToken");
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const response = await axios.get("https://tiny-pink-brown-bear-hem.cyclic.app/notes", {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
                    },
                });
                setNotes(response.data);
            } catch (error) {
                console.error("Error fetching notes", error);
            }
        };

        fetchNotes();
    }, [authToken]);

    const handleDelete = async (noteId) => {
        console.log(noteId)
        try {
            await axios.delete(`https://tiny-pink-brown-bear-hem.cyclic.app/notes/delete/${noteId}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
                },
            });
            setNotes(notes.filter((note) => note._id !== noteId));
        } catch (error) {
            console.error("Error deleting note", error);
        }
    };

    return (
        <div>
            {
                authToken ?(
                    <div>
                        <h2>Your Notes</h2>
                        <table style={tableStyle}>
                            <thead>
                                <tr>
                                    <th style={tableHeaderStyle}>Title</th>
                                    <th style={tableHeaderStyle}>Content</th>
                                    <th style={tableHeaderStyle}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notes.map((note) => (
                                    <tr key={note._id}>
                                        <td style={tableCellStyle}>{note.title}</td>
                                        <td style={tableCellStyle}>{note.body}</td>
                                        <td style={tableCellStyle}>
                                            <button onClick={() => handleDelete(note._id)}>Delete</button>
                                            <Link to={`/edit/${note._id}`}>Edit</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ):(
            <p>Please login to view your notes.</p>
            )
            }
        </div>
    );
};
const tableStyle = {
    width: "80%",
    margin: "auto",
    borderCollapse: "collapse",
};

const tableHeaderStyle = {
    backgroundColor: "#007bff",
    color: "#fff",
    padding: "10px",
    textAlign: "left",
};

const tableCellStyle = {
    padding: "10px",
    border: "1px solid #ccc",
};

export { Home };
