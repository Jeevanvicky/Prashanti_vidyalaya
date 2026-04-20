import MainLayout from "../layouts/MainLayout";
import Hero from "../sections/Hero";
import WhyChooseUs from "../sections/WhyChooseUs";
import About from "../sections/About";
import Academics from "../sections/Academics";
import Facilities from "../sections/Facilities";
import Achievements from "../sections/Achievements";
import SportsActivities from "../sections/SportsActivities";
import Testimonials from "../sections/Testimonials";
import AdmissionsCta from "../sections/AdmissionsCta";

export default function Home({ onOpenAdmissionModal }) {
  return (
    <MainLayout onOpenAdmissionModal={onOpenAdmissionModal}>
      <Hero />
      <WhyChooseUs />
      <About />
      <Academics />
      <Facilities />
      <Achievements />
      <SportsActivities />
      <Testimonials />
      <AdmissionsCta onOpenAdmissionModal={onOpenAdmissionModal} />
    </MainLayout>
  );
}