import Footer from '../components/Footer';
import MoviesPage from '../components/MoviesPage';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <MoviesPage />
      <Footer />
    </div>
  );
}
