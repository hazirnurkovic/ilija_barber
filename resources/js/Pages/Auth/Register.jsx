import { useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ auth }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        first_name: '',
        last_name: '',
        username: '',
        telephone: '',
        percentage: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    useEffect(() => {
        return () => {
            reset('password', 'password_confirmation');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();

        post(route('create_barber.store'));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Barberi</h2>}
        >
            <Head title="Barberi" />

            <form onSubmit={submit} className="max-w-md mx-auto ">
                <div className="mb-4 mt-6">
                    <InputLabel htmlFor="first_name" value="Ime" />
                        <TextInput
                            id="first_name"
                            name="first_name"
                            value={data.first_name}
                            className="mt-1 block w-full"
                            autoComplete="first_name"
                            isFocused={true}
                            onChange={(e) => setData('first_name', e.target.value)}
                            required
                        />
                    <InputError message={errors.first_name} className="mt-2 text-red-500" />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="last_name" value="Prezime" />
                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            autoComplete="last_name"
                            isFocused={true}
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                    <InputError message={errors.last_name} className="mt-2 text-red-500" />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="username" value="Korisničko ime" />
                        <TextInput
                            id="username"
                            name="username"
                            value={data.username}
                            className="mt-1 block w-full"
                            autoComplete="username"
                            isFocused={true}
                            onChange={(e) => setData('username', e.target.value)}
                            required
                        />
                    <InputError message={errors.username} className="mt-2 text-red-500" />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            name="email"
                            value={data.email}
                            className="mt-1 block w-full"
                            autoComplete="email"
                            isFocused={true}
                            onChange={(e) => setData('email', e.target.value)}
                            required
                        />
                    <InputError message={errors.email} className="mt-2 text-red-500" />
                </div> <div className="mb-4">
                    <InputLabel htmlFor="percentage" value="Procenat zarade" />
                        <TextInput
                            id="percentage"
                            name="percentage"
                            value={data.percentage}
                            className="mt-1 block w-full"
                            autoComplete="percentage"
                            isFocused={true}
                            onChange={(e) => setData('percentage', e.target.value)}
                            required
                        />
                    <InputError message={errors.percentage} className="mt-2 text-red-500" />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="telephone" value="Telefon" />
                        <TextInput
                            id="telephone"
                            name="telephone"
                            value={data.telephone}
                            className="mt-1 block w-full"
                            autoComplete="telephone"
                            isFocused={true}
                            onChange={(e) => setData('telephone', e.target.value)}
                            required
                        />
                    <InputError message={errors.telephone} className="mt-2 text-red-500" />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="password" value="Lozinka" />
                        <TextInput
                            id="password"
                            name="password"
                            value={data.password}
                            className="mt-1 block w-full"
                            autoComplete="password"
                            isFocused={true}
                            onChange={(e) => setData('password', e.target.value)}
                            required
                        />
                    <InputError message={errors.password} className="mt-2 text-red-500" />
                </div>

                <div className="mb-4">
                    <InputLabel htmlFor="password_confirmation" value="Potvrdi lozinku" />
                        <TextInput
                            id="password_confirmation"
                            name="password_confirmation"
                            value={data.password_confirmation}
                            className="mt-1 block w-full"
                            autoComplete="password_confirmation"
                            isFocused={true}
                            onChange={(e) => setData('password_confirmation', e.target.value)}
                            required
                        />
                    <InputError message={errors.password_confirmation} className="mt-2 text-red-500" />
                </div>

                <div className="flex items-center justify-end mt-6">
                    <PrimaryButton className="w-full" disabled={processing}>
                        Kreiraj barbera
                    </PrimaryButton>
                </div>
            </form>
        </AuthenticatedLayout>
    );
}
