import Modal from "@/src/Components/admin/Modal";
import PrimaryButton from "@/src/Components/admin/primitives/PrimaryButton";
import SecondaryButton from "@/src/Components/admin/primitives/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";
import toast from "react-hot-toast";

export default function FormResetPasswordUser({ user, className = "" }) {
    const [confirmResetPassword, setConfirmingResetPassword] = useState(false);

    const { post, processing, reset, clearErrors } = useForm();

    const confirmUserDeletion = () => {
        setConfirmingResetPassword(true);
    };

    const resetPassword = (e) => {
        e.preventDefault();

        post(
            route("admin.users.reset-password", {
                id: user?.id,
            }),
            {
                preserveScroll: true,
                onSuccess: () => {
                    toast.success("Password reset successfully.");
                    closeModal();
                },
                onFinish: () => reset(),
            }
        );
    };

    const closeModal = () => {
        setConfirmingResetPassword(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Reset password
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    When click on the button below, password of{" "}
                    <b>{user?.name}</b> will be reset to default password
                    (12345678).
                </p>
            </header>

            <PrimaryButton onClick={confirmUserDeletion}>
                Reset password
            </PrimaryButton>

            <Modal show={confirmResetPassword} onClose={closeModal}>
                <form onSubmit={resetPassword} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to reset password of {user?.name}?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        When click on the button below, password of{" "}
                        <b>{user?.name}</b> will be reset to default password
                        (12345678).
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <PrimaryButton className="ms-3" disabled={processing}>
                            Reset Password
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
