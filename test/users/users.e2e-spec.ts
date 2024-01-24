import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('UserController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('should create a user', () => {
    return request(app.getHttpServer())
      .post('/users')
      .send({
        firstName: 'Ade',
        lastName: 'Tola',
        email: 'adetola@adebol.com',
        password: 'Password123',
      })
      .expect(201);
  });
});
