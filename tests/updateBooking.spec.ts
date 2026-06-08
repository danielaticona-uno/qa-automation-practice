import { test, expect } from '@playwright/test';

test('PUT - Update Booking', async ({ request }) => {

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

    //update booking
    const updateResponse = await request.put(
        `/booking/${bookingId}`,
        {
            headers: {
                Cookie: `token=${token}`
            },
            data: {
                "firstname": "Jin Update",
                "lastname": "Brownn",
                "totalprice": 158,
                "depositpaid": false,
                "bookingdates": {
                    "checkin": "2026-07-01",
                    "checkout": "2026-07-30"
                },
                "additinalneeds": "Luncch"
            }
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