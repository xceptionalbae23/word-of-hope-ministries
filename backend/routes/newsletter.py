from fastapi import APIRouter, HTTPException, Depends
from typing import List
from datetime import datetime
from models import (
    NewsletterSubscriptionCreate, 
    NewsletterSubscription, 
    NewsletterResponse,
    SubscriptionStatus
)
from database import get_database
import logging

logger = logging.getLogger(__name__)
router = APIRouter(prefix="/newsletter", tags=["newsletter"])


@router.post("/subscribe", response_model=NewsletterResponse)
async def subscribe_newsletter(subscription: NewsletterSubscriptionCreate, db=Depends(get_database)):
    """Subscribe to newsletter"""
    try:
        # Check if email already exists
        existing = await db.newsletter_subscriptions.find_one({"email": subscription.email})
        
        if existing:
            if existing.get("status") == "unsubscribed":
                # Reactivate subscription
                await db.newsletter_subscriptions.update_one(
                    {"email": subscription.email},
                    {"$set": {"status": "active", "subscribedAt": datetime.utcnow()}}
                )
                return NewsletterResponse(
                    message="Welcome back! You've been resubscribed to our newsletter.",
                    email=subscription.email
                )
            else:
                return NewsletterResponse(
                    message="You're already subscribed to our newsletter!",
                    email=subscription.email
                )
        
        # Create new subscription
        newsletter_data = NewsletterSubscription(**subscription.dict())
        result = await db.newsletter_subscriptions.insert_one(newsletter_data.dict())
        
        if result.inserted_id:
            logger.info(f"Newsletter subscription created: {subscription.email}")
            return NewsletterResponse(
                message="Thank you for subscribing! You'll receive our weekly devotionals and ministry updates.",
                email=subscription.email
            )
        else:
            raise HTTPException(status_code=500, detail="Failed to subscribe")
            
    except Exception as e:
        logger.error(f"Error subscribing to newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.post("/unsubscribe", response_model=NewsletterResponse)
async def unsubscribe_newsletter(subscription: NewsletterSubscriptionCreate, db=Depends(get_database)):
    """Unsubscribe from newsletter"""
    try:
        result = await db.newsletter_subscriptions.update_one(
            {"email": subscription.email},
            {"$set": {"status": "unsubscribed", "unsubscribedAt": datetime.utcnow()}}
        )
        
        if result.modified_count:
            return NewsletterResponse(
                message="You've been successfully unsubscribed from our newsletter.",
                email=subscription.email
            )
        else:
            raise HTTPException(status_code=404, detail="Email not found in our subscription list")
            
    except Exception as e:
        logger.error(f"Error unsubscribing from newsletter: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")


@router.get("/subscribers", response_model=List[NewsletterSubscription])
async def get_subscribers(db=Depends(get_database)):
    """Get all newsletter subscribers (admin endpoint)"""
    try:
        cursor = db.newsletter_subscriptions.find({"status": "active"}).sort("subscribedAt", -1)
        subscribers = await cursor.to_list(length=1000)
        
        # Convert ObjectId to string for response
        for subscriber in subscribers:
            subscriber["id"] = str(subscriber["_id"])
            del subscriber["_id"]
            
        return subscribers
        
    except Exception as e:
        logger.error(f"Error fetching subscribers: {str(e)}")
        raise HTTPException(status_code=500, detail="Internal server error")