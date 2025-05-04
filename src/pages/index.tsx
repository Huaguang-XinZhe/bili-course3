import DefaultLayout from "@/layouts/default";
import { Link } from "react-router-dom";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold mb-6">哔哩哔哩课程页面演示</h1>
        <Link
          to="/course"
          className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600"
        >
          查看课程页面
        </Link>
      </div>
    </DefaultLayout>
  );
}
