import { test, expect } from '@playwright/test';
import { getToken } from '../utils/authHelper';
import { createBooking } from '../utils/bookingHelper';

test('PATCH - Partial Update Booking', async ({ request }) => {

    // auth
    const token = await getToken(request);

    // create booking
    const bookingId = await createBooking(request);

    // partial update booking
    const updateResponse = await request.patch(
        `/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            },
            data: {
                "firstname": "Jin partial",
                "lastname": "Brown partial",
            }
        }
    );
    console.log('status: ', updateResponse.status());
    console.log('Response: ', await updateResponse.text());
    expect(updateResponse.status()).toBe(200);
    const updateBooking = await updateResponse.json();
     
    
    expect(updateBooking.firstname).toBe('Jin partial');
    expect(updateBooking.lastname).toBe('Brown partial');
    expect(updateBooking.totalprice).toBe(111); // validar que no se cambio este valor inicial


    




})