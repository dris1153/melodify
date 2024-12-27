import InputError from "@/src/Components/InputError";
import InputLabel from "@/src/Components/InputLabel";
import PrimaryButton from "@/src/Components/PrimaryButton";
import TextInput from "@/src/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";
import { ImageOutlined } from "@mui/icons-material";
import { useEffect, useState } from "react";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const user = usePage().props.auth.user;
    const [avatar, setAvatar] = useState(user.avatar);

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: user.name,
            email: user.email,
        });

    const submit = (e) => {
        e.preventDefault();
        patch(route("profile.update"));
    };

    useEffect(() => {
        if (user?.avatar !== avatar) {
            setAvatar(user.avatar);
        } else {
            if (user?.avatar) {
                setAvatar(user.avatar);
            } else {
                setAvatar("/images/default-avatar.jpg");
            }
        }
    }, [user]);

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Profile Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your account's profile information and email address.
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="avatar" value="Avatar" />

                    <div className="mt-1">
                        {/* no images */}

                        <div className="flex items-center w-[120px] h-[120px] rounded-[8px] overflow-hidden group relative cursor-pointer">
                            <label
                                htmlFor="profile-avatar"
                                className="cursor-pointer absolute z-10 inset-0 flex items-center justify-center w-full h-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                            >
                                <ImageOutlined className="text-white" />
                            </label>
                            <img
                                src={avatar}
                                alt="Current avatar"
                                className="w-full h-full object-cover object-center"
                                onError={(e) => {
                                    console.log(e);
                                }}
                            />
                        </div>

                        <input
                            className="hidden"
                            type="file"
                            accept="image/*,video/*"
                            id="profile-avatar"
                            name="profile-avatar"
                            onChange={(e) => {
                                if (e.target.files.length) {
                                    const file = e.target.files[0];
                                    setAvatar(URL.createObjectURL(file));
                                }
                            }}
                        />
                    </div>

                    <InputError className="mt-2" message={errors.name} />
                </div>

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

                {mustVerifyEmail && user.email_verified_at === null && (
                    <div>
                        <p className="mt-2 text-sm text-gray-800 dark:text-gray-200">
                            Your email address is unverified.
                            <Link
                                href={route("verification.send")}
                                method="post"
                                as="button"
                                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 dark:text-gray-400 dark:hover:text-gray-100 dark:focus:ring-offset-gray-800"
                            >
                                Click here to re-send the verification email.
                            </Link>
                        </p>

                        {status === "verification-link-sent" && (
                            <div className="mt-2 text-sm font-medium text-green-600 dark:text-green-400">
                                A new verification link has been sent to your
                                email address.
                            </div>
                        )}
                    </div>
                )}

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
