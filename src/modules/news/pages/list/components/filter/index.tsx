'use client'

import './styles.css'
import { orderOptions, useFilterModel } from './filter.model'

export function NewsFilter() {
  const {
    sortOptions,
    filterState,
    setFilterState,
    debouncedUpdateQueryParam,
  } = useFilterModel()

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setFilterState((prev) => ({ ...prev, search: value }))
    debouncedUpdateQueryParam('search', value || null)
  }

  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    const selectedOption =
      sortOptions.find((option) => option.value === value) || null
    setFilterState((prev) => ({ ...prev, sortBy: selectedOption }))
    debouncedUpdateQueryParam('sortBy', value || null)
  }

  const handleOrderByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    const selectedOption =
      orderOptions.find((option) => option.value === value) || null
    setFilterState((prev) => ({ ...prev, orderBy: selectedOption }))
    debouncedUpdateQueryParam('orderBy', value || null)
  }

  return (
    <div className="news-filter">
      <div className="news-filter__container">
        <div className="news-filter__input-group news-filter__input-group--search">
          <label htmlFor="search-filter" className="news-filter__label">
            Buscar notícias
          </label>
          <input
            id="search-filter"
            type="text"
            value={filterState.search}
            onChange={handleSearchChange}
            placeholder="Digite para filtrar..."
            className="news-filter__input"
          />
        </div>

        <div className="news-filter__select-group news-filter__select-group--sort">
          <label htmlFor="sort-select" className="news-filter__label">
            Ordenar por
          </label>
          <select
            id="sort-select"
            value={filterState.sortBy?.value || ''}
            onChange={handleSortByChange}
            className="news-filter__select"
          >
            <option value="">Selecione</option>
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div className="news-filter__select-group news-filter__select-group--order">
          <label htmlFor="order-select" className="news-filter__label">
            Campo
          </label>
          <select
            id="order-select"
            value={filterState.orderBy?.value || ''}
            onChange={handleOrderByChange}
            className="news-filter__select"
          >
            <option value="">Selecione</option>
            {orderOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  )
}
