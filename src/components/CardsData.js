import React, { Component } from 'react'
import {Card, Button} from 'react-bootstrap/'
import 'bootstrap/dist/css/bootstrap.min.css';

class CardsData extends Component {
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.val.imageUrl} />
                    <Card.Body>
                        <Card.Title>{this.props.val.title}</Card.Title>
                        <Button  onClick={this.props.addToFav} variant="primary">Add to favorite</Button>
                    </Card.Body>
                </Card>
            </div>
        )
    }
}

export default CardsData
