import { test, expect } from '@playwright/test';
import { bookingPayload } from '../../test-data/bookingPayload';
import { createBooking } from '../../utils/bookingHelper';

test('GET - Create and Get Booking', async ({ request }) => {
    
    //create booking
    const bookingId = await createBooking(request);

    console.log('Booking ID: ', bookingId);
   

    // get booking
    const getResponse = await request.get(
        `/booking/${bookingId}`
    );
    
    expect(getResponse.status()).toBe(200);

    const booking =await getResponse.json();
    console.log (booking);

    expect(booking.firstname).toBe('Jim');
    expect(booking.lastname).toBe('Brown');
    expect(booking.totalprice).toBe(111);
});