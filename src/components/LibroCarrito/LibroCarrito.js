import React from 'react';
import { Card } from 'react-bootstrap';

import './LibroCarrito.css';

const libro = (props) => (
    <div class="row" className="Libro2">
        <div class="col" className="col1">
            <img src={props.image}/>
        </div>
        <div class="col" className="col2">
            <div className="Titulo2">{props.title}</div>
            <div className="Author2">{props.author}</div>
            <div className="Precio2">{props.price}€</div>
        </div>
    </div>
);

export default libro;