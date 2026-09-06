import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { Credibility } from "@/components/sections/Credibility";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { CapabilitiesSection } from "@/components/sections/CapabilitiesSection";
import { Philosophy } from "@/components/sections/Philosophy";
import { Process } from "@/components/sections/Process";
import { StackSection } from "@/components/sections/StackSection";
import { NowSection } from "@/components/sections/NowSection";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { ContactCta } from "@/components/sections/ContactCta";
import { buildMetadata } from "@/lib/metadata";
import { site } from "@/data/site";

export const metadata: Metadata = buildMetadata({
  title: `${site.name} — ${site.title}`,
  description: site.description,
  path: "/",
});

export default function HomePage() {
  return (
    <>
      <Hero />
      <Credibility />
      <SelectedWork />
      <CapabilitiesSection limit={3} />
      <Philosophy />
      <Process />
      <StackSection />
      <NowSection />
      <AboutTeaser />
      <Testimonials />
      <ContactCta />
    </>
  );
}
