import DangerButton from "@/src/Components/admin/primitives/DangerButton";
import Modal from "@/src/Components/admin/Modal";
import SecondaryButton from "@/src/Components/admin/primitives/SecondaryButton";
import { useForm } from "@inertiajs/react";
import { useState } from "react";

export default function FormDeleteSong({ song, className = "", user }) {
    const [confirmingSongDeletion, setConfirmingSongDeletion] = useState(false);

    const { delete: destroy, processing, reset, clearErrors } = useForm();

    const confirmSongDeletion = () => {
        setConfirmingSongDeletion(true);
    };

    const deleteSong = (e) => {
        e.preventDefault();

        destroy(
            route(
                user?.role === "admin"
                    ? "admin.songs.delete"
                    : "artist.songs.delete",
                {
                    id: song?.id,
                }
            ),
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onFinish: () => reset(),
            }
        );
    };

    const closeModal = () => {
        setConfirmingSongDeletion(false);
        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Delete Song
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Once your song is deleted, all of its resources and data
                    will be permanently deleted. Before deleting your song,
                    please download any data or information that you wish to
                    retain.
                </p>
            </header>

            <DangerButton onClick={confirmSongDeletion}>
                Delete Song
            </DangerButton>

            <Modal show={confirmingSongDeletion} onClose={closeModal}>
                <form onSubmit={deleteSong} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete {song?.title}?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Once the song is deleted, all of its resources and data
                        will be permanently deleted. Before deleting the song,
                        please download any data or information that you wish to
                        retain.
                    </p>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Cancel
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Delete Song
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
