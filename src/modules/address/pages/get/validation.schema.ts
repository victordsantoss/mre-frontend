import { z } from 'zod'

export const addressSchema = z.object({
  cep: z
    .string()
    .min(1, 'CEP é obrigatório')
    .regex(
      /^\d{5}-?\d{3}$/,
      'CEP inválido. Use o formato: 00000-000 ou 00000000'
    )
    .transform((cep) => cep.replace('-', '')),
})

export type AddressFormData = z.infer<typeof addressSchema>
