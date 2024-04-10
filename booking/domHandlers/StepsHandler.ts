// domHandlers/StepsHandler.ts
export {StepsHandler};

import {swiperPromise} from '../main';
import Swiper from 'swiper';

class StepsHandler {
    private readonly containers: string[];
    private stepCurrent: number = 1;
    public bookingData: FormData;
    private swiper: Swiper | null = null;
    private readonly stepsCompleted: boolean[];

    constructor(containers: string[], bookingData: FormData) {
        this.containers = containers;
        this.bookingData = bookingData;
        this.stepsCompleted = new Array(containers.length).fill(false);
        this.initializeProcess().then();
    }

    async initializeProcess() {
        this.swiper = await swiperPromise;
        this.updateStepsUI();
        // @ts-ignore
        document.getElementById('swiperBookingSteps-button-prev').addEventListener('click', () => {
            this.goToPreviousStep();
        });
        // @ts-ignore
        document.getElementById('swiperBookingSteps-button-next').addEventListener('click', () => {
            this.goToNextStep();
        });

        if (this.swiper) {
            this.swiper.on('slideChange', () => {
                // @ts-ignore
                this.stepCurrent = this.swiper.activeIndex + 1;
                this.updateStepsUI();
            });
        }
    }

    private updateStepsUI(): void {

        this.containers.forEach((containerId, index) => {
            const container = document.getElementById(containerId);
            if (container) {
                if (index + 1 === this.stepCurrent) {
                    container.classList.remove('hidden');
                    container.classList.add('grid');
                } else {
                    container.classList.remove('grid');
                    container.classList.add('hidden');
                }
            }
        });

        document.querySelectorAll('.step').forEach((stepElement, index) => {
            const stepIndex = index + 1;
            const isActiveStep = stepIndex === this.stepCurrent;

            if (isActiveStep) {
                stepElement.classList.add('step__active');
                stepElement.classList.remove('step__disabled'); // Asegúrate de que el paso actual no esté desactivado
            } else {
                stepElement.classList.remove('step__active');
            }

            // Desactiva los pasos futuros a los que aún no se ha accedido
            // Los pasos futuros son aquellos cuyo índice es mayor al paso actual
            // if (stepIndex > this.stepCurrent) {
            //     console.log('disabling future step:', stepElement);
            //     stepElement.classList.add('step__disabled');
            // } else {
            //     // Asegúrate de que los pasos anteriores y el actual no estén desactivados
            //     stepElement.classList.remove('step__disabled');
            // }
        });
    }

    private goToNextStep(): void {

        console.log('move swiper', this.stepCurrent, this.containers.length, this.stepsCompleted[this.stepCurrent - 1])
        if (this.stepCurrent < this.containers.length && this.stepsCompleted[this.stepCurrent - 1]) {
            this.stepCurrent++;
            this.updateStepsUI();
            this.swiper?.slideTo(this.stepCurrent - 1);

            this.containers.forEach((containerId, index) => {
                console.log('containerId', containerId, index, this.stepCurrent)
                if (index + 1 === this.stepCurrent) {
                    const container = document.getElementById(containerId);
                    if (container) {
                        container.classList.remove('hidden');
                        container.classList.add('grid');
                    }
                }
            });
        }
    }

    private goToPreviousStep(): void {
        if (this.stepCurrent > 1) {
            this.stepCurrent--;
            this.updateStepsUI();
            this.swiper?.slideTo(this.stepCurrent - 1);
        }
    }

    public completeStep(stepNumber: number): void {
        if (stepNumber >= 1 && stepNumber <= this.stepsCompleted.length) {
            this.stepsCompleted[stepNumber - 1] = true;
            this.goToNextStep();
        }
    }

}
