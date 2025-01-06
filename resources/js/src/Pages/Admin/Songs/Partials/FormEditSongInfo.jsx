import InputError from "@/src/Components/InputError";
import InputLabel from "@/src/Components/InputLabel";
import PrimaryButton from "@/src/Components/admin/primitives/PrimaryButton";
import SelectInput from "@/src/Components/admin/primitives/SelectInput";
import TextInput from "@/src/Components/admin/primitives/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { ImageOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function FormEditSongInfo({
    song,
    genres,
    artists,
    className = "",
}) {
    const [imagePreview, setImagePreview] = useState(song?.image);
    const [audioPreview, setAudioPreview] = useState(song?.audio);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route("admin.songs.create-handle"));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                alert("Please select an image file");
                return;
            }

            const maxSize = 2 * 1024 * 1024; // 2MB
            if (file.size > maxSize) {
                alert("File size should be less than 2MB");
                return;
            }

            setData("image", file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleAudioChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (!file.type.startsWith("audio/")) {
                alert("Please select an audio file");
                return;
            }

            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                alert("File size should be less than 10MB");
                return;
            }

            setData("audio", file);
            setAudioPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith("blob:")) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    useEffect(() => {
        if (song?.image) {
            setImagePreview(song?.image);
        }
    }, [song]);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Song Information
                </h2>

                {/* <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update profile information {user?.name}
                </p> */}
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="image" value="Image" />

                    <div className="mt-1">
                        {/* no images */}

                        {imagePreview && (
                            <div className="flex items-center w-[120px] h-[120px] rounded-[8px] overflow-hidden group relative cursor-pointer">
                                <label
                                    htmlFor="image"
                                    className="cursor-pointer absolute z-10 inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <ImageOutlined className="text-white" />
                                </label>
                                <img
                                    src={imagePreview}
                                    alt="Current avatar"
                                    className="w-full h-full object-cover object-center"
                                    onError={(e) => {
                                        console.log(e);
                                    }}
                                />
                            </div>
                        )}

                        <input
                            className={imagePreview ? "hidden" : ""}
                            type="file"
                            accept="image/*"
                            id="image"
                            name="image"
                            onChange={handleImageChange}
                        />
                    </div>

                    <InputError className="mt-2" message={errors.image} />
                </div>

                <div>
                    <InputLabel htmlFor="title" value="Title" />

                    <TextInput
                        id="title"
                        className="mt-1 block w-full"
                        value={data.title}
                        onChange={(e) => setData("title", e.target.value)}
                        required
                        isFocused
                        autoComplete="title"
                    />

                    <InputError className="mt-2" message={errors.title} />
                </div>

                <div>
                    <InputLabel htmlFor="artists" value="Artists" />

                    <SelectInput
                        isMulti
                        isSearchable
                        options={
                            artists
                                ? artists.map((artist) => ({
                                      value: artist?.id,
                                      label: artist?.name,
                                  }))
                                : []
                        }
                        onChange={(selected) => {
                            setData(
                                "artists",
                                selected.map((s) => s.value)
                            );
                        }}
                        value={data.artists}
                    />

                    <InputError className="mt-2" message={errors.title} />
                </div>

                <div>
                    <InputLabel htmlFor="genres" value="Genres" />

                    <SelectInput
                        isMulti
                        isSearchable
                        options={
                            genres
                                ? genres.map((genre) => ({
                                      value: genre?.id,
                                      label: genre?.name,
                                  }))
                                : []
                        }
                        onChange={(selected) => {
                            setData(
                                "genres",
                                selected.map((s) => s.value)
                            );
                        }}
                        value={data.genres}
                    />

                    <InputError className="mt-2" message={errors.genres} />
                </div>

                <div>
                    <InputLabel htmlFor="audio" value="Audio" />

                    <div className="mt-1">
                        <input
                            // className={audioPreview ? "hidden" : ""}
                            type="file"
                            accept="audio/*"
                            id="audio"
                            name="audio"
                            onChange={handleAudioChange}
                        />
                        {audioPreview && (
                            <div className="flex items-center w-full rounded-[8px] overflow-hidden group relative cursor-pointer mt-2">
                                {/* <label
                                    htmlFor="audio"
                                    className="cursor-pointer absolute z-10 inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <ImageOutlined className="text-white" />
                                </label> */}
                                <audio
                                    src={audioPreview}
                                    controls
                                    className="w-full"
                                />
                            </div>
                        )}
                    </div>

                    <InputError className="mt-2" message={errors.image} />
                </div>

                {/* 
                <div>
                    <InputLabel htmlFor="role" value="Role" />

                    <SelectInput
                        options={[
                            { value: "artist", label: "Artist" },
                            { value: "user", label: "User" },
                        ]}
                        onChange={(e) => setData("role", e.target.value)}
                        value={data.role}
                    />

                    <InputError className="mt-2" message={errors.role} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                        required
                        autoComplete="username"
                    />

                    <InputError className="mt-2" message={errors.email} />
                </div>

                <div>
                    <InputLabel htmlFor="gender" value="Gender" />

                    <SelectInput
                        options={[
                            { value: "", label: "Select Gender" },
                            { value: "male", label: "Male" },
                            { value: "female", label: "Female" },
                            { value: "other", label: "Other" },
                        ]}
                        onChange={(e) => setData("gender", e.target.value)}
                        value={data.gender}
                    />

                    <InputError className="mt-2" message={errors.gender} />
                </div>

                <div>
                    <InputLabel htmlFor="birth_date" value="Birthday" />
                    <TextInput
                        id="birth_date"
                        type="date"
                        className="mt-1 block w-full"
                        value={
                            data.birth_date
                                ? new Date(data.birth_date)
                                      .toISOString()
                                      .split("T")[0]
                                : ""
                        }
                        onChange={(e) => setData("birth_date", e.target.value)}
                        required
                    />
                    <InputError className="mt-2" message={errors.birth_date} />
                </div> */}

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>Save</PrimaryButton>

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
    );
}
