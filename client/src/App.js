import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoanCalculator from './components/LoanCalculator';
import Table from './components/CreditTable';
import Admin from './components/Admin';
// import Admin from './Admin';
import './CSS/index.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/" element={< LoanCalculator />} />
                    <Route path="/admin" element={< Admin />} />
                    <Route path="/table" element={< Table />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;