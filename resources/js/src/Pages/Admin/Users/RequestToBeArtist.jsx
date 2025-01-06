import DangerButton from "@/src/Components/admin/primitives/DangerButton";
import PrimaryButton from "@/src/Components/admin/primitives/PrimaryButton";
import AdminLayout from "@/src/Layouts/AdminLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";

const RequestToBeArtist = ({ requests }) => {
    const { post } = useForm({});

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Request To Be Artist
                    </h2>
                </div>
            }
        >
            <Head title="Request To Be Artist" />

            {/* <Modal show={userSelected} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete {userSelected?.name}?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once the account is deleted, all of its resources and
                        data will be permanently deleted. Before deleting the
                        account, please download any data or information that
                        you wish to retain.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Account
                        </DangerButton>
                    </div>
                </form>
            </Modal> */}

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th">Id</TableCell>
                                    <TableCell component="th">Name</TableCell>
                                    <TableCell
                                        component="th"
                                        className="w-[50%]"
                                    >
                                        Description
                                    </TableCell>
                                    <TableCell component="th">Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {requests.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell>{row?.id}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-[8px]">
                                                {row?.user?.avatar && (
                                                    <img
                                                        src={row?.user?.avatar}
                                                        className="w-[36px] h-[36px] overflow-hidden rounded-full object-cover object-center"
                                                    />
                                                )}
                                                <Link
                                                    className="font-[500] hover:text-blue-600"
                                                    href={route(
                                                        "admin.users.edit",
                                                        {
                                                            id: row?.user?.id,
                                                        }
                                                    )}
                                                    as="a"
                                                >
                                                    {row?.user?.name}
                                                </Link>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {row?.description}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-[12px]">
                                                <PrimaryButton
                                                    className=" bg-green-600 hover:bg-green-700 active:bg-green-800 focus:bg-green-800 !ring-green-600"
                                                    onClick={() => {
                                                        post(
                                                            route(
                                                                "admin.users.request-to-be-artist-handle",
                                                                {
                                                                    id: row.id,
                                                                    state: "approved",
                                                                }
                                                            )
                                                        );
                                                    }}
                                                >
                                                    Approve
                                                </PrimaryButton>
                                                <DangerButton
                                                    onClick={() => {
                                                        post(
                                                            route(
                                                                "admin.users.request-to-be-artist-handle",
                                                                {
                                                                    id: row.id,
                                                                    state: "rejected",
                                                                }
                                                            )
                                                        );
                                                    }}
                                                >
                                                    Rejected
                                                </DangerButton>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>
        </AdminLayout>
    );
};

export default RequestToBeArtist;
