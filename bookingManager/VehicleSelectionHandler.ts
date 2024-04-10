// VehicleSelectionHandler.ts
import { IBookingSummary, IVehicleSelectionHandler } from './interfaces/IBookingProcess';
import { WebcarAPIHandler } from './api/WebcarAPIHandler';

export class VehicleSelectionHandler implements IVehicleSelectionHandler {
    private apiHandler: WebcarAPIHandler;

    constructor(apiHandler: WebcarAPIHandler, private containerId: string) {
        this.apiHandler = apiHandler;
    }
    async getAvailableVehicles(formData: FormData): Promise<void> {
        try {
            const vehiclesHTML = await this.apiHandler.postData({
                url: '?action=check_vehicles_availability',
                data: formData
            });
            this.renderVehicles(vehiclesHTML);
        } catch (error) {
            console.error("Failed to load vehicles:", error);
            // Handle the error appropriately
        }
    }

    renderVehicles(vehiclesHTML: string): void {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = vehiclesHTML;
        }
    }
}