import { BsSearch } from "react-icons/bs";
import { BiMaleFemale } from "react-icons/bi";

import profileImg from "../../assets/profileImg.jpg";
import { HiTrendingUp, HiTrendingDown } from "react-icons/hi";

import { Link } from "react-router-dom";
import { useState } from "react";
import {
  BarChart,
  DoughnutChart,
} from "../../components/dashboard/adminDashboard/Chart";
import DashboardTable from "../../components/dashboard/adminDashboard/AdminTable";
import { useDashboardStatsQuery } from "../../redux/api/endpoints/dashboardStats";
import SkeltonLoading from "../../shared/SkeltonLoading";

const AdminDashboard = () => {
  const [isOpen, setIsOpen] = useState(false);

  const { data: stats, isLoading: isStatsLoading } = useDashboardStatsQuery("")
  console.log(stats?.data);


  return (
    <div className="adminDashboardContainer">
      {/* header */}
      <header>
        <div className="searchDiv">
          <input type="text" placeholder="Search for products" />
          <BsSearch />
        </div>

        <div className="imgDiv">
          <img
            onClick={() => setIsOpen((pre) => !pre)}
            src={profileImg}
            alt="profile image"
          />
          <dialog open={isOpen}>
            <div>
              <Link to={"/"}>Home</Link>
            </div>
          </dialog>
        </div>
      </header>
      {
        isStatsLoading ? <SkeltonLoading length={20} /> : <>

          {/* section 1 widget card */}
          <section className="widgetSection">
            <WidgetItem
              heading="Revenue"
              amount={true}
              value={stats?.data?.entityCount.totalOrderRevenue || 0}
              percent={40}
              color="rgb(0,115,255)"
            />
            <WidgetItem
              heading="Users"
              value={stats?.data?.entityCount.user || 0}
              percent={40}
              color="rgb(0,198,202)"
            />
            <WidgetItem
              heading="Products"
              value={stats?.data?.entityCount.product || 0}
              percent={40}
              color="rgb(76 0 255)"
            />
            <WidgetItem
              heading="Transactions"
              value={stats?.data?.entityCount.totalOrderRevenue || 0}
              percent={40}
              color="rgb(255,196,0)"
            />
          </section>
          {/* section 2 - graph  */}

          <section className="graphSection">
            {/* div one */}
            <div className="revenueGraph">
              <h2>Revenue & Transaction</h2>
              {/* content div */}
              <BarChart
                data1={stats?.data?.graphStats.graphSixMonthRevenue || []}
                data2={stats?.data?.graphStats.graphSixMonthOrder || []}
                title1="Revenue"
                title2="Transaction"
                bgColor1="rgb(0,115,255)"
                bgColor2="rgb(53,162,235,0.8)"
              />
            </div>
            {/* div two */}
            <div className="productsStock">
              <h2>Inventory</h2>
              {/* content div */}
              {stats?.data?.productCategoryDistribution.map((data) => (
                <ProductItem
                  key={data.category}
                  heading={data.category}
                  value={data.percentage}
                  color={`hsl(${data.percentage * 4},${data.percentage}%,50%)`}
                />
              ))}
            </div>
          </section>

          {/* section 3 - transaction */}
          <section className="transactionSection">
            {/* div one */}
            <div className="genderChart">
              <h2>
                <BiMaleFemale /> Gender Ratio
              </h2>
              <DoughnutChart
                labels={["male", "female"]}
                data1={[stats?.data?.genderRation.male || 0, stats?.data?.genderRation.female || 0]}
                backgroundColor={["hsl(340,82%,56%)", "rgba(53,162,235,0.8)"]}
                cutout={90}
              />
            </div>
            {/* div two */}
            <DashboardTable data={stats?.data?.lastFourTransaction || []} />
          </section>
        </>
      }
    </div>
  );
};

type TProductItemProp = {
  heading: string;
  value: number;
  color: string;
};

const ProductItem = ({ heading, value, color }: TProductItemProp) => {
  return (
    <div className="category-item">
      <h5>{heading}</h5>
      <div>
        <div
          style={{
            backgroundColor: color,
            width: `${value}%`,
          }}
        ></div>
      </div>
      <span>{value}%</span>
    </div>
  );
};

type TWidgetItemprop = {
  heading: string;
  value: number;
  percent: number;
  color: string;
  amount?: boolean;
};

const WidgetItem = ({
  heading,
  value,
  percent,
  color,
  amount = false,
}: TWidgetItemprop) => {
  return (
    <article>
      <div className="widgetInfo">
        <p>{heading}</p>
        <h4>{amount ? `$${value}` : value}</h4>
        {percent > 0 ? (
          <span className="green">
            <HiTrendingUp />+{percent}%
          </span>
        ) : (
          <span className="green">
            <HiTrendingDown />
            {percent}%
          </span>
        )}
      </div>
      <div
        style={{
          background: `conic-gradient(
          ${color} ${(Math.abs(percent) / 100) * 360}deg,
          rgb(225,255,255) 0


        )`,
        }}
        className="widgetCircle"
      >
        <span style={{ color: color }}>{percent}%</span>
      </div>
    </article>
  );
};
export default AdminDashboard;
