import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, useForm } from "@inertiajs/react";
import { useEffect } from "react";

const EditBarber = ({auth, user}) =>
{

    const { data: barber, setData: setBarber, put, processing, errors, reset } = useForm({
        first_name: user?.first_name,
        last_name: user?.last_name,
        username: user?.username,
        telephone: user?.telephone,
        email: user?.email,
        percentage : user?.percentage,
        bank_amount : user?.bank_amount,

    });

    useEffect(() => {
        setBarber({
          first_name: user?.first_name || "",
          last_name: user?.last_name || "",
          username: user?.username || "",
          telephone: user?.telephone || "",
          email: user?.email || "",
          percentage: user?.percentage || "",
          bank_amount: user?.bank_amount || "",
        });
      }, [user]);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        put(route('create_barber.update', {create_barber: user.id}));
    };

    return (
        <Authenticated
            user={auth.user}
        >
            <Head title="Ažuriraj podatke barbera" />
            <form onSubmit={handleFormSubmit} className="max-w-md mx-auto ">
                <div className="mb-4 mt-6">
                    <InputLabel htmlFor="first_name" value="Ime"/>
                    <TextInput
                        id="first_name"
                        name="first_name"
                        value={barber.first_name}
                        className="mt-1 block w-full"
                        autoComplete="first_name"
                        isFocused={true}
                        onChange={(e) => setBarber('first_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.first_name} className="mt-2 text-red-500"/>
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="last_name" value="Prezime"/>
                    <TextInput
                        id="last_name"
                        name="last_name"
                        value={barber.last_name}
                        className="mt-1 block w-full"
                        autoComplete="last_name"
                        isFocused={true}
                        onChange={(e) => setBarber('last_name', e.target.value)}
                        required
                    />
                    <InputError message={errors.last_name} className="mt-2 text-red-500"/>
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="username" value="Korisničko ime"/>
                    <TextInput
                        id="username"
                        name="username"
                        value={barber.username}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setBarber('username', e.target.value)}
                        required
                    />
                    <InputError message={errors.username} className="mt-2 text-red-500"/>
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="email" value="Email"/>
                    <TextInput
                        id="email"
                        name="email"
                        value={barber.email}
                        className="mt-1 block w-full"
                        autoComplete="email"
                        isFocused={true}
                        onChange={(e) => setBarber('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2 text-red-500"/>
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="telephone" value="Telefon"/>
                    <TextInput
                        id="telephone"
                        name="telephone"
                        value={barber.telephone}
                        className="mt-1 block w-full"
                        autoComplete="telephone"
                        isFocused={true}
                        onChange={(e) => setBarber('telephone', e.target.value)}
                        required
                    />
                    <InputError message={errors.telephone} className="mt-2 text-red-500"/>
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="percentage" value="Procenat zarade"/>
                    <TextInput
                        id="percentage"
                        name="percentage"
                        value={barber.percentage}
                        className="mt-1 block w-full"
                        autoComplete="percentage"
                        isFocused={true}
                        onChange={(e) => setBarber('percentage', e.target.value)}
                        required
                    />
                    <InputError message={errors.percentage} className="mt-2 text-red-500"/>
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="bank_amount" value="Iznos banka"/>
                    <TextInput
                        id="bank_amount"
                        name="bank_amount"
                        value={barber.bank_amount}
                        className="mt-1 block w-full"
                        autoComplete="bank_amount"
                        isFocused={true}
                        onChange={(e) => setBarber('bank_amount', e.target.value)}
                        required
                    />
                    <InputError message={errors.bank_amount} className="mt-2 text-red-500"/>
                </div>


                <div className="flex items-center justify-end mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Ažuriraj barbera
                    </PrimaryButton>
                </div>

            </form>
        </Authenticated>
    );
}

export default EditBarber;
