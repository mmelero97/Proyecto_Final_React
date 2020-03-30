import React from 'react';
import PropTypes from 'prop-types';

import './ElementoCarrito.css';
import { Row, Col } from 'react-bootstrap';
import { render } from '@testing-library/react';

class ElementoCarrito extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div class="row">
                <div class="col" className="InfoLibroCarrito">
                    <div> {this.props.libro}</div>
                </div>
                <div class="col" className="CantidadLibroCarrito">
                    <div>Cantidad: {this.props.cantidad}</div>
                </div>
            </div>

        )
    }
}

ElementoCarrito.propTypes = {
    libro: PropTypes.string,
    cantidad: PropTypes.number
}

export default ElementoCarrito;