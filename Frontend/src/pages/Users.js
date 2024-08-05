import { Container, Navbar, Button } from 'react-bootstrap'; // Import necessary components from react-bootstrap
import ContactForm from './ContactForm'; // Import the ContactForm component
import cooks from "js-cookie"; // Import js-cookie library for handling cookies
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook for navigation

// Define the Users component
function Users() {
  const navigate = useNavigate(); // Initialize navigate for redirection
  
  const cook = cooks.get("cook"); // Get the cookie named "cook"
  console.log(cook); // Log the cookie value

  // Function to handle logout
  const func = () => {
    cooks.remove("cook"); // Remove the "cook" cookie
    navigate("/home"); // Redirect to the home page
  }

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md" style={{ height: "70px" }}>
        <Container className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Navbar.Brand href="/home">John's Bike Services</Navbar.Brand> // Navbar brand with link to home
          </div>
          {cook ? (
            <Button variant="primary" onClick={() => func()}>Logout</Button> // Show logout button if cookie exists
          ) : (
            <Button variant="primary">Login</Button> // Show login button if cookie does not exist
          )}
        </Container>
      </Navbar>

      <Container>
        <ContactForm /> 
      </Container>
    </div>
  );
}

export default Users; // Export the Users component as default
