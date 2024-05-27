import { auth } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile } from 'firebase/auth';

let observers = [];

const AUTH_EMPTY_STATE = {
    id: null,
    email: null,
    usernme: null
};

let authUser = AUTH_EMPTY_STATE;

onAuthStateChanged(auth, user => {
    if(user) {
        authUser = {
            id: user.uid,
            email: user.email,
            username: user.displayName
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

export const createUser = async (email, password, displayName) => {
    try {
        const newUserCredentials = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(newUserCredentials.user, {
            displayName: displayName,
        });

        return {
            id: newUserCredentials.user.uid,
            email: newUserCredentials.user.email,
            username: newUserCredentials.user.displayName,
        };
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
        .then(user => {
            return {
                id: user.uid,
                email: user.email,
                username: user.displayName,
            }
        });
}

export const logout = () => {
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