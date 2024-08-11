"use client";

import { useState, SyntheticEvent } from "react";
import { useRouter } from "next/navigation";

type Detail = {
  id: number;
  title: string;
  price: number;
};

export default function UpdateDetails(detail: Detail) {
  const [title, setTitle] = useState(detail.title);
  const [price, setPrice] = useState(detail.price.toString()); // Initialize as string
  const [modal, setModal] = useState(false);
  const [isMutating, setIsMutating] = useState(false);

  const router = useRouter();

  async function handleUpdate(e: SyntheticEvent) {
    e.preventDefault();
    setIsMutating(true);

    try {
      const res = await fetch(`http://localhost:5000/details/${detail.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          price: Number(price), // Convert to number before sending
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to update detail");
      }

      router.refresh();
      setModal(false);
    } catch (error) {
      console.error("Error updating detail:", error);
    } finally {
      setIsMutating(false);
    }
  }

  // Determine if the form is valid
  const isFormValid =
    title.trim() !== "" && !isNaN(Number(price)) && Number(price) > 0;

  function handleChange() {
    setModal(!modal);
  }

  return (
    <div>
      <button
        className="btn bg-green text-white hover:bg-yellow"
        onClick={handleChange}
      >
        Edit
      </button>

      {modal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Edit {detail.title}</h3>
            <form onSubmit={handleUpdate}>
              <div className="form-control">
                <label htmlFor="detail-title" className="label font-bold">
                  Title
                </label>
                <input
                  type="text"
                  id="detail-title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Detail Name"
                />
              </div>
              <div className="form-control">
                <label htmlFor="detail-price" className="label font-bold">
                  Price
                </label>
                <input
                  type="number" // Change to number input
                  id="detail-price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="input w-full input-bordered"
                  placeholder="Price"
                  min="0"
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn bg-gray-500 text-white hover:bg-gray-600"
                  onClick={handleChange}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn bg-green hover:bg-yellow text-white disabled:opacity-50"
                  disabled={!isFormValid || isMutating}
                >
                  {isMutating ? (
                    <>
                      <svg
                        className="animate-spin h-5 w-5 mr-2 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 0 1 8-8v8H4z"
                        ></path>
                      </svg>
                      Saving...
                    </>
                  ) : (
                    "Save"
                  )}
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
