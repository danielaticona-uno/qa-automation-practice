import { test, expect } from '@playwright/test';

test('GET - Create and Get Booking', async ({ request }) => {
    //create booking
    const createResponse = await request.post(
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

    expect(createResponse.status()).toBe(200);
    const createBody = await createResponse.json();
    //console.log(createBody);
    const bookingID = createBody.bookingid;
    console.log('Booking ID: ', bookingID);

    // get booking
    const getResponse = await request.get(
        `/booking/${bookingID}`
    );
    expect(getResponse.status()).toBe(200);

    const booking =await getResponse.json();
    console.log (booking);

    expect(booking.firstname).toBe('Jim');
    expect(booking.lastname).toBe('Brown');
    expect(booking.totalprice).toBe(111);
});