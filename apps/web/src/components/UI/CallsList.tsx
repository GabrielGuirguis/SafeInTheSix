import type { Call } from "../../context/SelectionContext";

export const CallsList = ({ calls }: { calls: Call[] }) => {
  return (
    <div className="mt-4 space-y-3 h-[475px] max-h-475 overflow-y-auto">
      {calls.map((call, index) => (
        <div
          key={index}
          className="bg-white shadow-sm px-4 py-2 text-sm text-gray-700"
        >
            <span>Call for </span>
          <span className="font-semibold">{call.call_type}</span> around{" "}
          <span className="text-gray-500">{call.cross_streets}</span>
        </div>
      ))}
    </div>
  );
};
