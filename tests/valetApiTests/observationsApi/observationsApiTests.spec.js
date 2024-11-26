/**
 * This file contains test cases for the given REST API endpoint:
 * https://www.bankofcanada.ca/valet/observations/{seriesNames}/{format}
 * 
 * Mandatory Parameters:
 * seriesNames {string}: A comma-separated list of one or more series names in the form of FX[currency1][currency2]. For example, FXUSDCAD,FXEURUSD.
 * format {string}: The format of the returned data (e.g., json, xml).
 * 
 * Optional Parameters:
 * start_date {string}: A filter to return observations on or after this date (e.g., 2023-01-01).
 * end_date {string}: A filter to return observations on or before this date (e.g., 2023-12-31).
 * recent {integer}: An integer specifying the number of the most recent observations to return.
 * recent_weeks {integer}: An integer specifying the number of the most recent weeks of observations to 
 * return.
 * recent_months {integer}: An integer specifying the number of the most recent months of observations to return.
 * recent_years {integer}: An integer specifying the number of the most recent years of observations to return.
 * order_dir {string} : The order in which the observations are returned: asc (ascending) or desc (descending).
 */

import { test, expect } from '@playwright/test'
import { ApiRequestBuilder } from '../../../api/requestBuilder';
import { ApiClient } from '../../../api/apiClient'
import { calculateAverageConversionRate } from './observationsApiUtils'
import { validate  } from './observationsSchema'

const apiBaseUrl = 'https://www.bankofcanada.ca';

test.describe.parallel('Observations API Testing', () => {
    // 1. Test case for successful GET request, HTTP Status code 200
    test('Test case for successful get request', async () => {
        const builder = new ApiRequestBuilder();
        const defaultSeriesName = 'FXUSDCAD';

        const request = builder.setBaseUrl(apiBaseUrl)
        .setMethod('GET')
        .setEndpoint(`/valet/observations/${defaultSeriesName}/json`)
        .setHeader({})
        .build();

        const response = await ApiClient.get(request.url, {headers: request.headers});
        expect(response).toBeDefined();
        expect(response.status).toBe(200); // Verify returned HTTP status code to be 200
    })

    // 2. Test case for bad request, HTTP Status code 400
    test('Test case for incorrect inputs', async () => {
        const builder = new ApiRequestBuilder();
        const defaultSeriesName = 'FXUSDCAD';

        const request = builder.setBaseUrl(apiBaseUrl)
        .setMethod('GET')
        .setEndpoint(`/valet/observations/${defaultSeriesName}/jsonxx`)
        .setHeader({})
        .build();

        const response = await ApiClient.get(request.url, {headers: request.headers});
        expect(response).toBeDefined();
        expect(response.status).toBe(400);
    })

    // 3. Test case for data not existing, HTTP status code 404
    test('Test case for data not existing', async () => {
        const builder = new ApiRequestBuilder();
        const defaultSeriesName = 'FXUSDCADXX';

        const request = builder.setBaseUrl(apiBaseUrl)
        .setMethod('GET')
        .setEndpoint(`/valet/observations/${defaultSeriesName}/json`)
        .setHeader({})
        .build();

        const response = await ApiClient.get(request.url, {headers: request.headers});
        expect(response).toBeDefined();
        expect(response.status).toBe(404);
    })

    // 4. Test case for incorrect params, HTTP status code 400
    // This test provides incorrect data to the "recent" query param
    const incorrectTestDataRecent = ['abc', -1, 0];

    incorrectTestDataRecent.forEach((item) => {
        test(`Test invorrect value for "recent" param: ${item}`, async () => {
            const defaultSeriesName = 'FXUSDCAD';
            // a. Test with incorrect value for "recent" parameter
            const incorrectRequest1 = new ApiRequestBuilder()
            .setBaseUrl(apiBaseUrl)
            .setMethod('GET')
            .setEndpoint(`/valet/observations/${defaultSeriesName}/json`)
            .addParam('recent', item)
            .build();
    
            var response = await ApiClient.get(incorrectRequest1.url, {headers: incorrectRequest1.headers});
            expect(response).toBeDefined();
            expect(response.status).toBe(400); // Verify returned HTTP status code to be 400
            expect(response.data.message).toContain('Bad recent observations request parameters');
        })
    })

    // 4. Test case to calculate the average conversion rate - with parameterized data
    const testCurrencies = [
        {'currencyFrom': 'CAD', 'currencyTo': 'AUD'}, 
        {'currencyFrom': 'USD', 'currencyTo': 'CAD'}, 
        {'currencyFrom': 'USD', 'currencyTo': 'EUR'}
    ]
    let weeks = 10;

    testCurrencies.forEach((item) => {
        const { currencyFrom, currencyTo } = item;
        test(`Test case to calculate average for ${currencyFrom} to ${currencyTo} for ${weeks} weeks`, async () => {
            const averageRate = await calculateAverageConversionRate(weeks, currencyFrom, currencyTo);
            expect(averageRate).toBeDefined();
        });
    });

    // 5. Test case to validate schema
    test('Test case for schema validation', async () => {
        const builder = new ApiRequestBuilder();
        const defaultSeriesName = 'FXUSDCAD';

        const request = builder.setBaseUrl(apiBaseUrl)
        .setMethod('GET')
        .setEndpoint(`/valet/observations/${defaultSeriesName}/json`)
        .setHeader({})
        .build();

        const response = await ApiClient.get(request.url, {headers: request.headers});
        expect(response).toBeDefined();
        expect(response.status).toBe(200);

        var isResponseSchemaValid = false;
        try {
            isResponseSchemaValid = validate(response.data);
        } catch(error) {
            console.log(error)
        }
        expect(isResponseSchemaValid).toBe(true);
    }) 
    
    // 5. Test case for incorrect/ request header
    // 6. Test case to validate response header
    // 7. Test case with different combinations of all query parameters
    // 8. Performance test case to measure the response time
    // 9. Security tests
})