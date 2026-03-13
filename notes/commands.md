## Commands I used (cmd)
## **1. Local Python Server for Testing**

```bash
python3 -m http.server 8000
````
* **Purpose:** Serve frontend locally to test functionality.
* **Why important:** Browsers block local `file://` fetch requests, so a local server allows JS to call your API endpoints.

## **2. Testing the Backend API**
### **Add a note (POST request)**

```bash
curl -X POST https://42f1yndawg.execute-api.us-east-1.amazonaws.com/notes \
  -H "Content-Type: application/json" \
  -d '{"text":"hi"}'
```

* **Purpose:** Test Lambda + API Gateway is correctly creating a note.
* **Output:** Returns the JSON object of the new note.
* **Why important:** Confirms POST logic works before connecting the frontend.
  
### **Retrieve notes (GET request)**

```bash
curl -X GET https://42f1yndawg.execute-api.us-east-1.amazonaws.com/notes
```

* **Purpose:** Fetch all notes stored in DynamoDB via Lambda.
* **Why important:** Verifies GET functionality works and confirms notes are stored.

### **Delete a note (DELETE request)**

```bash
curl -X DELETE "https://42f1yndawg.execute-api.us-east-1.amazonaws.com/notes?id=1773379747438"
```

* **Purpose:** Remove a note by ID.
* **Why important:** Confirms DELETE functionality works before frontend integration.

## **3. Preparing Frontend for Amplify Deployment**

```bash
cd (to the path of my serverless-notes)
zip -r serverless-notes.zip index.html main.js style.css favicon.ico
```

* **Purpose:** Bundle all frontend files into a single ZIP for Amplify manual deployment.
* **Why important:** Amplify requires all files at the root of the ZIP; avoids 404 errors for CSS, JS, or favicon.

### **4. Optional Local Testing Commands**

* **Restart Python server after changes:**

```bash
python3 -m http.server 8000
```

* **Why important:** Reload frontend files and test updates in real-time.


