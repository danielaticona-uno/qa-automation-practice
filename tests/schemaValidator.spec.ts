import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { bookingSchema } from '../schemas/bookingSchema';

test('Schema Validation', async ({ request }) => {

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
    // obtener el booking creado
    const getResponse = await request.get(
        `/booking/${bookingId}`
    );

    expect(getResponse.status()).toBe(200);

    const body = await getResponse.json();

    const ajv = new Ajv();
    const validate = ajv.compile(bookingSchema);
    const valid = validate(body);
    
    /*if(!valid){
        console.log(JSON.stringify(validate.errors, null, 2));
    }
    console.log(body);
    */

    expect(valid).toBe(true);
})