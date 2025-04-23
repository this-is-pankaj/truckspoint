import Button from "@/components/Button/Button";
import { PiPlus } from "react-icons/pi";

const consignor = () => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-xl font-bold text-center">Consignor List</h2>
      <div className="flex flex-col gap-2">
        <p>Here you will find the list of all the consignors that have ever used your services. You can create more so as to speed up your bilty generation process.</p>
        <div className="flex flex-row-reverse gap-4 items-center">
          <Button variant="outline" text="sm" >
            <div className="flex gap-2 items-center">
              <PiPlus size={16} /> Create New Consignor
            </div>
          </Button>
          <input type="search" placeholder="Search" className="px-4 py-2 border border-gray-300 rounded" />
        </div>
        <div className="overflow-auto w-full">
          <table className="w-full border-collapse border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Consignor Name</th>
                <th className="border border-gray-300 px-4 py-2">Contact Number</th>
                <th className="border border-gray-300 px-4 py-2">Address</th>
                <th className="border border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
                <td className="border border-gray-300 px-4 py-2">1</td>
              </tr>
            </tbody>
          </table>
        </div>

      </div>
    </div>
  )
}

export default consignor;