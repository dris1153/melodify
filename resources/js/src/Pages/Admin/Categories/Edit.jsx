import DangerButton from "@/src/Components/admin/primitives/DangerButton";
import PrimaryButton from "@/src/Components/admin/primitives/PrimaryButton";
import SecondaryButton from "@/src/Components/admin/primitives/SecondaryButton";
import TextInput from "@/src/Components/admin/primitives/TextInput";
import InputError from "@/src/Components/admin/primitives/InputError";
import InputLabel from "@/src/Components/admin/primitives/InputLabel";
import Modal from "@/src/Components/admin/Modal";
import AdminLayout from "@/src/Layouts/AdminLayout";
import { Transition } from "@headlessui/react";
import { Head, useForm } from "@inertiajs/react";
import React, { useState } from "react";

const CategoryEdit = ({ category }) => {
    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: category?.name,
            description: category?.description,
        });

    const [confirmingCategoryDeletion, setConfirmingCategoryDeletion] =
        useState(false);
    const {
        delete: destroy,
        processing: processingDelete,
        clearErrors,
    } = useForm();

    const submit = (e) => {
        e.preventDefault();
        if (category?.id) {
            post(
                route("admin.categories.update", {
                    id: category?.id,
                }),
                {
                    preserveScroll: true,
                }
            );
        } else {
            post(route("admin.categories.create-handle"), {
                preserveScroll: true,
            });
        }
    };

    const confirmCategoryDeletion = () => {
        setConfirmingCategoryDeletion(true);
    };

    const deleteCategory = (e) => {
        e.preventDefault();

        destroy(
            route("admin.categories.delete", {
                id: category?.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
            }
        );
    };

    const closeModal = () => {
        setConfirmingCategoryDeletion(false);
        clearErrors();
    };

    return (
        <AdminLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    {category ? category?.name : "Create Category"}
                </h2>
            }
        >
            <Head title="Dashboard" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8 space-y-6">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <section className="max-w-xl">
                            <header>
                                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                    Category Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                    {/* Update profile information {user?.name} */}
                                </p>
                            </header>

                            <form onSubmit={submit} className="mt-6 space-y-6">
                                <div>
                                    <InputLabel htmlFor="name" value="Name" />
                                    <TextInput
                                        id="name"
                                        className="mt-1 block w-full"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData("name", e.target.value)
                                        }
                                        required
                                        isFocused
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.name}
                                    />
                                </div>

                                <div>
                                    <InputLabel
                                        htmlFor="description"
                                        value="Description"
                                    />
                                    <TextInput
                                        id="description"
                                        className="mt-1 block w-full"
                                        value={data.description}
                                        onChange={(e) =>
                                            setData(
                                                "description",
                                                e.target.value
                                            )
                                        }
                                        component="textarea"
                                        required
                                    />
                                    <InputError
                                        className="mt-2"
                                        message={errors.description}
                                    />
                                </div>

                                <div className="flex items-center gap-4">
                                    <SecondaryButton
                                        disabled={processing}
                                        onClick={() => window.history.back()}
                                    >
                                        Back
                                    </SecondaryButton>
                                    <PrimaryButton disabled={processing}>
                                        Save
                                    </PrimaryButton>
                                    <Transition
                                        show={recentlySuccessful}
                                        enter="transition ease-in-out"
                                        enterFrom="opacity-0"
                                        leave="transition ease-in-out"
                                        leaveTo="opacity-0"
                                    >
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Saved.
                                        </p>
                                    </Transition>
                                </div>
                            </form>
                        </section>
                    </div>
                    {category && (
                        <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                            <section className="space-y-6">
                                <header>
                                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                        Delete Category
                                    </h2>

                                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                        Once your category is deleted, all of
                                        its resources and data will be
                                        permanently deleted. Before deleting
                                        your category, please download any data
                                        or information that you wish to retain.
                                    </p>
                                </header>

                                <DangerButton onClick={confirmCategoryDeletion}>
                                    Delete Category
                                </DangerButton>

                                <Modal
                                    show={confirmingCategoryDeletion}
                                    onClose={closeModal}
                                >
                                    <form
                                        onSubmit={deleteCategory}
                                        className="p-6"
                                    >
                                        <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                                            Are you sure you want to delete{" "}
                                            {category?.name}?
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                                            Once the category is deleted, all of
                                            its resources and data will be
                                            permanently deleted. Before deleting
                                            the category, please download any
                                            data or information that you wish to
                                            retain.
                                        </p>

                                        <div className="mt-6 flex justify-end">
                                            <SecondaryButton
                                                onClick={closeModal}
                                            >
                                                Cancel
                                            </SecondaryButton>

                                            <DangerButton
                                                className="ms-3"
                                                disabled={processingDelete}
                                            >
                                                Delete Category
                                            </DangerButton>
                                        </div>
                                    </form>
                                </Modal>
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </AdminLayout>
    );
};

export default CategoryEdit;
