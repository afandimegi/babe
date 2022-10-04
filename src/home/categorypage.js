import React, { Component } from 'react';
import { Platform, View, ScrollView, Text, StatusBar, SafeAreaView, RefreshControl, ToastAndroid } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import { sliderWidth, itemWidth } from './../components/carousel/SliderEntry.style';
import SliderEntry from './../components/carousel/SliderEntry';
import styles, { colors } from './../components/carousel/index.style';
import { animatedStyles } from './../components/carousel/animations';
import CategorySection from './categorysection';
import HorizontalScroll from './horizontalscroll';
import yo from 'axios';
import Meteor, { connectMeteor } from 'react-native-meteor';
import { observer }  from 'mobx-react';
import Store from './../../store/Store';
import NetworkError from './../error/network';

const IS_ANDROID = Platform.OS === 'android';
const SLIDER_1_FIRST_ITEM = 1;

@connectMeteor
@observer
export default class CategoryPage extends Component {
  constructor(){
    super();
    this.state = {
      categorySection: [],
      dataCarousel: [],
      refreshing: false,
      error: false,
    }
  }

  // kalo mau initialisasi collection,
  // jangan lupa initialisasi juga di meteorjs web nya
  getMeteorData() {
    return {
      news: Meteor.collection('news'),
    };
  }

  checkNews(arrAPI) {
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1): new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let fullDate = date + '-' + month + '-' + year;

    let { news } = this.data;
    // let stat;
    for (var i in arrAPI) {
      // stat = arrDB.find(function (obj) { return obj.link == arrAPI[i].link })
      // if (stat == undefined) {
        arrAPI[i]._id = arrAPI[i].link
        arrAPI[i].like = []
        arrAPI[i].created_at = fullDate
        news.insert(arrAPI[i])
      // }
    }
  }

  checkNewsV2(arrAPI){
    let date = new Date().getDate();
    let month = new Date().getMonth() + 1 < 10 ? "0" + (new Date().getMonth() + 1): new Date().getMonth() + 1;
    let year = new Date().getFullYear();
    let fullDate = date + '-' + month + '-' + year;

    let { news } = this.data;
    let arrTemp = [];
    let stat;
    for (var x in arrAPI) {
      for (var i in arrAPI[x].data) {
        // stat = arrTemp.find(function (obj) { return obj.link == arrAPI[x].data[i].link })
        // if (stat == undefined) {
          arrAPI[x].data[i]._id = arrAPI[x].data[i].link
          arrAPI[x].data[i].like = []
          arrAPI[x].data[i].created_at = fullDate
          arrTemp.push(arrAPI[x].data[i])
        // }
      }
    }
    for (var j in arrTemp) {
      news.insert(arrTemp[j])
    }
  }

  _onRefresh() {
    this.setState({refreshing: true});
    let store = this.props.store;
    switch (store.name) {
      case 'Populer':
        this.getCarousel('populer')
        this.getPerSectionCategory('populer', ['news', 'showbiz', 'lifestyle', 'sports', 'intermezzo'])
        break;
      case 'Terbaru':
        this.getCarousel('terbaru')
        this.getPerSectionCategory('terbaru', ['news', 'showbiz', 'lifestyle', 'sports'])
        break;
      default: this.getCategoryData()
    }
  }

  _onError(msg) {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }

  _renderItem ({item, index}) {
    return (
      <SliderEntry
        data={item}
        even={(index + 1) % 2 === 0}
      />
    );
  }

  getCarousel(page) {
    let { news } = this.data;
    let url = null;
    switch (page) {
      case 'populer':
        url = '/linehome/Top10_News';
        break;
      case 'terbaru':
        url = '/linehome/Latest_Top';
        break;
    }
    yo.get(Store.Root.php()+url)
    .then((res)=>{
      this.setState({
        refreshing: false,
        error: false,
        dataCarousel: res.data
      })
      // let newsDB = news.find()
      this.checkNews(res.data)
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

  getCategoryData(){
    let { news } = this.data;
    let lowerName = this.props.store.name.toLowerCase()
    yo.get(Store.Root.python()+`/api/${lowerName}`)
    .then((res)=>{
      this.setState({
        refreshing: false,
        error: false,
        categorySection: res.data,
        dataCarousel: res.data[res.data.length-1].data.slice(0, 5)
      })
      // let newsDB = news.find()
      this.checkNewsV2(res.data)
    })
    .catch((e)=>{
      console.log(e)
      this.setState({
        refreshing: false,
        error: true
      })
    })
  }

  getPerSectionCategory(page, category){
    let { news } = this.data;
    let url = null;
    let str = null;

    if (page == 'populer') { url = '/linehome/Popular/'; str = 'TOP' }
    else if (page == 'terbaru') { url = '/linehome/Latest/'; str = 'Latest' }

    if (typeof category == 'object') {
      category.map((i_category) => {
        yo.get(Store.Root.php()+url+i_category)
        .then((res)=>{
          if (this.state.categorySection.length >= category.length) {
            this.setState({ categorySection: [] })
          }
          let newArr = this.state.categorySection
          newArr.push({
            title: `${str} `+i_category,
            data: res.data
          })
          this.setState({
            refreshing: false,
            error: false,
            categorySection: newArr
          })
          // let newsDB = news.find()
          this.checkNews(res.data)
        })
        .catch((e)=>{
          console.log(e)
          this.setState({
            refreshing: false,
            error: true
          })
        })
      })
    } else {
      console.log('not array');
    }
  }

  componentDidMount() {
    this._onRefresh()
  }

  render() {
    let store = this.props.store;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <ScrollView
            style={styles.scrollview}
            scrollEventThrottle={200}
            directionalLockEnabled={true}
            refreshControl={
                <RefreshControl
                  refreshing={this.state.refreshing}
                  onRefresh={this._onRefresh.bind(this)}
                  colors={["purple"]}
                />
            }
          >
            {this.state.error ?
              <NetworkError /> : (<View>
              {store.carousel == true ?
              <Carousel
                ref={c => this._slider1Ref = c}
                data={this.state.dataCarousel}
                renderItem={this._renderItem}
                sliderWidth={sliderWidth}
                itemWidth={itemWidth}
                firstItem={SLIDER_1_FIRST_ITEM}
                inactiveSlideScale={0.87}
                inactiveSlideOpacity={0.7}
                containerCustomStyle={styles.slider}
                contentContainerCustomStyle={styles.sliderContentContainer}
                loop={true}
                autoplay={true}
                autoplayDelay={3000}
                autoplayInterval={3000}
              /> : null}
              {/*store.name == 'Populer' ?
              <View>
                <HorizontalScroll store={this.state.populerArtikel} />
                <HorizontalScroll store={this.state.populerUser} />
              </View> : null*/}
              {
                this.state.categorySection.map((e,i)=>{
                  return (<CategorySection key={i} store={{title: e.title, data: e.data}} />)
                })
              }
            </View>)}
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
