<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = auth()->user();
        if (!$user) {
            return redirect()->route('/')->with('error', "Nemate pravo pristupa ovoj stranici!");
        }
        $is_admin = $user->is_admin;
        if ($is_admin == false) {
            return redirect()->route('dashboard')->with('error', "Nemate pravo pristupa ovoj stranici!");
        }
        return $next($request);
    }
}
