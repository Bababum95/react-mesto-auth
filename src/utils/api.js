class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl
        this._token = options.headers
    }

    _getResponseData(res) {
        if (!res.ok) {
            return Promise.reject(res.status);
        }
        return res.json();
    }

    _request(endipoint, options) {
        return fetch(`${this._baseUrl}/${endipoint}`, options).then(this._getResponseData)
    }

    getInitialCards() {
        return this._request('cards', { headers: this._token })
    }

    getUserInfo() {
        return this._request('users/me', { headers: this._token })
    }

    addCard(formData) {
        return this._request('cards', {
            method: 'POST',
            headers: this._token,
            body: JSON.stringify(formData)
        })
    }

    editUserInfo(formData) {
        return this._request('users/me', {
            method: 'PATCH',
            headers: this._token,
            body: JSON.stringify(formData)
        })
    }

    deleteCard(cardId) {
        return this._request(`cards/${cardId}`, {
            method: 'DELETE',
            headers: this._token,
        })
    }

    togleLike(cardId, isLiked) {
        this.method = isLiked ? "PUT" : "DELETE"
        return this._request(`cards/${cardId}/likes`, {
            method: this.method,
            headers: this._token,
        })
    }

    changeAvatar(formData) {
        return this._request('users/me/avatar', {
            method: 'PATCH',
            headers: this._token,
            body: JSON.stringify(formData)
        })
    }
}

const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
    headers: {
        authorization: '485da694-81b9-4feb-af69-7e62f449a2e4',
        'Content-Type': 'application/json'
    }
});

export default api;