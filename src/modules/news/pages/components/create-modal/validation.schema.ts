import { z } from 'zod'

export const createNewsSchema = z.object({
  title: z
    .string()
    .min(1, 'Título é obrigatório')
    .min(3, 'Título deve ter no mínimo 3 caracteres')
    .max(255, 'Título deve ter no máximo 255 caracteres'),
  description: z
    .string()
    .min(1, 'Descrição é obrigatória')
    .min(10, 'Descrição deve ter no mínimo 10 caracteres')
    .max(1000, 'Descrição deve ter no máximo 1000 caracteres'),
  publicationDate: z
    .string()
    .min(1, 'Data de publicação é obrigatória')
    .refine((date) => {
      const parsed = new Date(date)
      return !isNaN(parsed.getTime())
    }, 'Data de publicação inválida'),
})

export type CreateNewsFormData = z.infer<typeof createNewsSchema>
