import React, { ReactNode } from "react";
import {
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
  DraggableProps,
  Draggable,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";

type DropProps = Omit<DroppableProps, "children"> & { children: ReactNode };

const getBackgroundColor = (
  snapshot: DroppableStateSnapshot | undefined
): string => {
  // Giving isDraggingOver preference
  if (snapshot?.isDraggingOver) {
    return "pink";
  }

  // If it is the home list but not dragging over
  if (snapshot?.draggingFromThisWith) {
    return "#e6fcff";
  }

  // Otherwise use our default background
  return "white";
};

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
      {(provided, snapshot) => {
        if (React.isValidElement(children)) {
          //React.cloneElement(<div className={"name"}><h1>1</h1></div>)相当于 < div className={"name"} children={<h1>1</h1>} />
          //所以children的儿子都能显示出来
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
            snapshot,
          });
        }
        return <div />;
      }}
    </Droppable>
  );
};
//接受provided的种种
type DropChildProps = Partial<
  {
    provided: DroppableProvided;
    snapshot: DroppableStateSnapshot;
    need: boolean;
  } & DroppableProvidedProps
> &
  // 比如style id class等等
  React.HtmlHTMLAttributes<HTMLDivElement>;
// <返回的element的标签,props约束>
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, snapshot, need, ...props }, ref) => {
    let style = { ...props.style } || {};
    if (need) {
      style.backgroundColor = getBackgroundColor(snapshot);
    }
    return (
      <div ref={ref} {...props} style={style}>
        {children}
        {/* api要求必须要加个placeholder */}
        {props.provided?.placeholder}
      </div>
    );
  }
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
