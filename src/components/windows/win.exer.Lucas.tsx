// src/components/home/Window/FibonacciWindow.tsx
import React from "react";
import Window from "../home/Window";

interface FibonacciWindowProps {
  id: string;
  onClose: () => void;
}

const LucasWindow: React.FC<FibonacciWindowProps> = ({ id, onClose }) => {
  const [isMaximized, setIsMaximized] = React.useState(false);
  return (
    <Window
      title="Lucas Number Generator"
      id={id}
      taskbarLabel="Lucas"
      canMinimize
      canMaximize
      canClose
      onMinimize={() => {}}
      onMaximize={(isMaximized) => {
        setIsMaximized(isMaximized);
      }}
    >
      <div className={`w-full ${isMaximized ? "h-full" : "h-[500px]"} p-0`}>
        <iframe
          src="https://automata-casestudy.vercel.app/?mode=lucas"
          title="External Website"
          className="w-full h-full border-0 rounded-md"
        />
      </div>
    </Window>
  );
};

export default LucasWindow;
