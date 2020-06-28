<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Order;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class OrderController extends Controller
{
    /**
     * Get all User.
     *
     * @return Response
     */
    public function allOrders()
    {
       return response()->json(['orders' =>  Order::all()], 200);
   }

   public function addNewOrderWith(Request $request) {

    try {
        $this->validate($request, [
            'name' => 'required|unique:orders',
            'properties' => 'required'
        ]);

        $order = new Order;
        $order->name = $request->input('name');
        $order->properties = $request->input('properties');

        $order->save();

        return response()->json(['order' => $order, 'message' => 'Added'], 201);
    } catch (Exception $e) {

        return response()->json(['message' => 'Order creation Failed: General'], 409);
    } catch (\Illuminate\Validation\ValidationException $e) {
        // do whatever else you need todo for your use case

        return response()->json(['message' => 'Order creation Failed: validation'], 409);
    }
}
    public function deleteOrder($id) {

        try {
            $toBeDeleted = Order::findOrFail($id);
            $toBeDeleted->delete();

            return response()->json(['order' => $toBeDeleted, 'message' => 'Deleted'], 201);
        }
        catch (Exception $e) {

            return response()->json(['message' => 'Order creation Failed: General'], 409);
        }
    }

    public function singleOrder($id)
    {
        try {
            $order = Order::findOrFail($id);

            return response()->json(['order' => $order], 200);

        } catch (\Exception $e) {

            return response()->json(['message' => 'Order not found!'], 404);
        }
    }

    public function updateOrder(Request $request) {

        try {
        $this->validate($request, [
            'order' => 'required'
        ]);

        $order_ = $request->input('Order');
        $order_id = $order_['id'];
        $order = Order::findOrFail($order_id);
        $order->name = $order_['name'];
        $order->properties = $order_['properties'];

        $order->save();

        return response()->json(['order' => $order['id'], 'message' => 'updated'], 201);
    } catch (Exception $e) {

        return response()->json(['message' => 'Order creation Failed: General'], 409);
    }

    }
}