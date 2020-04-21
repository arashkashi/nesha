<?php

namespace App;

use Illuminate\Auth\Authenticatable;
use Illuminate\Contracts\Auth\Access\Authorizable as AuthorizableContract;
use Illuminate\Contracts\Auth\Authenticatable as AuthenticatableContract;
use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;
use App\Traits\UsesUuid;
use Firebase\JWT\JWT;
use Firebase\JWT\ExpiredException;

class User extends Model implements AuthenticatableContract, AuthorizableContract
{
    use Authenticatable, Authorizable, UsesUuid;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email',
    ];

    /**
     * The attributes excluded from the model's JSON form.
     *
     * @var array
     */
    protected $hidden = [
        'password',
    ];

    /**
     * The attributes that arent mass asignable.
     *
     * @var array
     */
    protected $guarded = [
        'id',
    ];

    public static function getUserFrom($token) {

        try {

            $cred = JWT::decode($token, env('JWT_SECRET'), ['HS256']);
        } 
        catch (ExpiredException $e) {

            return response()->json(['error' => 'provided token is expired'], 400);
        } 
        catch (exception $e) {

            return response()->json(['error' => 'error while decoding token'], 400);
        }

        $user = User::find($cred->sub);

        return $user;
    }
}
