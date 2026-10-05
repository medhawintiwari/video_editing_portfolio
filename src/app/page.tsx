import { Hero } from "@/components/sections/Hero";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { Experience } from "@/components/sections/Experience";
import { Contact } from "@/components/sections/Contact";
import FlowArt, { FlowSection } from "@/components/ui/story-scroll";

export default function Home() {
  return (
    <FlowArt aria-label="Portfolio Sections">
      <FlowSection aria-label="Hero" style={{ backgroundColor: '#000000', color: '#fff' }}>
        <div className="flex-1 -m-[4vw]">
          <Hero />
        </div>
      </FlowSection>
      <FlowSection aria-label="Work" style={{ backgroundColor: '#1A3DE8', color: '#fff' }}>
        <div className="flex-1 -m-[4vw]">
          <WorkGallery />
        </div>
      </FlowSection>
      <FlowSection aria-label="Experience" style={{ backgroundColor: '#000000', color: '#fff' }}>
        <div className="flex-1 -m-[4vw]">
          <Experience />
        </div>
      </FlowSection>
      <FlowSection aria-label="Contact" style={{ backgroundColor: '#1A3DE8', color: '#fff' }}>
        <div className="flex-1 -m-[4vw]">
          <Contact />
        </div>
      </FlowSection>
    </FlowArt>
  );
}
