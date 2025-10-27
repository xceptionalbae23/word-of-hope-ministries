from fastapi import APIRouter, HTTPException, Depends, UploadFile, File, Form
from typing import List, Optional
from datetime import datetime
import os
import uuid
from pathlib import Path
from models import (
    ContactSubmission,
    DonationRecord,
    NewsletterSubscription,
    EventRegistration,
    PrayerRequest
)
from database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/admin", tags=["admin"])

# Simple admin authentication (in production, use proper JWT/OAuth)
ADMIN_USERNAME = "admin"
ADMIN_PASSWORD = "wohi2024admin"  # Change this in production!

# Directory for uploaded files
UPLOAD_DIR = Path("/app/uploads")
UPLOAD_DIR.mkdir(exist_ok=True)


def verify_admin_credentials(username: str, password: str):
    """Simple admin authentication - replace with proper auth in production"""
    return username == ADMIN_USERNAME and password == ADMIN_PASSWORD


@router.post("/login")
async def admin_login(username: str = Form(...), password: str = Form(...)):
    """Admin login endpoint"""
    if verify_admin_credentials(username, password):
        # In production, return JWT token
        return {
            "message": "Login successful",
            "token": "admin_token_placeholder",  # Replace with actual JWT
            "user": "admin"
        }
    else:
        raise HTTPException(status_code=401, detail="Invalid credentials")


@router.get("/dashboard")
async def get_dashboard_stats(db=Depends(get_database)):
    """Get dashboard statistics"""
    try:
        # Get contact submissions count
        contact_count = await db.contact_submissions.count_documents({})
        new_contacts = await db.contact_submissions.count_documents({"status": "new"})
        
        # Get newsletter subscribers count
        subscriber_count = await db.newsletter_subscriptions.count_documents({"status": "active"})
        
        # Get donation stats
        donations_pipeline = [
            {"$match": {"paymentStatus": "completed"}},
            {"$group": {"_id": None, "total": {"$sum": "$amount"}, "count": {"$sum": 1}}}
        ]
        donation_stats = await db.donations.aggregate(donations_pipeline).to_list(length=1)
        
        # Get event registrations count
        registration_count = await db.event_registrations.count_documents({})
        
        # Get prayer requests count
        prayer_count = await db.prayer_requests.count_documents({})
        
        return {
            "contacts": {
                "total": contact_count,
                "new": new_contacts
            },
            "subscribers": subscriber_count,
            "donations": {
                "total": donation_stats[0]["total"] if donation_stats else 0,
                "count": donation_stats[0]["count"] if donation_stats else 0
            },
            "registrations": registration_count,
            "prayerRequests": prayer_count
        }
        
    except Exception as e:
        logger.error(f"Error fetching dashboard stats: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/contacts")
async def get_all_contacts(db=Depends(get_database)):
    """Get all contact submissions"""
    try:
        cursor = db.contact_submissions.find().sort("createdAt", -1)
        contacts = await cursor.to_list(length=1000)
        
        # Convert ObjectId to string
        for contact in contacts:
            contact["id"] = str(contact["_id"])
            del contact["_id"]
            
        return contacts
        
    except Exception as e:
        logger.error(f"Error fetching contacts: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/donations")
async def get_all_donations(db=Depends(get_database)):
    """Get all donations"""
    try:
        cursor = db.donations.find().sort("createdAt", -1)
        donations = await cursor.to_list(length=1000)
        
        # Convert ObjectId to string
        for donation in donations:
            donation["id"] = str(donation["_id"])
            del donation["_id"]
            
        return donations
        
    except Exception as e:
        logger.error(f"Error fetching donations: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/subscribers")
async def get_all_subscribers(db=Depends(get_database)):
    """Get all newsletter subscribers"""
    try:
        cursor = db.newsletter_subscriptions.find().sort("subscribedAt", -1)
        subscribers = await cursor.to_list(length=1000)
        
        # Convert ObjectId to string
        for subscriber in subscribers:
            subscriber["id"] = str(subscriber["_id"])
            del subscriber["_id"]
            
        return subscribers
        
    except Exception as e:
        logger.error(f"Error fetching subscribers: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/registrations")
async def get_all_registrations(db=Depends(get_database)):
    """Get all event registrations"""
    try:
        cursor = db.event_registrations.find().sort("registeredAt", -1)
        registrations = await cursor.to_list(length=1000)
        
        # Convert ObjectId to string
        for registration in registrations:
            registration["id"] = str(registration["_id"])
            del registration["_id"]
            
        return registrations
        
    except Exception as e:
        logger.error(f"Error fetching registrations: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/prayer-requests")
async def get_all_prayer_requests(db=Depends(get_database)):
    """Get all prayer requests"""
    try:
        cursor = db.prayer_requests.find().sort("createdAt", -1)
        prayers = await cursor.to_list(length=1000)
        
        # Convert ObjectId to string
        for prayer in prayers:
            prayer["id"] = str(prayer["_id"])
            del prayer["_id"]
            
        return prayers
        
    except Exception as e:
        logger.error(f"Error fetching prayer requests: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/upload/image")
async def upload_image(file: UploadFile = File(...), title: str = Form(...), description: str = Form(None)):
    """Upload an image file"""
    try:
        # Validate file type
        if not file.content_type.startswith('image/'):
            raise HTTPException(status_code=400, detail="File must be an image")
        
        # Generate unique filename
        file_extension = Path(file.filename).suffix
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / "images" / unique_filename
        
        # Create directory if it doesn't exist
        file_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Save file
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        # Return file info
        return {
            "message": "Image uploaded successfully",
            "filename": unique_filename,
            "path": str(file_path),
            "url": f"/uploads/images/{unique_filename}",
            "title": title,
            "description": description,
            "uploadedAt": datetime.utcnow()
        }
        
    except Exception as e:
        logger.error(f"Error uploading image: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to upload image")


@router.post("/upload/video")
async def upload_video(file: UploadFile = File(...), title: str = Form(...), description: str = Form(None)):
    """Upload a video file"""
    try:
        # Validate file type
        if not file.content_type.startswith('video/'):
            raise HTTPException(status_code=400, detail="File must be a video")
        
        # Check file size (limit to 100MB for now)
        file_size = 0
        content = await file.read()
        file_size = len(content)
        
        if file_size > 100 * 1024 * 1024:  # 100MB
            raise HTTPException(status_code=400, detail="Video file too large (max 100MB)")
        
        # Generate unique filename
        file_extension = Path(file.filename).suffix
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / "videos" / unique_filename
        
        # Create directory if it doesn't exist
        file_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Save file
        with open(file_path, "wb") as buffer:
            buffer.write(content)
        
        return {
            "message": "Video uploaded successfully",
            "filename": unique_filename,
            "path": str(file_path),
            "url": f"/uploads/videos/{unique_filename}",
            "title": title,
            "description": description,
            "uploadedAt": datetime.utcnow()
        }
        
    except Exception as e:
        logger.error(f"Error uploading video: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to upload video")


@router.post("/upload/audio")
async def upload_audio(file: UploadFile = File(...), title: str = Form(...), description: str = Form(None)):
    """Upload an audio file"""
    try:
        # Validate file type
        if not file.content_type.startswith('audio/'):
            raise HTTPException(status_code=400, detail="File must be an audio file")
        
        # Generate unique filename
        file_extension = Path(file.filename).suffix
        unique_filename = f"{uuid.uuid4()}{file_extension}"
        file_path = UPLOAD_DIR / "audio" / unique_filename
        
        # Create directory if it doesn't exist
        file_path.parent.mkdir(parents=True, exist_ok=True)
        
        # Save file
        with open(file_path, "wb") as buffer:
            content = await file.read()
            buffer.write(content)
        
        return {
            "message": "Audio uploaded successfully",
            "filename": unique_filename,
            "path": str(file_path),
            "url": f"/uploads/audio/{unique_filename}",
            "title": title,
            "description": description,
            "uploadedAt": datetime.utcnow()
        }
        
    except Exception as e:
        logger.error(f"Error uploading audio: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to upload audio")


@router.post("/sermons")
async def create_sermon(
    title: str = Form(...),
    speaker: str = Form(...),
    scripture: str = Form(...),
    description: str = Form(None),
    video_file: Optional[UploadFile] = File(None),
    audio_file: Optional[UploadFile] = File(None),
    db=Depends(get_database)
):
    """Create a new sermon entry"""
    try:
        sermon_id = str(uuid.uuid4())
        sermon_data = {
            "id": sermon_id,
            "title": title,
            "speaker": speaker,
            "scripture": scripture,
            "description": description,
            "date": datetime.utcnow(),
            "videoUrl": None,
            "audioUrl": None,
            "createdAt": datetime.utcnow()
        }
        
        # Handle video upload
        if video_file:
            video_result = await upload_video(video_file, title, f"Video for sermon: {title}")
            sermon_data["videoUrl"] = video_result["url"]
        
        # Handle audio upload
        if audio_file:
            audio_result = await upload_audio(audio_file, title, f"Audio for sermon: {title}")
            sermon_data["audioUrl"] = audio_result["url"]
        
        # Save to database
        result = await db.sermons.insert_one(sermon_data)
        
        if result.inserted_id:
            return {
                "message": "Sermon created successfully",
                "sermonId": sermon_id,
                "sermon": sermon_data
            }
        else:
            raise HTTPException(status_code=500, detail="Failed to create sermon")
        
    except Exception as e:
        logger.error(f"Error creating sermon: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to create sermon")


@router.get("/uploads/{file_type}/{filename}")
async def serve_uploaded_file(file_type: str, filename: str):
    """Serve uploaded files"""
    try:
        file_path = UPLOAD_DIR / file_type / filename
        
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="File not found")
        
        # In a production environment, you might want to use a proper file server
        # or cloud storage service instead of serving files directly
        return {"message": "File found", "path": str(file_path)}
        
    except Exception as e:
        logger.error(f"Error serving file: {str(e)}")
        raise HTTPException(status_code=500, detail="Error serving file")