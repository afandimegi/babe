import {Dimensions} from 'react-native';
export default {
  container: {
    position: 'absolute',
    backgroundColor: 'white',
    width: '100%',
    height: Dimensions.get('window').height - 50,
    marginTop: 50,
    paddingTop: 20,
    zIndex: 0,
    elevation: 0
  },
  listItem: {
    flex: 1,
    height: 70,
    paddingVertical: 0
  },
  cardImage: {
    height: 70,
    width: 70,
    marginRight: 10
  },
  title: {
    fontSize: 14
  },
  media: {
    fontSize: 12
  }
}
