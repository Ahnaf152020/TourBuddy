<?php

namespace App\Services;

use Illuminate\Support\Facades\DB;

class PaymentService
{
    // Create a new payment record
    public function createPayment($tourGuideId, $paymentId, $amount, $packageDetails, $status, $transactionId)
    {
        DB::insert("INSERT INTO payments (tour_guide_id, payment_id, amount, package_details, status, transaction_id, created_at, updated_at) 
                    VALUES (?, ?, ?, ?, ?, ?, NOW(), NOW())", 
                    [$tourGuideId, $paymentId, $amount, $packageDetails, $status, $transactionId]);

        return $this->getPaymentByPaymentId($paymentId);
    }

    // Retrieve payment details by payment ID
    public function getPaymentByPaymentId($paymentId)
    {
        return DB::selectOne("SELECT * FROM payments WHERE payment_id = ?", [$paymentId]);
    }

    // Retrieve all successful payments
    public function getSuccessfulPayments()
    {
        return DB::select("SELECT * FROM payments WHERE status = 'success'");
    }

    // Execute a pending payment (update status)
    public function executePayment($paymentId, $status, $transactionId)
    {
        DB::update("UPDATE payments SET status = ?, transaction_id = ?, updated_at = NOW() WHERE payment_id = ?", 
                    [$status, $transactionId, $paymentId]);

        return $this->getPaymentByPaymentId($paymentId);
    }

    // Delete failed payments
    public function deleteFailedPayments()
    {
        return DB::delete("DELETE FROM payments WHERE status = 'failed'");
    }

    // Verify transaction by transaction ID
    public function verifyTransaction($trxId)
    {
        return DB::selectOne("SELECT * FROM payments WHERE transaction_id = ?", [$trxId]);
    }
}
