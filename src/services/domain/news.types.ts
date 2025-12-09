import { IPaginatedRequest } from "@/common/types/base-pagination.types"

export namespace News {
    export type ICreateNewsRequest = {
        title: string
        description: string
        publicationDate: string
    }
    export type ICreateNewsResponse = {
        code: string
        title: string
        description: string
        publicationDate: string
        creationDate: string
        updateDate: string
    }
    export type IListNewsRequest = IPaginatedRequest;
    export type IListNewsResponse = {
        code: string
        title: string
        description: string
        publicationDate: string
        creationDate: string
        updateDate: string
    }
  }
  