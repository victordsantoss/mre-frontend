'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateAllTags() {
  revalidateTag('*')
}

export async function revalidateNewsList() {
  revalidateTag('list-news')
}
