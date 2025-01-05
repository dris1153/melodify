import PrimaryButton from "@/src/Components/admin/primitives/PrimaryButton";
import TextInput from "@/src/Components/admin/primitives/TextInput";
import InputError from "@/src/Components/InputError";
import InputLabel from "@/src/Components/InputLabel";
import { Transition } from "@headlessui/react";
import React from "react";

const FormRequestBecomeArtist = ({ className = "" }) => {
    const [isChecked, setIsChecked] = React.useState(false);
    return (
        <section className={className}>
            <header>
                <div className="flex items-center gap-[8px]">
                    <input
                        id="want_to_become_artist"
                        type="checkbox"
                        className="h-5 w-5 text-indigo-600 border-gray-300 rounded"
                        checked={isChecked}
                        onChange={(e) => setIsChecked(e.target.checked)}
                    />
                    <label
                        htmlFor="want_to_become_artist"
                        className="text-lg font-medium text-gray-900 dark:text-gray-100 select-none"
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
            {isChecked && (
                <form className="mt-6 space-y-6">
                    <div>
                        <InputLabel
                            htmlFor="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            className="mt-1 block w-full"
                            autoComplete="new-password"
                        />

                        <InputError className="mt-2" />
                    </div>
                </form>
            )}
        </section>
    );
};

export default FormRequestBecomeArtist;
