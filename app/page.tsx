"use client";

import BoxTarget from "@/components/BoxTarget";
import ColorBox from "@/components/ColorBox";
import { BOX } from "@/components/interfaces";
import React, { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

export const BoxContext = createContext({
  markPlaced: (id: number) => {},
});

const Page = () => {
  const [boxList, setBoxList] = useState<BOX[]>([
    {
      id: 1,
      placed: false,
      color: "red",
    },
    {
      id: 2,
      placed: false,
      color: "red",
    },
    {
      id: 3,
      placed: false,
      color: "blue",
    },
    {
      id: 4,
      placed: false,
      color: "blue",
    },
    {
      id: 5,
      placed: false,
      color: "green",
    },
    {
      id: 6,
      placed: false,
      color: "green",
    },
    {
      id: 7,
      placed: false,
      color: "cyan",
    },
    {
      id: 8,
      placed: false,
      color: "cyan",
    },
  ]);

  const markPlaced = (id: number) => {
    const draggedBox = boxList.filter((box, i) => box.id === id)[0];
    draggedBox.placed = true;
    setBoxList(boxList.filter((box, i) => box.id !== id).concat(draggedBox));
  };

  return (
    <BoxContext.Provider value={{ markPlaced }}>
      <DndProvider backend={HTML5Backend}>
        <div className="p-20 flex justify-between">
          <div className="p-20 w-full bg-gray-200 flex space-x-2">
            {boxList
              .filter((box, i) => box.placed === false)
              .map((box, i) => (
                <ColorBox key={i} id={box.id} color={box.color} />
              ))}
          </div>
          <div className="p-20 w-full bg-green-200">
            <BoxTarget>
              {boxList
                .filter((box, i) => box.placed === true)
                .map((box, i) => (
                  <ColorBox key={i} id={box.id} color={box.color} />
                ))}
            </BoxTarget>
          </div>
        </div>
      </DndProvider>
    </BoxContext.Provider>
  );
};

export default Page;
