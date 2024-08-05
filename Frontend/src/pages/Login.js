import React, { useState } from 'react'; // Import React and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import cookie from "js-cookie"; // Import js-cookie for managing cookies

// Define the Login component
const Login = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [password, setPassword] = useState(''); // State for password input
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      // Send login request to the server
      const response = await fetch('http://localhost:3001/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password in the request body
      });
      
      if (response.ok) {
        const data = await response.json(); // Parse response data
        console.log(data.token); // Log the token (for debugging purposes)
        console.log('Login successful:', data); // Log the successful login message

        cookie.set("cook", data.token); // Set the cookie with the token
        // Redirect based on user role
        if (data.role === "admin") {
          navigate('/admin');
        } else {
          navigate('/users');
        }
      } else {
        try {
          const errorData = await response.json(); // Parse error response
          alert('Login failed: ' + (errorData.message || 'Unknown error')); // Show error message
        } catch (jsonError) {
          const errorText = await response.text(); // Parse error text
          alert('Login failed: ' + errorText); // Show error message
        }
      }
    } catch (error) {
      console.error('Error during login:', error); // Log any unexpected error
      alert('An error occurred. Please try again later.'); // Show generic error message
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '50px' }}>
      <div className="card" style={{ borderRadius: '15px', padding: '20px' }}>
        <h2 className="text-center">Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email} // Bind email state to input value
              onChange={(e) => setEmail(e.target.value)} // Update email state on input change
              required // Make input required
              style={{ marginBottom: '15px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-group mb-3">
              <input
                type={showPassword ? 'text' : 'password'} // Toggle between text and password input type
                className="form-control"
                id="password"
                placeholder="Password"
                value={password} // Bind password state to input value
                onChange={(e) => setPassword(e.target.value)} // Update password state on input change
                required // Make input required
              />
              <div className="input-group-append">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowPassword(!showPassword)} // Toggle password visibility
                >
                  {showPassword ? 'Hide' : 'Show'} 
                </button>
              </div>
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-block">Login</button> 
        </form>
      </div>
    </div>
  );
};

export default Login; // Export the Login component as default
