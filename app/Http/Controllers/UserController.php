<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditUserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return Inertia::render('Barbers', [
            'users' => $users,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'first_name' => 'required|string|max:255',
            'last_name'  => 'required|string|max:255',
            'username'   => 'required|string|max:255',
            'telephone'  => 'required|string',
            'email' => 'required|string|email|max:255|unique:' . User::class,
            'password' => ['required', 'confirmed', Password::default()],
        ]);

        try {
            $user = User::create([
                'first_name' => $request->first_name,
                'last_name' => $request->last_name,
                'username' => $request->username,
                'telephone' => $request->telephone,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return redirect('/create_barber');
        } catch (Exception $e) {
            return response()->json(['message' => 'Greska pri kreiranju korisnika: ' . $e], 400);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return $user;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $create_barber)
    {
        return Inertia::render('EditBarber', [
            'user' => $create_barber
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditUserRequest $request, User $create_barber)
    {
        $validated = $request->validated();
        $create_barber->update($validated);

        return redirect('/create_barber')->with('status', 'Podaci barbera su uspješno ažurirani!');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        return response()->json(['message' => $user]);
    }

    public function delete_barber(Request $request)
    {
        return User::where('id', $request->id)->delete();
    }
}
