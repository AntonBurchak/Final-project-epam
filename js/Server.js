class Server {
    static api = {
        list: 'http://localhost:3000/api/list',
        create: 'http://localhost:3000/api/create-article',
        find: 'http://localhost:3000/api/list/'
    }

    static counter = JSON.parse(localStorage.getItem('id')) || 0;

    static async connect(method, url, data = {}) {
        const config = {
            method: method,
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
                // 'Authorization': `Bearer ${getCookie('token')}`
            },
            redirect: 'follow',
            referrerPolicy: 'no-referrer',
        }
        method == 'POST' ? config.body = JSON.stringify(data) : null;
        const response = await fetch(url, config);

        return response.ok ? response.json() : Notification.error(response.status + ' : ' + response.statusText);
    }

    static generatePostId() {
        localStorage.setItem('id', JSON.stringify(Server.counter))
    }


}

Server.connect('GET', Server.api.list).then(data => console.log(data))
Server.generatePostId();