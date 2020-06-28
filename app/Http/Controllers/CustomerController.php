<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Customer;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class CustomerController extends Controller
{
    /**
     * Get all User.
     *
     * @return Response
     */
    public function allCustomers()
    {
       return response()->json(['customers' =>  Customer::all()], 200);
   }

   public function addNewCustomerWith(Request $request) {

    try {
        $this->validate($request, [
            'name' => 'required|unique:customers',
            'properties' => 'required'
        ]);

        $customer = new Customer;
        $customer->name = $request->input('name');
        $customer->properties = $request->input('properties');

        $customer->save();

        return response()->json(['customer' => $customer, 'message' => 'Added'], 201);
    } catch (Exception $e) {

        return response()->json(['message' => 'Customer creation Failed: General'], 409);
    } catch (\Illuminate\Validation\ValidationException $e) {
        // do whatever else you need todo for your use case

        return response()->json(['message' => 'Customer creation Failed: validation'], 409);
    }
}
    public function deleteCustomer($id) {

        try {
            $toBeDeleted = Customer::findOrFail($id);
            $toBeDeleted->delete();

            return response()->json(['customer' => $toBeDeleted, 'message' => 'Deleted'], 201);
        }
        catch (Exception $e) {

            return response()->json(['message' => 'Customer creation Failed: General'], 409);
        }
    }

    public function singleCustomer($id)
    {
        try {
            $customer = Customer::findOrFail($id);

            return response()->json(['customer' => $customer], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'Customer not found!'], 404);
        }
    }

    public function updateCustomer(Request $request) {

        try {
        $this->validate($request, [
            'customer' => 'required'
        ]);

        $customer_ = $request->input('customer');
        $customer_id = $customer_['id'];
        $customer = Customer::findOrFail($customer_id);
        $customer->name = $customer_['name'];
        $customer->properties = $customer_['properties'];

        $customer->save();

        return response()->json(['customer' => $customer['id'], 'message' => 'updated'], 201);
    } catch (Exception $e) {

        return response()->json(['message' => 'Customer creation Failed: General'], 409);
    }

    }
}