import React from 'react'
import Articles from '../components/Article'
import axios from 'axios';
import CustomForm from '../components/Form';
import { connect } from 'react-redux';
const listData = [];

function updateState() {
    this.setState({ isloggedin: false })
}

class ListedProducts extends React.Component {

    state = {
        isloggedin: false,
        articles: []
    }



    componentDidMount() {// draws articles no matter what 

        if (this.props.currentUsername) {
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.get(`http://127.0.0.1:8000/api/articles/?createdBy=${this.props.currentUsername}&traded=false`)
                .then(res => {
                    this.setState({
                        articles: res.data
                    });
                    
                }).catch(error => console.error(error));
        }



    }
    componentWillReceiveProps(newProps) {// draws articles no matter what 


        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${newProps.token}`
        }
        axios.get(`http://127.0.0.1:8000/api/articles/?createdBy=${newProps.currentUsername}&traded=false`)
            .then(res => {
                this.setState({
                    articles: res.data
                });
            }).catch(error => console.error(error));




    }


    updateProductList = (newList) => {
        this.setState({ articles: newList });
    }

    render() {
        return (


            <div>
                <Articles data={this.state.articles} />

            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        currentUsername: state.currentUsername
    }
}

export default connect(mapStateToProps)(ListedProducts);