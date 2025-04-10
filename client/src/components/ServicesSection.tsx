import { motion } from "framer-motion";
import { services } from "@/data/services";
import { Check } from "lucide-react";

export default function ServicesSection() {
  return (
    <section id="services" className="section py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Our Services
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
            className="text-lg text-muted-foreground max-w-3xl mx-auto"
          >
            Comprehensive event management solutions tailored to your specific needs and vision.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div 
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={service.image} 
                  alt={service.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mr-4 group-hover:bg-primary/20 transition-colors">
                    <service.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-bold text-xl">{service.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  {service.description}
                </p>
                <ul className="mb-2 space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-secondary mt-1 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 bg-gray-50 rounded-lg p-8 shadow-md"
        >
          <h3 className="font-bold text-2xl mb-6 text-center">Our Event Management Process</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Consultation",
                description: "We start by understanding your vision, objectives, and requirements in detail."
              },
              {
                step: "02",
                title: "Planning",
                description: "Our team develops a comprehensive event strategy and execution plan."
              },
              {
                step: "03",
                title: "Execution",
                description: "We handle all logistics, coordination, and on-site management with precision."
              },
              {
                step: "04",
                title: "Follow-up",
                description: "Post-event evaluation and reporting to measure success and gather insights."
              }
            ].map((phase, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 * index }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-bold text-xl">{phase.step}</span>
                </div>
                <h4 className="font-bold text-lg mb-2">{phase.title}</h4>
                <p className="text-muted-foreground">{phase.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
