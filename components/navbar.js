export default function Navbar() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">IMR Movie Portal</h1>
        <div className="space-x-4">
          <Link href="/" className="hover:text-yellow-400">Home</Link>
          <Link href="/movies" className="hover:text-yellow-400">Movies</Link>
        </div>
      </div>
    </nav>
  );
}
