import React from 'react';
import {Card} from 'react-bootstrap';

import './Libro.css';

const libro = (props) => (
    <Card className="Libro1">
       <Card.Img variant="top" src={props.image}/>
        <Card.Body>
            <div className="Titulo">{props.title}</div>
            <Card.Text>
                <div className="Author">{props.author}</div>
                <div className="Precio">{props.price}€</div>
            </Card.Text>
            <div className="Botones">
                <button onClick={props.sumar} class="botonCantidad">+</button>
                <button onClick={props.restar} class="botonCantidad">-</button>
            </div>
            <div className="Cantidad">
                <p>{props.cantidad}</p>
            </div>
        </Card.Body>
    </Card>

);

export default libro;