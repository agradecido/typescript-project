// Summary.ts
import {AppConfig} from './AppConfig';
import {BookingSummaryDataType} from './types/types';

export class Summary {
    private summaryElement: HTMLElement;

    constructor() {
        this.summaryElement = AppConfig.step1Container;
    }

    private setStep(step: string = 'step1') {
        switch (step) {
            case 'step1':
                this.summaryElement = AppConfig.step1Container;
                break;
            case 'step2':
                this.summaryElement = AppConfig.step2Container;
                break;
            case 'step3':
                this.summaryElement = AppConfig.step3Container;
                break;
            case 'step4':
                this.summaryElement = AppConfig.step4Container;
                break;
            case 'step5':
                this.summaryElement = AppConfig.step5Container;
                break;
            default:
                this.summaryElement = AppConfig.step1Container;
        }
    }

    public show(step: string = "step1" ): void {
        this.setStep(step);
        this.summaryElement.innerHTML = this.render(step);
        this.summaryElement.classList.remove('hidden');
    }

    public getData(): BookingSummaryDataType {
        return AppConfig.summaryData;
    }

    public hide(): void {
        this.summaryElement?.classList.add('hidden');
    }

    private render(step: string): string {
        switch (step) {
            case 'step1':
                return this.renderStep1();
            case 'step2':
                return this.renderStep2();
            case 'step3':
                return this.renderStep3();
            case 'step4':
                return this.renderStep4();
            case 'step5':
                return this.renderStep5();
            default:
                return this.renderStep1();
        }
    }

    private renderStep1(): string {
        const summaryData = AppConfig.summaryData;
        const options: Intl.DateTimeFormatOptions = {year: 'numeric', month: 'long', day: 'numeric'};
        const pickupDate = new Date(summaryData.pickupDate).toLocaleDateString("es-ES", options);
        const returnDate = new Date(summaryData.returnDate).toLocaleDateString("es-ES", options);
        return (
            '<h2 class="text-3xl">1. Zonas y periodo alquiler <i class="fas fa-check"></i></h2>' +
            '<div class="booking-summary p-4">' +
            '<div class="flex flex-row justify-center booking-summary__data">' +
            '<div class="inline-block align-middle">' +
            '<ul><li>' +
            '<span>' + summaryData.pickupLocation + '</span>' +
            '</li><li>' +
            '<span> ' + pickupDate + '<br>' + summaryData.pickupTime + '</span>' +
            '</li></ul>' +
            '</div>' +
            '<div class="inline-block align-middle pt-10"><br><i class="fas fa-arrow-right"></i></div>' +
            '<div class="inline-block align-middle">' +
            '<ul><li>' +
            '<span>' + summaryData.returnLocation + '</span>' +
            '</li>' +
            '<span>' + returnDate + '<br>' + summaryData.returnTime + '</span>' +
            '</li></ul>' +
            '</div></div></div></div>'
        );

    }

    private renderStep2(): string {
        const summaryData = AppConfig.summaryData;
        return (
            '<h2 class="text-3xl">2. Vehículo <i class="fas fa-check"></i></h2>' +
            '<div class="flex-col justify-between">' +
            '<span>' + summaryData.vehicleName + '</span>' +
            '<span><img src="' + summaryData.vehicleImage + '" alt="' + summaryData.vehicleName + '"></span>' +
            '</div>'
        );
    }

    private renderStep3(): string {
        const summaryData = AppConfig.summaryData;
        return (
            '<div class="flex-col justify-between">' +
            '<span>Vehículo: </span>' +
            '<span>' + summaryData.vehicleName + '</span>' +
            '</div>'
        );
    }

    private renderStep4(): string {
        const summaryData = AppConfig.summaryData;
        return (
            '<div class="flex-col justify-between">' +
            '<span>Vehículo: </span>' +
            '<span>' + summaryData.vehicleName + '</span>' +
            '</div>'
        );
    }

    private renderStep5(): string {
        const summaryData = AppConfig.summaryData;
        return (
            '<div class="flex-col justify-between">' +
            '<span>Vehículo: </span>' +
            '<span>' + summaryData.vehicleName + '</span>' +
            '</div>'
        );
    }

    public update(update: Partial<BookingSummaryDataType>): void {
        Object.assign(this.summaryElement, update);
    }

}
