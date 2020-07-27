
(function () {
    const data = [
        {
            name: 'Jack Johnson',
            source: 'images/group3.png'
        },
        {
            name: 'Jack Gordon',
            source: 'images/group3-1.png'
        },
        {
            name: 'Jack King',
            source: 'images/group3-2.png'
        },
        {
            name: 'Samuel Raysson',
            source: 'images/group3.png'
        }
    ]

    const searchField = document.querySelector('.blog__search-input');
    const resultSearch = document.querySelector('.blog__search-result ul');
    // const resultList = document.querySelector('.blog__search-result ul');


    searchField.addEventListener('input', filter);
    searchField.addEventListener('focus', filter);


    function filter() {

        const value = this.value;
        const filtered = data.filter(author => {
            const authorName = author.name.toLocaleLowerCase();
            const authorInput = value.toLocaleLowerCase();

            return authorName.indexOf(authorInput) !== -1

        });

        resultSearch.innerHTML = null;

        if (filtered.length) {
            filtered.forEach(author => {
                const pattern = `
                    <li data-name="${author.name}">
                        <img src="${author.source}" alt="">
                        <span>${author.name}</span>
                    </li>
                `;
                resultSearch.innerHTML += pattern;
            })
        } else {
            const pattern = `
                <li>
                    <span class="nobody">Nobody found :(</span>
                </li>
            `;
            resultSearch.innerHTML += pattern;
        }

    }

    resultSearch.addEventListener('mousedown', (e) => {
        const firstEntry = e.target;
        const secondEntry = firstEntry.offsetParent;
        if (secondEntry.tagName === 'LI' || firstEntry.tagName === 'LI') {

            if (firstEntry.getAttribute('data-name')) {
                searchField.value = firstEntry.getAttribute('data-name');
            } else {
                searchField.value = secondEntry.getAttribute('data-name');
            }
        }
    });
})()