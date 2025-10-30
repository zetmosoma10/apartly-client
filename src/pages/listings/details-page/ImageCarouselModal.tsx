import ImageGallery from "react-image-gallery";
import { IoClose } from "react-icons/io5";
import { useEffect } from "react";

type Props = {
  images: { url: string }[];
  isOpen: boolean;
  onClose: () => void;
};

const ImageCarouselModal = ({ images, isOpen, onClose }: Props) => {
  useEffect(() => {
    if (isOpen) {
      // * prevent body scroll
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";

      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const galleryImages = images?.map((img) => ({ original: img.url }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
      <div className="relative w-full max-w-4xl p-4 bg-white rounded-lg shadow-lg h-[500px]">
        <button
          onClick={onClose}
          className="absolute z-10 p-2 text-white bg-black rounded-full top-2 right-2 hover:bg-gray-700"
        >
          <IoClose size={22} />
        </button>
        <ImageGallery
          items={galleryImages}
          showPlayButton={false}
          showFullscreenButton={false}
        />
      </div>
    </div>
  );
};

export default ImageCarouselModal;
