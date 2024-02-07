import './App.css'
import Login from "./pages/LoginPage/Login";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ListingPage from "./pages/ListingPage/ListingPage";

function App() {

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login/>}/>
                <Route path="/listings" element={<ListingPage/>}/>

            </Routes>
        </Router>

    )
}

export default App
