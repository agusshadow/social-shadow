import { addDoc, collection, serverTimestamp, query, orderBy, where, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

export async function createComment(data) {
    const refChat = collection(db, 'comments');

    const doc = await addDoc(refChat, {
        ...data,
        created_at: serverTimestamp(),
    });

    return {
        id: doc.id,
    }
}

export function subscribeToComments(postId, callback) {
    const refChat = collection(db, 'comments');

    const q = query(refChat, where('post_id', '==', postId), orderBy('created_at', 'desc'));

    return onSnapshot(q, snapshot => {
        const posts = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                post_id: doc.data().post_id,
                comment_by: {
                    id: doc.data().comment_by.id,
                    email: doc.data().comment_by.email,
                    username: doc.data().comment_by.username,
                },
                content: doc.data().content,
                created_at: doc.data().created_at?.toDate(),
            }
        });
        callback(posts);
    });
}

export function subscribeToCommentsByPostId(postId, callback) {
    const ref = collection(db, 'comments');
    const q = query(ref, where('post_id', '==', postId));

    return onSnapshot(q, snapshot => {
        const count = snapshot.size;
        callback(count);
    });
}