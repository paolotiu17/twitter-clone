import app from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

import firebaseConfig from './config'

const firebase = app
firebase.initializeApp(firebaseConfig)
const auth = firebase.auth()
const db = firebase.firestore()

async function register(name, email, password) {
    const newUser = await auth.createUserWithEmailAndPassword(email, password)
    newUser.user.updateProfile({
        displayName: name,
    })

    return newUser
}

function login(email, password) {
    return auth.signInWithEmailAndPassword(email, password)
}

function signOut() {
    return auth.signOut()
}

function resetPassword(email) {
    return auth.sendPasswordResetEmail(email)
}

function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    return auth.signInWithPopup(provider)
}

// DB FUNCTIONS

function getTweets() {
    let tweets
    let query = db.collection('tweets')
    let unsubscribe = query.onSnapshot((snapshot) => {
        tweets = snapshot.docs.map((tweet) => tweet.data())
    })

    return [unsubscribe, tweets]
}

export default firebase

export { signOut, signInWithGoogle, auth, register, login }