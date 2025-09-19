from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import (
    ContactSubmissionCreate, 
    ContactSubmission, 
    ContactResponse,
    ContactStatus
)
from database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/contact", tags=["contact"])


@router.post("/", response_model=ContactResponse)
async def submit_contact_form(submission: ContactSubmissionCreate, db=Depends(get_database)):
    """Submit a contact form"""
    try:
        # Create contact submission object
        contact_data = ContactSubmission(**submission.dict())
        
        # Insert into database
        result = await db.contact_submissions.insert_one(contact_data.dict())
        
        if result.inserted_id:
            logger.info(f"Contact submission created: {contact_data.id}")
            return ContactResponse(
                message="Thank you for your message! We will get back to you within 24 hours.",
                submissionId=contact_data.id
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to submit contact form")
            
    except Exception as e:
        logger.error(f"Error submitting contact form: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/", response_model=List[ContactSubmission])
async def get_contact_submissions(db=Depends(get_database)):
    """Get all contact submissions (admin endpoint)"""
    try:
        cursor = db.contact_submissions.find().sort("createdAt", -1)
        submissions = await cursor.to_list(length=100)
        
        # Convert ObjectId to string for response
        for submission in submissions:
            submission["id"] = str(submission["_id"])
            del submission["_id"]
            
        return submissions
        
    except Exception as e:
        logger.error(f"Error fetching contact submissions: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.put("/{submission_id}/status")
async def update_contact_status(
    submission_id: str, 
    status: ContactStatus, 
    db=Depends(get_database)
):
    """Update contact submission status (admin endpoint)"""
    try:
        result = await db.contact_submissions.update_one(
            {"id": submission_id},
            {"$set": {"status": status.value, "updatedAt": datetime.utcnow()}}
        )
        
        if result.modified_count:
            return {"message": "Status updated successfully"}
        else:
            raise HTTPException(status_code=404, detail="Submission not found")
            
    except Exception as e:
        logger.error(f"Error updating contact status: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")