// controllers/Extras.ts
import {WebcarAPIHandler} from '../APIHandler';
import {ErrorDisplay} from "../../utils/ErrorDisplay";
import {ExtrasHandler} from "../domHandlers/ExtrasHandler";

export class Extras {
    apiHandler: WebcarAPIHandler;
    domHandlerExtras: ExtrasHandler;
    bookingData: FormData;

    constructor(apiHandler: WebcarAPIHandler, bookingData: FormData) {
        this.apiHandler = apiHandler;
        this.domHandlerExtras = new ExtrasHandler('extrasContainerId', 'loadExtrasButton', bookingData);
        this.bookingData = bookingData;
    }

    errorDisplay = new ErrorDisplay();

    async getExtras(category: string, totalDays: string): Promise<string | undefined> {
        this.bookingData.append('category', category);
        this.bookingData.append('total_days', totalDays);

        for (const [key, value] of this.bookingData.entries()) {
            console.log(`${key}: ${value}`);
        }

        const extras = await this.apiHandler.postData('?action=get_vehicle_extras', this.bookingData);
        if (extras && typeof extras.data === 'string') {
            console.log('Extras: ', extras.data);
            return extras.data;
        } else {
            console.error('Unexpected response format:', extras);
            await this.errorDisplay.sendErrorToSession('Unexpected response format when getting extras');
            throw new Error('Unexpected response format');
        }
    }

    /** Load extras button **/
    async loadExtras(category: string, totalDays: string): Promise<void> {
        console.log('category:', category, 'totalDays:', totalDays);
        const vehicleExtras = await this.getExtras(category, totalDays);
        if (!vehicleExtras) {
            console.error('No extras found');
            return;
        }
        this.domHandlerExtras.insertHTML(vehicleExtras);
    }

    public addExtrasToBookingData(extras: any): void {
        for (const [key, value] of extras.entries()) {
            this.bookingData.append(key, value);
        }
    }
}