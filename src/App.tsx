import { Header } from "./components/Header";
import {
  CaseStudy,
  Community,
  DealMechanics,
  FinalCTA,
  Footer,
  Hero,
  LearningFlow,
  LiveLotReview,
  MarketEconomics,
  ProgramModules,
  FAQ,
  RealCases
} from "./sections";

export default function App() {
  return (
    <>
      <Header />
      <main className="site-main">
        <Hero />
        <MarketEconomics />
        <DealMechanics />
        <FinalCTA />
        <CaseStudy />
        <ProgramModules />
        <LiveLotReview />
        <LearningFlow />
        <Community />
        <RealCases />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
