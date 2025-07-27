import React, { useEffect, useRef } from "react";
import { createProductSchema } from "../../yupSchema/createProductSchema";
import { useFormik } from "formik";
import UploadImg from "./UploadImg";
import ProductField from "./ProductField";
import DynamicField from "./DynamicField";
import { useDispatch, useSelector } from "react-redux";
import {
  createProductThunk,
  productSelectors,
  resetCreateProductError,
  resetCreateProductStatus,
} from "../../redux-store/slices/product/productSlice";
import { Slide, toast } from "react-toastify";

function CreateProduct() {
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const { selectCreateProductStatus } = productSelectors;
  const status = useSelector(selectCreateProductStatus);
  const actionsRef = useRef(null);

  async function onSubmit(values, actions) {
    const formData = new FormData();
    actionsRef.current = actions;

    values["name"] = values.name.trim();
    values["category"] = values.category.trim();
    values["sizes"] = values.sizes.map((v) => v.trim().toUpperCase());
    values["colorsAvailable"] = values.colorsAvailable.map((v) =>
      v.trim().toLowerCase()
    );
    values["description"] = values.description.trim();
    values["productBrand"] = values.productBrand.trim();

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
        createProductThunk(formData)
      ).unwrap();
      actions.setSubmitting(false);
    } catch (error) {
      actions.setSubmitting(false);
    }
  }

  useEffect(() => {
    const actions = actionsRef.current;
    if (!actions) return;

    if (status == "fullfilled") {
      imgRef.current.value = "";
      actions.resetForm();
      toast.success("Product Created Successfully", {
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
    }

    dispatch(resetCreateProductStatus());
    dispatch(resetCreateProductError());
  }, [status]);

  const formik = useFormik({
    initialValues: {
      name: "",
      category: "",
      images: [""],
      price: "",
      discountPercentage: "",
      stockQuantity: "",
      sizes: [""],
      colorsAvailable: [""],
      description: "",
      productBrand: "",
    },
    validationSchema: createProductSchema,
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

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg mt-16">
      <h1 className="text-3xl font-bold mb-6">Create Product</h1>

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

        <button
          disabled={isSubmitting}
          type="submit"
          className="w-full disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer  bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
