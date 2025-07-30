import { useEffect,  useState } from "react";
import { CustomCheckbox } from "./CustomCheckbox";
import { Input } from "./Input";
import { Title } from "./Title";
import PayButton from "./PayButton";
import { motion } from "framer-motion";
import Payment from "./Payment";
import { useFormik } from "formik";
import { userSelectors } from "../../../redux-store/slices/user/userSlice";
import {
  addressSelectors,
  fetchUserAddress,
} from "../../../redux-store/slices/address/addressSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  cartSelectors,
  deleteAllCartThunk,
  resetCartItems,
} from "../../../redux-store/slices/cart/cartSlice";
import {
  createOrderThunk,
  orderSelectors,
  resetCreateOrderStatus,
} from "../../../redux-store/slices/order/orderSlice";
import { useNavigate } from "react-router-dom";
import { checkoutSchema } from "../../../yupSchema/schema";
import { selectLoginStatus, selectLoginUser } from "../../../redux-store/slices/auth/authSlice";

function OrderContact() {
  const dispatch = useDispatch();
  const { selectUserAddress, selectAddressStatus } = addressSelectors;
  const user=useSelector(selectLoginUser);
  
  const address = useSelector(selectUserAddress);
  const addressStatus = useSelector(selectAddressStatus);
  const { _id: userId } = user || {};
  const { selectCartItems, selectDeleteAllCartItemStatus } = cartSelectors;
  const cartItems = useSelector(selectCartItems);

  const { selectOrderId, selectCreateOrderStatus } = orderSelectors;
  const orderId = useSelector(selectOrderId);
  const orderStatus = useSelector(selectCreateOrderStatus);
  const [status, setStatus] = useState(false);
  const navigate = useNavigate();

  const deleteStatus = useSelector(selectDeleteAllCartItemStatus);

  useEffect(() => {
    if (addressStatus === "idle") {
      dispatch(fetchUserAddress());
    }
  }, [addressStatus]);

  useEffect(() => {
    if (orderStatus === "loading") {
      setStatus(true);
    }

    if (orderStatus === "succeed") {
      dispatch(deleteAllCartThunk());
      dispatch(resetCartItems());
      navigate(`/order-success/${orderId}`);
      setStatus(false);
      dispatch(resetCreateOrderStatus());
    }
  }, [orderStatus]);

  function onSubmit(values, actions) {
    const items = cartItems.map((item) => {
      return {
        product: item.product._id,
        quantity: item.quantity,
        color: item.color,
        size: item.size,
      };
    });

    const total = Math.ceil(
      cartItems?.reduce((total, item) => {
        const discountPrice =
          item.product.price -
          item.product.price * (item.product.discountPercentage / 100);
        const finalPrice = discountPrice * item.quantity;
        return (total += finalPrice);
      }, 0)
    );
    const selected = document.querySelector(
      'input[name="billing"]:checked'
    )?.value;
    const { email, ...address } = values;
    const order = {
      items,
      user: userId,
      paymentMode: selected,
      total,
      address,
    };

    dispatch(createOrderThunk(order));
  }

  

  const formik = useFormik({
    initialValues: {
      email: user?.email,
      fname: user?.userName.trim().split(" ")[0],
      lname: user?.userName.trim().split(" ").slice(-1)[0],
      address: address?.street,
      city: address?.city,
      postalCode: address?.postalCode,
      phone: address?.phoneNumber,
    },
      validationSchema:checkoutSchema,
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

  const {
    phone,
    postalCode,
    email,
    city,
    address: userAddress,
    lname,
    fname,
  } = values;

  return (
    <div className="w-[90%] box-border p-3 h-full mt-[50px] mr-3 ">
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {/* Contact Section */}
        <div className="flex flex-col gap-2.5">
          <Title title={"Contact"} />

          <div className="w-full">
            <Input
              type={"text"}
              name={"email"}
              value={email}
              handlechange={handleChange}
              handleblur={handleBlur}
              error={errors.email}
              touched={touched.email}
              placeholder={"Email"}
              className=""
            />
          </div>
          <CustomCheckbox text={"Email me with news and offers"} />
        </div>
        {/* Contact Section End  */}

        {/* Delivery Section */}

        <div className="flex flex-col gap-3.5">
          <Title title={"Delivery"} />

          <div className=" gap-x-2.5 gap-y-2.5 grid grid-cols-2 ">
            <FormFieldWrapper className="col-span-2 row-span-1 px-1.5 border border-zinc-300  rounded">
              <select className="w-full h-12 outline-none ">
                <option>Pakistan</option>
              </select>
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-1">
              <Input
                placeholder="First name"
                type="text"
                name={"fname"}
                value={fname}
                handlechange={handleChange}
                handleblur={handleBlur}
                error={errors.fname}
                touched={touched.fname}
              />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-1">
              <Input
                placeholder="Last name"
                type="text"
                name={"lname"}
                value={lname}
                handlechange={handleChange}
                handleblur={handleBlur}
                error={errors.lname}
                touched={touched.lname}
              />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-2">
              <Input
                placeholder="Address"
                type="text"
                name={"address"}
                value={values.address}
                handlechange={handleChange}
                handleblur={handleBlur}
                error={errors.address}
                touched={touched.address}
              />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-1">
              <Input
                placeholder="City"
                type="text"
                name={"city"}
                value={city}
                handlechange={handleChange}
                handleblur={handleBlur}
                error={errors.city}
                touched={touched.city}
              />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-1">
              <Input
                placeholder="Postal Code"
                type="text"
                name={"postalCode"}
                value={postalCode}
                handlechange={handleChange}
                handleblur={handleBlur}
                error={errors.postalCode}
                touched={touched.postalCode}
              />
            </FormFieldWrapper>

            <FormFieldWrapper className="col-span-2">
              <Input
                placeholder="Phone"
                type="tel"
                name={"phone"}
                value={phone}
                handlechange={handleChange}
                handleblur={handleBlur}
                error={errors.phone}
                touched={touched.phone}
              />
            </FormFieldWrapper>
          </div>

          <CustomCheckbox text={"Save this information for next time"} />
        </div>

        {/* Delivery Section End */}

        {/*Shipping Method */}

        <div className="flex flex-col gap-2.5">
          <Title title={"Shipping method"} />

          <div className="bg-[#F5F5F5] w-full h-12 border rounded-[8px] flex px-2.5 justify-center items-center">
            <div className="w-full h-auto flex justify-between">
              <p className="text-[.9rem]">Free Delivery</p>
              <p className="text-[.9rem] font-medium">FREE</p>
            </div>
          </div>
        </div>

        {/*Shipping Method End  */}

        {/* Payment Section */}
        <Payment />

        {/* Payment Section End */}

        {/* Pay button */}

        <PayButton title={"PAY AND ORDER"} />
        {/* Pay button end */}
      </form>
    </div>
  );
}

export default OrderContact;

const FormFieldWrapper = ({ children, className = "" }) => {
  return <div className={`   ${className}`}>{children}</div>;
};
