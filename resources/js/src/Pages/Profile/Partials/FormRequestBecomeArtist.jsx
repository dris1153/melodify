import { cn } from "@/helpers/base";
import PrimaryButton from "@/src/Components/admin/primitives/PrimaryButton";
import TextInput from "@/src/Components/admin/primitives/TextInput";
import InputError from "@/src/Components/admin/primitives/InputError";
import InputLabel from "@/src/Components/admin/primitives/InputLabel";
import { Transition } from "@headlessui/react";
import { useForm } from "@inertiajs/react";
import React from "react";

const FormRequestBecomeArtist = ({ user, className = "", statusRequest }) => {
    const [isChecked, setIsChecked] = React.useState(false);
    const { setData, post, errors, processing, recentlySuccessful } = useForm({
        description: "",
    });

    const isRegisting = recentlySuccessful || statusRequest === "pending";

    const submit = (e) => {
        e.preventDefault();
        post(
            route("profile.request-artist", {
                user_id: user?.id,
            })
        );
    };

    return (
        <section className={className}>
            <header>
                <div className="flex items-center gap-[8px]">
                    <input
                        id="want_to_become_artist"
                        type="checkbox"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded disabled:bg-slate-400 disabled:pointer-events-none"
                        checked={isChecked || isRegisting}
                        disabled={isRegisting}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label
                        htmlFor="want_to_become_artist"
                        className={cn(
                            "text-lg font-medium text-gray-900 dark:text-gray-100 select-none",
                            {
                                "pointer-events-none": isRegisting,
                            }
                        )}
                    >
                        Want to become an artist?
                    </label>
                </div>
                {isChecked && (
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Fill out the form below to request to become an artist.
                    </p>
                )}
            </header>
            {isRegisting && (
                <p className="mt-4 text-amber-500 font-[500] text-lg">
                    Your registration form is under review
                </p>
            )}
            {statusRequest === "rejected" && (
                <p className="mt-4 text-red-600 font-[500] text-lg">
                    Your registration form is rejected.
                    <br />
                    Please review the information and try again.
                </p>
            )}
            {isChecked && !isRegisting && (
                <form onSubmit={submit} className="mt-6 space-y-6">
                    <div>
                        <InputLabel
                            htmlFor="description"
                            value="Short description"
                        />

                        <TextInput
                            id="description"
                            className="mt-1 block w-full"
                            component="textarea"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        />

                        <InputError
                            className="mt-2"
                            message={errors?.description}
                        />
                    </div>
                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Register
                        </PrimaryButton>

                        <Transition
                            show={recentlySuccessful}
                            enter="transition ease-in-out"
                            enterFrom="opacity-0"
                            leave="transition ease-in-out"
                            leaveTo="opacity-0"
                        >
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Registed.
                            </p>
                        </Transition>
                    </div>
                </form>
            )}
        </section>
    );
};

export default FormRequestBecomeArtist;
