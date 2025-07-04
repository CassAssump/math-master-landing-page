
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import BenefitsSection from "@/components/BenefitsSection";
import TopicsSection from "@/components/TopicsSection";
import TestimonialSection from "@/components/TestimonialSection";
import Footer from "@/components/Footer";
import FloatingChatButton from "@/components/FloatingChatButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <HeroSection />
      <BenefitsSection />
      <TopicsSection />
      <TestimonialSection />
      <Footer />
      <FloatingChatButton />
    </div>
  );
};

export default Index;
