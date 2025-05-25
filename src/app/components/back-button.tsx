import React from "react";
import { serviceEnum } from "../enum/enum";

const BackButton = (props: { setSelectedService: any }) => {
  const { setSelectedService } = { ...props };

  return (
    <button
      className="absolute bottom-3 right-3 rounded-4xl bg-black text-white px-3 py-1 hover:bg-white hover:text-black hover:cursor-pointer"
      onClick={() => setSelectedService(serviceEnum.dashboard)}
    >
      ← Go Back
    </button>
  );
};
export default BackButton;
