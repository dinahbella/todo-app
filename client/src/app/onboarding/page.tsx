import Image from "next/image";
import React from "react";
import onboard from "./onboard.png";

const OnboardingPage = () => {
  return (
    <div className="flex">
      <Image src={onboard} alt="onboardimage" height={500} width={500} />
    </div>
  );
};

export default OnboardingPage;
