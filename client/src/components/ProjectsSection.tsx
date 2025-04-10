import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { projects } from "@/data/projects";
import { Check } from "lucide-react";

export default function ProjectsSection() {
  return (
    <section id="projects" className="section py-20 bg-gray-900 text-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
          >
            Marquee Projects
          </motion.h2>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="w-20 h-1 bg-secondary mx-auto mb-8"
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg text-gray-300 max-w-3xl mx-auto"
          >
            Showcasing some of our most exceptional events that demonstrate our capability and creativity.
          </motion.p>
        </div>

        <div className="space-y-16">
          {projects.map((project, index) => (
            <motion.div 
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 * index }}
              className={`flex flex-col ${index % 2 === 1 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center gap-10`}
            >
              <div className="lg:w-1/2">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="rounded-lg shadow-2xl w-full h-auto" 
                />
              </div>
              <div className="lg:w-1/2">
                <span className="inline-block px-3 py-1 bg-primary/20 text-primary rounded-full mb-4">
                  {project.category}
                </span>
                <h3 className="text-2xl md:text-3xl font-bold mb-4 text-white">{project.title}</h3>
                <p className="text-gray-300 mb-6">
                  {project.description}
                </p>
                <ul className="mb-6 space-y-2">
                  {project.results.map((result, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mt-1 mr-2 flex-shrink-0" />
                      <span>{result}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap gap-3">
                  {project.tags.map((tag, idx) => (
                    <span key={idx} className="px-3 py-1 bg-gray-700 text-gray-300 rounded-full text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3">
            <a href="#contact">Discuss Your Project</a>
          </Button>
        </div>
      </div>
    </section>
  );
}
