from fastapi import APIRouter, HTTPException, Depends
from typing import List
from models import (
    EventRegistrationCreate, 
    EventRegistration, 
    EventRegistrationResponse
)
from database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/events", tags=["events"])


# Mock events data (in a real app, this would come from database)
MOCK_EVENTS = [
    {
        "id": "1",
        "title": "Sunday Worship Service",
        "date": "2025-01-19",
        "time": "10:00 AM EST",
        "location": "Online & In-Person",
        "description": "Join us for worship, prayer, and the Word of God"
    },
    {
        "id": "2", 
        "title": "Leadership Conference 2025",
        "date": "2025-10-15",
        "time": "8:00 PM Nigeria / 2:00 PM Canada",
        "location": "Virtual Event",
        "description": "Raising Leaders for Global Impact - Guest speakers from around the world"
    },
    {
        "id": "3",
        "title": "Prayer & Fasting",
        "date": "2025-02-01", 
        "time": "6:00 AM EST",
        "location": "Online",
        "description": "Monthly prayer and fasting for global missions"
    }
]


@router.get("/")
async def get_events():
    """Get all upcoming events"""
    return MOCK_EVENTS


@router.post("/register", response_model=EventRegistrationResponse)
async def register_for_event(registration: EventRegistrationCreate, db=Depends(get_database)):
    """Register for an event"""
    try:
        # Validate event exists
        event_exists = any(event["id"] == registration.eventId for event in MOCK_EVENTS)
        if not event_exists:
            raise HTTPException(status_code=404, detail="Event not found")
        
        # Check if already registered
        existing = await db.event_registrations.find_one({
            "eventId": registration.eventId,
            "email": registration.email
        })
        
        if existing:
            raise HTTPException(status_code=400, detail="You are already registered for this event")
        
        # Create registration
        registration_data = EventRegistration(**registration.dict())
        result = await db.event_registrations.insert_one(registration_data.dict())
        
        if result.inserted_id:
            logger.info(f"Event registration created: {registration_data.id}")
            event_title = next((e["title"] for e in MOCK_EVENTS if e["id"] == registration.eventId), "Event")
            return EventRegistrationResponse(
                message=f"Thank you for registering for {event_title}! We'll send you more details soon.",
                registrationId=registration_data.id
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to register for event")
            
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error registering for event: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/{event_id}/registrations", response_model=List[EventRegistration])
async def get_event_registrations(event_id: str, db=Depends(get_database)):
    """Get registrations for a specific event (admin endpoint)"""
    try:
        cursor = db.event_registrations.find({"eventId": event_id}).sort("registeredAt", -1)
        registrations = await cursor.to_list(length=1000)
        
        # Convert ObjectId to string for response
        for registration in registrations:
            registration["id"] = str(registration["_id"])
            del registration["_id"]
            
        return registrations
        
    except Exception as e:
        logger.error(f"Error fetching event registrations: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")