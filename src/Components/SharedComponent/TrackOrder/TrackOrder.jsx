import React, { useState } from 'react';

const TrackOrder = () => {

    const [error, setError] = useState("");

    return (
       <div className="p-4 pt-40 text-white  max-w-md mx-auto ">
      <h1 className="text-2xl font-bold mb-4">Track Your Order</h1>
      <form onSubmit=''>
        <input
          type="text"
          id="orderId"
          name="orderId"
          required
          placeholder="Enter your order ID"
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300 mb-5"
        />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-primary text-white rounded-lg hover:bg-orange-600"
        //   disabled={isFetching} // Disable while loading
        >
          {/* {isFetching ? "Tracking..." : "Track Order"} */} Track Order
        </button>
      </form>

      {/* Error or success messages */}
      {error && <p className="text-red-500 mt-2">{error}</p>}




    </div>
    );
};

export default TrackOrder;