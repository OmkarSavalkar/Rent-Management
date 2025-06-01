import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { nanoid } from "nanoid";

interface IRenterProfile {
  id: string;
  name: string;
  joiningDate: string;
  meterNo: number;
  depositPaid: number;
  mobile: number;
  address: string;
}

const RenterProfile = () => {
  const [openAddForm, setOpenAddForm] = useState<boolean>(false);
  const [rentersList, setRentersList] = useState<IRenterProfile[]>([]);
  const [newOrEditRenterDetails, setNewOrEditRenterDetails] =
    useState<IRenterProfile>({
      id: "",
      name: "",
      joiningDate: "",
      meterNo: 0,
      depositPaid: 0,
      mobile: 0,
      address: "",
    });

  const openAddOrEditFormHandler = (task: string) => {
    if (task) {
      rentersList.length === 4
        ? console.log(
            "All Renters are already added so please remove any one of them to add new!"
          )
        : setOpenAddForm(true);
    }
  };

  const saveRenterProfile = () => {
    if (newOrEditRenterDetails.id !== "") {
      setRentersList((currentList) =>
        currentList.map((item) =>
          item.id === newOrEditRenterDetails.id ? newOrEditRenterDetails : item
        )
      );
    } else {
      const newRenter = {
        ...newOrEditRenterDetails,
        id: nanoid(),
      };
      setRentersList((currentList) => [...currentList, newRenter]);
    }
    setOpenAddForm(false);
    setNewOrEditRenterDetails({
      id: "",
      name: "",
      joiningDate: "",
      meterNo: 0,
      depositPaid: 0,
      mobile: 0,
      address: "",
    });
  };

  const cancelAddForm = () => {
    setNewOrEditRenterDetails({
      id: "",
      name: "",
      joiningDate: "",
      meterNo: 0,
      depositPaid: 0,
      mobile: 0,
      address: "",
    });
    setOpenAddForm(false);
  };

  const deleteRenterProfile = (id: string) => {
    if (confirm("Are You sure you want to delete this renter profile")) {
      setRentersList((currentList) =>
        currentList.filter((item) => item.id != id)
      );
    }
    console.log("Renter profile deleted");
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setNewOrEditRenterDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const editRenter = (editRenterProfile: IRenterProfile) => {
    setOpenAddForm(true);
    setNewOrEditRenterDetails(editRenterProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-pink-800 p-3 sm:p-4">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/50 backdrop-blur-md rounded-3xl shadow-xl p-4 md:p-6 mb-10 border border-purple-400">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-2xl font-bold text-purple-700 drop-shadow">
              Renter Profile
            </h2>
            <button
              onClick={() => openAddOrEditFormHandler("add")}
              className="cursor-pointer bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold shadow-md transition-transform transform hover:scale-105"
            >
              Add Renter
            </button>
          </div>

          {openAddForm && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[
                { label: "Name", name: "name", placeholder: "Enter Name" },
                {
                  label: "Joining Date",
                  name: "joiningDate",
                  placeholder: "DD/MM/YYYY",
                },
                {
                  label: "Meter No",
                  name: "meterNo",
                  placeholder: "Enter number",
                },
                {
                  label: "Deposit Paid",
                  name: "depositPaid",
                  placeholder: "Deposit amount",
                },
                {
                  label: "Mobile Number",
                  name: "mobile",
                  placeholder: "Enter mobile number",
                },
              ].map((field) => (
                <div key={field.name}>
                  <label className="block text-sm font-medium text-gray-800 mb-2">
                    {field.label}
                  </label>
                  <input
                    name={field.name}
                    value={(newOrEditRenterDetails as any)[field.name]}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-white focus:outline-none focus:ring-1 focus:ring-grey-300/40 shadow-sm"
                    placeholder={field.placeholder}
                  />
                </div>
              ))}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Address
                </label>
                <textarea
                  name="address"
                  value={newOrEditRenterDetails.address}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-4 focus:ring-purple-300/40 shadow-sm"
                  placeholder="Flat No, Building Name, Area"
                />
              </div>
              <div className="md:col-span-2 flex gap-4 justify-center mt-6">
                <button
                  onClick={saveRenterProfile}
                  className="bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:scale-105 transition-transform  cursor-pointer"
                >
                  Save
                </button>
                <button
                  onClick={cancelAddForm}
                  className="bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white font-bold py-2 px-6 rounded-full shadow-md hover:scale-105 transition-transform  cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col items-center gap-6">
          {rentersList.map((profile, index) => (
            <div
              key={index}
              className="w-8/9 bg-white rounded-2xl p-6 shadow-md border border-purple-200 hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <FontAwesomeIcon
                    icon={faUserCircle}
                    className="text-green-600 text-5xl drop-shadow"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-purple-800 truncate max-w-[200px]">
                      {profile.name}
                    </h4>
                    <p className="text-sm text-gray-500 truncate max-w-[200px]">
                      <strong>Meter No: </strong> {profile.meterNo}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button
                    className="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm  cursor-pointer"
                    onClick={() => editRenter(profile)}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => deleteRenterProfile(profile.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-full text-xs font-medium shadow-sm  cursor-pointer"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <ul className="text-sm text-gray-700 space-y-1 break-words">
                <li>
                  <strong className="mr-1">Joining Date:</strong>{" "}
                  {profile.joiningDate}
                </li>
                <li>
                  <strong className="mr-1">Deposit Paid:</strong>{" "}
                  {profile.depositPaid}
                </li>
                <li>
                  <strong className="mr-1">Mobile:</strong> {profile.mobile}
                </li>
                <li>
                  <strong className="mr-1">Address:</strong> {profile.address}
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RenterProfile;
