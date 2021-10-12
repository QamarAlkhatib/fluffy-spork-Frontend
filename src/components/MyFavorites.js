import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import { Card, Button } from 'react-bootstrap/'


class MyFavorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      AddedData: [],
      DeleteDataArr: [],
      updatedData:[]
    }
  }

  async componentDidMount() {

    let DataURL = `http://localhost:3002/getFav`

    let newArray = await axios.get(DataURL)

    this.setState({
      AddedData: newArray.data,
    })
  }

  DeleteFun = async (id) => {

    const DeleteData = {
      title: this.state.AddedData.title,
      imageUrl: this.state.AddedData.imageUrl,
      id: this.state.AddedData.id,
      email: this.props.auth0.user.email
    }
    let Deleted = await axios.delete(`http://localhost:3002/FavDelete?${id}`, DeleteData)

    this.setState({
      DeleteDataArr: Deleted.data
    });
    console.log('delete', this.state.DeleteDataArr)
  }

  updateFun = async(id)=>{

    let updated = await axios.put(`http://localhost:3002/updateData?${id}`);

    this.setState({
      updatedData: updated.data
    });
    console.log('update', this.state.updatedData)

  }

  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>

        <div>
          {this.state.AddedData.map((val) => {
            return (

              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src={val.imageUrl} />
                <Card.Body>
                  <Card.Title>{val.title}</Card.Title>
                  <Button onClick={this.DeleteFun} variant="primary">Delete</Button>
                  <Button onClick={this.updateFun} variant="primary">Update</Button>
                
                </Card.Body>
              </Card>

            )

          })}
        </div>
      </>
    )
  }
}

export default withAuth0(MyFavorites);

