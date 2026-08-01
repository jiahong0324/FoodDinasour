import './style.css';

// ============================================================================
// FOOD DINOSAUR - FOOD ORDERING DATA INPUT SYSTEM
// ============================================================================

// System State
const state = {
  activeTab: 'create', // 'create' | 'tracking'
  showAssignmentAnnotations: false, // Default to false for clean, uncluttered UI!
  isPaymentModalOpen: false, // 2-step payment modal flag

  // Form Fields for Create Food Order
  form: {
    // 1. Restaurant & Delivery Details
    restaurantId: 'rest-1',
    orderMethod: 'Standard Rider Delivery',
    deliveryDate: '2026-08-01',
    deliveryTime: '15:30 PM',
    servingsCount: 2, // Total Diners / Portions

    // 2. Primary Contact Information
    customerName: 'John Doe',
    icNumber: '010324-14-5582',
    contactPhone: '012-3456789',
    deliveryAddress: 'No. 12, Jalan Genting Klang, Setapak, 53300 Kuala Lumpur',

    // 3. Food Selection & Customization
    selectedItemId: 'item-1',
    selectedAddon: 'Extra Cheddar Cheese (+RM 2.00)',
    addonPrice: 2.00,
    specialNotes: 'Extra cheese, no onion',
    itemQuantity: 2,

    // Payment Credentials
    promoCode: 'DINOSAVE10',
    paymentChannel: 'card',
    cardName: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvv: ''
  },

  // Added Items in Current Order
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
    totalPayable: 49.38,
    status: 'Preparing'
  },
  cancelAction: 'cancel_order',
  cancelReasonCategory: 'change_of_mind',
  cancelNotes: 'Change of plan, unable to receive delivery today.',
  cancelSubmitted: false,

  // Tracking State
  trackingOrderId: 'FD-ORD-20260801-094',
  trackingPromoCode: 'DINOSAVE10',
  safetyContactless: true,
  safetyHygieneAck: true,
  riderProgress: 65,

  isHelpOpen: false,

  // Outlets Master Data
  restaurants: [
    { id: 'rest-1', name: 'Dino Grill & Steakhouse', location: 'Mid Valley', icon: '🥩' },
    { id: 'rest-2', name: 'Dinosaur Asian Kitchen', location: 'KLCC', icon: '🍜' },
    { id: 'rest-3', name: 'Jurassic Pizzeria', location: 'Setapak', icon: '🍕' },
    { id: 'rest-4', name: 'T-Rex Crispy Chicken', location: 'Bukit Bintang', icon: '🍗' },
    { id: 'rest-5', name: 'Rex Dessert & Cafe', location: 'Subang', icon: '🍰' }
  ],

  // Menu Items Master Data (Cascading per outlet)
  menu: [
    // 1. Dino Grill & Steakhouse (Mid Valley) - rest-1
    {
      id: 'item-1',
      restaurantId: 'rest-1',
      name: 'Dino Burger Combo Extra Large',
      price: 18.50,
      addons: [
        { name: 'Extra Cheddar Cheese (+RM 2.00)', price: 2.00 },
        { name: 'Crispy Beef Bacon (+RM 3.50)', price: 3.50 },
        { name: 'Double Meat Upgrade (+RM 6.00)', price: 6.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-2',
      restaurantId: 'rest-1',
      name: 'Jurassic Smoked BBQ Ribs (Half Rack)',
      price: 34.90,
      addons: [
        { name: 'Grilled Butter Corn (+RM 4.00)', price: 4.00 },
        { name: 'Extra Smoky BBQ Dip (+RM 2.50)', price: 2.50 },
        { name: 'Full Rack Upgrade (+RM 28.00)', price: 28.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-3',
      restaurantId: 'rest-1',
      name: 'T-Rex Flame-Grilled Wagyu Ribeye Steak (250g)',
      price: 58.00,
      addons: [
        { name: 'Mushroom Truffle Sauce (+RM 4.50)', price: 4.50 },
        { name: 'Black Pepper Herb Butter (+RM 3.00)', price: 3.00 },
        { name: 'Mashed Potato Side (+RM 5.00)', price: 5.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-4',
      restaurantId: 'rest-1',
      name: 'Dino Chicken Chop with Black Pepper Sauce',
      price: 21.90,
      addons: [
        { name: 'Melted Mozzarella Cheese (+RM 3.50)', price: 3.50 },
        { name: 'Extra Black Pepper Gravy (+RM 2.00)', price: 2.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-5',
      restaurantId: 'rest-1',
      name: 'Dinosaur Loaded Cheesy Fries Bucket',
      price: 11.50,
      addons: [
        { name: 'Beef Bacon Bits (+RM 3.00)', price: 3.00 },
        { name: 'Jalapeno Slices (+RM 2.00)', price: 2.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-6',
      restaurantId: 'rest-1',
      name: 'Dinosaur Iced Lemon Tea (700ml)',
      price: 5.00,
      addons: [
        { name: 'Honey Boba Pearls (+RM 1.50)', price: 1.50 },
        { name: 'Extra Fresh Lemon Slices (+RM 1.00)', price: 1.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },

    // 2. Dinosaur Asian Kitchen (KLCC) - rest-2
    {
      id: 'item-7',
      restaurantId: 'rest-2',
      name: 'Jurassic Nasi Lemak Special with Crispy Chicken',
      price: 16.80,
      addons: [
        { name: 'Extra Sambal Tumis (+RM 1.50)', price: 1.50 },
        { name: 'Fried Sunny Side Egg (+RM 2.00)', price: 2.00 },
        { name: 'Double Chicken Rendang (+RM 7.00)', price: 7.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-8',
      restaurantId: 'rest-2',
      name: 'T-Rex Spicy Beef Rendang Noodle Bowl',
      price: 19.50,
      addons: [
        { name: 'Extra Tender Braised Beef (+RM 5.00)', price: 5.00 },
        { name: 'Soft-Boiled Ramen Egg (+RM 2.50)', price: 2.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-9',
      restaurantId: 'rest-2',
      name: 'Dino Seafood Char Kway Teow',
      price: 15.90,
      addons: [
        { name: 'Extra Tiger Prawns (+RM 4.50)', price: 4.50 },
        { name: 'Sunny Side Egg (+RM 2.00)', price: 2.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-10',
      restaurantId: 'rest-2',
      name: 'Dinosaur Hainanese Poached Chicken Rice',
      price: 14.50,
      addons: [
        { name: 'Braised Egg & Tofu (+RM 3.00)', price: 3.00 },
        { name: 'Extra Fragrant Rice (+RM 2.00)', price: 2.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-11',
      restaurantId: 'rest-2',
      name: 'Rex Thai Tom Yum Seafood Noodle Soup',
      price: 22.00,
      addons: [
        { name: 'Extra Squid & Prawns (+RM 6.00)', price: 6.00 },
        { name: 'Spicy Level Upgrade (+RM 1.00)', price: 1.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-12',
      restaurantId: 'rest-2',
      name: 'Dino Special Iced Milk Tea with Grass Jelly',
      price: 6.50,
      addons: [
        { name: 'Less Sugar 50% (RM 0.00)', price: 0.00 },
        { name: 'Extra Grass Jelly (+RM 1.50)', price: 1.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },

    // 3. Jurassic Pizzeria (Setapak) - rest-3
    {
      id: 'item-13',
      restaurantId: 'rest-3',
      name: 'T-Rex Pepperoni Pizza Supreme (12-inch)',
      price: 28.90,
      addons: [
        { name: 'Stuffed Crust Cheese (+RM 5.00)', price: 5.00 },
        { name: 'Extra Truffle Oil Drizzle (+RM 3.50)', price: 3.50 },
        { name: 'Extra Mozzarella Cheese (+RM 4.00)', price: 4.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-14',
      restaurantId: 'rest-3',
      name: 'Jurassic Four-Cheese Lava Pizza',
      price: 32.00,
      addons: [
        { name: 'Garlic Butter Crust (+RM 3.00)', price: 3.00 },
        { name: 'Honey Drizzle (+RM 2.00)', price: 2.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-15',
      restaurantId: 'rest-3',
      name: 'Dino Truffle Mushroom & Beef Pizza',
      price: 35.50,
      addons: [
        { name: 'Extra Truffle Cream Base (+RM 4.00)', price: 4.00 },
        { name: 'Parmesan Shavings (+RM 3.00)', price: 3.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-16',
      restaurantId: 'rest-3',
      name: 'Rex BBQ Grilled Chicken & Pineapple Pizza',
      price: 29.90,
      addons: [
        { name: 'Extra Smoky BBQ Drizzle (+RM 2.00)', price: 2.00 },
        { name: 'Jalapeno Pepper Coins (+RM 2.50)', price: 2.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-17',
      restaurantId: 'rest-3',
      name: 'Jurassic Garlic Butter Breadsticks with Dip',
      price: 9.90,
      addons: [
        { name: 'Marinara Tomato Dip (+RM 2.00)', price: 2.00 },
        { name: 'Melted Garlic Cheese Dip (+RM 2.50)', price: 2.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-18',
      restaurantId: 'rest-3',
      name: 'Sparkling Italian Blood Orange Soda',
      price: 7.50,
      addons: [
        { name: 'Fresh Mint & Lime (+RM 1.00)', price: 1.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },

    // 4. T-Rex Crispy Chicken (Bukit Bintang) - rest-4
    {
      id: 'item-19',
      restaurantId: 'rest-4',
      name: 'Crispy Dino Fried Chicken Basket (3-pc)',
      price: 22.90,
      addons: [
        { name: 'Spicy Honey Garlic Dip (+RM 2.00)', price: 2.00 },
        { name: 'Spicy Cheese Sauce (+RM 2.50)', price: 2.50 },
        { name: '5-pc Bucket Upgrade (+RM 12.00)', price: 12.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-20',
      restaurantId: 'rest-4',
      name: 'T-Rex Nashville Hot Spicy Chicken Sandwich',
      price: 17.50,
      addons: [
        { name: 'Extra Melted Cheddar (+RM 2.00)', price: 2.00 },
        { name: 'Double Crispy Patty (+RM 6.00)', price: 6.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-21',
      restaurantId: 'rest-4',
      name: 'Dino Golden Chicken Tenders with Honey Mustard',
      price: 14.90,
      addons: [
        { name: 'Extra Honey Mustard Dip (+RM 1.50)', price: 1.50 },
        { name: 'Smoky Chipotle Sauce (+RM 2.00)', price: 2.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-22',
      restaurantId: 'rest-4',
      name: 'Jurassic Popcorn Chicken & Cheesy Fries Bucket',
      price: 18.90,
      addons: [
        { name: 'Extra Cheese Sauce (+RM 2.50)', price: 2.50 },
        { name: 'Chili Powder Seasoning (+RM 1.00)', price: 1.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-23',
      restaurantId: 'rest-4',
      name: 'Rex Creamy Coleslaw & Mashed Potato Combo',
      price: 7.90,
      addons: [
        { name: 'Extra Black Pepper Gravy (+RM 1.50)', price: 1.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-24',
      restaurantId: 'rest-4',
      name: 'Dino Sparkling Peach Fizzy Drink',
      price: 6.00,
      addons: [
        { name: 'Add Peach Popping Boba (+RM 2.00)', price: 2.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },

    // 5. Rex Dessert & Cafe (Subang) - rest-5
    {
      id: 'item-25',
      restaurantId: 'rest-5',
      name: 'Molten Lava Chocolate Cake with Vanilla Ice Cream',
      price: 12.50,
      addons: [
        { name: 'Vanilla Ice Cream Scoop (+RM 3.00)', price: 3.00 },
        { name: 'Salted Caramel Drizzle (+RM 2.00)', price: 2.00 },
        { name: 'Double Lava Cake Upgrade (+RM 10.00)', price: 10.00 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-26',
      restaurantId: 'rest-5',
      name: 'Dino Strawberry Fluffy Souffle Pancake Tower',
      price: 16.90,
      addons: [
        { name: 'Fresh Strawberry Compote (+RM 3.50)', price: 3.50 },
        { name: 'Extra Maple Syrup (+RM 1.50)', price: 1.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-27',
      restaurantId: 'rest-5',
      name: 'Jurassic Uji Matcha Green Tea Latte',
      price: 11.00,
      addons: [
        { name: 'Oat Milk Substitution (+RM 2.50)', price: 2.50 },
        { name: 'Matcha Soft Serve Float (+RM 3.50)', price: 3.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-28',
      restaurantId: 'rest-5',
      name: 'T-Rex Basque Burnt Cheesecake Slice',
      price: 14.00,
      addons: [
        { name: 'Warm Chocolate Sauce (+RM 2.00)', price: 2.00 },
        { name: 'Whipped Cream (+RM 1.50)', price: 1.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-29',
      restaurantId: 'rest-5',
      name: 'Rex Caramel Macchiato Iced Coffee',
      price: 12.50,
      addons: [
        { name: 'Extra Espresso Shot (+RM 2.50)', price: 2.50 },
        { name: 'Vanilla Syrup (+RM 1.50)', price: 1.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    },
    {
      id: 'item-30',
      restaurantId: 'rest-5',
      name: 'Dino Mango Coconut Sago Dessert Bowl',
      price: 9.50,
      addons: [
        { name: 'Fresh Mango Cubes (+RM 2.50)', price: 2.50 },
        { name: 'Coconut Jelly (+RM 1.50)', price: 1.50 },
        { name: 'No Add-ons (RM 0.00)', price: 0.00 }
      ]
    }
  ]
};

// ============================================================================
// APP RENDER
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  renderApp();
});

function renderApp() {
  const appElement = document.getElementById('app');
  if (!appElement) return;

  appElement.innerHTML = `
    <!-- Top Header Navigation Bar (Clean & Modern) -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-xs">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        
        <!-- Food Dinosaur Brand Logo -->
        <div class="flex items-center gap-2.5 cursor-pointer" onclick="window.switchTab('create')">
          <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl font-black shadow-sm shrink-0">
            🦖
          </div>
          <div>
            <span class="text-base font-black text-slate-900 tracking-tight leading-none block">FOOD DINOSAUR</span>
            <span class="text-[10px] text-slate-500 font-semibold block">Food Ordering System</span>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="flex items-center gap-1.5">
          <button onclick="window.switchTab('create')" 
                  class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${state.activeTab === 'create' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            <i class="fa-solid fa-utensils"></i>
            <span>Create Order</span>
          </button>

          <button onclick="window.switchTab('tracking')" 
                  class="px-3.5 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${state.activeTab === 'tracking' ? 'bg-emerald-600 text-white shadow-sm' : 'bg-slate-100 hover:bg-slate-200 text-slate-700'}">
            <i class="fa-solid fa-motorcycle"></i>
            <span>Track Delivery</span>
          </button>
        </nav>

        <!-- Right Header Action Controls -->
        <div class="flex items-center gap-2">
          <!-- Toggle SAD Validation Badges -->
          <button onclick="window.toggleValidationBadges()" 
                  class="px-2.5 py-1.5 rounded-xl text-[11px] font-bold border transition-all flex items-center gap-1 ${state.showAssignmentAnnotations ? 'bg-emerald-50 text-emerald-700 border-emerald-300' : 'bg-slate-100 text-slate-500 border-slate-200'}">
            <i class="fa-solid fa-tag text-emerald-600 text-[10px]"></i>
            <span class="hidden sm:inline">${state.showAssignmentAnnotations ? 'Hide Badges' : 'Show Badges'}</span>
          </button>

          <!-- Help Button -->
          <button onclick="window.openHelpModal()" 
                  class="bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 text-xs font-bold py-1.5 px-3 rounded-xl flex items-center gap-1 shadow-2xs">
            <i class="fa-solid fa-circle-question text-amber-600"></i>
            <span>Help</span>
          </button>
        </div>

      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-6xl mx-auto px-4 sm:px-6 py-6">
      ${renderActiveScreen()}
    </main>

    <!-- Help Modal Overlay -->
    ${state.isHelpOpen ? renderHelpModal() : ''}

    <!-- Payment Modal Overlay -->
    ${state.isPaymentModalOpen ? renderPaymentModal() : ''}

    <div id="toast-container" class="toast-container"></div>
  `;
}

function renderActiveScreen() {
  switch (state.activeTab) {
    case 'create':
      return renderCreateOrderScreen();
    case 'tracking':
      return renderTrackingScreen();
    default:
      return renderCreateOrderScreen();
  }
}

// ============================================================================
// DATA INPUT SCREEN 1: CREATE FOOD ORDER (CLEAN & SIMPLE)
// ============================================================================

function renderCreateOrderScreen() {
  const currentRest = state.restaurants.find(r => r.id === state.form.restaurantId) || state.restaurants[0];
  const availableItems = state.menu.filter(m => m.restaurantId === state.form.restaurantId);
  const selectedFood = availableItems.find(m => m.id === state.form.selectedItemId) || availableItems[0];
  const addonsList = selectedFood ? selectedFood.addons : [];

  // Price Calculations
  const baseSubtotal = state.orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const isPromoValid = state.form.promoCode === 'DINOSAVE10';
  const promoDiscount = isPromoValid ? baseSubtotal * 0.10 : 0;
  const deliveryFee = state.form.orderMethod === 'Self Pick-up at Outlet' ? 0.00 : 5.00;
  const sstTax = Math.max(0, (baseSubtotal - promoDiscount)) * 0.08;
  const grandTotal = baseSubtotal - promoDiscount + deliveryFee + sstTax;

  const showBadges = state.showAssignmentAnnotations;

  return `
    <div class="space-y-6">
      
      <!-- Clean Page Title -->
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 class="text-xl font-extrabold text-slate-900 tracking-tight">Create Food Order</h1>
          <p class="text-xs text-slate-500 font-medium">Select your restaurant, food items, delivery details, and payment option.</p>
        </div>
        
        <div class="flex items-center gap-2.5 bg-slate-50 px-3.5 py-2 rounded-xl border border-slate-200 shrink-0">
          <div class="w-7 h-7 rounded-full bg-emerald-600 text-white font-bold text-xs flex items-center justify-center">
            JD
          </div>
          <div class="text-xs">
            <span class="font-bold text-slate-800 block leading-tight">John Doe</span>
            <span class="text-[10px] text-slate-400 font-medium block">Customer Account</span>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <!-- LEFT COLUMN: Simple Form Sections -->
        <div class="lg:col-span-7 space-y-6">
          
          <!-- 1. Restaurant & Delivery Details -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h2 class="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <span class="w-5 h-5 rounded bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-black">1</span>
              <span>Restaurant & Delivery Options</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Outlet Dropdown -->
              <div>
                <label class="form-label text-xs">
                  <span>Select Restaurant Outlet</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Drop-down</span>' : ''}
                </label>
                <select onchange="window.handleRestaurantChange(this.value)" class="form-input text-xs font-bold text-slate-800">
                  ${state.restaurants.map(r => `
                    <option value="${r.id}" ${state.form.restaurantId === r.id ? 'selected' : ''}>${r.icon} ${r.name} (${r.location})</option>
                  `).join('')}
                </select>
              </div>

              <!-- Order Method Dropdown -->
              <div>
                <label class="form-label text-xs">
                  <span>Delivery Method</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Drop-down</span>' : ''}
                </label>
                <select onchange="window.updateFormField('orderMethod', this.value)" class="form-input text-xs font-bold text-slate-800">
                  <option value="Standard Rider Delivery" ${state.form.orderMethod === 'Standard Rider Delivery' ? 'selected' : ''}>🛵 Standard Delivery (RM 5.00)</option>
                  <option value="Express Rider Delivery (20 Mins)" ${state.form.orderMethod === 'Express Rider Delivery (20 Mins)' ? 'selected' : ''}>⚡ Express Delivery 20 Mins (RM 8.00)</option>
                  <option value="Self Pick-up at Outlet" ${state.form.orderMethod === 'Self Pick-up at Outlet' ? 'selected' : ''}>🏃 Self Pick-up (Free)</option>
                </select>
              </div>

              <!-- Delivery Date -->
              <div>
                <label class="form-label text-xs">
                  <span>Preferred Delivery Date</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Date Picker</span>' : ''}
                </label>
                <input type="date" 
                       min="2026-08-01" 
                       value="${state.form.deliveryDate}" 
                       onchange="window.updateFormField('deliveryDate', this.value)"
                       class="form-input text-xs font-bold text-slate-800" />
              </div>

              <!-- Delivery Time -->
              <div>
                <label class="form-label text-xs">
                  <span>Preferred Delivery Time</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Drop-down</span>' : ''}
                </label>
                <select onchange="window.updateFormField('deliveryTime', this.value)" class="form-input text-xs font-bold text-slate-800">
                  <option value="12:00 PM">12:00 PM (Lunch)</option>
                  <option value="12:30 PM">12:30 PM (Lunch)</option>
                  <option value="15:30 PM" selected>15:30 PM (Afternoon)</option>
                  <option value="18:30 PM">18:30 PM (Dinner)</option>
                  <option value="19:30 PM">19:30 PM (Dinner)</option>
                </select>
              </div>
            </div>

            <!-- Simple Servings Counter (Pure Food Ordering - No Flight Pax!) -->
            <div class="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span class="text-xs font-bold text-slate-800 block">Number of Diners / Meal Servings</span>
                <span class="text-[10px] text-slate-400 font-medium">Select number of meals to prepare</span>
              </div>
              <div class="flex items-center gap-2">
                <button onclick="window.updateServings(-1)" class="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 font-bold text-slate-700 hover:bg-slate-200">-</button>
                <span class="text-xs font-extrabold text-slate-900 w-12 text-center">${state.form.servingsCount} Meals</span>
                <button onclick="window.updateServings(1)" class="w-8 h-8 rounded-lg bg-slate-100 border border-slate-300 font-bold text-slate-700 hover:bg-slate-200">+</button>
              </div>
            </div>
          </div>

          <!-- 2. Primary Contact Information -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h2 class="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <span class="w-5 h-5 rounded bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-black">2</span>
              <span>Customer Contact & Delivery Address</span>
            </h2>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <!-- Customer Name -->
              <div>
                <label class="form-label text-xs">
                  <span>Customer Full Name</span>
                  ${showBadges ? '<span class="val-tag val-tag-system">Auto-Filled</span>' : ''}
                </label>
                <input type="text" readonly value="${state.form.customerName}" class="form-input text-xs font-bold" />
              </div>

              <!-- Phone Number -->
              <div>
                <label class="form-label text-xs">
                  <span>Contact Phone Number</span>
                  ${showBadges ? '<span class="val-tag val-tag-active">Format Check</span>' : ''}
                </label>
                <input type="text" 
                       value="${state.form.contactPhone}" 
                       oninput="window.updateFormField('contactPhone', this.value)"
                       placeholder="e.g. 012-3456789"
                       class="form-input text-xs font-mono font-bold ${state.errors.contactPhone ? 'input-error' : ''}" />
                ${state.errors.contactPhone ? `<div class="error-msg">${state.errors.contactPhone}</div>` : ''}
              </div>

              <!-- IC / Customer ID -->
              <div>
                <label class="form-label text-xs">
                  <span>Customer IC / Identification No.</span>
                  ${showBadges ? '<span class="val-tag val-tag-active">Format Check</span>' : ''}
                </label>
                <input type="text" 
                       value="${state.form.icNumber}" 
                       oninput="window.updateFormField('icNumber', this.value)"
                       placeholder="e.g. 010324-14-5582"
                       class="form-input text-xs font-mono font-bold ${state.errors.icNumber ? 'input-error' : ''}" />
                ${state.errors.icNumber ? `<div class="error-msg">${state.errors.icNumber}</div>` : ''}
              </div>

              <!-- Delivery Address -->
              <div class="sm:col-span-2">
                <label class="form-label text-xs">
                  <span>Delivery Address</span>
                  ${showBadges ? '<span class="val-tag val-tag-active">Required</span>' : ''}
                </label>
                <textarea rows="2" 
                          oninput="window.updateFormField('deliveryAddress', this.value)"
                          placeholder="Enter house/unit number, street, city..."
                          class="form-input text-xs font-medium ${state.errors.deliveryAddress ? 'input-error' : ''}">${state.form.deliveryAddress}</textarea>
                ${state.errors.deliveryAddress ? `<div class="error-msg">${state.errors.deliveryAddress}</div>` : ''}
              </div>
            </div>
          </div>

          <!-- 3. Food Selection & Customization -->
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
            <h2 class="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100 flex items-center gap-2">
              <span class="w-5 h-5 rounded bg-emerald-100 text-emerald-700 text-xs flex items-center justify-center font-black">3</span>
              <span>Food Item Selection & Customization</span>
            </h2>

            <div class="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <!-- Food Item Dropdown -->
                <div>
                  <label class="form-label text-xs mb-1">Select Food Item</label>
                  <select onchange="window.handleFoodItemChange(this.value)" class="form-input text-xs font-bold text-slate-800">
                    ${availableItems.map(item => `
                      <option value="${item.id}" ${state.form.selectedItemId === item.id ? 'selected' : ''}>
                        ${item.name} (RM ${item.price.toFixed(2)})
                      </option>
                    `).join('')}
                  </select>
                </div>

                <!-- Add-on Dropdown -->
                <div>
                  <label class="form-label text-xs mb-1">Add-ons / Customization</label>
                  <select onchange="window.handleAddonChange(this.value)" class="form-input text-xs font-bold text-slate-800">
                    ${addonsList.map(a => `
                      <option value="${a.name}" ${state.form.selectedAddon === a.name ? 'selected' : ''}>
                        ${a.name}
                      </option>
                    `).join('')}
                  </select>
                </div>
              </div>

              <!-- Notes & Qty -->
              <div class="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center">
                <div class="sm:col-span-9">
                  <input type="text" 
                         maxlength="150"
                         value="${state.form.specialNotes}"
                         oninput="window.updateFormField('specialNotes', this.value)"
                         placeholder="Special notes (e.g. extra cheese, no onion)..."
                         class="form-input text-xs font-medium" />
                </div>
                <div class="sm:col-span-3 flex items-center gap-1.5">
                  <span class="text-xs font-bold text-slate-600">Qty:</span>
                  <input type="number" min="1" max="10" 
                         value="${state.form.itemQuantity}"
                         onchange="window.updateFormField('itemQuantity', parseInt(this.value)||1)"
                         class="form-input text-xs font-bold text-center py-1.5" />
                </div>
              </div>

              <button onclick="window.addFoodItemToOrder()" 
                      class="btn-primary text-xs w-full py-2.5 font-bold">
                <i class="fa-solid fa-plus text-xs"></i> Add Item to Order List
              </button>
            </div>

            <!-- Current Order Items Table -->
            <div class="space-y-2">
              <span class="text-xs font-bold text-slate-700 block">Selected Items (${state.orderItems.length})</span>
              
              ${state.orderItems.length === 0 ? `
                <div class="p-4 text-center bg-slate-50 rounded-xl border border-dashed border-slate-300 text-xs text-slate-400 font-medium">
                  No food items added yet. Select items above to build your order.
                </div>
              ` : `
                <div class="space-y-2">
                  ${state.orderItems.map((item, idx) => `
                    <div class="p-3 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-3 shadow-2xs">
                      <div>
                        <div class="flex items-center gap-2">
                          <strong class="text-xs font-bold text-slate-900">${item.name}</strong>
                          <span class="text-[10px] font-extrabold bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded">x${item.quantity}</span>
                        </div>
                        <p class="text-[11px] text-emerald-700 font-semibold mt-0.5">+ ${item.addonName}</p>
                        ${item.notes ? `<p class="text-[10px] text-slate-400 italic">Note: "${item.notes}"</p>` : ''}
                      </div>

                      <div class="flex items-center gap-3 shrink-0">
                        <span class="text-xs font-extrabold text-slate-900">RM ${(item.unitPrice * item.quantity).toFixed(2)}</span>
                        <button onclick="window.removeOrderItem(${idx})" class="text-slate-400 hover:text-red-600 text-xs p-1">
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

        <!-- RIGHT COLUMN: Clean Order Summary & Payment -->
        <div class="lg:col-span-5 space-y-6">
          
          <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 sticky top-20">
            <h2 class="text-xs font-black text-slate-900 uppercase tracking-wider pb-2 border-b border-slate-100">
              Order Summary & Payment
            </h2>

            <!-- Selected Outlet Header -->
            <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs">
              <div class="font-extrabold text-slate-900">${currentRest.name}</div>
              <div class="text-[11px] text-slate-500 font-medium">Deliver to: Setapak, Kuala Lumpur</div>
            </div>

            <!-- Price Breakdown -->
            <div class="space-y-2 text-xs border-b border-slate-100 pb-3">
              <div class="flex items-center justify-between text-slate-600">
                <span>Subtotal:</span>
                <span class="font-bold text-slate-900">RM ${baseSubtotal.toFixed(2)}</span>
              </div>

              <div class="flex items-center gap-2 py-1">
                <input type="text" 
                       value="${state.form.promoCode}"
                       oninput="window.updateFormField('promoCode', this.value.toUpperCase())"
                       placeholder="Promo Code (DINOSAVE10)" 
                       class="form-input py-1 text-xs uppercase font-mono font-bold" />
                <span class="text-[11px] font-bold text-emerald-600 shrink-0">
                  ${isPromoValid ? '-10%' : ''}
                </span>
              </div>

              ${isPromoValid ? `
                <div class="flex items-center justify-between text-emerald-700 font-bold">
                  <span>Promo Discount:</span>
                  <span>-RM ${promoDiscount.toFixed(2)}</span>
                </div>
              ` : ''}

              <div class="flex items-center justify-between text-slate-600">
                <span>SST (8%):</span>
                <span class="font-bold text-slate-900">RM ${sstTax.toFixed(2)}</span>
              </div>

              <div class="flex items-center justify-between text-slate-600">
                <span>Delivery Fee:</span>
                <span class="font-bold text-slate-900">RM ${deliveryFee.toFixed(2)}</span>
              </div>
            </div>

            <!-- Grand Total & Continue to Payment Button -->
            <div class="pt-2 border-t border-slate-100 space-y-3">
              <div class="flex items-center justify-between">
                <span class="text-xs font-bold text-slate-700">Total Payable:</span>
                <strong class="text-2xl font-black text-emerald-700">RM ${grandTotal.toFixed(2)}</strong>
              </div>

              ${state.errors.general ? `
                <div class="p-3 bg-red-50 rounded-xl text-red-700 text-xs font-bold flex items-center gap-2">
                  <i class="fa-solid fa-circle-exclamation"></i>
                  <span>${state.errors.general}</span>
                </div>
              ` : ''}

              <button onclick="window.openPaymentModal()" 
                      class="btn-primary text-sm w-full py-3 font-extrabold shadow-sm flex items-center justify-center gap-2">
                <span>Continue to Payment</span>
                <i class="fa-solid fa-arrow-right text-xs"></i>
              </button>
            </div>

          </div>

        </div>

      </div>

    </div>
  `;
}



// ============================================================================
// DATA INPUT SCREEN 3: TRACKING (SIMPLE)
// ============================================================================

function renderTrackingScreen() {
  return `
    <div class="max-w-3xl mx-auto space-y-6">
      
      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
        <h1 class="text-xl font-extrabold text-slate-900 tracking-tight">Track Delivery Status</h1>
        <p class="text-xs text-slate-500 font-medium">Real-time status updates and delivery safety options.</p>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4 text-xs">
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label class="form-label text-xs mb-1">Order Number</label>
            <input type="text" readonly value="${state.trackingOrderId}" class="form-input text-xs font-mono font-bold uppercase cursor-not-allowed bg-slate-50 text-slate-700" />
          </div>

          <div>
            <label class="form-label text-xs mb-1">Voucher Code</label>
            <input type="text" readonly value="${state.trackingPromoCode}" class="form-input text-xs font-mono font-bold uppercase cursor-not-allowed bg-slate-50 text-slate-700" />
          </div>
        </div>

        <div class="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
          <span class="font-bold text-slate-800 block">Delivery Hygiene Options</span>
          <label class="flex items-center gap-2 cursor-pointer font-medium text-slate-700">
            <input type="checkbox" ${state.safetyContactless ? 'checked' : ''} onchange="window.updateTrackingField('safetyContactless', this.checked)" class="rounded text-emerald-600" />
            <span>Contactless drop-off at doorstep</span>
          </label>
        </div>
      </div>

      <div class="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs space-y-4">
        <div class="pb-3 border-b border-slate-100 text-xs">
          <strong class="text-slate-900 font-bold block">Estimated Delivery Time</strong>
          <span class="text-slate-500 font-medium">15:30 PM (In 15 Mins)</span>
        </div>

        <div class="space-y-1.5">
          <div class="flex justify-between text-xs font-bold text-slate-700">
            <span>Preparing</span>
            <span class="text-emerald-600 font-extrabold">On The Way (${state.riderProgress}%)</span>
            <span>Delivered</span>
          </div>
          <div class="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
            <div class="bg-emerald-600 h-full transition-all duration-300" style="width: ${state.riderProgress}%"></div>
          </div>
        </div>
      </div>

    </div>
  `;
}

// ============================================================================
// HELP MODAL
// ============================================================================

function renderHelpModal() {
  return `
    <div class="modal-overlay active">
      <div class="modal-container max-w-lg p-5 overflow-y-auto space-y-4 text-xs">
        <div class="flex items-center justify-between pb-2 border-b border-slate-200">
          <h2 class="text-sm font-bold text-slate-900">Food Ordering Guidance</h2>
          <button onclick="window.closeHelpModal()" class="text-slate-400 hover:text-slate-600 font-bold text-base">✕</button>
        </div>

        <div class="space-y-2 leading-relaxed text-slate-600">
          <p><strong>1. Create Order:</strong> Select your preferred outlet, delivery date & time, contact info, food combo, add-ons, and payment method.</p>
          <p><strong>2. Dynamic Menu:</strong> Selecting a different outlet dynamically updates available menu items.</p>
          <p><strong>3. Manage Order:</strong> Search <code>FD-ORD-20260801-094</code> to request cancellation or item modifications.</p>
        </div>

        <div class="pt-2 border-t border-slate-100 text-right">
          <button onclick="window.closeHelpModal()" class="btn-primary text-xs py-1.5 px-4 font-bold">
            Close Help
          </button>
        </div>
      </div>
    </div>
  `;
}

// ============================================================================
// PAYMENT DETAILS MODAL (STEP 2: PAYMENT & CHECKOUT)
// ============================================================================

function renderPaymentModal() {
  const baseSubtotal = state.orderItems.reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  const isPromoValid = state.form.promoCode === 'DINOSAVE10';
  const promoDiscount = isPromoValid ? baseSubtotal * 0.10 : 0;
  const deliveryFee = state.form.orderMethod === 'Self Pick-up at Outlet' ? 0.00 : 5.00;
  const sstTax = Math.max(0, (baseSubtotal - promoDiscount)) * 0.08;
  const grandTotal = baseSubtotal - promoDiscount + deliveryFee + sstTax;

  const showBadges = state.showAssignmentAnnotations;

  return `
    <div class="modal-overlay active">
      <div class="modal-container max-w-md p-6 overflow-y-auto max-h-[90vh] space-y-5">
        <div class="flex items-center justify-between pb-3 border-b border-slate-200">
          <div>
            <h2 class="text-base font-black text-slate-900">Payment Details & Checkout</h2>
            <p class="text-xs text-slate-500 font-medium">Select payment method and enter credentials</p>
          </div>
          <button onclick="window.closePaymentModal()" class="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
        </div>

        <!-- Payable Amount Summary Box -->
        <div class="p-4 bg-emerald-50/80 rounded-2xl border border-emerald-200 text-center space-y-1">
          <span class="text-[11px] font-extrabold text-slate-500 uppercase tracking-wider block">Grand Total to Pay</span>
          <strong class="text-3xl font-black text-emerald-700 block">RM ${grandTotal.toFixed(2)}</strong>
          <span class="text-[10px] text-emerald-700 font-bold block">✓ Amount auto-imported from order summary</span>
        </div>

        <!-- Payment Method Selection -->
        <div class="space-y-3">
          <div>
            <label class="form-label text-xs">
              <span>Select Payment Method</span>
              ${showBadges ? '<span class="val-tag val-tag-none">Drop-down</span>' : ''}
            </label>
            <select onchange="window.updateFormField('paymentChannel', this.value)" class="form-input text-xs font-bold text-slate-800">
              <option value="card" ${state.form.paymentChannel === 'card' ? 'selected' : ''}>💳 Credit / Debit Card</option>
              <option value="fpx" ${state.form.paymentChannel === 'fpx' ? 'selected' : ''}>🏦 Online Banking (FPX)</option>
              <option value="ewallet" ${state.form.paymentChannel === 'ewallet' ? 'selected' : ''}>📱 E-Wallet (Touch 'n Go / GrabPay)</option>
              <option value="cod" ${state.form.paymentChannel === 'cod' ? 'selected' : ''}>💵 Cash on Delivery</option>
            </select>
          </div>

          <!-- Dynamic Payment Credentials Input Box -->
          <div class="p-4 bg-slate-50 rounded-2xl border border-slate-200 space-y-3 text-xs">
            ${state.form.paymentChannel === 'card' ? `
              <div>
                <label class="form-label text-[11px] mb-1">
                  <span>Cardholder Name</span>
                  ${showBadges ? '<span class="val-tag val-tag-active">Presence Check</span>' : ''}
                </label>
                <input type="text" value="${state.form.cardName}" oninput="window.updateFormField('cardName', this.value)" placeholder="Enter name on card" class="form-input py-1.5 text-xs ${state.errors.cardName ? 'input-error' : ''}" />
                ${state.errors.cardName ? `<div class="error-msg">${state.errors.cardName}</div>` : ''}
              </div>

              <div>
                <label class="form-label text-[11px] mb-1">
                  <span>Card Number (16 Digits)</span>
                  ${showBadges ? '<span class="val-tag val-tag-active">Format Check (16 Digits)</span>' : ''}
                </label>
                <input type="text" maxlength="19" value="${state.form.cardNumber}" oninput="window.updateFormField('cardNumber', this.value)" placeholder="4532 1098 7654 3210" class="form-input py-1.5 text-xs font-mono tracking-widest ${state.errors.cardNumber ? 'input-error' : ''}" />
                ${state.errors.cardNumber ? `<div class="error-msg">${state.errors.cardNumber}</div>` : ''}
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div>
                  <label class="form-label text-[11px] mb-1">
                    <span>Expiry Date</span>
                    ${showBadges ? '<span class="val-tag val-tag-active">MM/YY Format</span>' : ''}
                  </label>
                  <input type="text" value="${state.form.cardExpiry}" oninput="window.updateFormField('cardExpiry', this.value)" placeholder="12/28" class="form-input py-1.5 text-xs ${state.errors.cardExpiry ? 'input-error' : ''}" />
                  ${state.errors.cardExpiry ? `<div class="error-msg">${state.errors.cardExpiry}</div>` : ''}
                </div>
                <div>
                  <label class="form-label text-[11px] mb-1">
                    <span>CVV Code</span>
                    ${showBadges ? '<span class="val-tag val-tag-active">3 Digits</span>' : ''}
                  </label>
                  <input type="password" maxlength="4" value="${state.form.cardCvv}" oninput="window.updateFormField('cardCvv', this.value)" placeholder="***" class="form-input py-1.5 text-xs text-center font-mono ${state.errors.cardCvv ? 'input-error' : ''}" />
                  ${state.errors.cardCvv ? `<div class="error-msg">${state.errors.cardCvv}</div>` : ''}
                </div>
              </div>
            ` : ''}

            ${state.form.paymentChannel === 'fpx' ? `
              <div class="space-y-2">
                <label class="form-label text-[11px] mb-1">Select Bank Portal</label>
                <select class="form-input py-1.5 text-xs font-bold text-slate-800">
                  <option value="maybank">Maybank2u (Maybank)</option>
                  <option value="cimb">CIMB Clicks (CIMB Bank)</option>
                  <option value="public">Public Bank Online</option>
                  <option value="rhb">RHB Now</option>
                </select>
                <div>
                  <label class="form-label text-[11px] mb-1">Online Banking User ID</label>
                  <input type="text" value="${state.form.fpxUser || ''}" oninput="window.updateFormField('fpxUser', this.value)" placeholder="Enter bank user ID" class="form-input py-1.5 text-xs ${state.errors.fpxUser ? 'input-error' : ''}" />
                  ${state.errors.fpxUser ? `<div class="error-msg">${state.errors.fpxUser}</div>` : ''}
                </div>
              </div>
            ` : ''}

            ${state.form.paymentChannel === 'ewallet' ? `
              <div class="space-y-2">
                <label class="form-label text-[11px] mb-1">E-Wallet Registered Phone</label>
                <input type="tel" value="${state.form.contactPhone}" readonly class="form-input py-1.5 text-xs font-bold bg-slate-100" />
                <div>
                  <label class="form-label text-[11px] mb-1">6-Digit Security PIN</label>
                  <input type="password" maxlength="6" value="${state.form.ewalletPin || ''}" oninput="window.updateFormField('ewalletPin', this.value)" placeholder="e.g. 123456" class="form-input py-1.5 text-xs font-mono text-center ${state.errors.ewalletPin ? 'input-error' : ''}" />
                  ${state.errors.ewalletPin ? `<div class="error-msg">${state.errors.ewalletPin}</div>` : ''}
                </div>
              </div>
            ` : ''}

            ${state.form.paymentChannel === 'cod' ? `
              <div>
                <label class="form-label text-[11px] mb-1">Cash Change Request Note</label>
                <input type="text" placeholder="e.g. Paying with RM 100 note, prepare change" class="form-input py-1.5 text-xs" />
              </div>
            ` : ''}
          </div>
        </div>

        <div class="pt-3 border-t border-slate-200 space-y-2">
          <button onclick="window.validateAndSubmitOrder()" 
                  class="btn-primary text-xs w-full py-3 font-black shadow-md flex items-center justify-center gap-2">
            <span>Pay & Complete Order (RM ${grandTotal.toFixed(2)})</span>
            <i class="fa-solid fa-lock text-xs"></i>
          </button>

          <button onclick="window.closePaymentModal()" 
                  class="btn-secondary text-xs w-full py-2 font-bold text-slate-600">
            ← Back to Order Details
          </button>
        </div>

      </div>
    </div>
  `;
}

// ============================================================================
// EVENT HANDLERS
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

window.openPaymentModal = function() {
  state.errors = {};

  if (state.orderItems.length === 0) {
    state.errors.general = 'Please add at least one food item before proceeding to payment.';
    window.showToast('Please add food items first.', 'error');
    renderApp();
    return;
  }
  if (!state.form.contactPhone || !/^01\d[-]?\d{7,8}$/.test(state.form.contactPhone.trim())) {
    state.errors.contactPhone = 'Please enter a valid phone number (e.g. 012-3456789).';
  }
  if (!state.form.icNumber || state.form.icNumber.trim() === '') {
    state.errors.icNumber = 'Customer IC / Identification No. is required.';
  }
  if (!state.form.deliveryAddress || state.form.deliveryAddress.trim().length < 5) {
    state.errors.deliveryAddress = 'Please enter a complete delivery address.';
  }

  if (Object.keys(state.errors).length > 0) {
    window.showToast('Please complete contact & delivery details highlighted in red.', 'error');
    renderApp();
    return;
  }

  state.isPaymentModalOpen = true;
  renderApp();
};

window.closePaymentModal = function() {
  state.isPaymentModalOpen = false;
  renderApp();
};

window.updateFormField = function(field, value) {
  state.form[field] = value;
  delete state.errors[field];
  delete state.errors.general;

  if (field === 'cardNumber') {
    const cleanNum = value.replace(/\s+/g, '');
    if (cleanNum.length > 0 && cleanNum.length !== 16) {
      state.errors.cardNumber = 'Format Error: Card number must be 16 digits';
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

window.updateServings = function(delta) {
  state.form.servingsCount = Math.max(1, Math.min(20, state.form.servingsCount + delta));
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
  window.showToast(`Added ${food.name} to order!`);
  renderApp();
};

window.removeOrderItem = function(index) {
  state.orderItems.splice(index, 1);
  renderApp();
};

window.validateAndSubmitOrder = function() {
  state.errors = {};

  if (state.orderItems.length === 0) {
    state.errors.general = 'Please add at least one food item before placing order.';
  }

  if (!state.form.contactPhone || !/^01\d[-]?\d{7,8}$/.test(state.form.contactPhone.trim())) {
    state.errors.contactPhone = 'Please enter a valid phone number (e.g. 012-3456789).';
  }

  if (!state.form.deliveryAddress || state.form.deliveryAddress.trim().length < 5) {
    state.errors.deliveryAddress = 'Please enter a complete delivery address.';
  }

  // Channel Specific Validation Checks
  if (state.form.paymentChannel === 'card') {
    if (!state.form.cardName || state.form.cardName.trim() === '') {
      state.errors.cardName = 'Cardholder name is required.';
    }
    const cleanNum = (state.form.cardNumber || '').replace(/\s+/g, '');
    if (!/^\d{16}$/.test(cleanNum)) {
      state.errors.cardNumber = 'Format Error: Card number must be 16 numeric digits';
    }
    if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test((state.form.cardExpiry || '').trim())) {
      state.errors.cardExpiry = 'Format Error: Use MM/YY format (e.g. 12/28)';
    }
    if (!/^\d{3,4}$/.test((state.form.cardCvv || '').trim())) {
      state.errors.cardCvv = 'CVV must be 3 or 4 numeric digits';
    }
  } else if (state.form.paymentChannel === 'fpx') {
    if (!state.form.fpxUser || state.form.fpxUser.trim() === '') {
      state.errors.fpxUser = 'Online Banking User ID is required.';
    }
  } else if (state.form.paymentChannel === 'ewallet') {
    if (!/^\d{6}$/.test((state.form.ewalletPin || '').trim())) {
      state.errors.ewalletPin = 'Security PIN must be 6 numeric digits';
    }
  }

  if (Object.keys(state.errors).length > 0) {
    window.showToast('Validation failed. Please correct highlighted fields.', 'error');
    renderApp();
    return;
  }

  state.isPaymentModalOpen = false;
  window.showToast('Food order placed successfully! Tracking delivery...', 'success');
  state.activeTab = 'tracking';
  renderApp();
};



window.updateTrackingField = function(field, val) {
  state[field] = val;
  renderApp();
};

window.simulateRiderMovement = function() {
  state.riderProgress = (state.riderProgress + 15) % 100;
  if (state.riderProgress < 20) state.riderProgress = 20;
  window.showToast(`Rider location updated (${state.riderProgress}%)`);
  renderApp();
};

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
  }, 3000);
};
