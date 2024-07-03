const FILE_TYPES_MAP = {
    'image/jpeg'    : 'jpg',
    'image/pjpeg'   : 'jpg',
    'image/gif'     : 'gif',
    'image/png'     : 'png',
    'image/webp'    : 'webp',
    'image/avif'    : 'avif',
}

export function getFileExtension(file) {
    return FILE_TYPES_MAP[file.type] || null;
}