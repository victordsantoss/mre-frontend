import './styles.css'

export function OnboardingFooter() {
  return (
    <footer className="onboarding-footer">
      <div className="onboarding-footer__container">
        <div className="onboarding-footer__content">
          <p>&copy; {new Date().getFullYear()} MRE. All rights reserved.</p>
        </div>
        <nav className="onboarding-footer__nav" aria-label="Footer navigation">
          {/* Footer links can be added here */}
        </nav>
      </div>
    </footer>
  )
}

