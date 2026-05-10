import styled from "styled-components"

type SearchBarProps = {
     query: string,
     setQuery: (q: string) => void
}

const SearchBarContainer = styled.div`
     display: flex;
     justify-content: center;
     padding: 15px 0;
`;

const SearchForm = styled.form`
`;

const SearchInput = styled.input`
     width: 300px;
     padding: 5px 10px;
     border-radius: 5px;
     border: 0.25px solid;
`;

const SearchBar = ({ query, setQuery }: SearchBarProps) => {
     return (
          <SearchBarContainer>
               <SearchForm>
                    <label>Search Image: </label>
                    <SearchInput type="text" value={query} onChange={({ target }) => setQuery(target.value)} />
               </SearchForm>
          </SearchBarContainer>
     )
}

export default SearchBar;