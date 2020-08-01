import { List, Typography, Divider } from 'antd';
import React from 'react'
import { connect } from 'react-redux';
import axios from 'axios';
const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
];

class CompletedList extends React.Component {

    state = {
        completed: []
    }


    componentDidMount() {
        var temp = []
        axios.get(`https://eztrade.herokuapp.com/api/trade/?recieverUsername=${this.props.currentUsername}&completed=true`)
            .then(res => {
                var arrayLength = res.data.length;
                for (let i = 0; i < arrayLength; i++) {

                    temp.push({
                        id: res.data[i].id,
                        with: res.data[i].instigatorUsername,
                        sentitemid: res.data[i].recieverProductID,
                        recieveditemid: res.data[i].instigatorProductID
                    })

                }
                this.setState({
                    completed: temp
                })

            })
        axios.get(`https://eztrade.herokuapp.com/api/trade/?instigatorUsername=${this.props.currentUsername}&completed=true`)
            .then(res => {
                var arrayLength = res.data.length;
                if (arrayLength >= 0) {
                    for (let i = 0; i < arrayLength; i++) {

                        temp.push({
                            id: res.data[i].id,
                            with: res.data[i].recieverUsername,
                            sentitemid: res.data[i].instigatorProductID,
                            recieveditemid: res.data[i].recieverProductID
                        })

                    }
                    this.setState({
                        completed: temp
                    })
                }

            })
    }

    render() {

        return (
            <div>
                <List
                    itemLayout="horizontal"
                    dataSource={this.state.completed}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta

                                title={item.with + " traded with you"}
                                description={<div>
                                    <a href={`/articles/${item.sentitemid}`}>Product you sent</a>
                                    <br></br>
                                    <a href={`/articles/${item.recieveditemid}`}>Product you recieved</a>
                                    <p>{"tradeID : "+item.id}</p>
                                </div>}
                            />
                        </List.Item>
                    )}
                />
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

export default connect(mapStateToProps)(CompletedList);

