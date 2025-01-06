import DangerButton from "@/src/Components/admin/primitives/DangerButton";
import Modal from "@/src/Components/admin/Modal";
import SecondaryButton from "@/src/Components/admin/primitives/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function FormDeleteUser({ user, className = "" }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);

    const { delete: destroy, processing, reset, clearErrors } = useForm();

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(
            route("admin.users.delete", {
                id: user?.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onFinish: () => reset(),
            }
        );
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Account
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your account is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your account,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>
                Delete Account
            </DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete {user?.name}?
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
            </Modal>
        </section>
    );
}
