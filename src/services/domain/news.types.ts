import {
  IPaginatedRequest,
  IPaginatedResponse,
} from '@/common/types/base-pagination.types'

export namespace News {
  export type INews = {
    code: string
    title: string
    description: string
    publicationDate: string
    creationDate: string
    updateDate: string
  }
  export type ICreateNewsRequest = {
    title: string
    description: string
    publicationDate: string
  }
  export type ICreateNewsResponse = INews
  export type IListNewsRequest = IPaginatedRequest
  export type IListNewsResponse = IPaginatedResponse<INews>
  export type IUpdateNewsRequest = {
    title: string
    description: string
    publicationDate: string
  }
  export type IUpdateNewsResponse = INews
}
