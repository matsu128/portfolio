import React, { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  link?: string;
}

interface ProjectsGalleryProps {
  language: 'ja' | 'en';
  t: any;
}

const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ language, t }) => {
  const projects = t.projects.list;
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(0);
  const [cardWidth, setCardWidth] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        // Responsive card width - 少し広げる
        const isMobile = window.innerWidth < 768;
        setCardWidth(
          isMobile
            ? containerRef.current.offsetWidth * 0.9
            : containerRef.current.offsetWidth * 0.75,
        );
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  // Touch and mouse drag handlers
  const handleStart = useCallback((clientX: number) => {
    setIsDragging(true);
    setStartX(clientX);
    if (scrollContainerRef.current) {
      setScrollLeft(scrollContainerRef.current.scrollLeft);
    }
  }, []);

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDragging || !scrollContainerRef.current) return;

      const x = clientX;
      const walk = (x - startX) * 2;
      scrollContainerRef.current.scrollLeft = scrollLeft - walk;
    },
    [isDragging, startX, scrollLeft],
  );

  const handleEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Mouse events
  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    handleMove(e.clientX);
  };

  // Touch events
  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    handleMove(e.touches[0].clientX);
  };

  const nextProject = () => {
    const newIndex = (activeIndex + 1) % projects.length;
    setActiveIndex(newIndex);
    scrollToProject(newIndex);
  };

  const prevProject = () => {
    const newIndex = (activeIndex - 1 + projects.length) % projects.length;
    setActiveIndex(newIndex);
    scrollToProject(newIndex);
  };

  const scrollToProject = (index: number) => {
    if (scrollContainerRef.current) {
      const scrollAmount = index * cardWidth;
      scrollContainerRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div
      className="w-full py-8 md:py-16 relative overflow-hidden"
      style={{ minHeight: "600px" }}
    >
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-6 md:mb-12"
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            {t.projects.title}
          </h2>
          <p className="text-blue-300 max-w-2xl mx-auto text-sm md:text-base">
            {t.projects.description}
          </p>
          <p className="text-gray-400 text-xs md:text-sm mt-2">
            {t.projects.swipeOrDrag}
          </p>
        </motion.div>

        <div className="relative" ref={containerRef}>
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleEnd}
            onMouseLeave={handleEnd}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleEnd}
          >
            <div
              className="flex gap-6 md:gap-6 pb-6 md:pb-4"
              style={{ width: `${projects.length * cardWidth}px` }}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  className="flex-shrink-0 select-none"
                  style={{ width: cardWidth - 32 }}
                  whileHover={{ scale: isDragging ? 1 : 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card 
                    className="h-full bg-black/60 border border-blue-900/50 backdrop-blur-sm overflow-hidden shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 flex flex-col cursor-pointer hover:scale-[1.02]"
                    onClick={() => project.link && window.open(project.link, "_blank")}
                  >
                    <div className="relative h-44 md:h-48 overflow-hidden">
                      {project.title === 'enmatch' ? (
                        <img
                          src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80"
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                          draggable={false}
                        />
                      ) : (
                        <iframe
                          src={project.link}
                          title={project.title}
                          className="w-full h-full min-h-[176px] md:min-h-[192px] border-0 bg-white"
                          sandbox="allow-scripts allow-same-origin allow-popups"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            const fallback = document.createElement('div');
                            fallback.className = 'flex items-center justify-center w-full h-full bg-gray-200 text-gray-600';
                            fallback.innerText = 'プレビューできません';
                            e.currentTarget.parentNode.appendChild(fallback);
                          }}
                          onClick={(e) => e.stopPropagation()}
                        />
                      )}
                    </div>
                    <CardHeader className="pb-3 md:pb-2 px-4 md:px-6 flex-shrink-0">
                      <CardTitle className="text-lg md:text-xl text-white line-clamp-2 font-bold">
                        {project.title}
                      </CardTitle>
                      <div className="flex flex-wrap gap-2 mt-3 md:mt-2">
                        {project.technologies.map((tech, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-200 border-blue-400/40 text-xs font-medium backdrop-blur-sm"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </CardHeader>
                    <CardContent className="pb-4 md:pb-2 px-4 md:px-6 flex-grow">
                      <CardDescription className="text-gray-300 text-sm md:text-sm leading-relaxed">
                        {project.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation buttons - hidden on mobile for better touch experience */}
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-10"
            onClick={prevProject}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white hover:bg-black/70 z-10"
            onClick={nextProject}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsGallery;
