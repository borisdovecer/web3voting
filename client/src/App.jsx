import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Navbar, Footer, Home, Vote, Register } from "./components";

const App = () => {
  return (
    <div className="min-h-screen bg-[#0f0e13]">
        <div className="gradient-bg-welcome">
            <Navbar />
            <Router>
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route exect path='/vote' element={<Vote />} />
                    <Route exect path='/register' element={<Register />} />
                </Routes>
            </Router>
            <Footer />
        </div>
    </div>
  )
}

export default App
