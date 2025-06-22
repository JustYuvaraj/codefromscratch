import React from "react";
import { dataStructuresList } from "../../constants/dataStructureData.jsx";
import TopicGrid from "../ui/TopicGrid";

const DataStructuresSection = () => (
  <>
    <h2 className="text-center text-2xl font-bold text-white mb-8">
      🧠 Data Structures Explorer
    </h2>
    <TopicGrid items={dataStructuresList} colorTheme="cyan" />
  </>
);

export default DataStructuresSection; 