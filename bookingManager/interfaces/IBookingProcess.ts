import { BookingSummaryData } from '../types/types';

export interface IBookingSummary {
    updateData(update: Partial<BookingSummaryData>): void;
    updateExtras(extraId: string, isChecked: boolean): void;
}

export interface IVehicleSelectionHandler {
    getAvailableVehicles(formData: FormData): Promise<void>;
    renderVehicles(vehiclesHTML: string): void;
}

export interface IExtrasHandler {
    toggleExtra(extraId: string, isChecked: boolean): void;
}
