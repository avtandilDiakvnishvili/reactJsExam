import { Form, redirect, useNavigate } from "react-router-dom";
import { createProduct } from "../products";

// export const getproductLoader = async ({ params: { productId } }) => {
//     return await getProduct(productId);
// }

export const addProductFunction = async ({ params: { productId }, request }) => {
    const formData = await request.formData();
    const addData = Object.fromEntries(formData);
    console.log(addData)
    await createProduct(addData);
    return redirect(`/product/products`);
}

export default function AddProduct() {
    const Product = { name: '', notes: '' }//useLoaderData();
    const navigate = useNavigate();
    return (
        <Form method="post" id="product-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="Name"
                    aria-label="Product name"
                    type="text"
                    name="productName"
                    defaultValue={Product.name}
                />

            </p>

            <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    placeholder="Notes"

                    defaultValue={Product.notes}
                    rows={6}
                />
            </label>
            <p>
                <button type="submit">Save</button>
                <button type="button" onClick={() => navigate(-1)}>Cancel</button>
            </p>
        </Form>
    );
}