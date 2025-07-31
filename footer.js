export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-10">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <p>&copy; {new Date().getFullYear()} Internet Movies Rental Company</p>
        <p>Contact us at: <a href="mailto:support@imr.com" className="underline text-blue-300">support@imr.com</a></p>
        <p>1234 Movie Lane, Hollywood, CA</p>
      </div>
    </footer>
  );
}

