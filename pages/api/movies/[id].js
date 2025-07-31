import { PrismaClient } from '@prisma/client';
import { ObjectId } from 'mongodb';  // Import ObjectId to handle MongoDB ids

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { id } = req.query;  // Extract `id` from URL parameters

  // Ensure the id is a valid ObjectId string (MongoDB-specific)
  if (!id || !ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  try {
    // Handle PUT request to update a movie
    if (req.method === 'PUT') {
      const { title, actors, releaseYear } = req.body;

      const movie = await prisma.movie.update({
        where: {
          id: id,  // Directly use the string id, Prisma will handle the ObjectId conversion
        },
        data: {
          title,
          actors,
          releaseYear: Number(releaseYear),  // Ensure the releaseYear is a number
        },
      });
      return res.status(200).json(movie);
    }

    // Handle DELETE request to remove a movie
    else if (req.method === 'DELETE') {
      await prisma.movie.delete({
        where: {
          id: id,  // Directly use the string id, Prisma will handle the ObjectId conversion
        },
      });
      return res.status(204).end();
    }

    // Method not allowed
    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
