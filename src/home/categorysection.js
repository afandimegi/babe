import React from 'react';
import {View, Text} from 'react-native';
import LittleCard from './../components/cards/littlecard';
import css from './category.style'

export default class CategorySection extends React.Component {
  constructor(){
    super();
  }
  render() {
    let store = this.props.store
    return (
      <View style={css.container}>
        <Text style={css.title}>{store.title}</Text>
        <View style={css.itemContainer}>
          {store.data.map((e, i) => {
            return(
              <LittleCard
              key={i}
              title={e.title}
              media={e.media}
              link={e.link}
              illustration={e.image}/>
            )
          })}
        </View>
      </View>
    );
  }
}
