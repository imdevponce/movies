interface Props {
  options: string[];
  onHandleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const FilterBy = ({ options, onHandleChange }: Props) => {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="movies-filter"
        className="text-sm font-medium text-gray-700"
      >
        Filter by:
      </label>
      <select
        id="movies-filter"
        className="px-3 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all"
        onChange={onHandleChange}
      >
        <option value=""></option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option?.toLowerCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FilterBy;
