import {store} from "../Redux/store"
import * as firebase from 'firebase'

export default function backup(){
    firebase
      .database()
      .ref()
      .child(store.getState().redux.user)
      .set(store.getState().redux);
}