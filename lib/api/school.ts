import type { School } from '@/types';
import { BaseApi } from '../base-api';
import { apiFetch } from '../fetch';

export const schoolServerApi = new BaseApi<School, undefined>('/schools', apiFetch);
