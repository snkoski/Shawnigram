import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// here I want to import the seed file
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyCHeLB3KQ7oJyGtYRa7TxHtaaO7Fr1172M',
  authDomain: 'shawm-e9783.firebaseapp.com',
  projectId: 'shawm-e9783',
  storageBucket: 'shawm-e9783.appspot.com',
  messagingSenderId: '336021951950',
  appId: '1:336021951950:web:8dfda0261ca39b7c8f079f'
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

// here is where I want to call the seed file (only ONCE!)
// seedDatabase(firebase);

console.log('firebase', firebase);

export { firebase, FieldValue };
