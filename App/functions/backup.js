import {store} from "../Redux/store"
import * as firebase from 'firebase'

export default function backup(){
    
  try {
  firebase
      .database()
      .ref()
      .child(store.getState().redux.user)
      .set(store.getState().redux);
  }catch(error){
    console.error(error);
  }
}


