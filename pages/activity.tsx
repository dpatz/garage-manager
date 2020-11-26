import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

interface GarageStatus {
  status: string;
  timestamp: dayjs.Dayjs;
}

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Los_Angeles");

const getGarageStatuses = async (logout: any): Promise<GarageStatus[]> => {
  const response = await fetch("/api/garage_statuses");

  if (response.status === 401) {
    console.log("Not authenticated");
    logout();
    return [];
  }

  if (response.status !== 200) {
    console.log("Something went wrong");
    return [];
  }

  const json = await response.json();

  return json.data.map(([timestamp, status]: [number, string]) => {
    return { timestamp: dayjs(timestamp / 1000), status };
  });
};

const ActivityPage = (): JSX.Element => {
  const { logout } = useAuth();
  const [garageStatuses, setGarageStatuses] = useState([]) as [
    GarageStatus[],
    any
  ];
  const [isRelativeTime, setIsRelativeTime] = useState(true);

  useEffect(() => {
    const garageStatusesEffect = async (): Promise<void> => {
      const s = await getGarageStatuses(logout);
      setGarageStatuses(s);
    };
    garageStatusesEffect();
  }, [setGarageStatuses, logout]);

  const now = dayjs();

  return (
    <div className="flex items-center justify-center flex-grow py-4 overflow-y-auto">
      <ul className="w-full h-full max-w-sm mx-auto space-y-4">
        {garageStatuses.map((garageStatus, index) => {
          return (
            <li
              key={index}
              className="flex justify-between px-6 py-4 bg-white rounded"
            >
              <span>{garageStatus.status === "open" ? "Open" : "Closed"}</span>
              <button
                className="text-sm text-gray-500"
                onClick={(): void => setIsRelativeTime(!isRelativeTime)}
              >
                {isRelativeTime
                  ? garageStatus.timestamp.from(now)
                  : garageStatus.timestamp.format("MM/DD h:mm A")}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default ActivityPage;
