import React from "react";
import sslImage from "../assets/ssl2_1.jpeg";
import paymentImage from "../assets/payment_1.jpeg";
const PaymentPage = () => {
  return (
    <div className="w-4/5 mx-auto mt-10">
      <h1 className="text-xl text-black text-left font-bold">Payment</h1>
      <div className="mt-6">
        <h1 className="text-black font-inria text-2xl md:text-4xl font-medium">
          Choose Payment Method
        </h1>
      </div>
      {/* Payment Form */}
      <div className="flex flex-col-reverse md:flex-row md:justify-between justify-center gap-6 md:gap-0 mt-10">
        <div className="md:w-3/5">
          <form>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Name:</label>
              <input type="text" placeholder="Your Name" className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-700" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Transaction Id:</label>
              <input type="text" placeholder="Transaction ID" className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-700" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Phone Number:</label>
              <input type="text" placeholder="+8801321454687" className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-700" />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 font-bold">Pin Code:</label>
              <input type="password" placeholder="******" className="w-full px-3 py-2 border rounded-md bg-gray-100 text-gray-700" />
            </div>
            {/* Payment method */}
            <div className="mt-8">
              <h1 className="text-xl text-black text-left font-bold">Select Method :</h1>
              <div className="flex md:flex-row flex-col gap-2 mt-2 items-center">
                {["Bkash", "Nagad", "UPAY", "VISA", "MasterCard", "Others"].map((method) => (
                  <label key={method} className="flex items-center space-x-2 bg-blue-400 font-bold text-white px-4 py-2 rounded-full cursor-pointer">
                    <input type="radio" name="payment" value={method} className="hidden" />
                    <span className="w-4 h-4 bg-white rounded-full inline-block"></span>
                    <span>{method}</span>
                  </label>
                ))}
              </div>
            </div>
            {/* Confirm Button */}
            <div className="flex justify-center mt-4">
              <button className="text-white bg-[#13253F] px-10 rounded-full py-4 font-bold">
                Confirm Payment
              </button>
            </div>
          </form>
        </div>
        <div className="md:w-2/5 flex md:justify-end">
  <img src={paymentImage} alt="Payment" className="w-full md:w-72 md:h-56 h-64" />
</div>
      </div>
      {/* Banking Image */}
      <div className="w-4/5 mx-auto flex justify-center mt-10">
  <img src={sslImage} alt="SSL Secure Payment" />
</div>
    </div>
  );
};

export default PaymentPage;
