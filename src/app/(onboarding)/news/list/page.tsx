import { handleApiError } from '@/configs/api/ssr-fetch'
import { listNews } from '@/services/server/news.service'
import { News } from '@/services/domain/news.types'
import { IPaginatedResponse } from '@/common/types/base-pagination.types'


export default async function Page() {
  const news = await listNews({
    limit: 10,
    page: 1,
    orderBy: 'publicationDate',
    sortBy: 'ASC',
  })
  const newsData = handleApiError<IPaginatedResponse<News.IListNewsResponse>>(news)

  return <>TESTE LIST PAGE</>
}
