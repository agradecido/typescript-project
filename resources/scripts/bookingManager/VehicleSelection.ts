// VehicleSelection.ts
import {AppConfig} from './AppConfig';
import {IAPIHandler} from './interfaces/IAPIHandler';
import {ErrorDisplay} from "../utils/ErrorDisplay";
import {Summary} from "./Summary";
import {Vehicle} from "./api/Vehicle";
import { SwiperHandler } from './handlers/SwiperHandler';

export class VehicleSelection {
    private apiHandler: IAPIHandler;
    private errorDisplay = new ErrorDisplay();
    private summary = new Summary();
    private vehicleApi = new Vehicle();
    private swiperHandler = new SwiperHandler();

    constructor(apiHandler: IAPIHandler) {
        this.apiHandler = apiHandler;
    }

    public async getAvailableVehicles(formData: FormData): Promise<string | undefined> {
        try {
            const response = await this.apiHandler.postData({
                url: AppConfig.checkVehicleAvailabilityEndpoint,
                data: formData
            });
            const vehicles = JSON.parse(response);
            const vehiclesList = vehicles.data;
            if (vehiclesList && typeof vehiclesList === 'string') {
                return this.getAvailableVehiclesHTML(vehiclesList);
            } else if (vehiclesList && Array.isArray(vehiclesList)) {
                // @ts-ignore
                return this.getAvailableVehiclesHTML(vehiclesList);
            } else {
                await this.errorDisplay.sendErrorToSession('Unexpected response format when checking vehicles availability');
            }
        } catch (error) {
            // @ts-ignore
            await this.errorDisplay.sendErrorToSession('Error in checkVehiclesAvailability: ' + error.message);
            // @ts-ignore
            throw new Error('Error in checkVehiclesAvailability: ' + error.message);
        }
    }

    private async getAvailableVehiclesHTML(vehicles: string): Promise<string | undefined> {
        try {
            const vehiclesHTMLJSON = await this.apiHandler.postData({
                url: AppConfig.getVehiclesByCategoryEndpoint,
                data: {vehicles}
            });
            const vehiclesHTML = JSON.parse(vehiclesHTMLJSON).data;
            if (vehiclesHTML && typeof vehiclesHTML === 'string') {
                return vehiclesHTML;
            } else {
                console.log('Unexpected response format when getting category vehicles');
                await this.errorDisplay.sendErrorToSession('Unexpected response format when getting category vehicles');
            }
        } catch (error) {
            console.error('Error in getAvailableVehiclesHTML:', error);
            await this.errorDisplay.sendErrorToSession('Error in getAvailableVehiclesHTML: ' + error);
            throw new Error('Error in getAvailableVehiclesHTML: ' + error);
        }
    }

    public attachEventListenersToButtons(): void {
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

        const vehicleId = target.getAttribute('data-category');
        if (!vehicleId) {
            console.error('Vehicle category not found');
            return;
        }

        try {
            const vehicleDetails = await this.vehicleApi.getVehicleDetails(vehicleId);
            // @ts-ignore
            AppConfig.summaryData['vehicleImage'] = vehicleDetails['image'];
            // @ts-ignore
            AppConfig.summaryData['vehicleName'] = vehicleDetails['name'];
            this.summary.show('step2');
            const topScroll = document.getElementById('topScroll');
            topScroll?.scrollIntoView({behavior: 'smooth', block: 'start'});
            // Here we go to the Extras Selecion Steps
            // Hide this container
            // Load Extras container

        } catch (error) {
            console.error('Error fetching vehicle details:', error);
            await this.errorDisplay.sendErrorToSession('Error fetching vehicle details: ' + error);
        }

    }

}
