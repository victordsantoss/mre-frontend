interface IPaginationProps {
  page: number
  totalPages: number
  goToPreviousPage: () => void
  goToNextPage: (totalPages: number) => void
  goToPage: (page: number) => void
  renderPageNumbers: () => React.ReactNode[]
}

export function Pagination({
  page,
  totalPages,
  goToPreviousPage,
  goToNextPage,
  goToPage,
  renderPageNumbers,
}: IPaginationProps) {
  return (
    <div className="news-table__pagination">
      <button
        onClick={goToPreviousPage}
        disabled={page === 1}
        className="news-table__nav-btn"
        aria-label="Página anterior"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M12.5 15L7.5 10L12.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Anterior
      </button>

      <div className="news-table__page-numbers">
        {page > 3 && (
          <>
            <button
              onClick={() => goToPage(1)}
              className="news-table__page-btn"
              aria-label="Ir para primeira página"
            >
              1
            </button>
            {page > 4 && <span className="news-table__ellipsis">...</span>}
          </>
        )}

        {renderPageNumbers()}

        {page < totalPages - 2 && (
          <>
            {page < totalPages - 3 && (
              <span className="news-table__ellipsis">...</span>
            )}
            <button
              onClick={() => goToPage(totalPages)}
              className="news-table__page-btn"
              aria-label="Ir para última página"
            >
              {totalPages}
            </button>
          </>
        )}
      </div>

      <button
        onClick={() => goToNextPage(totalPages)}
        disabled={page === totalPages}
        className="news-table__nav-btn"
        aria-label="Próxima página"
      >
        Próxima
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.5 15L12.5 10L7.5 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  )
}
