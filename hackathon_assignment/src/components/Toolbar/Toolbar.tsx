import styled from "styled-components";
import { useSelection } from "../../context/SelectionContext";
import type { Pet } from "../../types/pet";
import { formatSize } from "../../utils/formatSize";


type Props = {
     pets: Pet[];
     sort: string;
     setSort: (val: string) => void;
};

const ToolbarContainer = styled.div`
     display: flex;
     padding: 10px;
     border: 0.5px solid #000;
     border-radius: 10px;
     margin: 10px 0;
     gap: 20px;
     justify-content: center;
     align-items; center;
`;

const Select = styled.select`
     padding: 5px;
`;

const SelectAllButton = styled.button`
     padding: 5px 10px;
`;

const ClearButton = styled.button`
     padding: 5px 10px;
`;

const InfoContainer = styled.p`
     margin: 0;
     display: flex;
     align-items: center;
     gap: 10px;
`;

const InfoSpan = styled.span`
     height: max-content;
`;

const DownloadButton = styled.button`
     padding: 10px 15px;
     background-color: #6fe460ff;
     border: 0;
     border-radius: 4px;
     font-weight: 400;
     cursor: pointer;

     &:hover {
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
     }
`;

function Toolbar({ pets, sort, setSort }: Props) {
     const { selected, clear, selectAll } = useSelection();
     const totalBytes = selected.reduce((acc, p) => acc + (p.fileSize || 0), 0);

     async function downloadSelected() {
          for (const pet of selected) {
               const res = await fetch(pet.url);
               const blob = await res.blob();

               const link = document.createElement('a');
               link.href = URL.createObjectURL(blob);
               link.download = `${pet.title}.jpg`;
               link.click();

               clear();
          }
     }

     return (
          <ToolbarContainer>
               <Select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="">Sort</option>
                    <option value="AZ">Name A-Z</option>
                    <option value="ZA">Name Z-A</option>
                    <option value="NEW">Newest</option>
                    <option value="OLD">Oldest</option>
               </Select>

               <SelectAllButton onClick={() => selectAll(pets)}>Select All</SelectAllButton>
               <ClearButton onClick={clear}>Clear</ClearButton>

               <InfoContainer>
                    <InfoSpan>{selected.length} files selected</InfoSpan>
                    <InfoSpan>{formatSize(totalBytes)}</InfoSpan>
               </InfoContainer>

               <DownloadButton onClick={downloadSelected}>Download Selected Images</DownloadButton>
          </ToolbarContainer>
     );
}

export default Toolbar;