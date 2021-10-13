import React, { Component } from 'react'
import { Modal, Button, Form } from 'react-bootstrap/'
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
                            <Form onSubmit={() => { this.props.updateFun(this.props.val) }}>
                                < Form.Group className="mb-3" >
                                    <Form.Control type="text" name='title' defaultValue={this.props.Data.title} />
                                </Form.Group>
                                <Form.Group className="mb-3" >
                                    <Form.Control type="text" name='imageUrl' defaultValue={this.props.Data.imageUrl} />
                                </Form.Group>
                                {/* onClick={() => { this.props.updateFun(this.props.val) }}  */}
                                <Button variant="warning" type="submit" value="Update">
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