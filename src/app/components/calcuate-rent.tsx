import React, { useEffect, useState } from "react";
import { IRenterProfile } from "../interface/interface";
import {
  getRenterDetails,
  addNewHistoryRecord,
  editRenterDetails,
} from "../service/service";
import { useSnackbar } from "notistack";

const CalculateRent = () => {
  const [allRenterDetails, setAllRenterDetails] = useState<IRenterProfile[]>(
    []
  );
  const [selectedRenterOption, setSelectedRenterOption] = useState("");
  const [selectedRenterDetails, setSelectedRenterDetails] = useState<
    IRenterProfile | null | any
  >(null);
  const [currentElectricityUnit, setCurrentElectricityUnit] =
    useState<string>("");
  const [totalRent, setTotalRent] = useState<number>(0);
  const [lastMonthsUnit, setLastMonthsUnit] = useState<number>(0);
  const [rentMessage, setRentMessage] = useState<string>("");
  const [rentDistributionStatement, setRentDistributionStatement] =
    useState<string>("");
  const { enqueueSnackbar } = useSnackbar();

  const currentDate = new Date();
  const previousMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );
  const rentMonth = previousMonth.toLocaleString("default", { month: "long" });
  const rentYear = previousMonth.getFullYear();
  const headingDate = `Month ${rentMonth}-${rentYear}`;

  useEffect(() => {
    fetchRentersForOptions();
  }, []);

  const fetchRentersForOptions = async () => {
    const rentersData = await getRenterDetails();
    setAllRenterDetails(rentersData as any);
  };

  const handleRenterDropdownChange = (e: any) => {
    const renter = allRenterDetails.find((item) => item.id === e.target.value);
    setSelectedRenterOption(e.target.value);
    setSelectedRenterDetails(renter || null);
    setTotalRent(0);
    setCurrentElectricityUnit("");
    setLastMonthsUnit(renter?.lastMeterUnit || 0);
    setRentMessage("");
  };

  const calculateTotalRent = () => {
    if (!selectedRenterDetails || !(Number(currentElectricityUnit) > 0)) return;
    const { rent, waterRate, maintenanceRate, unitRate, name } =
      selectedRenterDetails;
    const electricityCharge =
      (Number(currentElectricityUnit) - lastMonthsUnit) * unitRate;
    const total =
      Number(rent) +
      Number(waterRate) +
      Number(maintenanceRate) +
      Number(electricityCharge);
    setTotalRent(total);
    setRentDistributionStatement(
      `${rent} (rent) + ${waterRate} (water rate) + ${maintenanceRate} (maintenance) + ${electricityCharge} (electricity)`
    );
    const message = `Hi ${name}, your rent for ${headingDate} is ₹${total}. Electricity bill is ₹${electricityCharge} with ${
      Number(currentElectricityUnit) - lastMonthsUnit
    } units in ${rentMonth} month.`;
    setRentMessage(message);
  };

  const saveRentToFirestore = async () => {
    try {
      const rentData = {
        id: selectedRenterDetails.id,
        name: selectedRenterDetails.name,
        month: rentMonth,
        year: rentYear,
        rentAmount: Number(selectedRenterDetails.rent),
        unitRate: `${
          Number(currentElectricityUnit) - lastMonthsUnit
        } x ${Number(selectedRenterDetails.unitRate)}`,
        electricityCharge:
          (Number(currentElectricityUnit) - lastMonthsUnit) *
          selectedRenterDetails.unitRate,
        totalRent,
        lastMeterUnit: lastMonthsUnit,
        currentMeterUnit: Number(currentElectricityUnit),
        generatedOn: new Date().toISOString(),
      };

      await addNewHistoryRecord(rentData);

      const updatedDetails = {
        ...selectedRenterDetails,
        lastMeterUnit: Number(currentElectricityUnit),
        lastGenerated: new Date().toLocaleDateString("en-GB"),
      };
      await editRenterDetails(updatedDetails);
      setSelectedRenterDetails(updatedDetails);
      enqueueSnackbar("✅ Rent saved to history successfully!", {
        variant: "success",
      });
    } catch (err) {
      enqueueSnackbar("❌ Failed to save rent. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-white to-pink-300 p-4">
      <div className="max-w-3xl mx-auto space-y-4">
        <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 border border-purple-300 space-y-3">
          <h2 className="text-center text-lg sm:text-xl font-bold text-purple-800">
            🏠 Calculate Rent for {headingDate}
          </h2>

          {allRenterDetails.length ? (
            <select
              name="renterDropdown"
              value={selectedRenterOption}
              onChange={handleRenterDropdownChange}
              className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm focus:ring-purple-300 focus:outline-none"
            >
              <option value="">-- Select a renter --</option>
              {allRenterDetails.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.name}
                </option>
              ))}
            </select>
          ) : (
            <p className="text-sm text-gray-700 text-center">
              ℹ️ Enter renter details in the dashboard to proceed.
            </p>
          )}
        </div>

        {selectedRenterDetails && (
          <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow p-4 border border-purple-300 space-y-4">
            <div className="flex flex-col sm:flex-row justify-between text-sm text-gray-700">
              <span>
                👤 <strong>{selectedRenterDetails.name}</strong>
              </span>
              <span>
                🕒 Last Generated: {selectedRenterDetails.lastGenerated}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
              <div>💸 Rent: ₹ {selectedRenterDetails.rent}</div>
              <div>💧 Water: ₹ {selectedRenterDetails.waterRate}</div>
              <div>⚡ Electricity: ₹ {selectedRenterDetails.unitRate}/unit</div>
              <div>
                🧰 Maintenance: ₹ {selectedRenterDetails.maintenanceRate}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label>Last Month Unit:</label>
                <input
                  type="number"
                  value={lastMonthsUnit}
                  onChange={(e) => setLastMonthsUnit(Number(e.target.value))}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                  placeholder="Last month's unit"
                />
              </div>

              <div>
                <label>Current Month Unit:</label>
                <input
                  type="number"
                  value={currentElectricityUnit}
                  onChange={(e) => setCurrentElectricityUnit(e.target.value)}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                  placeholder="Current unit"
                />
              </div>

              {currentElectricityUnit && (
                <div className="pt-0 md:mt-5">
                  <label>
                    Units: {Number(currentElectricityUnit) - lastMonthsUnit}
                  </label>
                </div>
              )}
            </div>

            <button
              onClick={calculateTotalRent}
              className="w-full bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-md font-semibold transition"
            >
              Calculate Rent
            </button>

            {totalRent > 0 && (
              <div className="space-y-3">
                <div className="text-purple-700 font-bold text-lg">
                  💰 Total Rent: ₹ {totalRent}
                </div>
                <div>{rentDistributionStatement}</div>

                <button
                  onClick={saveRentToFirestore}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md font-semibold"
                >
                  💾 Save Rent
                </button>

                <textarea
                  value={rentMessage}
                  onChange={(e) => setRentMessage(e.target.value)}
                  rows={2}
                  className="w-full px-3 py-2 rounded-md border border-gray-300 shadow-sm"
                />

                <div className="flex flex-col sm:flex-row gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(rentMessage)}
                    className="w-full sm:w-auto bg-purple-200 hover:bg-purple-300 text-purple-800 px-4 py-2 rounded-md font-semibold"
                  >
                    📋 Copy
                  </button>

                  <a
                    href={`https://wa.me/91${
                      selectedRenterDetails.mobile
                    }?text=${encodeURIComponent(rentMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md text-center font-semibold"
                  >
                    📲 WhatsApp
                  </a>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CalculateRent;
