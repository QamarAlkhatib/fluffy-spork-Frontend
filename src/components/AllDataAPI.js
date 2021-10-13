import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import CardsData from './CardsData.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import MyFavorites from './MyFavorites.js';

class AllDataAPI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ApiData: [],
            AddToFav: [],
            email: this.props.auth0.user.email

        }
    }

    async componentDidMount() {
        console.log('component')
        let DataURL = `${process.env.HEROKU}/AllData`

        let newArray = await axios.get(DataURL)

        await this.setState({
            ApiData: newArray.data,
        })
    }

    addToFav = async (id) => {

        const addedData = {
            title: this.state.ApiData[id].title,
            imageUrl: this.state.ApiData[id].imageUrl,
            id: this.state.ApiData[id].id,
            email: this.state.email
        }

        let newData = await axios.post(`${process.env.HEROKU}/addToFav`, addedData);

        this.setState({
            AddToFav: newData.data
        });
        console.log('wasAdded', this.state.AddToFav)
    }

  

    render() {
        return (
            <>
                <div>
                    <h1>All Data from the API</h1>
                    <h3>Select your favorites :)</h3>

                </div>

                <div >
                    {this.state.ApiData.map((val, indx) => {
                        return (
                            <CardsData indx={indx} val={val} addToFav={this.addToFav} email={this.state.email} />
                        )
                    })}
                </div>

                <div>
                    <MyFavorites email={this.state.email}/>
                </div>
            </>
        )
    }
}

export default withAuth0(AllDataAPI);
