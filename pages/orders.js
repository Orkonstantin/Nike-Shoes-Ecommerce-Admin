import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [products, setProducts] = useState([]);
  const [paidFilter, setPaidFilter] = useState("ALL");

  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("/api/products").then((response) => {
      setProducts(response.data);
    });
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (paidFilter === "ALL") return true;
    return order.paid === (paidFilter === "YES");
  });

  return (
    <Layout>
      <h1>Orders</h1>
      <label>Filter by paid status: </label>
      <select
        className="
        bg-white
        text-gray-600
        appearance-none
        border-2
        border-gray-300
        rounded-lg
        leading-tight
        focus:outline-none
        focus:border-gray-500
        w-1/12
        "
        value={paidFilter}
        onChange={(e) => setPaidFilter(e.target.value)}
      >
        <option value="ALL">All</option>
        <option value="YES">Yes</option>
        <option value="NO">No</option>
      </select>
      <table
        className="basic
      table-auto
      w-full
      text-center
      rounded-lg
      overflow-hidden
      "
      >
        <thead>
          <tr>
            <th>Date</th>
            <th>Paid</th>
            <th>Recipient</th>
            <th>Products</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 &&
            filteredOrders.map((order) => (
              <tr
                key={order._id}
                className="
                text-sm hover:bg-gray-200
                transition
                duration-300
                ease-in-out
                hover:-translate-y-1
                hover:scale-105
                cursor-pointer
                hover:shadow-xl
                border-4
                border-gray-400
                "
              >
                <td>{new Date(order.createdAt).toLocaleString()}</td>
                <td className={order.paid ? "text-green-600" : "text-red-600"}>
                  {order.paid ? "YES" : "NO"}
                </td>
                <td>
                  {order.name} {order.email}
                  <br />
                  {order.city} {order.postalCode} {order.country}
                  <br />
                  {order.streetAddress}
                </td>
                <td
                  className="w-4/12
                justify-center
                items-center
                text-center
                "
                >
                  {order.line_items.map((l) => (
                    <>
                      {products.map((p) => {
                        if (p._id === l._id) {
                          return (
                            <>
                              <p> {p?.title}</p>
                              <p>${p?.price}</p>
                            </>
                          );
                        }
                      })}
                      <p
                        className="
                      text-gray-500"
                      >
                        {" "}
                        Size: {l?.size} {l.price_data?.product_data.name} x
                        {l.quantity}
                      </p>
                    </>
                  ))}
                </td>
                <td>
                  <p>${order?.totalPrice}</p>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </Layout>
  );
}
