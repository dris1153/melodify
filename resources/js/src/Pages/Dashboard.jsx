import AdminLayout from "@/src/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";

export default function Dashboard({ songInToday, artistInToday, userInToday }) {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800 flex items-center gap-[12px] p-6">
                        <div className=" bg-orange-500 shadow-md rounded-lg p-6 flex-1">
                            <h3 className="text-lg font-medium  text-gray-100">
                                Number song in Today
                            </h3>
                            <p className="mt-2 text-gray-100">
                                {songInToday || 0}
                            </p>
                        </div>
                        <div className="bg-blue-500 shadow-md rounded-lg p-6 flex-1">
                            <h3 className="text-lg font-medium  text-gray-100">
                                Number artist in Today
                            </h3>
                            <p className="mt-2 text-gray-100">
                                {artistInToday}
                            </p>
                        </div>
                        <div className="bg-green-500 shadow-md rounded-lg p-6 flex-1">
                            <h3 className="text-lg font-medium  text-gray-100">
                                Number user in Today
                            </h3>
                            <p className="mt-2 text-gray-100">{userInToday}</p>
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
