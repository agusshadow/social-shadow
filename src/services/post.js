import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
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

    const q = query(refChat, orderBy('created_at'));

    return onSnapshot(q, snapshot => {

        const posts = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                postBy: doc.data().post_by,
                email: doc.data().email,
                username: doc.data().username,
                content: doc.data().content,
                img: doc.data().img,
                created_at: doc.data().created_at?.toDate(),
            }
        });
        callback(posts);
    });
}