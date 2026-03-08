document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Управление шапкой и кнопкой "Наверх"
    const header = document.getElementById('header');
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        if (window.scrollY > 500) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // 2. Анимация появления элементов при скролле
    const fadeElements = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.1, 
        rootMargin: "0px 0px -30px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            observer.unobserve(entry.target);
        });
    }, appearOptions);

    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });

    // 3. Правильное мобильное меню (CSS-классы вместо inline-стилей)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const mobileBtnIcon = mobileBtn.querySelector('i');

    // Открытие/закрытие меню
    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Меняем иконку (гамбургер на крестик и обратно)
        if (navMenu.classList.contains('active')) {
            mobileBtnIcon.classList.remove('fa-bars');
            mobileBtnIcon.classList.add('fa-times');
            document.body.style.overflow = 'hidden'; // Запрещаем скролл сайта под меню
        } else {
            mobileBtnIcon.classList.remove('fa-times');
            mobileBtnIcon.classList.add('fa-bars');
            document.body.style.overflow = ''; // Возвращаем скролл
        }
    });

    // Закрытие меню при клике на любую ссылку
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileBtnIcon.classList.remove('fa-times');
            mobileBtnIcon.classList.add('fa-bars');
            document.body.style.overflow = '';
        });
    });
});