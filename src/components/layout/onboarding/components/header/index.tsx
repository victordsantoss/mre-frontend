import './styles.css'

export function OnboardingHeader() {
  return (
    <header className="onboarding-header">
      <div className="onboarding-header__container">
        <div className="onboarding-header__logo">
          <h1>MRE</h1>
        </div>
        <nav className="onboarding-header__nav" aria-label="Primary navigation">
          {/* Navigation items can be added here */}
        </nav>
      </div>
    </header>
  )
}
