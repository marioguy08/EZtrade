
import React, { useState } from 'react';
import {
    Form,
    Input,
    Tooltip,
    Cascader,
    Select,
    Row,
    Col,
    Card,
    Button,

} from 'antd';
import { MailOutlined, UserOutlined, LockOutlined } from '@ant-design/icons';
import * as actions from '../store/actions/auth';
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { options } from './cities'
import { AutoComplete } from 'antd';




const RegistrationForm = (props) => {
    const [form] = Form.useForm();

    const onFinish = values => {
        props.onAuth(values.username, values.email, values.password, values.confirm,values.inputValue)
        console.log('Received values of form: ', values);
        props.history.push('/');
    };


    return (
        <div className='signupform'>
            <Card>
                <Form

                    form={form}
                    name="register"
                    onFinish={onFinish}
                    initialValues={{
                        residence: ['zhejiang', 'hangzhou', 'xihu'],
                        prefix: '86',
                    }}
                    scrollToFirstError
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
                    </Form.Item>

                    <Form.Item
                        name="email"
                        
                        //label="E-mail"
                        rules={[
                            {
                                type: 'email',
                                message: 'The input is not valid E-mail!',
                            },
                            {
                                required: true,
                                message: 'Please input your E-mail!',
                            },
                        ]}
                    >
                        <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        //label="Password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                        ]}
                        hasFeedback
                    >
                        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Enter password" />
                    </Form.Item>

                    <Form.Item
                        name="confirm"

                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Enter password again" />
                    </Form.Item>
                    <div className = 'cityselector'>
                    <AutoComplete
                        defaultOpen = {false}
                        style={{ width: 177 }}
                        options={options}
                        placeholder="C I T Y"
                        filterOption={(inputValue, option) =>
                            option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                        }
                        
                    />
                   
                    </div>
                        <br></br>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>Signup</Button>Or<NavLink style={{ marginRight: '10px', color: 'white' }} to='/login/'> login</NavLink>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

const mapStatetoProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchtoProps = dispatch => {
    return {
        onAuth: (username, email, password1, password2,city) => dispatch(actions.authsignup(username, email, password1, password2,city))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(RegistrationForm);