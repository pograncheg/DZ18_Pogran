const url = 'https://it-academy-js-api-zmicerboksha.vercel.app/api/course/books';
const tableBody = document.querySelector('.table tbody');
const pageNumbers = document.querySelector('.pagination');
const selectSize = document.querySelector('#pagesSelect');
const inputSearch = document.querySelector('.input-search');
const buttonSearch = document.querySelector('.search');
const orderByAsc = document.querySelectorAll('.fa-arrow-down');
const orderByDesc = document.querySelectorAll('.fa-arrow-up');
const sortColumn = document.querySelectorAll('.sortable');

let search = JSON.parse(localStorage.getItem('currentSearch')) || '';
let mySearch = `&search=${search}`;
let page = JSON.parse(localStorage.getItem('currentPage'))|| 0;
let myPage =  `page=${page}`;
let size = JSON.parse(localStorage.getItem('currentSize'))|| 20;
console.log(myPage);
let mySize =  `size=${size}`;
let myOrderBy = JSON.parse(localStorage.getItem('currentOrderBy')) || '&orderBy=title,asc';
selectSize.value = size;
inputSearch.value = search;

function comeOn(book) {
    let tr = document.createElement('tr');
    tr.innerHTML = `<td>${book.id}</td><td>${book.title}</td><td>${book.author}</td>
    <td>${book.year}</td><td>${book.price}</td><td>${book.imageLink}</td>`;
    tableBody.append(tr);
}

sortColumn.forEach(sort =>{
    sort.querySelectorAll('.fa-solid').forEach(icon =>{
        if(myOrderBy.includes(sort.dataset.field)){
            sort.querySelector('.fa-arrow-down').style.display = 'none';
            sort.querySelector('.fa-arrow-up').style.display = 'inline';
            sort.querySelector('.fa-arrow-up').style.marginLeft = '5px';
        } else{
            icon.style.display = 'none';
        }

    })
    sort.addEventListener('click', ()=>{
        if(myOrderBy === `&orderBy=${sort.dataset.field},asc`){
            myOrderBy = `&orderBy=${sort.dataset.field},desc`;
            localStorage.setItem('currentOrderBy',JSON.stringify(myOrderBy));
            fetch(url + '?' + mySize + '&' + myPage + mySearch + myOrderBy)
            .then(resp => resp.json())
            .then(response => {
                main(response);
                document.querySelectorAll('.fa-solid').forEach(icon =>{
                    icon.style.display = 'none';
                })
                sort.querySelector('.fa-arrow-down').style.display = 'inline';
                sort.querySelector('.fa-arrow-down').style.marginLeft = '5px';
                sort.style.minWidth = '90px';
            })
            .catch(err => {
                console.log(err);
                alert('Ошибка!');
            })
        } else {
            myOrderBy = `&orderBy=${sort.dataset.field},asc`;
            localStorage.setItem('currentOrderBy',JSON.stringify(myOrderBy));
            fetch(url + '?' + mySize + '&' + myPage + mySearch + myOrderBy)
                .then(resp => resp.json())
                .then(response => {
                    main(response);
                    document.querySelectorAll('.fa-solid').forEach(icon =>{
                        icon.style.display = 'none';
                    })
                    sort.querySelector('.fa-arrow-up').style.display = 'inline';
                    sort.querySelector('.fa-arrow-up').style.marginLeft = '5px';
                    sort.style.minWidth = '90px';
                })
                .catch(err => {
                    console.log(err);
                    alert('Ошибка!');
                })
        }
            
    })
})

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
            if (j === page) {
                newLi.classList.add('disabled');
            }
            newLi.addEventListener('click', e => {
                page = j;
                myPage = `page=${page}`;
                localStorage.setItem('currentPage', JSON.stringify(page));
                fetch(url + '?' + mySize + '&' + myPage + mySearch + myOrderBy)

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
            pageNumbers.append(newLi);
        }
}

fetch(url + '?' + mySize + '&' + myPage + mySearch + myOrderBy)
    .then(resp => resp.json())
    .then(response => {
        main(response);
    })
    .catch(err => {
        console.log(err);
        alert('Ошибка!')
    })

selectSize.onchange = function () {
    let newSize = +selectSize.value;

    mySize = `size=${newSize}`;
    localStorage.setItem('currentSize', JSON.stringify(newSize));
    page = 0;
    myPage = `page=${page}`;
    localStorage.setItem('currentPage', JSON.stringify(page));
    fetch(url + '?' + mySize + '&' + myPage + mySearch + myOrderBy)

        .then(resp => resp.json())
        .then(response => {
            main(response);
        })
}

buttonSearch.addEventListener('click', ()=>{
    mySearch = `&search=${inputSearch.value}`;
    localStorage.setItem('currentSearch',JSON.stringify(inputSearch.value));
    page = 0;
    myPage = `page=${page}`;
    localStorage.setItem('currentPage', JSON.stringify(page));
    fetch(url + '?' + mySize + '&' + myPage + mySearch + myOrderBy)

        .then(resp => resp.json())
        .then(response => {
            main(response);
        })
        .catch(err => {
            console.log(err);
            alert('Ошибка!')
        })
    
})
