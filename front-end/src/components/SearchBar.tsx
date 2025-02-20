import { BsSearch } from "react-icons/bs";

interface SearchBarProps {
  handleSearch: (value: string) => void;
  placeholder?: string;
}

export const SearchBar = ({ handleSearch, placeholder }: SearchBarProps) => {
  return (
    <div className="w-full md:w-full flex items-center">
      <div className="relative w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <BsSearch />
        </div>
        <input
          type="text"
          id="simple-search"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:outline-none focus:border-primary-500 block w-full pl-10 p-2"
          placeholder={placeholder ? placeholder : "Search for products..."}
          onChange={(event) => handleSearch(event.target.value)}
        />
      </div>
    </div>
  );
};
