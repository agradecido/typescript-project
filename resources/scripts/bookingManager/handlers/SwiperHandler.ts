import {Swiper} from 'swiper';
import {AppConfig} from "../AppConfig";
import {RenderSwiperSteps} from "../RenderSwiperSteps";

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
            console.log('Go to slide', index);
            this.nextSlide();
            // this.swiper.slideTo(index - 1); // Convert 1-based index to 0-based
            Object.values(this.step).forEach(step => step.classList.remove('step__active'));
            this.step[index]?.classList.add('step__active');
            // const swiperSteps = new RenderSwiperSteps();
            // switch (index) {
            //     case 4: {
            //         await swiperSteps.render('step3');
            //         // console.log(AppConfig.summaryData);
            //         // console.log(AppConfig.summaryData.extras);
            //         // @ts-ignore
            //         /**
            //          AppConfig.step3Container.innerHTML = AppConfig.summaryData.extras.map((extra: { name: string; quantity: number; pricePerDay: number; }) => {
            //          return `<div class="flex justify-between items-center p-3 border-b border-gray-200">
            //          <div class="flex items center">
            //          <span class="font-semibold">${extra.name}</span>
            //          <span class="text-gray-500 ml-2">x${extra.quantity}</span>
            //          </div>
            //          <span class="font-semibold">${extra.pricePerDay}</span>
            //          </div>`;
            //          });
            //          AppConfig.formalizationContainer?.classList.remove('hidden');
            //          **/
            //         break;
            //     }
            // }
        }
    }
}
