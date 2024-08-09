import './assets/scss/all.scss';

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
const hamburgerList = document.querySelector('.hamburger-list');

menuIcon.addEventListener('click', () => {
    hamburgerList.classList.add('my-opacity');
    menuIcon.classList.toggle('my-d-none');
    closeIcon.classList.toggle('my-d-block');
    hamburgerList.classList.toggle('my-d-flex');
});

closeIcon.addEventListener('click', () => {
    hamburgerList.classList.remove('my-opacity');
    closeIcon.classList.toggle('my-d-block');
    menuIcon.classList.toggle('my-d-none');
    setTimeout(() => {
        hamburgerList.classList.toggle('my-d-flex');
    }, 500);
});


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

// blog article filter by tag
document.addEventListener('DOMContentLoaded', function () {
    function articleFliter(index) {
        // 找到所有文章項目，初始化所有文章
        let articleItems = document.querySelectorAll('.blog-item');
        articleItems.forEach(function (item) {
            item.classList.add('show');
            item.classList.remove('unshow')
        })

        const buttonValue = tagButtons[index].value;


        // 遍歷文章項目並顯示具有標籤的文章
        articleItems.forEach(function (item) {
            if (item.getAttribute('data-tags') === buttonValue) {
                item.classList.add('show');
            } else {
                item.classList.add('unshow');
            }
        });
    };

    const tagButtons = document.querySelectorAll('.btn-tag');

    tagButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            articleFliter(index)
        });
    })

    // 顯示全部文章
    const allTagButton = document.querySelector('.btn-tags');
    console.log(allTagButton);


    allTagButton.addEventListener('click', () => {
        let articleItems = document.querySelectorAll('.blog-item');

        articleItems.forEach((item) => {
            item.classList.add('show');
            item.classList.remove('unshow');
        });
    });

});



