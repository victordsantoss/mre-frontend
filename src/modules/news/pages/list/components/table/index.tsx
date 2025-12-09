'use client'

import { useState } from 'react'
import { News } from '@/services/domain/news.types'
import { Eye, Edit, Trash2 } from '@deemlol/next-icons'
import moment from 'moment'
import { ViewNewsModal } from '@/modules/news/pages/components/view-modal'
import { UpdateNewsModal } from '@/modules/news/pages/components/update-modal'
import { DeleteNewsModal } from '@/modules/news/pages/components/delete-modal'
import { Pagination } from './components/pagination'
import { useTableModel } from './table.model'
import './styles.css'

interface INewsTableProps {
  news: News.IListNewsResponse
}

export function NewsTable({ news }: INewsTableProps) {
  const [selectedNewsCode, setSelectedNewsCode] = useState<string | null>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false)
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const {
    page,
    limit,
    limitOptions,
    goToNextPage,
    goToPreviousPage,
    goToPage,
    updateLimit,
  } = useTableModel()

  const { data, meta } = news
  const { total, totalPages } = meta

  function handleViewNews(code: string) {
    setSelectedNewsCode(code)
    setIsViewModalOpen(true)
  }

  function handleCloseViewModal() {
    setIsViewModalOpen(false)
    setSelectedNewsCode(null)
  }

  function handleUpdateNews(code: string) {
    setSelectedNewsCode(code)
    setIsUpdateModalOpen(true)
  }

  function handleCloseUpdateModal() {
    setIsUpdateModalOpen(false)
    setSelectedNewsCode(null)
  }

  function handleDeleteNews(code: string) {
    setSelectedNewsCode(code)
    setIsDeleteModalOpen(true)
  }

  function handleCloseDeleteModal() {
    setIsDeleteModalOpen(false)
    setSelectedNewsCode(null)
  }

  const renderPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    let startPage = Math.max(1, page - Math.floor(maxPagesToShow / 2))
    let endPage = Math.min(totalPages, startPage + maxPagesToShow - 1)

    if (endPage - startPage < maxPagesToShow - 1) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1)
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          onClick={() => goToPage(i)}
          className={`news-table__page-btn ${page === i ? 'news-table__page-btn--active' : ''}`}
          aria-label={`Ir para página ${i}`}
          aria-current={page === i ? 'page' : undefined}
        >
          {i}
        </button>
      )
    }

    return pages
  }

  if (!data || data.length === 0) {
    return (
      <div className="news-table__empty">
        <p>Nenhuma notícia encontrada.</p>
      </div>
    )
  }

  return (
    <div className="news-table">
      <div className="news-table__controls">
        <div className="news-table__info">
          <p>
            Mostrando <strong>{(page - 1) * limit + 1}</strong> até{' '}
            <strong>{Math.min(page * limit, total)}</strong> de{' '}
            <strong>{total}</strong> notícias
          </p>
        </div>

        <div className="news-table__limit-selector">
          <label htmlFor="limit-select" className="news-table__limit-label">
            Itens por página:
          </label>
          <select
            id="limit-select"
            value={limit}
            onChange={(e) => updateLimit(Number(e.target.value))}
            className="news-table__limit-select"
          >
            {limitOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="news-table__wrapper">
        <table className="news-table__table">
          <thead className="news-table__thead">
            <tr>
              <th className="news-table__th">Título</th>
              <th className="news-table__th">Descrição</th>
              <th className="news-table__th">Data de Publicação</th>
              <th className="news-table__th">Data de Criação</th>
              <th className="news-table__th">Data de Atualização</th>
              <th className="news-table__th">Ações</th>
            </tr>
          </thead>
          <tbody className="news-table__tbody">
            {data.map((newsItem) => (
              <tr key={newsItem.code} className="news-table__tr">
                <td className="news-table__td" data-label="Título">
                  <strong>{newsItem.title}</strong>
                </td>
                <td
                  className="news-table__td news-table__td--description"
                  data-label="Descrição"
                >
                  {newsItem.description}
                </td>
                <td className="news-table__td" data-label="Data de Publicação">
                  {moment(newsItem.publicationDate).format('DD/MM/YYYY HH:mm')}
                </td>
                <td className="news-table__td" data-label="Data de Criação">
                  {moment(newsItem.creationDate).format('DD/MM/YYYY HH:mm')}
                </td>
                <td className="news-table__td" data-label="Data de Atualização">
                  {moment(newsItem.updateDate).format('DD/MM/YYYY HH:mm')}
                </td>
                <td
                  className="news-table__td news-table__td--actions"
                  data-label="Ações"
                >
                  <div className="news-table__actions">
                    <button
                      onClick={() => handleViewNews(newsItem.code)}
                      className="news-table__action-btn news-table__action-btn--view"
                      aria-label="Visualizar notícia"
                      title="Visualizar"
                    >
                      <Eye size={18} />
                    </button>
                    <button
                      onClick={() => handleUpdateNews(newsItem.code)}
                      className="news-table__action-btn news-table__action-btn--edit"
                      aria-label="Editar notícia"
                      title="Editar"
                    >
                      <Edit size={18} />
                    </button>
                    <button
                      onClick={() => handleDeleteNews(newsItem.code)}
                      className="news-table__action-btn news-table__action-btn--delete"
                      aria-label="Excluir notícia"
                      title="Excluir"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={page}
        totalPages={totalPages}
        goToPreviousPage={goToPreviousPage}
        goToNextPage={goToNextPage}
        goToPage={goToPage}
        renderPageNumbers={renderPageNumbers}
      />

      <ViewNewsModal
        isOpen={isViewModalOpen}
        onClose={handleCloseViewModal}
        newsCode={selectedNewsCode}
      />

      <UpdateNewsModal
        isOpen={isUpdateModalOpen}
        onClose={handleCloseUpdateModal}
        newsCode={selectedNewsCode}
      />

      <DeleteNewsModal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
        newsCode={selectedNewsCode}
      />
    </div>
  )
}
