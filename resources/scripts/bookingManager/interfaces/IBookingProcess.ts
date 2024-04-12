import { BookingSummaryDataType } from '../types/types';

export interface IBookingSummary {
    show(step: string): void;
    hide(): void;
    getData(): BookingSummaryDataType;
    update(data: BookingSummaryDataType): void;
}

export interface IVehicleSelectionHandler {
    checkVehiclesAvailability(formData: FormData): Promise<string | undefined>;
    getAvailableVehicles(formData: FormData): Promise<void>;
}

export interface IExtrasHandler {
    toggleExtra(extraId: string, isChecked: boolean): void;
}

