import type { Crime } from "../../context/SelectionContext";

export const CrimeList = ({ crimes }: { crimes: Crime[] }) => {
  return (
    <div className="mt-4 space-y-3 h-[475px] max-h-475 overflow-y-auto">
      {crimes.map((crime) => (
        <div
          key={crime.id}
          className="bg-white shadow-sm px-4 py-2 text-sm text-gray-700"
        >
          <span className="font-semibold">{crime.crime_type}</span> reported at{" "}
          <span className="text-gray-500">{crime.neighbourhood}</span>
        </div>
      ))}
    </div>
  );
};
