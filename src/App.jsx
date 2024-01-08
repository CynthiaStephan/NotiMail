import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Admin from './pages/admin'
import User from './pages/user'
import CreateUser from './pages/createUser'


    function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Login/>} />
                    <Route path={'/admin'} element={<Admin/>} />
                    <Route path={'/admin/:firmname'} element={<CreateUser/>} />
                    <Route path={'/user/:firmname'} element={<User />} />
                </Routes>
            </BrowserRouter>

        </>
    )
    }

    export default App
