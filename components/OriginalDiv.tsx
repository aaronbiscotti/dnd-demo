import { useDrop } from "react-dnd";
import itemTypes from "@/utils/ItemTypes";
import { useContext } from "react";
import { BoxContext } from "@/app/BoxContext";

export interface OriginalDivProps {
  children: React.ReactNode;
  unlockedColor: string;
  isCorrectMap: Record<string, boolean>;
  submittedColors: string[];
}

const OriginalDiv = ({
  children,
  unlockedColor,
  isCorrectMap,
  submittedColors,
}: OriginalDivProps) => {
  const { markPlaced } = useContext(BoxContext);

  const [, dropRef] = useDrop({
    accept: itemTypes.box,
    drop: (item: { ID: number; color: string }) => {
      if (
        (item.color === unlockedColor ||
          (isCorrectMap[item.color] === false &&
            !submittedColors.includes(item.color))) &&
        !submittedColors.includes(item.color)
      ) {
        markPlaced(item.ID, "");
      }
    },
  });

  return (
    <div ref={dropRef} className="p-20 w-full bg-gray-200 flex space-x-2">
      {children}
    </div>
  );
};

export default OriginalDiv;
