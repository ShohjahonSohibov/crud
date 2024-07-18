import { expect } from 'chai';
import supertest from 'supertest';
import app from '../src/index.js'; // Ensure this path ends with .js if using ESM

export const request = supertest(app);
export { expect };
