from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import (
    PrayerRequestCreate, 
    PrayerRequest, 
    PrayerResponse,
    PrayerRequestStatus
)
from database import get_database
import logging
from datetime import datetime

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/prayer-requests", tags=["prayer"])


@router.post("/", response_model=PrayerResponse)
async def submit_prayer_request(request: PrayerRequestCreate, db=Depends(get_database)):
    """Submit a prayer request"""
    try:
        # Create prayer request object
        prayer_data = PrayerRequest(**request.dict())
        
        # Insert into database
        result = await db.prayer_requests.insert_one(prayer_data.dict())
        
        if result.inserted_id:
            logger.info(f"Prayer request created: {prayer_data.id}")
            return PrayerResponse(
                message="Thank you for sharing your prayer request. Our prayer team will be covering you in prayer.",
                requestId=prayer_data.id
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to submit prayer request")
            
    except Exception as e:
        logger.error(f"Error submitting prayer request: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/", response_model=List[PrayerRequest])
async def get_prayer_requests(include_private: bool = False, db=Depends(get_database)):
    """Get prayer requests (public by default, admin can include private)"""
    try:
        query = {} if include_private else {"isPrivate": False}
        cursor = db.prayer_requests.find(query).sort("createdAt", -1)
        requests = await cursor.to_list(length=100)
        
        # Convert ObjectId to string for response and remove sensitive data if public
        for prayer_request in requests:
            prayer_request["id"] = str(prayer_request["_id"])
            del prayer_request["_id"]
            
            # Remove email from public requests
            if not include_private and prayer_request.get("email"):
                del prayer_request["email"]
            
        return requests
        
    except Exception as e:
        logger.error(f"Error fetching prayer requests: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.put("/{request_id}/status")
async def update_prayer_status(
    request_id: str, 
    status: PrayerRequestStatus, 
    db=Depends(get_database)
):
    """Update prayer request status (admin endpoint)"""
    try:
        result = await db.prayer_requests.update_one(
            {"id": request_id},
            {"$set": {"status": status.value, "updatedAt": datetime.utcnow()}}
        )
        
        if result.modified_count:
            return {"message": "Prayer request status updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Prayer request not found")
            
    except Exception as e:
        logger.error(f"Error updating prayer status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")