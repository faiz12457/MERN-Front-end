import React from 'react'
import { MdAddCircleOutline, MdDeleteSweep } from "react-icons/md";

function DynamicField({ label, field, values, errors, arrayHelpers }) {
  return (
     <div>
          <label className="block text-sm font-medium mb-1">{label}</label>
          {values.map((val, idx) => (
            <div key={idx} className="flex items-center gap-2 mb-2">
              <input
                type="text"
                value={val}
                onChange={(e) => arrayHelpers(field, "update", idx, e.target.value)}
                className="flex-1 border px-3 py-2 rounded-lg focus:outline-none focus:ring-2"
                placeholder={`${label.slice(0, -1)} ${idx + 1}`}
              />
              <button
                type="button"
                onClick={() => arrayHelpers(field, "remove", idx)}
              >
                <MdDeleteSweep size={24} className="text-red-500 cursor-pointer" />
              </button>
            </div>
          ))}
          {typeof errors === "string" && (
            <p className="text-red-500 text-sm mb-1">{errors}</p>
          )}
          <button
            type="button"
            onClick={() => arrayHelpers(field, "add")}
            className="flex items-center cursor-pointer text-blue-600 hover:underline"
          >
            <MdAddCircleOutline size={20} className="mr-1" /> Add{" "}
            {label.slice(0, -1)}
          </button>
        </div>
  )
}

export default DynamicField