import styled from 'styled-components';

import type { JSX } from 'react/jsx-runtime';
import type { Pet } from '../../types/pet';

import ImageCard from '../ImageCard/ImageCard';

const CardsContainer = styled.div`
          display: grid;
          gap: 16px;

          grid-template-columns: 1fr;

          @media (min-width: 600px) {
               grid-template-columns: repeat(2, 1fr);
          }

          @media (min-width: 1024px) {
               grid-template-columns: repeat(4, 1fr);
          }
     `;

function ImageList({ pets, loading, error }: any) {

     if (loading) return <div>Loading...</div>;
     if (error) return <div>Something went wrong</div>;

     return (
          <div>
               <CardsContainer>
                    {pets.map((pet: JSX.IntrinsicAttributes & Pet) => (
                         <ImageCard key={pet.title} {...pet} />
                    ))}
               </CardsContainer>
          </div>
     );
}

export default ImageList;