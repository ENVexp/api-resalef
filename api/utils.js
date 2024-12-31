export function isHttps(url) {
    try {
        return new URL(url).protocol === 'https:';
    } catch (error) {
        return false;
    }
}