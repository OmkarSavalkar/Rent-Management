import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { IRenterProfile } from "../interface/interface";
import {
  getRenterDetails,
  editRenterDetails,
  addNewRenter,
  deleteRenterDetails,
} from "../service/service";

const RenterProfile = () => {
  let defaultRentalData = {
    id: "",
    name: "",
    joiningDate: "",
    meterNo: 0,
    depositPaid: 0,
    mobile: 0,
    address: "",
    lastMeterUnit: 0,
    waterRate: 0,
    unitRate: 0,
    maintenanceRate: 0,
    rent: 0,
    lastGenerated: "",
  };
  const [ifDisplayForm, setIfDisplayForm] = useState<boolean>(false);
  const [rentersList, setRentersList] = useState<IRenterProfile[]>([]);
  const [newOrEditRenterDetails, setNewOrEditRenterDetails] =
    useState<IRenterProfile>(defaultRentalData);

  useEffect(() => {
    fetchRenters();
  }, []);

  const displayForm = (task: string) => {
    if (task) {
      rentersList.length === 4
        ? alert(
            "All Renters are already added so please remove any one of them to add new!"
          )
        : setIfDisplayForm(true);
    }
  };

  const fetchRenters = async () => {
    let rentersData = await getRenterDetails();
    rentersData.sort((a, b) => a.meterNo - b.meterNo);
    setRentersList(rentersData);
  };

  const saveEditedDetails = async () => {
    let res = await editRenterDetails(newOrEditRenterDetails);
    fetchRenters();
  };

  const addNewDetails = async () => {
    let res = await addNewRenter(newOrEditRenterDetails);
    fetchRenters();
  };

  const deleteRenterProfile = async (id: string) => {
    if (confirm("Are you sure you want to delete this renter profile?")) {
      let res = await deleteRenterDetails(id).then(() => fetchRenters());
    }
  };

  const cancelFormDisplay = () => {
    setNewOrEditRenterDetails(defaultRentalData);
    setIfDisplayForm(false);
  };

  const processDetails = async () => {
    const {
      name,
      joiningDate,
      meterNo,
      depositPaid,
      lastMeterUnit,
      rent,
      waterRate,
      unitRate,
      maintenanceRate,
      mobile,
      address,
    } = newOrEditRenterDetails;

    if (
      !name ||
      !joiningDate ||
      !meterNo ||
      !depositPaid ||
      !mobile ||
      !address ||
      !lastMeterUnit ||
      !waterRate ||
      !unitRate ||
      !maintenanceRate ||
      !rent
    ) {
      alert("Please fill in all fields.");
      return;
    }

    if (
      isNaN(meterNo) ||
      isNaN(depositPaid) ||
      isNaN(mobile) ||
      isNaN(lastMeterUnit) ||
      isNaN(waterRate) ||
      isNaN(unitRate) ||
      isNaN(maintenanceRate) ||
      isNaN(rent)
    ) {
      alert("Meter No, Deposit Paid, and Mobile must be valid numbers.");
      return;
    }

    if (mobile.toString().length !== 10) {
      alert("Mobile number must be 10 digits.");
      return;
    }
    newOrEditRenterDetails.id !== "" ? saveEditedDetails() : addNewDetails();
    cancelFormDisplay();
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewOrEditRenterDetails((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editRenter = (editRenterProfile: IRenterProfile) => {
    setIfDisplayForm(true);
    setNewOrEditRenterDetails(editRenterProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-white to-pink-300 p-3 sm:p-3">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white/60 backdrop-blur-md rounded-2xl shadow-2xl p-3 md:p-4 mb-8 border border-purple-300">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-lg font-extrabold text-purple-800 drop-shadow-sm">
              🏠 Renter Profile
            </h2>
            {!ifDisplayForm && (
              <button
                onClick={() => displayForm("add")}
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg transition-all duration-300 hover:scale-105 cursor-pointer"
              >
                + Add Renter
              </button>
            )}
          </div>

          {/* Form */}
          {ifDisplayForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Name: 🙋‍♂️", name: "name", placeholder: "Enter Name" },
                {
                  label: "Joining Date:🗓️",
                  name: "joiningDate",
                  placeholder: "DD/MM/YYYY",
                },
                {
                  label: "Meter No: 🔌",
                  name: "meterNo",
                  placeholder: "Enter number",
                },
                {
                  label: "Deposit Paid: 💰",
                  name: "depositPaid",
                  placeholder: "Deposit amount",
                },
                {
                  label: "Fixed Rent:💸",
                  name: "rent",
                  placeholder: "Enter rent amount",
                },
                {
                  label: "Last Meter Unit: 🪫",
                  name: "lastMeterUnit",
                  placeholder: "Enter last meter unit to calculate forward",
                },
                {
                  label: "Set Water Charge per month:💧",
                  name: "waterRate",
                  placeholder: "Enter Water charge per month",
                },
                {
                  label: "Set Electricity charge per unit: ⚡",
                  name: "unitRate",
                  placeholder: "Enter Electricity charge per unit",
                },
                {
                  label: "Set Maintenance cost: 🧰",
                  name: "maintenanceRate",
                  placeholder: "Enter Maintenance charge per month",
                },
                {
                  label: "Mobile Number: 📱",
                  name: "mobile",
                  placeholder: "Enter mobile number",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    value={(newOrEditRenterDetails as any)[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-300 shadow-sm bg-white"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address: 📍
                </label>
                <textarea
                  name="address"
                  value={newOrEditRenterDetails.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300/40 shadow-sm bg-white"
                  placeholder="Flat No, Building Name, Area"
                />
              </div>

              <div className="md:col-span-2 flex gap-4 justify-center mt-2">
                <button
                  onClick={processDetails}
                  className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-1 px-4 rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer"
                >
                  💾 Save
                </button>
                <button
                  onClick={cancelFormDisplay}
                  className="bg-gradient-to-r from-blue-400 to-blue-500 hover:from-blue-500 hover:to-blue-600 text-white font-bold py-1 px-4 rounded-full shadow-md hover:scale-105 transition-transform cursor-pointer"
                >
                  ❌ Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        {/* <div className="flex flex-col items-center gap-6">
          {rentersList.map((profile, index) => (
            <div
              key={index}
              className="w-full md:w-4/5 bg-white rounded-3xl p-6 shadow-lg border border-purple-200 hover:shadow-2xl transition-shadow duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-green-600 text-5xl drop-shadow"
                  />
                  <div>
                    <h4 className="text-lg font-bold text-purple-800 truncate max-w-[200px]">
                      <strong>{profile.name}</strong>
                    </h4>
                    <p className="text-sm text-gray-600 truncate max-w-[200px]">
                      <strong>Meter No:</strong> {profile.meterNo}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2 ml-auto">
                  <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 cursor-pointer rounded-full text-sm font-medium shadow transition hover:scale-105"
                    onClick={() => editRenter(profile)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteRenterProfile(profile.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 cursor-pointer rounded-full text-sm font-medium shadow transition hover:scale-105"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              <ul className="text-sm text-gray-700 space-y-1 break-words pl-2">
                <li>
                  🗓️ <strong>Joining Date:</strong> {profile.joiningDate}
                </li>
                <span className="flex justify-between">
                  <li>
                    💰 <strong>Deposit Paid:</strong> ₹{profile.depositPaid}
                  </li>
                  <li>
                    💸 <strong>Fixed Rent:</strong> ₹{profile.rent}
                  </li>
                  <li>
                    🪫 <strong>Last Meter Unit:</strong> {profile.lastMeterUnit}
                  </li>
                </span>

                <span className="flex justify-between">
                  <li>
                    💧 <strong>Water Rate per month:</strong> ₹
                    {profile.waterRate}
                  </li>
                  <li>
                    ⚡ <strong>Electricity Unit per month:</strong> ₹
                    {profile.unitRate}
                  </li>
                  <li>
                    🧰 <strong>Maintenance cost per month:</strong> ₹
                    {profile.maintenanceRate}
                  </li>
                </span>
                <li>
                  📱 <strong>Mobile:</strong> {profile.mobile}
                </li>
                <li>
                  📍 <strong>Address:</strong> {profile.address}
                </li>
              </ul>
            </div>
          ))}
        </div> */}
        <div className="flex flex-col items-center gap-6">
          {rentersList.map((profile, index) => (
            <div
              key={index}
              className="w-full md:w-4/5 bg-white rounded-2xl p-5 shadow-md border border-purple-200 hover:shadow-xl transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-4">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-green-600 text-5xl drop-shadow"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800">
                      {profile.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      <strong>Meter No:</strong> {profile.meterNo}
                    </p>
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => editRenter(profile)}
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow transition-transform hover:scale-105"
                  >
                    ✏️ Edit
                  </button>
                  <button
                    onClick={() => deleteRenterProfile(profile.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-sm font-medium shadow transition-transform hover:scale-105"
                  >
                    🗑️ Delete
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2 text-sm text-gray-800">
                <p>
                  🗓️ <strong>Joining Date:</strong> {profile.joiningDate}
                </p>
                <p>
                  💰 <strong>Deposit Paid:</strong> ₹{profile.depositPaid}
                </p>
                <p>
                  💸 <strong>Fixed Rent:</strong> ₹{profile.rent}
                </p>
                <p>
                  🪫 <strong>Last Meter Unit:</strong> {profile.lastMeterUnit}
                </p>
                <p>
                  💧 <strong>Water Rate:</strong> ₹{profile.waterRate}
                </p>
                <p>
                  ⚡ <strong>Electricity Rate:</strong> ₹{profile.unitRate}
                </p>
                <p>
                  🧰 <strong>Maintenance:</strong> ₹{profile.maintenanceRate}
                </p>
                <p>
                  📱 <strong>Mobile:</strong> {profile.mobile}
                </p>
                <p className="sm:col-span-2 md:col-span-3">
                  📍 <strong>Address:</strong> {profile.address}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenterProfile;
