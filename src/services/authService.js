import { auth } from "../firebase/firebase.js";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, onAuthStateChanged, updateProfile, EmailAuthProvider, reauthenticateWithCredential,updatePassword } from 'firebase/auth';
import { createUserProfile, updateUserProfile } from './userProfileService.js';
import { uploadFile } from './fileStorageService.js.js';
import { getFileExtension } from '../utils/getFileExtension.js'

let observers = [];

const AUTH_EMPTY_STATE = {
    id: null,
    email: null,
    username: null,
    creationTime: null,
    photoURL: null,
};

let authUser = AUTH_EMPTY_STATE;

if(localStorage.getItem('user')) {
    authUser = JSON.parse(localStorage.getItem('user'));
}

onAuthStateChanged(auth, async (user) => {
    if (user) {
        await user.reload();
        user = auth.currentUser;

        authUser = {
            id: user.uid,
            email: user.email,
            username: user.displayName,
            creationTime: user.metadata.creationTime,
            photoURL: user.photoURL,
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
            creationTime: updatedUser.metadata.creationTime,
            photoURL: updatedUser.photoURL,
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

export const updateUserPhoto = async (photo) => {
    if(!photo) return;

    try {
        const photoURL = await uploadFile(`users/${authUser.id}/avatar.${getFileExtension(photo)}`, photo);
        const authPromise = updateProfile(auth.currentUser, { photoURL });
        const profilePromise = updateUserProfile(authUser.id, { photoURL });

        await Promise.all([authPromise, profilePromise]);

        updateUserData({
            photoURL
        });
    } catch (error) {
        console.error('[auth.js updateUserPhoto] Error al tratar de actualizar la foto de perfil: ', error);
        throw error;
    }
}

export const updateUserData = (data) => {
    authUser = {
        ...authUser,
        ...data,
    }
    localStorage.setItem('user', JSON.stringify(authUser));
    notifyAll();
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