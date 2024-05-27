import { addDoc, collection, onSnapshot, serverTimestamp, query, orderBy } from "firebase/firestore";
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