import Link from 'next/link'
import './styles.css'

export function OnboardingHeader() {
  return (
    <header className="onboarding-header">
      <div className="onboarding-header__container">
        <div className="onboarding-header__logo">
          <Link href="/">
            <h1>MRE</h1>
          </Link>
        </div>
        <nav className="onboarding-header__nav" aria-label="Primary navigation">
          <Link href="/news/list" className="onboarding-header__link">
            Notícias
          </Link>
          <Link href="/address" className="onboarding-header__link">
            Consultar CEP
          </Link>
        </nav>
      </div>
    </header>
  )
}
