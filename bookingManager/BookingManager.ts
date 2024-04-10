import { BookingSummary } from './BookingSummary';
import { VehicleSelectionHandler } from './VehicleSelectionHandler';
import { ExtrasHandler } from './ExtrasHandler';
import { IBookingSummary, IVehicleSelectionHandler, IExtrasHandler } from './interfaces/IBookingProcess';
import { WebcarAPIHandler } from './api/WebcarAPIHandler';

export class BookingManager {
    private readonly bookingSummary: IBookingSummary;
    private vehicleSelectionHandler: IVehicleSelectionHandler;
    private extrasHandler: IExtrasHandler;

    constructor(apiBaseUrl: string) {
        const apiHandler = new WebcarAPIHandler(apiBaseUrl);
        this.bookingSummary = new BookingSummary("bookingSummary");
        this.vehicleSelectionHandler = new VehicleSelectionHandler(apiHandler, 'vehicles-container-id', this.bookingSummary);
        this.extrasHandler = new ExtrasHandler(apiHandler, 'extras-container-id', this.bookingSummary);
    }
}
