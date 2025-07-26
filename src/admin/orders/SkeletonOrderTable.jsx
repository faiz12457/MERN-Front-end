export default function SkeletonOrderTable({ rows = 5 }) {
  const fakeItems = Array.from({ length: rows });

  return (
    <div className="overflow-x-auto shadow rounded animate-pulse">
      {/* Desktop Skeleton */}
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
          {fakeItems.map((_, i) => (
            <tr key={i} className="hover:bg-gray-50">
              {Array.from({ length: 9 }).map((_, j) => (
                <td key={j} className="px-4 py-3">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Mobile Skeleton */}
      <div className="md:hidden flex flex-col divide-y">
        {fakeItems.map((_, i) => (
          <div key={i} className="p-4 space-y-2">
            <div className="h-4 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-40 bg-gray-200 rounded"></div>
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
            </div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-40 bg-gray-200 rounded"></div>
            <div className="h-3 w-28 bg-gray-200 rounded"></div>
            <div className="h-3 w-24 bg-gray-200 rounded"></div>
            <div className="h-3 w-20 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
