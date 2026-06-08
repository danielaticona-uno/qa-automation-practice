import { test, expect } from '@playwright/test';

test('DELETE - Delete Booking', async ({ request }) => {

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