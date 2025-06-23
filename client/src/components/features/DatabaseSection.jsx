import React from "react";
import { databaseList } from "../../constants/databaseData.jsx";
import TopicGrid from "../ui/TopicGrid";

const DatabaseSection = () => (
  <>
    <h2 className="text-center text-2xl font-bold text-white mb-8">
      🗄️ Database Management Systems
    </h2>
    <TopicGrid items={databaseList} colorTheme="blue" />
  </>
);

export default DatabaseSection; 