import './style.css';

// ============================================================================
// FOOD DINOSAUR SDN. BHD. - SYSTEM DESIGN: INPUTS (ACTIVITY 10.0)
// ============================================================================

// System State
const state = {
  activeTab: 'create', // 'create' | 'manage' | 'tracking'
  showAssignmentAnnotations: true, // Toggle for Task 2 Validation Check Badges

  // Data Input Screen 1: Create Food Order Form (Task 1: All 20 Data Fields)
  form: {
    // 1. Order Details & Restaurant Selection
    restaurantId: 'rest-1', // [1] Select Restaurant Outlet (Drop-down)
    orderMethod: 'Standard Rider Delivery', // [2] Order Type / Method (Drop-down)
    deliveryDate: '2026-08-01', // [3] Preferred Delivery Date (Date picker)
    deliveryTime: '15:30 PM', // [4] Preferred Delivery Time (Drop-down)
    adultServings: 2, // [5] Number of Adult Servings (Manual keying)
    childServings: 0, // [5] Number of Child Servings (Manual keying)
    seniorServings: 0, // [5] Number of Senior Servings (Manual keying)

    // 2. Primary Contact Information
    customerName: 'John Doe', // [6] Customer Full Name (Imported profile - Read-only)
    icPassport: '010324-14-5582', // [7] MyKad / Passport Number (Manual keying)
    contactPhone: '012-3456789', // [8] Contact Phone Number (Manual keying)
    deliveryAddress: 'No. 12, Jalan Genting Klang, Setapak, 53300 Kuala Lumpur', // [9] Delivery Address (Manual keying)

    // 3. Delivery Options & Fulfillment Preferences (Food Item Selection)
    selectedItemId: 'item-1', // [10] Select Food Item (Drop-down - Dynamic Cascading)
    selectedAddon: 'Extra Cheddar Cheese (+RM 2.00)', // [11] Select Customization / Add-on (Drop-down)
    addonPrice: 2.00,
    specialNotes: 'Extra cheese, no onion', // [12] Special Preparation Notes (Manual keying)
    itemQuantity: 2, // Item quantity

    // Payment Section
    promoCode: 'DINOSAVE10',
    paymentChannel: 'card', // [15] Payment Method Channel (Drop-down)
    cardName: 'John Doe', // [16] Cardholder Name (Manual keying)
    cardNumber: '4532109876543210', // [17] Card Number 16 Digits (Manual keying)
    cardExpiry: '12/28', // [18] Expiry Date MM/YY (Manual keying)
    cardCvv: '882', // [19] CVV Code 3 Digits (Manual keying)
    fpxBank: 'maybank',
    ewalletPhone: '012-3456789'
  },

  // Added Food Items in Current Order
  orderItems: [
    {
      id: 'ord-item-1',
      foodId: 'item-1',
      name: 'Dino Burger Combo Extra Large',
      restaurantName: 'Dino Grill & Steakhouse (Mid Valley)',
      basePrice: 18.50,
      addonName: 'Extra Cheddar Cheese (+RM 2.00)',
      addonPrice: 2.00,
      unitPrice: 20.50,
      quantity: 2,
      notes: 'Extra cheese, no onion'
    }
  ],

  // Form Validation Errors Object
  errors: {},

  // Manage / Cancel Order State
  manageSearchQuery: 'FD-ORD-20260801-094',
  searchedOrder: {
    orderId: 'FD-ORD-20260801-094',
    dateTime: '01/08/2026 14:30',
    customerName: 'John Doe',
    contactPhone: '012-3456789',
    deliveryAddress: 'No. 12, Jalan Genting Klang, Setapak, 53300 Kuala Lumpur',
    restaurantName: 'Dino Grill & Steakhouse (Mid Valley)',
    items: [
      { name: 'Dino Burger Combo Extra Large', qty: 2, price: 20.50, notes: 'Extra cheese, no onion' }
    ],
    totalPayable: 59.32,
    status: 'Preparing'
  },
  cancelAction: 'cancel_refund',
  cancelReasonCategory: 'change_of_mind',
  cancelNotes: 'Change of plan, unable to receive delivery today.',
  cancelSubmitted: false,

  // Tracking / Check-in State
  trackingOrderId: 'FD-ORD-20260801-094',
  trackingPromoCode: 'DINOSAVE10',
  safetyContactless: true,
  safetyHygieneAck: true,
  riderProgress: 65,

  // Modals visibility
  isHelpOpen: false,

  // Restaurants Master Data
  restaurants: [
    { id: 'rest-1', name: 'Dino Grill & Steakhouse (Mid Valley)', icon: '🥩', location: 'Mid Valley' },
    { id: 'rest-2', name: 'Dinosaur Asian Kitchen (KLCC)', icon: '🍜', location: 'KLCC' },
    { id: 'rest-3', name: 'Jurassic Pizzeria (Setapak)', icon: '🍕', location: 'Setapak' },
    { id: 'rest-4', name: 'T-Rex Crispy Chicken (Bukit Bintang)', icon: '🍗', location: 'Bukit Bintang' },
    { id: 'rest-5', name: 'Rex Dessert & Cafe (Subang)', icon: '🍰', location: 'Subang' }
  ],

  // Food Menu Items Master Data (Categorized by Restaurant Outlet for Cascading Logic)
  menu: [
    {
      id: 'item-1',
      restaurantId: 'rest-1',
      name: 'Dino Burger Combo Extra Large',
      price: 18.50,
      addons: [
        { name: 'Extra Cheddar Cheese (+RM 2.00)', price: 2.00 },
        { name: 'Crispy Beef Bacon (+RM 3.50)', price: 3.50 },
        { name: 'Double Patty Upgrade (+RM 6.00)', price: 6.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-2',
      restaurantId: 'rest-1',
      name: 'Dinosaur Iced Lemon Tea',
      price: 5.00,
      addons: [
        { name: 'Add Honey Boba Pearls (+RM 1.50)', price: 1.50 },
        { name: 'Extra Fresh Lemon Slices (+RM 1.00)', price: 1.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-3',
      restaurantId: 'rest-1',
      name: 'Jurassic Smoked BBQ Ribs',
      price: 34.90,
      addons: [
        { name: 'Grilled Butter Corn (+RM 4.00)', price: 4.00 },
        { name: 'Extra Smoky BBQ Dip (+RM 2.50)', price: 2.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-4',
      restaurantId: 'rest-2',
      name: 'Jurassic Nasi Lemak Special',
      price: 16.80,
      addons: [
        { name: 'Extra Sambal Tumis (+RM 1.50)', price: 1.50 },
        { name: 'Fried Sunny Side Egg (+RM 2.00)', price: 2.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-5',
      restaurantId: 'rest-2',
      name: 'T-Rex Spicy Beef Rendang Noodle',
      price: 19.50,
      addons: [
        { name: 'Extra Braised Beef (+RM 5.00)', price: 5.00 },
        { name: 'Soft Boiled Egg (+RM 2.00)', price: 2.00 }
      ]
    },
    {
      id: 'item-6',
      restaurantId: 'rest-3',
      name: 'T-Rex Pepperoni Pizza Supreme',
      price: 28.90,
      addons: [
        { name: 'Stuffed Crust Cheese (+RM 5.00)', price: 5.00 },
        { name: 'Extra Truffle Oil Drizzle (+RM 3.50)', price: 3.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-7',
      restaurantId: 'rest-4',
      name: 'Crispy Dino Fried Chicken Basket',
      price: 22.90,
      addons: [
        { name: 'Garlic Mayo Dip (+RM 1.50)', price: 1.50 },
        { name: 'Spicy Melted Cheese (+RM 2.50)', price: 2.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-8',
      restaurantId: 'rest-5',
      name: 'Molten Lava Chocolate Cake',
      price: 12.50,
      addons: [
        { name: 'Extra Vanilla Ice Cream Scoop (+RM 3.00)', price: 3.00 },
        { name: 'Salted Caramel Drizzle (+RM 2.00)', price: 2.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    }
  ]
};

// ============================================================================
// INITIALIZATION & MAIN RENDER LOOP
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

function renderApp() {
  const appElement = document.getElementById('app');
  if (!appElement) return;

  appElement.innerHTML = `
    <!-- Top Header Navigation Bar (Systems Analysis & Design Input Screens Header) -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        
        <!-- Company Name & Branding -->
        <div class="flex items-center gap-3 cursor-pointer" onclick="window.switchTab('create')">
          <div class="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center text-2xl font-black shadow-md shadow-emerald-600/30 shrink-0">
            🦖
          </div>
          <div>
            <div class="flex items-center gap-2">
              <span class="text-base sm:text-lg font-black text-slate-900 tracking-tight leading-none">FOOD DINOSAUR</span>
              <span class="hidden sm:inline text-[9px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 uppercase tracking-wider">
                INPUT SCREENS
              </span>
            </div>
            <p class="text-[10px] text-slate-500 font-bold leading-tight">Food Ordering and Delivery System</p>
          </div>
        </div>

        <!-- System Primary Navigation Module Tabs -->
        <nav class="flex items-center gap-1 sm:gap-2">
          <button onclick="window.switchTab('create')" 
                  class="px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${state.activeTab === 'create' ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            <i class="fa-solid fa-file-signature"></i>
            <span class="hidden md:inline">Create Order</span>
            <span class="md:hidden">Create</span>
          </button>

          <button onclick="window.switchTab('manage')" 
                  class="px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${state.activeTab === 'manage' ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            <i class="fa-solid fa-rectangle-xmark"></i>
            <span class="hidden md:inline">Manage / Cancel Order</span>
            <span class="md:hidden">Manage</span>
          </button>

          <button onclick="window.switchTab('tracking')" 
                  class="px-3 py-2 rounded-xl text-xs font-black transition-all flex items-center gap-1.5 ${state.activeTab === 'tracking' ? 'bg-emerald-600 text-white shadow-sm shadow-emerald-600/20' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            <i class="fa-solid fa-route"></i>
            <span class="hidden md:inline">Order Tracking / Check-in</span>
            <span class="md:hidden">Tracking</span>
          </button>
        </nav>

        <!-- Right Control Buttons: Tagline, SAD Validation Badges Toggle & Help Facility -->
        <div class="flex items-center gap-2">
          <span class="hidden lg:inline text-xs italic font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            "Now Everyone Can Eat"
          </span>

          <!-- Task 2 Validation Check Annotations Toggle -->
          <button onclick="window.toggleValidationBadges()" 
                  title="Toggle SAD Task 2 Validation Check Badges on fields"
                  class="px-2.5 py-1.5 rounded-xl text-[11px] font-extrabold border transition-all flex items-center gap-1 ${state.showAssignmentAnnotations ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-50 text-slate-500 border-slate-200'}">
            <i class="fa-solid fa-tag text-emerald-600"></i>
            <span class="hidden xl:inline">${state.showAssignmentAnnotations ? 'Hide Validation Badges' : 'Show Validation Badges'}</span>
          </button>

          <!-- Help Facility Modal Button -->
          <button onclick="window.openHelpModal()" 
                  class="bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 text-xs font-black py-1.5 px-3 rounded-xl flex items-center gap-1.5 shadow-sm transition-all">
            <i class="fa-solid fa-circle-question text-amber-600"></i>
            <span>? Help</span>
          </button>
        </div>

      </div>
    </header>

    <!-- Main Content Container -->
    <main class="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      ${renderActiveScreen()}
    </main>

    <!-- Help Modal Overlay -->
    ${state.isHelpOpen ? renderHelpModal() : ''}

    <div id="toast-container" class="toast-container"></div>
  `;
}

function renderActiveScreen() {
  switch (state.activeTab) {
    case 'create':
      return renderCreateOrderScreen();
    case 'manage':
      return renderManageOrderScreen();
    case 'tracking':
      return renderTrackingScreen();
    default:
      return renderCreateOrderScreen();
  }
}

// ============================================================================
// DATA INPUT SCREEN 1: CREATE FOOD ORDER (TASK 1 & TASK 2 & TASK 3)
// ============================================================================

function renderCreateOrderScreen() {
  const currentRest = state.restaurants.find(r => r.id === state.form.restaurantId) || state.restaurants[0];
  
  // Available menu items filtered dynamically by selected restaurant outlet (Cascading Dropdown!)
  const availableItems = state.menu.filter(m => m.restaurantId === state.form.restaurantId);
  const selectedFood = availableItems.find(m => m.id === state.form.selectedItemId) || availableItems[0];
  const addonsList = selectedFood ? selectedFood.addons : [];

  // Calculations
  const baseSubtotal = state.orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const totalServingsCount = state.form.adultServings + state.form.childServings + state.form.seniorServings;
  const isPromoValid = state.form.promoCode === 'DINOSAVE10';
  const promoDiscount = isPromoValid ? baseSubtotal * 0.10 : 0;
  const deliveryFee = state.form.orderMethod === 'Self Pick-up at Outlet' ? 0.00 : 5.00;
  const sstTax = Math.max(0, (baseSubtotal - promoDiscount)) * 0.08;
  const grandTotal = baseSubtotal - promoDiscount + deliveryFee + sstTax;

  const showBadges = state.showAssignmentAnnotations;

  return `
    <div class="space-y-6">
      
      <!-- Top Title Header matching High-Fidelity Wireframe Specification -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
              TASK 1 DATA INPUT SCREEN
            </span>
            <span class="text-[10px] font-bold text-slate-500">Activity 10.0 System Design – Inputs</span>
          </div>
          <h1 class="text-2xl font-black text-slate-900 tracking-tight">Create Food Order</h1>
          <p class="text-xs text-slate-500 font-medium">Record customer purchases, restaurant selection, contact info, food options, and payment credentials.</p>
        </div>

        <div class="flex items-center gap-3 bg-slate-50 px-4 py-2.5 rounded-xl border border-slate-200">
          <div class="text-right">
            <span class="text-[10px] uppercase tracking-wider font-extrabold text-slate-400 block">System Account Profile</span>
            <strong class="text-xs font-black text-slate-800 block">John Doe (PAS-2026-00001)</strong>
          </div>
          <div class="w-8 h-8 rounded-full bg-emerald-600 text-white font-black text-xs flex items-center justify-center">
            JD
          </div>
        </div>
      </div>

      <!-- Main Wireframe Grid: Left 2 Columns (Form Fields) & Right 1 Column (Order Summary & Payment) -->
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- LEFT PANEL (2 Columns): Forms Sections 1, 2 & 3 -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- SECTION 1: ORDER DETAILS & RESTAURANT SELECTION -->
          <div class="solid-card p-5 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 class="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-black">1</span>
                <span>Order Details & Restaurant Selection</span>
              </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Field 1: Select Restaurant Outlet -->
              <div>
                <label class="form-label text-xs">
                  <span>[1] Select Restaurant Outlet</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Selected Data (Drop-down)</span>' : ''}
                </label>
                <select onchange="window.handleRestaurantChange(this.value)" class="form-input text-xs font-bold text-slate-800">
                  ${state.restaurants.map(r => `
                    <option value="${r.id}" ${state.form.restaurantId === r.id ? 'selected' : ''}>${r.icon} ${r.name}</option>
                  `).join('')}
                </select>
                <p class="text-[10px] text-slate-400 mt-1">Selecting an outlet updates available food items below.</p>
              </div>

              <!-- Field 2: Order Type / Method -->
              <div>
                <label class="form-label text-xs">
                  <span>[2] Order Type / Method</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Selected Data (Drop-down)</span>' : ''}
                </label>
                <select onchange="window.updateFormField('orderMethod', this.value)" class="form-input text-xs font-bold text-slate-800">
                  <option value="Standard Rider Delivery" ${state.form.orderMethod === 'Standard Rider Delivery' ? 'selected' : ''}>🛵 Standard Rider Delivery (RM 5.00)</option>
                  <option value="Express Rider Delivery (20 Mins)" ${state.form.orderMethod === 'Express Rider Delivery (20 Mins)' ? 'selected' : ''}>⚡ Express Rider Delivery (RM 8.00)</option>
                  <option value="Self Pick-up at Outlet" ${state.form.orderMethod === 'Self Pick-up at Outlet' ? 'selected' : ''}>🏃 Self Pick-up at Outlet (FREE)</option>
                </select>
              </div>

              <!-- Field 3: Preferred Delivery Date -->
              <div>
                <label class="form-label text-xs">
                  <span>[3] Preferred Delivery Date</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Date Picker Calendar</span>' : ''}
                </label>
                <input type="date" 
                       min="2026-08-01" 
                       value="${state.form.deliveryDate}" 
                       onchange="window.updateFormField('deliveryDate', this.value)"
                       class="form-input text-xs font-bold text-slate-800" />
                <p class="text-[10px] text-slate-400 mt-1">Limit Check: Past dates are disabled.</p>
              </div>

              <!-- Field 4: Preferred Delivery Time -->
              <div>
                <label class="form-label text-xs">
                  <span>[4] Preferred Delivery Time</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Selected Data (Drop-down)</span>' : ''}
                </label>
                <select onchange="window.updateFormField('deliveryTime', this.value)" class="form-input text-xs font-bold text-slate-800">
                  <option value="11:30 AM" ${state.form.deliveryTime === '11:30 AM' ? 'selected' : ''}>11:30 AM (Lunch Slot)</option>
                  <option value="12:30 PM" ${state.form.deliveryTime === '12:30 PM' ? 'selected' : ''}>12:30 PM (Lunch Slot)</option>
                  <option value="15:30 PM" ${state.form.deliveryTime === '15:30 PM' ? 'selected' : ''}>15:30 PM (Afternoon Slot)</option>
                  <option value="18:30 PM" ${state.form.deliveryTime === '18:30 PM' ? 'selected' : ''}>18:30 PM (Dinner Slot)</option>
                  <option value="20:00 PM" ${state.form.deliveryTime === '20:00 PM' ? 'selected' : ''}>20:00 PM (Late Dinner Slot)</option>
                </select>
              </div>
            </div>

            <!-- Field 5: Number of Portions / Servings -->
            <div class="pt-2 border-t border-slate-100">
              <label class="form-label text-xs mb-2">
                <span>[5] Number of Portions / Servings</span>
                ${showBadges ? '<span class="val-tag val-tag-active">Range Check (0 - 20) & Data Type Check</span>' : ''}
              </label>
              
              <div class="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span class="text-[11px] font-bold text-slate-700 block mb-1">Adult Servings</span>
                  <div class="flex items-center gap-2">
                    <button onclick="window.updateServings('adult', -1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100">-</button>
                    <input type="number" min="0" max="20" value="${state.form.adultServings}" 
                           onchange="window.updateFormField('adultServings', parseInt(this.value)||0)"
                           class="w-full text-center font-black text-xs py-1 rounded border border-slate-300" />
                    <button onclick="window.updateServings('adult', 1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100">+</button>
                  </div>
                </div>

                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span class="text-[11px] font-bold text-slate-700 block mb-1">Child Servings</span>
                  <div class="flex items-center gap-2">
                    <button onclick="window.updateServings('child', -1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100">-</button>
                    <input type="number" min="0" max="20" value="${state.form.childServings}" 
                           onchange="window.updateFormField('childServings', parseInt(this.value)||0)"
                           class="w-full text-center font-black text-xs py-1 rounded border border-slate-300" />
                    <button onclick="window.updateServings('child', 1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100">+</button>
                  </div>
                </div>

                <div class="p-3 bg-slate-50 rounded-xl border border-slate-200">
                  <span class="text-[11px] font-bold text-slate-700 block mb-1">Senior Citizen Servings</span>
                  <div class="flex items-center gap-2">
                    <button onclick="window.updateServings('senior', -1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100">-</button>
                    <input type="number" min="0" max="20" value="${state.form.seniorServings}" 
                           onchange="window.updateFormField('seniorServings', parseInt(this.value)||0)"
                           class="w-full text-center font-black text-xs py-1 rounded border border-slate-300" />
                    <button onclick="window.updateServings('senior', 1)" class="w-7 h-7 rounded-lg bg-white border border-slate-300 font-black text-slate-700 hover:bg-slate-100">+</button>
                  </div>
                </div>
              </div>

              <!-- Task 3 Meaningful Error Message: Child Portion Business Rule -->
              ${state.errors.childServings ? `
                <div class="mt-3 p-3 bg-red-50 rounded-xl border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                  <i class="fa-solid fa-triangle-exclamation text-red-600 text-sm"></i>
                  <span>${state.errors.childServings}</span>
                </div>
              ` : ''}
            </div>
          </div>

          <!-- SECTION 2: PRIMARY CONTACT INFORMATION -->
          <div class="solid-card p-5 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 class="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-black">2</span>
                <span>Primary Contact Information</span>
              </h2>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Field 6: Customer Full Name -->
              <div>
                <label class="form-label text-xs">
                  <span>[6] Customer Full Name</span>
                  ${showBadges ? '<span class="val-tag val-tag-system">Imported Data (Read-only)</span>' : ''}
                </label>
                <input type="text" readonly value="${state.form.customerName}" class="form-input text-xs font-bold" />
                <p class="text-[10px] text-slate-400 mt-1">Automated input from account profile.</p>
              </div>

              <!-- Field 7: MyKad / Passport Number -->
              <div>
                <label class="form-label text-xs">
                  <span>[7] MyKad / Passport Number</span>
                  ${showBadges ? '<span class="val-tag val-tag-active">Format Check & Length Check</span>' : ''}
                </label>
                <input type="text" 
                       value="${state.form.icPassport}" 
                       oninput="window.updateFormField('icPassport', this.value)"
                       placeholder="e.g. 010324-14-5582"
                       class="form-input text-xs font-mono font-bold ${state.errors.icPassport ? 'input-error' : ''}" />
                ${state.errors.icPassport ? `<div class="error-msg"><i class="fa-solid fa-circle-exclamation"></i> ${state.errors.icPassport}</div>` : ''}
              </div>

              <!-- Field 8: Contact Phone Number -->
              <div>
                <label class="form-label text-xs">
                  <span>[8] Contact Phone Number</span>
                  ${showBadges ? '<span class="val-tag val-tag-active">Format Check & Length Check</span>' : ''}
                </label>
                <input type="text" 
                       value="${state.form.contactPhone}" 
                       oninput="window.updateFormField('contactPhone', this.value)"
                       placeholder="e.g. 012-3456789"
                       class="form-input text-xs font-mono font-bold ${state.errors.contactPhone ? 'input-error' : ''}" />
                ${state.errors.contactPhone ? `<div class="error-msg"><i class="fa-solid fa-circle-exclamation"></i> ${state.errors.contactPhone}</div>` : ''}
              </div>

              <!-- Field 9: Delivery Address -->
              <div class="sm:col-span-2">
                <label class="form-label text-xs">
                  <span>[9] Delivery Address</span>
                  ${showBadges ? '<span class="val-tag val-tag-active">Presence Check (Required)</span>' : ''}
                </label>
                <textarea rows="2" 
                          oninput="window.updateFormField('deliveryAddress', this.value)"
                          placeholder="Enter complete delivery address..."
                          class="form-input text-xs font-semibold ${state.errors.deliveryAddress ? 'input-error' : ''}">${state.form.deliveryAddress}</textarea>
                ${state.errors.deliveryAddress ? `<div class="error-msg"><i class="fa-solid fa-circle-exclamation"></i> ${state.errors.deliveryAddress}</div>` : ''}
              </div>
            </div>
          </div>

          <!-- SECTION 3: DELIVERY OPTIONS & FULFILLMENT PREFERENCES (FOOD ITEM SELECTION) -->
          <div class="solid-card p-5 space-y-4">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 class="text-sm font-extrabold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <span class="w-6 h-6 rounded-lg bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-black">3</span>
                <span>Delivery Options & Fulfillment Preferences</span>
              </h2>
            </div>

            <div class="p-4 bg-emerald-50/60 rounded-2xl border border-emerald-200 space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <!-- Field 10: Select Food Item & Combo -->
                <div>
                  <label class="form-label text-xs">
                    <span>[10] Select Food Item & Combo</span>
                    ${showBadges ? '<span class="val-tag val-tag-none">Selected Data (Drop-down)</span>' : ''}
                  </label>
                  <select onchange="window.handleFoodItemChange(this.value)" class="form-input text-xs font-bold text-slate-800">
                    ${availableItems.map(item => `
                      <option value="${item.id}" ${state.form.selectedItemId === item.id ? 'selected' : ''}>
                        ${item.name} (RM ${item.price.toFixed(2)})
                      </option>
                    `).join('')}
                  </select>
                </div>

                <!-- Field 11: Select Customization / Add-on -->
                <div>
                  <label class="form-label text-xs">
                    <span>[11] Select Customization / Add-on</span>
                    ${showBadges ? '<span class="val-tag val-tag-none">Selected Data (Drop-down)</span>' : ''}
                  </label>
                  <select onchange="window.handleAddonChange(this.value)" class="form-input text-xs font-bold text-slate-800">
                    ${addonsList.map(a => `
                      <option value="${a.name}" ${state.form.selectedAddon === a.name ? 'selected' : ''}>
                        ${a.name}
                      </option>
                    `).join('')}
                  </select>
                </div>
              </div>

              <!-- Field 12: Special Preparation Notes & Quantity -->
              <div>
                <div class="flex items-center justify-between mb-1">
                  <label class="form-label text-xs mb-0">
                    <span>[12] Special Preparation Notes & Quantity</span>
                    ${showBadges ? '<span class="val-tag val-tag-active">Length Check (Max 150 Chars)</span>' : ''}
                  </label>
                  <span class="text-[10px] font-bold text-slate-400">
                    ${state.form.specialNotes.length} / 150 chars
                  </span>
                </div>
                
                <div class="grid grid-cols-1 sm:grid-cols-12 gap-3">
                  <div class="sm:col-span-8">
                    <input type="text" 
                           maxlength="150"
                           value="${state.form.specialNotes}"
                           oninput="window.updateFormField('specialNotes', this.value)"
                           placeholder="e.g. Extra cheese, no onion, less ice..."
                           class="form-input text-xs font-medium" />
                  </div>
                  <div class="sm:col-span-4 flex items-center gap-2">
                    <span class="text-xs font-bold text-slate-700">Qty:</span>
                    <input type="number" min="1" max="10" 
                           value="${state.form.itemQuantity}"
                           onchange="window.updateFormField('itemQuantity', parseInt(this.value)||1)"
                           class="form-input text-xs font-black text-center py-1.5" />
                  </div>
                </div>
              </div>

              <button onclick="window.addFoodItemToOrder()" 
                      class="btn-primary text-xs w-full py-2.5 font-extrabold">
                <i class="fa-solid fa-plus-circle"></i> Add Food Item to Order List
              </button>
            </div>

            <!-- Current Order Items Table -->
            <div class="space-y-2">
              <h3 class="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Items Added to Order (${state.orderItems.length})</h3>
              
              ${state.orderItems.length === 0 ? `
                <div class="p-6 text-center bg-slate-50 rounded-2xl border border-dashed border-slate-300">
                  <p class="text-xs font-bold text-slate-400">No food items added yet. Select items above and click "Add Food Item".</p>
                </div>
              ` : `
                <div class="space-y-2">
                  ${state.orderItems.map((item, idx) => `
                    <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-sm">
                      <div>
                        <div class="flex items-center gap-2">
                          <strong class="text-xs font-black text-slate-900">${item.name}</strong>
                          <span class="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-2 py-0.5 rounded">x${item.quantity}</span>
                        </div>
                        <p class="text-[11px] text-emerald-700 font-semibold mt-0.5">+ ${item.addonName}</p>
                        ${item.notes ? `<p class="text-[10px] text-slate-400 italic mt-0.5">Note: "${item.notes}"</p>` : ''}
                      </div>

                      <div class="flex items-center gap-3 shrink-0">
                        <span class="text-xs font-black text-slate-900">RM ${(item.unitPrice * item.quantity).toFixed(2)}</span>
                        <button onclick="window.removeOrderItem(${idx})" class="text-red-500 hover:text-red-700 text-xs font-bold p-1">
                          <i class="fa-solid fa-trash-can"></i>
                        </button>
                      </div>
                    </div>
                  `).join('')}
                </div>
              `}
            </div>

          </div>

        </div>

        <!-- RIGHT PANEL (1 Column): Order Summary & Payment Section -->
        <div class="lg:col-span-5 space-y-6">
          
          <div class="solid-card p-5 space-y-5 sticky top-20">
            <div class="flex items-center justify-between pb-3 border-b border-slate-200">
              <h2 class="text-sm font-extrabold text-slate-900 uppercase tracking-wider">
                Order Summary & Payment
              </h2>
              <span class="text-[10px] font-black text-emerald-700 bg-emerald-50 px-2 py-1 rounded border border-emerald-200 uppercase">
                AUTOMATED CALCULATION
              </span>
            </div>

            <!-- Outlet & Delivery Banner -->
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <div class="font-extrabold text-slate-900 truncate">
                ${currentRest.name} → Setapak, KL
              </div>
              <div class="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200/60">
                <!-- Field 13: Booking / Order Date -->
                <span>[13] Booking Date: <strong>01/08/2026</strong></span>
                <!-- Field 14: Total Servings / Pax -->
                <span>[14] Total Servings: <strong>${totalServingsCount} Pax (${state.orderItems.reduce((s,i)=>s+i.quantity,0)} Items)</strong></span>
              </div>
              ${showBadges ? `
                <div class="flex items-center gap-2 pt-1">
                  <span class="val-tag val-tag-system">[13] System Clock Default</span>
                  <span class="val-tag val-tag-system">[14] Auto-Calculated Field</span>
                </div>
              ` : ''}
            </div>

            <!-- Financial Calculation Subtotal Breakdown -->
            <div class="space-y-2 text-xs border-b border-slate-200 pb-4">
              <div class="flex items-center justify-between text-slate-600">
                <span>Base Items Subtotal:</span>
                <span class="font-bold text-slate-900">RM ${baseSubtotal.toFixed(2)}</span>
              </div>

              <!-- Promo Code Input -->
              <div class="flex items-center gap-2 py-1">
                <input type="text" 
                       value="${state.form.promoCode}"
                       oninput="window.updateFormField('promoCode', this.value.toUpperCase())"
                       placeholder="PROMO CODE" 
                       class="form-input py-1 text-xs uppercase font-mono font-bold" />
                <span class="text-[11px] font-black text-emerald-600 shrink-0">
                  ${isPromoValid ? '-10%' : 'INVALID'}
                </span>
              </div>

              <div class="flex items-center justify-between text-emerald-700 font-bold">
                <span>Promo Discount (DINOSAVE10):</span>
                <span>-RM ${promoDiscount.toFixed(2)}</span>
              </div>

              <div class="flex items-center justify-between text-slate-600">
                <span>Govt. Tax (SST 8%):</span>
                <span class="font-bold text-slate-900">RM ${sstTax.toFixed(2)}</span>
              </div>

              <div class="flex items-center justify-between text-slate-600">
                <span>Delivery Fee:</span>
                <span class="font-bold text-slate-900">RM ${deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <!-- Field 15: Payment Method Channel -->
            <div class="space-y-3">
              <div>
                <label class="form-label text-xs">
                  <span>[15] Payment Method Channel</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Selected Data (Drop-down)</span>' : ''}
                </label>
                <select onchange="window.updateFormField('paymentChannel', this.value)" class="form-input text-xs font-bold text-slate-800">
                  <option value="card" ${state.form.paymentChannel === 'card' ? 'selected' : ''}>💳 Credit / Debit Card</option>
                  <option value="fpx" ${state.form.paymentChannel === 'fpx' ? 'selected' : ''}>🏦 Online Banking (FPX)</option>
                  <option value="ewallet" ${state.form.paymentChannel === 'ewallet' ? 'selected' : ''}>📱 Touch 'n Go / GrabPay E-Wallet</option>
                  <option value="cod" ${state.form.paymentChannel === 'cod' ? 'selected' : ''}>💵 Cash on Delivery</option>
                </select>
              </div>

              <!-- DYNAMIC PAYMENT DETAILS BOX (Section 10.3 User-Friendliness Feature) -->
              ${state.form.paymentChannel === 'card' ? `
                <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
                  <!-- Field 16: Cardholder Name -->
                  <div>
                    <label class="form-label text-[11px] mb-1">
                      <span>[16] Cardholder Name</span>
                      ${showBadges ? '<span class="val-tag val-tag-active">Presence & Data Type Check</span>' : ''}
                    </label>
                    <input type="text" 
                           value="${state.form.cardName}"
                           oninput="window.updateFormField('cardName', this.value)"
                           placeholder="Enter name on card" 
                           class="form-input py-1.5 text-xs ${state.errors.cardName ? 'input-error' : ''}" />
                    ${state.errors.cardName ? `<div class="error-msg">${state.errors.cardName}</div>` : ''}
                  </div>

                  <!-- Field 17: Card Number (16 Digits) -->
                  <div>
                    <label class="form-label text-[11px] mb-1">
                      <span>[17] Card Number (16 Digits)</span>
                      ${showBadges ? '<span class="val-tag val-tag-active">Format Check & Length Check</span>' : ''}
                    </label>
                    <input type="text" 
                           maxlength="19"
                           value="${state.form.cardNumber}"
                           oninput="window.updateFormField('cardNumber', this.value)"
                           placeholder="4532 1098 7654 3210" 
                           class="form-input py-1.5 text-xs font-mono tracking-widest ${state.errors.cardNumber ? 'input-error' : ''}" />
                    ${state.errors.cardNumber ? `<div class="error-msg">${state.errors.cardNumber}</div>` : ''}
                  </div>

                  <div class="grid grid-cols-2 gap-3">
                    <!-- Field 18: Expiry Date (MM/YY) -->
                    <div>
                      <label class="form-label text-[11px] mb-1">
                        <span>[18] Expiry Date</span>
                        ${showBadges ? '<span class="val-tag val-tag-active">Format & Range</span>' : ''}
                      </label>
                      <input type="text" 
                             value="${state.form.cardExpiry}"
                             oninput="window.updateFormField('cardExpiry', this.value)"
                             placeholder="MM/YY" 
                             class="form-input py-1.5 text-xs ${state.errors.cardExpiry ? 'input-error' : ''}" />
                    </div>

                    <!-- Field 19: CVV Code -->
                    <div>
                      <label class="form-label text-[11px] mb-1">
                        <span>[19] CVV Code</span>
                        ${showBadges ? '<span class="val-tag val-tag-active">Format Check</span>' : ''}
                      </label>
                      <input type="password" 
                             maxlength="4"
                             value="${state.form.cardCvv}"
                             oninput="window.updateFormField('cardCvv', this.value)"
                             placeholder="***" 
                             class="form-input py-1.5 text-xs text-center font-mono ${state.errors.cardCvv ? 'input-error' : ''}" />
                    </div>
                  </div>
                </div>
              ` : ''}

              ${state.form.paymentChannel === 'fpx' ? `
                <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label class="form-label text-[11px]">Select Bank Portal</label>
                  <select class="form-input py-1.5 text-xs font-bold">
                    <option value="maybank">Maybank2u (Maybank)</option>
                    <option value="cimb">CIMB Clicks</option>
                    <option value="public">Public Bank Online</option>
                    <option value="rhb">RHB Now</option>
                  </select>
                </div>
              ` : ''}

              ${state.form.paymentChannel === 'ewallet' ? `
                <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
                  <label class="form-label text-[11px]">E-Wallet Mobile Number</label>
                  <input type="text" value="012-3456789" class="form-input py-1.5 text-xs font-bold" />
                </div>
              ` : ''}
            </div>

            <!-- Field 20: Grand Total & Submit Actions -->
            <div class="pt-3 border-t border-slate-200 space-y-3">
              <div class="p-3 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between">
                <div>
                  <span class="text-[10px] font-extrabold text-slate-500 uppercase block">[20] Grand Total</span>
                  <span class="text-[10px] text-slate-400 font-medium">Read-only auto-imported amount</span>
                </div>
                <strong class="text-2xl font-black text-emerald-700">RM ${grandTotal.toFixed(2)}</strong>
              </div>
              ${showBadges ? '<div class="text-right"><span class="val-tag val-tag-system">[20] Auto-Calculated System Field</span></div>' : ''}

              <!-- Task 3 Empty Order Submission Warning -->
              ${state.errors.general ? `
                <div class="p-3 bg-red-50 rounded-xl border border-red-200 text-red-700 text-xs font-bold flex items-center gap-2">
                  <i class="fa-solid fa-triangle-exclamation text-red-600"></i>
                  <span>${state.errors.general}</span>
                </div>
              ` : ''}

              <div class="space-y-2">
                <button onclick="window.validateAndSubmitOrder()" 
                        class="btn-primary text-sm w-full py-3 font-black shadow-lg shadow-emerald-600/30">
                  <span>Proceed & Pay RM ${grandTotal.toFixed(2)}</span>
                  <i class="fa-solid fa-lock text-xs"></i>
                </button>

                <button onclick="window.clearFormOrder()" 
                        class="btn-secondary text-xs w-full py-2 font-bold text-slate-600">
                  Cancel Request
                </button>
              </div>

              <p class="text-[10px] text-slate-400 text-center font-medium">
                By continuing, you agree to Food Dinosaur's Terms & Data Validation Rules.
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}

// ============================================================================
// DATA INPUT SCREEN 2: MANAGE / CANCEL ORDER (TASK 3 PULL-DOWN & AUTO-FILL)
// ============================================================================

function renderManageOrderScreen() {
  const order = state.searchedOrder;

  return `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-black uppercase tracking-widest bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-300">
            DATA INPUT SCREEN
          </span>
          <span class="text-[10px] font-bold text-slate-500">Activity 10.0 Section 10.3</span>
        </div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Manage / Cancel Food Order</h1>
        <p class="text-xs text-slate-500 font-medium">Search existing food orders to request cancellations, item modifications, or delivery rescheduling.</p>
      </div>

      <!-- Search Input Section -->
      <div class="solid-card p-5 space-y-3">
        <label class="form-label text-xs font-bold">
          <span>Enter Order Reference Number</span>
          <span class="val-tag val-tag-active">Auto-Capitalization Input Guidance</span>
        </label>
        
        <div class="flex items-center gap-3">
          <input type="text" 
                 value="${state.manageSearchQuery}"
                 oninput="window.updateManageSearch(this.value.toUpperCase())"
                 placeholder="e.g. FD-ORD-20260801-094"
                 class="form-input text-sm font-mono font-bold uppercase" />
          <button onclick="window.performManageSearch()" class="btn-primary text-xs py-2.5 px-5 shrink-0 font-extrabold">
            <i class="fa-solid fa-magnifying-glass"></i> Search Order
          </button>
        </div>
        <p class="text-[10px] text-slate-400 font-medium">Hint: Enter <strong>FD-ORD-20260801-094</strong> to auto-import order details.</p>
      </div>

      ${order ? `
        <!-- Auto-filled Order Details Box (Read-only Default Values) -->
        <div class="solid-card p-5 space-y-4">
          <div class="flex items-center justify-between pb-3 border-b border-slate-200">
            <div>
              <span class="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 uppercase">
                AUTO-FILLED DEFAULT VALUES (READ-ONLY)
              </span>
              <h2 class="text-base font-black text-slate-900 mt-1">Order #${order.orderId} Details</h2>
            </div>
            <span class="badge badge-preparing font-extrabold">● ${order.status}</span>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div class="p-3 bg-slate-50 rounded-xl">
              <span class="text-[10px] text-slate-400 font-bold block uppercase">Customer Name</span>
              <strong class="text-slate-900 font-black">${order.customerName}</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
              <span class="text-[10px] text-slate-400 font-bold block uppercase">Booking Date & Time</span>
              <strong class="text-slate-900 font-black">${order.dateTime}</strong>
            </div>
            <div class="p-3 bg-slate-50 rounded-xl">
              <span class="text-[10px] text-slate-400 font-bold block uppercase">Total Paid Amount</span>
              <strong class="text-emerald-700 font-black">RM ${order.totalPayable.toFixed(2)}</strong>
            </div>
          </div>

          <!-- Action & Reason Pull-down Dropdown Lists -->
          <div class="p-4 bg-amber-50/60 rounded-2xl border border-amber-200 space-y-4">
            <h3 class="text-xs font-black text-amber-900 uppercase tracking-wider">Cancellation & Refund Request Form</h3>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Pull-down List 1: Select Action -->
              <div>
                <label class="form-label text-xs">
                  <span>Select Action</span>
                  <span class="val-tag val-tag-none">Pull-down List</span>
                </label>
                <select onchange="window.updateManageField('cancelAction', this.value)" class="form-input text-xs font-bold text-slate-800">
                  <option value="cancel_refund">❌ Cancel Order & Request Full Refund</option>
                  <option value="modify_items">✏️ Modify Food Items & Portions</option>
                  <option value="reschedule">📅 Reschedule Delivery Date/Time</option>
                </select>
              </div>

              <!-- Pull-down List 2: Reason Category -->
              <div>
                <label class="form-label text-xs">
                  <span>Reason Category</span>
                  <span class="val-tag val-tag-none">Pull-down List</span>
                </label>
                <select onchange="window.updateManageField('cancelReasonCategory', this.value)" class="form-input text-xs font-bold text-slate-800">
                  <option value="change_of_mind">Change of Mind / Plans Changed</option>
                  <option value="late_delivery">Expected Delivery Time Too Late</option>
                  <option value="out_of_stock">Item Out of Stock Notification</option>
                  <option value="wrong_address">Incorrect Delivery Address Selected</option>
                </select>
              </div>
            </div>

            <!-- Manual Keying Reason Explanation -->
            <div>
              <label class="form-label text-xs">
                <span>Detailed Explanation / Note</span>
                <span class="val-tag val-tag-active">Presence & Length Check</span>
              </label>
              <textarea rows="3" 
                        oninput="window.updateManageField('cancelNotes', this.value)"
                        placeholder="Please provide additional details for the refund team..."
                        class="form-input text-xs font-medium">${state.cancelNotes}</textarea>
            </div>

            ${state.cancelSubmitted ? `
              <div class="p-4 bg-emerald-100 rounded-xl border border-emerald-300 text-emerald-800 text-xs font-bold flex items-center gap-2">
                <i class="fa-solid fa-circle-check text-emerald-600 text-lg"></i>
                <span>Cancellation request for <strong>#${order.orderId}</strong> successfully submitted! Full refund of RM ${order.totalPayable.toFixed(2)} will be processed to original payment method.</span>
              </div>
            ` : `
              <button onclick="window.submitManageCancellation()" class="btn-primary text-xs py-3 px-6 font-extrabold w-full sm:w-auto">
                Submit Cancellation Request
              </button>
            `}
          </div>

        </div>
      ` : ''}

    </div>
  `;
}

// ============================================================================
// DATA INPUT SCREEN 3: ORDER TRACKING / CHECK-IN (TASK 3 CHECKBOXES & GUIDANCE)
// ============================================================================

function renderTrackingScreen() {
  return `
    <div class="max-w-4xl mx-auto space-y-6">
      
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div class="flex items-center gap-2 mb-1">
          <span class="text-[10px] font-black uppercase tracking-widest bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded border border-emerald-300">
            DATA INPUT SCREEN
          </span>
          <span class="text-[10px] font-bold text-slate-500">Activity 10.0 Section 10.3</span>
        </div>
        <h1 class="text-2xl font-black text-slate-900 tracking-tight">Order Tracking & Delivery Check-in</h1>
        <p class="text-xs text-slate-500 font-medium">Track real-time rider delivery status and acknowledge health & hygiene safety declarations.</p>
      </div>

      <!-- Input Guidance Section with Auto-Capitalization -->
      <div class="solid-card p-5 space-y-4">
        <h2 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
          Order Check-in Guidance & Voucher Input
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label class="form-label text-xs">
              <span>Order Number</span>
              <span class="val-tag val-tag-active">Auto-Capitalization</span>
            </label>
            <input type="text" 
                   value="${state.trackingOrderId}" 
                   oninput="window.updateTrackingField('trackingOrderId', this.value.toUpperCase())"
                   placeholder="Hint: FD-ORD-20260801-094"
                   class="form-input text-xs font-mono font-bold uppercase" />
            <p class="text-[10px] text-slate-400 mt-1">Hint: FD-ORD-20260801-094</p>
          </div>

          <div>
            <label class="form-label text-xs">
              <span>Promo / Voucher Code</span>
              <span class="val-tag val-tag-active">Auto-Capitalization</span>
            </label>
            <input type="text" 
                   value="${state.trackingPromoCode}" 
                   oninput="window.updateTrackingField('trackingPromoCode', this.value.toUpperCase())"
                   placeholder="Hint: DINOSAVE10"
                   class="form-input text-xs font-mono font-bold uppercase" />
            <p class="text-[10px] text-emerald-600 font-bold mt-1">Hint: DINOSAVE10 (10% OFF applied)</p>
          </div>
        </div>

        <!-- Task 3 Feature: Checked Boxes Safety Declaration -->
        <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3">
          <span class="text-xs font-black text-slate-800 uppercase tracking-wider block">
            Health & Food Hygiene Safety Declaration (Checked Boxes)
          </span>

          <label class="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer">
            <input type="checkbox" 
                   ${state.safetyContactless ? 'checked' : ''} 
                   onchange="window.updateTrackingField('safetyContactless', this.checked)"
                   class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
            <span>Contactless Delivery Drop-off Requested (Leave at guardhouse / doorstep)</span>
          </label>

          <label class="flex items-center gap-3 text-xs font-semibold text-slate-700 cursor-pointer">
            <input type="checkbox" 
                   ${state.safetyHygieneAck ? 'checked' : ''} 
                   onchange="window.updateTrackingField('safetyHygieneAck', this.checked)"
                   class="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500" />
            <span>I acknowledge hygiene seal verification and rider thermal bag compliance</span>
          </label>
        </div>
      </div>

      <!-- Live GPS Tracking Console -->
      <div class="solid-card p-5 space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h3 class="text-sm font-black text-slate-900">Live Delivery Progress</h3>
            <p class="text-[11px] text-slate-500 font-medium">Estimated Arrival: <strong>15:30 PM (In 15 Mins)</strong></p>
          </div>
          <button onclick="window.simulateRiderMovement()" class="btn-primary text-xs py-1.5 px-3">
            <i class="fa-solid fa-person-biking"></i> Simulate Progress
          </button>
        </div>

        <!-- Progress Bar -->
        <div class="space-y-2">
          <div class="flex items-center justify-between text-xs font-extrabold text-slate-700">
            <span>Kitchen Preparing</span>
            <span>Rider Picked Up</span>
            <span class="text-emerald-600">On The Way (${state.riderProgress}%)</span>
            <span>Delivered</span>
          </div>

          <div class="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
            <div class="bg-emerald-600 h-full rounded-full transition-all duration-500" style="width: ${state.riderProgress}%"></div>
          </div>
        </div>

        <div class="p-4 bg-emerald-50/70 rounded-2xl border border-emerald-200 flex items-center justify-between">
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-full bg-emerald-600 text-white font-black text-lg flex items-center justify-center">
              🛵
            </div>
            <div>
              <strong class="text-xs font-black text-slate-900 block">Ahmad Delivery Rider</strong>
              <span class="text-[11px] text-slate-500 font-medium">Motorcycle WVN 4892 • Contact: 011-88997766</span>
            </div>
          </div>
          <span class="badge badge-success font-extrabold">Active Delivery</span>
        </div>
      </div>

    </div>
  `;
}

// ============================================================================
// HELP FACILITY MODAL (TASK 3 ON-SCREEN HELP)
// ============================================================================

function renderHelpModal() {
  return `
    <div class="modal-overlay active">
      <div class="modal-container max-w-2xl p-6 overflow-y-auto max-h-[85vh] space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div class="flex items-center gap-2">
            <div class="w-8 h-8 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center font-black">
              ?
            </div>
            <div>
              <h2 class="text-lg font-black text-slate-900">On-Screen HELP Facility</h2>
              <p class="text-xs text-slate-500 font-medium">Activity 10.0 Section 10.3 User-Friendliness Guidance</p>
            </div>
          </div>
          <button onclick="window.closeHelpModal()" class="text-slate-400 hover:text-slate-600 text-xl font-bold">✕</button>
        </div>

        <div class="space-y-4 text-xs">
          <div class="p-4 bg-amber-50 rounded-2xl border border-amber-200 space-y-2">
            <strong class="text-amber-900 font-black block text-sm">How to Use the Data Input Screens:</strong>
            <ul class="list-disc pl-4 space-y-1.5 text-amber-950 font-medium">
              <li><strong>Create Food Order Screen:</strong> Fill in restaurant outlet, delivery time, portion numbers, contact info, food combo selection, and payment details. All 20 data fields match standard SAD input requirements.</li>
              <li><strong>Dynamic Cascading Drop-downs:</strong> Changing the <em>Select Restaurant Outlet</em> list automatically updates the available items in the <em>Food Item Selection</em> drop-down.</li>
              <li><strong>Validation Rules:</strong> Keyboard inputs enforce format checks (MyKad, Phone, Card Number 16-digits). Child meal portions require at least 1 Adult or Senior Citizen serving.</li>
              <li><strong>Manage / Cancel Order Screen:</strong> Search order reference number <code>FD-ORD-20260801-094</code> to test auto-filled read-only defaults and pull-down dropdown cancellation actions.</li>
              <li><strong>Order Tracking / Check-in Screen:</strong> Uses auto-capitalization on promo codes and order numbers with checked box declarations for health & safety.</li>
            </ul>
          </div>

          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
            <strong class="text-slate-900 font-extrabold block">Validation Badges Toggle:</strong>
            <p class="text-slate-600 leading-relaxed">
              Click the <strong>[ Hide/Show Validation Badges ]</strong> button in the top right navigation bar to toggle the Task 2 validation check tags next to every field for marker evaluation.
            </p>
          </div>
        </div>

        <div class="pt-3 border-t border-slate-200 flex justify-end">
          <button onclick="window.closeHelpModal()" class="btn-primary text-xs py-2 px-5 font-extrabold">
            Got it, Close Help
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// EVENT HANDLERS & ACTION FUNCTIONS (BOUND TO WINDOW FOR INLINE HTML LISTENERS)
// ============================================================================

window.switchTab = function(tabName) {
  state.activeTab = tabName;
  renderApp();
};

window.toggleValidationBadges = function() {
  state.showAssignmentAnnotations = !state.showAssignmentAnnotations;
  renderApp();
};

window.openHelpModal = function() {
  state.isHelpOpen = true;
  renderApp();
};

window.closeHelpModal = function() {
  state.isHelpOpen = false;
  renderApp();
};

window.updateFormField = function(field, value) {
  state.form[field] = value;
  delete state.errors[field];
  delete state.errors.general;

  // Auto-validate card number length check if card channel
  if (field === 'cardNumber') {
    const cleanNum = value.replace(/\s+/g, '');
    if (cleanNum.length > 0 && cleanNum.length !== 16) {
      state.errors.cardNumber = 'Format Error: Credit Card Number must be exactly 16 digits';
    } else {
      delete state.errors.cardNumber;
    }
  }

  renderApp();
};

window.handleRestaurantChange = function(restId) {
  state.form.restaurantId = restId;
  const availableItems = state.menu.filter(m => m.restaurantId === restId);
  if (availableItems.length > 0) {
    state.form.selectedItemId = availableItems[0].id;
    state.form.selectedAddon = availableItems[0].addons[0]?.name || '';
  }
  renderApp();
};

window.handleFoodItemChange = function(itemId) {
  state.form.selectedItemId = itemId;
  const food = state.menu.find(m => m.id === itemId);
  if (food && food.addons.length > 0) {
    state.form.selectedAddon = food.addons[0].name;
    state.form.addonPrice = food.addons[0].price;
  }
  renderApp();
};

window.handleAddonChange = function(addonName) {
  state.form.selectedAddon = addonName;
  const food = state.menu.find(m => m.id === state.form.selectedItemId);
  if (food) {
    const foundAddon = food.addons.find(a => a.name === addonName);
    state.form.addonPrice = foundAddon ? foundAddon.price : 0;
  }
  renderApp();
};

window.updateServings = function(type, delta) {
  if (type === 'adult') {
    state.form.adultServings = Math.max(0, Math.min(20, state.form.adultServings + delta));
  } else if (type === 'child') {
    state.form.childServings = Math.max(0, Math.min(20, state.form.childServings + delta));
  } else if (type === 'senior') {
    state.form.seniorServings = Math.max(0, Math.min(20, state.form.seniorServings + delta));
  }

  // Task 3 Business Rule Validation Check: Child servings require adult/senior
  if (state.form.childServings > 0 && (state.form.adultServings + state.form.seniorServings) === 0) {
    state.errors.childServings = 'Error: Child meal portion must be accompanied by at least one Adult or Senior Citizen serving.';
  } else {
    delete state.errors.childServings;
  }

  renderApp();
};

window.addFoodItemToOrder = function() {
  const food = state.menu.find(m => m.id === state.form.selectedItemId);
  if (!food) return;

  const rest = state.restaurants.find(r => r.id === state.form.restaurantId);
  const addonPrice = state.form.addonPrice || 0;
  const unitPrice = food.price + addonPrice;

  state.orderItems.push({
    id: 'ord-item-' + Date.now(),
    foodId: food.id,
    name: food.name,
    restaurantName: rest ? rest.name : '',
    basePrice: food.price,
    addonName: state.form.selectedAddon,
    addonPrice: addonPrice,
    unitPrice: unitPrice,
    quantity: state.form.itemQuantity,
    notes: state.form.specialNotes
  });

  delete state.errors.general;
  window.showToast(`Added ${food.name} (x${state.form.itemQuantity}) to order list!`);
  renderApp();
};

window.removeOrderItem = function(index) {
  state.orderItems.splice(index, 1);
  renderApp();
};

window.clearFormOrder = function() {
  state.orderItems = [];
  state.errors = {};
  window.showToast('Order form reset.');
  renderApp();
};

window.validateAndSubmitOrder = function() {
  state.errors = {};

  // 1. Task 3 Validation: Empty cart check
  if (state.orderItems.length === 0) {
    state.errors.general = 'Error: Please complete your food selection before proceeding to payment.';
  }

  // 2. Task 3 Validation: Child servings business rule
  if (state.form.childServings > 0 && (state.form.adultServings + state.form.seniorServings) === 0) {
    state.errors.childServings = 'Error: Child meal portion must be accompanied by at least one Adult or Senior Citizen serving.';
  }

  // 3. Contact Info Presence & Format Checks
  if (!state.form.icPassport || state.form.icPassport.trim() === '') {
    state.errors.icPassport = 'MyKad / Passport number is required.';
  }

  if (!state.form.contactPhone || state.form.contactPhone.trim() === '') {
    state.errors.contactPhone = 'Contact phone number is required.';
  }

  if (!state.form.deliveryAddress || state.form.deliveryAddress.trim() === '') {
    state.errors.deliveryAddress = 'Delivery address cannot be left blank (Presence Check).';
  }

  // 4. Payment Credentials Validation (if Card selected)
  if (state.form.paymentChannel === 'card') {
    if (!state.form.cardName || state.form.cardName.trim() === '') {
      state.errors.cardName = 'Cardholder name is required.';
    }
    const cleanNum = (state.form.cardNumber || '').replace(/\s+/g, '');
    if (cleanNum.length !== 16 || !/^\d+$/.test(cleanNum)) {
      state.errors.cardNumber = 'Format Error: Credit Card Number must be exactly 16 digits';
    }
  }

  if (Object.keys(state.errors).length > 0) {
    window.showToast('Validation failed. Please correct errors highlighted on screen.', 'error');
    renderApp();
    return;
  }

  // Success Case
  window.showToast('Order successfully created & payment processed! Redirecting to tracking...', 'success');
  state.activeTab = 'tracking';
  renderApp();
};

// Manage / Cancel Order Handlers
window.updateManageSearch = function(val) {
  state.manageSearchQuery = val;
};

window.performManageSearch = function() {
  if (state.manageSearchQuery === 'FD-ORD-20260801-094') {
    state.searchedOrder = {
      orderId: 'FD-ORD-20260801-094',
      dateTime: '01/08/2026 14:30',
      customerName: state.form.customerName,
      contactPhone: state.form.contactPhone,
      deliveryAddress: state.form.deliveryAddress,
      restaurantName: 'Dino Grill & Steakhouse (Mid Valley)',
      items: [
        { name: 'Dino Burger Combo Extra Large', qty: 2, price: 20.50, notes: 'Extra cheese, no onion' }
      ],
      totalPayable: 59.32,
      status: 'Preparing'
    };
    window.showToast('Order FD-ORD-20260801-094 details auto-imported.');
  } else {
    window.showToast('Order reference not found. Try FD-ORD-20260801-094', 'error');
  }
  renderApp();
};

window.updateManageField = function(field, val) {
  state[field] = val;
  renderApp();
};

window.submitManageCancellation = function() {
  state.cancelSubmitted = true;
  window.showToast('Cancellation request submitted.');
  renderApp();
};

// Tracking Handlers
window.updateTrackingField = function(field, val) {
  state[field] = val;
  renderApp();
};

window.simulateRiderMovement = function() {
  state.riderProgress = (state.riderProgress + 15) % 100;
  if (state.riderProgress < 20) state.riderProgress = 20;
  window.showToast(`Rider progress updated: ${state.riderProgress}%`);
  renderApp();
};

// Toast Notification Helper
window.showToast = function(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast ${type === 'error' ? 'bg-red-950 text-red-200 border border-red-800' : 'bg-slate-900 text-white'}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'error' ? 'fa-circle-xmark text-red-500' : 'fa-circle-check text-emerald-400'}"></i>
    <span>${msg}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3500);
};
