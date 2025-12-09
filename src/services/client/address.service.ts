import { api } from '@/configs/api'
import { News } from '../domain/news.types'

export const AddressService = {
  getByCep: async (cep: string): Promise<News.INews> => {
    const { data } = await api.get(`/address/${cep}`)
    return data
  },
}
