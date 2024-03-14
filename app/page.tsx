"use client";

import BoxTarget from "@/components/BoxTarget";
import ColorBox from "@/components/ColorBox";
import OriginalDiv from "@/components/OriginalDiv";
import { BOX } from "@/components/interfaces";
import React, { useState, createContext } from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { BoxContext } from "./BoxContext";

const colors = ["red", "blue", "green", "cyan"];

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
  const [unlockedColor, setUnlockedColor] = useState("red");
  const [isCorrectMap, setIsCorrectMap] = useState<Record<string, boolean>>({});
  const [submittedColors, setSubmittedColors] = useState<string[]>([]);
  // update boxList based on where color is being placed
  const markPlaced = (id: number, boxType: string) => {
    setBoxList((boxList) =>
      boxList.map(
        (box) =>
          box.id === id
            ? { ...box, placed: boxType !== "", boxType: boxType }
            : box
        // set box placed to be true if not empty and set boxtype to respective color
        // copy all properties of box and add placed bool and new color type
      )
    );
  };

  const handleSubmit = (color: string) => {
    const isCorrect = boxList.some(
      (box) => box.placed && box.color === color && box.boxType === color
    );
    if (isCorrect) {
      const currentColorIndex = colors.indexOf(color);
      const nextColor = colors[currentColorIndex + 1];
      if (nextColor) {
        setUnlockedColor(nextColor);
      }
      setIsCorrectMap((prevMap) => ({ ...prevMap, [color]: true }));
      setSubmittedColors((prevColors) => [...prevColors, color]);
    } else {
      setIsCorrectMap((prevMap) => ({ ...prevMap, [color]: false }));
    }
  };

  const handleRetry = (color: string) => {
    setIsCorrectMap((prevMap) => ({ ...prevMap, [color]: true }));
  };

  return (
    <BoxContext.Provider value={{ markPlaced }}>
      <DndProvider backend={HTML5Backend}>
        <div className="p-20 flex justify-between">
          <OriginalDiv
            unlockedColor={unlockedColor}
            isCorrectMap={isCorrectMap}
            submittedColors={submittedColors}
          >
            {boxList
              .filter((box) => !box.placed)
              .map((box) => (
                <ColorBox key={box.id} id={box.id} color={box.color} />
              ))}
          </OriginalDiv>
          <div className="p-20 w-full bg-green-200 flex flex-col space-y-2">
            {colors.map((color) => (
              <React.Fragment key={color}>
                <h1>{color}</h1>
                <BoxTarget
                  boxType={color}
                  acceptDrops={color === unlockedColor}
                  isCorrect={isCorrectMap[color] ?? true}
                  submittedColors={submittedColors}
                >
                  {boxList
                    .filter((box) => box.placed && box.boxType === color)
                    .map((box) => (
                      <ColorBox key={box.id} id={box.id} color={box.color} />
                    ))}
                </BoxTarget>
                {color === unlockedColor && (
                  <button
                    className="w-full bg-blue-600 text-white py-4"
                    onClick={() =>
                      isCorrectMap[color] === false
                        ? handleRetry(color)
                        : handleSubmit(color)
                    }
                  >
                    {isCorrectMap[color] === false
                      ? "Retry"
                      : `Submit ${color}`}
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
      </DndProvider>
    </BoxContext.Provider>
  );
};

export default Page;
