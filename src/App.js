import React, { useState } from 'react'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
const App = () => {
  const [progress, setProgress] = useState(0)
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <LoadingBar
          color='#f11946'
          progress={progress}
        />
        <Routes>
          <Route path="" element={<News setProgress={setProgress} key="" pagesize={12} country={'in'} category={"general"} />} />
          <Route path="Sports" element={<News setProgress={setProgress} key="sports" pagesize={12} country={'in'} category={"sports"} />} />
          <Route path="Business" element={<News setProgress={setProgress} key="business" pagesize={12} country={'in'} category={"business"} />} />
          <Route path="Entertainment" element={<News setProgress={setProgress} key="entertainment" pagesize={12} country={'in'} category={"entertainment"} />} />
          <Route path="Technology" element={<News setProgress={setProgress} key="technology" pagesize={12} country={'in'} category={"technology"} />} />
          <Route path="Science" element={<News setProgress={setProgress} key="science" pagesize={12} country={'in'} category={"science"} />} />
          <Route path="Health" element={<News setProgress={setProgress} key="health" pagesize={12} country={'in'} category={"health"} />} />
          <Route path="General" element={<News setProgress={setProgress} key="general" pagesize={12} country={'in'} category={"general"} />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;