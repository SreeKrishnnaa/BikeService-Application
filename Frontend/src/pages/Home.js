import React from 'react';
import { Container, Card, Button, Nav, Navbar, Figure } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faTwitter, faTelegram, faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import bikeWashImage from '../img/bike wash.jpg';
import generalservice from '../img/generalservice.jpg';
import oilchange from '../img/oilchange.jpg';

// Define the Home component
function Home() {
  return (
    <div>
      {/* Navbar with links to different sections */}
      <Navbar bg="dark" variant="dark" expand="md" fixed="top">
        <Container>
          <Navbar.Brand href="#home">John's Bike Services</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="#services">Services</Nav.Link>
              <Nav.Link href="/login">Login</Nav.Link>
              <Nav.Link href="/signup">Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Header section with a welcome message */}
      <header className="bg-light text-center py-5" style={{ marginTop: '70px' }}>
        <Container>
          <div className="bg-primary p-4 rounded shadow">
            <h1 className="text-white mb-4">Welcome to John's Bike Service Station</h1>
            <p className="text-white mb-4">
              John's Bike Service is a highly regarded shop known for its comprehensive range of services. Whether you need a tune-up, cleaning, or specific maintenance like oil changes, John's Bike Service ensures your bike receives top-notch care.
            </p>
            <p className="text-white mb-4">
              Our general service check-up covers everything from brake adjustments to gear tuning, ensuring your bike is safe and performing optimally. We meticulously check each component to identify and fix any issues, providing peace of mind for every ride.
            </p>
            <p className="text-white mb-4">
              We understand the importance of a clean bike, which is why our professional water wash service is designed to remove dirt and grime, protecting your bike's components and extending its lifespan. Our team uses high-quality cleaning products that are safe for your bike and the environment.
            </p>
            <p className="text-white mb-4">
              Regular oil changes are crucial for maintaining the smooth operation of your bike. Our expert technicians use top-grade oil to lubricate your bike's moving parts, reducing friction and preventing wear and tear. This service not only enhances performance but also prolongs the life of your bike.
            </p>
            <p className="text-white mb-4">
              At John's Bike Service, customer satisfaction is our top priority. Our friendly and knowledgeable staff are always ready to answer your questions and provide personalized recommendations based on your bike's needs. Trust us to keep your bike in excellent condition so you can enjoy every ride to the fullest.
            </p>
            {/* Button to navigate to the signup page */}
            <Button variant="primary" href="/signup" style={{ backgroundColor: "#455d7a", borderColor: "black" }}>
              Book now !!
            </Button>
          </div>
        </Container>
      </header>

      {/* Services section with descriptions and images */}
      <section id="services" className="py-5" style={{ backgroundColor: "#bbe4e9" }}>
        <Container>
          <h2 className="text-center mb-4">Our Services</h2>
          <div className="row">
            <div className="col-lg-4 col-md-6 mb-4">
              <Card className="h-100 shadow">
                <Figure>
                  <Figure.Image className="img-fluid" alt="General Service" src={generalservice} />
                </Figure>
                <Card.Body>
                  <Card.Title className="text-center">General Service Check-up</Card.Title>
                  <Card.Text className="text-center">
                    Precision care for every ride. Trust us with your bike's peak performance.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <Card className="h-100 shadow">
                <Figure>
                  <Figure.Image className="img-fluid" alt="Oil Change" src={oilchange} />
                </Figure>
                <Card.Body>
                  <Card.Title className="text-center">Oil Change</Card.Title>
                  <Card.Text className="text-center">
                    Keep your bike running smoothly. Expert oil changes for peak performance.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            <div className="col-lg-4 col-md-6 mb-4">
              <Card className="h-100 shadow">
                <Figure>
                  <Figure.Image className="img-fluid" alt="Water Wash" src={bikeWashImage} />
                </Figure>
                <Card.Body>
                  <Card.Title className="text-center">Water Wash</Card.Title>
                  <Card.Text className="text-center">
                    Restore the shine. Professional bike wash services for bikes that sparkle.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        </Container>
      </section>

      {/* Contact section with social media links and contact details */}
      <Container fluid className="py-4 bg-dark text-white">
        <h3 className="text-center mb-4">Contact Us</h3>
        <div className="text-center mb-3">
          {/* Social media icons */}
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FontAwesomeIcon icon={faTwitter} size="2x" />
          </a>
          <a href="https://telegram.org/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FontAwesomeIcon icon={faTelegram} size="2x" />
          </a>
          <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="text-white mx-2">
            <FontAwesomeIcon icon={faWhatsapp} size="2x" />
          </a>
        </div>
        <p className="text-center">For inquiries and bookings, please contact us at:</p>
        <p className="text-center"><strong>Email:</strong> johnbikeservices@gmail.com</p>
        <p className="text-center"><strong>Phone:</strong> +91 6385-444-099</p>
      </Container>
    </div>
  );
}

export default Home;
