import orderNowbg from "/assets/Food/orderNowbg.png";

export const OrderNowBanner = () => {
  return (
    <div
      className="w-full bg-black bg-cover bg-center bg-no-repeat text-white relative"
      style={{ backgroundImage: `url(${orderNowbg})` }}
    >
      <div className="bg-black/20 w-full h-full">
        <div className="max-w-7xl mx-auto flex items-center justify-center min-h-[600px] px-6 py-16">
          <div className="text-center">
            <h2 className="text-3xl md:text-5xl font-semibold mb-6 font-inknut">
              Order <span className="text-primary">Now</span>
            </h2>
            <p className="text-gray-300 text-base md:text-lg leading-relaxed max-w-xl font-inknut">
              Hungry? Order your favorite meals in just a few taps! Fast, fresh,
              and delivered right to your door. Tap Order Now and enjoy
              hassle-free food delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
