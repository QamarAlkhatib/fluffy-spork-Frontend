import React from 'react'
import { Card, Button } from 'react-bootstrap/'

class FavCards extends React.Component {
    render() {
        return (
            <div>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={this.props.val.imageUrl} />
                    <Card.Body>
                        <Card.Title>{this.props.val.title}</Card.Title>
                        <Button onClick={() => { this.props.DeleteFun(this.props.val._id) }} variant="danger">Delete</Button>
                        <Button onClick={() => { this.props.handelShow(this.props.val) }} variant="primary">Update</Button>

                    </Card.Body>
                </Card>
            </div>
        )
    }
}
export default FavCards