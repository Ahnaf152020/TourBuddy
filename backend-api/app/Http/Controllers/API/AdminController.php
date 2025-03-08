<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Admin;
use App\Models\TourGuide;
use App\Models\Payment;
use App\Services\AdminService;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    protected $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->adminService = $adminService;
    }

    // Register a new admin
    public function register(Request $request)
{
    $request->validate([
        'name' => 'required|string',
        'email' => 'required|email|unique:admins,email',
        'password' => 'required|string|min:6'
    ]);

        $admin = $this->adminService->registerAdmin(
            $request->name,
            $request->email,
            $request->password
        );

        return response()->json([
            'message' => 'Admin registered successfully!',
            'admin' => $admin
        ], 201);
    }

    // Login an admin
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|string'
        ]);

        $admin = $this->adminService->loginAdmin(
            $request->email,
            $request->password
        );

        if (!$admin) {
            return response()->json(['message' => 'Invalid credentials'], 401);
        }

        return response()->json([
            'message' => 'Admin logged in successfully!',
            'admin' => $admin
        ]);
    }

    // Delete a tour guide
    public function deleteTourGuide($id)
    {
        $deleted = $this->adminService->deleteTourGuide($id);

        if (!$deleted) {
            return response()->json(['message' => 'Tour guide not found'], 404);
        }

        return response()->json(['message' => 'Tour guide deleted successfully']);
    }

    // Get all payments
    public function getAllPayments()
    {
        $payments = $this->adminService->getAllPayments();

        return response()->json(['payments' => $payments]);
    }

    // Delete a payment
    public function deletePayment($id)
    {
        $deleted = $this->adminService->deletePayment($id);

        if (!$deleted) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        return response()->json(['message' => 'Payment deleted successfully']);
    }

    // Update a payment status
    public function updatePayment(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|in:pending,success,failed',
            'transaction_id' => 'nullable|string'
        ]);

        $payment = $this->adminService->updatePayment(
            $id,
            $request->status,
            $request->transaction_id
        );

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        return response()->json([
            'message' => 'Payment updated successfully!',
            'payment' => $payment
        ]);
    }

    // Get a specific payment by ID
    public function getPayment($id)
    {
        $payment = $this->adminService->getPaymentById($id);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        return response()->json(['payment' => $payment]);
    }
}