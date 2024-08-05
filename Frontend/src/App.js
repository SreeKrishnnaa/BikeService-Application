import './App.css'; // Import global CSS styles
import Home from './pages/Home'; // Import the Home component from the pages directory
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import { BrowserRouter, Route, Routes } from 'react-router-dom'; // Import routing components from react-router-dom

import Users from './pages/Users'; // Import the Users component from the pages directory
import Admin from './pages/Admin'; // Import the Admin component from the pages directory
import Login from './pages/Login'; // Import the Login component from the pages directory
import Signup from './pages/Signup'; // Import the Signup component from the pages directory

// Define the App component
function App() {
  return (
    <div className="App"> {/* Main container for the application */}
      <BrowserRouter> {/* BrowserRouter provides routing functionality */}
        <Routes> {/* Routes component to define all the routes */}
          <Route index element={<Home />} /> {/* Default route rendering the Home component */}
          <Route path='/home' element={<Home />} /> {/* Route for Home page */}
          <Route path='/users' element={<Users />} /> {/* Route for Users page */}
          <Route path='/admin' element={<Admin />} /> {/* Route for Admin page */}
          <Route path='/login' element={<Login />} /> {/* Route for Login page */}
          <Route path='/signup' element={<Signup />} /> {/* Route for Signup page */}
        </Routes>
      </BrowserRouter> 
    </div>
  );
}

export default App; // Export the App component as default
