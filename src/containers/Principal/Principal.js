import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import './Principal.css';
import ListaPedidos from './ListaPedidos/ListaPedidos';
import Escaparate from './Escaparate/Escaparate';
import Formulario from './Formulario/Formulario';
import Carrito from './Carrito/Carrito';
import { Container, Row, Col} from 'react-bootstrap';

class Principal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            array: 0
        };
    }

    myCallback = (dataFromChild) => {
        //console.log(dataFromChild);
        this.setState({array: dataFromChild});
    }

    render() {
        return (
            <Container>
                <Row className="Encabezado">
                    <Col xs="2">
                    </Col>
                    <Col xs="8">
                        <img class="imagenCabecera" src="https://firebasestorage.googleapis.com/v0/b/marta-bbdd.appspot.com/o/Cabecera.png?alt=media&token=73975366-9f06-4ac9-881c-f044dca99e94" alt="Imagen"></img>
                    </Col>
                    <Col xs="2">
                    </Col>
                </Row>
                <Row className="Menu">
                    <Col className="EscaparateMenu">
                        <nav>
                            <Link to={{ pathname: '/escaparate'}}>
                                Productos
                            </Link>
                        </nav>
                    </Col>
                    
                    <Col className="Pedidos">
                        <nav>
                            <Link to={{ pathname: '/pedidos'}}>
                                Consultar pedidos
                            </Link>
                        </nav>
                    </Col>

                </Row>
                <Switch>
                    <Route path="/escaparate" render={(props) => <Escaparate {...props} callbackFromParent = {this.myCallback} />} />
                    <Route path="/proceso-compra" render={(props) => <Carrito {...props} parametro={this.state.array} />}  />
                    <Route path="/pedidos" component={ListaPedidos} />
                    <Route path="/formulario" render={(props) => <Formulario {...props} parametro={this.state.array} />} />
                    <Redirect from="/" to="/escaparate" />
                </Switch>
                
            </Container>

        );
    }

    

}

export default Principal;