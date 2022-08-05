import React from "react";
import Image from "next/image";
import { StarIcon } from "@heroicons/react/outline";
import { useState } from "react";
import Currency from "react-currency-formatter";
import { useDispatch } from "react-redux";
import { addToBasket } from "../slices/basketSlice";
const MAX_RATING = 5;
const MIN_RATING = 1;
function Product({ id, title, price, description, category, image }) {
  const dispatch = useDispatch();
  const [rating] = useState(
    Math.floor(Math.random() * MAX_RATING - MIN_RATING + 1) + MIN_RATING
  );
  const [hasPrime] = useState(Math.random() < 0.5);
  let quantity = 0;
  const addItemToBasket = () => {
    quantity = 1;
    const product = {
      id,
      title,
      price,
      description,
      category,
      image,
      rating,
      hasPrime,
      quantity,
    };
    //dispatching the payload to the redux store using the addToBasket slice
    dispatch(addToBasket(product));
  };
  return (
    <div className="relative flex flex-col m-5 bg-white card">
      <Image
        className="w-full"
        src={image}
        height={200}
        width={200}
        objectFit="contain"
      />
      <div className="mt-2 border-b-2 border-gray-400 rounded-md px-0 divide-x-0 "></div>
      <span className="inline-block bg-black rounded-full px-3 py-1 mt-2 text-sm text-center font-semibold text-white mr-2 mb-2">
        {category}
      </span>
      <h4 className="my-3">{title}</h4>
      <div className="flex">
        {Array(rating)
          .fill()
          .map((_, i) => (
            <StarIcon key={i} className="h-5 text-yellow-500 fill-current" />
          ))}
      </div>
      <p className="text-xs my-2 line-clamp-2">{description}</p>
      <div className="mb-5">
        <Currency quantity={price * 80} currency="INR" />
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
      <button onClick={addItemToBasket} className="mt-auto button">
        Add to Basket
      </button>
    </div>
  );
}

export default Product;
