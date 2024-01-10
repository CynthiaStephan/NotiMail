import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './pages/login'
import Admin from './pages/admin'
import User from './pages/user'
import CreateUser from './pages/createUser'
import Header from './components/Header/Header'
import Notification from './components/Notification/Notification'
import CardEntreprise from './components/CardEntreprise/CardEntreprise'


    function App() {

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={'/'} element={<Login/>} />
                    <Route path={'/admin'} element={<Admin/>} />
                    <Route path={'/admin/:firmname'} element={<CreateUser/>} />
                    <Route path={'/user/:firmname'} element={<User />} >
                        <Route path={'/user/:firmname'} />
                        <Route path={'/user/:firmname'} />
                    </Route>
                </Routes>
            </BrowserRouter>

            <Header />
            <Notification />
            <CardEntreprise />

        </>
    )
    }

    export default App
