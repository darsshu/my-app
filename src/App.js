// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './component/Home';
import About from './component/About';
import Crud from './component/Crud';
import BestCrud from './component/BestCrud';
import NewCrud from './component/NewCrud';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className=' bg-black text-white'>
          <ul className='flex justify-between'>
            <li>
              <Link to="/">Home</Link>
            </li>
            {/* <li>
              <Link to="/crud">Crud</Link>
            </li>
            <li>
              <Link to="/crud2">Crud2</Link>
            </li>
            <li>
              <Link to="/newcrud">newcrud</Link>
            </li>
            <li>
              <Link to="/todayscrud">newcrud</Link>
            </li> */}

          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/crud" element={<About />} />
          <Route path="/crud2" element={<Crud />} />
          <Route path="/newcrud" element={<BestCrud />} />
          <Route path="/todayscrud" element={<NewCrud />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;