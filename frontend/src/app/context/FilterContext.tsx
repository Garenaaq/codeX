import { createContext, useContext, useState } from "react";

interface IFilterContext {
  filters: { direction: string; type: string };
  setFilters: React.Dispatch<
    React.SetStateAction<{ direction: string; type: string }>
  >;
}

const FilterContext = createContext<IFilterContext | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useFilterContext = (): IFilterContext => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
};

interface IFilterProviderProps {
  children: React.ReactNode;
}

export const FilterProvider = ({ children }: IFilterProviderProps) => {
  const [filters, setFilters] = useState({ direction: "", type: "" });

  return (
    <FilterContext.Provider value={{ filters, setFilters }}>
      {children}
    </FilterContext.Provider>
  );
};
