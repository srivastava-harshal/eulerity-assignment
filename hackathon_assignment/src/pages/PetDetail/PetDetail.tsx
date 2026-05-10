import { useParams, useLocation } from 'react-router-dom';
import { usePets } from '../../hooks/usePets';
import styled from 'styled-components';

const StyledImage = styled.img`
     width: 100%;
     height: 100%;
     object-fit: cover;
`;

function PetDetail() {
     const { id } = useParams();

     const location = useLocation();
     const petFromState = location.state?.pet;

     const { pets, loading, error } = usePets();

     const pet =
          petFromState ||
          pets.find((p) => String(p.title) === id);

     if (loading && !petFromState) return <div>Loading...</div>;
     if (error) return <div>Error</div>;
     if (!pet) return <div>Pet not found</div>;

     return (
          <div>
               <StyledImage src={pet.url} alt={pet.title} />
               <h1>{pet.title}</h1>
               <p>{pet.description}</p>
          </div>
     );
}

export default PetDetail;