import {IBookingSummary} from './interfaces/IBookingProcess';
import {BookingSummaryData} from './types/types';

export class BookingSummary implements IBookingSummary {
    private readonly data: BookingSummaryData;
    private summaryElement: HTMLElement;

    constructor(summaryElementId: string) {
        this.summaryElement = document.getElementById(summaryElementId) as HTMLElement;
        this.data = {
            vehicleName: '',
            pickupDate: '',
            pickupTime: '',
            returnDate: '',
            returnTime: '',
            pickupLocation: '',
            returnLocation: '',
            price: '',
            extras: []
        };
    }

    updateData(update: Partial<BookingSummaryData>): void {
        Object.assign(this.data, update);
        this.render();
    }

    updateExtras(extraId: string, isChecked: boolean): void {
        if (isChecked) {
            this.data.extras.push(extraId);
        } else {
            this.data.extras = this.data.extras.filter((extra: string) => extra !== extraId);
        }
        this.render();
    }

    private render(): void {
        this.summaryElement.innerHTML = `
            <h3>Booking Summary</h3>
            <p>Vehicle: ${this.data.vehicleName}</p>
            <p>Pickup: ${this.data.pickupDate} at ${this.data.pickupTime}</p>
            <p>Return: ${this.data.returnDate} at ${this.data.returnTime}</p>
            <p>Pickup Location: ${this.data.pickupLocation}</p>
            <p>Return Location: ${this.data.returnLocation}</p>
            <p>Extras: ${this.data.extras.join(', ')}</p>
        `;
    }
}
