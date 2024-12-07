export function parseJwt(token: string) {

    try {
        const base64Url = token.split('.')[1]; // Extract the payload part
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
            atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
        );
        return JSON.parse(jsonPayload);
    } catch (error) {
        console.error('Error parsing JWT:', error);
        return null;
    }
}


export function getUserID() {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem('accessToken') || "";
        const decodeToken = parseJwt(token);
        return decodeToken?.id || null; // Safely handle null or undefined
    }
    return null; // Return null if accessed server-side
}

export function getUserName() {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem('accessToken') || "";
        const decodeToken = parseJwt(token);
        return decodeToken?.username || null; // Safely handle null or undefined
    }
    return null; // Return null if accessed server-side
}

