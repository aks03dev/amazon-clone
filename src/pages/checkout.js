import React from "react";
import Header from "../components/Header";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectItems } from "../slices/basketSlice";
import CheckoutProduct from "../components/CheckoutProduct";
import Currency from "react-currency-formatter";
import { useSession } from "next-auth/react";
function checkout() {
  const items = useSelector(selectItems);
  const { data: session, status } = useSession();
  let totalItems = 0;
  let totalAmount = 0;
  items.map((item) => {
    totalItems += item.quantity;
    totalAmount += item.quantity * item.price * 80;
  });

  return (
    <div className="bg-gray-100">
      <Header />
      <main className="lg:flex max-w-screen-7xl mx-auto">
        {/* Left section */}
        <div className="max-w-6xl m-5 shadow-sm">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="contain"
          />
          <div className="flex flex-col p-5 space-y-10 bg-white">
            <h1 className="text-3xl border-b pb-4">
              {items.length === 0
                ? "Your Amazon Basket Is Empty"
                : "Your Shopping Basket ..."}
            </h1>
            {items.map((item, i) => (
              <CheckoutProduct key={i} product={item} />
            ))}
          </div>
        </div>
        {/* Right section */}
        {items.length ? (
          <div className="flex flex-col bg-white p-5 shadow-md max-w-5xl">
            {
              <>
                <h2 className="font-bold">Subtotal ({totalItems} items)</h2>
                <div className="flex flex-col">
                  <Currency quantity={totalAmount} currency="INR" />
                  <button
                    disabled={!session}
                    className={`button mt-2 ${
                      !session &&
                      "from-gray-300 to-gray-500 border-gray-500 test-gray-300 cursor-not-allowed"
                    }`}
                  >
                    {!session ? "Sign In To Checkout" : "Proceed To Checkout"}
                  </button>
                </div>
              </>
            }
          </div>
        ) : (
          ""
        )}
      </main>
    </div>
  );
}

export default checkout;
