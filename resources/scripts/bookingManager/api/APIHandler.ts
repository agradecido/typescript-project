// APIHandler.ts
import {ErrorDisplay} from "../../utils/ErrorDisplay";
import {IAPIHandler, PostDataParams} from "../interfaces/IAPIHandler";
import {AppConfig} from "../AppConfig";  // Make sure the import path matches

export class APIHandler implements IAPIHandler {
    private readonly baseUrl: string;
    // private errorDisplay = new ErrorDisplay();
    private nonce: string;

    constructor(baseUrl: string, nonce: string) {
        this.baseUrl = baseUrl;
        this.nonce = nonce;
    }

    async postData(params: PostDataParams): Promise<string> {
        const {url, data} = params;
        const isFormData = data instanceof FormData;

        // Append the nonce to FormData or to the JSON object
        if (isFormData) {
            data.append('nonce', this.nonce);
        } else if (typeof data === 'object') {
            data['nonce'] = this.nonce;  // Add nonce to data object
        }

        try {
            const response = await fetch(`${this.baseUrl}${url}`, {
                method: 'POST',
                credentials: 'same-origin',
                headers: isFormData ? {} : {'Content-Type': 'application/json'},
                body: isFormData ? data : JSON.stringify(data),
            });

            return response.text(); // Handle both HTML and JSON responses as text initially

        } catch (error) {
            console.error('Error de conexión con la API:', error);
            throw new Error("API connection error");
        }
    }

    // public async getExtraName(id: string): Promise<string> {
    //     const formData = new FormData();
    //     formData.append('id', id);
    //
    //     try {
    //         const response = await this.postData({
    //             url: AppConfig.getExtras,
    //             data: formData,
    //         });
    //
    //         return JSON.parse(response).data;
    //
    //     } catch (error) {
    //         console.error('Error fetching extra name:', error);
    //         throw new Error("Error fetching extra name");
    //     }
    // }

}
