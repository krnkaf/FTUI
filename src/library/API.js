export const GetURL = (url) => {
    return localStorage.url+url;
}

export const GetToken = (only_token = false) => {
    if(!only_token)
        return "Bearer "+localStorage.token;
    else 
        return localStorage.token;
}