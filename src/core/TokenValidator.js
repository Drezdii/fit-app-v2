export const isTokenValid = token => {

    const tokenIssuer = 'fitapp';

    if (token === null) {
        return false;
    }

    const data = getPayload(token);

    // Change from ms to seconds
    const now = Math.floor(Date.now() / 1000);

    // Check if token has expired
    if (data.exp < now) {
        console.log('Token has expired');
        return false;
    }

    return true;
};

export const getPayload = token => {
    // Get payload from token
    const payload = token.split('.')[1];

    // Decode base64 payload string
    let data = atob(payload);

    // Parse the string into a json object
    return data = JSON.parse(data);
};