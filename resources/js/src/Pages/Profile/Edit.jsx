import AdminLayout from "@/src/Layouts/AdminLayout";
import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import FormRequestBecomeArtist from "./Partials/FormRequestBecomeArtist";

export default function Edit({ mustVerifyEmail, status, statusRequest }) {
    const user = usePage().props.auth.user;
    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Profile
                </h2>
            }
        >
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                            className="max-w-xl"
                            user={user}
                        />
                    </div>

                    {user?.role === "user" && (
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                            <FormRequestBecomeArtist
                                className="max-w-xl"
                                user={user}
                                statusRequest={statusRequest}
                            />
                        </div>
                    )}

                    {user?.role === "artist" && (
                        <div className="bg-green-100 p-4 shadow sm:rounded-lg sm:p-8 dark:bg-green-800">
                            <span className="text-green-800 dark:text-green-200 font-semibold">
                                You are an Artist
                            </span>
                        </div>
                    )}

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdatePasswordForm className="max-w-xl" />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <DeleteUserForm className="max-w-xl" />
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
}
