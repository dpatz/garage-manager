import React, { MutableRefObject, useEffect, useRef } from "react";
import { Spring } from "react-spring/renderprops.cjs";

interface GarageProps {
  isOpen: boolean | null;
}

export const Garage = ({ isOpen }: GarageProps): JSX.Element => {
  const from = isOpen && isOpen !== null ? 0 : 190;
  const to = isOpen && isOpen !== null ? 190 : 0;

  const prevStatusRef: MutableRefObject<boolean | null> = useRef(null);
  useEffect(() => {
    prevStatusRef.current = isOpen;
  });
  const animate = prevStatusRef.current !== null;

  return (
    <Spring
      from={{ y: from }}
      to={{ y: to }}
      config={{
        ...(animate ? { duration: 5000 } : { duration: 0 }),
      }}
    >
      {(props): JSX.Element => (
        <svg viewBox="0 0 300 240" xmlns="http://www.w3.org/2000/svg">
          <g>
            <rect
              x="50"
              y={200 - props.y}
              width="200"
              height="40"
              className="text-green-500 fill-current"
            ></rect>
            <rect
              x="50"
              y={150 - props.y}
              width="200"
              height="40"
              className="text-green-500 fill-current"
            ></rect>
            <rect
              x="50"
              y={100 - props.y}
              width="200"
              height="40"
              className="text-green-500 fill-current"
            ></rect>
            <rect
              x="50"
              y={50 - props.y}
              width="200"
              height="40"
              className="text-green-500 fill-current"
            ></rect>
          </g>
          <path
            d="M 0 0 L 300 0 L 300 240 L 260 240 L 260 40 L 40 40 L 40 240 L 0 240 Z"
            className="text-gray-700 fill-current"
          ></path>
        </svg>
      )}
    </Spring>
  );
};
