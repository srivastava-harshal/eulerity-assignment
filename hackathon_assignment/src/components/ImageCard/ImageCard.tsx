import styled from "styled-components";
import { useSelection } from "../../context/SelectionContext";
import type { Pet } from "../../types/pet";
import { Link } from "react-router-dom";

const Card = styled.div`
     border-radius: 12px;
     overflow: hidden;
     box-shadow: 0 4px 12px rgba(0,0,0,0.1);
     background: #fff;
     cursor: pointer;

     &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
     }
`;

const ImageContainer = styled.div`
     width: 100%;
     height: 200px;
     overflow: hidden;
`;

const StyledImage = styled.img`
     width: 100%;
     height: 100%;
     object-fit: cover;
`;

const CardInfo = styled.div`
     padding: 12px;
`;

const Title = styled.h3`
     width: 100%;
     font-size: 16px;
     margin-bottom: 6px;
     color: #000;
     text-decoration: none;
`;

const Description = styled.p`
     font-size: 14px;
     color: #666;
`;

const SelectedSpan = styled.span`
     transform: translate(-50%);
     left: 50%;
     position: relative;
`;

const StyledLink = styled(Link)`
     text-decoration: none;
     color: inherit;

     &:hover {
     text-decoration: none;
     }
`;

const ImageCard = (pet: Pet) => {
     const { selected, toggleSelect } = useSelection();
     const { title, description, url } = pet;
     const isSelected = selected.some((p) => p.title === pet.title);

     return (
          <StyledLink to={`/pets/${title}`} state={{ pet }}>
               <Card onClick={() => toggleSelect(pet)}>
                    <ImageContainer>
                         <StyledImage src={url} alt={title} />
                    </ImageContainer>
                    <CardInfo>
                         <Title>{title} {isSelected && <SelectedSpan>✅</SelectedSpan>}</Title>
                         <Description>{description}</Description>
                    </CardInfo>
               </Card>
          </StyledLink>
     );
};

export default ImageCard;