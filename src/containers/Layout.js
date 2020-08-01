import { Layout, Menu, Input, Button, AutoComplete } from 'antd';
import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux'
import * as actions from '../store/actions/auth';
import CustomForm from '../components/Form';
import BaseRouter from '../routes';
import Logo from '../eztradelogo.png'
import Logo2 from '../test2.png'
import { options } from './cities'
import axios from 'axios';
import Burger from '@animated-burgers/burger-squeeze'
import HamburgerMenu from 'react-hamburger-menu'
// don't forget the stylesnpm i react-hamburger-menu
import '@animated-burgers/burger-squeeze/dist/styles.css'
import './Layout.css';

const { Header, Content, Footer } = Layout;


const { Search } = Input;

class CustomLayout extends React.Component {
    state = {
        searchterm: "",
        city: "",
        innerWidth: window.innerWidth,
        open: false

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
        if (val == null || val == "") {
            this.setState({
                city: ""
            })
        }
    }
    handleresize = () => {
        console.log(window.innerWidth);
        this.setState({
            innerWidth: window.innerWidth
        })
    }
    componentDidMount() {
        window.addEventListener("resize", this.handleresize);
    }
    handleClick() {
        this.setState({
            open: !this.state.open
        });

    }
    render() {
        return (
            <Layout className="layout">

                <div className="mainheader">
                    <div className="menutop">


                        <a href="/"><img className="logo" src={Logo2} /></a>

                        <div className="filterandsearch">
                            <div id="cityselector" className="cityfilter">
                                <AutoComplete
                                    allowClear="true"
                                    spellcheck="false"
                                    onSelect={(val) => { this.handlecity(val) }}
                                    onChange={(val) => { this.handlecity2(val) }}
                                    defaultOpen={false}
                                    style={{ width: 130 }}
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

                        {
                            this.state.innerWidth > 800 ?
                                <div className="loginprofilebuttons" >
                                    {
                                        this.props.isAuthenticated ?

                                            <div className="navbuttons">
                                                <div className="profilebutton">
                                                    <Button className="profilefinal" style={{ fontSize: '1.3rem', height: '3.2rem', bottom: '.2rem' }}><Link to="/userprofile" className="link">{"Hi, " + this.props.currentUsername}</Link></Button>
                                                </div>
                                                <div className="loginbutton">
                                                    <Button className="logoutfinal" style={{ fontSize: '1.3rem', height: '3.2rem', bottom: '.2rem' }} onClick={() => {
                                                        this.props.logout();
                                                        axios.defaults.headers = {
                                                            "Content-Type": "application/json",
                                                            Authorization: `Token ${this.props.token}`
                                                        }
                                                        axios.post('https://eztrade.herokuapp.com/rest-auth/logout/').then(res => { console.log(res); }).catch(error => console.error(error));
                                                    }}>Logout</Button>
                                                </div>
                                            </div>
                                            :
                                            <div>
                                                <Button className="loginfinal" style={{ fontSize: '1.3rem', height: '3.2rem', top: '.2rem' }}><Link to="/login">Login</Link></Button>
                                            </div>
                                    }
                                </div>
                                :
                                <div className="hamburger">
                                    <HamburgerMenu
                                        isOpen={this.state.open}
                                        menuClicked={this.handleClick.bind(this)}
                                        width={25}
                                        height={20}
                                        strokeWidth={3}
                                        rotate={0}
                                        color='white'
                                        borderRadius={0}
                                        animationDuration={0.5}
                                    />

                                </div>
                        }

                    </div>

                </div>
                <div className="holder">
                    <div className={`sidebar ${this.state.open ? '' : 'show'}`}>
                        {
                            this.props.isAuthenticated ?
                                <div className="hamnavbuttons">
                                    <div className="hamprofilebutton">
                                        <Button className="hamprofactual" ghost onClick={this.handleClick.bind(this)} style={{ fontSize: '1.3rem', height: '3.2rem', bottom: '.2rem' }}><Link to="/userprofile" className="link">{"Hi, " + this.props.currentUsername}</Link></Button>
                                    </div>
                                    <div className="hamloginbutton">
                                        <Button className="hamlogoutactual" ghost onClick={this.handleClick.bind(this)} style={{ fontSize: '1.3rem', height: '3.2rem', bottom: '.2rem' }} onClick={() => {
                                            this.props.logout();
                                            window.location.reload();
                                        }}>Logout</Button>
                                    </div>
                                </div>
                                :
                                <div classname="buttonholder">
                                    <Button ghost className="hambutton" onClick={this.handleClick.bind(this)} style={{ fontSize: '1.3rem', height: '3.2rem', bottom: '.2rem' }}><Link to="/login">Login</Link></Button>
                                </div>
                        }

                    </div>
                </div>
                <Content style={{ padding: '0 50px' }}>
                    <div className="site-layout-content">
                        <BaseRouter searchterm={this.state.searchterm} city={this.state.city} />
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


