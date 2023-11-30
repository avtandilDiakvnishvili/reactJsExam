import { Outlet, redirect, useLoaderData, NavLink } from "react-router-dom";
import { deleteProduct, updateProduct } from "../products";

export const viewProductAction = async ({ params: { productId }, request }) => {
    if (request.method === 'POST') {
        // Add to favorite
        const formData = await request.formData();
        return await updateProduct(productId, { favorite: formData.get('favorite') === 'true' })
    } else {
        // Delete
        await deleteProduct(productId);
        return redirect('/');
    }
}

export default function Product() {
    // const products = getProducts();
    const products = useLoaderData();
    console.log(products)
    return (
        <div id="product">

            <div>
                <h1>
                    Product List
                </h1>

                <nav>
                    {products.length ? (
                        <ul>
                            {products.map((product) => (
                                <li key={product.id}>
                                    <NavLink
                                        to={`/product/${product.id}/edit`}
                                    >
                                        {product.name ? (
                                            <>
                                                {product.name}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                    </NavLink>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>No products</i>
                        </p>
                    )}
                </nav>

            </div>
            <Outlet />
        </div>
    );
}

