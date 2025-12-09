'use server'

import { apiFetch } from '@/configs/api/ssr-fetch'
import { IFetchSuccessResponse } from '@/common/types/fetch.types'
import { News } from '@/services/domain/news.types'    
import { IPaginatedResponse } from '@/common/types/base-pagination.types'

export async function listNews(filters: News.IListNewsRequest) {
  return await apiFetch<IFetchSuccessResponse<IPaginatedResponse<News.IListNewsResponse>>>(
    '/news',
    {
      method: 'GET',
      next: {
        tags: ['list-news'],
      },
      cache: 'no-cache',
    },
    filters
  );
}


