import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home/Home';
import { usePets } from '../hooks/usePets';
import PetDetail from '../pages/PetDetail/PetDetail';
import styled from 'styled-components';

const AppContainer = styled.div``;

function AppRoutes() {
     const { pets, loading, error } = usePets();

     return (
          <AppContainer>
               <Routes>
                    <Route path="/" element={<Home pets={pets} loading={loading} error={error} />} />
                    <Route path="/pets/:id" element={<PetDetail />} />
               </Routes>
          </AppContainer>
     );
}

export default AppRoutes;