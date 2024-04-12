// api/Vehicle.ts
import { APIHandler} from "./APIHandler";
import { AppConfig } from "../AppConfig";

export class Vehicle {
    public data: {};
    private readonly apiHandler: APIHandler;

    constructor() {
        this.data = [];
        this.apiHandler = new APIHandler(AppConfig.apiBaseUrl);
    }

    public async getVehicleDetails( categoryId: string ): Promise<string | undefined> {
        const data = new FormData();
        data.append( 'car_id', categoryId );
        console.log('category id', categoryId);
        try {
            const response = await this.apiHandler.postData({
                url: AppConfig.getVehicleDetails,
                data: data,
            });
            const vehicles = JSON.parse(response);
            return vehicles.data;
        } catch (error) {
            console.error('Error in getVehicleList:', error);
            throw new Error('Error in getVehicleList: ' + error);
        }
    }

}