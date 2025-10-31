import { useState } from "react";
import type { ApartmentImage } from "../../../entities/Apartment";
import ImageCarouselModal from "./ImageCarouselModal";

type Props = {
  images?: ApartmentImage[];
};

const ImageGrid = ({ images }: Props) => {
  const [isCarouselOpen, setIsCarouselOpen] = useState(false);

  return (
    <>
      <div className="grid gap-2 mt-5 mb-8 sm:grid-cols-3 sm:grid-rows-2 sm:gap-4 h-[500px] sm:mt-8 sm:mb-12">
        <div
          className="overflow-hidden cursor-pointer image-hover-container sm:col-span-2 sm:row-span-2 rounded-xl"
          onClick={() => setIsCarouselOpen(true)}
          style={{
            backgroundImage: `url(${images?.[0].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="overflow-hidden cursor-pointer image-hover-container sm:col-span-1 sm:row-span-1 rounded-xl"
          onClick={() => setIsCarouselOpen(true)}
          style={{
            backgroundImage: `url(${images?.[1].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
        <div
          className="overflow-hidden cursor-pointer image-hover-container sm:col-span-1 sm:row-span-1 rounded-xl"
          onClick={() => setIsCarouselOpen(true)}
          style={{
            backgroundImage: `url(${images?.[2].url})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        ></div>
      </div>

      {/* IMAGE CAROUSEL MODAL */}
      <ImageCarouselModal
        isOpen={isCarouselOpen}
        images={images || []}
        onClose={() => setIsCarouselOpen(false)}
      />
    </>
  );
};

export default ImageGrid;
