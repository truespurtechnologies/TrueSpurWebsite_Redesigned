import Nav from "@/components/clinax-v2/Nav"
import Hero from "@/components/clinax-v2/Hero"
import PainPoints from "@/components/clinax-v2/PainPoints"
import BeforeAfter from "@/components/clinax-v2/BeforeAfter"
import Platform from "@/components/clinax-v2/Platform"
import ProductExperience from "@/components/clinax-v2/ProductExperience"
import PatientJourney from "@/components/clinax-v2/PatientJourney"
import RoleCards from "@/components/clinax-v2/RoleCards"
import Steps from "@/components/clinax-v2/Steps"
import WhyClinax from "@/components/clinax-v2/WhyClinax"
import TrustStrip from "@/components/clinax-v2/TrustStrip"
import FAQ from "@/components/clinax-v2/FAQ"
import FinalCTA from "@/components/clinax-v2/FinalCTA"
import Footer from "@/components/clinax-v2/Footer"
import StickyCTA from "@/components/clinax-v2/StickyCTA"

export default function ClinaxV2Page() {
  return (
    <>
      <Nav />
      <main className="overflow-x-clip">
        <Hero />
        <PainPoints />
        <BeforeAfter />
        <Platform />
        <ProductExperience />
        <PatientJourney />
        <RoleCards />
        <Steps />
        <WhyClinax />
        <TrustStrip />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyCTA />
    </>
  )
}
