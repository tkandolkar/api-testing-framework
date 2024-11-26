import { ApiRequestBuilder } from '../../../api/requestBuilder';
import { ApiClient } from '../../../api/apiClient'
import { isNumberObject, isStringObject } from 'util/types';

const valetApiBaseUrl = 'https://www.bankofcanada.ca';

// Function to calculate the average conversion rate for 2 currencies over last "weeks
export async function calculateAverageConversionRate(weeks, currencyFrom, currencyTo) {
    let sum = 0, avg = 0;
    let v_arr = [];
    // validate inputs
    if (typeof weeks !== 'number' || weeks <= 0) {
        console.error('weeks must be a positive number');
        return 0;
    }
    if (typeof currencyFrom !== 'string' || typeof currencyTo !== 'string') {
        console.error('currencyFrom and currencyTo must be strings');
        return 0;
    }
    if (currencyFrom === currencyTo) {
        console.error('currencyFrom and currencyTo must be distinct');
        return 0;
    }
    if (currencyFrom.length !== 3 || currencyTo.length !== 3) {
        console.error('currencyFrom and currencyTo must be 3 characters long');
        return 0;
    }

    const seriesName = `FX${currencyFrom.toUpperCase()}${currencyTo.toUpperCase()}`;

    // Build API request
    const builder = new ApiRequestBuilder();
    const request = builder.setBaseUrl(valetApiBaseUrl)
        .setMethod('GET')
        .setEndpoint(`/valet/observations/${seriesName}/json?recent_weeks=${weeks}`)
        .setHeader({})
        .build();

    // Call banking API to get data    
    try {
        const response = await ApiClient.get(request.url, {headers: request.headers});
        if (response.status !== 200) {
            console.error(`API call failed, status code: ${response.status}`);
            return 0;
        }
        // Store only value "v" in an array (assuming that v is the conversion rate)
        response.data.observations.forEach(obs => {
            v_arr.push(obs[seriesName].v)
        })
        // Avoid division by 0
        if (v_arr.length == 0) 
            {
                console.error('No conversion rate data present')
                return 0;
            }

        // Calculate sum of all elements of array
        for (let i=0; i<v_arr.length; i++) {
            sum += parseFloat(v_arr[i]);
        }
        // Calculate and return average
        return sum/v_arr.length;
    } catch (error) {
        console.error(`Error while : ${error.message}`);
        return 0;
    }
    return 0;
}