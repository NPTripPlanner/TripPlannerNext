const TEST_USER_ID = 'integration-test-user-id';
const TEST_USER_EMAIL = 'integration-tests@test.com';
const TEST_USER_NAME = 'Integration Test User';

export interface TestAuth{
  uid:string;
  token:{[key:string]:any}
}

export const mockFirebaseAuth = {
  uid: TEST_USER_ID,
  token: {
    email: TEST_USER_EMAIL,
    name: TEST_USER_NAME,
  }
};