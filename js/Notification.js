class Notification {
    static errorImg = 'close.png';
    static successImg = 'success.png';
    static popup = document.querySelector('.notification')

    static error(message) {
        Notification.popup.className = 'notification error';
        const errorHtml = ` 
                                <img src="images/${Notification.errorImg}" alt="">
                                <p>${message}</p>
                                <div class="close close-not"></div>
                            `
        Notification.popup.innerHTML += errorHtml;
        Notification.popup.classList.remove('hide')

        console.error(message)
    }

    static success(message) {
        Notification.popup.className = 'notification success';

        const successHtml = ` 
                                <img src="images/${Notification.successImg}" alt="">
                                <p>${message}</p>
                                <div class="close close-not"></div>
                            `
        Notification.popup.innerHTML += successHtml;
        Notification.popup.classList.remove('hide')

        console.log(message)
    }

    static watchCloseTrigger() {
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-not')) {
                Notification.popup.innerHTML = null;
                Notification.popup.classList.add('hide')
            }
        })
    }

}
Notification.watchCloseTrigger();