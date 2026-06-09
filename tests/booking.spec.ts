import { test, expect } from '@playwright/test';
import { bookingPayload } from '../test-data/bookingPayload';

test('POST - Create Booking', async ({ request }) => {
    
    const createResponse = await request.post(
        '/booking',
        {
            data: bookingPayload
        });

    expect(createResponse.status()).toBe(200);
    const responseBody = await createResponse.json();
    console.log(responseBody);
    expect(responseBody.bookingid).toBeTruthy();
});