import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import css from './cards.style';
import Ripple from 'react-native-material-ripple';
import Store from './../../../store/Store';
import Method from './../../../store/Method';
import { observer }  from 'mobx-react';

@observer
export default class LittleCard extends React.Component {
  detailClicked(index){
    Store.DetailIndex = index;
    // Store.DetailContent = this.state.berita[index]
  }
  render() {
    return (
      <View style={[
        this.props.scroll
        ? css.containerScroll
        : css.container,
        this.props.index == this.props.len-1
        ? {marginRight: 29}
        : null
      ]}>
        <TouchableOpacity
          style={css.item}
          onPress={() => {
            Store.Route.navigate('DetailNews', {link: this.props.link, title: this.props.title})
            Store.DetailLink = this.props.link
          }}>
          <Image
            resizeMode="cover"
            style={[css.illustration, this.props.scroll ? {height: 100}: {height: 120} ]}
            source={{uri: this.props.illustration}}
          />
          <View style={css.containerTitle}>
            <Text style={css.title}>{this.props.title}</Text>
          </View>
          <Text style={css.media}>{this.props.media}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
