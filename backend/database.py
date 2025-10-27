from motor.motor_asyncio import AsyncIOMotorClient
import os
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables
ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

mongo_url = os.environ['MONGO_URL']
db_name = os.environ['DB_NAME']

# MongoDB client
client = AsyncIOMotorClient(mongo_url)
database = client[db_name]


async def get_database():
    """Dependency to get database connection"""
    return database


async def init_database():
    """Initialize database collections and indexes"""
    # Create indexes for better performance
    
    # Contact submissions
    await database.contact_submissions.create_index("email")
    await database.contact_submissions.create_index("createdAt")
    await database.contact_submissions.create_index("status")
    
    # Newsletter subscriptions
    await database.newsletter_subscriptions.create_index("email", unique=True)
    await database.newsletter_subscriptions.create_index("status")
    
    # Event registrations
    await database.event_registrations.create_index([("eventId", 1), ("email", 1)], unique=True)
    await database.event_registrations.create_index("registeredAt")
    
    # Donations
    await database.donations.create_index("email")
    await database.donations.create_index("createdAt")
    await database.donations.create_index("paymentStatus")
    await database.donations.create_index("cause")
    
    # Prayer requests
    await database.prayer_requests.create_index("createdAt")
    await database.prayer_requests.create_index("status")
    await database.prayer_requests.create_index("isPrivate")


async def close_database():
    """Close database connection"""
    client.close()