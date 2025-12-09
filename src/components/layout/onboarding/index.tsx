import { OnboardingHeader } from './components/header'
import { OnboardingFooter } from './components/footer'
import './styles.css'

interface OnboardingLayoutProps {
  children: React.ReactNode
}

export function OnboardingLayout({ children }: OnboardingLayoutProps) {
  return (
    <div className="onboarding-layout">
      <OnboardingHeader />
      <main className="onboarding-layout__main">{children}</main>
      <OnboardingFooter />
    </div>
  )
}
