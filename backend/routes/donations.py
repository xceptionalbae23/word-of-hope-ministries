from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import (
    DonationCreate, 
    DonationRecord, 
    DonationResponse,
    PaymentStatus
)
from database import get_database
import logging
from datetime import datetime

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/donations", tags=["donations"])


@router.post("/intent", response_model=DonationResponse)
async def create_donation_intent(donation: DonationCreate, db=Depends(get_database)):
    """Create a donation intent (mock payment processing)"""
    try:
        # Validate donation amount
        if donation.amount <= 0:
            raise HTTPException(status_code=400, detail="Donation amount must be greater than 0")
        
        # Create donation record
        donation_data = DonationRecord(**donation.dict())
        
        # Mock payment processing - in real app, this would integrate with Stripe/PayPal
        donation_data.paymentStatus = PaymentStatus.completed
        donation_data.paymentId = f"mock_payment_{donation_data.id}"
        
        # Insert into database
        result = await db.donations.insert_one(donation_data.dict())
        
        if result.inserted_id:
            logger.info(f"Donation created: {donation_data.id} - ${donation.amount} CAD")
            
            # Format donation type for message
            donation_type_text = "monthly" if donation.donationType == "monthly" else "one-time"
            
            return DonationResponse(
                message=f"Thank you for your generous ${donation.amount} CAD {donation_type_text} donation! Your gift will help us reach more souls for Christ.",
                donationId=donation_data.id,
                paymentStatus="completed"
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to process donation")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error processing donation: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/complete")
async def complete_donation(donation_id: str, payment_id: str, db=Depends(get_database)):
    """Complete a donation (webhook endpoint for real payment processors)"""
    try:
        result = await db.donations.update_one(
            {"id": donation_id},
            {"$set": {
                "paymentStatus": PaymentStatus.completed.value,
                "paymentId": payment_id,
                "updatedAt": datetime.utcnow()
            }}
        )
        
        if result.modified_count:
            return {"message": "Donation completed successfully"}
        else:
            raise HTTPException(status_code=404, detail="Donation not found")
            
    except Exception as e:
        logger.error(f"Error completing donation: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/", response_model=List[DonationRecord])
async def get_donations(db=Depends(get_database)):
    """Get all donations (admin endpoint)"""
    try:
        cursor = db.donations.find().sort("createdAt", -1)
        donations = await cursor.to_list(length=1000)
        
        # Convert ObjectId to string for response
        for donation in donations:
            donation["id"] = str(donation["_id"])
            del donation["_id"]
            
        return donations
        
    except Exception as e:
        logger.error(f"Error fetching donations: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/stats")
async def get_donation_stats(db=Depends(get_database)):
    """Get donation statistics (admin endpoint)"""
    try:
        # Get total donations
        total_pipeline = [
            {"$match": {"paymentStatus": "completed"}},
            {"$group": {"_id": None, "total": {"$sum": "$amount"}, "count": {"$sum": 1}}}
        ]
        total_result = await db.donations.aggregate(total_pipeline).to_list(length=1)
        
        # Get monthly donations
        monthly_pipeline = [
            {"$match": {"paymentStatus": "completed", "donationType": "monthly"}},
            {"$group": {"_id": None, "total": {"$sum": "$amount"}, "count": {"$sum": 1}}}
        ]
        monthly_result = await db.donations.aggregate(monthly_pipeline).to_list(length=1)
        
        # Get donations by cause
        cause_pipeline = [
            {"$match": {"paymentStatus": "completed"}},
            {"$group": {"_id": "$cause", "total": {"$sum": "$amount"}, "count": {"$sum": 1}}}
        ]
        cause_result = await db.donations.aggregate(cause_pipeline).to_list(length=10)
        
        return {
            "totalDonations": total_result[0] if total_result else {"total": 0, "count": 0},
            "monthlyDonations": monthly_result[0] if monthly_result else {"total": 0, "count": 0},
            "donationsByCause": cause_result
        }
        
    except Exception as e:
        logger.error(f"Error fetching donation stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")