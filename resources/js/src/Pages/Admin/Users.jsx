import AdminLayout from "@/src/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";

const Users = () => {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Users
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            You're logged in!
                        </div>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default Users;
