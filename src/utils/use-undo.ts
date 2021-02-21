import { useCallback, useState } from "react";

export const useUnndo = <T>(initalPresent: T) => {
  //past取尾
  //future取头

  const [state, setState] = useState<{
    past: T[];
    present: T;
    future: T[];
  }>({
    past: [],
    present: initalPresent,
    future: [],
  });

  const canUndo = state.past.length !== 0;
  const canRedo = state.future.length !== 0;

  //传给外面的函数最好用useCallback 没准就被加到deps里了
  //再用setState的函数写法包一层就不会用到任何依赖了,deps就不用写了
  const undo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;
      if (past.length === 0) return currentState;
      const previous = past[past.length - 1];
      //slice(start,end)  取[start,end)
      const newPast = past.slice(0, past.length - 1);

      return {
        past: newPast,
        present: previous,
        future: [present, ...future],
      };
    });
  }, []);

  const redo = useCallback(() => {
    setState((currentState) => {
      const { past, present, future } = currentState;

      if (future.length === 0) return currentState;

      const next = future[0];
      const newFuture = future.slice(1);

      return {
        past: [...past, present],
        present: next,
        future: newFuture,
      };
    });
  }, []);

  const set = useCallback((newPresent: T) => {
    setState((currentState) => {
      const { past, present, future } = currentState;

      if (newPresent === present) return currentState;

      return {
        past: [...past, present],
        present: newPresent,
        future: [],
      };
    });
  }, []);

  const reset = useCallback((newPresent: T) => {
    setState(() => {
      return {
        past: [],
        future: [],
        present: newPresent,
      };
    });
  }, []);

  return [state, { set, reset, undo, redo, canUndo, canRedo }] as const;
};
