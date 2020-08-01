import React from 'react'
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { Button, Card, Avatar } from 'antd'
import CustomForm from '../components/Form';
import ArticleListSmall from './ArticleListSmallView'
import { List, Space } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Redirect } from 'react-router-dom';
const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
class ArticleDetail extends React.Component {

    state = {
        article: {},
        alreadyTraded: false,
        isUsersItem: false
    }
    componentDidMount() {
        const articleID = this.props.match.params.articleID;
        axios.get(`https://eztrade.herokuapp.com/api/articles/${articleID}/`)
            .then(res => {
                if (this.props.currentUsername == res.data.createdBy) {
                    this.setState({
                        isUsersItem: true
                    });
                }
                this.setState({
                    article: res.data
                });
                axios.get(`https://eztrade.herokuapp.com/api/trade/?instigatorUsername=${this.props.currentUsername}&recieverProductID=${articleID}`)
                    .then(res => {
                        if (res.data.length > 0) {
                            this.setState({
                                alreadyTraded: true
                            })
                        }
                    })

            })





        //add check to see if the item already has a trade request from current user

    }
    componentWillReceiveProps(newProps) {

    }





    handleDelete = (event) => {
        if (this.props.token !== null) {
            event.preventDefault();
            const articleID = this.props.match.params.articleID;
            axios.defaults.headers = {
                "Content-Type": "application/json",
                Authorization: `Token ${this.props.token}`
            }
            axios.delete(`https://eztrade.herokuapp.com/api/articles/${articleID}/`).then(res => {}).catch(error => console.error(error));
        } else {
        }
    }
    render() {
        const { Meta } = Card;
        return (
            <div>
                <Card title={this.state.article.title}>
                    <div class="mainlist">
                        <img
                            className="photo"
                            src={this.state.article.image}
                        />
                        <br></br>
                        <div class="mainlisttext">
                            <p class="preventtextoverflow">{this.state.article.content}</p>

                            <IconText icon={MessageOutlined} text={"Listed by: " + this.state.article.createdBy} key="list-vertical-message" />
                        </div>
                    </div >
                </Card>
                <br></br>
                {
                    this.state.isUsersItem ?
                        <div>
                            {
                                this.state.article.traded ?
                                    <p>You have traded this item</p>
                                    :
                                    <p></p>
                            }

                            <form onSubmitCapture={this.handleDelete}>
                                <Button style={{ backgroundColor: '#fa1212', borderColor: '#fa1212' }} type="danger" htmlType="submit">Delete (all data related to this listing will be gone forever)</Button>

                            </form>
                        </div>
                        :
                        <div>
                            {
                                this.props.currentUsername ?
                                    <div>
                                        {
                                            this.state.article.traded ?
                                                <p>This item has already been traded</p>
                                                :
                                                <div>
                                                    {
                                                        this.state.alreadyTraded ?
                                                            <p>You have already made an offer for this product</p>
                                                            :
                                                            <p><ArticleListSmall itemWantedId={this.props.match.params.articleID} itemWantedUserID={this.state.article.createdBy} /></p>
                                                    }
                                                </div>
                                        }
                                    </div>
                                    :
                                    <div>Please log in to make a trade</div>
                            }
                        </div>
                }
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
export default withRouter(connect(mapStateToProps)(ArticleDetail));

//<CustomForm requestType="put" articleID={this.props.match.params.articleID} btnText="Update"></CustomForm>