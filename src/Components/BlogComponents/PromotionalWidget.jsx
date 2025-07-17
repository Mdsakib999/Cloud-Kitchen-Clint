export const PromotionalWidget = ({ promotion }) => {
  if (!promotion) return null;

  return (
    <div className="rounded-lg overflow-hidden shadow-lg">
      <img
        src={promotion.url}
        alt={promotion.name}
        className="w-full h-auto object-cover rounded-lg"
      />
    </div>
  );
};
