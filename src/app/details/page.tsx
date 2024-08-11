import AddDetails from "./AddDetails";
import DropDetails from "./DropDetails";

type Detail = {
  id: number;
  title: string;
  price: number;
};

async function getDetails() {
  try {
    const res = await fetch(`http://localhost:5000/details`, {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch details");
    }

    const data = await res.json();
    console.log(data); // Debugging data structure
    return data;
  } catch (error) {
    console.error("Error fetching details:", error);
    return []; // Return an empty array in case of error
  }
}

export default async function ProductList() {
  const details: Detail[] = await getDetails();

  return (
    <div className="px-10 py-10">
      <div className="pd-2">
        <AddDetails />
      </div>
      <div className="overflow-hidden rounded-lg shadow-lg">
        <table className="table table-fixed w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>Id</th>
              <th className="px-4 py-2">Detail Name</th>
              <th className="px-4 py-2">Price</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {details.map((detail) => (
              <tr
                key={detail.id}
                className="bg-white border-b last:border-none hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-left">{detail.id}</td>
                <td className="px-4 py-2 text-left">{detail.title}</td>
                <td className="px-4 py-2 text-left">{detail.price}</td>
                <td>
                  <DropDetails {...detail} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
