'use client';

import { useEffect, useState } from 'react';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', actors: '', releaseYear: '' });
  const [editingId, setEditingId] = useState(null); // New state to track which movie is being edited

  const fetchMovies = async () => {
    const res = await fetch('/api/movies');
    const data = await res.json();
    setMovies(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // If editing, make PUT request, otherwise make POST request
    const url = editingId ? `/api/movies/${editingId}` : '/api/movies';
    const method = editingId ? 'PUT' : 'POST';

    const response = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.title,
        actors: form.actors.split(',').map((a) => a.trim()),
        releaseYear: form.releaseYear,
      }),
    });

    if (response.ok) {
      setForm({ title: '', actors: '', releaseYear: '' });
      setEditingId(null); // Reset editing state
      fetchMovies();
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this movie?")) {
      await fetch(`/api/movies/${id}`, {
        method: "DELETE",
      });
      fetchMovies();
    }
  };

  const handleEdit = (movie) => {
    setForm({ title: movie.title, actors: movie.actors.join(', '), releaseYear: movie.releaseYear });
    setEditingId(movie.id); // Set the movie as being edited
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <main className="max-w-4xl mx-auto py-10 px-6">
      <h2 className="text-3xl font-bold mb-6">{editingId ? 'Edit Movie' : 'Movie List'}</h2>

      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="text"
          placeholder="Actors (comma-separated)"
          value={form.actors}
          onChange={(e) => setForm({ ...form, actors: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <input
          type="number"
          placeholder="Release Year"
          value={form.releaseYear}
          onChange={(e) => setForm({ ...form, releaseYear: e.target.value })}
          required
          className="border p-2 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          {editingId ? 'Update Movie' : 'Add Movie'}
        </button>
      </form>

      <ul>
        {movies.map((movie) => (
          <li key={movie.id} className="p-4 mb-4 border rounded bg-white text-black">
            <p><strong>{movie.title}</strong> ({movie.releaseYear})</p>
            <p>Actors: {movie.actors.join(', ')}</p>
            <div className="flex gap-4 mt-4">
              <button
                onClick={() => handleEdit(movie)}
                className="bg-yellow-500 text-white px-4 py-2 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(movie.id)}
                className="bg-red-500 text-white px-4 py-2 rounded"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
}
