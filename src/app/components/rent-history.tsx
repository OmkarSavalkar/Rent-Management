import React, { useEffect, useState } from "react";
import { getHistoryList } from "../service/service";
import { useSnackbar } from "notistack";
import RenterDropdown from "../common/renterDropdown";
import { IRenterProfile } from "../interface/interface";

const RentHistory = () => {
  const [historyList, setHistoryList] = useState<any[]>([]);
  const { enqueueSnackbar } = useSnackbar();
  const [selectedRenterDetails, setSelectedRenterDetails] =
    useState<IRenterProfile | null>(null);

  const getSelectedRenterFromDropdown = (renter: IRenterProfile) => {
    setSelectedRenterDetails(renter);
    getRentHistoryList(renter.id);
  };

  const getRentHistoryList = async (id: string) => {
    try {
      const historyListResponse = await getHistoryList(id);
      setHistoryList(historyListResponse);
    } catch (error) {
      enqueueSnackbar(
        "❌ Failed to get renter history list. Please try again.",
        {
          variant: "error",
        }
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-200 via-white to-pink-200 p-4">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Title and Dropdown */}
        <div className="bg-white rounded-2xl shadow-md p-5 space-y-4 border border-purple-300">
          <h2 className="text-xl sm:text-2xl font-extrabold text-purple-800 text-center">
            🏠 Rent History
          </h2>
          <RenterDropdown
            renterDropdownUpdated={getSelectedRenterFromDropdown}
          />
        </div>

        {/* History Table */}
        {selectedRenterDetails && (
          <div className="bg-white rounded-2xl shadow-md p-4 border border-gray-300">
            <h3 className="text-lg font-bold text-gray-800 mb-3">
              Rent History of{" "}
              <span className="text-emerald-600">
                {selectedRenterDetails.name}
              </span>
            </h3>

            <div className="overflow-x-auto">
              <table className="min-w-full text-sm sm:text-base text-left border-collapse">
                <thead>
                  <tr className="bg-purple-100 text-blue-600">
                    <th className="p-3 whitespace-nowrap">Date</th>
                    <th className="p-3 whitespace-nowrap">Rent Amount</th>
                    <th className="p-3 whitespace-nowrap">Old Unit</th>
                    <th className="p-3 whitespace-nowrap">Current Unit</th>
                    <th className="p-3 whitespace-nowrap">Electricity (₹)</th>
                    <th className="p-3 whitespace-nowrap">Water & Maint.</th>
                    <th className="p-3 whitespace-nowrap">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {historyList && historyList.length > 0 ? (
                    historyList.map((item, index) => (
                      <tr
                        key={index}
                        className="even:bg-purple-50 hover:bg-purple-100 transition-all"
                      >
                        <td className="p-3 whitespace-nowrap">
                          {new Date(item.generatedOn).toLocaleDateString()}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          ₹{item.rentAmount}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {item.lastMeterUnit}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          {item.currentMeterUnit}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          ₹{item.unitRate} = ₹{item.electricityCharge}
                        </td>
                        <td className="p-3 whitespace-nowrap">
                          ₹{item.waterAndMaintenance}
                        </td>
                        <td className="p-3 whitespace-nowrap font-bold text-green-600">
                          ₹{item.totalRent}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="p-6 text-center text-gray-500">
                        No rent history found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RentHistory;
