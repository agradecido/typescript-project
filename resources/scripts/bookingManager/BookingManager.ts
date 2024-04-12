// BookingManager.ts
import { AppConfig } from './AppConfig';
import { Summary } from './Summary';
import { VehicleSelection } from './VehicleSelection';
import { Extras } from './Extras';
import { IBookingSummary, IVehicleSelectionHandler, IExtrasHandler } from './interfaces/IBookingProcess';
import { APIHandler } from './api/APIHandler';


export class BookingManager {
    private readonly bookingSummary: IBookingSummary;
    private vehicleSelectionHandler: VehicleSelection;
    private extrasHandler: IExtrasHandler;

    constructor(apiBaseUrl: string) {
        const apiHandler = new APIHandler(apiBaseUrl);
        this.bookingSummary = new Summary();
        this.vehicleSelectionHandler = new VehicleSelection(apiHandler);
        this.extrasHandler = new Extras(apiHandler);
    }
}
