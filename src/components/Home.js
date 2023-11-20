import React from "react";
import { Container, Row, Col, Card, Tabs, Tab } from "react-bootstrap";
import video from "../videos/neuron_-_91633.mp4";
import ReactPlayer from "react-player";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="landing-wrap">
      <div className="landing-bg">
        <Container fluid>
          <div className="divider d-flex align-items-center my-4">
            <h4 className="form-title text-center mx-3 mb-0">
              Welcome to Empowering Technical Minds!
            </h4>
          </div>

          <Row>
            <Col>
              <div className="video-border mb-3">
                <ReactPlayer
                  className="player"
                  playing={true}
                  loop={true}
                  url={video}
                  controls
                  width="65%"
                  height="65%"
                />
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <Card.Text>
                Welcome to our web community, a collaborative endeavor born from
                the shared passion and dedication of five individuals with a
                common goal - to empower and inspire technical minds. We firmly
                believe in the power of knowledge, the value of sharing, and the
                limitless potential of the next generation of tech enthusiasts.
              </Card.Text>
            </Col>
          </Row>

          <hr className="line" />
          <br />
          <Row>
            <Col>
              <Tabs
                defaultActiveKey="Our Mission"
                id="justify-tab-example"
                className="mb-3"
                justify
              >
                <Tab
                  style={{ color: "purple" }}
                  eventKey="Who We Are"
                  title="Who We Are"
                >
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Subtitle className="mb-2 text-muted">
                        A Collective of Tech Enthusiasts
                      </Card.Subtitle>
                      <Card.Text>
                        We are a diverse group of innovators, developers, and
                        tech enthusiasts who have come together to create a
                        vibrant space where technical students, professionals,
                        and enthusiasts alike can freely ask questions and share
                        their valuable knowledge. Our backgrounds may vary, but
                        our collective commitment to fostering a vibrant tech
                        community is unwavering.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Tab>
                <Tab
                  className="tab-head"
                  eventKey="Our Mission"
                  title="Our Mission"
                >
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Subtitle className="mb-2 text-muted">
                        Bridging the Knowledge Gap
                      </Card.Subtitle>
                      <Card.Text>
                        In a world where technology continues to evolve at an
                        astonishing pace, it's easy to feel overwhelmed and
                        disconnected. Our mission is to bridge the knowledge
                        gap, enabling individuals to grow and thrive in the tech
                        world. We understand that learning is a continuous
                        journey, and together, we aim to support every step of
                        that journey.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Tab>
                <Tab
                  className="tab-head"
                  eventKey="What We Offer"
                  title="What We Offer"
                >
                  <Card className="mb-3">
                    <Card.Body>
                      <Card.Subtitle className="mb-2 text-muted">
                        A Digital Haven for Tech Enthusiasts
                      </Card.Subtitle>
                      <Card.Text>
                        Our web community is your haven for all things tech.
                        Here, you'll find an extensive repository of questions
                        and knowledge that covers a vast spectrum of technical
                        fields, from coding and data science to hardware and
                        software development. Whether you're a seasoned expert
                        or just starting out, our platform is designed to be
                        accessible and inclusive.
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Tab>
              </Tabs>
              <hr className="line" />
            </Col>
          </Row>

          <div>
            <div className="divider d-flex align-items-center my-4">
              <h4 className="form-title text-center mx-3 mb-0">
                Meet The Team
              </h4>
            </div>
            <div>
              <Row>
                <div className="team-card">
                  <Col>
                    <Card style={{ width: "10rem" }}>
                      <Card.Img
                        variant="top"
                        src="https://images.unsplash.com/photo-1511379938547-c1f69419868d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                        alt="Music Theme"
                      />
                      <Card.Body className="text-center">
                        <Card.Text>Carlito Pedida</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: "10rem" }}>
                      <Card.Img
                        variant="top"
                        src="https://images.unsplash.com/photo-1497515114629-f71d768fd07c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=884&q=80"
                        alt="Third Shift Coffee"
                      />
                      <Card.Body className="text-center">
                        <Card.Text>Emmanuel Mefor</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: "10rem" }}>
                      <Card.Img
                        variant="top"
                        src="https://images.unsplash.com/photo-1579458342405-52d7d969e0d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80"
                        alt="Chain Breaker"
                      />
                      <Card.Body className="text-center">
                        <Card.Text>Joe Lester</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: "10rem" }}>
                      <Card.Img
                        variant="top"
                        src="https://images.unsplash.com/photo-1604931668626-ab49cb27d952?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                        alt="Latin Scholar"
                      />
                      <Card.Body className="text-center">
                        <Card.Text>Joseph Miloscia</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col>
                    <Card style={{ width: "10rem" }}>
                      <Card.Img
                        variant="top"
                        src="https://images.unsplash.com/photo-1619467416348-6a782839e95f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                        alt="Traveler"
                      />
                      <Card.Body className="text-center">
                        <Card.Text>Taminee Ficklin</Card.Text>
                      </Card.Body>
                    </Card>
                  </Col>
                </div>
              </Row>
            </div>
            <hr className="line" />
            <Row>
              <Col>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title className="text-center">
                      Join Us in Shaping the Future
                    </Card.Title>

                    <Card.Text>
                      We invite you to join us on this exciting journey of
                      empowerment and knowledge-sharing. Together, we can shape
                      the future of tech by connecting, collaborating, and
                      inspiring one another. This web community is not just
                      about us, the founders; it's about each and every member
                      who contributes, asks, or shares. It's about the
                      collective power of technical minds coming together to
                      create a better tomorrow.
                    </Card.Text>
                    <Card.Text>
                      We believe that by empowering technical minds, we're
                      building a brighter and more innovative future for all.
                      So, come and be a part of our growing community, where
                      questions are the seeds of learning, and knowledge is the
                      fruit of collaboration. Together, we'll empower technical
                      minds and inspire a brighter future.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            </Row>
            <hr className="line" />

            <div>
              <footer>
                <div className="footer">
                  <p>
                    &copy; {new Date().getFullYear()} | 5-Node-Prophets. All
                    rights reserved.
                  </p>
                </div>
              </footer>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};
export default Home;
