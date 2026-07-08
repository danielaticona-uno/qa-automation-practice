import { test, expect } from '@playwright/test';

test('Get auth token', async ({ request }) => {

  const response = await request.post(
    '/auth',
    {
      data: {
      "username" : "admin",
      "password" : "password123"
      }
    }
  );
  expect(response.status()).toBe(200);
  const responseBody = await response.json();
  console.log(responseBody);
  expect(responseBody.token).toBeTruthy();
})
