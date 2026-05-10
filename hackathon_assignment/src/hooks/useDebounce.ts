import { useEffect, useState } from "react";

function useDebounce(value: string, delay = 300) {
     const [debounced, setDebounced] = useState(value);

     useEffect(() => {
          const id = setTimeout(() => setDebounced(value), delay);
          return () => clearTimeout(id);
     }, [value]);

     return debounced;
}

export default useDebounce;