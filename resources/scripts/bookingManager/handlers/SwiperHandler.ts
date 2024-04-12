import {Swiper} from 'swiper';

export class SwiperHandler {
    public swiper: Swiper | undefined;
    public step: { [key: number]: HTMLElement; } = {};


    constructor() {
        this.init();
        this.step[1] = document.getElementById('step1') ?? document.createElement('div');
        this.step[2] = document.getElementById('step2') ?? document.createElement('div');
        this.step[3] = document.getElementById('step3') ?? document.createElement('div');
        this.step[4] = document.getElementById('step4') ?? document.createElement('div');
        this.step[5] = document.getElementById('step5') ?? document.createElement('div');
    }

    private init(): void {
        this.swiper = new Swiper('.swiperBookingSteps', {
            // Optional parameters
            direction: 'horizontal',
            loop: false,
            slidesPerView: 1,
            // If we need pagination
            pagination: {
                el: '.swiper-pagination',
            },
            // Navigation arrows
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            // And if we need scrollbar
            scrollbar: {
                el: '.swiper-scrollbar',
            },
            // responsive
            breakpoints: {
                1024: {
                    slidesPerView: 5,
                },
            },
        });
    }

    public nextSlide(): void {
        if (this.swiper) {
            console.log('nextSlide');
            const currentStep = this.swiper.activeIndex + 1;
            this.step[currentStep]?.classList.remove('step__active');
            this.swiper.slideNext();
            const newStep = currentStep + 1;
            this.step[newStep]?.classList.add('step__active');
            console.log(this.step[newStep]);
        }
    }

    public prevSlide(): void {
        if (this.swiper) {
            this.swiper.slidePrev();
            const currentStep = this.swiper.activeIndex + 1;
            Object.values(this.step).forEach(step => step.classList.remove('step__active'));
            this.step[currentStep]?.classList.add('step__active');
        }
    }

    public goToSlide(index: number): void {
        if (this.swiper) {
            this.swiper.slideTo(index - 1); // Convert 1-based index to 0-based
            Object.values(this.step).forEach(step => step.classList.remove('step__active'));
            this.step[index]?.classList.add('step__active');
        }
    }
}
