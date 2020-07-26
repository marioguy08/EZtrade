import { Layout, Menu, Input, Button, AutoComplete } from 'antd';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';
import CustomForm from '../components/Form';
import BaseRouter from '../routes';
import Logo from '../eztradelogo.png'
import { options } from './cities'

const { Header, Content, Footer } = Layout;


const { Search } = Input;

class CustomLayout extends React.Component {
    state = {
        searchterm: "",
        city: ""
    }

    updateChild() {
        //window.location.reload()
    }
    handlerequest(searchterm) {
        this.setState({ searchterm: searchterm })
        this.props.history.push("/");
    }
    handlecity(val) {
        this.setState({
            city: val
        })
    }
    handlecity2(val) {

        if (val == null) {
            this.setState({
                city: ""
            })
        }
    }
    render() {
        return (
            <Layout className="layout">

                <Header>
                    <div className="menutop">

                        <a href="/"><img className="logo" src={Logo} /></a>
                        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['1']}>

                        </Menu>



                        <div className="loginprofilebuttons" >


                            {
                                this.props.isAuthenticated ?

                                    <div className="navbuttons">
                                        <div className="profilebutton">
                                            <Button style={{ fontSize: '1.3rem', height: '3.2rem', bottom: '.2rem' }}><Link to="/userprofile" className="link">{"Hi, " + this.props.currentUsername}</Link></Button>
                                        </div>
                                        <div className="loginbutton">
                                            <Button style={{ fontSize: '1.3rem', height: '3.2rem', bottom: '.2rem' }} onClick={() => {
                                                this.props.logout();
                                                window.location.reload();
                                                this.updateChild();
                                            }}>Logout</Button>
                                        </div>
                                    </div>
                                    :
                                    <Button style={{ fontSize: '1.3rem', height: '3.2rem', top: '.2rem' }}><Link to="/login">Login</Link></Button>
                            }
                        </div>
                    </div>

                </Header>

                <Content style={{ padding: '0 50px' }}>
                    <div className="filterandsearch">
                        <div id="cityselector" className="cityfilter">
                            <AutoComplete
                                allowClear="true"
                                spellcheck="false"
                                onSelect={(val) => { this.handlecity(val) }}
                                onChange={(val) => { this.handlecity2(val) }}
                                defaultOpen={false}
                                style={{ width: 140 }}
                                options={options}
                                placeholder="Filter By City (US)"
                                filterOption={(inputValue, option) =>
                                    option.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1
                                }

                            />
                        </div>
                        <div className="searchbar">
                            <Search placeholder="Search EZtrade" onSearch={value => { this.handlerequest(value) }} enterButton />
                        </div>

                    </div>
                   
                    <div className="site-layout-content">
                        <BaseRouter searchterm={this.state.searchterm} />
                    </div>
                </Content>
                <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
        );

    }

}

const mapDispatchtoProps = dispatch => {
    return {
        logout: () => dispatch(actions.logout())
    }
}
const mapStateToProps = state => {
    return {
        token: state.token,
        currentUsername: state.currentUsername
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchtoProps)(CustomLayout));


