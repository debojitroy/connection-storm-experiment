import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from '@aws-sdk/client-secrets-manager';

export interface RdsCredentials {
  username: string;
  password: string;
}

@Injectable()
export class SecretsService {
  private secretManagerClient: SecretsManagerClient;

  constructor(
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
    private configService: ConfigService,
  ) {
    this.secretManagerClient = new SecretsManagerClient({});
  }

  async getRDSCredentials(): Promise<RdsCredentials> {
    try {
      const secretName = this.configService.get<string>('RDS_SECRET');

      // Lookup in Cache
      const rdsCredentials = await this.cacheManager.get<RdsCredentials>(
        secretName,
      );

      // Not Found in cache
      if (!rdsCredentials) {
        console.log('NOT Found in cache, fetching from Remote');

        // Lookup Remote
        const response = await this.secretManagerClient.send(
          new GetSecretValueCommand({
            SecretId: secretName,
          }),
        );

        const rdsCredentials = JSON.parse(response.SecretString);

        console.log('Found in REMOTE, saving to cache');

        // Save to cache
        await this.cacheManager.set(secretName, rdsCredentials);

        return rdsCredentials;
      }

      console.log('Found in cache, returning cached value');

      // Found in Cache
      return rdsCredentials;
    } catch (e) {
      console.error('Failed to get RDS Credentials...', e);
    }
  }
}
