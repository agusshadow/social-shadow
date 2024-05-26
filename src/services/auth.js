import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from 'firebase/auth';

const AUTH_EMPTY_STATE = {
    id: null,
    email: null,
};

let authUser = AUTH_EMPTY_STATE;

let observers = [];

onAuthStateChanged(auth, user => {
    if(user) {
        authUser = {
            id: user.uid,
            email: user.email,
        };
        saveUserInLocalStorage(user);
    } else {
        authUser = AUTH_EMPTY_STATE;
        removeUserInLocalStorage();
    }
    notifyAll();
});

const saveUserInLocalStorage = (user) => {
    localStorage.setItem('user', JSON.stringify(user))
}

const removeUserInLocalStorage = () => {
    localStorage.removeItem('user')
}

export const createUser = async (email, password) => {
    const newUserCredentials = await createUserWithEmailAndPassword(auth, email, password);
    return {
        id: newUserCredentials.user.uid,
        email: newUserCredentials.user.email,
    }
}
/* 
export const login = async (email, password) => {
    const loggedUser = await signInWithEmailAndPassword(auth, email, password);
    return {
        id: loggedUser.user.uid,
        email: loggedUser.user.email
    }
} */

export function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            console.log("Usuario autenticado: ", user);
            return {
                id: user.uid,
                email: user.email,
            }
        });
}

export const loginWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        const credential = GoogleAuthProvider.credentialFromResult(result);
        console.log('google credential: ', credential);
    } catch (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData?.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.error('Error during Google sign-in:', errorCode, errorMessage, email, credential);
    }
};

export const logout = () => {
    console.log('Logout');
    return signOut(auth);
}

export const subscribeToAuth = (callback) => {
    observers.push(callback);
    notify(callback);
    return () => observers = observers.filter(obs => obs !== callback);
}

function notify(observer) {
    observer({...authUser});
}

function notifyAll() {
    observers.forEach(obs => notify(obs));
}