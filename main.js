const url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/course/books?'
const tableBody = document.querySelector('.table tbody');
const pageNumbers = document.querySelector('.pagination');
const selectSize = document.querySelector('#pagesSelect');
const inputSearch = document.querySelector('.input-search');
const buttonSearch = document.querySelector('.search');
let searchLine ='';
let countOnPage = '';

function comeOn(book) {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${book.id}</td><td>${book.title}</td><td>${book.author}</td>
    <td>${book.year}</td><td>${book.price}</td><td>${book.imageLink}</td>`;
    tableBody.append(tr);
}

function main(response){
    let content = response.content;
            let totalPages = response.totalPages;
            tableBody.innerHTML = '';
            for (let i = 0; i < content.length; i++) {
                comeOn(content[i]);
            }
            pageNumbers.innerHTML = '';
            for (let j = 0; j < totalPages; j++) {
                let newLi = document.createElement('li');
                newLi.classList.add('page-item');
                newLi.innerHTML = `<a class="page-link" href="#">${j + 1}</a>`;
                newLi.addEventListener('click', e => {
                    // tableBody.innerHTML = '';
                    fetch(url + `&page=${j}`)

                        .then(resp => resp.json())
                        .then(response => {
                            let content = response.content;
                            let totalPages = response.totalPages;
                            tableBody.innerHTML = '';
                            for (let i = 0; i < content.length; i++) {
                                comeOn(content[i]);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            alert('Ошибка!')
                        })
                })
                console.log(newLi);
                console.log(pageNumbers);
                if (j === 0) {
                    newLi.classList.add('disabled');
                }
                pageNumbers.append(newLi);
            }
}


fetch(url)

    .then(resp => resp.json())
    .then(response => {
        let content = response.content;
        let totalPages = response.totalPages;
        tableBody.innerHTML = '';
        for (let i = 0; i < content.length; i++) {
            comeOn(content[i]);
        }
        pageNumbers.innerHTML = '';
        for (let j = 0; j < totalPages; j++) {
            let newLi = document.createElement('li');
            newLi.classList.add('page-item');
            newLi.innerHTML = `<a class="page-link" href="#">${j + 1}</a>`;
            if (j === 0) {
                newLi.classList.add('disabled');
            }
            newLi.addEventListener('click', e => {
                // tableBody.innerHTML = '';
                fetch(url + `?page=${j}`)

                    .then(resp => resp.json())
                    .then(response => {
                        let content = response.content;
                        let totalPages = response.totalPages;
                        tableBody.innerHTML = '';
                        for (let i = 0; i < content.length; i++) {
                            comeOn(content[i]);
                        }
                    })
                    .catch(err => {
                        console.log(err);
                        alert('Ошибка!')
                    })
                document.querySelectorAll('.disabled').forEach(li =>{
                    li.classList.remove('disabled');
                })
                newLi.classList.add('disabled');
            })
            console.log(newLi);
            // console.log(pageNumbers);
            // if (j === 0) {
            //     newLi.classList.add('disabled');
            // }
            pageNumbers.append(newLi);
        }
    })
    .catch(err => {
        console.log(err);
        alert('Ошибка!')
    })


selectSize.onchange = function () {
    let newSize = +selectSize.value;
    let newUrl = `https://it-academy-js-api-zmicerboksha.vercel.app/api/course/books?size=${newSize}`;
    fetch(newUrl)

        .then(resp => resp.json())
        .then(response => {
            let content = response.content;
            let totalPages = response.totalPages;
            tableBody.innerHTML = '';
            for (let i = 0; i < content.length; i++) {
                comeOn(content[i]);
            }
            pageNumbers.innerHTML = '';
            for (let j = 0; j < totalPages; j++) {
                let newLi = document.createElement('li');
                newLi.classList.add('page-item');
                newLi.innerHTML = `<a class="page-link" href="#">${j + 1}</a>`;
                if (j === 0) {
                    newLi.classList.add('disabled');
                }
                newLi.addEventListener('click', e => {
                    // tableBody.innerHTML = '';
                    fetch(newUrl + `&page=${j}`)

                        .then(resp => resp.json())
                        .then(response => {
                            let content = response.content;
                            let totalPages = response.totalPages;
                            tableBody.innerHTML = '';
                            for (let i = 0; i < content.length; i++) {
                                comeOn(content[i]);
                            }
                        })
                        .catch(err => {
                            console.log(err);
                            alert('Ошибка!')
                        })
                    document.querySelectorAll('.disabled').forEach(li =>{
                        li.classList.remove('disabled');
                    })
                    newLi.classList.add('disabled');
                })
                console.log(newLi);
                console.log(pageNumbers);

                pageNumbers.append(newLi);
            }
        })

    // .then(books => {           

    // for( let i = 0; i < books.length; i++){
    //     comeOn(books[i]);
    // }

    // })
}

buttonSearch.addEventListener('click', ()=>{
    console.log(inputSearch.value);
    let newUrl = `https://it-academy-js-api-zmicerboksha.vercel.app/api/course/books?search=${inputSearch.value}`;
    fetch(newUrl)

        .then(resp => resp.json())
        .then(response => {
            let content = response.content;
            let totalPages = response.totalPages;
            tableBody.innerHTML = '';
            for (let i = 0; i < content.length; i++) {
                comeOn(content[i]);
            }
            pageNumbers.innerHTML = '';
    for (let j = 0; j < totalPages; j++) {
        let newLi = document.createElement('li');
        newLi.classList.add('page-item');
        newLi.innerHTML = `<a class="page-link" href="#">${j + 1}</a>`;
        if (j === 0) {
            newLi.classList.add('disabled');
        }
        newLi.addEventListener('click', e => {
            // tableBody.innerHTML = '';
            fetch(newUrl + `&page=${j}`)

                .then(resp => resp.json())
                .then(response => {
                    let content = response.content;
                    let totalPages = response.totalPages;
                    tableBody.innerHTML = '';
                    for (let i = 0; i < content.length; i++) {
                        comeOn(content[i]);
                    }
                })
                .catch(err => {
                    console.log(err);
                    alert('Ошибка!')
                })
            document.querySelectorAll('.disabled').forEach(li =>{
                li.classList.remove('disabled');
            })
            newLi.classList.add('disabled');
        })
        console.log(newLi);
        console.log(pageNumbers);

        pageNumbers.append(newLi);
    }
        })
        .catch(err => {
            console.log(err);
            alert('Ошибка!')
        })
    
})