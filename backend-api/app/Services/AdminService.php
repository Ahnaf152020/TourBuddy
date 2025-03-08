<?php

namespace App\Services;

use App\Models\Admin;
use App\Models\TourGuide;
use App\Models\Payment;
use Illuminate\Support\Facades\Hash;

class AdminService
{
    // Register a new admin
    public function registerAdmin($name, $email, $password)
    {
        $admin = Admin::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password)
        ]);

        return $admin;
    }

    // Login an admin
    public function loginAdmin($email, $password)
    {
        $admin = Admin::where('email', $email)->first();

        if (!$admin || !Hash::check($password, $admin->password)) {
            return null;
        }

        return $admin;
    }

    // Delete a tour guide
    public function deleteTourGuide($id)
    {
        $tourGuide = TourGuide::find($id);

        if (!$tourGuide) {
            return false;
        }

        $tourGuide->delete();
        return true;
    }

    // Get all payments
    public function getAllPayments()
    {
        return Payment::all();
    }

    // Delete a payment
    public function deletePayment($id)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return false;
        }

        $payment->delete();
        return true;
    }

    // Update a payment
    public function updatePayment($id, $status, $transactionId)
    {
        $payment = Payment::find($id);

        if (!$payment) {
            return null;
        }

        $payment->status = $status;
        $payment->transaction_id = $transactionId;
        $payment->save();

        return $payment;
    }

    // Get a payment by ID
    public function getPaymentById($id)
    {
        return Payment::find($id);
    }
}