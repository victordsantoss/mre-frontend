import { api } from '@/configs/api'
import { News } from '../domain/news.types'

export const NewsService = {
  create: async (
    payload: News.ICreateNewsRequest
  ): Promise<News.ICreateNewsResponse> => {
    const { data } = await api.post('/news', payload)
    return data
  },
}
