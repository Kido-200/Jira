import React, { ReactNode } from "react";
import {
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
  DraggableProps,
  Draggable,
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

/*
<Drop>
  <div></div>
</Drop>
就是给div传入了ref:provied:innerRef,provided.droppableProps,provided
*/
//这里封装了Droppable每次要手动传的这几个props
export const Drop = ({ children, ...props }: DropProps) => {
  //Droppable里需要是一个函数,这个函数返回Container,包含一个ref:provied:innerRef,provided.droppableProps
  return (
    <Droppable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          });
        }
        return <div />;
      }}
    </Droppable>
  );
};
//接受provided的种种
type DropChildProps = Partial<
  { provided: DroppableProvided } & DroppableProvidedProps
> &
  // 比如style id class等等
  React.HtmlHTMLAttributes<HTMLDivElement>;
// <返回的element的标签,props约束>
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...props }, ref) => (
    <div ref={ref} {...props}>
      {children}
      {/* api要求必须要加个placeholder */}
      {props.provided?.placeholder}
    </div>
  )
);

type DragProps = Omit<DraggableProps, "children"> & { children: ReactNode };

export const Drag = ({ children, ...props }: DragProps) => {
  return (
    <Draggable {...props}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          });
        } else {
          return <div />;
        }
      }}
    </Draggable>
  );
};
