import React from 'react'
import { List, Avatar, Space, Card } from 'antd';
import { MessageOutlined, HomeOutlined, StarOutlined } from '@ant-design/icons';



const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);
const Article = (props) => {
    return (

        <List
            itemLayout="vertical"
            size="small"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 15,
            }}
            dataSource={props.data}
            renderItem={item => (

                <List.Item>
                    <div class="mainlist">
                        <br></br>
                        <img
                            className="photo"
                            src={item.image}
                        />
                        <div class="mainlisttext">
                            <a class="mainlisttitle" href={`/articles/${item.id}`}>{item.title}</a>

                            <p class="preventtextoverflow" >{
                                item.content.length > 180 ?
                                    item.content.slice(0, 180) + "..."
                                    :
                                    item.content.slice(0, 180)
                            }</p>
                            <div className="listedbyandcity">
                                <div className = "listedby">
                                    <IconText icon={MessageOutlined} text={"" + item.createdBy} key="list-vertical-message" />
                                </div>
                                <IconText icon={HomeOutlined} text={"" + item.city} key="list-vertical-city" />
                            </div>

                        </div>
                    </div >
                </List.Item >

            )}
        />
    )
}

export default Article;