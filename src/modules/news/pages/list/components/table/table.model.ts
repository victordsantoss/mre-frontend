import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export interface ITableModelProps {
  defaultLimit?: number
  defaultPage?: number
}

export const limitOptions = [
  { value: 5, label: '5 por página' },
  { value: 10, label: '10 por página' },
  { value: 15, label: '15 por página' },
]

export const useTableModel = ({
  defaultLimit = 10,
  defaultPage = 1,
}: ITableModelProps = {}) => {
  const searchParams = useSearchParams()
  const { replace } = useRouter()
  const pathname = usePathname()

  const currentPage = Number(searchParams.get('page')) || defaultPage
  const currentLimit = Number(searchParams.get('limit')) || defaultLimit

  const [page, setPage] = useState(currentPage)
  const [limit, setLimit] = useState(currentLimit)

  // Sincroniza o estado local com os searchParams quando eles mudarem
  useEffect(() => {
    setPage(currentPage)
    setLimit(currentLimit)
  }, [currentPage, currentLimit])

  const updatePage = (newPage: number) => {
    if (newPage > 0) {
      const params = new URLSearchParams(searchParams.toString())
      params.set('page', newPage.toString())
      replace(`${pathname}?${params.toString()}`)
    }
  }

  const updateLimit = (newLimit: number) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('limit', newLimit.toString())
    params.set('page', '1')
    replace(`${pathname}?${params.toString()}`)
  }

  const goToNextPage = (totalPages: number) => {
    if (page < totalPages) {
      updatePage(page + 1)
    }
  }

  const goToPreviousPage = () => {
    if (page > 1) {
      updatePage(page - 1)
    }
  }

  const goToPage = (targetPage: number) => {
    updatePage(targetPage)
  }

  return {
    page,
    limit,
    limitOptions,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    updateLimit,
  }
}
