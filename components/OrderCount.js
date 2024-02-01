import axios from "axios";
import { useEffect, useState } from "react";

function isToday(date) {
  const today = new Date();
  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

function isThisWeek(date) {
  const today = new Date();
  const firstDayOfWeek = new Date(
    today.setDate(today.getDate() - today.getDay())
  );
  return date >= firstDayOfWeek;
}

function isThisMonth(date) {
  const today = new Date();
  return (
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
}

export default function OrderCount() {
  const [counts, setCounts] = useState({
    total: 0,
    paid: 0,
    unpaid: 0,
    today: 0,
    thisWeek: 0,
    thisMonth: 0,
  });

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      const data = response.data;
      const total = data.length;
      const paid = data.filter((order) => order.paid === true).length;
      const unpaid = data.filter((order) => order.paid === false).length;
      const today = data.filter((order) =>
        isToday(new Date(order.createdAt))
      ).length;
      const thisWeek = data.filter((order) =>
        isThisWeek(new Date(order.createdAt))
      ).length;
      const thisMonth = data.filter((order) =>
        isThisMonth(new Date(order.createdAt))
      ).length;
      setCounts({ total, paid, unpaid, today, thisWeek, thisMonth });
    });
  }, []);

  //
  const [screenSize, setScreenSize] = useState(
    window.innerWidth > 520 ? "lg" : "sm"
  ); // ["lg", "sm"]
  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth > 520 ? "lg" : "sm");
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div
      className="
    flex
    flex-col
    items-center
    justify-center
    mt-10
"
    >
      <div
        className="
        text-white
            text-center
            text-xl
            underline
            rounded-lg
            overflow-hidden
            mb-4
            justify-center
            flex
            items-center
        "
      >
        <h1>Total Orders: {counts.total}</h1>
      </div>
      <div
        className={
          screenSize === "lg"
            ? `flex flex-wrap justify-between gap-1 text-white rounded-lg overflow-hidden bg-black-800 border-2`
            : `flex flex-wrap flex-col items-center gap-1 text-white rounded-lg overflow-hidden bg-black-800 border-2 px-2`
        }
      >
        <h2
          className="
            flex
            items-center
            justify-center
            px-2
            py-1
            flex-nowrap
            sm:flex-wrap
        "
        >
          Paid: {counts.paid}
        </h2>
        <div>
          {screenSize === "sm" && (
            <div className={"w-40 h-1 bg-gray-400"}></div>
          )}
        </div>
        <h2
          className="
            flex
            items-center
            justify-center
            px-2
            py-1
            flex-nowrap
            sm:flex-wrap
        "
        >
          Unpaid: {counts.unpaid}
        </h2>
        <div>
          {screenSize === "sm" && (
            <div className={"w-40 h-1 bg-gray-400"}></div>
          )}
        </div>
        <h3
          className="
            flex
            items-center
            justify-center
            px-2
            py-1
            flex-nowrap
            sm:flex-wrap
        "
        >
          Orders Today: {counts.today}
        </h3>
        <div>
          {screenSize === "sm" && (
            <div className={"w-40 h-1 bg-gray-400"}></div>
          )}
        </div>
        <h3
          className="
            flex
            items-center
            justify-center
            px-2
            py-1
            flex-nowrap
            sm:flex-wrap
        "
        >
          Orders This Week: {counts.thisWeek}
        </h3>
        <div>
          {screenSize === "sm" && (
            <div className={"w-40 h-1 bg-gray-400"}></div>
          )}
        </div>
        <h3
          className="
            flex
            items-center
            justify-center
            px-2
            py-1
            flex-nowrap
            sm:flex-wrap
        "
        >
          Orders This Month: {counts.thisMonth}
        </h3>
      </div>
    </div>
  );
}
