import { Header } from "./components/Header";
import {
  CaseStudy,
  Community,
  DealMechanics,
  FinalCTA,
  Footer,
  Hero,
  LiveLotReview,
  MarketEconomics,
  Mistakes,
  ProgramModules
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
        <Mistakes />
        <Community />
      </main>
      <Footer />
    </>
  );
}
