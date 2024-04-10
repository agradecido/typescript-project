export { VehiclesHandler };
import { Extras } from '../controllers/Extras';
import { WebcarAPIHandler } from '../APIHandler';
import { scrollToBookingTop } from '../main';

class VehiclesHandler {
    // Vehicle list container ID
    private readonly containerId: string;
    // Search button ID
    private readonly submitButtonId: string;
    // API handler
    public apiHandler: WebcarAPIHandler = new WebcarAPIHandler('/wp/wp-admin/admin-ajax.php')
    public readonly extras = new Extras(this.apiHandler, new FormData());

    constructor(containerId: string, submitButtonId: string) {
        this.containerId = containerId;
        this.submitButtonId = submitButtonId;
    }

    insertHTML(html: string): void {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = html;
            return;
        }
        console.error(`Contenedor con ID ${this.containerId} no encontrado`);
    }

    clearContainer(): void {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = '';
        }
    }

    startLoading(): void {
        this.clearContainer();
        const submitButton = document.getElementById(this.submitButtonId) as HTMLButtonElement;
        const container = document.getElementById(this.containerId);
        if (container) {
            container.classList.add('hidden');
            submitButton.classList.add('bg-amber-100');
        }
        if (submitButton) {
            submitButton.textContent = 'Comprobando disponibilidad';
            submitButton.classList.remove('bg-amber-100');
            submitButton.classList.add('bg-amber-400', 'hover:bg-amber-400');
            submitButton.disabled = true;
        }
    }

    stopLoading(): void {
        const submitButton = document.getElementById(this.submitButtonId) as HTMLButtonElement;
        const container = document.getElementById(this.containerId);

        if (container) {
            container.classList.remove('hidden');
        }

        if (submitButton) {
            submitButton.textContent = 'Buscar';
            submitButton.classList.add('bg-amber-400');
            submitButton.classList.remove('bg-amber-600');
            submitButton.disabled = false;
            scrollToBookingTop();
        }
    }


}
