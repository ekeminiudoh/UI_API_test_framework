import test, { expect } from '@playwright/test';
import request from 'supertest';
import { FileId, invalidUser, serverUrl, validUser } from './resources/api.data';
import path from 'path';

test.describe('API Endpoints', () => {
  
  test.describe("LOGIN Endpoints", ()=>{
    test('/api/login → should login with valid credentials', async () => {
      const res = await request(serverUrl).post('/api/login').send({
        email: validUser.email,
        password: validUser.password,
      });
      expect(res.status).toBe(200);
      
      expect(res.body.message).toEqual("logged in successfully");
      expect(res.body.data).toHaveProperty("email");
      expect(res.body.data).toHaveProperty('name');
    });
    test('/api/login → should fail login with invalid credentials', async () => {
      const res = await request(serverUrl).post('/api/login').send({
        email: invalidUser.email,
        password: invalidUser.password,
      });
      expect(res.status).toBe(404);
      expect(res.body.message).toEqual("invalid credentials");

    });
    test('/api/login → should fail login with missing fields', async () => {
      const res = await request(serverUrl).post('/api/login').send({
        email: validUser.email,
        // password: null
      });
      expect(res.status).toBe(400);
      expect(res.body.message).toEqual("please fill the fields");
    });

  })
  test.describe("POST file Endpoints", ()=>{
    test('/api/postFile → should upload a file and store post', async () => {
      const res = await request(serverUrl).post('/api/postFile')
      .field('title', 'Integration test title')
      .attach('files', path.join(__dirname, 'resources/test.png'));
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty('message', 'successfully posted');
    expect(res.body.data).toHaveProperty('title');
    expect(res.body.data.file).toBeInstanceOf(Array);
    expect(res.body.data.file.length).toBeGreaterThan(0);
    });
    test('/api/postFile → should return 400 if title is missing', async () => {
      const res = await request(serverUrl).post('/api/postFile')
      .attach('files', path.join(__dirname, 'resources/test.png'));
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'bad request');
    });
    test('/api/postFile → should return 500 if no files uploaded', async () => {
      const res = await request(serverUrl).post('/api/postFile')
      .field('title', 'Integration test title')
    expect(res.statusCode).toBe(400);
    expect(res.body).toHaveProperty('message', 'bad request');
    });
  })
  
  test.describe("GET file Endpoints", ()=>{
    test('/api/getAllFiles → should get all files and return 200 with status ok', async () => {
      const res = await request(serverUrl).get('/api/getAllFiles');
      expect(res.status).toBe(200);
      
      expect(res.body.data.length).toBeGreaterThan(0);
      expect(res.body.data[0]).toHaveProperty('file_Id');
      expect(res.body.data[0]).toHaveProperty('file');
    });
    test('/api/getAFile:id → should get file by a valid id return 200 with status ok', async () => {
      const res = await request(serverUrl).get('/api/getAFile/' + FileId.valid);
      expect(res.status).toBe(200);
      expect(res.body.message).toBeTruthy();
      expect(res.body.message).toHaveProperty('file_Id');
      expect(res.body.message).toHaveProperty('file');
    });
    test('/api/getAFile:invalid-id → should return 404 if item not found', async () => {
      const res = await request(serverUrl).get('/api/getAFile/' + FileId.invalid);
      expect(res.status).toBe(404);
      expect(res.body.message).toEqual("file not found");
    });
  })
  test.describe("PATCH file Endpoints", ()=>{
    test('/api/editFile/:valid-id → should update file and return 200 with status ok', async () => {
      let fileId = "18851ea1-ad90-47ea-9c4c-6690673ab695"
      const res = await request(serverUrl).patch('/api/editFile/' + fileId)
      .send({ title: 'Updated Title' });
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual("File updated successfully")
      
    });
    test('/api/editFile/:invalid-id → should return 404 if id is incorrect', async () => {
      let fileId = "18851ea1-bd90-47ea-9d4c-6690673ab695"
      const res = await request(serverUrl).patch('/api/editFile/' + fileId)
      .send({ title: 'Updated Title' });
      expect(res.status).toBe(404);
      expect(res.body.message).toEqual("File not found")
      
    });

  })
    test.describe("DELETE file Endpoints", ()=>{
    test('/api/deleteFile/:valid-id → should update file and return 200 with status ok', async () => {
      let fileId = "18851ea1-ad90-47ea-9c4c-6690673ab695"
      const res = await request(serverUrl).patch('/api/deleteFile/' + fileId)
      .send({ title: 'Updated Title' });
      expect(res.status).toBe(200);
      expect(res.body.message).toEqual("File deleted successfully")
      
    });
    test('/api/deleteFile/:invalid-id → should return 404 if id is incorrect', async () => {
      let fileId = "18851ea1-bd90-47ea-9d4c-6690673ab695"
      const res = await request(serverUrl).patch('/api/deleteFile/' + fileId)
      .send({ title: 'Updated Title' });
      expect(res.status).toBe(404);
      expect(res.body.message).toEqual("File not found")
      
    });

  })
});