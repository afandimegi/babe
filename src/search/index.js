import React from 'react';
import {TouchableWithoutFeedback, TouchableOpacity, Image} from 'react-native';
import { Text, View, StatusBar, ScrollView } from 'react-native';
import { observer }  from 'mobx-react';
import * as Animatable from 'react-native-animatable';
import Store from './../../store/Store';
import { COLOR, ThemeProvider, Toolbar, ListItem } from 'react-native-material-ui';
import css from './index.style';

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

@observer
export default class Search extends React.Component {
  render(){
    return(
      <ThemeProvider uiTheme={uiTheme}>
        <ScrollView style={css.container}>
          <Animatable.View animation="fadeInDown" duration={500} direction="alternate">
            {Store.NewsFound.map((item, i) => {
              return(
                <ListItem
                  key={i}
                  divider
                  style={{
                    container: [css.listItem, i == (Store.NewsFound.length-1) ? {marginBottom: 60} : null],
                    primaryText: css.title,
                    secondaryText: css.media,
                    leftElementContainer: css.cardImage
                  }}
                  centerElement={{
                    primaryText: item.title,
                    secondaryText: item.media
                  }}
                  leftElement={<Image
                    resizeMode="cover"
                    source={{uri: item.image}}
                    style={css.cardImage}/>}
                  onPress={() => {
                    Store.Route.navigate('DetailNews')
                    Store.DetailLink = item.link
                  }}
                />
              )
            })}
          </Animatable.View>
        </ScrollView>
      </ThemeProvider>
    )
  }
}
