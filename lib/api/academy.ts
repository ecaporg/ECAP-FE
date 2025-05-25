import type { Academy } from '@/types';
import { BaseApi } from '../base-api';
import { apiFetch } from '../fetch';

export const academyServerApi = new BaseApi<Academy, undefined>('/academies', apiFetch);
