// AppConfig.ts
import {BookingSummaryDataType} from "./types/types";
import {SwiperHandler} from "./handlers/SwiperHandler";
import domReady from "@roots/sage/lib/client/dom-ready";
import {RenderSwiperSteps} from "./RenderSwiperSteps";
import {APIHandler} from "./api/APIHandler";

export class AppConfig {

    // API
    static readonly apiBaseUrl = '/wp/wp-admin/admin-ajax.php';
    static readonly nonce = 'ajax_object.nonce';
    static APIHandler = new APIHandler(AppConfig.apiBaseUrl, AppConfig.nonce);
    static readonly checkVehicleAvailabilityEndpoint = '?action=check_vehicles_availability_endpoint';
    static readonly getVehiclesByCategoryEndpoint = '?action=get_vehicles_by_category_endpoint';
    static readonly getVehicleDetails = '?action=get_car_details_endpoint';
    static readonly getOfficeDetails = '?action=get_office_details_endpoint'
    static readonly getExtras = '?action=get_vehicle_extras_endpoint';

    static readonly bookingSubmitButton = document.getElementById('bookingSubmitButtonId')?? document.createElement('button');
    static readonly bookingForm = 'bookingFormId';
    static readonly vehicleSelectionButtonClass = 'get-extras-btn';

    /**
     * Containers
     */

    // Dates and localizations form
    static readonly formContainer = document.getElementById('formContainerId') ?? document.createElement('div');

    // Vehicles
    static readonly vehiclesListContainer = document.getElementById('vehiclesListId') ?? document.createElement('div');

    // Extras
    static readonly extrasContainer = document.getElementById('extrasContainerId') ?? document.createElement('div');
    static readonly extrasDataContainer = document.getElementById('extrasDataContainerId') ?? document.createElement('div');
    static readonly extrasForm = document.getElementById('extrasFormId') ?? document.createElement('div');

    // Summary
    static readonly summaryContainer = document.getElementById('summaryContainerId') ?? document.createElement('div');

    // Registration form
    static readonly finalBookingContainer = document.getElementById('finalBookingFormId') ?? document.createElement('div');
    static readonly finalBookingForm = document.getElementById('finalFormId') ?? document.createElement('div');
    static readonly finalFormSubmitButton = document.getElementById('finalBookingSubmitId') ?? document.createElement('div');
    static readonly extrasSubmitButton = document.getElementById('extrasSubmitId') as HTMLButtonElement ?? document.createElement('button');

    // Error messages containers.
    static readonly errorText = document.getElementById('errorTextId') ?? document.createElement('div');
    static readonly errorContainer = document.getElementById('errorContainerId') ?? document.createElement('div');
    static readonly datesInvalidContainer = document.getElementById('datesInvalidContainerId') ?? document.createElement('div');

    // Steps containers.
    static readonly stepsContainer = document.getElementById('bookigStepsId') ?? document.createElement('div');
    static readonly step1Container = document.getElementById('step1') ?? document.createElement('div');
    static readonly step2Container = document.getElementById('step2') ?? document.createElement('div');
    static readonly step3Container = document.getElementById('step3') ?? document.createElement('div');
    static readonly step4Container = document.getElementById('step4') ?? document.createElement('div');
    static readonly step5Container = document.getElementById('step5') ?? document.createElement('div');

    // Scroll
    static readonly topScroll = document.getElementById('topScroll');

    // Swiper Steps
    static swiperSteps = new RenderSwiperSteps();

    // Swiper Handler
    static swiperHandler = new SwiperHandler();

    // RenderSwiperSteps Data
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

    static summaryPrice = {}

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
        price: 0,
        totalDays: 0,
        extras: [],
    };

    // Update RenderSwiperSteps Data
    static update(newData: BookingSummaryDataType) {
        let startDate = new Date(newData.pickupDate).getTime();
        let endDate = new Date(newData.returnDate).getTime();
        newData.totalDays = (endDate - startDate) / (1000 * 60 * 60 * 24);
        AppConfig.summaryData = newData;

    }

    static changeButtonState(submitButton: HTMLButtonElement|HTMLElement, state: 'loading' | 'enabled' | 'disabled', message: string = 'Comprobando disponibilidad'): void {
        switch (state) {
            case 'loading':
                // console.log('Btn loading');
                submitButton.textContent = message;
                submitButton.classList.add('animate');
                submitButton.classList.remove('bg-amber-100');
                submitButton.classList.add('bg-amber-400', 'hover:bg-amber-400');
                if (submitButton instanceof HTMLButtonElement)  submitButton.disabled = true;

                break;
            case 'enabled':
                // console.log('Btn enabled');
                submitButton.classList.remove('animate');
                submitButton.textContent = 'Buscar';
                submitButton.classList.add('bg-amber-100');
                if (submitButton instanceof HTMLButtonElement)  submitButton.disabled = false;
                break;
            case 'disabled':
                // console.log('Btn disabled');
                submitButton.textContent = 'Buscar';
                submitButton.classList.remove('bg-amber-400', 'hover:bg-amber-400');
                submitButton.classList.add('bg-amber-100');
                if (submitButton instanceof HTMLButtonElement)  submitButton.disabled = true;
                break;
        }
    }

    static showError(message: string = 'Error desconocido') {
        AppConfig.changeButtonState(AppConfig.bookingSubmitButton as HTMLButtonElement, 'enabled');
        AppConfig.changeButtonState(AppConfig.extrasSubmitButton, 'enabled');
        AppConfig.errorContainer.classList.remove('hidden');
        AppConfig.errorText.innerHTML = message;
    }

    static hideErrors() {
        AppConfig.datesInvalidContainer.classList.add('hidden');
        AppConfig.errorContainer.classList.add('hidden');
        AppConfig.errorText.innerHTML = '';
    }

}