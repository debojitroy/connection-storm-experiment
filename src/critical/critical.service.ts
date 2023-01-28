import { Injectable } from '@nestjs/common';
import { SecretsService } from '../secrets/secrets.service';

@Injectable()
export class CriticalService {
  constructor(private readonly secretsService: SecretsService) {}

  async getValues() {
    return this.secretsService.getRDSCredentials();
  }
}
