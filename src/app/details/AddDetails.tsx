"use client";

import { useState } from "react";

export default function AddDetails() {
  const [modal, setModal] = useState(false);

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button
        className="btn bg-green px-2 py-2 text-sm text-white hover:bg-yellow"
        onClick={handleChange}
      >
        Add New
      </button>

      {modal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Add New Detail</h3>
            <form>
              <div className="form-control">
                <label htmlFor="detail-title" className="label font-bold">
                  Title
                </label>
                <input
                  type="text"
                  id="detail-title"
                  className="input w-full input-bordered"
                  placeholder="Detail Name"
                />
              </div>
              <div className="form-control">
                <label htmlFor="detail-price" className="label font-bold">
                  Price
                </label>
                <input
                  type="text"
                  id="detail-price"
                  className="input w-full input-bordered"
                  placeholder="Price"
                />
              </div>
              <div className="modal-action">
                <button type="button" className="btn" onClick={handleChange}>
                  Close
                </button>
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={handleChange}></div>
        </div>
      )}
    </div>
  );
}
