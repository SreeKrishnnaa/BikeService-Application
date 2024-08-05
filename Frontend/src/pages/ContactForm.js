import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios'; 

// Define the ContactForm component
function ContactForm() {
  // Initialize form state using useState hook
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNo: '',
    serviceName: '',
    details: ''
  });

  // Define styling for the container
  const containerStyle = {
    padding: '2rem',
    backgroundColor: '#fff9c4',
    borderRadius: '8px',
    marginTop: '4rem'
  };

  // Define styling for the heading
  const headingStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    fontSize: '2rem',
    color: '#007bff'
  };

  // Define styling for the form controls
  const formControlStyle = {
    marginBottom: '1.5rem'
  };

  // Handle change in form input fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    try {
      await axios.post('http://localhost:3001/addservice', formData); // Send POST request to API
      alert('Form submitted successfully!'); // Show success alert
      // Reset form data
      setFormData({
        name: '',
        email: '',
        phoneNo: '',
        serviceName: '',
        details: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error); // Log error to console
      alert('Failed to submit form. Please try again.'); // Show error alert
    }
  };

  // Render the form
  return (
    <Container style={containerStyle}>
      <h2 style={headingStyle}>Fill me!</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            {/* Form group for name input */}
            <Form.Group controlId="formName" style={formControlStyle}>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Form group for email input */}
            <Form.Group controlId="formEmail" style={formControlStyle}>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter your email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </Form.Group>

            {/* Form group for phone number input */}
            <Form.Group controlId="formPhoneNumber" style={formControlStyle}>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your phone number"
                name="phoneNo"
                value={formData.phoneNo}
                onChange={handleChange}
              />
            </Form.Group>
            
            {/* Form group for service name input */}
            <Form.Group controlId="formService" style={formControlStyle}>
              <Form.Label>Service</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter the service you need"
                name="serviceName"
                value={formData.serviceName}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            {/* Form group for message description */}
            <Form.Group controlId="formMessage" style={formControlStyle}>
              <Form.Label>Message Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={8}
                placeholder="Enter your message"
                name="details"
                value={formData.details}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Submit button */}
        <Button variant="primary" type="submit" className="mt-4">
          Submit
        </Button>
      </Form>
    </Container>
  );
}

export default ContactForm;
