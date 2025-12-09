import { handleApiError } from '@/configs/api/ssr-fetch'
import { listNews } from '@/services/server/news.service'
import { News } from '@/services/domain/news.types'
import { IPaginatedResponse } from '@/common/types/base-pagination.types'
import { ListNews } from '@/modules/news/pages/list'
import { ICommonSearchParams } from '@/common/types/common.types'

interface PageProps {
  searchParams: Promise<ICommonSearchParams>
}

export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams

  const limit = params.limit ? Number(params.limit) : 10
  const page = params.page ? Number(params.page) : 1
  const orderBy = (params.orderBy as string) || 'publicationDate'
  const sortBy = (params.sortBy as 'ASC' | 'DESC') || 'DESC'
  const search = params.search as string | undefined

  const news = await listNews({
    limit,
    page,
    orderBy,
    sortBy,
    search,
  })

  const newsData = handleApiError<IPaginatedResponse<News.INews>>(news)

  return <ListNews news={newsData} />
}
