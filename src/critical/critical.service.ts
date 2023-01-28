import { Injectable } from '@nestjs/common';
import { Client } from 'pg';
import { SecretsService } from '../secrets/secrets.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CriticalService {
  constructor(
    private readonly secretsService: SecretsService,
    private configService: ConfigService,
  ) {}

  async getEmployee(id: number) {
    let dbClient: Client;

    try {
      // Get the credentials
      const credentials = await this.secretsService.getRDSCredentials();

      dbClient = new Client({
        user: credentials.username,
        password: credentials.password,
        host: this.configService.get<string>('DB_ENDPOINT'),
        port: 5432,
        database: 'user',
        application_name: 'critical_app',
        query_timeout: 10 * 1000,
        connectionTimeoutMillis: 10 * 1000,
        statement_timeout: 10 * 1000,
        idle_in_transaction_session_timeout: 10 * 1000,
      });

      const query = {
        text: 'select * from users where id=$1',
        values: [id],
      };

      await dbClient.connect();
      const results = await dbClient.query(query);

      return results.rows;
    } catch (e) {
      console.error('Failed to get Employee: ', e);
      throw e;
    } finally {
      try {
        console.log('Cleaning up connection');

        if (dbClient) {
          await dbClient.end();
        }
      } catch (e) {
        console.error('Failed to cleanup connection');
      }
    }
  }
}
