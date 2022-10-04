import React from 'react';
import { Text, View, Alert, ToastAndroid, BackHandler, Keyboard } from 'react-native';
import { observer }  from 'mobx-react';
import { RichTextEditor, RichTextToolbar } from 'react-native-zss-rich-text-editor';
import Store from './../../store/Store';
import { Toolbar  } from 'react-native-material-ui';
import Meteor, { connectMeteor, Random } from 'react-native-meteor';
import css from './index.style';

@connectMeteor
@observer
export default class NewArticle extends React.Component {
  constructor(){
    super();
    this.getHTML = this.getHTML.bind(this);
    this.setFocusHandlers = this.setFocusHandlers.bind(this);
    this.state = {
      title: '',
      content: '',
    }
  }
  getMeteorData() {
    this.getHTML();
    return {
      articles: Meteor.collection('articles'),
    };
  }
  insertArticle(status) {
    const { articles } = this.data;
    let id = Math.floor((Math.random() * 10000000000000000) + 1)+'';
    articles.insert({
      '_id': id,
      "uid": Store.Users.id,
      "image": '',
      "status": status,
      "title": this.state.title,
      "content": this.state.content,
      "like": [],
      "created_at": '14-07-2018'
    })
    this.setState({
      "title": '',
      "content": '',
    })
  }
  
  postConfirm() {
    this.getHTML();
    if (this.state.title != '' && this.state.content != '') {
      Alert.alert(
        'Konfirmasi Publikasi',
        'Anda ingin mempublikasikan artikel ini?',
        [
          {text: 'Batal', onPress: () => {
          }},
          {text: 'Ya', onPress: () => {
            this.insertArticle('online');
            ToastAndroid.show('Artikel berhasil dipublikasikan', ToastAndroid.SHORT);
            this.props.navigation.navigate('Beranda')
          }},
        ]
      )
    } else {
      alert('Judul dan konten tidak boleh kosong!!')
    }
  }
  
  onEditorInitialized() {
    this.setFocusHandlers();
    this.getHTML();
  }

  async getHTML() {
    const titleHtml = await this.richtext.getTitleHtml();
    const contentHtml = await this.richtext.getContentHtml();
    this.setState({title: titleHtml, content: contentHtml});
  }

  setFocusHandlers() {
    this.richtext.setTitleFocusHandler(() => {
      // alert('title focus');
    });
    this.richtext.setContentFocusHandler(() => {
      // alert('content focus');
    });
  }

  componentDidMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this._keyboardDidShow);
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this._keyboardDidHide);
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  _keyboardDidShow () {
    // alert('open')
  }

  _keyboardDidHide () {
    // alert('hide')
  }

  handleOnClose() {
    Alert.alert(
      'Konfirmasi Perubahan',
      'Anda ingin menyimpan perubahan?',
      [
        {text: 'Tidak', onPress: () => {
          ToastAndroid.show('Perubahan dihapus', ToastAndroid.SHORT);
          this.props.navigation.navigate('Beranda')
        }},
        {text: 'Ya', onPress: () => {
          this.insertArticle('offline')
          ToastAndroid.show('Perubahan disimpan', ToastAndroid.SHORT);
          this.props.navigation.navigate('Beranda')
        }},
      ]
    )
  }


  render() {
    BackHandler.addEventListener('hardwareBackPress', function() {
      // vm.props.navigation.navigate('Beranda');
      // vm.handleOnClose()
    });
    return (
      <View style={css.container}>
        <Toolbar
          leftElement='clear'
          onLeftElementPress={this.handleOnClose.bind(this)}
          centerElement={<Text style={css.toolbar}>Tulis Artikel</Text>}
          rightElement='done'
          onRightElementPress={()=> this.postConfirm()}
        />
        <RichTextEditor
          ref={(r) => this.richtext = r}
          titlePlaceholder='Judul'
          contentPlaceholder='Tambahkan teks dan foto'
          editorInitializedCallback={() => this.onEditorInitialized()}
        />
        <RichTextToolbar
          style={[css.textToolbar]}
          onPressAddImage={()=>alert('Fitur belum tersedia :(')}
          selectedButtonStyle={css.selectedButton}
        	getEditor={() => this.richtext}
        />
      </View>
    );
  }
}
