import { APIRequestContext } from "@playwright/test";
import { bookingPayload } from "../test-data/bookingPayload";

export async function createBooking(
    request: APIRequestContext
): Promise<number>{
    const response =await request.post('/booking',{
        data: bookingPayload
    }); 
    const body = await response.json();
    return body.bookingid;
}