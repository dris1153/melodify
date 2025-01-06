import InputError from "@/src/Components/admin/primitives/InputError";
import InputLabel from "@/src/Components/admin/primitives/InputLabel";
import PrimaryButton from "@/src/Components/admin/primitives/PrimaryButton";
import SelectInput from "@/src/Components/admin/primitives/SelectInput";
import TextInput from "@/src/Components/admin/primitives/TextInput";
import { Transition } from "@headlessui/react";
import { useForm, usePage } from "@inertiajs/react";
import { ImageOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UpdateProfileInformation({ className = "", user }) {
    const [avatarPreview, setAvatarPreview] = useState(
        user.avatar || "/images/default-avatar.jpg"
    );

    const [countries, setCountries] = useState([]);
    const [isCountriesLoading, setIsCountriesLoading] = useState(true);

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

    const { data, setData, post, errors, processing, recentlySuccessful } =
        useForm({
            name: user?.name,
            email: user?.email,
            gender: user?.gender,
            nationality: user?.nationality,
            birth_date: user?.birth_date,
        });

    const submit = (e) => {
        e.preventDefault();
        post(route("profile.update"));
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
        return () => {
            if (avatarPreview && avatarPreview.startsWith("blob:")) {
                URL.revokeObjectURL(avatarPreview);
            }
        };
    }, [avatarPreview]);

    useEffect(() => {
        if (user?.avatar) {
            setAvatarPreview(user.avatar);
        }
    }, [user]);

    console.log({ data });

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information.
                </p>
            </header>

            <form
                onSubmit={submit}
                className="mt-6 space-y-6"
                encType="multipart/form-data"
            >
                <div>
                    <InputLabel htmlFor="avatar" value="Avatar" />

                    <div className="mt-1">
                        <div className="flex items-center w-[120px] h-[120px] rounded-[8px] overflow-hidden group relative cursor-pointer">
                            <label
                                htmlFor="avatar"
                                className="cursor-pointer absolute z-10 inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                                <ImageOutlined className="text-white" />
                            </label>
                            <img
                                src={avatarPreview}
                                alt="Profile avatar"
                                className="w-full h-full object-cover object-center"
                            />
                        </div>

                        <input
                            className="hidden"
                            type="file"
                            accept="image/*"
                            id="avatar"
                            name="avatar"
                            onChange={handleFileChange}
                        />
                    </div>

                    <InputError className="mt-2" message={errors.avatar} />
                </div>

                {/* Rest of the form remains the same */}
                <div>
                    <InputLabel htmlFor="name" value="Name" />
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
                        onChange={(e) => setData("gender", e?.value)}
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
