import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/layout.css";
export default function MainLayout({ children, onOpenAdmissionModal }) {
  return (
    <div className="layout">

      <Header onOpenAdmissionModal={onOpenAdmissionModal} />

      <main className="main-content">
        {children}
      </main>

      <Footer />

    </div>
  );
}