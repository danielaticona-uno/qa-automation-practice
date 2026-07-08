import { test, expect } from '@playwright/test';
import { getToken } from '../utils/authHelper';
import { createBooking } from '../utils/bookingHelper';

test('DELETE - Delete Booking', async ({ request }) => {
    // auth
    const token = await getToken(request);

    // create booking
    const bookingId = await createBooking(request);

    //delete booking

    const deleteResponse = await request.delete(
        `booking/${bookingId}`, 
        {
            headers:{
                Cookie: `token=${token}`
            }
        }
    );
    expect(deleteResponse.status()).toBe(201)
})    