
import React, { useState } from 'react';

interface LocationInputProps {
  onSearch: (searchTerm: string) => void;
}

const LocationInput: React.FC<LocationInputProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm);
    }
  };

  return (
    <div className="bg-white rounded-xl soft-border shadow-sm p-4">
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="text"
          placeholder="Enter your address or city..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 px-4 py-2.5 bg-muted/30 border border-border rounded-md text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-nature-300 transition-all"
        />
        <button
          type="submit"
          className="px-6 py-2.5 bg-nature-500 text-white rounded-md font-medium hover:bg-nature-600 transition-colors whitespace-nowrap"
        >
          Find Nearest
        </button>
      </form>
    </div>
  );
};

export default LocationInput;
