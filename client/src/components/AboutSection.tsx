import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <section id="about" className="section py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Who We Are
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
            Dedicated to transforming ordinary gatherings into extraordinary memories since 2010.
          </motion.p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2"
          >
            <p className="text-lg mb-6 leading-relaxed">
              At Elevate Events, we believe that every event tells a story. Our passion lies in crafting these stories with precision, creativity, and an unwavering commitment to excellence. With over a decade of experience in the events industry, we've built a reputation for delivering seamless experiences that exceed expectations.
            </p>
            <p className="text-lg mb-6 leading-relaxed">
              Our approach combines meticulous planning with creative vision, ensuring that each event we manage is unique, memorable, and perfectly aligned with our clients' objectives. From intimate gatherings to grand celebrations, we handle every detail with the same level of dedication and professionalism.
            </p>
            
            <div className="grid grid-cols-2 gap-6 mt-10">
              {[
                { number: "500+", label: "Events Completed" },
                { number: "95%", label: "Client Satisfaction" },
                { number: "12+", label: "Years Experience" },
                { number: "25+", label: "Industry Awards" }
              ].map((stat, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * index }}
                  className="text-center"
                >
                  <div className="text-primary text-4xl font-bold mb-2">{stat.number}</div>
                  <p className="text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:w-1/2 relative"
          >
            <img 
              src="https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Team planning an event" 
              className="rounded-lg shadow-xl w-full h-auto object-cover" 
            />
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="absolute -bottom-10 -left-10 bg-white p-6 rounded-lg shadow-lg max-w-xs hidden md:block"
            >
              <p className="text-lg italic text-gray-700 font-serif">
                "We don't just plan events, we craft experiences that people remember for a lifetime."
              </p>
              <p className="font-semibold mt-4">— Sarah Johnson, Founder</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
