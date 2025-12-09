'use client'

import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { X, AlertTriangle } from '@deemlol/next-icons'
import { NewsService } from '@/services/client/news.service'
import { revalidateNewsList } from '@/common/actions/revalidate-all.actions'
import './styles.css'

interface IDeleteNewsModalProps {
  isOpen: boolean
  onClose: () => void
  newsCode: string | null
}

export function DeleteNewsModal({
  isOpen,
  onClose,
  newsCode,
}: IDeleteNewsModalProps) {
  const [confirmationText, setConfirmationText] = useState('')
  const queryClient = useQueryClient()

  const { data: news } = useQuery({
    queryKey: ['news', newsCode],
    queryFn: () => NewsService.get(newsCode!),
    enabled: !!newsCode && isOpen,
  })

  const deleteNewsMutation = useMutation({
    mutationFn: (code: string) => NewsService.delete(code),
    onSuccess: async () => {
      await revalidateNewsList()
      queryClient.invalidateQueries({ queryKey: ['news'] })
      handleClose()
    },
    onError: (error) => {
      console.error('Erro ao deletar notícia:', error)
    },
  })

  function handleClose() {
    setConfirmationText('')
    onClose()
  }

  function handleDelete() {
    if (newsCode && confirmationText === news?.title) {
      deleteNewsMutation.mutate(newsCode)
    }
  }

  const isConfirmationValid = confirmationText === news?.title
  const canDelete = isConfirmationValid && !deleteNewsMutation.isPending

  if (!isOpen) return null

  return (
    <div className="delete-news-modal">
      <div
        className="delete-news-modal__overlay"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className="delete-news-modal__content"
        role="dialog"
        aria-modal="true"
      >
        <div className="delete-news-modal__header">
          <div className="delete-news-modal__header-content">
            <div className="delete-news-modal__icon">
              <AlertTriangle size={24} />
            </div>
            <h2 className="delete-news-modal__title">Excluir Notícia</h2>
          </div>
          <button
            type="button"
            className="delete-news-modal__close"
            onClick={handleClose}
            disabled={deleteNewsMutation.isPending}
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="delete-news-modal__body">
          {news ? (
            <>
              <div className="delete-news-modal__warning">
                <p className="delete-news-modal__warning-text">
                  Esta ação é <strong>irreversível</strong>. Ao excluir esta
                  notícia, todos os seus dados serão permanentemente removidos
                  do sistema.
                </p>
              </div>

              <div className="delete-news-modal__news-info">
                <p className="delete-news-modal__news-label">
                  Você está prestes a excluir:
                </p>
                <p className="delete-news-modal__news-title">{news.title}</p>
                <p className="delete-news-modal__news-code">
                  Código: {news.code}
                </p>
              </div>

              <div className="delete-news-modal__confirmation">
                <label
                  htmlFor="confirmation-input"
                  className="delete-news-modal__confirmation-label"
                >
                  Para confirmar, digite o título da notícia abaixo:
                </label>
                <input
                  id="confirmation-input"
                  type="text"
                  className="delete-news-modal__confirmation-input"
                  placeholder="Digite o título da notícia"
                  value={confirmationText}
                  onChange={(e) => setConfirmationText(e.target.value)}
                  disabled={deleteNewsMutation.isPending}
                  autoComplete="off"
                />
                {confirmationText && !isConfirmationValid && (
                  <p className="delete-news-modal__confirmation-error">
                    O título digitado não corresponde ao título da notícia.
                  </p>
                )}
              </div>

              <div className="delete-news-modal__actions">
                <button
                  type="button"
                  className="delete-news-modal__button delete-news-modal__button--cancel"
                  onClick={handleClose}
                  disabled={deleteNewsMutation.isPending}
                >
                  Cancelar
                </button>
                <button
                  type="button"
                  className="delete-news-modal__button delete-news-modal__button--delete"
                  onClick={handleDelete}
                  disabled={!canDelete}
                >
                  {deleteNewsMutation.isPending
                    ? 'Excluindo...'
                    : 'Excluir Notícia'}
                </button>
              </div>
            </>
          ) : (
            <div className="delete-news-modal__loading">
              <div className="delete-news-modal__spinner" />
              <p>Carregando...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
