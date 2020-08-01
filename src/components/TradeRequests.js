import React from 'react'
import ArticlesSmall from '../components/ArticleSmall'
import axios from 'axios';
import { Checkbox, List, Space, Radio, Card, Button } from 'antd';
import CustomForm from '../components/Form';
import { connect } from 'react-redux';
import { MessageOutlined, LikeOutlined, StarOutlined, DoubleRightOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router'
const listData = [];


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
class RequestList extends React.Component {

    state = {
        selectedProductID: null,
        requests: [],
        value: null,

    }
    populatePending() {
        if (this.props.currentUsername) {

            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.get(`https://eztrade.herokuapp.com/api/trade/?recieverUsername=${this.props.currentUsername}&completed=false`)
                .then(res => {
                
                    var array = res.data;
                    var arrayLength = array.length;
                    for (let i = 0; i < arrayLength; i++) {
                        var itemid = array[i].instigatorProductID;
                        var itemid2 = array[i].recieverProductID;
                        axios.get(`https://eztrade.herokuapp.com/api/articles/${itemid}/`)
                            .then(res => {
                                
                                var temp = i;
                                const temp2 = temp;
                                array[i].instigatorImage = res.data.image;
                                array[i].instigatorProductTitle = res.data.title;

                                this.setState({
                                    requests: array
                                });
                            }).catch(error => console.error(error));
                        axios.get(`https://eztrade.herokuapp.com/api/articles/${itemid2}/`)
                            .then(res => {
                               
                                var temp = i;
                                const temp2 = temp;
                                array[i].recieverImage = res.data.image;
                                array[i].recieverProductTitle = res.data.title;

                                this.setState({
                                    requests: array
                                });
                            }).catch(error => console.error(error));
                    }
                })
        }

    }

    componentDidMount() {// draws articles no matter what 
        this.populatePending()
    }

    componentWillUnmount() {

    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }

    handleRequest = (e, id) => {
        if (this.props.token !== null) {
            e.preventDefault();

            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.delete(`https://eztrade.herokuapp.com/api/trade/${id}`).then(res => {
                var array = [...this.state.requests];
                var arrayLength = array.length;
                for (var i = 0; i < arrayLength; i++) {
                    if (array[i].id == id) {
                        array.splice(i, 1);
                        break;
                    }

                }
                this.setState({ requests: array });
            }).catch(error => console.error(error));
            //this.props.history.push('/');
        }
    }

    handleRequest2 = (e, id, iusername, ipid, rpid) => {
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        }

        axios.put(`https://eztrade.herokuapp.com/api/trade/${id}/`, {//marks trade as completed
            instigatorUsername: iusername,
            instigatorProductID: ipid,
            recieverUsername: this.props.currentUsername,
            recieverProductID: rpid,
            completed: true,

        }).then(res => {}).catch(error => console.error(error));// then remove trade request from pending trades in state
        var array = [...this.state.requests];
        var arrayLength = array.length;
        for (var i = 0; i < arrayLength; i++) {//changes state
            if (array[i].id == id) {
                array.splice(i, 1);
                break;
            }

        }
        this.setState({ requests: array });
        axios.get(`https://eztrade.herokuapp.com/api/trade/?instigatorProductID=${ipid}`)// 1.Delete offers made using instigators product
            .then(res => {
                var array = res.data
                var arrayLength = array.length;
                var toDelete = []
                for (let i = 0; i < arrayLength; i++) {
                    if (array[i].id != id) {
                        toDelete.push(array[i].id);
                    }
                }
                for (var i = 0; i < toDelete.length; i++) {
                    axios.defaults.headers = {
                        "Content-Type": "application/json",
                        Authorization: `Token ${this.props.token}`
                    }
                    axios.delete(`https://eztrade.herokuapp.com/api/trade/${toDelete[i]}/`)
                        .then(res => {
                        })
                }
                var array2 = [...this.state.requests];// above removals may change the state of the reciever as the same person might have made multiple offers to the reciever with the same item
                var arrayLength2 = array2.length;// this automatically refreshes the users view without having to manually refresh
                for (var i = 0; i < arrayLength2; i++) {//changes state
                    var willDelete = false;
                    for (var y = 0; y < toDelete.length; y++) {
                        if (array2[i].id === toDelete[y]) {
                            willDelete = true;
                        }
                    }
                    if (willDelete === true) {
                        array2.splice(i, 1);
                    }
                }
                this.setState({ requests: array2 });
            })
        axios.get(`https://eztrade.herokuapp.com/api/trade/?recieverProductID=${rpid}`)// 2.delete offers recieved that ask for the recievers product
            .then(res => {
                var array = res.data
                var arrayLength = array.length;
                var toDelete = []
                for (let i = 0; i < arrayLength; i++) {
                    if (array[i].id != id) {
                        toDelete.push(array[i].id);
                    }
                }
                for (var i = 0; i < toDelete.length; i++) {
                    axios.defaults.headers = {
                        "Content-Type": "application/json",
                        Authorization: `Token ${this.props.token}`
                    }
                    axios.delete(`https://eztrade.herokuapp.com/api/trade/${toDelete[i]}/`)
                        .then(res => {

                        })
                }
                var array2 = [...this.state.requests];//in case any offers to be deleted are being rendered
                var arrayLength2 = array2.length;
                for (var i = 0; i < arrayLength2; i++) {
                    var willDelete = false;
                    for (var y = 0; y < toDelete.length; y++) {
                        if (array2[i].id === toDelete[y]) {
                            willDelete = true;
                        }
                    }
                    if (willDelete === true) {
                        array2.splice(i, 1);
                    }
                }
                this.setState({ requests: array2 });
            })
        axios.get(`https://eztrade.herokuapp.com/api/trade/?instigatorProductID=${rpid}`)// 3.delete offers made using the recievers product
            .then(res => {
                var array = res.data
                var arrayLength = array.length;
                var toDelete = []
                for (let i = 0; i < arrayLength; i++) {
                    if (array[i].id != id) {
                        toDelete.push(array[i].id);
                    }
                }
                for (var i = 0; i < toDelete.length; i++) {
                    axios.defaults.headers = {
                        "Content-Type": "application/json",
                        Authorization: `Token ${this.props.token}`
                    }
                    axios.delete(`https://eztrade.herokuapp.com/api/trade/${toDelete[i]}/`)
                        .then(res => {
                        })
                }
                var array2 = [...this.state.requests];
                var arrayLength2 = array2.length;
                for (var i = 0; i < arrayLength2; i++) {
                    var willDelete = false;
                    for (var y = 0; y < toDelete.length; y++) {
                        if (array2[i].id === toDelete[y]) {
                            willDelete = true;
                        }
                    }
                    if (willDelete === true) {
                        array2.splice(i, 1);
                    }
                }
                this.setState({ requests: array2 });

            })
        axios.get(`https://eztrade.herokuapp.com/api/trade/?recieverProductID=${ipid}`)// 4.delete offers recieved that ask for the instigatos product
            .then(res => {
                var array = res.data
                var arrayLength = array.length;
                var toDelete = []
                for (let i = 0; i < arrayLength; i++) {
                    if (array[i].id != id) {
                        toDelete.push(array[i].id);
                    }
                }
                for (var i = 0; i < toDelete.length; i++) {
                    axios.defaults.headers = {
                        "Content-Type": "application/json",
                        Authorization: `Token ${this.props.token}`
                    }
                    axios.delete(`https://eztrade.herokuapp.com/api/trade/${toDelete[i]}/`)
                        .then(res => {

                        })
                }
                var array2 = [...this.state.requests];
                var arrayLength2 = array2.length;
                for (var i = 0; i < arrayLength2; i++) {
                    var willDelete = false;
                    for (var y = 0; y < toDelete.length; y++) {
                        if (array2[i].id === toDelete[y]) {
                            willDelete = true;
                        }
                    }
                    if (willDelete === true) {
                        array2.splice(i, 1);
                    }
                }
                this.setState({ requests: array2 });
            })
        /////add more here for hiding listings
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        }
        axios.patch(`https://eztrade.herokuapp.com/api/articles/${ipid}/`, {
            traded: true
        }).then(res => {  })
        axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        }
        axios.patch(`https://eztrade.herokuapp.com/api/articles/${rpid}/`, {
            traded: true

        }).then(res => {  })


    }

    render() {

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <div>

                <br></br>
                <br></br>
                <List
                    itemLayout="vertical"
                    size="small"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 3,
                    }}
                    dataSource={this.state.requests}
                    footer={
                        <div>

                        </div>
                    }
                    renderItem={item => (

                        <Card>
                            <List.Item>
                                <p class="fromclass">{"From: " + item.instigatorUsername}</p>
                                {<div class="traderequestlist">
                                    <div class="offerborder">
                                        <div class="imageplustext">
                                            <p class="justtext">Item being requested</p>
                                            <img
                                                className="photorequest"
                                                src={item.recieverImage}
                                            />
                                            <a class="justtext" href={`/articles/${item.recieverProductID}`}>{item.recieverProductTitle}</a>
                                        </div>
                                    </div>
                                    <div class="littlearrow"><DoubleRightOutlined /></div>
                                    <div class="offerborder">
                                        <div class="imageplustext">
                                            <p class="justtext">Item being offered</p>
                                            <img
                                                className="photorequest"
                                                src={item.instigatorImage}
                                            />
                                            <a class="justtext" href={`/articles/${item.instigatorProductID}`}>{item.instigatorProductTitle}</a>
                                        </div>
                                    </div>

                                    <div class="buttons">
                                        <Button style={{backgroundColor:'#00f388',borderColor:'#00f388'}} type="primary" onClick={(e) => { this.handleRequest2(e, item.id, item.instigatorUsername, item.instigatorProductID, item.recieverProductID) }}>Accept</Button>&nbsp;&nbsp;&nbsp;
                                        <Button style={{backgroundColor:'#fa1212',borderColor:'#fa1212'}} type="danger" onClick={(e) => { this.handleRequest(e, item.id) }}>Decline</Button>
                                    </div>
                                </div>}
                            </List.Item>
                        </Card>

                    )}
                />
                <br></br>
            </div>
        )
    }
}
//item.instigatorUsername BEING OFFERED
//item.instigatorProductID
//item.instigatorProductTitle
//item.instigatorImage
//item.recieverUsername WANTED IN RETURN
//item.instigatorProductID
//item.instigatorProductTitle
//item.instigatorImage
//<ArticlesSmall data={this.state.articles} />
const mapStateToProps = state => {
    return {
        token: state.token,
        currentUsername: state.currentUsername
    }
}

export default withRouter(connect(mapStateToProps)(RequestList));