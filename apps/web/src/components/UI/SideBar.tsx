import { useSelectionContext } from "../../context/SelectionContext";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ToggleNavbar } from "./NavBar";
import { CrimeList } from "./CrimeList";
import { CallsList } from "./CallsList";

export const SelectionModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Crimes");
  const { nearbyCrimes, recentCalls } = useSelectionContext();

  return (
    <div
      className={`fixed z-50 flex items-center m-4 transition-transform duration-300 ease-in-out ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div
        className={`
          bg-primary-light z-30 text-primary-dark h-[600px] w-[385px] p-4 rounded-2xl
          [box-shadow:0_0_30px_rgba(0,0,0,0.25)]
        `}
      >
        <ToggleNavbar
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        {selectedTab === "Crimes" ? (
          <CrimeList crimes={nearbyCrimes}></CrimeList>
        ) : (
          <CallsList calls={recentCalls} />
        )}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="h-[100px] w-[20px] flex items-center justify-center bg-primary-light rounded-r-2xl [box-shadow:0_0_30px_rgba(0.25,0.25,0.25,0.25)]"
      >
        {isOpen ? (
          <ChevronLeft className="w-10 h-10" />
        ) : (
          <ChevronRight className="w-10 h-10" />
        )}
      </button>
    </div>
  );
};
