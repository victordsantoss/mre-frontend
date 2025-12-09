import { UseFormReturn } from 'react-hook-form'
import { UpdateNewsFormData } from './validation.schema'

interface IUpdateNewsFormProps {
  form: UseFormReturn<UpdateNewsFormData>
  onSubmit: (data: UpdateNewsFormData) => void
  isLoading: boolean
}

export function UpdateNewsForm({
  form,
  onSubmit,
  isLoading,
}: IUpdateNewsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="update-news-form">
      <div className="update-news-form__field">
        <label htmlFor="update-title" className="update-news-form__label">
          Título <span className="update-news-form__required">*</span>
        </label>
        <input
          id="update-title"
          type="text"
          className={`update-news-form__input ${errors.title ? 'update-news-form__input--error' : ''}`}
          placeholder="Digite o título da notícia"
          disabled={isLoading}
          {...register('title')}
        />
        {errors.title && (
          <span className="update-news-form__error">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="update-news-form__field">
        <label htmlFor="update-description" className="update-news-form__label">
          Descrição <span className="update-news-form__required">*</span>
        </label>
        <textarea
          id="update-description"
          rows={5}
          className={`update-news-form__textarea ${errors.description ? 'update-news-form__input--error' : ''}`}
          placeholder="Digite a descrição da notícia"
          disabled={isLoading}
          {...register('description')}
        />
        {errors.description && (
          <span className="update-news-form__error">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="update-news-form__field">
        <label
          htmlFor="update-publicationDate"
          className="update-news-form__label"
        >
          Data de Publicação{' '}
          <span className="update-news-form__required">*</span>
        </label>
        <input
          id="update-publicationDate"
          type="datetime-local"
          className={`update-news-form__input ${errors.publicationDate ? 'update-news-form__input--error' : ''}`}
          disabled={isLoading}
          {...register('publicationDate')}
        />
        {errors.publicationDate && (
          <span className="update-news-form__error">
            {errors.publicationDate.message}
          </span>
        )}
      </div>

      <div className="update-news-form__actions">
        <button
          type="submit"
          className="update-news-form__submit"
          disabled={isLoading}
        >
          {isLoading ? 'Atualizando...' : 'Atualizar Notícia'}
        </button>
      </div>
    </form>
  )
}
