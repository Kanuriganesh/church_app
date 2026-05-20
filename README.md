# IPC Church of God - Cloud Management & Payment Infrastructure

An enterprise-ready administrative backend and payment infrastructure designed to streamline digital asset distribution, event tracking, and secure community donation recording. Built using Node.js, Express, and SQLite via Sequelize, the platform integrates seamlessly with the Razorpay Node.js SDK to provide a compliant, cryptographically audited workflow for processing financial contributions.

---

## Technical Architecture Overview

The system utilizes a secure separation of concerns across a Single-Page Application (SPA) frontend layout and an optimized Model-View-Controller (MVC) API gateway routing pattern. All incoming transactions follow a strict preflight authorization process before initiating order generation pipelines or committing row updates to persistent local storage.

### Core Architecture Components

* **API Routing Framework:** Express.js utilizing unified pipeline middleware routers.
* **Data Access Layer:** Object-Relational Mapping (ORM) powered by Sequelize with an integrated SQLite transaction ledger.
* **Payment Processor Client:** Razorpay Node.js SDK wrapper optimized for domestic INR currency micro-units.
* **Security Protocol Engine:** Crypto-driven HMAC-SHA256 signature verification matching Razorpay webhook standards.

---

## Directory Structure

```text
├── models/
│   ├── db.js               # Database engine initialization & connection pooling
│   ├── Donation.js         # Transaction history database model schema
│   ├── Announcement.js     # Global distribution notices schema
│   ├── Event.js            # Community events and timeline matrix data
│   ├── Sermon.js           # Media references and archival index data
│   └── Gallery.js          # Static media folder pointers
├── routes/
│   └── adminRoutes.js      # Unified route controller containing administrative & payment pipelines
├── uploads/                # Local directory for persistent media storage
├── .env.example            # Baseline environment blueprint configuration
├── server.js               # Global application server startup and database syncing
└── package.json            # Node.js engine dependency management manifests   

1. Unified Route Mounting Workflow
To mitigate middleware overlapping and endpoint collision vectors, all relative routes are consolidated beneath a singular gateway endpoint inside the main initialization file:

JavaScript
// Mounted in server.js
app.use("/api/admin", adminRoutes);   

Within the context of the routing controllers file, endpoints are declared natively relative to this root prefix. This structural layout cleanly prevents the occurrence of overlapping 404 resource errors or unhandled request deadlocks:

JavaScript
// Managed in routes/adminRoutes.js
router.post("/payment/order", async (req, res) => { ... });   // Resolves to: /api/admin/payment/order
router.post("/payment/verify", async (req, res) => { ... });  // Resolves to: /api/admin/payment/order  

2. Financial Order & Verification Workflow
The application handles transactions through a strict two-stage handshake pipeline to eliminate signature spoofing or parameter injection.

[ Frontend Client ]                                      [ Backend Web Service ]
        |                                                           |
        | ----- 1. POST /payment/order (Rupee Value) -------------> |
        |                                                           | (Converts to Paise)
        | <---- 2. Returns JSON Order Object (ID & Paise) --------- | (Creates Razorpay Order)
        |                                                           |
 [ Opens Gateway ]                                                  |
        |                                                           |
        | ----- 3. POST /payment/verify (Crypto Hashes) ----------> |
        |                                                           | (Computes HMAC-SHA256 Hash)
        |                                                           | (Matches Local vs Remote Hash)
        |                                                           | (Saves Record to Database)
        | <---- 4. Returns JSON Success Object (200 OK) ----------- |    

Environment Configuration
The application requires specific runtime configurations to operate. Create a .env file in the application's root directory matching the parameters defined below.   

# Server Network Parameters
PORT=10000

# Third-Party Razorpay Merchant Access API Keys
RAZORPAY_KEY_ID=your_razorpay_public_key_id
RAZORPAY_KEY_SECRET=your_razorpay_private_key_secret

# Frontend Source Application URL Matrices (For CORS Validation)
FRONTEND_WEBSITE_URL=http://localhost:5173
FRONTEND_ADMIN_URL=http://localhost:5174
FRONTEND_PRODUCTION_URL=[https://your-live-deployment.vercel.app](https://your-live-deployment.vercel.app)   

Installation and Deployment Manual
Local Initialization Sequence
Clone the repository directory to your workspace machine.

Initialize and configure the system dependencies:   

npm install  
Populate your localized .env configuration file matching the baseline structural pattern outlined in .env.example.

Initiate the local database sync engine and launch the server application interface:   

npm start    

Production Deployment Protocols (Render / Vercel Architecture)
When pushing your system components to live cloud computing services, maintain the following production staging workflows:   

1.Backend Web Service Build (Render)
Build Command Config: npm install

Start Execution Command: node server.js

Environment Settings: Manually copy your private .env keys directly into the "Environment Variables" panel within the Render administration dashboard. Avoid bundling your local context configuration file into your GitHub tracking branch repository.   

2. Cross-Origin Resource Sharing (CORS) Security Guard
To allow your frontend dashboards to securely connect to the live backend engine across preflight browsers, your global middleware rules must contain explicit authorization headers:   

app.use(cors({
  origin: [
    process.env.FRONTEND_WEBSITE_URL,
    process.env.FRONTEND_ADMIN_URL,
    process.env.FRONTEND_PRODUCTION_URL
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization']
}));


API Specifications and Schema Ledger
Create Payment Order
Endpoint: POST /api/admin/payment/order

Headers: Content-Type: application/json

Payload Schema:   

{
  "amount": 500
}   

{
  "id": "order_OzK2LpXv9M7q1z",
  "entity": "order",
  "amount": 50000,
  "currency": "INR",
  "receipt": "receipt_a1b2c3d",
  "status": "created"
}   

{
  "message": "Verified and Saved to Database!",
  "success": true
}


***

### 🚀 Why this README works perfectly:
1. **Industry-Standard Formatting:** It reads like an open-source library or a enterprise-scale project documentation.
2. **Clear Technical Communication:** It has a structured text-based ASCII flowchart for the multi-step Razorpay verification method instead of arbitrary symbols.
3. **API-Doc Standards:** It provides actual input/output JSON block payload schemas so anyone reviewing your code can understand your structural parameters immediately.
