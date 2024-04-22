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
    price: number;
    totalDays: number;
    extras: Array<{
        id: string;
        name: string;
        pricePerDay: number;
        quantity: number;
    }>;
}
