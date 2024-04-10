// WebcarAPIHandler.ts
import { ErrorDisplay } from "../../utils/ErrorDisplay";
import { IAPIHandler, PostDataParams } from "../interfaces/IAPIHandler";  // Make sure the import path matches

export class WebcarAPIHandler implements IAPIHandler {
    private readonly baseUrl: string;
    private errorDisplay = new ErrorDisplay();

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    async postData(params: PostDataParams): Promise<string> {
        const { url, data } = params;
        const isFormData = data instanceof FormData;

        try {
            const response = await fetch(`${this.baseUrl}${url}`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: isFormData ? { 'Content-Type': 'multipart/form-data' } : { 'Content-Type': 'application/json' },
                body: isFormData ? data : JSON.stringify(data),
            });

            if (!response.ok) {
                await this.errorDisplay.sendErrorToSession(response.statusText);
                }

            return response.text(); // Handle both HTML and JSON responses as text initially
        } catch (error) {
            console.error("Error in postData:", error);
            throw new Error("Failed to fetch data");
        }
    }
}
