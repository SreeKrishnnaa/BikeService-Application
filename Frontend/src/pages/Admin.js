import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Offcanvas, Button, Table, Card, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import cooks from 'js-cookie';
import { useNavigate } from 'react-router-dom';

// Register the components you need for Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function Admin() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');
  const [services, setServices] = useState([]);
  const navigate = useNavigate();

  const cook = cooks.get('cook'); // Get cookie value
  console.log(cook);
  
  const func = () => {
    cooks.remove('cook'); // Remove cookie
    navigate('/home'); // Navigate to home page
  };

  useEffect(() => {
    if (currentSection === 'services') {
      fetchServices(); // Fetch services when 'services' section is selected
    }
  }, [currentSection]);

  const handleSidebarToggle = () => {
    setShowSidebar(!showSidebar); // Toggle sidebar visibility
  };

  const handleNavClick = (section) => {
    setCurrentSection(section); // Set current section
  };

  const fetchServices = async () => {
    try {
      const response = await axios.get('http://localhost:3001/services'); // Fetch services from API
      setServices(response.data); // Update services state
    } catch (error) {
      console.error('Error fetching service details', error);
    }
  };

  const deleteService = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/services/${id}`); // Delete service by ID
      setServices(services.filter(service => service._id !== id)); // Update services state
    } catch (error) {
      console.error('Error deleting service:', error);
    }
  };

  const getTotalServices = () => services.length; // Get total number of services

  const getMostCommonService = () => {
    const serviceCount = services.reduce((acc, service) => {
      acc[service.serviceName] = (acc[service.serviceName] || 0) + 1;
      return acc;
    }, {});
    const maxCount = Math.max(...Object.values(serviceCount));
    return Object.keys(serviceCount).find(key => serviceCount[key] === maxCount); // Get most common service
  };

  const getChartData = () => {
    const serviceCount = services.reduce((acc, service) => {
      acc[service.serviceName] = (acc[service.serviceName] || 0) + 1;
      return acc;
    }, {});
    
    return {
      labels: Object.keys(serviceCount),
      datasets: [
        {
          label: 'Number of Services',
          data: Object.values(serviceCount),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  console.log(services); // Log services to console

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="md" style={{ height: '70px' }}>
        <Container className="d-flex justify-content-between">
          <div className="d-flex align-items-center">
            <Button
              variant="dark"
              onClick={handleSidebarToggle}
              style={{ border: 'none' }}
              className="mr-2"
            >
              <FontAwesomeIcon icon={faBars} /> {/* Sidebar toggle button */}
            </Button>
            <Navbar.Brand href="/home">John's Bike Services</Navbar.Brand>
          </div>
          {cook ? (
            <Button variant="primary" onClick={() => func()}>Logout</Button>
          ) : (
            <Button variant="primary">Login</Button>
          )}
        </Container>
      </Navbar>

      <Offcanvas show={showSidebar} onHide={handleSidebarToggle}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Navigate</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Nav className="flex-column">
            <Nav.Link onClick={() => handleNavClick('home')}>Home</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('services')}>Services</Nav.Link>
            <Nav.Link onClick={() => handleNavClick('admin')}>Panel</Nav.Link>
          </Nav>
        </Offcanvas.Body>
      </Offcanvas>

      <Container className="mt-4">
        {currentSection === 'home' && (
          <div>
            <h2>Home Page</h2>
            <p>Welcome to John's Bike Services!</p>
          </div>
        )}
        {currentSection === 'services' && (
          <div>
            <h2>Service Details</h2>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Service Name</th>
                  <th>Details</th>
                  <th>Created At</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {services.map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>{service.email}</td>
                    <td>{service.phoneNo}</td>
                    <td>{service.serviceName}</td>
                    <td>{service.details}</td>
                    <td>{new Date(service.createdAt).toLocaleString()}</td>
                    <td>
                      <Button
                        variant="danger"
                        onClick={() => deleteService(service._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
        {currentSection === 'admin' && (
          <div>
            <h2>Admin Dashboard</h2>
            <Container>
              <Row>
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Service Statistics</Card.Title>
                      <Card.Text>
                        <ul>
                          <li>Total Services: {getTotalServices()}</li>
                          <li>Most Common Service: {getMostCommonService()}</li>
                        </ul>
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="mb-4">
                    <Card.Body>
                      <Card.Title>Service Distribution</Card.Title>
                      <Bar
                        data={getChartData()}
                        options={{
                          responsive: true,
                          plugins: {
                            legend: {
                              position: 'top',
                            },
                            tooltip: {
                              callbacks: {
                                label: function(tooltipItem) {
                                  return tooltipItem.label + ': ' + tooltipItem.raw;
                                }
                              }
                            }
                          },
                        }}
                      />
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Admin;
