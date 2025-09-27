from fastapi import FastAPI, APIRouter
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List
import uuid
from datetime import datetime

# Import route modules
from routes import contact, newsletter, events, donations, prayer, admin
from database import init_database, close_database

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI(title="WOHI Ministries API", version="1.0.0")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Include route modules
api_router.include_router(contact.router)
api_router.include_router(newsletter.router)
api_router.include_router(events.router)
api_router.include_router(donations.router)
api_router.include_router(prayer.router)
api_router.include_router(admin.router)

# Existing routes
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

@api_router.get("/")
async def root():
    return {"message": "WOHI Ministries API - Serving God's Kingdom Worldwide"}

@api_router.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "message": "WOHI Ministries API is running",
        "timestamp": datetime.utcnow()
    }

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Content endpoints (returning static data for now)
@api_router.get("/ministry-info")
async def get_ministry_info():
    """Get ministry information"""
    return {
        "name": "WOHI Ministries Worldwide Canada",
        "fullName": "WOHI Ministries Worldwide Canada in Collaboration With Life-Giving Word Mission Nigeria",
        "mandate": "WINNING SOULS FOR JESUS UNTIL HE COMES",
        "vision": [
            "To raise up a people totally dedicated to Jesus",
            "To win souls evangelizing the world", 
            "To plant Churches and build a family of Ministry",
            "To make Jesus the Center, giving God all the Glory"
        ],
        "mission": "Our Mission Statement is to glorify God in the world and a Community in which people have an opportunity to grow in a strong relationship with Jesus Christ. To preach the gospel from sea to shining sea. Winning souls drawing them to the saving knowledge of Jesus Christ.",
        "leadership": [
            {
                "name": "Apostle Sandra Ross",
                "title": "President & Founder",
                "country": "Canada"
            },
            {
                "name": "Bishop Elect Dr. Lawyer Isiwekpeni Ekpaah, PhD",
                "title": "Vice President",
                "country": "Nigeria"
            },
            {
                "name": "David Murray Ross",
                "title": "Co-Founder",
                "country": "Canada"
            }
        ],
        "representatives": [
            {
                "name": "Apostle Lambert Iku",
                "title": "Director of Mission and Evangelism/National Coordinator UK",
                "country": "United Kingdom"
            },
            {
                "name": "Pastor Darlington Okoro",
                "title": "International Coordinator",
                "country": "Nigeria"
            },
            {
                "name": "Shahbaz Masih",
                "title": "National Coordinator Pakistan",
                "country": "Pakistan"
            }
        ],
        "countries": ["Canada", "Nigeria", "United Kingdom", "Pakistan", "India", "Kenya", "Zambia", "Tanzania"]
    }

@api_router.get("/sermons")
async def get_sermons():
    """Get sermon list"""
    return [
        {
            "id": "1",
            "title": "The Great Commission: Our Mandate",
            "speaker": "Apostle Sandra Ross",
            "date": "2025-01-12",
            "duration": "45 mins",
            "scripture": "Matthew 28:19-20"
        },
        {
            "id": "2",
            "title": "Walking in Faith Through Missions",
            "speaker": "David Murray Ross",
            "date": "2025-01-05",
            "duration": "38 mins",
            "scripture": "Hebrews 11:1"
        },
        {
            "id": "3",
            "title": "Planting and Pruning for Effective Ministry",
            "speaker": "Apostle Sandra Ross",
            "date": "2024-12-29",
            "duration": "42 mins",
            "scripture": "John 15:1-8"
        }
    ]

@api_router.get("/blog-posts")
async def get_blog_posts():
    """Get blog posts"""
    return [
        {
            "id": "1",
            "title": "Walking in Obedience to the Great Commission",
            "excerpt": "As believers, we are called to take the Gospel to every nation. Learn how WOHI is fulfilling this mandate worldwide.",
            "author": "Apostle Sandra Ross",
            "date": "2025-01-15",
            "readTime": "5 min read"
        },
        {
            "id": "2",
            "title": "The Power of Partnership in Missions",
            "excerpt": "Discover how partnering with local ministries amplifies the impact of the Gospel around the world.",
            "author": "David Murray Ross",
            "date": "2025-01-10",
            "readTime": "4 min read"
        },
        {
            "id": "3",
            "title": "Raising Leaders for the Harvest",
            "excerpt": "The fields are white unto harvest, but we need more laborers. Here's how we're training the next generation.",
            "author": "Apostle Sandra Ross",
            "date": "2025-01-08",
            "readTime": "6 min read"
        }
    ]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("startup")
async def startup_event():
    """Initialize database on startup"""
    await init_database()
    logger.info("Database initialized successfully")

@app.on_event("shutdown")
async def shutdown_event():
    """Close database connection on shutdown"""
    await close_database()
    client.close()
    logger.info("Database connection closed")