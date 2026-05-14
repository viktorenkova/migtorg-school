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
  RealCases
} from "./sections";

export default function App() {
  return (
    <>
      <Header />
      <main>
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
      </main>
      <Footer />
    </>
  );
}
