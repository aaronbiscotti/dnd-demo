import { BoxContext } from "@/app/page";
import itemTypes from "@/utils/ItemTypes";
import { useContext } from "react";
import { useDrop } from "react-dnd";
import { ITEM } from "./interfaces";

export interface BoxTargetProps {
  children: React.ReactNode;
}

const BoxTarget = (props: BoxTargetProps) => {
  const { children } = props;
  const { markPlaced } = useContext(BoxContext);
  const [{ isOver }, dropRef] = useDrop({
    accept: itemTypes.box,
    // drop function can accept item and monitor params
    drop: (item: ITEM, monitor) => markPlaced(item.ID),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  });
  return (
    <div ref={dropRef} className="bg-gray-100 h-32 flex space-x-2 flex-grow">
      {children}
    </div>
  );
};

export default BoxTarget;
