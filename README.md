# Lumen PHP Framework
salam
## License

The Lumen framework is open-sourced software licensed under the [MIT license](https://opensource.org/licenses/MIT).

# To Create a new (user) table
```php artisan make:migration create_users_table --create=users```

# MySql version 8 Auth problem
when creating a user use the following
```
CREATE USER 'ohdear_ci'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ohdear_secret';
GRANT ALL PRIVILEGES ON ohdear_ci.* TO 'ohdear_ci'@'localhost';
```
For an already created user use
```
ALTER USER 'ohdear_ci'@'localhost' IDENTIFIED WITH mysql_native_password BY 'ohdear_secret';
```

# For JWT auth the following links
https://jwt-auth.readthedocs.io/en/develop/lumen-installation/
```php artisan jwt:secret``` -> this basically adds secret variable into the env file.

https://dev.to/ndiecodes/build-a-jwt-authenticated-api-with-lumen-2afm
