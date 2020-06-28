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

$router->post('/php_ini/{id}', 'Controller@php_ini');

// API route group
$router->group(['prefix' => 'api', 'middleware' => 'auth'], function () use ($router) {

    $router->post('profile', 'UserController@profile');

    $router->post('users/{id}', 'UserController@singleUser');

    $router->post('users', 'UserController@allUsers');

    //******

    $router->post('products/addNewProduct', 'ProductController@addNewProductWith');

    $router->post('products/delete/{id}', 'ProductController@deleteProduct');

    $router->post('products/update', 'ProductController@updateProduct');

    $router->post('products/{id}', 'ProductController@singleProduct');

    $router->post('products', 'ProductController@allProducts');

    //******

    $router->post('customers/new', 'CustomerController@addNewCustomerWith');

    $router->post('customers/delete/{id}', 'CustomerController@deleteCustomer');

    $router->post('customers/update', 'CustomerController@updateCustomer');

    $router->post('customers/{id}', 'CustomerController@singleCustomer');

    $router->post('customers', 'CustomerController@allCustomers');

    //******

    $router->post('orders/addNewCustomer', 'OrderController@addNewOrderWith');

    $router->post('orders/delete/{id}', 'OrderController@deleteOrder');

    $router->post('orders/update', 'OrderController@updateOrder');

    $router->post('orders/{id}', 'OrderController@singleOrder');

    $router->post('orders', 'OrderController@allOrders');

    //******

    $router->post('Projects/addNewCustomer', 'ProjectController@addNewProjectWith');

    $router->post('Projects/delete/{id}', 'ProjectController@deleteProject');

    $router->post('Projects/update', 'ProjectController@updateProject');

    $router->post('Projects/{id}', 'ProjectController@singleProject');

    $router->post('Projects', 'ProjectController@allProjecs');

    //******

	$router->post('files/save', 'FilesController@saveFile');
	// $router->post('list', 'FilesController@getFileList');
	$router->get('files/view-media/{filename}', 'FilesController@viewMediaFile');
	$router->get('files/delete/{filename}', 'FilesController@deleteFile');
});
