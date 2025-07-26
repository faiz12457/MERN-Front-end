import { useState } from "react";

const statusOptions = [
  "Pending",
  "Dispatched",
  "Out for delivery",
  "Delivered",
  "Cancelled",
];

export default function OrderStatusSelect({ currentStatus, onChange,id }) {
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  const handleChange = (e) => {
    const newStatus = e.target.value;
    setSelectedStatus(newStatus);
    onChange(newStatus,id);
  };

  return (
    <select
      value={selectedStatus}
      onChange={handleChange}
      className={`px-3 py-1 rounded-md border text-sm font-medium bg-white text-gray-700 shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500`}
    >
      {statusOptions.map((status) => (
        <option key={status} value={status}>
          {status}
        </option>
      ))}
    </select>
  );
}
