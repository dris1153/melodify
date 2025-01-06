import DangerButton from "@/src/Components/admin/primitives/DangerButton";
import Modal from "@/src/Components/Modal";
import SecondaryButton from "@/src/Components/admin/primitives/SecondaryButton";
import AdminLayout from "@/src/Layouts/AdminLayout";
import { Head, Link, router, useForm } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";
import toast from "react-hot-toast";
import PrimaryButton from "@/src/Components/admin/primitives/PrimaryButton";

const Categories = ({ categories }) => {
    const [categorySelected, setCategorySelected] = React.useState(null);

    const { delete: destroy, processing, reset } = useForm({});

    const deleteCategory = (e) => {
        e.preventDefault();
        destroy(
            route("admin.categories.delete", {
                id: categorySelected?.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: () => toast.error("Failed to delete category."),
                onFinish: () => reset(),
            }
        );
        closeModal();
    };

    const closeModal = () => {
        setCategorySelected(null);
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Categories
                    </h2>
                    <PrimaryButton
                        onClick={() => {
                            router.visit(route("admin.categories.create"));
                        }}
                    >
                        Add Category
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Categories" />

            <Modal show={categorySelected} onClose={closeModal}>
                <form onSubmit={deleteCategory} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete {categorySelected?.name}
                        ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once the category is deleted, all of its resources and
                        data will be permanently deleted. Before deleting the
                        category, please download any data or information that
                        you wish to retain.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Category
                        </DangerButton>
                    </div>
                </form>
            </Modal>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th">Id</TableCell>
                                    <TableCell component="th">Name</TableCell>
                                    <TableCell component="th">
                                        Description
                                    </TableCell>
                                    <TableCell component="th">Edit</TableCell>
                                    <TableCell component="th">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categories.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{
                                            "&:last-child td, &:last-child th":
                                                { border: 0 },
                                        }}
                                    >
                                        <TableCell>{row?.id}</TableCell>
                                        <TableCell>{row?.name}</TableCell>
                                        <TableCell>
                                            {row?.description}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                className="text-blue-600 dark:text-blue-400"
                                                href={route(
                                                    "admin.categories.edit",
                                                    { id: row.id }
                                                )}
                                            >
                                                Edit
                                            </Link>
                                        </TableCell>
                                        <TableCell>
                                            <button
                                                className="text-red-600 dark:text-red-400"
                                                onClick={() => {
                                                    setCategorySelected(row);
                                                }}
                                            >
                                                Delete
                                            </button>
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

export default Categories;
