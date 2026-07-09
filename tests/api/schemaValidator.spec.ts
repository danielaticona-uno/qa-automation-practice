import { test, expect } from '@playwright/test';
import Ajv from 'ajv';
import { bookingSchema } from '../../schemas/bookingSchema';
import { createBooking } from '../../utils/bookingHelper';

test('Schema Validation', async ({ request }) => {

    // create booking
    const bookingId = await createBooking(request);


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