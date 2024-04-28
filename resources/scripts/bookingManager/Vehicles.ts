// Vehicles.ts
import {AppConfig} from './AppConfig';
import {Vehicle} from "./api/Vehicle";
import {Extras} from './Extras';
import {BookingSummaryDataType} from "./types/types";

export class Vehicles {
    private vehicleApi = new Vehicle();

    constructor(formData: FormData) {
        this.renderVehiclesList(formData).then(
            () => {
                // console.log('Vehicles list rendered');
            }
        )
    }

    public async renderVehiclesList(formData: FormData): Promise<void> {
        AppConfig.changeButtonState(AppConfig.bookingSubmitButton, 'loading');
        AppConfig.summaryData = this.extractFormData(formData);

        try {
            const vehiclesHTML = await this.getAvailableVehicles(formData);
            if (AppConfig.vehiclesListContainer && vehiclesHTML)
            {
                AppConfig.formContainer.classList.add('hidden');
                AppConfig.vehiclesListContainer.innerHTML = vehiclesHTML;
                AppConfig.vehiclesListContainer.classList.remove('hidden');
                this.attachEventListenersToButtons();
                await AppConfig.swiperSteps.show('step1');
                AppConfig.update(AppConfig.summaryData);
                AppConfig.topScroll?.scrollIntoView({behavior: 'smooth', block: 'start'});
                AppConfig.swiperHandler.nextSlide();
            }
        } catch (error) {
            console.error("Error processing form submission:", error);
            AppConfig.changeButtonState(AppConfig.bookingSubmitButton, 'enabled');
        }
    }

    private async getAvailableVehicles(formData: FormData): Promise<string | undefined> {
        AppConfig.hideErrors();

        formData.append('nonce', AppConfig.nonce);
        const response = await AppConfig.APIHandler.postData({
            url: AppConfig.checkVehicleAvailabilityEndpoint,
            data: formData
        });
        const vehicles = JSON.parse(response);

        if (!vehicles.success) {
            console.error('Vehicle error:', vehicles.data.message);
            AppConfig.showError(vehicles.data.message);
            // @ts-ignore
            AppConfig.changeButtonState(AppConfig.bookingSubmitButton, 'enabled');
            return;
        }
        else {
            const vehiclesList = vehicles.data;
            if (vehiclesList && typeof vehiclesList === 'string') {
                return this.getAvailableVehiclesHTML(vehiclesList);
            } else if (vehiclesList && Array.isArray(vehiclesList)) {
                // @ts-ignore
                return this.getAvailableVehiclesHTML(vehiclesList);
            } else {
                AppConfig.showError('No tenemos ningún vehículo disponible con sus parámetros de búsqueda');
            }
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
            price: 0,
            extras: [
                {id: '', name: '', quantity: 0, pricePerDay: 0}
            ]
        };
    }

    private async getAvailableVehiclesHTML(vehicles: string): Promise<string | undefined> {
        try {
            const vehiclesHTMLJSON = await AppConfig.APIHandler.postData({
                url: AppConfig.getVehiclesByCategoryEndpoint,
                data: {vehicles}
            });
            const vehiclesHTML = JSON.parse(vehiclesHTMLJSON).data;
            if (vehiclesHTML && typeof vehiclesHTML === 'string') {
                return vehiclesHTML;
            } else {
                console.error('Unexpected response format when getting category vehicles');
                // await this.errorDisplay.sendErrorToSession('Unexpected response format when getting category vehicles');
            }
        } catch (error) {
            AppConfig.showError('Error in getAvailableVehiclesHTML: ' + error);
        }
    }

    private attachEventListenersToButtons(): void {
        const buttons = document.querySelectorAll('.get-extras-btn');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => this.handleVehicleSelection(event));
        });
    }

    private async handleVehicleSelection(event: Event) {
        const target = event.target as HTMLElement;
        if (!target) {
            return;
        }

        AppConfig.changeButtonState(<HTMLButtonElement>event.target, 'loading', '...cargando...');
        const vehicleId = target.getAttribute('data-category');
        const vehiclePrice = target.getAttribute('data-price');

        if (!vehicleId) {
            AppConfig.showError('handleVehicleSelection');
            return;
        }

        try {
            const vehicleDetails = await this.vehicleApi.getVehicleDetails(vehicleId);
            // @ts-ignore
            AppConfig.summaryData['vehicleImage'] = vehicleDetails['image'];
            // @ts-ignore
            AppConfig.summaryData['vehicleName'] = vehicleDetails['name'];
            // await AppConfig.swiperSteps.show('step3');
            await AppConfig.swiperHandler.goToSlide(3);
            AppConfig.topScroll?.scrollIntoView({behavior: 'smooth', block: 'start'});
            AppConfig.summaryData.vehicleCategory = vehicleId;
            if (typeof vehicleDetails === "string") {
                // @ts-ignore
                AppConfig.summaryData.vehicleName = vehicleDetails['name'];
            }
            // @ts-ignore
            AppConfig.summaryData.price = vehiclePrice;
            // await this.step3Extras.getExtrasHTMLFromAPI();

            if ( AppConfig.maxStep < 2 ) {
                AppConfig.maxStep = 2;
            }

            new Extras();
            AppConfig.vehiclesListContainer.classList.add('hidden');
            AppConfig.changeButtonState(<HTMLButtonElement>event.target, 'disabled', 'Reservar');
            AppConfig.step2Container.innerHTML = await AppConfig.swiperSteps.render('step2');

        } catch (error) {
            AppConfig.showError('Error fetching vehicle details handleVehicleSelection: ' + error);
            console.error('Error fetching vehicle details handleVehicleSelection: ' + error);
            // await this.errorDisplay.sendErrorToSession('Error fetching vehicle details: ' + error);
        }
    }

}
