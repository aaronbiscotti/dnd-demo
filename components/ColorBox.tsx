import itemTypes from "@/utils/ItemTypes";
import { useDrag } from "react-dnd";

export interface ColorBoxProps {
  color: string;
  id?: number;
}

const ColorBox = (props: ColorBoxProps) => {
  const { color, id } = props;
  // first object has props, second is ref attached to dom element
  const [{ isDragging }, dragRef] = useDrag({
    // set initial value: must have type imported from itemtypes.ts
    type: itemTypes.box,
    item: { ID: id },
    // must have props as well, monitor will return objects based on props
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });
  return (
    <div
      ref={dragRef}
      className="w-20 h-20"
      style={{ backgroundColor: color, opacity: isDragging ? 0.5 : 1 }}
    ></div>
  );
};

export default ColorBox;
