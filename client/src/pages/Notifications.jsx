import React from "react";
import Navbar from "../components/Navbar";
import SearchUser from "../components/SearchUser";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
export default function Notifications() {
  const navigate = useNavigate(-1);
  return (
    <div className="min-h-screen  bg-black flex">
      <Navbar />
      <div className="md:border-x-[1px] md:border-x-gray-700 max-h-screen overflow-scroll w-full py-2  ">
        <div className=" backdrop-blur-lg py-2 flex fixed w-[47.5%] -mt-2">
          <div
            className="hover:bg-slate-900 text-center cursor-pointer flex items-center space-x-5  ml-2 h-8 w-8 rounded-full "
            onClick={() => navigate(-1)}
          >
            <ArrowLeftOutlined className="text-slate-300 ml-2" />
          </div>
          <p className="text-white font-bold text-lg">Notifications</p>
        </div>
        <div className="text-white  w-full border-b-[1px] border-b-gray-800 mt-10 ">
          <button className="w-[50%] hover:bg-[#181818] py-3 font-bold ">
            All
          </button>
          <button className="w-[50%] hover:bg-[#181818] py-3 font-bold">
            Mentions
          </button>
        </div>
        <div className="text-gray-600">
          {/* contents  */}
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Nemo sequi
          tempore aspernatur omnis necessitatibus sed accusantium quibusdam
          voluptatum quia aperiam repellat dignissimos ipsum labore explicabo
          voluptates, ex ea! Voluptatem, vero. Aperiam, dolor ipsum debitis
          optio at hic, id magnam ad sit ab dignissimos est ipsa cumque commodi
          atque velit molestias et consequatur quae nulla eveniet, cupiditate
          qui asperiores! Voluptates, at! Quisquam voluptatum sit facilis, ab
          dolorum enim magni optio quidem nobis vitae! Hic, incidunt? Labore
          dignissimos vel rem itaque, libero, impedit laborum mollitia vero cum
          ipsum error velit fuga blanditiis! Ipsam quae numquam aut quos!
          Praesentium asperiores reiciendis, soluta dolorum necessitatibus
          impedit saepe! Dicta voluptates corrupti magni, magnam velit dolor
          officia vero tempora laborum atque aut neque, repellat in harum? Est
          assumenda corporis libero nihil facere, odit, suscipit reprehenderit
          animi cum voluptate debitis. Eligendi, magnam! Porro, amet quidem
          perferendis necessitatibus voluptate neque atque eum aperiam, illum at
          nemo ab quaerat! Doloribus quod aperiam odit ipsum voluptate labore
          accusamus corporis minus quam sequi eveniet necessitatibus dolores
          nemo, tempore laborum ex vero fugit obcaecati nostrum quia ratione
          accusantium voluptatem! Adipisci, magnam laborum? Quia labore eligendi
          quaerat itaque accusamus, dignissimos, provident consequuntur sapiente
          rem illo totam voluptas laborum et. Quas obcaecati deleniti eveniet
          corporis impedit ratione quod quibusdam mollitia, fugit nulla velit
          quae. Vero, commodi ab quos illum magni repellat neque praesentium
          veniam quis? Aut nisi alias atque tenetur magnam, officiis aspernatur.
          Inventore expedita officiis fuga sequi provident hic quas dolorem
          eligendi quos. Voluptates aliquid, totam blanditiis repellendus vel
          dolorem, ducimus odio tempore quod ut nulla aliquam reiciendis, autem
          fugiat voluptate vitae dicta? Commodi molestias aut dignissimos id
          labore dolorem. Id, autem neque! Dolorum tenetur iusto eaque rem
          voluptatum voluptates qui placeat et alias, culpa exercitationem
          asperiores veritatis necessitatibus voluptate reprehenderit aut nam ea
          ex odio minima aliquam consectetur nesciunt. Laboriosam, deserunt
          perspiciatis?
        </div>
      </div>
      <SearchUser />
    </div>
  );
}
