const UploadBox = () => {
  return (
    <div className="w-full">
      <label
        htmlFor="images"
        className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer bg-base-100 hover:bg-base-200"
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6 text-center">
          <svg
            className="w-10 h-10 mb-3 text-gray-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16V4a1 1 0 011-1h8a1 1 0 011 1v12m-4 4h-4m0 0l-2-2m2 2l2-2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500">
            <span className="font-semibold">Click to upload</span> or drag &
            drop
          </p>
          <p className="text-xs text-gray-400">PNG, JPG, JPEG (max 5MB)</p>
        </div>
        <input id="images" type="file" className="hidden" multiple />
      </label>
    </div>
  );
};

export default UploadBox;
