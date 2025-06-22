import React from "react";
import { algorithmsList } from "../../constants/algorithmData.jsx";
import TopicGrid from "../ui/TopicGrid";

const AlgorithmsSection = () => (
  <>
    <h2 className="text-center text-2xl font-bold text-white mb-8">
      ⚡ Essential Algorithms
    </h2>
    <TopicGrid items={algorithmsList} colorTheme="cyan" />
  </>
);

export default AlgorithmsSection; 