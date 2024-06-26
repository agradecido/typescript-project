// TypeScript Version: 3.0
// Description: Interface for API handler

export interface PostDataParams {
    url: string;  // Endpoint URL appended to the base URL
    data: FormData | Record<string, any>;  // Data can be either FormData for form submissions or a plain object for JSON payload
}

// export interface getExtraName {
//     postData(id: string): Promise<string>;
// }

export interface IAPIHandler {
    postData(params: PostDataParams): Promise<string>;  // Promise that resolves to a string (could be JSON string or HTML)
}
