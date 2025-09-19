#!/usr/bin/env python3
"""
WOHI Ministries Backend API Test Suite
Tests all backend API endpoints for functionality and data integrity
"""

import requests
import json
import os
from datetime import datetime
import uuid

# Get backend URL from environment
BACKEND_URL = "https://gracepath.preview.emergentagent.com/api"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'

def print_test_header(test_name):
    print(f"\n{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}Testing: {test_name}{Colors.ENDC}")
    print(f"{Colors.BLUE}{Colors.BOLD}{'='*60}{Colors.ENDC}")

def print_success(message):
    print(f"{Colors.GREEN}✅ {message}{Colors.ENDC}")

def print_error(message):
    print(f"{Colors.RED}❌ {message}{Colors.ENDC}")

def print_warning(message):
    print(f"{Colors.YELLOW}⚠️  {message}{Colors.ENDC}")

def print_info(message):
    print(f"{Colors.BLUE}ℹ️  {message}{Colors.ENDC}")

def test_health_check():
    """Test the health check endpoint"""
    print_test_header("Health Check API")
    
    try:
        response = requests.get(f"{BACKEND_URL}/health", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            print_success(f"Health check passed - Status: {response.status_code}")
            print_info(f"Response: {data}")
            return True
        else:
            print_error(f"Health check failed - Status: {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Health check failed with exception: {str(e)}")
        return False

def test_contact_form_api():
    """Test the contact form API"""
    print_test_header("Contact Form API")
    
    # Test data for different request types
    test_cases = [
        {
            "name": "John Smith",
            "email": "john.smith@example.com",
            "subject": "General Inquiry",
            "message": "I would like to know more about your ministry work.",
            "requestType": "general"
        },
        {
            "name": "Mary Johnson",
            "email": "mary.johnson@example.com", 
            "subject": "Prayer Request",
            "message": "Please pray for my family during this difficult time.",
            "requestType": "prayer"
        },
        {
            "name": "David Wilson",
            "email": "david.wilson@example.com",
            "subject": "Partnership Opportunity",
            "message": "Our church would like to partner with your ministry.",
            "requestType": "partnership"
        }
    ]
    
    success_count = 0
    
    for i, test_data in enumerate(test_cases, 1):
        try:
            print_info(f"Testing contact form submission {i} - {test_data['requestType']}")
            
            response = requests.post(
                f"{BACKEND_URL}/contact/",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"Contact form {i} submitted successfully")
                print_info(f"Submission ID: {data.get('submissionId')}")
                print_info(f"Message: {data.get('message')}")
                success_count += 1
            else:
                print_error(f"Contact form {i} failed - Status: {response.status_code}")
                print_error(f"Response: {response.text}")
                
        except Exception as e:
            print_error(f"Contact form {i} failed with exception: {str(e)}")
    
    print_info(f"Contact form tests: {success_count}/{len(test_cases)} passed")
    return success_count == len(test_cases)

def test_newsletter_api():
    """Test the newsletter subscription API"""
    print_test_header("Newsletter API")
    
    test_email = f"newsletter.test.{uuid.uuid4().hex[:8]}@example.com"
    
    try:
        # Test initial subscription
        print_info("Testing newsletter subscription")
        
        response = requests.post(
            f"{BACKEND_URL}/newsletter/subscribe",
            json={"email": test_email},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            print_success("Newsletter subscription successful")
            print_info(f"Message: {data.get('message')}")
            print_info(f"Email: {data.get('email')}")
        else:
            print_error(f"Newsletter subscription failed - Status: {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
        
        # Test duplicate subscription
        print_info("Testing duplicate subscription")
        
        response2 = requests.post(
            f"{BACKEND_URL}/newsletter/subscribe",
            json={"email": test_email},
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response2.status_code == 200:
            data2 = response2.json()
            print_success("Duplicate subscription handled correctly")
            print_info(f"Message: {data2.get('message')}")
        else:
            print_error(f"Duplicate subscription test failed - Status: {response2.status_code}")
            return False
            
        return True
        
    except Exception as e:
        print_error(f"Newsletter API test failed with exception: {str(e)}")
        return False

def test_events_api():
    """Test the events API"""
    print_test_header("Events API")
    
    try:
        # Test getting events list
        print_info("Testing events list retrieval")
        
        response = requests.get(f"{BACKEND_URL}/events/", timeout=10)
        
        if response.status_code == 200:
            events = response.json()
            print_success(f"Events retrieved successfully - Found {len(events)} events")
            
            for event in events:
                print_info(f"Event: {event.get('title')} - {event.get('date')}")
            
            # Test event registration if events exist
            if events:
                event_id = events[0]["id"]
                test_email = f"event.test.{uuid.uuid4().hex[:8]}@example.com"
                
                print_info(f"Testing event registration for event ID: {event_id}")
                
                registration_data = {
                    "eventId": event_id,
                    "name": "Test Attendee",
                    "email": test_email,
                    "phone": "+1-555-0123",
                    "attendeeCount": 1
                }
                
                reg_response = requests.post(
                    f"{BACKEND_URL}/events/register",
                    json=registration_data,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if reg_response.status_code == 200:
                    reg_data = reg_response.json()
                    print_success("Event registration successful")
                    print_info(f"Registration ID: {reg_data.get('registrationId')}")
                    print_info(f"Message: {reg_data.get('message')}")
                    
                    # Test duplicate registration
                    print_info("Testing duplicate registration prevention")
                    
                    dup_response = requests.post(
                        f"{BACKEND_URL}/events/register",
                        json=registration_data,
                        headers={"Content-Type": "application/json"},
                        timeout=10
                    )
                    
                    if dup_response.status_code == 400:
                        print_success("Duplicate registration prevented correctly")
                    else:
                        print_warning(f"Duplicate registration test - Status: {dup_response.status_code}")
                        
                else:
                    print_error(f"Event registration failed - Status: {reg_response.status_code}")
                    print_error(f"Response: {reg_response.text}")
                    return False
            else:
                print_warning("No events found to test registration")
                
            return True
        else:
            print_error(f"Events retrieval failed - Status: {response.status_code}")
            print_error(f"Response: {response.text}")
            return False
            
    except Exception as e:
        print_error(f"Events API test failed with exception: {str(e)}")
        return False

def test_donations_api():
    """Test the donations API"""
    print_test_header("Donations API")
    
    # Test different donation scenarios
    test_donations = [
        {
            "donorName": "Sarah Thompson",
            "email": f"donor1.{uuid.uuid4().hex[:8]}@example.com",
            "amount": 100.0,
            "currency": "CAD",
            "donationType": "one-time",
            "cause": "general"
        },
        {
            "donorName": "Michael Brown",
            "email": f"donor2.{uuid.uuid4().hex[:8]}@example.com",
            "amount": 50.0,
            "currency": "CAD",
            "donationType": "monthly",
            "cause": "missions"
        },
        {
            "donorName": "Lisa Davis",
            "email": f"donor3.{uuid.uuid4().hex[:8]}@example.com",
            "amount": 25.0,
            "currency": "CAD",
            "donationType": "one-time",
            "cause": "education"
        }
    ]
    
    success_count = 0
    
    for i, donation_data in enumerate(test_donations, 1):
        try:
            print_info(f"Testing donation {i} - ${donation_data['amount']} {donation_data['donationType']} for {donation_data['cause']}")
            
            response = requests.post(
                f"{BACKEND_URL}/donations/intent",
                json=donation_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"Donation {i} processed successfully")
                print_info(f"Donation ID: {data.get('donationId')}")
                print_info(f"Payment Status: {data.get('paymentStatus')}")
                print_info(f"Message: {data.get('message')}")
                success_count += 1
            else:
                print_error(f"Donation {i} failed - Status: {response.status_code}")
                print_error(f"Response: {response.text}")
                
        except Exception as e:
            print_error(f"Donation {i} failed with exception: {str(e)}")
    
    # Test invalid donation amount
    try:
        print_info("Testing invalid donation amount (0)")
        
        invalid_donation = {
            "donorName": "Invalid Donor",
            "email": "invalid@example.com",
            "amount": 0,
            "currency": "CAD",
            "donationType": "one-time",
            "cause": "general"
        }
        
        response = requests.post(
            f"{BACKEND_URL}/donations/intent",
            json=invalid_donation,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        if response.status_code == 400:
            print_success("Invalid donation amount rejected correctly")
        else:
            print_warning(f"Invalid donation test - Status: {response.status_code}")
            
    except Exception as e:
        print_error(f"Invalid donation test failed with exception: {str(e)}")
    
    print_info(f"Donation tests: {success_count}/{len(test_donations)} passed")
    return success_count == len(test_donations)

def test_content_apis():
    """Test the content APIs (ministry-info, sermons, blog-posts)"""
    print_test_header("Content APIs")
    
    content_endpoints = [
        ("ministry-info", "Ministry Information"),
        ("sermons", "Sermons"),
        ("blog-posts", "Blog Posts")
    ]
    
    success_count = 0
    
    for endpoint, name in content_endpoints:
        try:
            print_info(f"Testing {name} endpoint")
            
            response = requests.get(f"{BACKEND_URL}/{endpoint}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"{name} retrieved successfully")
                
                if endpoint == "ministry-info":
                    print_info(f"Ministry: {data.get('name')}")
                    print_info(f"Leadership count: {len(data.get('leadership', []))}")
                elif endpoint == "sermons":
                    print_info(f"Sermons count: {len(data)}")
                    if data:
                        print_info(f"Latest sermon: {data[0].get('title')}")
                elif endpoint == "blog-posts":
                    print_info(f"Blog posts count: {len(data)}")
                    if data:
                        print_info(f"Latest post: {data[0].get('title')}")
                
                success_count += 1
            else:
                print_error(f"{name} failed - Status: {response.status_code}")
                print_error(f"Response: {response.text}")
                
        except Exception as e:
            print_error(f"{name} test failed with exception: {str(e)}")
    
    print_info(f"Content API tests: {success_count}/{len(content_endpoints)} passed")
    return success_count == len(content_endpoints)

def test_prayer_requests_api():
    """Test the prayer requests API"""
    print_test_header("Prayer Requests API")
    
    test_requests = [
        {
            "name": "Anonymous",
            "request": "Please pray for healing in my family",
            "isPrivate": False
        },
        {
            "name": "John Doe",
            "email": f"prayer.{uuid.uuid4().hex[:8]}@example.com",
            "request": "Pray for wisdom in my career decisions",
            "isPrivate": True
        }
    ]
    
    success_count = 0
    
    for i, prayer_data in enumerate(test_requests, 1):
        try:
            print_info(f"Testing prayer request {i} - {'Private' if prayer_data['isPrivate'] else 'Public'}")
            
            response = requests.post(
                f"{BACKEND_URL}/prayer-requests/",
                json=prayer_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                print_success(f"Prayer request {i} submitted successfully")
                print_info(f"Request ID: {data.get('requestId')}")
                print_info(f"Message: {data.get('message')}")
                success_count += 1
            else:
                print_error(f"Prayer request {i} failed - Status: {response.status_code}")
                print_error(f"Response: {response.text}")
                
        except Exception as e:
            print_error(f"Prayer request {i} failed with exception: {str(e)}")
    
    print_info(f"Prayer request tests: {success_count}/{len(test_requests)} passed")
    return success_count == len(test_requests)

def run_all_tests():
    """Run all backend API tests"""
    print(f"{Colors.BOLD}{Colors.BLUE}")
    print("=" * 80)
    print("WOHI MINISTRIES BACKEND API TEST SUITE")
    print("=" * 80)
    print(f"{Colors.ENDC}")
    
    print_info(f"Testing backend at: {BACKEND_URL}")
    print_info(f"Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    # Track test results
    test_results = {}
    
    # Run all tests
    test_results["Health Check"] = test_health_check()
    test_results["Contact Form API"] = test_contact_form_api()
    test_results["Newsletter API"] = test_newsletter_api()
    test_results["Events API"] = test_events_api()
    test_results["Donations API"] = test_donations_api()
    test_results["Content APIs"] = test_content_apis()
    test_results["Prayer Requests API"] = test_prayer_requests_api()
    
    # Print summary
    print(f"\n{Colors.BOLD}{Colors.BLUE}")
    print("=" * 80)
    print("TEST SUMMARY")
    print("=" * 80)
    print(f"{Colors.ENDC}")
    
    passed = 0
    total = len(test_results)
    
    for test_name, result in test_results.items():
        if result:
            print_success(f"{test_name}: PASSED")
            passed += 1
        else:
            print_error(f"{test_name}: FAILED")
    
    print(f"\n{Colors.BOLD}")
    if passed == total:
        print(f"{Colors.GREEN}🎉 ALL TESTS PASSED! ({passed}/{total}){Colors.ENDC}")
    else:
        print(f"{Colors.YELLOW}⚠️  SOME TESTS FAILED ({passed}/{total} passed){Colors.ENDC}")
    
    print_info(f"Test completed at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    return test_results

if __name__ == "__main__":
    results = run_all_tests()