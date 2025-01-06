import DangerButton from "@/src/Components/admin/primitives/DangerButton";
import Modal from "@/src/Components/admin/Modal";
import SecondaryButton from "@/src/Components/admin/primitives/SecondaryButton";
import AdminLayout from "@/src/Layouts/AdminLayout";
import { Head, Link, router, useForm, usePage } from "@inertiajs/react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
} from "@mui/material";
import React from "react";
import PrimaryButton from "@/src/Components/admin/primitives/PrimaryButton";

const Musics = ({ songs }) => {
    const user = usePage().props.auth.user;
    const [songSelected, setSongSelected] = React.useState(null);

    const { delete: destroy, processing, reset } = useForm({});

    const deleteSong = (e) => {
        e.preventDefault();
        destroy(
            route(
                user?.role === "admin"
                    ? "admin.songs.delete"
                    : "artist.songs.delete",
                {
                    id: songSelected?.id,
                }
            ),
            {
                preserveScroll: true,
                onSuccess: () => closeModal(),
                onError: () => toast.error("Failed to delete song"),
                onFinish: () => reset(),
            }
        );
        closeModal();
    };

    const closeModal = () => {
        setSongSelected(null);
    };

    return (
        <AdminLayout
            header={
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                        Songs
                    </h2>
                    <PrimaryButton
                        onClick={() => {
                            router.visit(
                                route(
                                    user?.role === "admin"
                                        ? "admin.songs.create"
                                        : "artist.songs.create"
                                )
                            );
                        }}
                    >
                        Add Song
                    </PrimaryButton>
                </div>
            }
        >
            <Head title="Musics" />

            <Modal show={songSelected} onClose={closeModal}>
                <form onSubmit={deleteSong} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        Are you sure you want to delete {songSelected?.title}?
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

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg dark:bg-gray-800">
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell component="th">Id</TableCell>
                                    <TableCell component="th">Title</TableCell>
                                    <TableCell component="th">
                                        Artists
                                    </TableCell>
                                    <TableCell component="th">Genres</TableCell>
                                    <TableCell component="th">
                                        Duration
                                    </TableCell>
                                    <TableCell component="th">Edit</TableCell>
                                    <TableCell component="th">Delete</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {songs.map((row) => (
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
                                                {row?.image && (
                                                    <img
                                                        src={row?.image}
                                                        className="w-[36px] h-[36px] overflow-hidden rounded-full object-cover object-center"
                                                    />
                                                )}
                                                <span className="font-[500]">
                                                    {row?.title}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {row?.artists
                                                ?.map?.(
                                                    (artist) => artist?.name
                                                )
                                                ?.join(", ")}
                                        </TableCell>
                                        <TableCell>
                                            {row?.genres
                                                ?.map?.((genre) => genre?.name)
                                                ?.join(", ")}
                                        </TableCell>
                                        <TableCell>
                                            {Math.floor(row?.duration / 60)
                                                ?.toString()
                                                ?.padStart(2, "0")}
                                            :
                                            {(row?.duration % 60)
                                                ?.toString()
                                                ?.padStart(2, "0")}
                                        </TableCell>
                                        <TableCell>
                                            <Link
                                                className="text-blue-600 dark:text-blue-400"
                                                href={route(
                                                    user?.role === "admin"
                                                        ? "admin.songs.edit"
                                                        : "artist.songs.edit",
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
                                                    setSongSelected(row);
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

export default Musics;
