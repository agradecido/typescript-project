import { IBookingSummary, IExtrasHandler } from './interfaces/IBookingProcess';

export class ExtrasHandler implements IExtrasHandler {
    constructor(private summary: IBookingSummary) {}

    toggleExtra(extraId: string, isChecked: boolean): void {
        this.summary.updateExtras(extraId, isChecked);
        console.log(`Extra ${extraId} toggled to ${isChecked}`);
    }
}
