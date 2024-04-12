// types.ts
export interface BookingSummaryDataType {
    vehicleName: string;
    vehicleCategory: string;
    vehicleImage: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    pickupLocation: string;
    returnLocation: string;
    price: string;
    totalDays: number;
    extras: string[];
}
