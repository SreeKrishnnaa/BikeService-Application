import React, { useState } from 'react'; // Import React and useState hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS for styling
import { Link } from 'react-router-dom'; // Import Link component for navigation

// Define the Signup component
const Signup = () => {
  const [email, setEmail] = useState(''); // State for email input
  const [username, setUsername] = useState(''); // State for username input
  const [phone, setPhone] = useState(''); // State for phone input
  const [password, setPassword] = useState(''); // State for password input
  const [confirmPassword, setConfirmPassword] = useState(''); // State for confirm password input
  const navigate = useNavigate(); // Initialize navigate for redirection

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (password !== confirmPassword) {
      alert("Passwords do not match!"); // Alert if passwords do not match
      return; // Exit function if passwords do not match
    }

    const user = {
      emailID: email,
      password,
      user_name: username,
      role: 'user',
      mobilenumber: phone,
    };

    try {
      // Send signup request to the server
      const response = await fetch('http://localhost:3001/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user), // Send user details in the request body
      });

      if (response.ok) {
        const data = await response.json(); // Parse response data
        console.log('Signup successful:', data); // Log the successful signup message
        alert('Signup successful!'); // Alert for successful signup
        navigate('/login'); // Redirect to login page
      } else {
        const errorData = await response.json(); // Parse error response
        alert('Signup failed: ' + errorData.message); // Show error message
      }
    } catch (error) {
      console.error('Error during signup:', error); // Log any unexpected error
      alert('An error occurred. Please try again later.'); // Show generic error message
    }
  };

  return (
    <div className="container" style={{ maxWidth: '500px', marginTop: '50px' }}>
      <div className="card" style={{ borderRadius: '15px', padding: '20px' }}>
        <h2 className="text-center">Signup</h2>
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
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username} // Bind username state to input value
              onChange={(e) => setUsername(e.target.value)} // Update username state on input change
              required // Make input required
              style={{ marginBottom: '15px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              placeholder="Enter phone number"
              value={phone} // Bind phone state to input value
              onChange={(e) => setPhone(e.target.value)} // Update phone state on input change
              required // Make input required
              style={{ marginBottom: '15px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password} // Bind password state to input value
              onChange={(e) => setPassword(e.target.value)} // Update password state on input change
              required // Make input required
              style={{ marginBottom: '15px' }}
            />
          </div>
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm Password"
              value={confirmPassword} // Bind confirm password state to input value
              onChange={(e) => setConfirmPassword(e.target.value)} // Update confirm password state on input change
              required // Make input required
              style={{ marginBottom: '15px' }}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">Signup</button> 
        </form>
        <div className="text-center mt-3">
          <p>Already a member? <Link to="/login">Login here</Link></p> 
        </div>
      </div>
    </div>
  );
};

export default Signup; // Export the Signup component as default
