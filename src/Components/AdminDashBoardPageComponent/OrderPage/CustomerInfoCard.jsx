export const CustomerInfoCard = ({ name }) => {
  return (
    <div className="w-full bg-white rounded-2xl shadow-lg p-6 flex flex-col items-center">
      <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
        {name.charAt(0)}
      </div>
      <h2 className="text-xl font-semibold mb-2">{name}</h2>
      <span className="px-4 py-1 text-sm bg-green-100 text-bg-cart rounded-full mb-4">
        Customer
      </span>
    </div>
  );
};
