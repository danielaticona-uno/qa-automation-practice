import { test, expect } from '@playwright/test';
import { getToken } from '../utils/authHelper';
import { createBooking } from '../utils/bookingHelper';
import { updateBookingPayload } from '../test-data/updateBookingPayload';

test('PUT - Update Booking', async ({ request }) => {

    // auth
    const token = await getToken(request);

    // create booking
    const bookingId = await createBooking(request);


    //update booking
    const updateResponse = await request.put(
        `/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            },
            data: updateBookingPayload
        }
    );
    console.log('status: ', updateResponse.status());
    console.log('Response: ', await updateResponse.text());
    expect(updateResponse.status()).toBe(200);
    const updateBooking = await updateResponse.json();


    expect(updateBooking.firstname).toBe('Jin Update');
    expect(updateBooking.lastname).toBe('Brownn');
    expect(updateBooking.totalprice).toBe(158);







})