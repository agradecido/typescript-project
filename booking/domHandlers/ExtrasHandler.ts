export { ExtrasHandler };

class ExtrasHandler {
    // Extras container ID
    private readonly containerId: string;
    private readonly dataContainerId: string = "extrasDataContainerId";
    // Button ID to trigger extras loading
    private readonly loadButtonId: string;
    // Formdata to send to the server
    private readonly bookingData: FormData;

    constructor(containerId: string, loadButtonId: string, bookingData: FormData) {
        this.containerId = containerId;

        this.loadButtonId = loadButtonId;
        this.bookingData = bookingData;
    }

    insertHTML(html: string): void {
        const container = document.getElementById(this.containerId);
        const dataContainer = document.getElementById(this.dataContainerId);
        if (container) {
            // @ts-ignore
            dataContainer.innerHTML = html;
            container.classList.remove('hidden');
            return;
        }
        console.error(`Container with ID ${this.containerId} not found`);
    }

    clearContainer(): void {
        const container = document.getElementById(this.containerId);
        if (container) {
            container.innerHTML = '';
        }
    }

}
