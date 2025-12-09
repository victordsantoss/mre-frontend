'use client'

import { useEffect } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from '@deemlol/next-icons'
import moment from 'moment'
import { NewsService } from '@/services/client/news.service'
import { revalidateNewsList } from '@/common/actions/revalidate-all.actions'
import { UpdateNewsForm } from './form'
import { updateNewsSchema, UpdateNewsFormData } from './validation.schema'
import './styles.css'

interface IUpdateNewsModalProps {
  isOpen: boolean
  onClose: () => void
  newsCode: string | null
}

export function UpdateNewsModal({
  isOpen,
  onClose,
  newsCode,
}: IUpdateNewsModalProps) {
  const queryClient = useQueryClient()

  const { data: news, isLoading: isLoadingNews } = useQuery({
    queryKey: ['news', newsCode],
    queryFn: () => NewsService.get(newsCode!),
    enabled: !!newsCode && isOpen,
  })

  const form = useForm<UpdateNewsFormData>({
    resolver: zodResolver(updateNewsSchema),
    defaultValues: {
      title: '',
      description: '',
      publicationDate: '',
    },
  })

  useEffect(() => {
    if (news) {
      const publicationDate = moment(news.publicationDate).format(
        'YYYY-MM-DDTHH:mm'
      )
      form.reset({
        title: news.title,
        description: news.description,
        publicationDate,
      })
    }
  }, [news, form])

  const updateNewsMutation = useMutation({
    mutationFn: (data: UpdateNewsFormData) =>
      NewsService.update(newsCode!, {
        title: data.title,
        description: data.description,
        publicationDate: new Date(data.publicationDate).toISOString(),
      }),
    onSuccess: async () => {
      await revalidateNewsList()
      queryClient.invalidateQueries({ queryKey: ['news'] })
      form.reset()
      onClose()
    },
    onError: (error) => {
      console.error('Erro ao atualizar notícia:', error)
    },
  })

  function handleSubmit(data: UpdateNewsFormData) {
    updateNewsMutation.mutate(data)
  }

  function handleClose() {
    if (!updateNewsMutation.isPending) {
      form.reset()
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="update-news-modal">
      <div
        className="update-news-modal__overlay"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className="update-news-modal__content"
        role="dialog"
        aria-modal="true"
      >
        <div className="update-news-modal__header">
          <h2 className="update-news-modal__title">Editar Notícia</h2>
          <button
            type="button"
            className="update-news-modal__close"
            onClick={handleClose}
            disabled={updateNewsMutation.isPending}
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="update-news-modal__body">
          {isLoadingNews ? (
            <div className="update-news-modal__loading">
              <div className="update-news-modal__spinner" />
              <p>Carregando...</p>
            </div>
          ) : (
            <UpdateNewsForm
              form={form}
              onSubmit={handleSubmit}
              isLoading={updateNewsMutation.isPending}
            />
          )}
        </div>
      </div>
    </div>
  )
}
