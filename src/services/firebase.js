import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore'

import { getDatabase } from "firebase/database"

const firebaseConfig = {
    apiKey: "AIzaSyAf75pA3N3xglLFb_ovURbTtPhLkMJ4LJY",
    authDomain: "tiktok-clone-a1eae.firebaseapp.com",
    databaseURL: "https://tiktok-clone-a1eae-default-rtdb.firebaseio.com",
    projectId: "tiktok-clone-a1eae",
    storageBucket: "tiktok-clone-a1eae.appspot.com",
    messagingSenderId: "87074462286",
    appId: "1:87074462286:web:a4ebbf28dcc778f639411f",
    measurementId: "G-MXN0M75RZW"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
const firestore = firebase.firestore();
export function createUser(uid, data) {
    return firestore
        .collection('users')
        .doc(uid)
        .set({ uid, ...data }, { merge: true })
}


export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;