import {AppConfig} from "../AppConfig";
import {BookingSummaryDataType} from '../types/types';
import {Summary} from '../Summary';
import {VehicleSelection} from '../VehicleSelection';
import {APIHandler} from '../api/APIHandler';
import {SwiperHandler} from './SwiperHandler';

export class FormHandler {
    private readonly bookingSummary: Summary;
    private vehicleSelectionHandler: VehicleSelection;
    private swiperHandler = new SwiperHandler();

    constructor() {
        const apiHandler = new APIHandler(AppConfig.apiBaseUrl);
        this.bookingSummary = new Summary();
        this.vehicleSelectionHandler = new VehicleSelection(apiHandler);
        this.attachEventListeners();
    }

    private attachEventListeners(): void {
        let mainForm: HTMLFormElement;
        mainForm = document.getElementById(AppConfig.formContainerId) as HTMLFormElement;
        if (mainForm) {
            mainForm.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }

    private async handleFormSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const bookingCarButton = document.getElementById(AppConfig.bookingSubmitButtonId) as HTMLButtonElement;
        this.changeButtonState(bookingCarButton, 'loading');
        const vehicleListContainer = document.getElementById(AppConfig.vehiclesListContainerId);
        const formContainer = document.getElementById(AppConfig.formContainerId);
        const formData = new FormData(event.target as HTMLFormElement);
        const bookingData = this.extractFormData(formData);
        const Summary = this.bookingSummary;
        AppConfig.update(bookingData);

        try {
            const vehiclesHTML = await this.vehicleSelectionHandler.getAvailableVehicles(formData);
            if (vehicleListContainer && vehiclesHTML) {
                formContainer?.classList.add('hidden');
                vehicleListContainer.innerHTML = vehiclesHTML;
                vehicleListContainer.classList.remove('hidden');
                this.vehicleSelectionHandler.attachEventListenersToButtons();
                Summary.show('step1');
                const topScroll = document.getElementById('topScroll');
                topScroll?.scrollIntoView({behavior: 'smooth', block: 'start'});
                this.swiperHandler.nextSlide();
            }
        } catch (error) {
            console.error("Error processing form submission:", error);
            this.changeButtonState(bookingCarButton, 'enabled');
        }
    }

    private extractFormData(formData: FormData): BookingSummaryDataType {
        return {
            vehicleName: '',
            vehicleCategory: '',
            vehicleImage: '',
            pickupDate: formData.get('date_from') as string,
            pickupTime: formData.get('time_from') as string,
            returnDate: formData.get('date_to') as string,
            returnTime: formData.get('time_to') as string,
            pickupLocation: formData.get('from') as string,
            returnLocation: formData.get('to') as string,
            totalDays: 0,
            price: '',
            extras: []
        };
    }

    private changeButtonState(submitButton: HTMLButtonElement, state: 'loading' | 'enabled' | 'disabled'): void {
        switch (state) {
            case 'loading':
                submitButton.textContent = 'Comprobando disponibilidad';
                submitButton.classList.add('animate');
                submitButton.classList.remove('bg-amber-100');
                submitButton.classList.add('bg-amber-400', 'hover:bg-amber-400');
                submitButton.disabled = true;
                break;
            case 'enabled':
                submitButton.classList.remove('animate');
                submitButton.textContent = 'Buscar';
                submitButton.classList.add('bg-amber-100');
                submitButton.disabled = false;
                break;
            case 'disabled':
                submitButton.textContent = 'Buscar';
                submitButton.classList.remove('bg-amber-400', 'hover:bg-amber-400');
                submitButton.classList.add('bg-amber-100');
                submitButton.disabled = true;
                break;
        }
    }
}
