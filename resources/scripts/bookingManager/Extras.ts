import { AppConfig} from "./AppConfig";
import { IExtrasHandler } from './interfaces/IBookingProcess';
import { IBookingSummary } from './interfaces/IBookingProcess';
import { IAPIHandler } from './interfaces/IAPIHandler';

export class Extras implements IExtrasHandler {
    private apiHandler: IAPIHandler;
    private containerId: string;

    constructor(apiHandler: IAPIHandler) {
        this.apiHandler = apiHandler;
        this.containerId = AppConfig.extrasContainerId;
    }

    async toggleExtras(formData: FormData): Promise<void> {
        // Implement the logic to handle multiple extras
        // console.log("Toggling extras based on form data");
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