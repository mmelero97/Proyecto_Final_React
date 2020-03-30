import React from 'react';
import PropTypes from 'prop-types';
import './Pedido.css';
import { Row, Col } from 'react-bootstrap';

class Pedido extends React.Component {

    constructor(props) {
        super(props);
       
    }
    
    render() {
        return (
            <Row className='ElementoPedido'>
                <article onClick={this.props.clicked}>
                    <Col className="Nombre">
                        <div> Cliente: {this.props.nombre}</div>
                    </Col>
                    <Col className="Mail">
                        <div>Email: {this.props.email}</div>
                    </Col>
                </article>
            </Row>
        )
    }
}

Pedido.propTypes = {
    clicked: PropTypes.func,
    nombre: PropTypes.string,
    email: PropTypes.string
}

export default Pedido;