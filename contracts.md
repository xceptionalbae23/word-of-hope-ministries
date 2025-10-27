# WOHI Ministries Backend Integration Contracts

## Overview
This document outlines the API contracts and integration plan for the WOHI Ministries Worldwide Canada website.

## Current Mock Data (to be replaced)
Located in `/app/frontend/src/mock.js`:
- Ministry information, leadership, representatives
- Events, sermons, blog posts, testimonials
- Contact information and service times

## Database Models Required

### 1. Contact Form Submissions
```javascript
ContactSubmission {
  id: ObjectId,
  name: String (required),
  email: String (required),
  subject: String (required),
  message: String (required),
  requestType: String (enum: ['general', 'prayer', 'partnership', 'missions', 'education']),
  status: String (enum: ['new', 'read', 'responded']),
  createdAt: Date,
  updatedAt: Date
}
```

### 2. Newsletter Subscriptions
```javascript
NewsletterSubscription {
  id: ObjectId,
  email: String (required, unique),
  status: String (enum: ['active', 'unsubscribed']),
  subscribedAt: Date,
  unsubscribedAt: Date
}
```

### 3. Event Registrations
```javascript
EventRegistration {
  id: ObjectId,
  eventId: String (required),
  name: String (required),
  email: String (required),
  phone: String,
  attendeeCount: Number (default: 1),
  registeredAt: Date
}
```

### 4. Donation Records
```javascript
DonationRecord {
  id: ObjectId,
  donorName: String (required),
  email: String (required),
  amount: Number (required),
  currency: String (default: 'CAD'),
  donationType: String (enum: ['one-time', 'monthly']),
  cause: String (enum: ['general', 'missions', 'church-planting', 'education', 'youth']),
  paymentStatus: String (enum: ['pending', 'completed', 'failed']),
  paymentId: String, // For payment processor reference
  createdAt: Date
}
```

### 5. Prayer Requests
```javascript
PrayerRequest {
  id: ObjectId,
  name: String (required),
  email: String,
  request: String (required),
  isPrivate: Boolean (default: false),
  status: String (enum: ['pending', 'praying', 'answered']),
  createdAt: Date
}
```

## API Endpoints to Implement

### Contact Endpoints
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin)
- `PUT /api/contact/:id/status` - Update contact status (admin)

### Newsletter Endpoints
- `POST /api/newsletter/subscribe` - Subscribe to newsletter
- `POST /api/newsletter/unsubscribe` - Unsubscribe from newsletter
- `GET /api/newsletter/subscribers` - Get all subscribers (admin)

### Event Endpoints
- `GET /api/events` - Get all upcoming events
- `POST /api/events/register` - Register for an event
- `GET /api/events/:id/registrations` - Get registrations for event (admin)

### Donation Endpoints
- `POST /api/donations/intent` - Create donation intent (mock for now)
- `POST /api/donations/complete` - Complete donation (mock)
- `GET /api/donations` - Get donation history (admin)

### Prayer Request Endpoints
- `POST /api/prayer-requests` - Submit prayer request
- `GET /api/prayer-requests` - Get public prayer requests
- `PUT /api/prayer-requests/:id/status` - Update prayer status (admin)

### Content Endpoints (Static for now, can be made dynamic later)
- `GET /api/sermons` - Get sermon list
- `GET /api/blog-posts` - Get blog posts
- `GET /api/ministry-info` - Get ministry information

## Frontend Integration Plan

### Forms to Update
1. **Contact Form** (`/app/frontend/src/components/Contact.jsx`)
   - Replace mock alert with actual API call to `POST /api/contact`
   - Add loading states and success/error handling

2. **Newsletter Signup** (`/app/frontend/src/components/Blog.jsx`)
   - Replace mock behavior with `POST /api/newsletter/subscribe`
   - Add email validation and feedback

3. **Event Registration** (`/app/frontend/src/components/Events.jsx`)
   - Add registration modal with form
   - Integrate with `POST /api/events/register`

4. **Donation Form** (`/app/frontend/src/components/Donate.jsx`)
   - Replace mock alert with donation processing
   - Integrate with `POST /api/donations/intent`

### Data Sources to Update
- Replace import from `mock.js` with API calls
- Add loading states for dynamic content
- Implement error handling for failed requests

## Security Considerations
- Input validation and sanitization
- Rate limiting for form submissions
- Email validation for newsletter and contact forms
- Basic admin authentication for viewing submissions

## Next Steps
1. Implement backend models and routes
2. Update frontend components to use real APIs
3. Add proper error handling and loading states
4. Test all form submissions and data flow
5. Add basic admin interface for viewing submissions

## Mock Payment Integration
For donations, we'll implement a mock payment system that:
- Validates donation data
- Stores donation records
- Returns success responses
- Can be easily replaced with real payment processors later

## Email Integration (Future)
- Contact form submissions can trigger email notifications
- Newsletter functionality for sending updates
- Donation confirmation emails