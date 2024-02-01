import Layout from "@/components/Layout";
import { useSession } from "next-auth/react";
//
import ProductCount from "@/components/ProductCount";
import OrderCount from "@/components/OrderCount";

export default function Home() {
  const { data: session } = useSession();
  // console.log("session: ", { session });
  return (
    <Layout>
      <div className={"text-highlight flex justify-between"}>
        <h2>
          Hello, <b>{session?.user?.name}</b>
        </h2>
        <div
          className={
            "flex bg-gray-300 gap-1 text-black rounded-lg overflow-hidden"
          }
        >
          <img src={session?.user?.image} alt="" className={"w-8 h-8"} />
          <span
            className="
            font-semibold
            flex
            items-center
            justify-center
            px-2
            py-1
            "
          >
            {session?.user.name}
          </span>
        </div>
      </div>
      <br />
      <ProductCount />
      <OrderCount />
    </Layout>
  );
}
