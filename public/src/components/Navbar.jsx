import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios"
const navbarStyle = {
    display: "flex",
    width: "90%",
    margin: "auto",
    padding: "10px",
    justifyContent: "center",
};

const linkStyle = {
    textDecoration: "none",
    margin: "0 10px",
    color: "#2d3ef5",
    fontWeight: "bold",
    fontSize: "16px",
    textTransform: "uppercase",
    letterSpacing: "1px",
};

const Navbar = () => {
    const authToken = localStorage.getItem("AuthToken");

    const Navigate = useNavigate();
    const handleLogout = async () => {
        try {
            await axios.get(`https://tiny-pink-brown-bear-hem.cyclic.app/users/logout`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("AuthToken")}`,
                },
            })
            localStorage.removeItem("AuthToken");
            Navigate("/login");
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div style={navbarStyle}>
            {authToken ? (
                <>
                    <Link to="/logout" style={linkStyle} onClick={handleLogout}>Logout</Link>
                    <Link to="/create" style={linkStyle}>Create New Note</Link></>
            ) : (
                <>
                    <Link to="/register" style={linkStyle}>Register</Link>
                    <Link to="/login" style={linkStyle}>Login</Link>
                </>
            )}
            <Link to="/" style={linkStyle}>Home</Link>
        </div>
    );
}
export { Navbar };