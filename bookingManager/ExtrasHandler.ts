import { IExtrasHandler } from './interfaces/IBookingProcess';
import { IBookingSummary } from './interfaces/IBookingProcess';
import { IAPIHandler } from './interfaces/IAPIHandler';

export class ExtrasHandler implements IExtrasHandler {
    private apiHandler: IAPIHandler;
    private containerId: string;
    private bookingSummary: IBookingSummary;

    constructor(apiHandler: IAPIHandler, containerId: string, bookingSummary: IBookingSummary) {
        this.apiHandler = apiHandler;
        this.containerId = containerId;
        this.bookingSummary = bookingSummary;
    }

    async toggleExtras(formData: FormData): Promise<void> {
        // Implement the logic to handle multiple extras
        console.log("Toggling extras based on form data");
        // Example: iterate over formData and use toggleExtra for individual items
        for (let [key, value] of formData) {
            if (key.startsWith('extra_')) {
                await this.toggleExtra(key, Boolean(value));
            }
        }
    }

    async toggleExtra(extraId: string, isChecked: boolean): Promise<void> {
        // Implement the logic to toggle a specific extra
        console.log(`Toggling extra: ${extraId}, Checked: ${isChecked}`);
        // Optionally update the booking summary or handle API calls
    }
}