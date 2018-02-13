import Rebase from 're-base'
import firebase from 'firebase/app'
import database from 'firebase/database'

const app = firebase.initializeApp({
  apiKey: 'AIzaSyB9TlnnQn7DbN_Aq0PPNZOTdptckGVYV_k',
  authDomain: 'todoreact-8f442.firebaseapp.com',
  databaseURL: 'https://todoreact-8f442.firebaseio.com'
})

const db = firebase.database(app);
const base = Rebase.createClass(db);

export default base
