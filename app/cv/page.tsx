"use client";

import { useState, useCallback, useMemo } from "react";
import { CvHeader } from "@/components/cv/CvHeader";
import { CvProfileSummary } from "@/components/cv/CvProfileSummary";
import { CvTabs } from "@/components/cv/CvTabs";
import { ProfileSection } from "@/components/cv/ProfileSection";
import { ExperienceSection } from "@/components/cv/ExperienceSection";
import { FormationSection } from "@/components/cv/FormationSection";
import { ProjectSection } from "@/components/cv/ProjectSection";
import { SkillSection } from "@/components/cv/SkillSection";
import { RdvSection } from "@/components/cv/RdvSection";
import { ContactSection } from "@/components/cv/ContactSection";
import { ChatSection } from "@/components/cv/ChatSection";

export default function CvPage() {
  const [activeTab, setActiveTab] = useState("profil");

  const handleTabChange = useCallback((tabId: string) => {
    setActiveTab(tabId);
  }, []);

  const content = useMemo(() => {
    switch (activeTab) {
      case "profil":
        return <ProfileSection />;
      case "expériences":
        return <ExperienceSection />;
      case "formation":
        return <FormationSection />;
      case "projets":
        return <ProjectSection />;
      case "compétences":
        return <SkillSection />;
      case "rdv":
        return <RdvSection />;
      case "contact":
        return <ContactSection />;
      case "chat-ia":
        return <ChatSection />;
      default:
        return <ProfileSection />;
    }
  }, [activeTab]);

  return (
    <main className="min-h-screen p-4 md:p-6 flex justify-center bg-gradient-to-br from-purple-50 via-amber-50 to-stone-100">
      <div className="w-full max-w-4xl overflow-hidden bg-white rounded-2xl shadow-2xl">
        <CvHeader />
        <CvProfileSummary />
        <CvTabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Dynamic Content */}
        <div className="p-6 md:p-10 min-h-[400px]">
          {content}
        </div>
      </div>
    </main>
  );
}
