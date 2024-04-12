// AppConfig.ts
import { BookingSummaryDataType } from "./types/types";
import {SwiperHandler} from "./handlers/SwiperHandler";

export class AppConfig {
    static readonly formContainerId = 'formContainerId';
    static readonly extrasContainerId = 'extrasContainerId';
    static readonly summaryContainerId = 'summaryContainerId';
    static readonly vehiclesListContainerId = 'vehiclesListId';
    static readonly formalizationContainerId = 'formalizationContainerId';
    static readonly bookingStepsId = 'bookigStepsId';
    static readonly apiBaseUrl = '/wp/wp-admin/admin-ajax.php';
    static readonly bookingSubmitButtonId = 'bookingSubmitButtonId';
    static readonly bookingFormId = 'bookingFormId';

    static readonly step1Container = document.getElementById('step1')??document.createElement('div');
    static readonly step2Container = document.getElementById('step2')??document.createElement('div');
    static readonly step3Container = document.getElementById('step3')??document.createElement('div');
    static readonly step4Container = document.getElementById('step4')??document.createElement('div');
    static readonly step5Container = document.getElementById('step5')??document.createElement('div');

    // Endpoints
    static readonly checkVehicleAvailabilityEndpoint = '?action=check_vehicles_availability';
    static readonly getVehiclesByCategoryEndpoint = '?action=get_vehicles_by_category';
    static readonly getVehicleDetails = '?action=get_car_details';

    // Swiper Steps
    static swipperSteps = new(SwiperHandler);

    static summaryStepLocalizations = {
        pickupDate: "",
        pickupTime: "",
        returnDate: "",
        returnTime: "",
        pickupLocation: "",
        returnLocation: "",
        totalDays: 0,
    }

    static summaryStepVehicle = {
        vehicleName: "",
        vehicleCategory: "",
    }

    static summaryStepExtras = {
        extras: []
    }

    static summaryStepDriver = {
        extras: []
    }

    static summaryPrice = {
    }


    static summaryData: BookingSummaryDataType = {
        vehicleName: "",
        vehicleCategory: "",
        vehicleImage: "",
        pickupDate: "",
        pickupTime: "",
        returnDate: "",
        returnTime: "",
        pickupLocation: "",
        returnLocation: "",
        price: "",
        totalDays: 0,
        extras: []
    };

    // Método para actualizar los datos del sumario
    static update(newData: BookingSummaryDataType) {
        let startDate = new Date(newData.pickupDate).getTime();
        let endDate   = new Date(newData.returnDate).getTime();
        newData.totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
        AppConfig.summaryData = newData;
    }
}
