import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogClose 
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { galleryItems } from "@/data/gallery";

export default function GallerySection() {
  const [visibleItems, setVisibleItems] = useState(6);
  const [currentImage, setCurrentImage] = useState<number | null>(null);
  const totalItems = galleryItems.length;

  const handleLoadMore = () => {
    setVisibleItems(Math.min(visibleItems + 3, totalItems));
  };

  const openGalleryModal = (index: number) => {
    setCurrentImage(index);
  };

  const handlePrevImage = () => {
    if (currentImage === null) return;
    setCurrentImage((currentImage - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNextImage = () => {
    if (currentImage === null) return;
    setCurrentImage((currentImage + 1) % galleryItems.length);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevImage();
    } else if (e.key === "ArrowRight") {
      handleNextImage();
    }
  };

  return (
    <section id="gallery" className="section py-20 bg-white scroll-mt-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold mb-4"
          >
            Event Gallery
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
            Browse through our portfolio of memorable events that showcase our creativity and attention to detail.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryItems.slice(0, visibleItems).map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              onClick={() => openGalleryModal(index)}
            >
              <div className="overflow-hidden">
                <img 
                  src={item.image} 
                  alt={item.alt} 
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {visibleItems < totalItems && (
          <div className="flex justify-center mt-10">
            <Button
              variant="outline"
              onClick={handleLoadMore}
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-6 py-2"
            >
              Load More
            </Button>
          </div>
        )}
      </div>

      {/* Gallery Modal */}
      <Dialog open={currentImage !== null} onOpenChange={(open) => !open && setCurrentImage(null)}>
        <DialogContent 
          className="max-w-5xl w-full p-0 bg-black border-none" 
          onKeyDown={handleKeyDown}
        >
          <DialogClose className="absolute top-4 right-4 text-white opacity-70 hover:opacity-100 z-20">
            <X className="h-6 w-6" />
          </DialogClose>

          {currentImage !== null && (
            <div className="relative">
              <img 
                src={galleryItems[currentImage].image} 
                alt={galleryItems[currentImage].alt} 
                className="w-full h-auto max-h-[80vh] object-contain" 
              />
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { e.stopPropagation(); handlePrevImage(); }}
                  className="text-white bg-black/30 hover:bg-black/50 rounded-full h-10 w-10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { e.stopPropagation(); handleNextImage(); }}
                  className="text-white bg-black/30 hover:bg-black/50 rounded-full h-10 w-10"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
