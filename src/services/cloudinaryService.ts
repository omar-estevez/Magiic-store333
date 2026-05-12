import axios from 'axios';

const CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME as string;
const UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET as string;

if (!CLOUD_NAME || !UPLOAD_PRESET) {
    throw new Error("Faltan las variables de entorno CLOUD_NAME o UPLOAD_PRESET");
}

// Subida de una sola imagen
export const uploadImage = async (file: File, folder?: string): Promise<string> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    if (folder) {
        formData.append("folder", `magic-store/products/${folder}`);
    }

    try {
        const res = await axios.post<{ secure_url: string }>(
            `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/upload`,
            formData
        );
        return res.data.secure_url;
    } catch (error) {
        console.error('Error subiendo la imagen:', error);
        throw error;
    }
};

// Subida de múltiples imágenes
export const uploadImages = async (files: File[]): Promise<string[]> => {
    const urls: string[] = [];
    for (const file of files) {
        const url = await uploadImage(file);
        urls.push(url);
    }
    return urls;
};

// Versión paralela opcional
export const uploadImagesParallel = async (files: File[], folder?: string): Promise<string[]> => {
    const uploadPromises = files.map(file => uploadImage(file, folder));
    return Promise.all(uploadPromises);
};