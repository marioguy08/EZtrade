import React from 'react'
import { Route } from 'react-router-dom';
import ArticleList from './containers/ArticleListView';
import ArticleDetail from './containers/ArticleDetailView'
import Login from './containers/Login'
import Signup from './containers/Signup';
import Profile from './containers/Profile'

const BaseRouter = (props) => (
    
    <div>
        <Route exact path='/' render={(routeProps) => <ArticleList {...props} {...routeProps} />} />
        <Route exact path='/articles/:articleID' component={ArticleDetail} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={Signup} />
        <Route exact path='/userprofile/' component ={Profile}/>
    </div>
);

export default BaseRouter