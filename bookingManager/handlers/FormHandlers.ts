import { WebcarAPIHandler } from '../api/WebcarAPIHandler';
import { VehicleSelectionHandler } from '../VehicleSelectionHandler';

export class FormHandler {
    private vehicleHandler: VehicleSelectionHandler;

    constructor() {
        const apiHandler = new WebcarAPIHandler('https://yourapi.com/');
        this.vehicleHandler = new VehicleSelectionHandler(apiHandler, 'vehicles-container-id');
        this.attachEventListeners();
    }

    private attachEventListeners(): void {
        const form = document.getElementById('rentform') as HTMLFormElement;
        form.addEventListener('submit', this.handleSubmit.bind(this));
    }

    private async handleSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        await this.vehicleHandler.getAvailableVehicles(formData);
    }
}

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    new FormHandler();
});
