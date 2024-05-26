// Servicio para manejar los datos de la collection de "users" en Firestore.

import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "./firebase";

export async function getUserProfileById(id) {
    const userRef = doc(db, `users/${id}`);

    try {
        const userDoc = await getDoc(userRef);

        return {
            id: userDoc.id,
            email: userDoc.data().email,
        }
    } catch (error) {
        console.error('[user-profile.js getUserProfileById] Error al traer el perfil del usuario. ', error);
    }
}

export async function createUserProfile(id, data) {
    const userRef = doc(db, `users/${id}`);

    return setDoc(userRef, {...data});
}