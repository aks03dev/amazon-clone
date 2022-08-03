import React from "react";
import Product from "./Product";

function ProductFeed({ products }) {
  const p1 = products.slice(0, 3);
  // const clothing = p1.concat(products.slice(14, products.length));
  const clothing = [];
  const others = [];
  const jewelery = [];
  for (const product of products) {
    if (product.category.includes("clothing")) {
      clothing.push(product);
    } else if (product.category.includes("jewelery")) {
      jewelery.push(product);
    } else {
      others.push(product);
    }
  }
  const cno = Math.floor(clothing.length / 3) * 3;
  const jno = Math.floor(jewelery.length / 2) * 2;
  return (
    <div>
      <div className="grid grid-flow-row-dense justify-items-center md:grid-cols-2 lg:grid-cols-3  md:-mt-20 mx-auto">
        {clothing
          .slice(0, cno)
          .map(({ id, title, price, description, category, image, rating }) => {
            return (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                rating={rating}
              />
            );
          })}

        <img
          className="md:col-span-full"
          src="https://links.papareact.com/dyz"
          alt="Amazon Banner"
        />
      </div>
      <div className="grid grid-flow-row-dense justify-items-center md:grid-cols-2 col-span-2">
        {jewelery
          .slice(0, jno)
          .map(({ id, title, price, description, category, image, rating }) => {
            return (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                rating={rating}
              />
            );
          })}
      </div>
      <img
        className="md:col-span-full object-cover h-50"
        src="https://assets.dragonmart.ae//pictures/0103296_DragonMart_categorylisting_computer&electronics_1of3.jpeg"
        alt="Electronics Banner"
      />
      <div className="grid grid-flow-row-dense justify-items-center md:grid-cols-3 ">
        {others.map(
          ({ id, title, price, description, category, image, rating }) => {
            return (
              <Product
                key={id}
                id={id}
                title={title}
                price={price}
                description={description}
                category={category}
                image={image}
                rating={rating}
              />
            );
          }
        )}
      </div>
    </div>
  );
}

export default ProductFeed;
