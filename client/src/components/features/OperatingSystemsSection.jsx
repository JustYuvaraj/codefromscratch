import React from "react";
import { osList } from "../../constants/osData.jsx";
import TopicGrid from "../ui/TopicGrid";

const OperatingSystemsSection = () => (
  <>
    <h2 className="text-center text-2xl font-bold text-white mb-8">
      🖥️ Operating Systems
    </h2>
    <TopicGrid items={osList} colorTheme="green" />
  </>
);

export default OperatingSystemsSection; 