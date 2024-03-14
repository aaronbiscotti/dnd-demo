import { BoxContext } from "@/app/page";
import itemTypes from "@/utils/ItemTypes";
import { useContext, useEffect, useState } from "react";
import { useDrop } from "react-dnd";
import { ITEM } from "./interfaces";

export interface BoxTargetProps {
  children: React.ReactNode;
  boxType: string;
  acceptDrops: boolean;
  isCorrect: boolean;
  submittedColors: string[];
}

const BoxTarget = ({
  children,
  boxType,
  acceptDrops,
  isCorrect,
  submittedColors,
}: BoxTargetProps) => {
  const { markPlaced } = useContext(BoxContext);

  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: itemTypes.box,
      drop: (item: ITEM, monitor) => {
        if (acceptDrops && !submittedColors.includes(boxType)) {
          markPlaced(item.ID, boxType);
        }
      },
      collect: (monitor) => ({
        isOver: !!monitor.isOver() && acceptDrops,
      }),
    }),
    [acceptDrops, markPlaced, boxType, submittedColors]
  );

  const baseStyle = "bg-gray-100 h-32 flex space-x-2 flex-grow";
  const acceptStyle = acceptDrops ? "bg-opacity-100" : "bg-opacity-50";
  const correctIndicator = isCorrect
    ? ""
    : "transition-colors duration-500 bg-red-200";

  return (
    <div
      ref={dropRef}
      className={`${baseStyle} ${acceptStyle} ${correctIndicator}`}
    >
      {children}
    </div>
  );
};

export default BoxTarget;
