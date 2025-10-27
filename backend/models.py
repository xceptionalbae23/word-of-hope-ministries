from pydantic import BaseModel, Field, EmailStr
from typing import Optional, List
from datetime import datetime
from enum import Enum
import uuid


# Enums for status fields
class ContactRequestType(str, Enum):
    general = "general"
    prayer = "prayer"
    partnership = "partnership"
    missions = "missions"
    education = "education"


class ContactStatus(str, Enum):
    new = "new"
    read = "read"
    responded = "responded"


class SubscriptionStatus(str, Enum):
    active = "active"
    unsubscribed = "unsubscribed"


class DonationType(str, Enum):
    one_time = "one-time"
    monthly = "monthly"


class DonationCause(str, Enum):
    general = "general"
    missions = "missions"
    church_planting = "church-planting"
    education = "education"
    youth = "youth"


class PaymentStatus(str, Enum):
    pending = "pending"
    completed = "completed"
    failed = "failed"


class PrayerRequestStatus(str, Enum):
    pending = "pending"
    praying = "praying"
    answered = "answered"


# Contact Form Models
class ContactSubmissionCreate(BaseModel):
    name: str
    email: EmailStr
    subject: str
    message: str
    requestType: ContactRequestType = ContactRequestType.general


class ContactSubmission(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    subject: str
    message: str
    requestType: ContactRequestType
    status: ContactStatus = ContactStatus.new
    createdAt: datetime = Field(default_factory=datetime.utcnow)
    updatedAt: datetime = Field(default_factory=datetime.utcnow)


# Newsletter Models
class NewsletterSubscriptionCreate(BaseModel):
    email: EmailStr


class NewsletterSubscription(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: str
    status: SubscriptionStatus = SubscriptionStatus.active
    subscribedAt: datetime = Field(default_factory=datetime.utcnow)
    unsubscribedAt: Optional[datetime] = None


# Event Registration Models
class EventRegistrationCreate(BaseModel):
    eventId: str
    name: str
    email: EmailStr
    phone: Optional[str] = None
    attendeeCount: int = 1


class EventRegistration(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    eventId: str
    name: str
    email: str
    phone: Optional[str] = None
    attendeeCount: int
    registeredAt: datetime = Field(default_factory=datetime.utcnow)


# Donation Models
class DonationCreate(BaseModel):
    donorName: str
    email: EmailStr
    amount: float
    currency: str = "CAD"
    donationType: DonationType
    cause: DonationCause


class DonationRecord(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    donorName: str
    email: str
    amount: float
    currency: str
    donationType: DonationType
    cause: DonationCause
    paymentStatus: PaymentStatus = PaymentStatus.pending
    paymentId: Optional[str] = None
    createdAt: datetime = Field(default_factory=datetime.utcnow)


# Prayer Request Models
class PrayerRequestCreate(BaseModel):
    name: str
    email: Optional[EmailStr] = None
    request: str
    isPrivate: bool = False


class PrayerRequest(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: Optional[str] = None
    request: str
    isPrivate: bool
    status: PrayerRequestStatus = PrayerRequestStatus.pending
    createdAt: datetime = Field(default_factory=datetime.utcnow)


# Response Models
class ContactResponse(BaseModel):
    message: str
    submissionId: str


class NewsletterResponse(BaseModel):
    message: str
    email: str


class EventRegistrationResponse(BaseModel):
    message: str
    registrationId: str


class DonationResponse(BaseModel):
    message: str
    donationId: str
    paymentStatus: str


class PrayerResponse(BaseModel):
    message: str
    requestId: str