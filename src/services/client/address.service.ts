import { api } from '@/configs/api'
import { Address } from '../domain/address.types'

export const AddressService = {
  getByCep: async (cep: string): Promise<Address.IGetByCepResponse> => {
    const { data } = await api.get(`/address/${cep}`)
    return data
  },
}
