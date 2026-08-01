# System Design – Inputs
**Company Name:** Food Dinosaur Sdn. Bhd.  
**System Name:** Food Ordering and Delivery System  
**Document Module:** Activity 10.0 System Design – Inputs (Task 1, Task 2 & Task 3 / Section 10.3)

---

## 10.1 Design Data Input Screen (Task 1)

### Overview & Screen Selection
To support daily transaction processing for **Food Dinosaur Sdn. Bhd.**, the data input screen selected is **"Create Food Order"** (located under the primary navigation module **Create Order** alongside **Manage / Cancel Order** and **Order Tracking / Check-in**).

* **Meaningful Screen Title**: Positioned prominently at the top left-hand corner as **`Create Food Order`**.
* **Business Transaction Focus**: Designed specifically to record customer food purchases, item selections, delivery requirements, payment credentials, and transaction processing rather than maintaining master data (e.g. creating customer master or menu master).

---

### High-Fidelity Wireframe Specification (Create Food Order Screen)

```text
===================================================================================================================
  Food Dinosaur | Food Ordering System    [ Create Order ]   Manage / Cancel Order   Order Tracking    "Now Everyone Can Eat"  [ ? Help ]
===================================================================================================================

  Create Food Order

  +-----------------------------------------------------------------------+  +----------------------------------------------------+
  | | 1. Order Details & Restaurant Selection                             |  | Order Summary & Payment                            |
  | --------------------------------------------------------------------- |  | -------------------------------------------------- |
  | [1] Select Restaurant Outlet         [2] Order Type / Method          |  | Dino Grill (Mid Valley) -> Setapak, KL             |
  | [ Dino Grill (Mid Valley)         v] [ Standard Rider Delivery     v] |  |                                                    |
  |                                                                       |  | [13] Booking / Order Date:     01/08/2026          |
  | [3] Preferred Delivery Date          [4] Preferred Delivery Time      |  | [14] Total Servings / Pax:     2 Items             |
  | [ 01/08/2026                     📅] [ 15:30 PM                     v] |  | -------------------------------------------------- |
  |                                                                       |  | Base Items Subtotal:           RM  47.00          |
  | [5] Number of Portions / Servings:                                    |  | Promo Discount:               -RM   4.70          |
  |     Adult Servings (Standard Portion)       [ 2 ]                     |  | Pre-order Add-ons / Extras:    RM   8.00          |
  |     Child Servings (Kids Meal Portion)      [ 0 ]                     |  | Govt. Tax (SST 8%):            RM   4.02          |
  |     Senior Citizen Servings (Soft Portion)  [ 0 ]                     |  | Delivery Fee:                  RM   5.00          |
  +-----------------------------------------------------------------------+  | -------------------------------------------------- |
  | | 2. Primary Contact Information                                     |  | [15] Payment Method Channel                        |
  | --------------------------------------------------------------------- |  | [ 💳 Credit / Debit Card                         v]|
  | [6] Customer Full Name (User Manual Entry / Account Profile)         |  |                                                    |
  | [ Enter your full name                                               ] |  | [16] Cardholder Name                               |
  |                                                                       |  | [ Enter name on card                              ] |
  | [7] MyKad / Passport Number          [8] Contact Phone Number         |  |                                                    |
  | [ 010324-14-5582                  ]  [ 012-3456789                  ] |  | [17] Card Number (16 Digits)                       |
  |                                                                       |  | [ 4532 1098 7654 3210                            ] |
  | [9] Delivery Address                                                  |  |                                                    |
  | [ No. 12, Jalan Genting Klang, Setapak, 53300 Kuala Lumpur            ] |  | [18] Expiry Date          [19] CVV Code            |
  | +---------------------------------------------------------------------+  | [ 12/28               ]   [ ***                ] |
  | | 3. Delivery Options & Fulfillment Preferences                       |  | -------------------------------------------------- |
  | --------------------------------------------------------------------- |  | [20] Grand Total:              RM 59.32            |
  |   + Item 1 Details                                                    |  | -------------------------------------------------- |
  |   1. [10] Select Food Item & Combo:                                  |  |                                                    |
  |      [ Dino Burger Combo Extra Large (RM 18.50)                     v] |  |          [ Proceed & Pay RM 59.32 🔒 ]             |
  |   2. [11] Select Customization / Add-on:                              |  |                 [ Cancel Request ]                 |
  |      [ Extra Cheddar Cheese (+RM 2.00)                              v] |  |                                                    |
  |   3. [12] Special Preparation Notes & Quantity:                       |  | By continuing, you agree to Food Dinosaur's Terms. |
  |      [ Extra cheese, no onion                                       ]  [ 2 ] | +----------------------------------------------------+
  +-----------------------------------------------------------------------+
```

---

## 10.2 Identify Validation Checks (Task 2)

> [!NOTE]
> **Data Entry Validation Rule (Systems Analysis & Design Standards):**
> 1. Filled through scanning devices (e.g. barcode, RFID readers) $\rightarrow$ **No validation check required**
> 2. System-filled default values (e.g. system clock date & time) $\rightarrow$ **No validation check required**
> 3. Auto-generated by the system (e.g. Document Number / Order ID, primary key) $\rightarrow$ **No validation check required**
> 4. Imported data from another table (e.g. Customer Profile Master) $\rightarrow$ **No validation check required**
> 5. Selected data (e.g. from drop-down list pickers) $\rightarrow$ **No validation check required**
> 
> **Rule Enforcement:** All non-keyboard entry methods listed above DO NOT require validation checks. **Only data fields entered manually via keyboard require validation checks.**

### Table Summary of Validation Checks (ALL 20 Data Fields)

| No. | Field Name | Input Method | Validation Check | Explanation |
| :---: | :--- | :--- | :--- | :--- |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Restaurant Outlet Selection | Selected data (from drop-down list) | **None** | Entry of data is by selecting an active restaurant branch from a drop-down list. |
| **2** | Order Type / Method | Selected data (from drop-down list) | **None** | Entry of data is selected from predefined choices (Standard Rider Delivery, Express, Pick-up). |
| **3** | Preferred Delivery Date | Selected data (from date picker calendar) | **None** | Entry of data is selected using an interactive calendar pop-up picker. |
| **4** | Preferred Delivery Time | Selected data (from drop-down list) | **None** | Entry of data is selected from available time slots. |
| **5** | Number of Portions / Servings | Manual keying | **Range Check & Data Type Check** | Entry of data is via keyboard by hand. The check ensures positive integer input (`0 <= Servings <= 20`). |
| **6** | Customer Name | Imported data (from Customer Master Table) | **None** | Entry of data is automatically populated when the logged-in customer account profile loads. |
| **7** | MyKad / Passport Number | Manual keying | **Format Check & Length Check** | Entry of data is via keyboard by hand. System verifies exactly 12 numeric digits matching NRIC format (`010324-14-5582`). |
| **8** | Contact Phone Number | Manual keying | **Format Check & Length Check** | Entry of data is via keyboard by hand. System verifies numeric input matching valid phone format (`01X-XXXXXXX`). |
| **9** | Delivery Address | Manual keying | **Presence / Requirement Check** | Entry of data is via keyboard by hand. Ensures field is not left blank for complete delivery details. |
| **10** | Food Item Selection | Selected data (from drop-down list) | **None** | Entry of data is selected from the restaurant's digital menu drop-down list. |
| **11** | Customization / Add-on | Selected data (from drop-down list) | **None** | Entry of data is selected from predefined meal add-on choices. |
| **12** | Special Preparation Notes | Manual keying | **Length Check** | Entry of data is via keyboard by hand. Restricts length to maximum 150 characters. |
| **13** | Booking / Order Date | System-filled default value | **None** | Entry of data is automatically supplied by the system clock upon order creation. |
| **14** | Total Servings / Pax | Auto-calculated system field | **None** | Entry of data is auto-computed by adding portion counts. |
| **15** | Payment Method Channel | Selected data (from drop-down list) | **None** | Entry of data is selected from payment options (Credit Card, FPX, E-Wallet, COD). |
| **16** | Cardholder Name | Manual keying | **Presence Check & Data Type Check** | Entry of data is via keyboard by hand. Ensures input contains valid alphabetical characters for payment processing. |
| **17** | Card Number | Manual keying | **Format Check & Length Check** | Entry of data is via keyboard by hand. Checks that input contains exactly 16 numeric digits conforming to Luhn algorithm. |
| **18** | Expiry Date (MM/YY) | Manual keying | **Format Check & Range Check** | Entry of data is via keyboard by hand. Verifies month `01–12` and future expiry year format (`MM/YY`). |
| **19** | CVV Code | Manual keying | **Format Check & Length Check** | Entry of data is via keyboard by hand. Ensures input contains exactly 3 or 4 numeric digits. |
| **20** | Grand Total | Auto-calculated system field | **None** | Entry of data is automatically calculated from item prices, taxes, delivery fees, and discounts. |

---

## 10.3 Describe User-Friendliness Features (Task 3)

### Main Screen (Create Order Page)

#### 1. Ease of Data Entry (Error Prevention via Validation Checks)
**Description:** The system provides built-in data validation checks in order to reduce potential human data entry errors. For example, a dynamic cascading logic is implemented where selecting a restaurant in the **"Select Restaurant Outlet"** drop-down list will automatically filter and update the available items in the **"Food Item Selection"** list. Additionally, a **Limit Check** restricts the **"Preferred Delivery Date"** so past dates cannot be selected. This prevents illogical order scheduling and stops errors at the source.

#### 2. Meaningful Error Messages
**Description:** The system ensures that all errors are reported in a simple, unambiguous, and highly visible manner to guide users in correcting their actions. To achieve this, two crucial dynamic validations are implemented in the food order screen:
* **Business Rule Validation:** If a user attempts to order a **"Child Portion"** without selecting at least one **"Adult"** or **"Senior Citizen"** serving, the system immediately freezes the checkout process and displays a clear red warning:  
  `Error: Child meal portion must be accompanied by at least one Adult or Senior Citizen serving.`
* **Action/Submission Validation:** If a user clicks the **"Proceed to Payment"** button without selecting any items (i.e., 0 food items or Grand Total is RM 0.00), the system intercepts the checkout process and alerts the user via a pop-up:  
  `Error: Please complete your food selection before proceeding to payment.`
* Both targeted messages successfully prevent illogical or empty transactions from being processed and immediately suggest the exact course of action needed to fix the error.

#### 3. Default Values (Automated Inputs)
**Description:** To save time and avoid typographical errors, the primary contact information fields (**Customer Name**, **Passport/MyKad**, and **Contact Number**) are designed as read-only and use default values that are automatically imported from the user's account profile (`PAS-2026-00001`).

#### 4. HELP Facilities (On-screen Help)
**Description:** Based on Systems Analysis & Design (SAD) principles, we have implemented an on-screen HELP facility in the form of a pop-up modal. Users who are unsure how to use the system can click the **`[ ? Help ]`** button in the top navigation bar. This context-sensitive guide explains step-by-step how to fill in delivery details, customize food combos, and apply promo codes, thereby assisting users without them needing to navigate away from the order page.

---

### Payment Page

#### 1. Automated Inputs (Ease of Data Entry)
**Description:** The system automatically imports the **"Grand Total to Pay"** amount directly from the main order screen and sets the field as read-only. By automating this data transfer, the system eliminates the need for users to manually re-type the payable amount, thereby saving time and completely preventing human typographical errors during the crucial checkout process.

#### 2. Meaningful Error Messages
**Description:** To prevent information overload and keep the interface clean, the Credit Card details section (**Card Number**, **Expiry Date**, **CVV**) is hidden by default and will dynamically appear only when the user selects **"Credit / Debit Card"** as their payment method. Furthermore, if a user enters an incomplete card number, the system provides a meaningful and unambiguous error message:  
`Format Error: Credit Card Number must be exactly 16 digits`, explicitly guiding the user on how to correct the mistake.

---

### Cancel / Refund Page

#### 1. Pull-Down List
**Description:** The screen utilizes pull-down lists for the **"Select Action"** and **"Reason Category"** fields. This allows users to easily select acceptable or approved values from a predefined list instead of manually typing them out, which drastically speeds up data entry and eliminates spelling errors.

#### 2. Auto-filled (Default Values)
**Description:** After the Order Reference Number (`FD-ORD-20260801-094`) is searched, the **"Customer Name"** and **"Order Details"** fields are auto-imported and set to a read-only state. This saves the user from re-entering existing information and prevents accidental modification of critical database records, enhancing the overall ease of data entry.

---

### Check-In & Tracking Page

#### 1. Checked Boxes
**Description:** The **"Health & Food Hygiene Safety Declaration"** section utilizes a checkbox interface. This provides a quick and effortless way for customers to acknowledge and agree to mandatory safety rules and contactless delivery drop-off without needing to type out a formal declaration, making the interface highly user-friendly.

#### 2. Input Guidance and Error Prevention (Auto-Capitalization)
**Description:** The text input fields for **"Order Number"** and **"Promo Code"** are embedded with an auto-capitalization feature (converting all inputs to uppercase). Along with clear placeholder hints (e.g., `Hint: DINOSAVE10` or `FD-ORD-20260801-094`), this prevents case-sensitive data entry errors and makes the interface more forgiving and intuitive for the users.

---
*End of System Design – Inputs Module (Section 10.3 User-Friendliness Features) for Food Dinosaur Sdn. Bhd.*
