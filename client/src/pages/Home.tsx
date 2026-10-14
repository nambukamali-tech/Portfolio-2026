import React, { useEffect, useState } from 'react';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { CustomCursor } from '../components/common/CustomCursor';
import { BackToTop } from '../components/common/BackToTop';
import { RecruiterModal } from '../components/common/RecruiterModal';
import { Hero } from '../components/sections/Hero';
import { About } from '../components/sections/About';
import { Skills } from '../components/sections/Skills';
import { EngineeringLab } from '../components/sections/EngineeringLab';
import { Experience } from '../components/sections/Experience';
import { Projects } from '../components/sections/Projects';
import { CertificationsEducation } from '../components/sections/CertificationsEducation';
import { Services } from '../components/sections/Services';
import { Contact } from '../components/sections/Contact';
import { portfolioApi, fallbackProfile } from '../services/api';
import type { Profile, Skill, Experience as ExperienceType, Project, Certification, Education as EducationType, ServiceItem } from '../types/portfolio';

export const Home: React.FC = () => {
  const [profile, setProfile] = useState<Profile>(fallbackProfile);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [education, setEducation] = useState<EducationType[]>([]);
  const [services, setServices] = useState<ServiceItem[]>([]);
  const [isRecruiterModalOpen, setIsRecruiterModalOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [profData, skillData, expData, projData, certData, eduData, serviceData] = await Promise.all([
          portfolioApi.getProfile(),
          portfolioApi.getSkills(),
          portfolioApi.getExperiences(),
          portfolioApi.getProjects(),
          portfolioApi.getCertifications(),
          portfolioApi.getEducation(),
          portfolioApi.getServices(),
        ]);

        if (profData) setProfile(profData);
        if (skillData) setSkills(skillData);
        if (expData) setExperiences(expData);
        if (projData?.items) setProjects(projData.items);
        if (certData) setCertifications(certData);
        if (eduData) setEducation(eduData);
        if (serviceData) setServices(serviceData);
      } catch (err) {
        console.warn('API connection fallback active:', err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="min-h-screen bg-[#05070D] text-slate-100 selection:bg-blue-600 selection:text-white relative">
      <CustomCursor />

      {/* Cybernetic Subtle Tech Grid & Ambient Radial Vignette */}
      <div className="fixed inset-0 cyber-grid-bg pointer-events-none z-0 opacity-75" />
      <div className="fixed inset-0 bg-gradient-to-b from-blue-950/15 via-transparent to-[#05070D]/90 pointer-events-none z-0" />

      <Navbar
        resumeUrl={profile.resumeUrl}
        onOpenRecruiterModal={() => setIsRecruiterModalOpen(true)}
      />
      
      <main className="relative z-10">
        <Hero
          profile={profile}
          onOpenRecruiterModal={() => setIsRecruiterModalOpen(true)}
        />
        <About profile={profile} />
        <Skills skills={skills} />
        <EngineeringLab />
        <Experience experiences={experiences} />
        <Projects projects={projects} />
        <CertificationsEducation certifications={certifications} education={education} />
        <Services services={services} />
        <Contact profile={profile} />
      </main>

      <Footer profile={profile} />
      <BackToTop />

      <RecruiterModal
        isOpen={isRecruiterModalOpen}
        onClose={() => setIsRecruiterModalOpen(false)}
        profile={profile}
      />
    </div>
  );
};
