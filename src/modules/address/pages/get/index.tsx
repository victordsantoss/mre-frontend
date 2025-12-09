'use client'

import { useMutation } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { AddressService } from '@/services/client/address.service'
import { AddressResult } from './components/result'
import { addressSchema, AddressFormData } from './validation.schema'
import './styles.css'

export function AddressPage() {
  const form = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      cep: '',
    },
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form

  const addressMutation = useMutation({
    mutationFn: AddressService.getByCep,
    onError: (error) => {
      console.error('Erro ao buscar endereço:', error)
    },
  })

  function onSubmit(data: AddressFormData) {
    addressMutation.mutate(data.cep)
  }

  function formatCep(value: string) {
    const numbers = value.replace(/\D/g, '')
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)}-${numbers.slice(5, 8)}`
  }

  function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatCep(e.target.value)
    e.target.value = formatted
  }

  return (
    <div className="address-page">
      <div className="address-page__container">
        <h1 className="address-page__title">Consultar CEP</h1>

        <form onSubmit={handleSubmit(onSubmit)} className="address-page__form">
          <div className="address-page__field">
            <label htmlFor="cep" className="address-page__label">
              CEP <span className="address-page__required">*</span>
            </label>
            <input
              id="cep"
              type="text"
              className={`address-page__input ${errors.cep ? 'address-page__input--error' : ''}`}
              placeholder="00000-000"
              maxLength={9}
              disabled={addressMutation.isPending}
              {...register('cep', {
                onChange: handleCepChange,
              })}
            />
            {errors.cep && (
              <span className="address-page__error">{errors.cep.message}</span>
            )}
          </div>

          <button
            type="submit"
            className="address-page__submit"
            disabled={addressMutation.isPending}
          >
            {addressMutation.isPending ? 'Buscando...' : 'Buscar CEP'}
          </button>
        </form>

        {addressMutation.isError && (
          <div className="address-page__message address-page__message--error">
            <p>
              Erro ao buscar o CEP. Verifique se o CEP está correto e tente
              novamente.
            </p>
          </div>
        )}

        {addressMutation.isSuccess && addressMutation.data && (
          <AddressResult address={addressMutation.data} />
        )}
      </div>
    </div>
  )
}
