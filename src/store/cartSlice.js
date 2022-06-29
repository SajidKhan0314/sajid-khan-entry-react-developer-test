import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: {},
  totalProducts: 0,
};

const findProductIndex = (products, product) => {
  return products[product.id].cartData.findIndex((productArr) => {
    let isValid = true;
    for (let attr in productArr.attributes) {
      isValid =
        isValid && productArr.attributes[attr] === product.attributes[attr];
    }
    return isValid;
  });
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Add/Increment a product with default attributes
    addProduct: (state, action) => {
      let product = action.payload;
      let selectedAttributes = {
        quantity: 1,
        attributes: {},
      };

      // Set default attributes for non-selected attributes
      for (let attr of product.attributes) {
        selectedAttributes.attributes[attr.name] = attr.items[0].id;
      }

      // Override the default attributes with the selected attributes
      for (let attrKey in product.selectedAttributes) {
        selectedAttributes.attributes[attrKey] =
          product.selectedAttributes[attrKey];
      }

      // If the product does not  exist
      if (!state.products[product.id]) {
        let newProduct = {
          brand: product.brand,
          name: product.name,
          gallery: product.gallery,
          prices: product.prices,
          availableAttributes: product.attributes,
          cartData: [selectedAttributes],
          totalQuantity: 1,
        };
        state.products[product.id] = newProduct;
        // If the product exits
      } else {
        // Find product with selected attributes
        let productIndex = findProductIndex(state.products, {
          ...selectedAttributes,
          id: product.id,
        });

        // If the product with selected attributes exists
        if (productIndex > -1) {
          // Increase product quantity with selected attributes
          state.products[product.id].cartData[productIndex].quantity++;
        } else {
          // Add product with selected attributes
          state.products[product.id].cartData.push(selectedAttributes);
        }
        // Increase overall product quantity
        state.products[product.id].totalQuantity++;
      }
      state.totalProducts++;
    },

    // Increment the product quantity bases on the attributes and id
    incrementProduct: (state, action) => {
      let product = action.payload;

      let productIndex = findProductIndex(state.products, product);

      state.products[product.id].cartData[productIndex].quantity++;
      state.products[product.id].totalQuantity++;
      state.totalProducts++;
    },

    // Decrement the product quantity bases on the attributes and id
    decrementProduct: (state, action) => {
      let product = action.payload;
      let productIndex = findProductIndex(state.products, product);

      const productQuantity = --state.products[product.id].cartData[
        productIndex
      ].quantity;
      state.products[product.id].totalQuantity--;

      if (productQuantity === 0) {
        state.products[product.id].cartData.splice(productIndex, 1);
      }
      if (!state.products[product.id].cartData.length) {
        delete state.products[product.id];
      }
      state.totalProducts--;
    },
  },
});

export const { addProduct, incrementProduct, decrementProduct } =
  cartSlice.actions;

export default cartSlice.reducer;
