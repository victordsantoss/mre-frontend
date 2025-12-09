import { api } from '@/configs/api'
import { News } from '../domain/news.types'

export const NewsService = {
  create: async (
    payload: News.ICreateNewsRequest
  ): Promise<News.ICreateNewsResponse> => {
    const { data } = await api.post('/news', payload)
    return data
  },
  get: async (code: string): Promise<News.INews> => {
    const { data } = await api.get(`/news/${code}`)
    return data
  },
  delete: async (code: string): Promise<void> => {
    await api.delete(`/news/${code}`)
  },
  update: async (
    code: string,
    payload: News.IUpdateNewsRequest
  ): Promise<News.IUpdateNewsResponse> => {
    const { data } = await api.put(`/news/${code}`, payload)
    return data
  },
}
