import AddDetails from "./AddDetails";

type Detail = {
  id: number;
  title: string;
  price: number;
};

async function getDetails() {
  const res = await fetch("http://localhost:5000/details", {
    cache: "no-store",
  });
  const data = await res.json();
  console.log(data);
  return data;
}

export default async function ProductList() {
  const details: Detail[] = await getDetails();
  return (
    <div className="px-10 py-10">
      <div className="pd-2">
        <AddDetails></AddDetails>
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
            {details.map((detail, index) => (
              <tr
                key={detail.id}
                className="bg-white border-b last:border-none hover:bg-gray-50"
              >
                <td className="px-4 py-2 text-center">{index + 1}</td>
                <td className="px-4 py-2 text-center">{detail.title}</td>
                <td className="px-4 py-2 text-center">{detail.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
