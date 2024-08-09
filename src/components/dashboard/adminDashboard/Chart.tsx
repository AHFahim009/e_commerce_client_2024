import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
  ChartOptions,
  ArcElement,
} from "chart.js";
import {Bar, Doughnut} from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  // "August",
  // "September",
  // "October",
  // "November",
  // "December",
];

type TProp = {
  data1: number[];
  data2: number[];
  title1: string;
  title2: string;
  bgColor1: string;
  bgColor2: string;
  labels?: string[];
  horizontal?: boolean;
};

export const BarChart = ({
  data1,
  data2,
  title1,
  title2,
  bgColor1,
  bgColor2,
  labels = months,
  horizontal = false,
}: TProp) => {
  const options: ChartOptions<"bar"> = {
    responsive: true,
    indexAxis: horizontal ? "y" : "x",
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
      x: {
        beginAtZero: true,
        grid: {
          display: false,
        },
      },
    },
  };

  // revenue percent and transaction percent:
  const data: ChartData<"bar", number[], string> = {
    labels,
    datasets: [
      {
        label: title1,
        data: data1,
        backgroundColor: bgColor1,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
      {
        label: title2,
        data: data2,
        backgroundColor: bgColor2,
        barThickness: "flex",
        barPercentage: 1,
        categoryPercentage: 0.4,
      },
    ],
  };

  return <Bar options={options} data={data} />;
};

type TDoughnutProp = {
  labels: string[];
  data1: number[];
  backgroundColor: string[];
  offset?: number;
  legend?: boolean;
  cutout?: number | string;
};

export const DoughnutChart = ({
  labels,
  data1,
  backgroundColor,
  offset,
  legend,
  cutout,
}: TDoughnutProp) => {
  const data: ChartData<"doughnut", number[], string> = {
    labels,
    datasets: [
      {
        data: data1,
        backgroundColor,
        borderWidth: 0,
        offset,
      },
    ],
  };

  const options: ChartOptions<"doughnut"> = {
    responsive: true,
    plugins: {
      legend: {
        display: legend,
        position: "bottom",
        labels: {
          padding: 40,
        },
      },
    },
    cutout,
  };

  return <Doughnut data={data} options={options} />;
};
