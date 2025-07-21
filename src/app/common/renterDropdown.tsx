import React, { useEffect, useState } from "react";
import { IRenterProfile } from "../interface/interface";
import { getRenterDetails } from "../service/service";

const RenterDropdown = (props: any) => {
  const { renterDropdownUpdated } = props;
  const [allRenterDetails, setAllRenterDetails] = useState<IRenterProfile[]>(
    []
  );
  const [selectedRenterOption, setSelectedRenterOption] = useState("");

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
    renterDropdownUpdated(renter);
  };

  return (
    <div>
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
  );
};
export default RenterDropdown;
