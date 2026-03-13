# Serverless Notes — Console Steps

This document summarizes all actions taken inside the AWS Console to set up the Serverless Notes app, including the CHALLENGES faced and solutions applied.

## DynamoDB Table Setup
- **Action:** Created a table called `notes-table` in DynamoDB.
- **Configuration:**
  - Partition key: `id` (string)
  - No sort key
  - On-demand capacity mode
- **Purpose:** Store all notes for the app in a serverless database.
- **Challenge:** None at this stage.
- **Lesson Learned:** DynamoDB is fully serverless, scales automatically, and is free under low usage.

## Lambda Function Setup
- **Action:** Created a Lambda function using Node.js runtime.
- **Purpose:** Handle backend logic for adding, deleting, and fetching notes.
- **Key Features Implemented:**
  - Handles HTTP methods: `GET`, `POST`, `DELETE`, `OPTIONS`
  - Integrates with DynamoDB using AWS SDK
  - CORS headers added for frontend access
- **Challenges & Solutions:**
  - **CORS Errors:**  
     - Initial frontend requests failed due to `Access-Control-Allow-Origin missing`.  
     - **Solution:** Added CORS headers (`Access-Control-Allow-Origin`, `Allow-Headers`, `Allow-Methods`) in Lambda response for all methods including `OPTIONS`.
  - **Trailing Slash Issue:**  
     - Frontend had an extra `/` in the fetch URL - returned 404.  
     - **Solution:** Removed trailing slash in `API_URL + "/notes"`.
- **Lesson Learned:** Correct CORS setup is critical for browser-based apps, always test with both POST and GET requests from frontend.

## API Gateway Setup

- **Action:** Created an HTTP API to expose Lambda endpoints.
- **Purpose:** Provide a stable, accessible URL for frontend requests.
- **Key Steps:**
  - Defined routes `/notes` for `GET`, `POST`, `DELETE`, `OPTIONS`
  - Linked routes to Lambda function
  - Enabled CORS in API Gateway
- **Challenges & Solutions:**
  - **OPTIONS Method Missing:**  
     - Preflight requests blocked by browser.  
     - **Solution:** Added `OPTIONS` method in API Gateway pointing to Lambda with proper CORS headers.
- **Lesson Learned:** API Gateway stages must be correctly deployed; OPTIONS method is required for frontend fetch requests.

## Frontend Deployment via Amplify

- **Action:** Deployed frontend manually using AWS Amplify.
- **Purpose:** Host the static website and connect it to API Gateway backend.
- **Steps:**
  - Prepared `index.html`, `main.js`, `style.css`, `favicon.ico`
  - Drag-and-dropped ZIP file in Amplify
  - Verified live URL
- **Challenges & Solutions:**
  - **CSS/JS Not Loading / 404 Errors:**  
     - Amplify expected files at the root of the ZIP, but initial folder had subfolders (`favicon_io`) - CSS and JS were not found.  
     - **Solution:** Moved all files to root of ZIP and redeployed.
  - **Favicon 404:**  
     - Browser requested `/favicon.ico` - initially returned 404.  
     - **Solution:** Placed `favicon.ico` in root and linked in `<head>` of HTML.
- **Lesson Learned:** Always zip files at root level for Amplify; missing favicon only triggers a console 404 but does not break functionality.

## 5. Testing and Verification

- **Action:** Verified the app by performing the following:
  - Adding notes
  - Deleting notes
  - Refreshing notes list
  - Observing DynamoDB items update
- **Purpose:** Ensure app is fully functional.
- **Challenges & Solutions:**
  - **Frontend requests failing locally (CORS / file:// issue):**  
     - Initially opened `index.html` directly - browser blocked fetch requests.  
     - **Solution:** Ran `python3 -m http.server` locally to serve frontend over HTTP.
- **Lesson Learned:** Browsers enforce CORS and origin policies; a local server simulates a real HTTP environment.

## Key Learnings from the Project

1. **Serverless Workflow:** Learned how Lambda, API Gateway, DynamoDB, and Amplify interact to create a full serverless stack.  
2. **CORS Handling:** Always handle OPTIONS preflight requests in Lambda for browser-based apps.  
3. **Amplify Deployment:** Frontend files must be zipped at the root; subfolders can break CSS/JS links.  
4. **Backend Testing:** Using `curl` commands is an essential step to verify API endpoints before connecting the frontend.  
5. **DynamoDB Exploration:** All notes are visible in “Explore Items”; changes reflect in real-time after refresh.
