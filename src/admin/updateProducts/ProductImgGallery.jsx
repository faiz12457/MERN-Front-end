import { X } from "lucide-react"; // or use any icon library

export const ProductImageGallery = ({ images, arrayHelpers }) => {
  if (!images?.length) {
    return (
      <div className="text-sm text-gray-500 italic">
        No product images available
      </div>
    );
  }



  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {images.map((url, index) => (
        <div
          key={index}
          className="relative w-full aspect-square rounded-xl overflow-hidden border border-gray-300 bg-white shadow-sm group"
        >
          <img
            src={url}
            alt={`product-img-${index}`}
            className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
          />
          <button
            type="button"
            onClick={() => arrayHelpers('urls','remove',index)}
            className="absolute top-1 right-1 cursor-pointer bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition-all shadow"
            title="Delete image"
          >
            <X size={16} />
          </button>
        </div>
      ))}
    </div>
  );
};
