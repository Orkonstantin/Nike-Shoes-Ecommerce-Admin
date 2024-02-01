import { useEffect, useState } from "react";
import axios from "axios";

export default function ProductCount() {
  const [counts, setCounts] = useState({
    total: 0,
    men: {},
    women: {},
    kids: {},
  });

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      const data = response.data;
      const total = data.length;
      const men = countByCategory(
        data.filter((product) => product.properties.Gender === "Men")
      );
      const women = countByCategory(
        data.filter((product) => product.properties.Gender === "Women")
      );
      const kids = countByCategory(
        data.filter((product) => product.properties.Gender === "Kids")
      );
      setCounts({ total, men, women, kids });
    });
  }, []);

  const countByCategory = (products) => {
    return products.reduce((counts, product) => {
      counts[product.categoryName] = (counts[product.categoryName] || 0) + 1;
      return counts;
    }, {});
  };

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
            gap-5
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
            mb-10
            justify-center
            flex
            items-center
        "
      >
        Total products: {counts.total}
      </div>
      <div
        className={
          screenSize === "lg"
            ? `flex flex-wrap justify-between gap-1 text-white rounded-lg overflow-hidden bg-black-800 border-2`
            : `flex flex-wrap flex-col items-center gap-1 text-white rounded-lg overflow-hidden bg-black-800 border-2 px-2`
        }
      >
        {renderCounts("Men", counts.men)}
        <div>
          {screenSize === "sm" && (
            <div className={"w-40 h-1 bg-gray-400"}></div>
          )}
        </div>
        {renderCounts("Women", counts.women)}
        <div>
          {screenSize === "sm" && (
            <div className={"w-40 h-1 bg-gray-400"}></div>
          )}
        </div>
        {renderCounts("Kids", counts.kids)}
      </div>
    </div>
  );
}

function renderCounts(gender, counts) {
  return (
    <div
      className="
            flex
            flex-col
            gap-1
            px-2
            py-2
    "
    >
      <div>
        {gender} products: {Object.values(counts).reduce((a, b) => a + b, 0)}
      </div>
      {Object.entries(counts).map(([category, count]) => (
        <div
          key={category}
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
          {category}: {count}
        </div>
      ))}
    </div>
  );
}
