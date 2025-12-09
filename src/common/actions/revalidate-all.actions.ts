'use server'

import { revalidateTag } from 'next/cache'

export async function revalidateAllTags() {
  revalidateTag('*', 'force-cache')
}

export async function revalidateNewsList() {
  revalidateTag('list-news', 'force-cache')
}
