import AdminLayout from "@/src/Layouts/AdminLayout";
import { Head } from "@inertiajs/react";
import React from "react";
import FormEditUserInfo from "./Partials/FormEditUserInfo";
import FormDeleteUser from "./Partials/FormDeleteUser";
import FormResetPasswordUser from "./Partials/FormResetPasswordUser";

const UserEdit = ({ user }) => {
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {user?.name || "Create User"}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <FormEditUserInfo className="max-w-xl" user={user} />
                    </div>
                    {user && (
                        <>
                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 ">
                                <FormResetPasswordUser
                                    className="max-w-xl"
                                    user={user}
                                />
                            </div>
                            <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800 ">
                                <FormDeleteUser
                                    className="max-w-xl"
                                    user={user}
                                />
                            </div>
                        </>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default UserEdit;
