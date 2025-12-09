'use client'

import { useState } from 'react'
import { IPaginatedResponse } from '@/common/types/base-pagination.types'
import { News } from '@/services/domain/news.types'
import { NewsFilter } from './components/filter'
import { NewsTable } from './components/table'
import { Button } from '@/components/button'
import { CreateNewsModal } from '../components/create-modal'
import './styles.css'

interface IListNewsProps {
  news: IPaginatedResponse<News.IListNewsResponse>
}

export function ListNews({ news }: IListNewsProps) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)

  return (
    <div className="list-news">
      <header className="list-news__header">
        <div className="list-news__header-content">
          <div className="list-news__header-text">
            <h1 className="list-news__title">Notícias</h1>
            <p className="list-news__description">
              Confira abaixo a lista completa de notícias publicadas. Utilize os
              filtros para encontrar o que você procura.
            </p>
          </div>
          <Button
            color="primary"
            variant="solid"
            size="md"
            onClick={() => setIsCreateModalOpen(true)}
          >
            Criar notícia
          </Button>
        </div>
      </header>

      <NewsFilter />

      <div className="list-news__content">
        <NewsTable news={news} />
      </div>

      <CreateNewsModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  )
}
