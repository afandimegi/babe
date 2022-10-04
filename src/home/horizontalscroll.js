import React from 'react';
import {View, Text, ScrollView} from 'react-native';
import LittleCard from './../components/cards/littlecard';
import css from './category.style'

export default class HorizontalScroll extends React.Component {
  constructor(){
    super();
  }
  render() {
    let store = this.props.store
    return (
      <View style={css.container}>
        <Text style={css.title}>{store.title}</Text>
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={css.itemContainerScroll}>
          {store.data.map((e, i) => {
            return(
              <LittleCard
                key={i}
                index={i}
                len={store.data.length}
                scroll={true}
                title={e.title}
                illustration={e.image}/>
            )
          })}
        </ScrollView>
      </View>
    );
  }
}
