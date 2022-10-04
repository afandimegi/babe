import React from 'react';
import { View } from 'react-native';
import { Toolbar  } from 'react-native-material-ui';
import { observer }  from 'mobx-react';
import CategoryPage from './categorypage';
import Store from './../../store/Store';
import ScrollableTabView, { ScrollableTabBar, } from 'react-native-scrollable-tab-view';
import Meteor, { connectMeteor } from 'react-native-meteor';

@connectMeteor
@observer
export default class IndexNews extends React.Component {
  constructor(){
    super()
    this.state = {
      index: 0,
      otherComponent: 'show',
      keyword: null,
      tabsPage: [
        {name:'Populer', carousel: true},
        {name:'Terbaru', carousel: true},
        // {name:'Regional', carousel: false},
        // {name:'Artikel', carousel: false},
        {name:'News', carousel: true},
        {name:'Showbiz', carousel: true},
        {name:'Sports', carousel: true},
        {name:'Lifestyle', carousel: true},
        {name:'Intermezzo', carousel: true}
      ],
    }
  }

  getMeteorData() {
    return {
      news: Meteor.collection('news'),
    };
  }

  sendPropsToSearchPage(str) {
    let { news } = this.data;
    Store.NewsFound = news.find({title: {$regex : `.*${str}.*`, $options: 'i'}}, { limit: 30 })
  }

  render() {
    return (
      <View style={{flex: 1}}>
        <Toolbar
          centerElement="OWLnews"
          searchable={{
            autoFocus: true,
            placeholder: 'Search',
            onChangeText: (str) => {
              this.sendPropsToSearchPage(str)
            },
            onSearchPressed: () => {
              this.setState({otherComponent: 'hide'})
              Store.isSearchActive = true;
            },
            onSearchClosed: () => {
              this.setState({otherComponent: 'show'})
              Store.isSearchActive = false;
            }
          }}
          style={{container:  this.state.otherComponent == 'show'? {elevation: 0} : {borderBottomWidth: 2, borderBottomColor: 'lightgrey'}}}
        />
        <ScrollableTabView
          initialPage={0}
          tabBarUnderlineStyle={{backgroundColor: '#9C27B0', height: 2}}
          tabBarBackgroundColor={'white'}
          tabBarActiveTextColor={'#9C27B0'}
          tabBarInactiveTextColor={'rgba(0,0,0,.5)'}
          tabBarTextStyle={{height: 30}}
          renderTabBar={() => <ScrollableTabBar style={{justifyContent: 'center',height: 40, borderBottomWidth: 0, elevation: 4}} />}
        >
          {this.state.tabsPage.map((item, i)=>{
            return <CategoryPage key={i} tabLabel={item.name} store={item}/>
          })}
        </ScrollableTabView>
      </View>
    );
  }
}
