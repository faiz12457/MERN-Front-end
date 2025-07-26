import { Pencil } from "lucide-react";
import OrderStatusSelect from "./OrderSelectStatus";
import { use, useEffect, useState } from "react";
import { MdCheckCircleOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { updateOrderStatusThunk } from "../../redux-store/slices/order/orderSlice";

const statusStyles = {
  Pending: "bg-yellow-100 text-yellow-800",
  Dispatched: "bg-blue-100 text-blue-800",
  "Out for delivery": "bg-purple-100 text-purple-800",
  Delivered: "bg-green-100 text-green-800",
  Cancelled: "bg-red-100 text-red-800",
};

export default function OrderTable({ orders }) {
      const [editStatusId, setEditStatusId] = useState(null); 
      const dispatch=useDispatch();
    function handleChange(status,id){
        const data={status,id};
        dispatch(updateOrderStatusThunk(data));
        setEditStatusId(null);
    }

    
  return (
    <div className="overflow-x-auto shadow rounded">
      {/* Desktop View */}
      <table className="hidden md:table min-w-full divide-y divide-gray-200 text-sm text-left">
        <thead className="bg-gray-50 text-gray-700 font-medium">
          <tr>
            <th className="px-4 py-3">Order</th>
            <th className="px-4 py-3">Id</th>
            <th className="px-4 py-3">Items</th>
            <th className="px-4 py-3">Total Amount</th>
            <th className="px-4 py-3">Shipping Address</th>
            <th className="px-4 py-3">Payment Method</th>
            <th className="px-4 py-3">Order Date</th>
            <th className="px-4 py-3">Status</th>
            <th className="px-4 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {orders.map((order, index) => (
            <tr key={order._id} className="hover:bg-gray-50 align-top">
              <td className="px-4 py-3">{index}</td>
              <td className="px-4 py-3">{order._id}</td>
              <td className="px-4 py-3 space-y-2">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <img
                      src={item.product.images[0]}
                      alt={item.product.name}
                      className="size-8 rounded-full object-cover"
                    />
                    <span>{item.product.name}</span>
                  </div>
                ))}
              </td>
              <td className="px-4 py-3 font-medium">${order.total}</td>
              <td className="px-4 py-3 whitespace-pre-line">
                {order.address.address}
              </td>
              <td className="px-4 py-3 uppercase">{order.paymentMode}</td>
              <td className="px-4 py-3">
                {new Date(order.createdAt).toDateString()}
              </td>
              <td className="px-4  py-3 w-fit">
              {
                editStatusId===order._id? <OrderStatusSelect currentStatus={order.status} id={order._id} onChange={handleChange} />
                :  <span
                  className={`text-xs px-3 py-1 rounded-full text-nowrap font-medium ${
                    statusStyles[order.status] || "bg-gray-200 text-gray-700"
                  }`}
                >
                  {order.status}
                </span>
              }
             
              
              </td>
              <td className="px-4 py-3">
             
                <button onClick={()=>  setEditStatusId((prev)=>prev===order._id?null:order._id)} className="text-gray-500 cursor-pointer hover:text-blue-600">
                { editStatusId===order._id? <MdCheckCircleOutline size={22} />: <Pencil size={16} />}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile View */}
      <div className="md:hidden flex flex-col divide-y">
        {orders.map((order, index) => (
          <div key={order._id} className="p-4 space-y-2">
            <div className="text-sm font-medium text-gray-700">
              Order #{index + 1}
            </div>
            <div className="text-xs text-gray-500 break-all">
              ID: {order._id}
            </div>

            <div className="space-y-2">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <span className="text-sm">{item.product.name}</span>
                </div>
              ))}
            </div>

            <div>
              <span className="font-medium">Total:</span> ₹{order.total}
            </div>
            <div>
              <span className="font-medium">Address:</span>{" "}
              <span className="whitespace-pre-line">
                {order.address.address}
              </span>
            </div>
            <div>
              <span className="font-medium">Payment:</span>{" "}
              {order.paymentMode.toUpperCase()}
            </div>
            <div>
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.createdAt).toDateString()}
            </div>
            <div>
              <span className="font-medium">Status:</span>{" "}
              <span
                className={`text-xs px-3 py-1 rounded-full font-medium inline-block mt-1 ${
                  statusStyles[order.status] || "bg-gray-200 text-gray-700"
                }`}
              >
                {order.status}
              </span>
            </div>
            <div>
              <button className="mt-2 text-gray-500 hover:text-blue-600">
                <Pencil size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
