require('dotenv').config();
const { Strophe } = require('strophe.js');
global.XMLHttpRequest = require('xhr2');

const ejabberdID = process.env.EJABBERDID 
const ejabberdPwd = process.env.EJABBERDPWD 
const ejabberdURL = process.env.EJABBERDURL



const onMessage = (arg) => {
  // console.log('onMessage', arg);
  return true;
}

const onConnect = (statusCode) => {
  
  console.log('status', statusCode);
  if (statusCode === Strophe.Status.CONNECTED) {
    connection.addHandler(onMessage, null, 'message', null, null, null);
    connection.send($pres());
    setTimeout(() => {
      connection.send($msg({to: 'someone', type: 'chat'}).c('body').t('Hello, world!'));
    }, 1000);
  }
}


const connection = new Strophe.Connection(ejabberdURL);
connection.connect(ejabberdID, ejabberdPwd, onConnect);
