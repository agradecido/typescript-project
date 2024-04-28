import {AppConfig} from "./AppConfig";
import {APIHandler} from './api/APIHandler';
import { RenderSwiperSteps } from './handlers/RenderSwiperSteps'

const apiHandlerInstance = new APIHandler(AppConfig.apiBaseUrl, AppConfig.nonce);

export class Extras {
    renderSwiper = new RenderSwiperSteps();
    constructor() {
        this.attachEventListenerToExtrasForm();
        AppConfig.extrasContainer.classList.remove('hidden');
        this.getExtrasFormHTMLFromAPI() // Fetch extras from API
        this.renderSwiper = new RenderSwiperSteps();

    }

    private attachEventListenerToExtrasForm(): void {
        if (AppConfig.extrasForm) {
            // console.log('Event listener attached to extras form.');
            AppConfig.extrasForm.addEventListener('submit', (event) => this.handleExtrasFormSubmit(event));
            // console.log('Event listener attached to extras form.', extrasForm);
        } else {
            console.error('Extras form not found');
        }
    }

    private async handleExtrasFormSubmit(event: Event): Promise<void> {
        console.log('Handling extras form submit');
        event.preventDefault();
        AppConfig.changeButtonState(AppConfig.extrasSubmitButton, 'loading', 'Guardando extras...');

        const extras = this.collectExtras();

        await this.updateSummary(extras);
        this.navigateToNextStep();
        AppConfig.changeButtonState(AppConfig.extrasSubmitButton, 'disabled', '');
    }

    private async getExtrasFormHTMLFromAPI(): Promise<void> {
        const formData = new FormData();
        try {
            formData.append('category', AppConfig.summaryData.vehicleCategory);
            formData.append('from', String(AppConfig.summaryData.pickupLocation));
            formData.append('to', String(AppConfig.summaryData.returnLocation));
            formData.append('total_days', String(AppConfig.summaryData.totalDays));
            formData.append('time_from', AppConfig.summaryData.pickupTime);
            formData.append('time_to', AppConfig.summaryData.returnTime);

            const response = await apiHandlerInstance.postData({
                url: AppConfig.getExtras,
                data: formData,
            });

            // @ts-ignore
            AppConfig.extrasDataContainer.innerHTML = JSON.parse(response).data;
            AppConfig.extrasDataContainer.classList.remove('hidden');

        } catch (error) {
            AppConfig.showError('Error fetching extras. Please try again.');
        }
    }

    private collectExtras(): any[] {
        let extras: any[] = [];
        const selectElements = document.querySelectorAll('select[name^="extras["]');

        selectElements.forEach(selectElement => {
            const extrasSelect = selectElement as HTMLSelectElement;
            // @ts-ignore
            const extraId = extrasSelect.name ? extrasSelect.name.match(/\[(.*?)]/)[1] : undefined;  // Extract extra ID
            const selectedOption = extrasSelect.options[extrasSelect.selectedIndex];
            const quantity = parseInt(extrasSelect.value, 10);

            if (quantity > 0) {
                const name = selectedOption.getAttribute('data-name') || 'Unknown Extra'; // Default to 'Unknown Extra' if data-name is not set
                const pricePerDay = parseFloat(selectedOption.getAttribute('data-day-price') || '0');
                extras.push({ id: extraId, name: name, quantity: quantity, pricePerDay: pricePerDay });
            }
        });

        return extras;
    }

    private async updateSummary(extras: any[]): Promise<void> {
        let totalPriceExtras: number = 0;

        extras.forEach(extra => {
            totalPriceExtras += extra['pricePerDay'] * extra['quantity'];
        });

        AppConfig.summaryData.extras = extras;
        AppConfig.summaryData.price = (AppConfig.summaryData.price || 0) + totalPriceExtras;
        console.log('summaryData', AppConfig.summaryData);
    }

    private async navigateToNextStep(): Promise<void> {
        await this.renderSwiper.render('step3').then(
            () => {
                AppConfig.extrasContainer.classList.add('hidden');
                AppConfig.finalBookingContainer.classList.remove('hidden');
            });

        if ( AppConfig.maxStep < 3 ) {
            AppConfig.maxStep = 3;
        }
    }
}
