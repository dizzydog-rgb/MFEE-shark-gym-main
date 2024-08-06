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

// bs5 modal
// const myModal = document.getElementById('myModal')
// console.log(myModal);

// const myInput = document.getElementById('myInput')

// myModal.addEventListener('shown.bs.modal', function () {
//     myInput.focus()
// })


// email confirm
document.addEventListener('DOMContentLoaded', function () {
    const subscribeBtn = document.getElementById('button-addon');
    const emailInput = document.querySelector('input[placeholder="請輸入您的電子郵件"]');

    subscribeBtn.addEventListener('click', function () {

        let email = emailInput.value.trim();

        if (validEmail(email)) {
            alert(`感謝您的訂閱，我們將定期發送電子報至 ${email}`)
        } else {
            alert('請輸入有效的電子郵件地址')
        }
    });

    function validEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
})