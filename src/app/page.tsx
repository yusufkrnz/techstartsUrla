import { AfterCall } from "@/components/landing/after-call";
import { Footer } from "@/components/landing/footer";
import { AnnouncementBar, Navbar, SideNav } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { Industries } from "@/components/landing/industries";
import { Integrations } from "@/components/landing/integrations";
import { LiveCall } from "@/components/landing/live-call";
import { Metrics, MetricsFade } from "@/components/landing/metrics";
import { PreCall } from "@/components/landing/pre-call";
import { Spacer } from "@/components/landing/primitives";
import { QuoteStrip } from "@/components/landing/quote";
import { testimonials } from "@/data/testimonials";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Navbar />
      <SideNav />
      <main className="flex-1">
        <Hero />
        <Spacer className="border-t" />
        <QuoteStrip t={testimonials.technical} accent="#c084fc" />
        <Spacer />
        <PreCall />
        <Spacer />
        <LiveCall />
        <Spacer />
        <QuoteStrip t={testimonials.curveballs} accent="#1a73e8" />
        <Spacer />
        <AfterCall />
        <Spacer />
        <QuoteStrip t={testimonials.safeguard} accent="#f97316" />
        <Spacer />
        <Industries />
        <Spacer />
        <MetricsFade />
        <Metrics />
        <MetricsFade reverse />
        <Spacer />
        <Integrations />
        <Spacer />
      </main>
      <Footer />
    </>
  );
}
