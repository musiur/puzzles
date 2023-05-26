import MazeGeneratorAndSolver from "@/utils/MazeGeneratorAndSolver";
import { useRef, useState } from "react";

const MazeGenerator = ({defaultSize}) => {
  const [size, setSize] = useState(defaultSize ? defaultSize : 20);
  const parentRef = useRef();
  const Generate = () => {
    if (parentRef.current) {
      let parentHeight = parentRef.current.offsetHeight;
      let parentWidth = parentRef.current.offsetWidth;

      size && MazeGeneratorAndSolver(parentWidth, parentHeight);
    }
  };

  return (
    <div className="shadow-xl bg-white w-[300px] rounded-xl">
      <div className="h-[300px] w-[300px] bg-white rounded-xl" ref={parentRef}>
        <canvas id="mazvas" className="rounded-xl"></canvas>
      </div>
      <div className="grid grid-cols-1 gap-3 p-5">
        <div className="flex items-center justify-start gap-2">
          <button id="generate" onClick={() => Generate()} className="btn">
            create
          </button>
          <input
            className="w-auto p-1 rounded-lg border"
            id="size"
            type="number"
            defaultValue={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button id="solve" className="btn">Solve</button>
          <button id="clear" className="btn">Clear</button>
        </div>
      </div>
    </div>
  );
};

export default MazeGenerator;
