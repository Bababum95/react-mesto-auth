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

    getInitialCards() {
        return fetch(`${this._baseUrl}/cards`, { headers: this._token })
            .then(res => {
                return this._getResponseData(res)
            })
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, { headers: this._token })
            .then(res => {
                return this._getResponseData(res)
            })
    }

    addCard(formData) {
        return fetch(`${this._baseUrl}/cards`, {
            method: 'POST',
            headers: this._token,
            body: JSON.stringify(formData)
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }

    editUserInfo(formData) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: this._token,
            body: JSON.stringify(formData)
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }

    deleteCard(cardId) {
        return fetch(`${this._baseUrl}/cards/${cardId}`, {
            method: 'DELETE',
            headers: this._token,
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }

    togleLike(cardId, isLiked) {
        this.method = isLiked? "PUT" : "DELETE" 
        return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
            method: this.method,
            headers: this._token,
        })
        .then(res => {
            return this._getResponseData(res)
        })
    }
    changeAvatar(formData) {
        return fetch(`${this._baseUrl}/users/me/avatar`, {
            method: 'PATCH',
            headers: this._token,
            body: JSON.stringify(formData)
        })
        .then(res => {
            return this._getResponseData(res)
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