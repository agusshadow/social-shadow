import { auth } from "./firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, EmailAuthProvider, reauthenticateWithCredential,updatePassword } from 'firebase/auth';
import { createUserProfile } from './user-profile.js';

let observers = [];

const AUTH_EMPTY_STATE = {
    id: null,
    email: null,
    username: null,
    creationTime: null
};

let authUser = AUTH_EMPTY_STATE;

onAuthStateChanged(auth, async (user) => {
    if (user) {
        await user.reload();
        user = auth.currentUser;

        authUser = {
            id: user.uid,
            email: user.email,
            username: user.displayName,
            creationTime: user.metadata.creationTime
        };
        await saveUserInLocalStorage(authUser);
    } else {
        authUser = AUTH_EMPTY_STATE;
        await removeUserInLocalStorage();
    }
    notifyAll();
});

const saveUserInLocalStorage = async (user) => {
    localStorage.setItem('user', JSON.stringify(user));
};

const removeUserInLocalStorage = async () => {
    localStorage.removeItem('user');
};

export const createUser = async (email, password, displayName) => {
    try {
        const newUserCredentials = await createUserWithEmailAndPassword(auth, email, password);

        await updateProfile(newUserCredentials.user, { displayName });
        
        const updatedUser = auth.currentUser;


        await createUserProfile(updatedUser.uid, {
            id: updatedUser.uid,
            email: updatedUser.email,
            username: updatedUser.displayName,
            creationTime: updatedUser.metadata.creationTime
        });

        authUser = {
            id: updatedUser.uid,
            email: updatedUser.email,
            username: updatedUser.displayName,
            creationTime: updatedUser.metadata.creationTime
        };
        await saveUserInLocalStorage(authUser);
        notifyAll();

        return authUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw error;
    }
};

export const login = async (email, password) => {
    try {
        const { user } = await signInWithEmailAndPassword(auth, email, password);
        authUser = {
            id: user.uid,
            email: user.email,
            username: user.displayName,
            creationTime: user.metadata.creationTime
        };
        await saveUserInLocalStorage(authUser);
        notifyAll();
        return authUser;
    } catch (error) {
        console.error("Error logging in:", error);
        throw error;
    }
};

export const logout = async () => {
    await signOut(auth);
};

export const changePassword = async (oldPassword, newPassword) => {
    const user = auth.currentUser;

    try {
        const credential = EmailAuthProvider.credential(user.email, oldPassword);
        await reauthenticateWithCredential(user, credential);

        await updatePassword(user, newPassword);

        await user.reload();
    } catch (error) {
        console.error("Error changing password:", error);
        throw error;
    }
}

export const subscribeToAuth = (callback) => {
    observers.push(callback);
    notify(callback);
    return () => observers = observers.filter(obs => obs !== callback);
};

function notify(observer) {
    observer({ ...authUser });
}

function notifyAll() {
    observers.forEach(obs => notify(obs));
}