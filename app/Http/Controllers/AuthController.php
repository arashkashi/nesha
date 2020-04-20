<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

class AuthController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        //
    }

    public function register(Request $request)
    {
        $this->validate($request, [
            'name' => 'required|string',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed'
        ]);

        try {
            $user = new User;
            $user->name = $request->input('name');
            $user->email = $request->input('email');
            $plainPass = $request->input('password');
            $user->password = app('hash')->make($plainPass);

            $user->save();

            return response()->json(['user' => $user, 'message' => 'CREATED'], 201);
        } catch (\Exception $e) {

            return response()->json(['message' => 'User Registration Failed'], 409);
        }
    }
}
