import { FORMATIONS } from "@/constants";
import { Timeline } from "./Timeline";

export const FormationSection = () => (
  <div>
    <h3 className="text-lg font-bold text-stone-800 mb-6">
      Formation & montée en compétences
    </h3>
    <Timeline items={FORMATIONS} />
  </div>
);
