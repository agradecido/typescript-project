// Vehicles.ts
import {WebcarAPIHandler} from '../APIHandler';
import {ErrorDisplay} from "../../utils/ErrorDisplay";
import { StepsHandler } from '../domHandlers/StepsHandler';

interface Vehicle {
    // Define the properties of a vehicle here
}
export class Vehicles {
    apiHandler: WebcarAPIHandler;
    stepsHandler: StepsHandler;

    constructor(apiHandler: WebcarAPIHandler, stepsHandler: StepsHandler) {
        this.apiHandler = apiHandler;
        this.stepsHandler = stepsHandler;
    }

    errorDisplay = new ErrorDisplay();

    async checkVehiclesAvailability(formData: FormData): Promise<string | undefined> {
        try {
            const vehicles = await this.apiHandler.postData('?action=check_vehicles_availability', formData);
            if (vehicles && typeof vehicles.data === 'string') {
                return await this.getAvailableVehiclesHTML(vehicles);
            } else if (vehicles && Array.isArray(vehicles.data)) {
                return await this.getAvailableVehiclesHTML(vehicles.data);
            } else {
                await this.errorDisplay.sendErrorToSession('Unexpected response format when checking vehicles availability');
           }
        } catch (error) {
            await this.errorDisplay.sendErrorToSession('Error in check_vehicles_availability');
            throw error;
        }
    }

    async getAvailableVehiclesHTML(vehicles: Vehicle[]): Promise<string> {
        this.stepsHandler.completeStep(1);
        const vehiclesDetails = await this.apiHandler.postData('?action=get_vehicles_by_category', {vehicles});
        if (vehiclesDetails && typeof vehiclesDetails.data === 'string') {
            return vehiclesDetails.data;
        } else {
            // console.error('Unexpected response format:', vehiclesDetails);
            await this.errorDisplay.sendErrorToSession('Unexpected response format when getting category vehicles');
            throw new Error('Unexpected response format');
        }
    }
}
