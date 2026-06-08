import { test, expect, request } from '@playwright/test';
import bookingData from '../test-data/bookingData.json';

for(const data of bookingData){
    test(`Create booking for ${data.firstname}`,async ({request})=>{

        const response = await request.post(
            '/booking',
            {
                data: {
                    firstname: data.firstname,
                    lastname: data.lastname,
                    totalprice: data.totalprice,
                    depositpaid: true,
                    bookingdates: {
                        checkin: '2026-07-01',
                        checkout: '2026-07-10',
                    },
                    additionalneeds:'Breakfast'
                }
            }
        );
        expect(response.status()).toBe(200);
        const body = await response.json();

        expect(body.bookingid).toBeTruthy();
    });
}