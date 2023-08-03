class Api {
    constructor({ url }) {
        this._baseUrl = url;
    }

    _checkResponse(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
    }

    getUserInfoFromServer() {
        return fetch(this._baseUrl + '/users/me', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-type': 'application/json'
            }
        })
            .then(res => this._checkResponse(res))
    }

    getInitialCards() {
        return fetch(this._baseUrl + '/cards', {
            method: "GET",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-type': 'application/json'
            },
        })
            .then(res => this._checkResponse(res))
    }

    setUserInfo({ name, about }) {
        return fetch(this._baseUrl + '/users/me', {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name,
                about
            })
        })
            .then(res => this._checkResponse(res))
    }

    addNewCard({ name, link }) {
        return fetch(this._baseUrl + '/cards', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                name,
                link
            })
        })
            .then(res => this._checkResponse(res))
    }

    deleteCard(id) {
        return fetch(`${this._baseUrl}/cards/${id}`, {
            method: 'DELETE',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
              'Content-type': 'application/json'
            },
        })
            .then(res => this._checkResponse(res))
    }

    changeLikeCardStatus(id, like) {
        if (like) {
            return fetch(this._baseUrl + '/cards/' + id + '/likes', {
                method: "PUT",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-type': 'application/json'
                  },  
            })
                .then(res => this._checkResponse(res))
        } else {
            return fetch(this._baseUrl + '/cards/' + id + '/likes', {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('jwt')}`,
                    'Content-type': 'application/json'
                  },
            })
                .then(res => this._checkResponse(res))
        }
    }

    editAvatar({ avatar }) {
        return fetch(this._baseUrl + '/users/me/avatar', {
            method: "PATCH",
            headers: this._headers,
            body: JSON.stringify({
                avatar
            })
        })
            .then(res => this._checkResponse(res))
    }
}

/*export const api = new Api({url: 'https://nomoreparties.co/v1/cohort-64', 
  headers: {authorization: '570bd9e5-c82e-4063-b8fe-13df3632c8f9', 'Content-Type': 'application/json'}
});*/


export const api = new Api({ url: 'http://localhost:3001' });