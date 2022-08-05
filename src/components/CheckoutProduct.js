import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/outline";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket, removeFromBasket } from "../slices/basketSlice";
function CheckoutProduct({ product }) {
  const { id, title, price, description, rating, quantity, image, hasPrime } =
    product;
  const dispatch = useDispatch();
  const addItemToBasket = () => {
    dispatch(addToBasket(product));
  };
  const removeItemFromBasket = () => {
    dispatch(removeFromBasket({ id }));
  };
  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      {/* Middle part */}
      <div className="col-span-3 mx-5">
        <div className="flex gap-x-4">
          <p>{title}</p>
          <div className="flex">
            <span className="font-bold">x</span>
            <span className="bg-black text-white ml-1 px-2 rounded-full self-start">
              {quantity}
            </span>
          </div>
        </div>
        <div>
          <div className="flex">
            {Array(rating)
              .fill()
              .map((_, i) => (
                <StarIcon
                  key={i}
                  className="h-5  text-yellow-500 fill-current"
                />
              ))}
          </div>
          <p className="text-xs my-2 line-clamp-2">{description}</p>
          <div className="mb-5">
            <Currency quantity={price * 80 * quantity} currency="INR" />
          </div>
          {hasPrime && (
            <div className="flex items-center space-x-2 -mt-5">
              <img
                className="w-12"
                src="https://links.papareact.com/fdw"
                alt="Amazon prime logo image"
              />
              <p className="text-xs text-gray-500">Free Next-day delivery</p>
            </div>
          )}
        </div>
      </div>
      {/* Right side */}
      <div className="flex flex-col space-y-2 my-auto justify-self-end">
        <button className="button" onClick={addItemToBasket}>
          Add to Basket
        </button>
        <button className="button" onClick={removeItemFromBasket}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckoutProduct;
