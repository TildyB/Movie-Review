import app from "../app";
import supertest from "supertest";
import dotenv from "dotenv";
jest.mock("../api/google");
import { getIdToken } from "../api/google";

dotenv.config();
// dotenv.config({
//     path: '../.env.test'
// });

const request = supertest(app);

it("gets the test endpoint", async () => {
  const response = await request.post("/api/login");

  expect(response.status).toBe(400);
  
});

it("should return a valid mocked response ", async () => {
  // Given
  const mockedGetIdToken = jest.mocked(getIdToken);
  mockedGetIdToken.mockResolvedValueOnce("mocked id_token");
  const testData = "mocked auth_code"

  // When
  const response = await getIdToken(testData);

  // Then
  expect(response).toBe("mocked id_token");
  
});
