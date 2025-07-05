import { useState, useEffect } from "react";
import axiosInstance from "../../Utils/axios";
import { BadgePercent } from "lucide-react";
import { SectionHeader } from "../SharedComponent/SectionHeader";

const PromotionalOffer = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  // Helper: get layout config for images
  const getLayoutConfig = (count) => {
    switch (count) {
      case 1:
        return [{ span: "col-span-4 row-span-3", size: "large" }];
      case 2:
        return [
          { span: "col-span-2 row-span-3", size: "medium" }, // Left side
          { span: "col-span-2 row-span-3", size: "medium" }, // Right side
        ];
      case 3:
        return [
          { span: "col-span-2 row-span-4", size: "medium" }, // Left side full
          { span: "col-span-2 row-span-2", size: "small" }, // Right top
          { span: "col-span-2 row-span-2", size: "small" }, // Right bottom
        ];
      case 4:
        return [
          { span: "col-span-1 row-span-10", size: "large" }, // Left 1/3
          { span: "col-span-2 row-span-2", size: "small" }, // Right top left
          { span: "col-span-1 row-span-2", size: "small" }, // Right top right
          { span: "col-span-3 row-span-8", size: "large" }, // Bottom 2/3
        ];
      default:
        return [];
    }
  };

  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/admin/all-offers");
        const offer = res.data?.data?.[0];

        if (offer && Array.isArray(offer.images)) {
          setImages(
            offer.images.map((img, idx) => ({
              id: img.public_id || img.url || idx,
              url: img.url,
              name: img.public_id?.split("/").pop() || `offer${idx + 1}.jpg`,
              preview: img.url,
              isExisting: true,
            }))
          );
        } else {
          setImages([]);
        }
      } catch (error) {
        setImages([]);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return null;
  }

  if (images.length > 0) {
    const layout = getLayoutConfig(images.length);

    // Determine grid configuration based on image count
    const getGridConfig = (count) => {
      switch (count) {
        case 1:
          return "grid-cols-4 grid-rows-3";
        case 2:
          return "grid-cols-4 grid-rows-3";
        case 3:
          return "grid-cols-4 grid-rows-3";
        case 4:
          return "grid-cols-4 grid-rows-3";
        default:
          return "grid-cols-4 grid-rows-3";
      }
    };

    return (
      <div className="min-h-screen w-full bg-emerald-950/90 pt-28 pb-24">
        <SectionHeader
          icon={BadgePercent}
          subtitle="Limited Time Deal"
          title="Exclusive Promotional Offer"
          description="Enjoy up to 30% off on selected dishes! Satisfy your cravings without stretching your budget. Order now before the offer ends!"
          className="mb-12"
        />

        {/* Large-device layout */}
        <div className="hidden lg:block">
          <div className="max-w-7xl mx-auto px-2 sm:px-4">
            <div
              className={`grid ${getGridConfig(
                images.length
              )} gap-2 sm:gap-4 w-full`}
              style={{ height: "500px" }}
            >
              {images.map((img, idx) => (
                <div
                  key={img.id}
                  className={`relative rounded-2xl ${
                    layout[idx]?.span || ""
                  } flex items-center justify-center w-full h-full`}
                  style={{ minWidth: 0 }}
                >
                  <img
                    src={img.url}
                    alt={img.name}
                    className="w-full h-full object-center object-cover rounded-4xl"
                    draggable={false}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Small-to-medium layout */}
        <div className="block lg:hidden px-4 max-w-xl mx-auto">
          <div className="flex flex-col gap-4">
            {images.map((img) => (
              <img
                key={img.id}
                src={img.url}
                alt={img.name}
                className="w-full h-auto rounded-xl object-cover"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default PromotionalOffer;
