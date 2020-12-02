import React, { useEffect, useState } from "react";
import { useAuth } from "../context/auth-context";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Router from "next/router";

interface GarageStatus {
  status: string;
  timestamp: dayjs.Dayjs;
}

dayjs.extend(relativeTime);
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("America/Los_Angeles");

const fetchGarageStatuses = async (logout: any): Promise<GarageStatus[]> => {
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

const GarageStatuses = (garageStatuses: GarageStatus[]): JSX.Element => {
  const [isRelativeTime, setIsRelativeTime] = useState(true);
  const now = dayjs();

  return (
    <ul className="divide-y sm:space-y-4 sm:divide-transparent">
      {garageStatuses.map((garageStatus, index) => {
        return (
          <li
            key={index}
            className="flex justify-between px-6 py-4 bg-white sm:w-full sm:rounded"
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
  );
};

const ActivityPage = (): JSX.Element => {
  const { isAuthenticated, logout } = useAuth();
  const [garageStatuses, setGarageStatuses] = useState([]) as [
    GarageStatus[],
    any
  ];

  useEffect(() => {
    if (!isAuthenticated) {
      Router.push("/login");
    }
  });

  useEffect(() => {
    const garageStatusesEffect = async (): Promise<void> => {
      const s = await fetchGarageStatuses(logout);
      setGarageStatuses(s);
    };
    garageStatusesEffect();
  }, [setGarageStatuses, logout]);

  return (
    <div className="min-h-0 overflow-y-auto">
      <div className="flex items-center justify-center flex-grow sm:py-4">
        <div className="w-full mx-auto sm:max-w-sm">
          {!garageStatuses ? "" : GarageStatuses(garageStatuses)}
        </div>
      </div>
    </div>
  );
};

export default ActivityPage;
