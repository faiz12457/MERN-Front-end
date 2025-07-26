import React from 'react'

function UploadImg({formik,ref}) {
  return (
     <div className="p-6  w-full mx-auto bg-white rounded-2xl shadow">
        <label className="block mb-4">
          <span className="text-gray-700 font-medium">Choose Images</span>
          <input
          ref={ref}
            type="file"
            multiple
            onChange={(e) =>
              formik.setFieldValue("images", [...e.target.files])
            }
            className="block w-full  text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:cursor-pointer
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            mt-2"
          />
        </label>
      </div>
  )
}

export default UploadImg