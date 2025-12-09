'use client'

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { X } from '@deemlol/next-icons'
import { NewsService } from '@/services/client/news.service'
import { revalidateNewsList } from '@/common/actions/revalidate-all.actions'
import { CreateNewsForm } from './form'
import { createNewsSchema, CreateNewsFormData } from './validation.schema'
import './styles.css'

interface ICreateNewsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CreateNewsModal({ isOpen, onClose }: ICreateNewsModalProps) {
  const queryClient = useQueryClient()

  const form = useForm<CreateNewsFormData>({
    resolver: zodResolver(createNewsSchema),
    defaultValues: {
      title: '',
      description: '',
      publicationDate: '',
    },
  })

  const createNewsMutation = useMutation({
    mutationFn: NewsService.create,
    onSuccess: async () => {
      await revalidateNewsList()
      queryClient.invalidateQueries({ queryKey: ['news'] })
      form.reset()
      onClose()
    },
    onError: (error) => {
      console.error('Erro ao criar notícia:', error)
    },
  })

  function handleSubmit(data: CreateNewsFormData) {
    createNewsMutation.mutate({
      title: data.title,
      description: data.description,
      publicationDate: new Date(data.publicationDate).toISOString(),
    })
  }

  function handleClose() {
    if (!createNewsMutation.isPending) {
      form.reset()
      onClose()
    }
  }

  if (!isOpen) return null

  return (
    <div className="create-news-modal">
      <div
        className="create-news-modal__overlay"
        onClick={handleClose}
        aria-hidden="true"
      />
      <div
        className="create-news-modal__content"
        role="dialog"
        aria-modal="true"
      >
        <div className="create-news-modal__header">
          <h2 className="create-news-modal__title">Criar Nova Notícia</h2>
          <button
            type="button"
            className="create-news-modal__close"
            onClick={handleClose}
            disabled={createNewsMutation.isPending}
            aria-label="Fechar modal"
          >
            <X size={24} />
          </button>
        </div>

        <div className="create-news-modal__body">
          <CreateNewsForm
            form={form}
            onSubmit={handleSubmit}
            isLoading={createNewsMutation.isPending}
          />
        </div>
      </div>
    </div>
  )
}
