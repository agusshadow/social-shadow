import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, where } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import { uploadFile } from "./fileStorageService.js.js";
import { getFileExtension } from "../utils/getFileExtension.js";
import { generateRandomString } from "../utils/generateRandomString.js";

export const createPost = async (data) => {
    const refChat = collection(db, 'posts');

    let imageURL = '';

    if (data.image) {
        imageURL = await uploadFile(`users/${data.post_by.id}/images/${generateRandomString(30)}.${getFileExtension(data.image)}`, data.image);
    }

    const doc = await addDoc(refChat, {
        ...data,
        image: imageURL,
        created_at: serverTimestamp(),
    });

    return {
        id: doc.id,
    }
}

export const subscribeToPosts = (callback) => {
    const refChat = collection(db, 'posts');

    const q = query(refChat, orderBy('created_at', 'desc'));

    return onSnapshot(q, snapshot => {

        const posts = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                post_by: {
                    id: doc.data().post_by.id,
                    email: doc.data().post_by.email,
                    username: doc.data().post_by.username,
                    photoURL: doc.data().post_by.photoURL
                },
                content: doc.data().content,
                image: doc.data().image,
                created_at: doc.data().created_at?.toDate(),
            }
        });
        callback(posts);
    });
}

export const subscribeToPostsByUserId = (userId, callback) => {
    const refChat = collection(db, 'posts');

    const q = query(refChat, where('post_by.id', '==', userId), orderBy('created_at', 'desc'));

    return onSnapshot(q, snapshot => {

        const posts = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                post_by: {
                    id: doc.data().post_by.id,
                    email: doc.data().post_by.email,
                    username: doc.data().post_by.username,
                    photoURL: doc.data().post_by.photoURL
                },
                content: doc.data().content,
                image: doc.data().image,
                created_at: doc.data().created_at?.toDate(),
            }
        });
        callback(posts);
    });
}