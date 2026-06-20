import { EXPERIENCES } from "@/constants";
import { Timeline } from "./Timeline";

export const ExperienceSection = () => (
  <div>
    <h3 className="text-lg font-bold text-stone-800 mb-6">
      Expériences professionnelles
    </h3>
    <Timeline items={EXPERIENCES} />
  </div>
);
