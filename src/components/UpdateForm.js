import React, { Component } from 'react'
import { Modal, Button, Form, Col } from 'react-bootstrap/'
class UpdateForm extends Component {

    render() {
        return (
            <div>
                <div>
                    <Modal show={this.props.show} onHide={this.props.handelClose}>
                        <Modal.Header closeButton >
                            <Modal.Title>Update Data Modal</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <Form onSubmit={this.props.updateFun} >
                                <Col sm="10" className="mb-3" >
                                    <Form.Control type="text" name='title' defaultValue={this.props.updateData.title} />
                                </Col>

                                <Col sm="10" className="mb-3" >
                                    <Form.Control type="text" name='imageUrl' defaultValue={this.props.updateData.imageUrl} />
                                </Col>

                                <Button type="submit" variant="warning" value="Update">
                                    Update
                                </Button>

                            </Form>

                        </Modal.Body>
                    </Modal >
                </div >
            </div>
        )
    }
}
export default UpdateForm