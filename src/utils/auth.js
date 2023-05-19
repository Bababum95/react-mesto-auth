const BASE_URL = 'https://auth.nomoreparties.co';

const getResponseData = (res) => {
    if (!res.ok) {
        return Promise.reject(res.status);
    }
    return res.json();
}

const request = (endipoint, options) => {
    return fetch(`${BASE_URL}/${endipoint}`, options).then(getResponseData)
}

export const register = (formData) => {
    return request('signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
};
export const authorize = (formData) => {
    return request('signin', {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
};
export const checkToken = (token) => {
    return request('users/me', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
}