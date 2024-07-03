import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebase';

export async function uploadFile(path, file) {
    const fileRef = ref(storage, path);
    await uploadBytes(fileRef, file);

    return getFileURL(path);
}

export async function getFileURL(path) {
    return getDownloadURL(ref(storage, path));
}
