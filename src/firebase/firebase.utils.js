import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
        apiKey: "AIzaSyARUVzJlXrN5roLNWYBK3Q3HfpA80ITDBQ",
        authDomain: "crown-db-c83ac.firebaseapp.com",
        databaseURL: "https://crown-db-c83ac.firebaseio.com",
        projectId: "crown-db-c83ac",
        storageBucket: "crown-db-c83ac.appspot.com",
        messagingSenderId: "985080841927",
        appId: "1:985080841927:web:0db94c7d2999a0787420e2",
        measurementId: "G-NZM2CNMVFT"
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
    console.log('userAuth', userAuth)
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        } catch (error) {
            console.log('error creating user', error.message);
        }
    }

    return userRef;
}

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });
export const signInWithGoogle= () => auth.signInWithPopup(provider);

export default firebase;
