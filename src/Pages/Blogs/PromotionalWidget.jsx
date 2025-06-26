export const PromotionalWidget = () => {
  return (
    <div className="bg-gradient-to-br from-orange-500 to-red-500 rounded-lg shadow-lg overflow-hidden text-white">
      <div className="p-6 relative">
        <div className="absolute top-4 right-4 bg-white text-orange-500 px-3 py-1 rounded-full text-sm font-bold">
          Offer!
        </div>

        <div className="mb-4">
          <h3 className="text-2xl font-bold mb-2">Mozzarella</h3>
          <div className="bg-white text-orange-500 px-3 py-1 rounded text-sm font-bold inline-block mb-2">
            PIZZA
          </div>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div>
            <div className="text-sm opacity-90">Buy 1</div>
            <div className="text-xl font-bold">& Get 1</div>
            <div className="text-2xl font-bold">Free!</div>
          </div>
          <div className="text-right">
            <div className="text-sm opacity-90">Offer!</div>
            <div className="text-3xl font-bold">$39</div>
          </div>
        </div>

        <button className="w-full bg-white text-orange-500 font-bold py-3 px-6 rounded-lg hover:bg-gray-100 transition-colors">
          SHOP NOW
        </button>

        {/* Pizza Image */}
        <div className="absolute bottom-0 right-0 w-32 h-32 opacity-20">
          <div className="w-full h-full bg-white rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
