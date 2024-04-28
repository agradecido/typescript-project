import {Swiper} from 'swiper';
import {AppConfig} from "../AppConfig";
import {RenderSwiperSteps} from "./RenderSwiperSteps";

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

    private async init(): Promise<void> {
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

        // Adding click event to swiper slides
        document.querySelectorAll('.swiper-slide').forEach((slide, index) => {
            slide.addEventListener('click', () =>{
                // Show div for the step
                console.log ('index: ', index+1);
                console.log ('maxStep', AppConfig.maxStep);

                if ( index < AppConfig.maxStep  ) {
                    AppConfig.showStepContainer(index+1);
                    this.goToSlide(index+1);
                }
            });
        });
    }

    public nextSlide(): void {
        if (this.swiper) {
            const currentStep = this.swiper.activeIndex + 1;
            this.step[currentStep]?.classList.remove('step__active');
            this.swiper.slideNext();
            const newStep = currentStep + 1;
            this.step[newStep]?.classList.add('step__active');
        }
    }

    public prevSlide(): void {
        if (this.swiper) {
            const currentStep = this.swiper.activeIndex + 1;
            Object.values(this.step).forEach(step => step.classList.remove('step__active'));
            this.step[currentStep]?.classList.add('step__active');
        }
    }

    public async goToSlide(index: number): Promise<void> {
        if (this.swiper) {
            this.nextSlide();
            Object.values(this.step).forEach(step => step.classList.remove('step__active'));
            this.step[index]?.classList.add('step__active');
            AppConfig.showStepContainer(index);
        }
    }
}
