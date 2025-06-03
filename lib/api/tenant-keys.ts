import type { Tenant } from '@/types';
import { BaseApi } from '../base-api';
import type { ApiResponse } from '../fetch';
import { apiFetch } from '../fetch';

class TenantKeysServerApi extends BaseApi<Tenant['key'], undefined> {
  constructor() {
    super('/tenant-keys', apiFetch);
  }

  async getAccessToken() {
    return this.get('access-token', {
      cache: 'force-cache',
      tags: ['tenant-key'],
    }) as ApiResponse<Tenant['key'], undefined>;
  }

  async refreshSessionToken(session_token: string) {
    return this.fetch(`${this.url}/tenant-keys/refresh-session-token`, {
      method: 'POST',
      body: JSON.stringify({ session_token }),
    });
  }
}

export const tenantKeysServerApi = new TenantKeysServerApi();
