import {Dimensions} from 'react-native';
const deviceHeight = Dimensions.get('window').height;

export default {
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  content: {
    margin: 15
  },
  backgroundImage: {
    height: 230,
    width: '100%'
  },
  judul: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  sumber: {
    fontSize: 15,
    color: 'grey',
    marginTop: 7
  },
  terbit: {
    fontSize: 15,
    color: 'grey',
  },
  isi: {
    // fontSize: 17,
    flex: 1,
    width: '100%',
    height: 'auto',
    // height: 2500,
    marginVertical: 20
  }
}
