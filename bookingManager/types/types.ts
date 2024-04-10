// types.ts
export interface BookingSummaryData {
    vehicleName: string;
    pickupDate: string;
    pickupTime: string;
    returnDate: string;
    returnTime: string;
    pickupLocation: string;
    returnLocation: string;
    price: string;
    extras: string[];
}
