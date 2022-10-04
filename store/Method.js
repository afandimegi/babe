import {observable, action, computed} from 'mobx';

class MainStore {
  @action maxString(txt, max, point = true) {
    let splitTxt = '';
    if (txt.length > max) {
      splitTxt = txt.substring(0,max);
      splitTxt = point ? splitTxt+' ...' : splitTxt;
    }
    else splitTxt = txt;

    return splitTxt;
  }

  @action detailContainer(str) {
    let main = `<!DOCTYPE html>\
    <html lang="en" dir="ltr">\
    <head>\
      <meta charset="utf-8">\
      <title></title>\
      <style>body{margin: 0} p{opacity: 0.6; line-height: 22px} figure{width: 100%; margin: 0} figcaption{opacity: 0.4; font-size: 11px} img{width:100%; height: 150; object-fit: "cover"}</style>\
    </head>\
    <body>\
      ${str}
    </body>\
    </html>`

    return main
  }
}

const method = new MainStore();
export default method;
