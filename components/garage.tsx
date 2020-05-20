import React from "react";
import { Spring, config } from "react-spring/renderprops.cjs";

interface GarageProps {
  isOpen: boolean | null;
  animate?: boolean;
}

export const Garage = ({
  isOpen,
  animate = true,
}: GarageProps): JSX.Element => {
  const from = isOpen && isOpen !== null ? 0 : 190;
  const to = isOpen && isOpen !== null ? 190 : 0;

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
              // eslint-disable-next-line react/prop-types
              y={200 - props.y}
              width="200"
              height="40"
              className="text-green-500 fill-current"
            ></rect>
            <rect
              x="50"
              // eslint-disable-next-line react/prop-types
              y={150 - props.y}
              width="200"
              height="40"
              className="text-green-500 fill-current"
            ></rect>
            <rect
              x="50"
              // eslint-disable-next-line react/prop-types
              y={100 - props.y}
              width="200"
              height="40"
              className="text-green-500 fill-current"
            ></rect>
            <rect
              x="50"
              // eslint-disable-next-line react/prop-types
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
