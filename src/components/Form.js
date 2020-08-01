import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import Axios from 'axios';
import { connect } from 'react-redux';

import Resizer from 'react-image-file-resizer';
import FormItem from 'antd/lib/form/FormItem';


class CustomForm extends React.Component {

    state = {
        image: null,
        selectedFile: null
    }

    handleFormSubmit = (event, requestType, articleID) => {



        event.preventDefault();
        const title = event.target.elements.title.value;
        const content = event.target.elements.content.value;

        var array = [...this.props.currentArticles];
        var newItem = {};
        newItem.title = title;
        newItem.content = content;
        newItem.image = this.state.image;
        newItem.createdBy = this.props.currentUsername;
        array.push(newItem);
        this.props.onAddProduct(array);
        Axios.defaults.headers = {
            "Content-Type": "application/json",
            Authorization: `Token ${this.props.token}`
        }
        switch (requestType) {
            case 'post':
                let city = "";
                Axios.defaults.headers = {
                    "Content-Type": "application/json",
                    Authorization: `Token ${this.props.token}`
                }
                Axios.get(`http://127.0.0.1:8000/api/users/?username=${this.props.currentUsername}`).then(res => {

                    const uploadData = new FormData();
                    uploadData.append('title', title);
                    uploadData.append('content', content);
                    uploadData.append('image', this.state.selectedFile, this.state.selectedFile.name);
                    uploadData.append('createdBy', this.props.currentUsername);
                    uploadData.append('city', res.data[0].city);
                    return Axios.post('http://127.0.0.1:8000/api/articles/', uploadData).then(res => { console.log(res); }).catch(error => console.error(error));

                })
 
        }
    }

    fileSelectedHandler = (event) => {
        this.setState({
            selectedFile: event.target.files[0]
        })
        let reader = new FileReader();
        reader.onload = (e) => {
            this.setState({ image: e.target.result });
        };
        reader.readAsDataURL(event.target.files[0]);
    }

    render() {
        return (
            <div>
                <Form onSubmitCapture={(event) => this.handleFormSubmit(event, this.props.requestType, this.props.articleID)}>
                    <Form.Item label="Name:">
                        <Input name="title" placeholder="Enter the name of you're item" />
                    </Form.Item>

                    <Form.Item label="Description:">
                        <Input.TextArea name="content" placeholder="Enter important information about youre item" />
                    </Form.Item>
                    <FormItem label="Photo:">
                        <input type="file" onChange={this.fileSelectedHandler}>
                        </input>
                    </FormItem>

                    <Form.Item >
                        <Button  type="primary" htmlType="submit">{this.props.btnText}</Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
};
const mapStateToProps = state => {
    return {
        token: state.token,
        currentUsername: state.currentUsername
    }
}
export default connect(mapStateToProps)(CustomForm);
