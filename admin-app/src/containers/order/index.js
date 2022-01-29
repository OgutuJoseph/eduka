import React from 'react';
import Layout from '../../components/layout';
import { Container, Row, Col } from 'react-bootstrap'; 

const Orders = (props) => {
    return (
        <Layout sidebar>
            <Container>
                <Row> 
                    <Col md={12}>
                        <h3>Orders</h3>
                    </Col>
                </Row>
            </Container> 
        </Layout>
    )
}

export default Orders;