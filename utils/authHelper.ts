import { APIRequestContext } from "@playwright/test";

export async function getToken(
    request: APIRequestContext
): Promise<string>{
    const response = await  request.post('/auth', {
        data:{
            username: 'admin',
            password:'password123'
        }
    });
    const body = await response.json();
    return body.token
}