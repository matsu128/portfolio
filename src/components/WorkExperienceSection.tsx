import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ChevronDown,
  ChevronUp,
  Building2,
  Calendar,
  Users,
  Code,
  FileText,
} from "lucide-react";

interface WorkExperience {
  company: string;
  position: string;
  period: string;
  role: string;
  teamSize: string;
  projectTitle: string;
  technologies: string[];
  details: string;
}

const WorkExperienceSection: React.FC<{ language: 'ja' | 'en'; t: any }> = ({ language, t }) => {
  const [expandedStates, setExpandedStates] = useState<boolean[]>(new Array(t.workExperiences.length).fill(false));
  const workExperiences = t.workExperiences;

  const toggleExpand = (index: number) => {
    setExpandedStates(prev => {
      const newStates = [...prev];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  return (
    <section className="min-h-screen w-full py-20 px-4 md:px-8 text-white">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto"
      >
        <h2 className="text-4xl font-bold mb-12 text-center bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-600">
          {t.workExperience.title}
        </h2>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 h-full w-1 bg-gradient-to-b from-blue-500 to-purple-600"></div>

          {workExperiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`relative mb-16 ${index % 2 === 0 ? "md:pr-8 md:text-right md:ml-0 md:mr-auto" : "md:pl-8 md:ml-auto md:mr-0"} md:w-1/2 w-full`}
            >
              <Card className="bg-gray-900 border-gray-800 overflow-hidden hover:shadow-glow transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-2">
                    <div className="flex items-center mb-2 md:mb-0">
                      <Building2 className="w-5 h-5 mr-2 text-blue-400" />
                      <CardTitle className="text-xl text-blue-300">
                        {experience.company}
                      </CardTitle>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="w-4 h-4 mr-2 text-purple-400" />
                      <CardDescription className="text-purple-300">
                        {experience.period}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-lg font-medium text-gray-200">
                      {experience.position}
                    </span>
                  </div>
                </CardHeader>

                <CardContent>
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
                    <div className="flex items-center mb-2 md:mb-0">
                      <FileText className="w-4 h-4 mr-2 text-green-400" />
                      <span className="text-green-300">
                        {experience.projectTitle}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-4 h-4 mr-2 text-yellow-400" />
                      <span className="text-yellow-300">
                        {t.workExperience.teamSize} {experience.teamSize}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <Code className="w-4 h-4 mr-2 text-cyan-400" />
                    <div className="flex flex-wrap gap-2">
                      {experience.technologies.map((tech, techIndex) => (
                        <Badge
                          key={techIndex}
                          variant="outline"
                          className="bg-gray-800 text-cyan-300 border-cyan-700"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => toggleExpand(index)}
                    className="flex items-center justify-center w-full py-2 text-sm text-blue-400 hover:text-blue-300 transition-colors"
                  >
                    {expandedStates[index] ? (
                      <>
                        <span>{t.workExperience.closeDetails}</span>
                        <ChevronUp className="ml-2 w-4 h-4" />
                      </>
                    ) : (
                      <>
                        <span>{t.workExperience.showDetails}</span>
                        <ChevronDown className="ml-2 w-4 h-4" />
                      </>
                    )}
                  </button>

                  {expandedStates[index] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3 }}
                      className="mt-4 px-4 text-left"
                    >
                      <Separator className="mb-4 bg-gray-700" />
                      <div className="text-gray-300 whitespace-pre-line">
                        {experience.details}
                      </div>
                    </motion.div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default WorkExperienceSection;
