import localforage from "localforage";
import { matchSorter } from "match-sorter";

export async function getProducts(query) {
  await fakeNetwork(`getProducts:${query}`);
  let Products = await localforage.getItem("Products") || [];
  if (!Products) Products = [];
  if (query) {
    Products = matchSorter(Products, query, { keys: ["first", "last"] });
  }
  return Products;
}

export async function createProduct(newProduct) {
  console.log(newProduct)
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let Product = { id, createdAt: Date.now(), name: newProduct.productName, notes: newProduct.notes };
  let Products = await getProducts();
  Products.unshift(Product);
  await set(Products);
  return Product;
}

export async function getProduct(id) {
  await fakeNetwork(`Product:${id}`);
  let Products = await localforage.getItem("Products") || [];
  let Product = Products.find(Product => Product.id === id);
  return Product ?? null;
}

export async function updateProduct(id, updates) {
  await fakeNetwork();
  let Products = await localforage.getItem("Products") || [];
  let Product = Products.find(Product => Product.id === id);
  if (!Product) throw new Error("No Product found for " + id);
  Object.assign(Product, updates);
  await set(Products);
  return Product;
}

export async function deleteProduct(id) {
  debugger
  let Products = await localforage.getItem("Products") || [];
  let index = Products.findIndex(Product => Product.id === id);
  if (index > -1) {
    Products.splice(index, 1);
    await set(Products);
    return true;
  }
  return false;
}

function set(Products) {
  return localforage.setItem("Products", Products);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache = {};

async function fakeNetwork(key) {
  if (!key) {
    fakeCache = {};
  }

  if (fakeCache[key]) {
    return;
  }

  fakeCache[key] = true;
  return new Promise(res => {
    setTimeout(res, Math.random() * 800);
  });
}