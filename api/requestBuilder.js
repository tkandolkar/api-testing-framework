/**
 * The RequestBuilder class helps to build HTTP requests with various options like method, 
 * URL, parameters, headers, and body. The builder pattern is used to allow setting different 
 * request properties step by step and then "build" the final request configuration.
 *
 * @class
 */

export class ApiRequestBuilder {

    constructor() {
        this.method = 'GET';
        this.baseUrl = '';
        this.endpoint = '';
        this.params = {};
        this.headers = {};
        this.body = null;
    }

    /**
   * Sets the base URL for the request.
   * 
   * @param {string} baseUrl - The base URL for the request.
   * @returns {ApiRequestBuilder} The current RequestBuilder instance.
   */
    setBaseUrl(baseUrl) {
        this.baseUrl = baseUrl;
        return this;
    }

    /**
   * Sets the HTTP method for the request.
   * 
   * @param {string} method - The HTTP method to use (e.g., 'GET', 'POST', 'PUT', 'DELETE').
   * @returns {ApiRequestBuilder} The current RequestBuilder instance.
   */
    setMethod(method) {
        this.method = method;
        return this;
    }

    /**
   * Sets the endpoint (path) to be appended to the base URL.
   * 
   * @param {string} endpoint - The endpoint (path) for the request.
   * @returns {ApiRequestBuilder} The current RequestBuilder instance.
   */
    setEndpoint(endpoint) {
        this.endpoint = endpoint;
        return this;
    }

    /**
   * Adds query parameters to the request.
   * 
   * @param {Object} params - A key-value pair object representing query parameters.
   * @returns {ApiRequestBuilder} The current RequestBuilder instance.
   */
    addParam(key, value) {
        this.params[key] = value;
        return this;
    }

    /**
   * Adds headers to the request.
   * 
   * @param {Object} headers - A key-value pair object representing headers.
   * @returns {ApiRequestBuilder} The current RequestBuilder instance.
   */
    setHeader(key, value) {
        this.headers[key] = value;
        return this;
    }

    /**
   * Sets the body content for the request. This is used for methods like 'POST' or 'PUT'.
   * 
   * @param {any} body - The body content to send with the request (can be an object, string, etc.).
   * @returns {ApiRequestBuilder} The current RequestBuilder instance.
   */
    setBody(body) {
        this.body = body;
        return this;
    }

    /**
   * Builds and returns the final request configuration object.
   * This includes the full URL with query parameters, HTTP method, headers, and body.
   * 
   * @returns {Object} The final request configuration object.
   */
    build() {
        const url = new URL(this.endpoint, this.baseUrl);
        if (Object.keys(this.params).length > 0) {
            url.search = new URLSearchParams(this.params).toString();
        }
        return {
            method: this.method,
            url: url.toString(), 
            headers: this.headers,
            body: this.body,
        };
    }
}