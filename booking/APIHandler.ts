// APIHandler.ts
import {ErrorDisplay} from "../utils/ErrorDisplay";

interface PostDataParams {
    url: string;
    data: any;
}

interface APIHandler {
    baseUrl: string;
    postData(params: PostDataParams): Promise<any>;
}

export class WebcarAPIHandler implements APIHandler {
    baseUrl: string;
    errorDisplay = new ErrorDisplay();

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }

    // @ts-ignore
    async postData(url: string, data: any): Promise<any> {
        const isFormData = data instanceof FormData;

        try {
            const response = await fetch(this.baseUrl + url, {
                method: 'POST',
                credentials: 'same-origin',
                headers: isFormData ? {} : { 'Content-Type': 'application/json' },
                body: isFormData ? data : JSON.stringify(data),
            });

            if (!response.ok) {
                await this.errorDisplay.sendErrorToSession('Network response was not ok');
            }
            return response.json();
        } catch (error) {
            await this.errorDisplay.sendErrorToSession('Network response was not ok');
            throw error;
        }
    }
}
