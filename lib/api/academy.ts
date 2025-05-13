import { BaseApi } from '../base-api';
import { apiFetch } from '../fetch';
import { Academy } from '@/types';

export const academyServerApi = new BaseApi<Academy, undefined>('/academies', apiFetch);
