import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export const getUserProfileById = async (id) => {
    const userRef = doc(db, `users/${id}`);

    try {
        const userDoc = await getDoc(userRef);

        return {
            id: userDoc.id,
            email: userDoc.data().email,
            username: userDoc.data().username,
            creationTime: userDoc.data().creationTime,
        };
    } catch (error) {
        console.error('[user-profile.js getUserProfileById] Error al traer el perfil del usuario. ', error);
        throw error;
    }
}

export const createUserProfile = async (id, data) => {
    const userRef = doc(db, `users/${id}`);

    try {
        await setDoc(userRef, data);
        console.log('User profile created successfully');
    } catch (error) {
        console.error('[user-profile.js createUserProfile] Error al crear el perfil del usuario. ', error);
        throw error;
    }
}