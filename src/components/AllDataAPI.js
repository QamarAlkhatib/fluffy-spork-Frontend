import React, { Component } from 'react';
import { withAuth0 } from '@auth0/auth0-react';
import axios from 'axios'
import CardsData from './CardsData.js'
import 'bootstrap/dist/css/bootstrap.min.css';
class AllDataAPI extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ApiData: [],
            AddToFav:[],
            // email:this.props.auth0.user.email

        }
    }

    async componentDidMount() {

        let DataURL = `http://localhost:3002/AllData`

        let newArray = await axios.get(DataURL)

        this.setState({
            ApiData: newArray.data,
        })
    }

    addToFav =async()=>{

        const addedData ={
            title:this.state.ApiData.title,
            imageUrl:this.state.ApiData.imageUrl,
            id:this.state.ApiData.id,
            email:this.props.auth0.user.email
        }

        let newData = await axios.post(`http://localhost:3002/addToFav`,addedData);

        this.setState({
            AddToFav:newData.data
        });
        // console.log('wasAdded',this.state.ApiData)
    }

    render() {
        return (
            <>
                <div>
                    <h1>All Data from the API</h1>
                    <h3>Select your favorites :)</h3>
                </div>
              
                    {this.state.ApiData.map((val,indx) => {
                        return (
                            <CardsData indx={indx} val={val} addToFav={this.addToFav}/>
                        )
                    })}
               
            </>
        )
    }
}

export default withAuth0(AllDataAPI);
