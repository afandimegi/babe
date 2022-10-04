import React from 'react';
import {
  Text,
  View,
  Image,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  ToastAndroid,
  BackHandler,
  Share,
  WebView
} from 'react-native';
import { observer }  from 'mobx-react';
import css from './index.style';
import { COLOR, ThemeProvider, Toolbar, Button } from 'react-native-material-ui';
import Store from './../../store/Store';
import Method from './../../store/Method';
import Meteor, { connectMeteor } from 'react-native-meteor';
import yo from 'axios';
import NetworkError from './../error/network';
import WebViewAutoHeight from './../components/webview/WebViewAutoHeight'

const uiTheme = {
    palette: {
        primaryColor: COLOR.purple500,
    },
    toolbar: {
        container: {
            height: 50,
        },
    },
};

@connectMeteor
@observer
export default class DetailNews extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      news: {},
      dbnews: {
        like: []
      },
      isLike: false,
      refreshing: false,
      error: false
    }
  }

  // kalo mau initialisasi collection,
  // jangan lupa initialisasi juga di meteorjs web nya
  getMeteorData() {
    return {
      news: Meteor.collection('news'),
    };
  }

  _onError(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  _onRefresh() {
    this.setState({refreshing: true});
    yo.get(Store.Root.php()+'/linehome/article?link='+Store.DetailLink)
    .then((res)=>{
      this.setState({
        refreshing: false,
        error: false,
        news: res.data
      })
    })
    .catch((e)=>{
      console.log(e)
      this._onError('koneksi bermasalah')
      this.setState({
        refreshing: false,
        error: true
      })
    })
  }

  likeArticle(id) {
    let { news } = this.data;
    let dbnews = news.find(Store.DetailLink)
    if (!dbnews[0].like.includes(Store.Users.id)) {
      this.setState({isLike: true})
      ToastAndroid.show('Anda menyukai artikel ini', ToastAndroid.SHORT);
      news.update(id, {
        $push: {"like" : Store.Users.id}
      }) //{$set: {"like" : "offline"}}
    } else {
      this.setState({isLike: false})
      ToastAndroid.show('Anda batal menyukai artikel ini', ToastAndroid.SHORT);
      news.update(id, {
        $pull: {"like" : Store.Users.id}
      })
    }
  }

  shareArticle() {
    Share.share({
      message: this.props.navigation.getParam('link'),
      url: this.props.navigation.getParam('link'),
      title: this.props.navigation.getParam('title')
    }, {
      dialogTitle: this.props.navigation.getParam('title'),
      excludedActivityTypes: [
        'com.apple.UIKit.activity.PostToTwitter'
      ]
    })
  }

  componentDidMount() {
    let { news } = this.data;
    let dbnews = news.find(Store.DetailLink)
    if (dbnews[0].like.includes(Store.Users.id)) {
      this.setState({isLike: true})
    } else {
      this.setState({isLike: false})
    }
    this.setState({dbnews: dbnews[0]})
    this._onRefresh()
  }

  render(){
    let { news } = this.data;
    let dbnews = news.find(Store.DetailLink)
    return(
      <ThemeProvider uiTheme={uiTheme}>
        <View style={css.container}>
          <Toolbar
            leftElement="arrow-back"
            onLeftElementPress={() => this.props.navigation.goBack()}
            centerElement="detail berita"
            rightElement="share"
            onRightElementPress={this.shareArticle.bind(this)}
            style={{container: {backgroundColor: '#9C27B0', elevation: 8}}}
          />
          <ScrollView
            style={css.main}
            refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  colors={["purple"]}
                />
            }>
            {this.state.error ? (
              <NetworkError />
            ):(
              <View>
                <Image
                  resizeMode="cover"
                  style={css.backgroundImage}
                  source={{uri: this.state.news.img}}
                />
                <View style={css.content}>
                  <Text style={css.judul}>{this.state.news.title}</Text>
                  <Text style={css.sumber}>{this.state.news.media} {this.state.news.author != null ? '|' : null} {this.state.news.author}</Text>
                  <Text style={css.terbit}>{this.state.news.published}</Text>
                  {this.state.news.content != null ? (
                    <WebViewAutoHeight
                      javaScriptEnabled
                      source={{html: Method.detailContainer(this.state.news.content)}}
                      style={css.isi}
                    />) : null
                  }
                </View>
                {this.state.news.content != null ? (
                <View>
                  <Button 
                  primary
                  style={{container:{marginBottom: 30}}}
                  icon={this.state.isLike ? 'favorite' : 'favorite-border'}
                  onPress={this.likeArticle.bind(this, Store.DetailLink)} 
                  text={"like "+dbnews[0].like.length} />
                </View>) : null }
              </View>
            )}
          </ScrollView>
        </View>
      </ThemeProvider>
    )
  }
}
