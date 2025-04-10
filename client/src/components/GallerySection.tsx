import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { 
  Dialog, 
  DialogContent, 
  DialogClose 
} from "@/components/ui/dialog";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";
import { galleryItems } from "@/data/gallery";

type GalleryItem = {
  image?: string;
  alt: string;
  type: "image" | "video";
  videoId?: string;
  thumbnail?: string;
};

export default function GallerySection() {
  const [visibleItems, setVisibleItems] = useState(6);
  const [currentItem, setCurrentItem] = useState<number | null>(null);
  const totalItems = galleryItems.length;
  const videoRef = useRef<HTMLIFrameElement>(null);

  const handleLoadMore = () => {
    setVisibleItems(Math.min(visibleItems + 3, totalItems));
  };

  const openGalleryModal = (index: number) => {
    setCurrentItem(index);
  };

  const handlePrevItem = () => {
    if (currentItem === null) return;
    setCurrentItem((currentItem - 1 + galleryItems.length) % galleryItems.length);
  };

  const handleNextItem = () => {
    if (currentItem === null) return;
    setCurrentItem((currentItem + 1) % galleryItems.length);
  };

  // Reset YouTube video when dialog closes
  useEffect(() => {
    if (currentItem === null && videoRef.current) {
      // This effectively resets the video by reloading the iframe
      const src = videoRef.current.src;
      videoRef.current.src = src;
    }
  }, [currentItem]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      handlePrevItem();
    } else if (e.key === "ArrowRight") {
      handleNextItem();
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
          {galleryItems.slice(0, visibleItems).map((item: GalleryItem, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index % 3) }}
              className="overflow-hidden rounded-lg shadow-md cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
              onClick={() => openGalleryModal(index)}
            >
              <div className="overflow-hidden relative">
                <img 
                  src={item.type === "image" ? item.image : item.thumbnail} 
                  alt={item.alt} 
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-110"
                />
                {item.type === "video" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <div className="w-16 h-16 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                )}
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
      <Dialog open={currentItem !== null} onOpenChange={(open) => !open && setCurrentItem(null)}>
        <DialogContent 
          className="max-w-5xl w-full p-0 bg-black border-none" 
          onKeyDown={handleKeyDown}
        >
          <DialogClose className="absolute top-4 right-4 text-white opacity-70 hover:opacity-100 z-20">
            <X className="h-6 w-6" />
          </DialogClose>

          {currentItem !== null && (
            <div className="relative">
              {galleryItems[currentItem].type === "image" ? (
                <img 
                  src={galleryItems[currentItem].image} 
                  alt={galleryItems[currentItem].alt} 
                  className="w-full h-auto max-h-[80vh] object-contain" 
                />
              ) : (
                <div className="relative pt-[56.25%] w-full">
                  <iframe 
                    ref={videoRef}
                    src={`https://www.youtube.com/embed/${galleryItems[currentItem].videoId}?autoplay=1`}
                    title={galleryItems[currentItem].alt}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute top-0 left-0 w-full h-full"
                  ></iframe>
                </div>
              )}
              <div className="absolute inset-0 flex justify-between items-center px-4">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { e.stopPropagation(); handlePrevItem(); }}
                  className="text-white bg-black/30 hover:bg-black/50 rounded-full h-10 w-10"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  onClick={(e) => { e.stopPropagation(); handleNextItem(); }}
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
