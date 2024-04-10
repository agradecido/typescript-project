import domReady from '@roots/sage/client/dom-ready';
import Swiper from 'swiper/bundle';
import {setupTooltip} from './tooltips/PriceInfoTooltip.js';

/**
 * Application entrypoint
 */
domReady(async () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
});

// Home car gallery slider
domReady(async () => {
    new Swiper(".iscarSwiper", {
        spaceBetween: 10,
        direction: 'horizontal',
        loop: false,
        slidesPerView: 1,
        slidesPerGroup: 1,
        pagination: {
            el: ".swiper-pagination",

            clickable: true,
            renderBullet: function (index, className) {
                return '<span class="h-2.5 w-2.5 bg-amber-300 rounded-full ' + className + '"></span>';
            },
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                slidesPerGroup: 2,
            },
            1024: {
                slidesPerView: 3,
                slidesPerGroup: 3,
            }
        }
    });
});

setupTooltip();

document.querySelector('.animated-button').addEventListener('click', function (e) {
    this.classList.add('animate');
});