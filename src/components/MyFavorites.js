import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import { Card, Button } from 'react-bootstrap/'
import UpdateForm from './UpdateForm'
import FavCards from './FavCards'


class MyFavorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Data: [],
      showModel: false,
      updatedData: []
    }
  }

  handelShow = (DataInfo) => {
    console.log('Data', DataInfo)
    this.setState({
      updatedData: DataInfo,
      showModel: true,
    })
  }
  handelClose = () => {
    this.setState({
      showModel: false,
    })
  }

  async componentDidMount() {

    let DataURL = `https://fluffy-spork-backend.herokuapp.com/getFav`

    let newArray = await axios.get(DataURL)

    this.setState({
      Data: newArray.data,
    })
  }

  DeleteFun = async (id) => {

    let Deleted = await axios.delete(`https://fluffy-spork-backend.herokuapp.com/FavDelete?email=${this.props.email}&id=${id}`)
    this.setState({
      Data: Deleted.data
    });

  }

  updateFun = async (e) => {
    e.preventDefault();
    console.log('ID', this.state.updatedData._id);

    let UpdateDataForm = {
      email: this.props.email,
      title: e.target.title,
      imageUrl: e.target.imageUrl,
      id: this.state.updatedData._id

    }
    let updated = await axios.put(`https://fluffy-spork-backend.herokuapp.com/updateData`, UpdateDataForm);

    this.setState({
      Data: updated.data
    });

  }

  render() {
    return (
      <>
        <h1>My Favorites</h1>
        <p>
          This is a collection of my favorites
        </p>

        <div>
          {this.state.Data.map((val, key) => {
            return (
              <FavCards val={val} key={key} DeleteFun={this.DeleteFun} handelShow={this.handelShow} />
            )

          })}
        </div>

        {this.state.showModel &&

          <UpdateForm updateFun={this.updateFun} Data={this.state.updatedData} handelClose={this.handelClose} show={this.state.showModel} />
        }
      </>
    )
  }
}

export default withAuth0(MyFavorites);

