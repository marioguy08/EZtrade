import React, { Component } from 'react';
import './App.css';
import 'antd/dist/antd.css';
import CustomLayout from './containers/Layout';
import ArticleList from './containers/ArticleListView';
import BaseRouter from './routes';
import { BrowserRouter as Router } from 'react-router-dom';
import {connect} from 'react-redux'
import * as actions from './store/actions/auth'


class App extends Component {
componentDidMount(){
  this.props.onTryAutoSignup();
}

  render() {
    return (
      <div>
        <Router>
          <CustomLayout {...this.props}>
            
          </CustomLayout>
        </Router>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return{
    isAuthenticated: state.token !== null
  }
}

const mapDispatchtoProps = dispatch => {
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  }
}
export default connect(mapStateToProps,mapDispatchtoProps)(App);
