import {Vehicles} from "./Vehicles";
import {AppConfig} from "./AppConfig";

export class DatesAndOffices {

    constructor() {
        this.attachEventListeners();
    }

    private attachEventListeners(): void {
        let mainForm: HTMLFormElement;
        mainForm = AppConfig.formContainer as HTMLFormElement;
        if (mainForm) {
            mainForm.addEventListener('submit', this.datesLocalizationsSubmit.bind(this));
        }
    }

    private async datesLocalizationsSubmit(event: Event): Promise<void> {
        event.preventDefault();
        const formData = new FormData(event.target as HTMLFormElement);
        new Vehicles(formData);
        if ( AppConfig.maxStep < 1 ) {
            AppConfig.maxStep = 1;
        }
    }
}
