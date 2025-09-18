import type { IAcademy } from '@/types';
import { BaseApi } from '../base-api';
import { apiFetch } from '../fetch';

export const academyServerApi = new BaseApi<IAcademy, undefined>('/academies', apiFetch);
