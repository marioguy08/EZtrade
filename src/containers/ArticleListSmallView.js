import React from 'react'
import ArticlesSmall from '../components/ArticleSmall'
import axios from 'axios';
import { Checkbox, List, Space, Radio, Card, Button } from 'antd';
import CustomForm from '../components/Form';
import { connect } from 'react-redux';
import Axios from 'axios';

import { withRouter } from 'react-router'
import { MessageOutlined, LikeOutlined, StarOutlined, MinusOutlined } from '@ant-design/icons';
const listData = [];


const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
class ArticleListSmall extends React.Component {

    state = {
        selectedProductID: null,
        selectedProductUser: null,
        articles: [],
        value: null,
    }





    componentWillReceiveProps(newProps) {
        if (newProps.token) {
            const value = newProps.currentUsername
            this.setState({
                currentUsername: value
            })
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${newProps.token}`
            }
            axios.get(`http://localhost:8000/api/articles/?createdBy=${newProps.currentUsername}&traded=false`)
                .then(res => {
                    this.setState({
                        articles: res.data
                    });
                })

        }

    }

    componentDidMount() {// draws articles no matter what 



    }

    componentWillUnmount() {

    }

    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            selectedProductUser: e.target.name,
            value: e.target.value,
        });
    }
    handleRequest = (e) => {
        this.props.history.push('/');
        Axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: this.props.token
        }
        return Axios.post("http://127.0.0.1:8000/api/trade/", {
            instigatorUsername: this.props.currentUsername,
            instigatorProductID: this.state.value,
            recieverUsername: this.props.itemWantedUserID,
            recieverProductID: this.props.itemWantedId,
        }).then(res => { }).catch(error => console.error(error));
    }

    render() {

        const radioStyle = {
            display: 'block',
            height: '30px',
            lineHeight: '30px',
        };

        return (
            <div>
                {
                    this.props.token ?
                        <div>
                            <p>Please select one of youre items to trade below</p>
                            <Button  style={{ backgroundColor: '#00e27f', borderColor: '#00e27f' }}type="primary" htmlType="submit" class='submitButton' onClick={this.handleRequest}>
                                Submit Trade Request
                            </Button>
                        </div>
                        :
                        <p></p>
                }

                <br></br>
                <br></br>
                <List
                    itemLayout="vertical"
                    size="small"
                    pagination={{
                        onChange: page => {
                            console.log(page);
                        },
                        pageSize: 20,
                    }}
                    dataSource={this.state.articles}
                    renderItem={item => (
                        <div>
                            <Card>
                                <Radio.Group onChange={this.onChange} value={this.state.value}>


                                    <List.Item>
                                        <div class="mainlist">
                                            <div class="radiobutton">
                                                <Radio style={radioStyle} value={item.id} name={item.createdBy}>
                                                </Radio>
                                            </div>
                                            <img
                                                className="photo"
                                                src={item.image}
                                            />
                                            <div class="mainlisttext">
                                                <a class="mainlisttitle" href={`/articles/${item.id}`}>{item.title}</a>

                                                <p>{item.content}</p>

                                                <IconText icon={MessageOutlined} text={"Listed by: " + item.createdBy} key="list-vertical-message" />
                                            </div>
                                        </div >


                                    </List.Item>

                                </Radio.Group>
                            </Card>
                        </div>
                    )}
                />
                <br></br>
            </div>
        )
    }
}

//<ArticlesSmall data={this.state.articles} />
const mapStateToProps = state => {
    return {
        token: state.token,
        currentUsername: state.currentUsername
    }
}

export default withRouter(connect(mapStateToProps)(ArticleListSmall));