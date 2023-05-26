import MazeGenerator from "@/components/MazeGenerator";
import SudokuGenerator from "@/components/SudokuGenerator";
import { useState } from "react";

const Home = () => {
  const [generator, setGenerator] = useState("");
  return (
    <div className="p-10">
      <div className="w-[500px] mx-auto">
        <div className="grid grid-cols-2 gap-4 border rounded-lg p-1 my-5">
          {["sudoku", "maze"].map((item) => {
            return (
              <button
                key={item}
                onClick={() => setGenerator(item)}
                className="border-0 bg-gray-100 hover:bg-blue-600 text-black hover:text-white px-5 py-1 text-center rounded-md"
              >
                {item}
              </button>
            );
          })}
        </div>
        <div className="flex items-start justify-center">
        {generator === "sudoku" ? (
          <SudokuGenerator />
        ) : generator === "maze" ? (
          <MazeGenerator defaultSize={30} />
        ) : null}
        </div>
      </div>
    </div>
  );
};

export default Home;
