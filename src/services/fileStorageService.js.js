import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../firebase/firebase';

export async function uploadFile(path, file) {
    const fileRef = ref(storage, path);
    // Subimos el archivo.
    await uploadBytes(fileRef, file);

    // Retornamos la URL absoluta.
    return getFileURL(path);
}

export async function getFileURL(path) {
    return getDownloadURL(ref(storage, path));
}
