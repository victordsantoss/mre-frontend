'use client'

import { useQuery } from '@tanstack/react-query'
import { X } from '@deemlol/next-icons'
import moment from 'moment'
import { NewsService } from '@/services/client/news.service'
import './styles.css'

interface IViewNewsModalProps {
  isOpen: boolean
  onClose: () => void
  newsCode: string | null
}

export function ViewNewsModal({
  isOpen,
  onClose,
  newsCode,
}: IViewNewsModalProps) {
  const { data: news, isLoading } = useQuery({
    queryKey: ['news', newsCode],
    queryFn: () => NewsService.get(newsCode!),
    enabled: !!newsCode && isOpen,
  })

  if (!isOpen) return null

  return (
    <div className="view-news-modal">
      <div
        className="view-news-modal__overlay"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="view-news-modal__content" role="dialog" aria-modal="true">
        <div className="view-news-modal__header">
          <h2 className="view-news-modal__title">Detalhes da Notícia</h2>
          <button
            type="button"
            className="view-news-modal__close"
            onClick={onClose}
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="view-news-modal__body">
          {isLoading ? (
            <div className="view-news-modal__loading">
              <div className="view-news-modal__spinner" />
              <p>Carregando...</p>
            </div>
          ) : news ? (
            <div className="view-news-modal__details">
              <div className="view-news-modal__field">
                <label className="view-news-modal__label">Código</label>
                <p className="view-news-modal__value view-news-modal__value--code">
                  {news.code}
                </p>
              </div>

              <div className="view-news-modal__field">
                <label className="view-news-modal__label">Título</label>
                <p className="view-news-modal__value view-news-modal__value--title">
                  {news.title}
                </p>
              </div>

              <div className="view-news-modal__field">
                <label className="view-news-modal__label">Descrição</label>
                <p className="view-news-modal__value view-news-modal__value--description">
                  {news.description}
                </p>
              </div>

              <div className="view-news-modal__dates">
                <div className="view-news-modal__field">
                  <label className="view-news-modal__label">
                    Data de Publicação
                  </label>
                  <p className="view-news-modal__value">
                    {moment(news.publicationDate).format('DD/MM/YYYY HH:mm')}
                  </p>
                </div>

                <div className="view-news-modal__field">
                  <label className="view-news-modal__label">
                    Data de Criação
                  </label>
                  <p className="view-news-modal__value">
                    {moment(news.creationDate).format('DD/MM/YYYY HH:mm')}
                  </p>
                </div>

                <div className="view-news-modal__field">
                  <label className="view-news-modal__label">
                    Data de Atualização
                  </label>
                  <p className="view-news-modal__value">
                    {moment(news.updateDate).format('DD/MM/YYYY HH:mm')}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="view-news-modal__error">
              <p>Não foi possível carregar os dados da notícia.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
