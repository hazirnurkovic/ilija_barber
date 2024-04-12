<?php

namespace App\Http\Controllers;

use App\Http\Requests\EditUserRequest;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;
use Illuminate\Validation\Rules\Password;
use Inertia\Inertia;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $successMessage = Session::get('success');
        $errorMessage = Session::get('error');
        $users = User::all();
        return Inertia::render('Barbers', [
            'users' => $users,
            'success' => $successMessage,
            'error' => $errorMessage
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
            'percentage' => 'required|numeric|min:0|max:100',
            'bank_amount' => 'required|numeric',
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
                'percentage' => self::calculatePercentage($request->percentage),
                'bank_amount' =>$request->bank_amount,
                'password' => Hash::make($request->password),
            ]);

            return redirect('/create_barber')->with('success','Uspješno ste kreirali barbera.');
        } catch (Exception $e) {
            return redirect('/create_barber')->with('error', $e->getMessage());
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
        $create_barber['percentage'] = $create_barber['percentage'] * 100;
        return Inertia::render('EditBarber', [
            'user' => $create_barber
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(EditUserRequest $request, User $create_barber)
    {
        try{
            $validated = $request->validated();
            $validated['percentage'] = self::calculatePercentage($validated['percentage']);
            $create_barber->update($validated);

            return redirect('/create_barber')->with('success','Uspješno ste ažurirali podatke barbera.');
        } catch (Exception $e) {
            return redirect('/create_barber')->with('error', $e->getMessage());
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $create_barber)
    {
        try{
            $create_barber->delete();
            return redirect('/create_barber')->with('success','Uspješno ste obrisali podatke barbera');
        } catch (Exception $e) {
            return redirect('/create_barber')->with('error', $e->getMessage());
        }
    }

    private static function calculatePercentage($percentage)
    {
            return $percentage / 100;
    }
}
