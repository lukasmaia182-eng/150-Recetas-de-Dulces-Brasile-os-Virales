import { Hero } from '@/components/offer/hero'
import { BrazilSection } from '@/components/offer/brazil-section'
import { ProblemSection } from '@/components/offer/problem-section'
import { SolutionSection } from '@/components/offer/solution-section'
import { IncludesSection } from '@/components/offer/includes-section'
import { CategoriesSection } from '@/components/offer/categories-section'
import { SimpleWaySection } from '@/components/offer/simple-way-section'
import { BonusSection } from '@/components/offer/bonus-section'
import { PricingSection } from '@/components/offer/pricing-section'
import { GuaranteeSection } from '@/components/offer/guarantee-section'
import { FaqSection } from '@/components/offer/faq-section'
import { FinalCta, SiteFooter } from '@/components/offer/final-cta'

export default function Page() {
  return (
    <main>
      <Hero />
      <BrazilSection />
      <ProblemSection />
      <SolutionSection />
      <IncludesSection />
      <CategoriesSection />
      <SimpleWaySection />
      <BonusSection />
      <PricingSection />
      <GuaranteeSection />
      <FaqSection />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}
