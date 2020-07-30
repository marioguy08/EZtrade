import React from 'react';
import { Card } from 'antd';
import { connect } from 'react-redux';
import RequestList from '../components/TradeRequests';
import CompletedList from '../components/CompletedTrades';
import ListedProducts from '../components/listedProducts';

const tabList = [
  {
    key: 'Products',
    tab: 'Listed products',
  },
  //{ TODO
   // key: 'PendingTradesOutgoing',
   // tab: 'Outgoing Trade Requests',
  //},
  {
    key: 'PendingTrades',
    tab: 'Incoming Trade Offers',
  },
  {
    key: 'CompletedTrades',
    tab: 'Completed Trades',
  },

];

const contentList = {
  Products: <p><ListedProducts></ListedProducts></p>,
  PendingTrades: <p><RequestList></RequestList></p>,
  CompletedTrades: <p><CompletedList></CompletedList></p>,
};

const tabListNoTitle = [
  {
    key: 'article',
    tab: 'article',
  },
  {
    key: 'app',
    tab: 'app',
  },
  {
    key: 'project',
    tab: 'project',
  },
];

const contentListNoTitle = {
  article: <p>article content</p>,
  app: <p>app content</p>,
  project: <p>project content</p>,
};

class Profile extends React.Component {
  state = {
    key: 'Products',
    noTitleKey: 'app',
  };

  onTabChange = (key, type) => {
    console.log(key, type);
    this.setState({ [type]: key });
  };

  render() {
    var words = "Welcome ";
    const username = this.props.currentUsername;
    {
      this.props.token ?
        words = "Profile"
        :
        words = "Please log in to view you're profile"
    }
    return (
      <>

        <Card
          style={{ width: '100%' }}
          title={words}
          extra={<a href="#">More</a>}
          tabList={tabList}
          activeTabKey={this.state.key}
          onTabChange={key => {
            this.onTabChange(key, 'key');
          }}
        >
          {contentList[this.state.key]}
        </Card>
        <br />
        <br />

      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    token: state.token,
    currentUsername: state.currentUsername
  }
}

export default connect(mapStateToProps)(Profile);