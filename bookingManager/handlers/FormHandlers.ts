import { BookingSummary } from '../BookingSummary';
import { VehicleSelectionHandler } from '../VehicleSelectionHandler';
import { ExtrasHandler } from '../ExtrasHandler';
import { WebcarAPIHandler } from '../api/WebcarAPIHandler';

export class FormHandler {
    private readonly bookingSummary: BookingSummary;
    private vehicleSelectionHandler: VehicleSelectionHandler;
    private extrasHandler: ExtrasHandler;

    constructor() {
        const apiHandler = new WebcarAPIHandler('/wp/wp-admin/admin-ajax.php');
        this.bookingSummary = new BookingSummary("bookingSummary");
        this.vehicleSelectionHandler = new VehicleSelectionHandler(apiHandler, 'vehicles-container-id', this.bookingSummary);
        this.extrasHandler = new ExtrasHandler(apiHandler, 'extras-container-id', this.bookingSummary);
        this.attachEventListeners();
    }

    private attachEventListeners(): void {
        const form = document.getElementById('rentform') as HTMLFormElement;
        if (form) {
            form.addEventListener('submit', this.handleFormSubmit.bind(this));
        }
    }

    private async handleFormSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);

        try {
            await this.vehicleSelectionHandler.getAvailableVehicles(formData);
            await this.extrasHandler.toggleExtras(formData);
        } catch (error) {
            console.error("Error processing form submission:", error);
        }
    }
}
