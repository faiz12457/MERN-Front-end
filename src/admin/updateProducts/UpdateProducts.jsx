import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchSingleProduct,
  productSelectors,
  resetSingleProduct,
  resetSingleProductStatus,
  resetUpdateProductStatus,
  updateProductThunk,
} from "../../redux-store/slices/product/productSlice";
import Loader from "../../loaders/Loader";
import UploadImg from "../createProduct/UploadImg";
import ProductField from "../createProduct/ProductField";
import DynamicField from "../createProduct/DynamicField";
import { UpdateProductSchema } from "../../yupSchema/updateProductSchema";
import { useFormik } from "formik";
import { ProductImageGallery } from "./ProductImgGallery";
import { Slide, toast } from "react-toastify";

function UpdateProducts() {
  const params = useParams();
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const { id } = params;
  const {
    selectSingleProduct,
    selectSingleProductStatus,
    selectUpdateProductStatus,
  } = productSelectors;
  const product = useSelector(selectSingleProduct);
  const status = useSelector(selectSingleProductStatus);
  const updatedStatus = useSelector(selectUpdateProductStatus);
  const PricingandInventory = [
    { field: "price", label: "Price", type: "number" },
    {
      field: "discountPercentage",
      label: "Discount (%)",
      type: "number",
    },
    { field: "stockQuantity", label: "Stock Qty", type: "number" },
  ];

  const BrandandDescription = [
    {
      field: "productBrand",
      label: "Brand",
      type: "text",
    },

    {
      field: "description",
      label: "Description",
      type: "text",
    },
  ];

  const arrayHelpers = (field, action, idx, value) => {
    const arrCopy = [...values[field]];
    if (action === "add") arrCopy.push("");
    if (action === "remove") arrCopy.splice(idx, 1);
    if (action === "update") arrCopy[idx] = value;
    formik.setFieldValue(field, arrCopy);
  };
  useEffect(() => {
    dispatch(fetchSingleProduct(id));

    return () => {
      dispatch(resetSingleProduct());
    };
  }, []);

  useEffect(() => {
    if (status == "succeed") {
      dispatch(resetSingleProductStatus());
    }
  }, [status]);

  useEffect(() => {
    if (updatedStatus == "fullfilled") {
      toast.success("Product Updated Successfully", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
        theme: "light",
        transition: Slide,
      });

      dispatch(resetUpdateProductStatus());
    }
  }, [updatedStatus]);

  async function onSubmit(values, actions) {
    const formData = new FormData();
    values["name"] = values.name.trim();
    values["category"] = values.category.trim();
    values["sizes"] = values.sizes.map((v) => v.trim().toUpperCase());
    values["colorsAvailable"] = values.colorsAvailable.map((v) =>
      v.trim().toLowerCase()
    );
    values["description"] = values.description.trim();
    values["productBrand"] = values.productBrand.trim();

    if (Array.isArray(values["images"]) && values["images"].length == 0)
      delete values.images;
    if (Array.isArray(values["urls"]) && values["urls"].length == 0)
      values.urls = [];
    if (!values["urls"]) values.urls = [];

    Object.entries(values).forEach(([key, value]) => {
      if (key === "images") {
        value.forEach((file) => formData.append("file", file));
      } else {
        formData.append(key, value);
      }
    });

    actions.setSubmitting(true);
    try {
      const resultAction = await dispatch(
        updateProductThunk({ formData, id })
      ).unwrap();
      actions.setSubmitting(false);
    } catch (error) {
      actions.setSubmitting(false);
    }
  }

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: product?.name || "",
      category: product?.category?.name || "",
      images: [],
      price: product?.price || "",
      discountPercentage: product?.discountPercentage || "",
      stockQuantity: product?.stockQuantity || "",
      sizes: product?.sizes || [""],
      colorsAvailable: product?.colorsAvailable || [""],
      description: product?.description || "",
      productBrand: product?.productBrand?.name || "",
      urls: product?.images || [],
    },
    validationSchema: UpdateProductSchema,
    onSubmit,
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    isSubmitting,
  } = formik;

  if (status == "loading") {
    return (
      <div className="w-full h-screen grid place-content-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-16">
      <h1 className="text-3xl font-bold mb-6">Update Product</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <UploadImg ref={imgRef} formik={formik} />

        {/* Name & Category */}
        <div className="grid grid-cols-2 gap-4">
          {["name", "category"].map((field) => (
            <ProductField
              key={field}
              field={field}
              type={"text"}
              label={field}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              values={values}
            />
          ))}
        </div>

        {/* Price, Discount & Stock */}
        <div className="grid grid-cols-3 gap-4">
          {PricingandInventory.map(({ field, label, type }) => (
            <ProductField
              key={field}
              field={field}
              type={type}
              label={label}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              values={values}
            />
          ))}
        </div>

        {/* Sizes Dynamic Field */}
        <DynamicField
          label="Sizes"
          field="sizes"
          values={values.sizes}
          errors={errors.sizes}
          arrayHelpers={arrayHelpers}
        />

        {/* Colors Dynamic Field */}
        <DynamicField
          label="Colors"
          field="colorsAvailable"
          values={values.colorsAvailable}
          errors={errors.colorsAvailable}
          arrayHelpers={arrayHelpers}
        />

        {/* Brand & Description */}
        <div className="grid grid-cols-2 gap-4">
          {BrandandDescription.map(({ field, label, type }) => (
            <ProductField
              key={field}
              field={field}
              type={type}
              label={label}
              handleBlur={handleBlur}
              handleChange={handleChange}
              touched={touched}
              errors={errors}
              values={values}
            />
          ))}
        </div>

        <ProductImageGallery
          images={values["urls"]}
          arrayHelpers={arrayHelpers}
        />
        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer  bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          {isSubmitting ? "Updating..." : "Update"}
        </button>
      </form>
    </div>
  );
}

export default UpdateProducts;
