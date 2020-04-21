<?php

namespace App\Http\Middleware;

use Closure;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;

use App\User;

class JWTMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        return $next($request);
        $token = $request->input('api_token');

        if (!token) {
            return response()->json([
                'error' => 'Token not provided'
            , 401]);
        }
        try 
        {
            $cred = JWT::decode($token, env('JWT_SECRET'), [HS256]);
        } catch (ExpiredException $e) 
        {
            return response()->json(['error' => 'provided token is expired'], 400);

        } catch (exception $e) 
        {
            return response()->json(['error' => 'error while decoding token'], 400);
        }

        $user = User::find($cred->sub);

        $request->auth = $user;

        return $next($request);
    }
}
