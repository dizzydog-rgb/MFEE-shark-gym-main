import './assets/scss/all.scss';

console.log("Hello world!");

// Dynamic Navigation Highlighting
document.addEventListener('DOMContentLoaded', function () {
    // 獲取當前頁面的文件名
    var currentPage = window.location.pathname.split('/').pop().split('.')[0];

    // 找到所有導航項目
    var navItems = document.querySelectorAll('.nav-item');

    // 遍歷導航項目並設置活動狀態
    navItems.forEach(function (item) {
        if (item.getAttribute('data-page') === currentPage) {
            item.classList.add('active');
        }
    });
});


// hamberger list
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon')
const hambugerList = document.querySelector('.hambuger-list');

menuIcon.addEventListener('click', () => {
    hambugerList.classList.toggle('my-d-flex');
    menuIcon.classList.toggle('my-d-none');
    closeIcon.classList.toggle('my-d-block');
});

closeIcon.addEventListener('click', () => {
    hambugerList.classList.toggle('my-d-flex');
    closeIcon.classList.toggle('my-d-block');
    menuIcon.classList.toggle('my-d-none');
});


// BS5 modal
var myModal = document.getElementById('myModal')
var myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', function () {
    myInput.focus()
})