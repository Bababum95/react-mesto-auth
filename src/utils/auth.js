const BASE_URL = 'https://auth.nomoreparties.co';

export const register = (formData) => {
    return fetch(`${BASE_URL}/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
        .then((response) => {
            try {
                if (response.status === 200) {
                    return response.json();
                }
            } catch (e) {
                return (e)
            }
        })
        .then((res) => {
            return res;
        })
        .catch((err) => console.log(err));
};
export const authorize = (formData) => {
    return fetch(`${BASE_URL}/signin`, {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
    })
        .then((response => response.json()))
        .then((data) => {
            if (data) {
                localStorage.setItem('token', data.token);
                return data;
            }
        })
        .catch(err => console.log(err))
};
export const checkToken = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        }
    })
        .then(res => res.json())
        .catch(err => console.log(err))
}