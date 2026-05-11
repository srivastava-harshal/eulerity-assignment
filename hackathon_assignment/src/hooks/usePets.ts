import { useEffect, useState } from 'react';
import { fetchPets } from '../api/petsApi';
import type { Pet } from '../types/pet';

export function usePets() {
     const [pets, setPets] = useState<Pet[]>([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);

     useEffect(() => {
          loadPets();
     }, []);

     async function loadPets() {
          try {
               setLoading(true);
               const data = await fetchPets();
               if (!data.length) setError('No pets found');
               setPets(data);
          } catch (err: any) {
               setError(err.message);
          } finally {
               setLoading(false);
          }
     }

     return { pets, loading, error };
};
