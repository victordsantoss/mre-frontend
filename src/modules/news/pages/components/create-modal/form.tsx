import { UseFormReturn } from 'react-hook-form'
import { CreateNewsFormData } from './validation.schema'

interface ICreateNewsFormProps {
  form: UseFormReturn<CreateNewsFormData>
  onSubmit: (data: CreateNewsFormData) => void
  isLoading: boolean
}

export function CreateNewsForm({
  form,
  onSubmit,
  isLoading,
}: ICreateNewsFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="create-news-form">
      <div className="create-news-form__field">
        <label htmlFor="title" className="create-news-form__label">
          Título <span className="create-news-form__required">*</span>
        </label>
        <input
          id="title"
          type="text"
          className={`create-news-form__input ${errors.title ? 'create-news-form__input--error' : ''}`}
          placeholder="Digite o título da notícia"
          disabled={isLoading}
          {...register('title')}
        />
        {errors.title && (
          <span className="create-news-form__error">
            {errors.title.message}
          </span>
        )}
      </div>

      <div className="create-news-form__field">
        <label htmlFor="description" className="create-news-form__label">
          Descrição <span className="create-news-form__required">*</span>
        </label>
        <textarea
          id="description"
          rows={5}
          className={`create-news-form__textarea ${errors.description ? 'create-news-form__input--error' : ''}`}
          placeholder="Digite a descrição da notícia"
          disabled={isLoading}
          {...register('description')}
        />
        {errors.description && (
          <span className="create-news-form__error">
            {errors.description.message}
          </span>
        )}
      </div>

      <div className="create-news-form__field">
        <label htmlFor="publicationDate" className="create-news-form__label">
          Data de Publicação{' '}
          <span className="create-news-form__required">*</span>
        </label>
        <input
          id="publicationDate"
          type="datetime-local"
          className={`create-news-form__input ${errors.publicationDate ? 'create-news-form__input--error' : ''}`}
          disabled={isLoading}
          {...register('publicationDate')}
        />
        {errors.publicationDate && (
          <span className="create-news-form__error">
            {errors.publicationDate.message}
          </span>
        )}
      </div>

      <div className="create-news-form__actions">
        <button
          type="submit"
          className="create-news-form__submit"
          disabled={isLoading}
        >
          {isLoading ? 'Criando...' : 'Criar Notícia'}
        </button>
      </div>
    </form>
  )
}
