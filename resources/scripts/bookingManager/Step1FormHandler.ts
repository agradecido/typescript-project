import {Step2VehicleSelection} from "./Step2VehicleSelection";
import {AppConfig} from "./AppConfig";

export class Step1FormHandler {

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
        new Step2VehicleSelection(formData);
    }
}
