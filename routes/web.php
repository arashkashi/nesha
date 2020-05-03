<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->post('register', 'AuthController@register');

$router->post('login', 'AuthController@login');

// API route group
$router->group(['prefix' => 'api'/*, 'middleware' => 'jwt.auth'*/], function () use ($router) {
    // Matches "/api/register

    // Matches "/api/profile
    $router->post('profile', 'UserController@profile');

    // Matches "/api/users/1 
    //get one user by id
    $router->get('users/{id}', 'UserController@singleUser');

    // Matches "/api/users
    $router->post('users', 'UserController@allUsers');
    
});
