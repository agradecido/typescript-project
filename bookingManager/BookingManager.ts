import { BookingSummary } from './BookingSummary';
import { VehicleSelectionHandler } from './VehicleSelectionHandler';
import { ExtrasHandler } from './ExtrasHandler';
import { IBookingSummary, IVehicleSelectionHandler, IExtrasHandler } from './interfaces/IBookingProcess';

export class BookingManager {
    private readonly bookingSummary: IBookingSummary;
    private vehicleSelectionHandler: IVehicleSelectionHandler;
    private extrasHandler: IExtrasHandler;

    constructor() {
        this.bookingSummary = new BookingSummary("bookingSummary");
        this.vehicleSelectionHandler = new VehicleSelectionHandler(this.bookingSummary);
        this.extrasHandler = new ExtrasHandler(this.bookingSummary);
        this.setupListeners();
    }

    private setupListeners(): void {
        const form = document.getElementById('rentform') as HTMLFormElement;
        form.addEventListener('submit', this.handleFormSubmit.bind(this));
    }

    private handleFormSubmit(event: Event): void {
        event.preventDefault(); // Prevent the form from submitting normally

        const form = event.target as HTMLFormElement;
        const formData = new FormData(form);

        const from = formData.get('from') as string;
        const to = formData.get('to') as string;
        const dateFrom = formData.get('date_from') as string;
        const timeFrom = formData.get('time_from') as string;
        const dateTo = formData.get('date_to') as string;
        const timeTo = formData.get('time_to') as string;
        const vehicleClass = formData.get('vehicle_class') as string;

        // Update booking summary based on the form data
        this.bookingSummary.updateData({
            pickupLocation: from,
            returnLocation: to,
            pickupDate: dateFrom,
            pickupTime: timeFrom,
            returnDate: dateTo,
            returnTime: timeTo,
            vehicleName: vehicleClass // Assuming you want to display the vehicle class
        });

        console.log("Form submitted:", from, to, dateFrom, timeFrom, dateTo, timeTo, vehicleClass);
        // You can add more logic here to process the booking
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new BookingManager();
});
