// api/Office.ts
import { APIHandler} from "./APIHandler";
import { AppConfig } from "../AppConfig";

export class Office {
    public data: {};
    private readonly apiHandler: APIHandler;

    constructor() {
        this.data = [];
        this.apiHandler = new APIHandler(AppConfig.apiBaseUrl, AppConfig.nonce);
    }

    public async getOfficeDetails( officeId: string ): Promise<string | undefined> {
        const data = new FormData();
        data.append( 'office_id', officeId );
        try {
            const response = await this.apiHandler.postData({
                url: AppConfig.getOfficeDetails,
                data: data,
            });

            const office = JSON.parse(response);
            return office.data.name;
        } catch (error) {
            console.error('Error in getOfficeDetails:', error);
            throw new Error('Error in getOfficeDetails: ' + error);
        }
    }

}