import { useState } from 'react'
import Layout from './components/layout/Layout'
import HeroSection from './components/sections/HeroSection'
import ProblemsSection from './components/sections/ProblemsSection'
import ServicesSection from './components/sections/ServicesSection'
import BenefitBanner from './components/sections/BenefitBanner'
import ProcessSection from './components/sections/ProcessSection'
import PricingSection from './components/sections/PricingSection'
import ContactSection from './components/sections/ContactSection'
import EquipmentEstimateModal from './components/ui/EquipmentEstimateModal'

function App() {
  const [isEstimateModalOpen, setIsEstimateModalOpen] = useState(false)

  return (
    <>
      <Layout onOpenEstimateModal={() => setIsEstimateModalOpen(true)}>
        <HeroSection />
        <ProblemsSection />
        <ServicesSection />
        <BenefitBanner />
        <ProcessSection />
        <PricingSection onOpenEstimateModal={() => setIsEstimateModalOpen(true)} />
        <ContactSection />
      </Layout>
      <EquipmentEstimateModal
        isOpen={isEstimateModalOpen}
        onClose={() => setIsEstimateModalOpen(false)}
      />
    </>
  )
}

export default App

