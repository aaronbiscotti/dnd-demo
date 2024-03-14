import itemTypes from "@/utils/ItemTypes";
import { useDrag } from "react-dnd";

export interface ColorBoxProps {
  color: string;
  id?: number;
  disabled?: boolean;
}

const ColorBox = (props: ColorBoxProps) => {
  const { color, id, disabled } = props;
  // first object has props, second is ref attached to dom element
  const [{ isDragging }, dragRef] = useDrag({
    // set initial value: must have type imported from itemtypes.ts
    type: itemTypes.box,
    item: { ID: id, color },
    // must have props as well, monitor will return objects based on props
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  // can implement useDrop here if want to make it redraggable
  return (
    <div
      ref={disabled ? null : dragRef}
      className={`w-20 h-20 ${!disabled && "cursor-move"}`}
      style={{ backgroundColor: color, opacity: isDragging ? 0.5 : 1 }}
    ></div>
  );
};

export default ColorBox;
