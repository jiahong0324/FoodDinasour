# System Design – Inputs
**Company Name:** Food Dinosaur Sdn. Bhd.  
**System Name:** Food Ordering and Delivery System  
**Document Module:** System Design – Inputs (Task 1, Task 2 & Task 3)

---

## Task 1 : Design Data Input Screen

### 1.1 Overview & Screen Selection
To support daily business operations and transaction processing for **Food Dinosaur Sdn. Bhd.**, the data input screen selected is **"Create Food Order"**. This screen supports business transactions (online order placement and checkout processing) rather than master data maintenance. 

### 1.2 Criteria Compliance & Design Principles
1. **Meaningful Screen Title**: Positioned prominently at the top-left corner as **"Create Food Order"**.
2. **Business Transaction Focus**: Designed specifically to record customer food purchases, item selections, delivery requirements, and payment transactions.
3. **Logical Sequence & Visual Grouping**: Data fields are arranged in visual card containers following a natural left-to-right, top-to-bottom workflow:
   - **Header Section**: Order ID, Order Date & Time.
   - **Section A (Customer & Delivery Information)**: Customer Name, Contact Phone, Delivery Address, Postal Code.
   - **Section B (Restaurant & Order Details)**: Selected Restaurant, Delivery Method, Preferred Delivery Time.
   - **Section C (Order Items List)**: Food Item Code/Name, Unit Price, Quantity, Special Preparation Instructions, Subtotal.
   - **Section D (Payment & Billing Summary)**: Subtotal, SST Tax (8%), Delivery Fee, Promo Code, Payment Method, Total Payable.
4. **Relevance of Displayed Data**: Displays a combination of auto-generated system fields, imported customer profile data, drop-down selection options, and manual entry fields to streamline data input.

---

### 1.3 High-Fidelity Data Input Screen Mockup

![Create Food Order Data Input Screen](C:/Users/jiaho/.gemini/antigravity/brain/392a950a-d116-4bca-a472-fa4640dba723/create_food_order_input_screen_1785593736991.jpg)

---

### 1.4 Wireframe / Visual Screen Specification with Numbered Fields

```
+-------------------------------------------------------------------------------------------------------------------+
|  [FD] FOOD DINOSAUR - ORDER MANAGEMENT                                                         User: Cashier/Admin |
|===================================================================================================================|
|                                                                                                                   |
|  Create Food Order                                                                                                |
|                                                                                                                   |
|  +-----------------------------------------------------+  +----------------------------------------------------+  |
|  | GENERAL INFORMATION                                 |  | RESTAURANT & DELIVERY DETAILS                      |  |
|  | --------------------------------------------------- |  | -------------------------------------------------- |  |
|  | [1] Order ID: [ FD-ORD-20260801-094  ] (Auto)      |  | [7] Restaurant Name: [ Dino Grill (Mid Valley) v ] |  |
|  | [2] Order Date & Time: [ 01/08/2026 14:30  ] (System)  |  | [8] Delivery Method: [ Standard Rider Delivery  v ]|  |
|  +-----------------------------------------------------+  | [9] Preferred Time:  [ 15:00 - 15:30            v ]|  |
|                                                           +----------------------------------------------------+  |
|  +-------------------------------------------------------------------------------------------------------------+  |
|  | CUSTOMER & DELIVERY INFORMATION                                                                             |  |
|  | ----------------------------------------------------------------------------------------------------------- |  |
|  | [3] Customer ID:   [ CUST-88204           ] (Imported)   [4] Contact Phone:   [ 012-3456789             ]   |  |
|  | [5] Delivery Addr: [ No. 12, Jalan Genting Klang, Setapak, 53300 Kuala Lumpur                             ]   |  |
|  | [6] Postal Code:   [ 53300               ]                                                                |  |
|  +-------------------------------------------------------------------------------------------------------------+  |
|                                                                                                                   |
|  +-------------------------------------------------------------------------------------------------------------+  |
|  | ORDER ITEM DETAILS                                                                                          |  |
|  | ----------------------------------------------------------------------------------------------------------- |  |
|  | No. | [10] Food Item Selection            | [11] Unit Price | [12] Qty | [13] Special Instructions | Subtotal |  |
|  | --- | ----------------------------------- | --------------- | -------- | ------------------------- | -------- |  |
|  | 1.  | [ Dino Burger Combo Extra Large  v] | RM 18.50 (Imp)  | [ 2    ] | [ Extra cheese, no onion ] | RM 37.00 |  |
|  | 2.  | [ Dinosaur Iced Lemon Tea        v] | RM  5.00 (Imp)  | [ 2    ] | [ Less ice, 50% sugar    ] | RM 10.00 |  |
|  |                                                                                                             |  |
|  | [+ Add Another Item]                                                                                        |  |
|  +-------------------------------------------------------------------------------------------------------------+  |
|                                                                                                                   |
|  +-------------------------------------------------------------------------------------------------------------+  |
|  | PAYMENT & SUMMARY SECTION                                                                                   |  |
|  | ----------------------------------------------------------------------------------------------------------- |  |
|  | [14] Promo Code: [ DINOSAVE10       ]  [Apply]          Subtotal:              RM 47.00                    |  |
|  | [15] Payment Method: [ Online Banking (FPX) v ]         Service Tax (SST 8%):  RM  3.76                    |  |
|  |                                                         Delivery Fee:          RM  5.00                    |  |
|  |                                                         Discount (10%):       -RM  4.70                    |  |
|  |                                                         -------------------------------------------         |  |
|  |                                                         TOTAL PAYABLE:         RM 51.06                    |  |
|  +-------------------------------------------------------------------------------------------------------------+  |
|                                                                                                                   |
|                                                    [ CANCEL ]   [ SUBMIT & PROCESS ORDER ]                        |  |
+-------------------------------------------------------------------------------------------------------------------+
```

---

## Task 2 : Identify Validation Checks

### 2.1 Rule Summary for Validation Checks
According to system analysis standards:
1. **No Validation Check Required (`None`)**: Data input fields filled via:
   - Scanning devices (e.g. barcode / RFID)
   - System-filled default values (e.g. current date and time)
   - Auto-generated primary keys (e.g. document number / Order ID)
   - Imported data from master files/tables (e.g. customer name, unit prices)
   - Selected data from drop-down pickers / radio buttons
2. **Validation Check Required**: Only data fields entered **manually via keyboard** require explicit validation checks.

---

### 2.2 Table Summary of Validation Checks (ALL 15 Data Fields)

| No. | Field Name | Input Method | Validation Check | Explanation |
| :---: | :--- | :--- | :--- | :--- |
| **1** | Order ID | Auto-generated by system | **None** | Entry of data is auto-generated by the system using a standardized sequence number prefix (e.g. `FD-ORD-YYYYMMDD-XXX`). |
| **2** | Order Date & Time | System-filled default value | **None** | Entry of data is automatically supplied by the system clock upon order creation. |
| **3** | Customer ID | Imported data (from Customer Master / User Session) | **None** | Entry of data is imported automatically when the customer logs in or when an existing profile is selected. |
| **4** | Contact Phone Number | Manual keying | **Format / Pattern Check & Length Check** | Entry of data is via keyboard by hand. The system verifies that the input contains only numeric digits and matches valid Malaysian phone number formats (e.g. 10 to 11 digits starting with `01`). |
| **5** | Delivery Address | Manual keying | **Presence / Requirement Check** | Entry of data is via keyboard by hand. The check ensures the field is not left blank, guaranteeing delivery personnel receive complete address information. |
| **6** | Postal Code | Manual keying | **Range & Length Check** | Entry of data is via keyboard by hand. The check enforces an exact length of 5 numeric digits corresponding to valid Malaysian postcodes (e.g. `10000` to `98859`). |
| **7** | Restaurant Name | Selected data (from drop-down list) | **None** | Entry of data is by selecting an active restaurant partner from a pre-populated system drop-down list. |
| **8** | Delivery Method | Selected data (from radio button / drop-down) | **None** | Entry of data is selected from predefined choices (e.g. Standard Rider Delivery, Express Delivery, Pick-up). |
| **9** | Preferred Delivery Time Window | Selected data (from drop-down list) | **None** | Entry of data is selected from a dropdown list of available delivery time slots. |
| **10** | Food Item Selection | Selected data (from drop-down list) | **None** | Entry of data is selected from the restaurant's active menu drop-down list. |
| **11** | Unit Price | Imported data (from Menu Master Table) | **None** | Entry of data is automatically retrieved from the system's database based on the selected food item code. |
| **12** | Quantity | Manual keying | **Range Check & Data Type Check** | Entry of data is via keyboard by hand. The check ensures the value is a positive integer greater than 0 and within a reasonable limit (e.g. 1 to 99 items per line). |
| **13** | Special Instructions / Notes | Manual keying | **Length Check** | Entry of data is via keyboard by hand. The check restricts input length to a maximum of 150 characters to prevent database overflow and ensure concise instructions for kitchen staff. |
| **14** | Promo Code | Manual keying | **Existence & Validity Check** | Entry of data is via keyboard by hand. The system checks whether the typed string exists in the active promotion table and is within its valid date range. |
| **15** | Payment Method | Selected data (from drop-down list) | **None** | Entry of data is selected from pre-configured payment options (Online Banking / Credit Card / E-Wallet / Cash on Delivery). |

---

### 2.3 In-Depth Explanation of Key Validation Checks

> [!IMPORTANT]
> **Detailed Explanation of Item 12: Quantity Field Validation (Range Check)**  
> **Validation Check:** Range Check (Positive Integer: `1 <= Quantity <= 99`)  
> **Explanation:** The Quantity field relies on manual keyboard keying. Applying a **Range Check** ensures that users cannot submit invalid negative numbers, zero (`0`), or unrealistically high numbers (e.g. `9999`) caused by accidental keystrokes. This enhances data entry accuracy, prevents downstream ordering system crashes, and speeds up input processing by instantly highlighting input errors before submission.

---

## Task 3 : Describe User-Friendliness Features

### 3.1 Annotated User-Friendliness Map

Referring to the **Create Food Order** data input screen designed in Task 1:

- **Feature Indicator 1 (Top & Header Section)**: Automated & Pre-filled Header Information (Order ID `[1]` and Order Date & Time `[2]`).
- **Feature Indicator 2 (Middle Section - Customer & Items)**: Clear Visual Grouping / Card-based Form Layout (`[3]-[6]` for Customer Info; `[10]-[13]` for Order Items).
- **Feature Indicator 3 (Bottom Right Section)**: Auto-calculated Real-Time Billing & Totals Summary (`[14]-[15]`).

---

### 3.2 Description of Two (2) User-Friendly Interface Characteristics

#### Characteristic 1: Logical Form Chunking and Visual Card Grouping
- **Description**: The input screen organizes related data items into distinct, clearly demarcated visual cards (General Information, Customer & Delivery Info, Restaurant & Delivery Details, Order Items, and Payment Summary). 
- **User Benefit**: Grouping fields logically following a natural top-to-bottom reading sequence reduces cognitive overload for operators. Users can scan the screen effortlessly, quickly identifying where specific information belongs without confusion or missed fields.

#### Characteristic 2: Automated Data Entry and Smart Controls (Drop-downs & Pre-filled Fields)
- **Description**: The screen minimizes manual typing by utilizing auto-generated fields (Order ID `[1]`), system-filled timestamps (`[2]`), imported values (Customer ID `[3]`, Unit Price `[11]`), and pre-populated drop-down pickers (Restaurant `[7]`, Delivery Method `[8]`, Food Items `[10]`, Payment Method `[15]`).
- **User Benefit**: Restricting manual typing exclusively to essential unique fields (Phone Number, Address, Quantity) drastically reduces keystrokes, speeds up order creation time, and eliminates common typos or invalid entries, resulting in a fast and error-free user experience.

---
*End of System Design – Inputs Module for Food Dinosaur Sdn. Bhd.*
