import React from 'react';
import { connect } from 'react-redux'
import { Form, Input, Button, Spin, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { NavLink } from 'react-router-dom'
import * as actions from '../store/actions/auth';

import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;



const NormalLoginForm = (props) => {
    const onFinish = values => {
        localStorage.setItem('currentUsername', values.username);
        props.onAuth(values.username, values.password)
        console.log('Received values of form: ', values);

    };


    let errorMessage = null;
    if (props.error) {
        errorMessage = (
            <p>Wrong username or password</p>
        );
    }

    return (
        <div>
            {errorMessage}
            {
                props.loading ?

                    <Spin indicator={antIcon} />

                    :
                    <div className = "loginformall">
                        <Card>
                            <Form
                                name="normal_login"
                                className="login-form"
                                initialValues={{
                                    remember: true,
                                }}
                                onFinish={onFinish}
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
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your Password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        prefix={<LockOutlined className="site-form-item-icon" />}
                                        type="password"
                                        placeholder="Password"
                                    />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" style={{ marginRight: '10px' }}>Login</Button>Or<NavLink style={{ marginRight: '10px',color: 'white' }} to='/signup/'> signup</NavLink>
                                </Form.Item>
                            </Form>
                        </Card>
                    </div>
            }
        </div>
    );
};

const mapStatetoProps = (state) => {
    return {
        loading: state.loading,
        error: state.error
    }
}

const mapDispatchtoProps = (dispatch, props) => {
    return {
        onAuth: (username, password) => dispatch(actions.authLogin(username, password, props))
    }
}
export default connect(mapStatetoProps, mapDispatchtoProps)(NormalLoginForm);
//export default Login