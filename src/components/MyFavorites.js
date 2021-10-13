import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '././MyFavorites.js';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import UpdateForm from './UpdateForm'
import FavCards from './FavCards'


class MyFavorites extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      Data: [],
      showModel: false,
      updateData: []
    }
  }

  handelShow = async (DataInfo) => {
    console.log('Data', DataInfo)

    await this.setState({
      showModel: true,
      updateData: DataInfo,
    })
  }
  handelClose = () => {
    this.setState({
      showModel: false,
    })
  }

  componentDidMount = async () => {
    let DataURL = `${process.env.HEROKU}/getFav?email=${this.props.email}`
    let newArray = await axios.get(DataURL)
    await this.setState({
      Data: newArray.data
    })

  }

  DeleteFun = async (id) => {

    let newFavData = await axios.delete(`${process.env.HEROKU}/FavDelete?&id=${id}&email=${this.props.email}`)

    this.setState({
      Data: newFavData.data
    });

  }

  updateFun = async (e) => {
    e.preventDefault();
    console.log('updateee')
    let UpdateDataForm = {
      title: e.target.title.value,
      imageUrl: e.target.imageUrl.value,
      id: this.state.updateData._id,
      email: this.props.email
    }
    let newData = await axios.put(`${process.env.HEROKU}/updateData/${this.state.updateData._id}`, UpdateDataForm)
    this.setState({
      Data: newData.data
    });
    console.log('newData,', newData)
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
              <FavCards
                val={val}
                key={key}
                DeleteFun={this.DeleteFun}
                handelShow={this.handelShow} />
            )

          })}
        </div>
        <div>
          {this.state.showModel &&

            <UpdateForm updateFun={this.updateFun} updateData={this.state.updateData} handelClose={this.handelClose} show={this.state.showModel} />
          }
        </div>
      </>
    )
  }
}

export default withAuth0(MyFavorites);

