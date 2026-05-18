import { TABS } from "@/constants";

interface CvTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

export const CvTabs = ({ activeTab, onTabChange }: CvTabsProps) => {
  return (
    <div className="flex overflow-x-auto border-b border-stone-100 px-4 scrollbar-hide">
      {TABS.map((t) => {
        const tabId = t.toLowerCase().replace(" ", "-");
        const isActive = activeTab === tabId;
        
        return (
          <button
            key={t}
            onClick={() => onTabChange(tabId)}
            className={`px-4 py-3 text-xs font-semibold whitespace-nowrap border-b-2 transition-all ${
              isActive
                ? "border-purple-400 text-purple-700"
                : "border-transparent text-stone-400 hover:text-stone-700"
            }`}
          >
            {t}
          </button>
        );
      })}
    </div>
  );
};
