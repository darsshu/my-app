// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './component/Home';
import DynamicForm from './component/DynamicForm';



function App() {
  return (
    <Router>
      <div className="App">
        {/* Navigation */}
        <nav className=' border-b-2 border-black border flex justify-center py-4'>
          <ul className='flex justify-between'>
            <li>
              <Link className='underline hover:text-blue-500' to="/">Home</Link>
              <Link className='underline hover:text-blue-500' to="/dynamicForm">Dynamic Form</Link>
            </li>


          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dynamicForm" element={<DynamicForm />} />

        </Routes>
      </div>
    </Router>
  );
}

export default App;