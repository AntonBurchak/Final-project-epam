
class Controller {

    static ancors = 'add-new-post';
    static form = document.querySelector('.newPost');

    static listenTriggerClickOnAddPost() {
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains(Controller.ancors)) {
                e.preventDefault()
                Controller.form.classList.add('active');

                const dateInput = Controller.form.querySelector('input[type=date]'),
                    date = new Date().getDate() < 10 ? '0' + (new Date().getDate()) : (new Date().getDate()),
                    year = new Date().getFullYear(),
                    month = new Date().getMonth() < 10 ? '0' + (new Date().getMonth() + 1) : (new Date().getMonth() + 1),
                    value = `${year}-${month}-${date}`;

                dateInput.value = value;


            };
        });
        Controller.form.addEventListener('click', (e) => {
            const label = e.target.offsetParent;
            // console.log(e)
            // console.clear()
            const main_form = Controller.form.querySelector('.newPost__form');
            const qoute = Controller.form.querySelector('[name=quote]');

            if (label.nodeName === 'LABEL') {
                if (document.querySelector('.cloned')) document.querySelector('.cloned').remove()
                const input = qoute.cloneNode();
                if (label.getAttribute('for') === 'vid' || label.getAttribute('for') === 'aud') {
                    input.classList.add('cloned');
                    input.name = 'src';
                    input.placeholder = label.getAttribute('data-name') + ' link';
                    main_form.insertBefore(input, qoute)
                }
            }
        })
    }
    static listenTriggerCloseForm() {
        window.addEventListener('click', (e) => {
            if (e.target.classList.contains('close-form')) {
                Controller.form.classList.remove('active')
            };
        });
    }
    static listenTriggerAddingPost() {
        const form_add = Controller.form.querySelector('.newPost__form')
        form_add.addEventListener('submit', (e) => {
            e.preventDefault();

            const title = form_add.title.value,
                description = form_add.description.value,
                type = form_add.type.value,
                image = form_add.image.value,
                source = form_add.src ? form_add.src.value : null,
                quote = form_add.quote.value,
                text = form_add.text.value,
                author = form_add.author.value,
                date = form_add.date.value;

            const data = {
                id: null,
                title,
                description,
                type,
                image,
                source,
                quote,
                text,
                author,
                date,
                comments: [
                    {
                        author: 'Username',
                        text: 'It\'s text generate by default',
                        postdate: 'a week ago',
                        stars: 3
                    }
                ]
            }
            if (Validator.isValid(data)) {
                Notification.success('All success');

                Server.counter++;
                Server.generatePostId();
                data.id = JSON.parse(localStorage.getItem('id'));

                console.log(data);
                Server.connect('POST', Server.api.create, data).then(data => console.log(data));

                setTimeout(() => {
                    window.location.replace('localhost:3000/blog.html');
                }, 1000)
            } else {
                Notification.error('Title is invalid')
            }
        });
    }

    static setScenaryProceedingPage() {
        if (Controller.getCurrentPage() == 'blog.html') {
            // console.log('SUCCESS')
            Server.connect('GET', Server.api.list).then(data => {
                console.log(data);
                Parser.parseBlog('.blogPosts__wrapper', data);
            })
        }
        if (Controller.getCurrentPage().indexOf('post.html') !== -1) {
            // console.log('its post page')
            const id = window.location.href.split('id=')[1];
            // console.log(Server.api.find + id)

            Server.connect('GET', Server.api.find + id).then(data => {
                console.log(data);
                Parser.parsePost('.post__main', data);

            })
        }
    }


    static getCurrentPage() {
        const location = window.location.href;
        return location.slice(location.lastIndexOf('/') + 1, location.length);
    }
}
Controller.listenTriggerClickOnAddPost();
Controller.listenTriggerAddingPost();
Controller.listenTriggerCloseForm();
Controller.setScenaryProceedingPage();
// console.log(Controller.getCurrentPage())