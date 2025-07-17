import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogContent } from "../../Components/BlogComponents/BlogContent";
import { CategoriesWidget } from "../../Components/BlogComponents/CategoriesWidget";
import { PromotionalWidget } from "../../Components/BlogComponents/PromotionalWidget";
import { SearchWidget } from "../../Components/BlogComponents/SearchWidget";
import {
  useGetBlogByIdQuery,
  useGetCategoriesQuery,
} from "../../redux/apiSlice";
import { UIStates } from "../../Components/SharedComponent/UIStates";
import axiosInstance from "../../Utils/axios";

export const BlogDetails = () => {
  const { id } = useParams();
  const { data: blog, isLoading, isError, error } = useGetBlogByIdQuery(id);
  const { data: categories = [] } = useGetCategoriesQuery();

  const [promotion, setPromotion] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch promotions and select a random image
  useEffect(() => {
    const fetchImages = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get("/admin/all-offers");
        const offer = res.data?.data?.[0];

        const images =
          offer?.images?.map((img, idx) => ({
            id: img.public_id || idx,
            url: img.url,
            name: img.public_id?.split("/").pop() || `promo${idx + 1}`,
          })) || [];

        // Pick a random image
        if (images.length > 0) {
          const randomImage = images[Math.floor(Math.random() * images.length)];
          setPromotion(randomImage);
        }
      } catch (error) {
        console.error("Failed to fetch promotional images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (!blog && !isLoading && !isError) {
    return <UIStates isEmpty emptyMessage="Blog not found" />;
  }

  return (
    <div className="min-h-screen py-36">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <UIStates
              isLoading={isLoading}
              isError={isError}
              error={error}
              emptyMessage="Blog not found"
            />
            {!isLoading && !isError && blog && (
              <div className="min-h-screen container mx-auto px-4">
                <BlogContent blog={blog} />
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <SearchWidget />
            <CategoriesWidget categories={categories} />
            {!loading && promotion && (
              <PromotionalWidget promotion={promotion} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
