/**
 * ApiClient is a utility class that simplifies making HTTP requests using the Axios library.
 * It supports all major HTTP methods: GET, POST, PUT, and DELETE.
 * The class provides a consistent interface for making requests and handles common HTTP error scenarios.
 *
 * @class ApiClient
 */

import { default as axios } from 'axios';

export class ApiClient {

    /**
   * Sends an HTTP request using Axios.
   * This is the internal method used by other HTTP methods (GET, POST, etc.).
   *
   * @static
   * @async
   * @param {Object} request - The request configuration object.
   * @param {string} request.method - The HTTP method (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * @param {string} request.url - The URL for the request.
   * @param {Object} [request.headers] - The headers to include with the request.
   * @param {Object} [request.body] - The body of the request (for POST, PUT).
   * @returns {Promise<Object|null>} - The response from the server, or null if the response is undefined.
   */
    static async sendRequest(request) {
        try {
            const { method, url, headers, body } = request;
            const config = { method, url, headers, data: body};

            const response = await axios(config);
            if (response && response.status) {
                return response;
            } else {
                console.error('Undefined response');
                return null;
            }           
        } catch (error) {
            if (error.response) {
                // Request was made and server responded (5xx, 4xx)
                // console.log(error.response.data);
                // console.log(error.response.status);
                // console.log(error.response.headers);
            } else if (error.request) {
                // Request wass made but no response recieved OR request did not go through
                // console.log(error.request);
            } else {
                // Some other error encountered when sending the request
                // console.log('Error', error.message);
            }
            return error.response
        }
    }

    /**
   * Sends a GET request.
   * 
   * This method is a wrapper around `sendRequest` for making HTTP GET requests.
   *
   * @static
   * @async
   * @param {string} url - The URL for the GET request.
   * @param {Object} [options={}] - The options object (optional).
   * @param {Object} [options.headers] - The headers to include with the GET request.
   * @returns {Promise<Object>} - The response from the GET request.
   */
    static async get(url, options = {}) {
        return this.sendRequest({method: 'GET', url, headers: options.headers});
    }

    /**
   * Sends a POST request.
   * 
   * This method is a wrapper around `sendRequest` for making HTTP POST requests.
   * The POST request includes a body, typically for sending data to the server.
   *
   * @static
   * @async
   * @param {string} url - The URL for the POST request.
   * @param {Object} body - The body of the POST request.
   * @param {Object} [options={}] - The options object (optional).
   * @param {Object} [options.headers] - The headers to include with the POST request.
   * @returns {Promise<Object>} - The response from the POST request.
   */
    static async post(url, body, options = {}) {
        return this.sendRequest({method: 'POST', url, headers: options.headers, body});
    }

    /**
   * Sends a PUT request.
   * 
   * This method is a wrapper around `sendRequest` for making HTTP PUT requests.
   * The PUT request typically includes a body, used to update data on the server.
   *
   * @static
   * @async
   * @param {string} url - The URL for the PUT request.
   * @param {Object} body - The body of the PUT request.
   * @param {Object} [options={}] - The options object (optional).
   * @param {Object} [options.headers] - The headers to include with the PUT request.
   * @returns {Promise<Object>} - The response from the PUT request.
   */
    static async put(url, body, options = {}) {
        return this.sendRequest({method: 'PUT', url, headers: options.headers, body});
    }

    /**
   * Sends a DELETE request.
   * 
   * This method is a wrapper around `sendRequest` for making HTTP DELETE requests.
   *
   * @static
   * @async
   * @param {string} url - The URL for the DELETE request.
   * @param {Object} [options={}] - The options object (optional).
   * @param {Object} [options.headers] - The headers to include with the DELETE request.
   * @returns {Promise<Object>} - The response from the DELETE request.
   */
    static async delete(url, options = {}) {
        return this.sendRequest({method: 'DELETE', url, headers: options.headers});
    }

}