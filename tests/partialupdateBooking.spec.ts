import { test, expect } from '@playwright/test';

test('PATCH - Partial Update Booking', async ({ request }) => {

    //auth
    const authResponse = await request.post(
        '/auth',
        {
            data: {
                username: 'admin',
                password: 'password123'
            }
        }
    );

    const authBody = await authResponse.json();
    const token = authBody.token;

    // create booking
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

    const createBody = await createResponse.json();
    const bookingId = createBody.bookingid;

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