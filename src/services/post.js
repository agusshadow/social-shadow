import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy, where } from "firebase/firestore";
import { db } from "./firebase";

export async function createPost(data) {
    const refChat = collection(db, 'posts');

    const doc = await addDoc(refChat, {
        ...data,
        created_at: serverTimestamp(),
    });

    return {
        id: doc.id,
    }
}

export function subscribeToPosts(callback) {
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
                },
                content: doc.data().content,
                image: doc.data().img,
                created_at: doc.data().created_at?.toDate(),
            }
        });
        callback(posts);
    });
}

export function subscribeToPostsByUserId(userId, callback) {
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
                },
                content: doc.data().content,
                image: doc.data().img,
                created_at: doc.data().created_at?.toDate(),
            }
        });
        callback(posts);
    });
}