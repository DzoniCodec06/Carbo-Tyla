export const isAuthenticated = () => {
    return localStorage.getItem("userToken") !== null;
}

export const loginUser = (token) => {
    return localStorage.setItem("userToken", token);
}

export const logoutUser = () => {
    return localStorage.removeItem("userToken");
}