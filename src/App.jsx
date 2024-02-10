import './App.css'
import Login from "./pages/LoginPage/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ListingPage from "./pages/ListingPage/ListingPage";
import ListingExpanded from "./pages/ListingExpandedPage/ListingExpanded.jsx";
import SuccessPage from "./pages/SuccessPage/SuccessPage.jsx";
import RegistrationPage from "./pages/RegistrationPage/RegistrationPage.jsx";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/listings" element={<ListingPage/>}/>
                <Route path="/listings/:id" element={<ListingExpanded/>}/>
                <Route path="/listings/:id/success" element={<SuccessPage/>}/>
                <Route path="/register" element={<RegistrationPage/>}/>
            </Routes>
        </Router>

    )
}

export default App
