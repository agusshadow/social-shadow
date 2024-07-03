export const formatDateUtil = (dateString) => {
    const timestamp = Date.parse(dateString);
    if (isNaN(timestamp)) {
        return 'Fecha inválida';
    }
    const fecha = new Date(timestamp);
    return fecha.toLocaleString('es-ES', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}
