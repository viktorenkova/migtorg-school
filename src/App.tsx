import { Navigate, Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { AuthPage } from "./pages/AuthPage";
import { PasswordRecoveryPage } from "./pages/PasswordRecoveryPage";
import { LearnDashboard, LessonPage, ModulePage, RequireAuth } from "./pages/LearnPages";
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

function LandingPage() {
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/auth/login" element={<AuthPage mode="login" />} />
      <Route path="/auth/register" element={<AuthPage mode="register" />} />
      <Route path="/auth/forgot-password" element={<PasswordRecoveryPage mode="request" />} />
      <Route path="/auth/reset-password" element={<PasswordRecoveryPage mode="reset" />} />
      <Route
        path="/learn"
        element={
          <RequireAuth>
            <LearnDashboard />
          </RequireAuth>
        }
      />
      <Route
        path="/learn/:moduleSlug"
        element={
          <RequireAuth>
            <ModulePage />
          </RequireAuth>
        }
      />
      <Route
        path="/learn/:moduleSlug/:lessonSlug"
        element={
          <RequireAuth>
            <LessonPage />
          </RequireAuth>
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
