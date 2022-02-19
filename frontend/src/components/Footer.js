import React from 'react'
import {Row,Col,Container} from 'react-bootstrap'
import Aux from '../hoc/_Aux/index'
function Footer() {
    return (
        <Aux>
            <footer>
                <Container>
                    <Row>
                        <Col className='text-center py-3'>Copyright &copy; Abdulmohaimen Elbuni</Col>
                    </Row>
                </Container>
            </footer>
            
        </Aux>
    )
}

export default Footer
