// VehicleSelectionHandler.ts
import { IBookingSummary } from './interfaces/IBookingProcess';
import { IAPIHandler } from './interfaces/IAPIHandler';

export class VehicleSelectionHandler {
    private apiHandler: IAPIHandler;
    private containerId: string;
    private bookingSummary: IBookingSummary;

    constructor(apiHandler: IAPIHandler, containerId: string, bookingSummary: IBookingSummary) {
        this.apiHandler = apiHandler;
        this.containerId = containerId;
        this.bookingSummary = bookingSummary;
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