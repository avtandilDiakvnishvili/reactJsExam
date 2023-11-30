import { Form, redirect, useLoaderData, useNavigate } from "react-router-dom";
import { deleteProduct, getProduct, updateProduct } from "../products";

export const getProductLoader = async ({ params: { productId } }) => {
  return await getProduct(productId);
}

export const updateProductAction = async ({ params: { productId }, request }) => {
  const formData = await request.formData();
  const updateData = Object.fromEntries(formData);
  await updateProduct(productId, updateData);
  return redirect(`/product/products`);
}



export default function EditProduct() {
  const Product = useLoaderData();
  const navigate = useNavigate();
  const deleteProductById = async (id) => {
    console.log(id);
    await deleteProduct(id);


    navigate(-1);
  }
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
        <button type="button" onClick={() => deleteProductById(Product.id)}>Delete</button>
        <button type="button" onClick={() => navigate(-1)}>Cancel</button>


      </p>
    </Form>
  );
}