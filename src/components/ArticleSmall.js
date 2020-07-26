import React from 'react'
import { List, Avatar, Space, Card, Checkbox } from 'antd';
import { MessageOutlined, LikeOutlined, StarOutlined } from '@ant-design/icons';



const IconText = ({ icon, text }) => (
    <Space>
        {React.createElement(icon)}
        {text}
    </Space>
);

const ArticleSmall = (props) => {
    function onChange(e) {
        console.log(`checked = ${e.target.checked}`);
    }
    return (

        

        <List
            itemLayout="vertical"
            size="small"
            pagination={{
                onChange: page => {
                    console.log(page);
                },
                pageSize: 20,
            }}
            dataSource={props.data}

            renderItem={item => (
                <List.Item
                    //style={{textAlign: 'left'}}
                    key={item.title}
                    actions={[
                        <IconText icon={MessageOutlined} text={"Listed by: " + item.createdBy} key="list-vertical-message" />,
                        <IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,

                    ]}
                    extra={
                        <img
                            width={272}
                            alt="logo"
                            className="photo"
                            //src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            src={item.image}
                        />
                    }
                >
                    <List.Item.Meta

                        //avatar={<Avatar src={item.avatar} />}
                        title={<a href={`/articles/${item.id}`}>{item.title}</a>}
                        description={item.description}
                    />
                    <Checkbox onChange={onChange}></Checkbox>
                    {item.content}
                </List.Item>
            )}
        />


    )
}

export default ArticleSmall;


/*
        <List
            grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
            }}
            dataSource={props.data}
            renderItem={item => (
                <List.Item>
                    <Card title={<a href={`/articles/${item.id}`}>{item.title}</a>}>{item.content}
                    <img
                            width={272}
                            alt="logo"
                            position = "right"
                            className = "photo"
                            //src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
                            src={item.image}
                        />
                    </Card>
                </List.Item>
            )}
        />
        */