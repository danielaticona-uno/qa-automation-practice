import { test, expect } from '@playwright/test';

test('POST - Create Booking', async ({ request }) => {
    const response = await request.post(
        '/booking',
        {
            data: {
                "firstname": "Jim",
                "lastname": "Brown",
                "totalprice": 111,
                "depositpaid": true,
                "bookingdates": {
                    "checkin": "2018-01-01",
                    "checkout": "2019-01-01"
                },
                "additinalneeds": "Breakfast"
            }
        }   
    );

    expect(response.status()).toBe(200);
    const responseBody = await response.json();
    console.log(responseBody);
    expect(responseBody.bookingid).toBeTruthy();
});