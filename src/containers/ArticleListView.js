import React from 'react'
import Articles from '../components/Article'
import axios from 'axios';
import { Button, Card, Input, AutoComplete } from 'antd';
import * as icon from '@ant-design/icons';
import CustomForm from '../components/Form';
import { connect } from 'react-redux';
import { options } from './cities'

const listData = [];

function updateState() {
    this.setState({ isloggedin: false })
}

class ArticleList extends React.Component {

    state = {
        isloggedin: false,
        articles: [],
        buttonPressed: false
    }


    updateState = updateState.bind(this)

    saveStateToLocalStorage() {
        //console.log("HERE");
        // for every item in React state
        for (let key in this.state) {
            // save to localStorage
            localStorage.setItem(key, JSON.stringify(this.state[key]));
        }
    }

    componentWillReceiveProps(newProps) {// draws articles no matter what 
        console.log(newProps);
        axios.get(`https://eztrade.herokuapp.com/api/articles/?search=${newProps.searchterm}&traded=false`)
            .then(res => {
                this.setState({
                    articles: res.data
                });
                console.log(res.data)
            })

    }
    componentDidMount() {
        if (this.props.searchterm) {
            axios.get(`https://eztrade.herokuapp.com/api/articles/?search=${this.props.searchterm}&traded=false`)
                .then(res => {
                    this.setState({
                        articles: res.data
                    });
                    console.log(res.data)
                })
        } else {
            axios.get('https://eztrade.herokuapp.com/api/articles/?traded=false')
                .then(res => {
                    this.setState({
                        articles: res.data
                    });
                    console.log(res.data)
                })
        }
    }

    repopulate = () => {
        axios.get('https://eztrade.herokuapp.com/api/articles/?traded=false')
            .then(res => {
                this.setState({
                    articles: res.data
                });
                console.log(res.data)
            })
    }
    updateProductList = (newList) => {
        this.setState({ articles: newList });
        setTimeout(this.repopulate, 500);
        this.setState({
            buttonPressed: false
        })
    }

    handleRequest = (e) => {
        if (this.state.buttonPressed === false) {
            this.setState({
                buttonPressed: true
            })
        } else {
            this.setState({
                buttonPressed: false
            })
        }

    }

    handleSearch = (value) => {
        axios.get(`https://eztrade.herokuapp.com/api/articles/?search=${value}&traded=false`)
            .then(res => {
                this.setState({
                    articles: res.data
                });
                console.log(res.data)
            })
    }

    render() {
        const { Search } = Input;
        return (
            <div>
                
                <div className='listandfilter'>
                    <div className="searchAndAdd" >
                        {
                            this.state.buttonPressed ?

                                <Button type="danger" htmlType="submit" onClick={this.handleRequest} style={{ backgroundColor: '#fa1212' }}>
                                    <div class="additem">
                                        <p>Cancel</p>
                                        <div class="littleicon"><icon.CloseCircleFilled /></div>
                                    </div>
                                </Button>

                                :

                                <Button type="primary" htmlType="submit" onClick={this.handleRequest} style={{ backgroundColor: '#00e27f', borderColor: '#00e27f' }}>
                                    <div class="additem">
                                        <p>List item</p>
                                        <div class="littleicon"><icon.PlusCircleFilled /></div>

                                    </div>
                                </Button>

                        }

                    </div>
                    
                </div>

                <h2>{
                    this.state.buttonPressed ?

                        <div className="addproductpopup">
                            {
                                this.props.currentUsername ?
                                    <div>
                                        <br></br>
                                        <Card>
                                            <p>
                                                <CustomForm currentArticles={this.state.articles} onAddProduct={this.updateProductList} requestType="post" articleID={null} btnText="Submit"></CustomForm></p>
                                        </Card>
                                        <br></br>
                                    </div>
                                    :
                                    <div>
                                        <br></br>
                                        <p>Please log in to list an item</p>
                                    </div>
                            }

                        </div>
                        :
                        <p></p>
                }</h2>
                <div className = "listcard">
                    <Card>
                        <Articles data={this.state.articles} />
                    </Card>
                </div>

            </div >



        )
    }
}

const mapStateToProps = state => {
    return {
        token: state.token,
        currentUsername: state.currentUsername
    }
}

export default connect(mapStateToProps)(ArticleList);