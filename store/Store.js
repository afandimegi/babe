import {observable, action, computed} from 'mobx';
import config from './../config.realm';
import Realm from 'realm';

class MainStore {
  @observable ToolbarShadow = false;
  @observable isSearchActive = false;
  @observable NewsFound = [];
  @observable Route = null;
  @observable DetailLink = null;
  @observable Root = {
    main: '//192.168.1.15',
    php: function() { return 'http:'+this.main+':8000' },
    python: function() { return 'http:'+this.main+':9000' },
    nodejs: function() { return 'ws:'+this.main+':3000' }
  };
  @observable Users = {};

  @action setToolbar(shadow, route) {
    this.ToolbarShadow = shadow;
    this.Route = route;
  }

  @action connectToRealm() {
    Realm.open(config).then(realm => {
      realm.write(() => {
        // init realm if undefined
        if (realm.objects('Users')[0] == undefined) {
          realm.create('Users', {
            id: '',
            name: '',
            email: '',
            image: 'profile',
            loginWith: ''
          })
        }
        this.Users = realm.objects('Users')[0];
      });
    })
  }

  //id, name, email, image, loginWith
  @action updateUser(arg) {
    Realm.open(config).then(realm => {
      realm.write(() => {
        this.Users.id = arg.id;
        this.Users.name = arg.name;
        this.Users.email = arg.email;
        this.Users.image = arg.image;
        this.Users.loginWith = arg.loginWith;
      });
      this.Users = realm.objects('Users')[0];
    })
  }

  @action resetUser() {
    Realm.open(config).then(realm => {
      realm.write(() => {
        this.Users.id = '';
        this.Users.name = '';
        this.Users.email = '';
        this.Users.image = 'profile';
        this.Users.loginWith = '';
      });
      this.Users = realm.objects('Users')[0];
    })
  }

}

const store = new MainStore();
export default store;
