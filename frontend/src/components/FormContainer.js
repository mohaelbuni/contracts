import React from 'react'
import {Container ,Card,Row, Col} from 'react-bootstrap'

function FormContainer({children}) {
    return (
        <Container className='my-5'>
            <Card className='mx-5'>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6} className="py-4">
                    {children}
                </Col>
            </Row>
            </Card>
        </Container>
    )
}

export default FormContainer
