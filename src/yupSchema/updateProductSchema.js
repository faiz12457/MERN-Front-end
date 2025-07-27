import * as yup from "yup";

export const UpdateProductSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  category: yup.string().required("Category is required"),

  images: yup
    .array()
    .of( yup.string() ),

  price: yup
    .number()
    .typeError("Price must be a valid number")
    .required("Product price is required")
    .positive("Price must be a positive number"),

  discountPercentage: yup
    .number()
    .typeError("Discount must be a valid number")
    .min(0, "Discount must be at least 0")
    .max(100),

  description: yup.string().required("Description is required"),

  productBrand: yup.string().required("Brand is required"),

  sizes: yup
    .array()
    .of(yup.string().required("Size cannot be empty"))
    .min(1, "At least one size must be selected"),

  stockQuantity: yup
    .number()
    .typeError("Stock quantity must be a number")
    .required("Stock quantity is required")
    .min(0, "Stock quantity cannot be negative"),

  colorsAvailable: yup
    .array()
    .of(yup.string().required("Color cannot be empty")),
});
