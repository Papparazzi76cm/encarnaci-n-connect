import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, X, Expand } from "lucide-react";

interface ImageGalleryProps {
  images: string[];
  title: string;
}

const ImageGallery = ({ images, title }: ImageGalleryProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // If no images provided, use placeholder
  const displayImages = images.length > 0 ? images : ["/placeholder.svg"];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? displayImages.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === displayImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className="space-y-4">
        {/* Main Image */}
        <div className="relative aspect-[16/10] rounded-xl overflow-hidden group">
          <img
            src={displayImages[currentIndex]}
            alt={`${title} - Imagen ${currentIndex + 1}`}
            className="w-full h-full object-cover"
          />
          
          {/* Navigation arrows */}
          {displayImages.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={goToPrevious}
              >
                <ChevronLeft className="w-6 h-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={goToNext}
              >
                <ChevronRight className="w-6 h-6" />
              </Button>
            </>
          )}

          {/* Expand button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-background/80 hover:bg-background opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsOpen(true)}
          >
            <Expand className="w-5 h-5" />
          </Button>

          {/* Image counter */}
          {displayImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-background/80 px-3 py-1 rounded-full text-sm">
              {currentIndex + 1} / {displayImages.length}
            </div>
          )}
        </div>

        {/* Thumbnails */}
        {displayImages.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-2">
            {displayImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? "border-gold"
                    : "border-transparent hover:border-gold/50"
                }`}
              >
                <img
                  src={image}
                  alt={`${title} - Miniatura ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Dialog */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-[95vw] max-h-[95vh] p-0 bg-black/95 border-none">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20 z-50"
              onClick={() => setIsOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>

            <img
              src={displayImages[currentIndex]}
              alt={`${title} - Imagen ${currentIndex + 1}`}
              className="max-w-full max-h-[85vh] object-contain"
            />

            {displayImages.length > 1 && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goToPrevious}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                  onClick={goToNext}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>
              </>
            )}

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm">
              {currentIndex + 1} / {displayImages.length}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ImageGallery;
