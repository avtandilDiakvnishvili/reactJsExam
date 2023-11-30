import { Outlet, useLoaderData, NavLink } from "react-router-dom";
import { createProduct, getProducts } from "../products";

export const getProductsLoader = async ({ params, request }) => {
  return await getProducts();
}

export const createProductAction = async ({ params, request }) => {
  const user = await createProduct();
  return user;
}

export default function Root() {

  const Products = useLoaderData();
  console.log(Products)
  return (
    <>
      <div id="sidebar">
        <h1>React Router Products</h1>
        <nav>
          <ul>
            <li>
              <NavLink
                to={`/product/add`}
              >
                <i>დამატება</i>
              </NavLink>
            </li>

            <li>
              <NavLink
                to={`/product/products`}

              >

                <i>დათვალიერება</i>
              </NavLink>
            </li>

          </ul>

        </nav>
      </div>
      <div id="detail">
        <Outlet />
      </div>
    </>
  );
}