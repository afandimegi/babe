import { Dimensions } from 'react-native';
const marginContainer = 15
export default {
  container: {
    width: (Dimensions.get('window').width - (marginContainer*2)) / 2,
    paddingHorizontal: 6,
    marginBottom: 15,
  },
  containerScroll: {
    width: 130,
    paddingHorizontal: 6,
    marginBottom: 3.5,
  },
  item: {
    backgroundColor: 'white',
    elevation: 2,
    borderRadius: 4,
  },
  containerTitle: {
    height: 57,
    backgroundColor: 'white',
    flex: 1
  },
  title: {
    paddingVertical: 6,
    paddingHorizontal: 9,
    fontSize: 12
  },
  media: {
    paddingBottom: 6,
    paddingTop: 3,
    opacity: 0.5,
    paddingHorizontal: 9,
    fontSize: 12
  },
  illustration: {
    width: '100%',
    borderTopRightRadius: 4,
    borderTopLeftRadius: 4
  }
}
