<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Services\PaymentService;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    // Create a new payment
    public function createPayment(Request $request)
    {
        $request->validate([
            'tour_guide_id' => 'required|integer|exists:tour_guides,id',
            'payment_id' => 'required|string|unique:payments,payment_id',
            'amount' => 'required|numeric|min:1',
            'package_details' => 'required|string',
            'status' => 'required|in:pending,success,failed',
            'transaction_id' => 'nullable|string'
        ]);
        

        $payment = $this->paymentService->createPayment(
            $request->tour_guide_id,
            $request->payment_id,
            $request->amount,
            $request->package_details,
            $request->status,
            $request->transaction_id
        );

        return response()->json([
            'message' => 'Payment created successfully!',
            'payment' => $payment
        ], 201);
    }

    // Get payment details by payment ID
    public function getPayment($paymentId)
    {
        $payment = $this->paymentService->getPaymentByPaymentId($paymentId);

        if (!$payment) {
            return response()->json(['message' => 'Payment not found'], 404);
        }

        return response()->json(['payment' => $payment]);
    }

    // Execute a pending payment
    public function executePayment(Request $request)
    {
        $request->validate([
            'payment_id' => 'required|string|exists:payments,payment_id',
            'status' => 'required|string|in:success,failed',
            'transaction_id' => 'required|string'
        ]);

        $payment = $this->paymentService->executePayment(
            $request->payment_id,
            $request->status,
            $request->transaction_id
        );

        return response()->json([
            'message' => 'Payment executed successfully!',
            'payment' => $payment
        ]);
    }

    // Get all successful payments
    public function getSuccessfulPayments()
    {
        $payments = $this->paymentService->getSuccessfulPayments();

        return response()->json(['successful_payments' => $payments]);
    }

    // Delete all failed payments
    public function deleteFailedPayments()
    {
        $deleted = $this->paymentService->deleteFailedPayments();

        if ($deleted === 0) {
            return response()->json(['message' => 'No failed payments to delete'], 404);
        }

        return response()->json(['message' => 'Failed payments deleted successfully']);
    }

    // Verify a transaction by transaction ID
    public function verifyTransaction($trxId)
    {
        $payment = $this->paymentService->verifyTransaction($trxId);

        if (!$payment) {
            return response()->json(['message' => 'Transaction not found'], 404);
        }

        return response()->json(['payment' => $payment]);
    }
}
