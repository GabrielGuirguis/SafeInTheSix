import { useState } from "react";

export const ToggleNavbar = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: string;
  setSelectedTab: (tab: string) => void;
}) => {
  const tabs = ["Crimes", "Calls"];

  return (
    <>
      <h1 className="p-4">
        {selectedTab == "Calls" ? "Calls to Police Service" : selectedTab}
      </h1>

      <div className="w-full flex justify-between px-4 py-2">
        {tabs.map((tab) => {
          const isSelected = selectedTab === tab;
          return (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`
              relative pb-1 font-medium text-sm transition-all duration-300 ease-in-out
              ${
                isSelected
                  ? "text-[#197AFF] opacity-100"
                  : "text-gray-500 opacity-50 hover:opacity-80"
              }
            `}
            >
              {tab}
              {isSelected && (
                <span className="absolute left-0 right-0 -bottom-0.5 h-[2px] bg-[#197AFF] rounded-full" />
              )}
            </button>
          );
        })}
      </div>
    </>
  );
};
