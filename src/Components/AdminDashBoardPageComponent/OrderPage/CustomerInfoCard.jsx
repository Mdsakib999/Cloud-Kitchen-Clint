export const CustomerInfoCard = ({ name, note, phone, address }) => {
  return (
    <div className="w-full bg-white rounded-2xl">
      <div className="shadow-lg p-6 flex flex-col items-center">
        <div className="w-20 h-20 bg-bg-secondary rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4">
          {name.charAt(0)}
        </div>
        <span className="px-4 py-1 text-sm bg-green-100 text-bg-cart rounded-full mb-4">
          Customer
        </span>
        <h2 className="text-xl font-semibold mb-2">{name}</h2>
        <h2 className="text-md font-semibold mb-2">{phone}</h2>
        <h2 className="text-md font-semibold mb-2"> {address}</h2>
      </div>
      {note && (
        <h2 className="text-md mb-2 bg-bg-primary text-white py-3 px-5 rounded-b-2xl">
          <span className="text-emerald-200 font-semibold">Instructions:</span>{" "}
          {note}
        </h2>
      )}
    </div>
  );
};
