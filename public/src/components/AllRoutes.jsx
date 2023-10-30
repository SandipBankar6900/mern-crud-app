import { Routes, Route } from "react-router-dom"
import { Registration } from "./Register"
import { Login } from "./Login"
import { Home } from "./Home"
import NoteForm from "./create"
import { EditNote } from "./EditNote"
const AllRoutes = () => {
    return <div>
        <Routes>
            <Route path="/register" element={<Registration />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
            <Route path="/create" element={<NoteForm />} />
            <Route path="/edit/:noteId" element={<EditNote />} />
        </Routes>
    </div>
}
export { AllRoutes }