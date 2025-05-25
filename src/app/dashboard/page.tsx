"use client";
import React, { useState } from "react";
import BackButton from "../components/back-button";
import { serviceEnum } from "../enum/enum";
import RenterProfile from "../components/renter-profile";
import CalculateRent from "../components/calcuate-rent";
import RentHistory from "../components/rent-history";
import HomeServices from "../components/home-services";

const Dashboard = () => {
  const [selectedService, setSelectedService] = useState(serviceEnum.dashboard);

  const updateService = (num: number) => setSelectedService(num);

  const serviceCards = [
    {
      label: "Renters Profile",
      image: "/profile.png",
      enumValue: serviceEnum.renterProfile,
    },
    {
      label: "Calculate Rent",
      image: "/calculate.png",
      enumValue: serviceEnum.calculateRent,
    },
    {
      label: "Rent History",
      image: "/history.png",
      enumValue: serviceEnum.rentHistory,
    },
    {
      label: "Other Services",
      image: "/calculate.png",
      enumValue: serviceEnum.service,
    },
  ];

  const renderContent = () => {
    switch (selectedService) {
      case serviceEnum.renterProfile:
        return <RenterProfile />;
      case serviceEnum.calculateRent:
        return <CalculateRent />;
      case serviceEnum.rentHistory:
        return <RentHistory />;
      case serviceEnum.service:
        return <HomeServices />;
      default:
        return (
          <section className="absolute top-40 left-0 w-full h-full bg-gradient-to-br from-indigo-300 via-white to-pink-300 rounded-t-3xl px-6 py-5">
            <div className="relative w-full h-full max-w-7xl mx-auto px-4 py-10 flex flex-col items-center text-center">
              <div className="backdrop-blur-md bg-white/30 rounded-3xl shadow-2xl border border-white/40 p-10 max-w-4xl w-full">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 drop-shadow-md mb-6">
                  Welcome to{" "}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 via-red-500 to-yellow-500 animate-pulse drop-shadow-glow">
                    Sawali Niwas
                  </span>
                  <br /> Rent Management Dashboard
                </h1>

                <p className="text-gray-700 text-base md:text-lg mb-10">
                  Select a service to get started
                </p>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {serviceCards.map((item, idx) => (
                    <div
                      key={idx}
                      onClick={() => updateService(item.enumValue)}
                      className="bg-white/80 hover:bg-white hover:scale-105 transition-all duration-300 cursor-pointer rounded-xl shadow-md p-5 flex flex-col items-center justify-center backdrop-blur-md border border-gray-300"
                    >
                      <img
                        src={item.image}
                        alt={item.label}
                        className="w-14 h-14 mb-4"
                      />
                      <p className="text-gray-800 font-medium text-sm text-center">
                        {item.label}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );
    }
  };

  return (
    <div className="relative w-full min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden">
      {renderContent()}
      {selectedService !== serviceEnum.dashboard && (
        <BackButton setSelectedService={setSelectedService} />
      )}
    </div>
  );
};

export default Dashboard;
