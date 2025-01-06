import InputError from "@/src/Components/admin/primitives/InputError";
import InputLabel from "@/src/Components/admin/primitives/InputLabel";
import PrimaryButton from "@/src/Components/admin/primitives/PrimaryButton";
import SelectInput from "@/src/Components/admin/primitives/SelectInput";
import TextInput from "@/src/Components/admin/primitives/TextInput";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import { ImageOutlined } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import Select from "react-select";

export default function FormEditUserInfo({ user, className = "" }) {
    const [avatarPreview, setAvatarPreview] = useState(user?.avatar);
    const [countries, setCountries] = useState([]);
    const [isCountriesLoading, setIsCountriesLoading] = useState(true);

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user?.name,
            email: user?.email,
            role: user?.role,
            gender: user?.gender,
            nationality: user?.nationality,
            birth_date: user?.birth_date,
        });

    const submit = (e) => {
        e.preventDefault();
        if (user?.id) {
            post(
                route("admin.users.update", {
                    id: user?.id,
                })
            );
        } else {
            post(route("admin.users.create-handle"));
        }
    };

    const handleFileChange = (e) => {
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

            setData("avatar", file);
            setAvatarPreview(URL.createObjectURL(file));
        }
    };

    useEffect(() => {
        axios
            .get("https://restcountries.com/v3.1/all")
            .then((response) => {
                const countryOptions = response.data.map((country) => ({
                    value: country.cca2.toLowerCase(),
                    label: country.name.common,
                }));
                setCountries(
                    countryOptions.sort((a, b) =>
                        a.label.localeCompare(b.label)
                    )
                );
            })
            .catch((error) => {
                console.error("Error fetching countries:", error);
            })
            .finally(() => {
                setIsCountriesLoading(false);
            });
    }, []);

    useEffect(() => {
        return () => {
            if (avatarPreview && avatarPreview.startsWith("blob:")) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    useEffect(() => {
        if (user?.avatar) {
            setAvatarPreview(user?.avatar);
        }
    }, [user]);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    User Information
                </h2>

                {user && (
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Update information {user?.name}
                    </p>
                )}
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="avatar" value="Avatar" />

                    <div className="mt-1">
                        {/* no images */}

                        {avatarPreview && (
                            <div className="flex items-center w-[120px] h-[120px] rounded-[8px] overflow-hidden group relative cursor-pointer">
                                <label
                                    htmlFor="avatar"
                                    className="cursor-pointer absolute z-10 inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                >
                                    <ImageOutlined className="text-white" />
                                </label>
                                <img
                                    src={avatarPreview}
                                    alt="Current avatar"
                                    className="w-full h-full object-cover object-center"
                                    onError={(e) => {
                                        console.log(e);
                                    }}
                                />
                            </div>
                        )}

                        <input
                            className={avatarPreview ? "hidden" : ""}
                            type="file"
                            accept="image/*"
                            id="avatar"
                            name="avatar"
                            onChange={handleFileChange}
                        />
                    </div>

                    <InputError className="mt-2" message={errors?.avatar} />
                </div>

                <div>
                    <InputLabel htmlFor="name" value="Name" required />

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                        required
                        isFocused
                        autoComplete="name"
                    />

                    <InputError className="mt-2" message={errors.name} />
                </div>

                <div>
                    <InputLabel htmlFor="role" value="Role" required />

                    <SelectInput
                        options={[
                            { value: "", label: "Select Role" },
                            { value: "user", label: "User" },
                            { value: "artist", label: "Artist" },
                        ]}
                        onChange={(e) => setData("role", e?.value)}
                        value={data.role}
                    />

                    <InputError className="mt-2" message={errors.role} />
                </div>

                <div>
                    <InputLabel htmlFor="email" value="Email" required />

                    <TextInput
                        id="email"
                        type="email"
                        className="mt-1 block w-full"
                        value={data.email}
                        onChange={(e) => setData("email", e?.target?.value)}
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
                        onChange={(e) => {
                            console.log(e);
                            setData("gender", e?.value);
                        }}
                        name="gender"
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
                    />
                    <InputError className="mt-2" message={errors.birth_date} />
                </div>

                <div>
                    <div className="flex items-center gap-[8px]">
                        <InputLabel htmlFor="nationality" value="Nationality" />
                        {data?.nationality && (
                            <img
                                className="h-[18px]"
                                src={`https://flagcdn.com/32x24/${data?.nationality}.png`}
                            />
                        )}
                    </div>
                    {isCountriesLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <SelectInput
                            options={[
                                { value: "", label: "Select Nationality" },
                                ...countries,
                            ]}
                            onChange={(e) => setData("nationality", e?.value)}
                            value={data.nationality}
                        />
                    )}
                    <InputError className="mt-2" message={errors.nationality} />
                </div>

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
