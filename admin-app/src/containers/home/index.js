import React from 'react'
import Layout from '../../components/layout';
import './style.css';
import { Container, Row, Col } from 'react-bootstrap'; 

const Home = (props) => {
    return (
        <Layout sidebar>
            <Container>
                <Row> 
                    <Col md={12}>
                        <h3>Home</h3>
                    </Col>
                </Row>
            </Container> 
        </Layout>
    )
}

export default Home;
