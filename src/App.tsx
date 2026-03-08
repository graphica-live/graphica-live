import Layout from './components/layout/Layout'
import HeroSection from './components/sections/HeroSection'
import ProblemsSection from './components/sections/ProblemsSection'
import ServicesSection from './components/sections/ServicesSection'
import BenefitBanner from './components/sections/BenefitBanner'
import ProcessSection from './components/sections/ProcessSection'
import PricingSection from './components/sections/PricingSection'
import ContactSection from './components/sections/ContactSection'

function App() {
  return (
    <Layout>
      <HeroSection />
      <ProblemsSection />
      <ServicesSection />
      <BenefitBanner />
      <ProcessSection />
      <PricingSection />
      <ContactSection />
    </Layout>
  )
}

export default App

