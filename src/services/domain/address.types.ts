export namespace Address {
  export type IAddress = {
    cep: string
    street: string
    complement: string
    district: string
    city: string
    state: string
    ibge: string
    gia: string
    areaCode: string
    siafi: string
  }
  export type IGetByCepResponse = IAddress
}
