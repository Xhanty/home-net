const mainApiUrl = 'https://demo.natupuntos.online/'

const apiUrl = {
    login: new URL('user/login/', mainApiUrl),
    register: new URL('user/register/', mainApiUrl),
}

const query = (url: URL, body: object) => {
    return new Promise((resolve, reject) => {
        fetch(url, body)
            .then((response) => response.json())
            .then((data) => resolve(data))
            .catch((error) => reject(error))
    })
}

const login = (formData: FormData) => {
    return query(apiUrl.login, {
        method: 'POST',
        body: formData
    })
}

export {
    mainApiUrl,
    query,
    login,
    apiUrl
}