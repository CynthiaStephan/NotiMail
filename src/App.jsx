import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/Login'
import Admin from './pages/Admin'
import User from './pages/User'
import CreateUser from './pages/CreateUser' 
import EditUser from './pages/EditUser'


    function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Login />} />
                    <Route path={'/admin'} element={<Admin />} />
                    <Route path={'/admin/createuser'} element={<CreateUser />} />
                    <Route path={'/admin/:firm_name'} element={<EditUser />} />
                    <Route path={'/user/:firm_name'} element={<User />} />
                </Routes>
            </BrowserRouter>

        </>
    )
    }

    export default App
