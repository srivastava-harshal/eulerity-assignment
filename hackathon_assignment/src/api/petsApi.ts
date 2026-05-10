import type { Pet } from "../types/pet";

export async function fetchPets() {
     const res = await fetch('https://eulerity-hackathon.appspot.com/pets');

     if (!res.ok) throw new Error('Failed to fetch pets');

     const data = await res.json();

     return data.map((pet: Pet) => ({
          title: pet.title,
          description: pet.description || '',
          url: pet.url,
          created: pet.created,
     }));
};
