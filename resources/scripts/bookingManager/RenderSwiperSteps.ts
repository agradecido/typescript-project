// RenderSwiperSteps.ts
import {AppConfig} from './AppConfig';
import {Office} from "./api/Office";
import {SwiperHandler} from './handlers/SwiperHandler';

export class RenderSwiperSteps {
    private summaryElement: HTMLElement;
    private office: Office;
    public swiper: SwiperHandler;

    constructor() {
        this.summaryElement = AppConfig.step1Container;
        this.office = new Office();
        this.swiper = new SwiperHandler;
    }

    public async show(step: string = "step1"): Promise<void> {
        this.summaryElement.innerHTML = await this.render(step);
        this.summaryElement.classList.remove('hidden');
    }

    public hide(): void {
        this.summaryElement?.classList.add('hidden');
    }

    public async render(step: string): Promise<string> {
        console.log('Render step:', step);
        switch (step) {
            case 'step1':
                return await this.renderStep1();
            case 'step2':
                return this.renderStep2();
            case 'step3':
                this.renderStep3();
                return '';
            case 'step4':
                return this.renderStep4();
            case 'step5':
                return this.renderStep5();
            default:
                return '';
        }
    }

    // public update(update: Partial<BookingSummaryDataType>): void {
    //     Object.assign(this.summaryElement, update);
    // }

    /**
     * Particular renders
     */
    private async renderStep1(): Promise<string> {
        const options: Intl.DateTimeFormatOptions = {month: 'long', day: 'numeric'};
        const pickupDate = new Date(AppConfig.summaryData.pickupDate).toLocaleDateString("es-ES", options);
        const returnDate = new Date(AppConfig.summaryData.returnDate).toLocaleDateString("es-ES", options);
        const pickupLocationName = await this.office.getOfficeDetails(AppConfig.summaryData.pickupLocation);
        const returnLocationName = await this.office.getOfficeDetails(AppConfig.summaryData.returnLocation);

        return (
            '<h2 class="text-3xl">1. Zonas y periodo alquiler <i class="fas fa-check"></i></h2>' +
            '<div class="booking-summary py-4 pb-2">' +
            '<div class="flex flex-row justify-center booking-summary__data">' +
            '<div class="inline-block align-middle">' +
            '<ul><li>' +
            '<span>' + pickupLocationName + '</span>' +
            '</li><li>' +
            '<span> ' + pickupDate + ' ' + AppConfig.summaryData.pickupTime + '</span>' +
            '</li></ul>' +
            '</div>' +
            '<div class="step1__arrow inline-block align-middle pt-10 lg:pt-0"><br><i class="fas fa-arrow-right"></i></div>' +
            '<div class="inline-block align-middle">' +
            '<ul><li>' +
            '<span>' + returnLocationName + '</span>' +
            '</li>' +
            '<span>' + returnDate + ' ' + AppConfig.summaryData.returnTime + '</span>' +
            '</li></ul>' +
            '</div></div></div></div>'
        );

    }

    private renderStep2(): string {
        return (
            '<h2 class="text-3xl">2. Vehículo <i class="fas fa-check"></i></h2>' +
            '<div class="flex-col justify-between">' +
            '<span>' + AppConfig.summaryData.vehicleName + '</span>' +
            '<span><img src="' + AppConfig.summaryData.vehicleImage + '" alt="' + AppConfig.summaryData.vehicleName + '"></span>' +
            '</div>'
        );
    }

    private renderStep3(): void {
        this.updateExtrasStepHTML();
    }

    private updateExtrasStepHTML() {
        const extrasHtml = AppConfig.summaryData.extras.map((extra: any) => {
            return `<li class="extra-item">${extra.name}</li>`;
        }).join('');

        AppConfig.step3Container.innerHTML =
                `<div class="flex-col justify-between h-auto">` +
                `<h2 class="text-3xl">3. Extras <i class="fas fa-check"></i></h2>`+
                `<p>${AppConfig.summaryData.vehicleName}</p>` +
                `<ul class="step-extras-list">${extrasHtml}</ul>` +
                `</div>`;
    }


    private renderStep4(): string {
        return (
            '<div class="flex-col justify-between">' +
            '<span>Vehículo: </span>' +
            '<span>' + AppConfig.summaryData.vehicleName + '</span>' +
            '</div>'
        );
    }

    private renderStep5(): string {
        return (
            '<div class="flex-col justify-between">' +
            '<span>Vehículo: </span>' +
            '<span>' + AppConfig.summaryData.vehicleName + '</span>' +
            '</div>'
        );
    }

}
