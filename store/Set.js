import {observable, action, computed} from 'mobx';

class MainStore {
  @observable Notif = true;
}

const Set = new MainStore();
export default Set;
