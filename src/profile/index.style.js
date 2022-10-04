export default {
  container: {
    flex: 1
  },
  backgroundImage: {
    height: 200,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  photoProfileContainer:{
    height: 250,
    position: 'absolute',
    top: 0,
    left: 15,
    right: 0,
    elevation: 4,
  },
  photoCircle: {
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    position: 'absolute',
    top: 135,
    backgroundColor: 'white',
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 100
  },
  generalContainer: {
    marginHorizontal: 0,
    backgroundColor: 'white',
    paddingTop: 0,
    paddingBottom: 20,
    marginTop: 170,
    elevation: 3,
  },
  name: {
    fontSize: 20,
    marginLeft: 115,
  },
  email: {
    fontSize: 10,
    color: 'grey',
    marginLeft: 115,
  },
  bio: {
    paddingHorizontal: 20,
    paddingVertical: 30,
    fontSize: 13,
    color: 'grey'
  },
  subGeneralContainer: {
    marginHorizontal: 0,
    marginVertical: 15,
    backgroundColor: 'white',
    padding: 20,
    paddingBottom: 0,
    elevation: 3,
  },
  containerStat: {
    width: '100%',
    alignItems: "center"
  },
  containerSubStat:{
    flexDirection: 'row',
    width: '100%'
  },
  subStat: {
    alignItems: 'center',
    width: '33.33%'
  },
  numberStat: {
    fontWeight: 'bold',
    fontSize: 20
  },
  textStat: {
    fontSize: 12
  },
  webContainer: {
    height: 50,
    overflow: 'hidden',
  },
  isi: {
    flex: 1,
    width: 400,
    height: 100,
    overflow: 'hidden',
    marginTop: 20
  }
}
