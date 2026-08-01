import './style.css';

// Initial Mock State for Food Dinosaur System
const state = {
  activeTab: 'customer', // 'customer' | 'kitchen' | 'rider' | 'analytics'
  selectedCategory: 'all',
  searchQuery: '',
  cart: [
    {
      id: 'item-1',
      name: 'Dino Burger Combo Extra Large',
      price: 18.50,
      quantity: 2,
      instructions: 'Extra cheese, no onion',
      image: '/images/dino_burger_combo.jpg'
    },
    {
      id: 'item-2',
      name: 'Dinosaur Iced Lemon Tea',
      price: 5.00,
      quantity: 2,
      instructions: 'Less ice, 50% sugar',
      image: '/images/dino_iced_lemon_tea.jpg'
    }
  ],
  promoCode: 'DINOSAVE10',
  orders: [
    {
      orderId: 'FD-ORD-20260801-094',
      dateTime: '01/08/2026 14:30',
      customerId: 'CUST-88204',
      customerName: 'Lee Jia Hong',
      contactPhone: '012-3456789',
      deliveryAddress: 'No. 12, Jalan Genting Klang, Setapak, 53300 Kuala Lumpur',
      postalCode: '53300',
      restaurantName: 'Dino Grill (Mid Valley)',
      deliveryMethod: 'Standard Rider Delivery',
      deliveryTime: '15:00 - 15:30',
      paymentMethod: 'Online Banking (FPX)',
      items: [
        { name: 'Dino Burger Combo Extra Large', qty: 2, price: 18.50, notes: 'Extra cheese, no onion' },
        { name: 'Dinosaur Iced Lemon Tea', qty: 2, price: 5.00, notes: 'Less ice, 50% sugar' }
      ],
      subtotal: 47.00,
      sst: 3.76,
      deliveryFee: 5.00,
      discount: 4.70,
      totalPayable: 51.06,
      status: 'Preparing', // 'Pending' | 'Preparing' | 'Delivering' | 'Delivered'
      riderName: 'Ahmad Delivery Rider',
      riderGpsProgress: 45 // %
    }
  ],
  menu: [
    {
      id: 'item-1',
      name: 'Dino Burger Combo Extra Large',
      category: 'burgers',
      price: 18.50,
      rating: 4.9,
      prepTime: '15 mins',
      image: '/images/dino_burger_combo.jpg',
      available: true,
      description: 'Double beef patty burger with cheddar cheese, french fries and soft drink.'
    },
    {
      id: 'item-2',
      name: 'Dinosaur Iced Lemon Tea',
      category: 'drinks',
      price: 5.00,
      rating: 4.8,
      prepTime: '5 mins',
      image: '/images/dino_iced_lemon_tea.jpg',
      available: true,
      description: 'Brewed black tea infused with natural honey lemon slices and cooling mint.'
    },
    {
      id: 'item-3',
      name: 'Jurassic Smoked BBQ Ribs',
      category: 'combos',
      price: 34.90,
      rating: 5.0,
      prepTime: '25 mins',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: 'Slow-cooked hickory smoked ribs with Dino BBQ sauce served with corn on the cob.'
    },
    {
      id: 'item-4',
      name: 'Crispy Dino Fried Chicken Basket',
      category: 'combos',
      price: 22.90,
      rating: 4.9,
      prepTime: '15 mins',
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: '3 pieces of spicy golden fried chicken with dipping garlic sauce and coleslaw.'
    },
    {
      id: 'item-5',
      name: 'Jurassic Nasi Lemak Special',
      category: 'asian',
      price: 16.80,
      rating: 4.7,
      prepTime: '10 mins',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: 'Coconut rice served with crispy rendang chicken, sambal, egg & peanuts.'
    },
    {
      id: 'item-6',
      name: 'Molten Lava Chocolate Cake',
      category: 'desserts',
      price: 12.50,
      rating: 4.9,
      prepTime: '10 mins',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: 'Warm dark chocolate cake with a molten center, topped with vanilla ice cream.'
    }
  ]
};

// Initialize Application
function initApp() {
  renderApp();
}

function renderApp() {
  const appElement = document.getElementById('app');
  appElement.innerHTML = `
    <!-- Solid Navigation Bar -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div class="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-3 cursor-pointer" onclick="switchTab('customer')">
          <div class="w-9 h-9 rounded-lg bg-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-sm">
            🦖
          </div>
          <div>
            <h1 class="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              FOOD DINOSAUR <span class="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">Sdn. Bhd.</span>
            </h1>
            <p class="text-[11px] text-slate-500 font-medium">Food Ordering & Delivery System</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="hidden md:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button onclick="switchTab('customer')" class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${state.activeTab === 'customer' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            <i class="fa-solid fa-utensils mr-1.5"></i> Customer Ordering
          </button>
          <button onclick="switchTab('kitchen')" class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${state.activeTab === 'kitchen' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            <i class="fa-solid fa-fire-burner mr-1.5"></i> Kitchen Queue
          </button>
          <button onclick="switchTab('rider')" class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${state.activeTab === 'rider' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            <i class="fa-solid fa-motorcycle mr-1.5"></i> Rider Console
          </button>
          <button onclick="switchTab('analytics')" class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${state.activeTab === 'analytics' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            <i class="fa-solid fa-chart-line mr-1.5"></i> Analytics
          </button>
        </nav>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
          <button onclick="openCheckoutModal()" class="btn-primary text-xs py-2 px-3.5">
            <i class="fa-solid fa-file-signature"></i>
            <span>Create Order (Task 1)</span>
          </button>
          <button onclick="openCheckoutModal()" class="btn-secondary text-xs py-2 px-3 flex items-center gap-1.5">
            <i class="fa-solid fa-cart-shopping text-slate-600"></i>
            <span>Cart</span>
            <span class="bg-emerald-600 text-white font-bold text-[10px] px-1.5 py-0.5 rounded-full">
              ${state.cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Container -->
    <main class="max-w-7xl mx-auto px-4 lg:px-8 py-6">
      ${renderActiveTabContent()}
    </main>

    <!-- Task 1 & Task 2 Data Input Screen Modal -->
    <div id="checkout-modal" class="modal-overlay">
      ${renderCheckoutModalContent()}
    </div>

    <!-- Live Order Tracking Modal -->
    <div id="tracking-modal" class="modal-overlay">
      ${renderOrderTrackingModalContent()}
    </div>

    <div id="toast-container" class="toast-container"></div>
  `;
}

function renderActiveTabContent() {
  switch (state.activeTab) {
    case 'customer':
      return renderCustomerPortal();
    case 'kitchen':
      return renderKitchenDashboard();
    case 'rider':
      return renderRiderDashboard();
    case 'analytics':
      return renderAnalyticsDashboard();
    default:
      return renderCustomerPortal();
  }
}

// 1. CUSTOMER PORTAL
function renderCustomerPortal() {
  const filteredMenu = state.menu.filter(item => {
    const matchesCategory = state.selectedCategory === 'all' || item.category === state.selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return `
    <!-- Top Banner -->
    <div class="solid-card p-6 mb-6 bg-emerald-900 text-white flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <span class="inline-block px-2.5 py-0.5 rounded bg-emerald-800 text-emerald-200 text-xs font-bold mb-2">
          ⚡ 20-Min Express Food Delivery
        </span>
        <h2 class="text-2xl font-extrabold text-white">Food Dinosaur Ordering Platform</h2>
        <p class="text-emerald-100 text-xs mt-1">Select from partner restaurants with real-time order tracking and secure payment processing.</p>
      </div>

      <!-- Search Bar -->
      <div class="w-full md:w-80 flex items-center bg-white rounded-lg p-1 border border-emerald-800">
        <input type="text" placeholder="Search menu items..." 
               value="${state.searchQuery}"
               oninput="handleSearch(this.value)"
               class="w-full text-slate-900 px-3 py-1.5 text-xs focus:outline-none font-medium" />
        <button class="btn-primary text-xs py-1.5 px-3">Search</button>
      </div>
    </div>

    <!-- Category Filter Chips -->
    <div class="flex items-center gap-2 overflow-x-auto pb-2 mb-6">
      ${[
        { id: 'all', label: 'All Items' },
        { id: 'combos', label: 'Dino Combos' },
        { id: 'burgers', label: 'Burgers' },
        { id: 'drinks', label: 'Beverages' },
        { id: 'asian', label: 'Asian Delights' },
        { id: 'desserts', label: 'Desserts' }
      ].map(cat => `
        <button onclick="selectCategory('${cat.id}')" 
                class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all border ${state.selectedCategory === cat.id ? 'bg-emerald-600 text-white border-emerald-700' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'}">
          ${cat.label}
        </button>
      `).join('')}
    </div>

    <!-- Food Item Cards -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${filteredMenu.map(item => `
        <div class="solid-card solid-card-hover flex flex-col justify-between overflow-hidden">
          <div>
            <div class="relative h-44 bg-slate-100 overflow-hidden border-b border-slate-100">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
              <div class="absolute top-2.5 left-2.5 bg-white/90 px-2 py-0.5 rounded text-xs font-bold text-slate-800 shadow-sm border border-slate-200">
                ★ ${item.rating}
              </div>
              <div class="absolute top-2.5 right-2.5 bg-emerald-700 text-white px-2 py-0.5 rounded text-xs font-bold">
                ⏱️ ${item.prepTime}
              </div>
            </div>

            <div class="p-4">
              <h3 class="text-base font-bold text-slate-900 mb-1">${item.name}</h3>
              <p class="text-slate-500 text-xs line-clamp-2 leading-normal mb-3">${item.description}</p>
            </div>
          </div>

          <div class="px-4 pb-4 pt-3 flex items-center justify-between border-t border-slate-100">
            <div>
              <span class="text-[10px] text-slate-400 font-bold block uppercase">Price</span>
              <span class="text-lg font-extrabold text-emerald-600">RM ${item.price.toFixed(2)}</span>
            </div>
            <button onclick="addToCart('${item.id}')" class="btn-primary text-xs py-1.5 px-3">
              + Add to Cart
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 2. KITCHEN QUEUE DASHBOARD
function renderKitchenDashboard() {
  return `
    <div class="mb-5 flex items-center justify-between">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">👨‍🍳 Kitchen Order Queue</h2>
        <p class="text-slate-500 text-xs">Live order preparation management</p>
      </div>
      <span class="badge badge-preparing">
        ${state.orders.filter(o => o.status === 'Preparing').length} Orders Preparing
      </span>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <!-- Order List -->
      <div class="lg:col-span-2 space-y-4">
        ${state.orders.map(order => `
          <div class="solid-card p-5 border-l-4 ${order.status === 'Preparing' ? 'border-l-blue-600' : 'border-l-emerald-600'}">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div>
                <span class="text-base font-extrabold text-slate-900 mr-2">${order.orderId}</span>
                <span class="badge ${order.status === 'Preparing' ? 'badge-preparing' : 'badge-success'}">${order.status}</span>
                <span class="text-xs text-slate-500 block mt-0.5">${order.dateTime} | Customer: ${order.customerName}</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-extrabold text-emerald-600">RM ${order.totalPayable.toFixed(2)}</span>
                <span class="text-xs text-slate-400 block">${order.paymentMethod}</span>
              </div>
            </div>

            <div class="space-y-1.5 mb-4">
              ${order.items.map(item => `
                <div class="flex justify-between text-xs bg-slate-50 px-3 py-1.5 rounded border border-slate-100">
                  <span class="font-bold text-slate-800">${item.qty}x ${item.name}</span>
                  <span class="text-slate-500">${item.notes || 'Standard'}</span>
                </div>
              `).join('')}
            </div>

            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500">Store: ${order.restaurantName}</span>
              ${order.status === 'Preparing' ? `
                <button onclick="updateOrderStatus('${order.orderId}', 'Delivering')" class="btn-primary text-xs py-1.5 px-3">
                  Ready for Delivery Rider
                </button>
              ` : `
                <span class="text-xs text-emerald-600 font-bold"><i class="fa-solid fa-check"></i> Out with Rider</span>
              `}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Quick Menu Availability Controls -->
      <div class="solid-card p-5">
        <h3 class="text-sm font-bold text-slate-900 mb-1">Menu Management</h3>
        <p class="text-xs text-slate-500 mb-4">Toggle item availability</p>
        <div class="space-y-2.5">
          ${state.menu.map(item => `
            <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
              <div>
                <span class="text-xs font-bold text-slate-800 block">${item.name}</span>
                <span class="text-[11px] text-emerald-600 font-bold">RM ${item.price.toFixed(2)}</span>
              </div>
              <button onclick="toggleMenuAvailability('${item.id}')" class="px-2.5 py-1 rounded text-xs font-bold ${item.available ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 'bg-rose-100 text-rose-700 border border-rose-300'}">
                ${item.available ? 'In Stock' : 'Out of Stock'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// 3. RIDER DASHBOARD
function renderRiderDashboard() {
  const activeDeliveries = state.orders.filter(o => o.status === 'Delivering' || o.status === 'Preparing');

  return `
    <div class="mb-5">
      <h2 class="text-xl font-extrabold text-slate-900">🛵 Rider Delivery Logistics Console</h2>
      <p class="text-slate-500 text-xs">Dispatch & route progress management</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
      ${activeDeliveries.map(order => `
        <div class="solid-card p-5">
          <div class="flex items-center justify-between mb-3">
            <span class="text-base font-extrabold text-slate-900">${order.orderId}</span>
            <span class="badge ${order.status === 'Delivering' ? 'badge-delivering' : 'badge-preparing'}">${order.status}</span>
          </div>

          <div class="space-y-2 text-xs mb-4">
            <div class="p-2.5 bg-slate-50 rounded border border-slate-200">
              <span class="text-slate-400 font-bold block mb-0.5">Pick-Up Store:</span>
              <span class="text-slate-800 font-bold">${order.restaurantName}</span>
            </div>
            <div class="p-2.5 bg-slate-50 rounded border border-slate-200">
              <span class="text-slate-400 font-bold block mb-0.5">Customer Address:</span>
              <span class="text-slate-800 font-bold">${order.customerName} (${order.contactPhone})</span>
              <span class="text-slate-600 block mt-0.5">${order.deliveryAddress}</span>
            </div>
          </div>

          <!-- GPS Progress Bar -->
          <div class="mb-4">
            <div class="flex justify-between text-xs mb-1 font-bold">
              <span class="text-slate-500">Delivery Route Progress</span>
              <span class="text-emerald-600">${order.riderGpsProgress}%</span>
            </div>
            <div class="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
              <div class="h-full bg-emerald-600 rounded-full transition-all" style="width: ${order.riderGpsProgress}%"></div>
            </div>
          </div>

          <div class="flex gap-2">
            <button onclick="simulateRiderMovement('${order.orderId}')" class="btn-secondary text-xs py-1.5 w-full">
              Update GPS Route (+20%)
            </button>
            ${order.status === 'Delivering' ? `
              <button onclick="updateOrderStatus('${order.orderId}', 'Delivered')" class="btn-primary text-xs py-1.5 w-full">
                Mark Delivered
              </button>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 4. ANALYTICS DASHBOARD
function renderAnalyticsDashboard() {
  return `
    <div class="mb-5">
      <h2 class="text-xl font-extrabold text-slate-900">📊 Executive Analytics Matrix</h2>
      <p class="text-slate-500 text-xs">Food Dinosaur Sdn. Bhd. Departmental Metrics</p>
    </div>

    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <div class="solid-card p-4 border-l-4 border-l-emerald-600">
        <span class="text-xs text-slate-500 font-bold block">Annual Revenue</span>
        <span class="text-xl font-extrabold text-slate-900">RM 1,466,000</span>
        <span class="text-[11px] text-emerald-600 font-bold block mt-0.5">Year 1 Target Met</span>
      </div>
      <div class="solid-card p-4 border-l-4 border-l-amber-500">
        <span class="text-xs text-slate-500 font-bold block">Daily Orders</span>
        <span class="text-xl font-extrabold text-slate-900">200 / day</span>
        <span class="text-[11px] text-amber-600 font-bold block mt-0.5">Avg RM10 profit</span>
      </div>
      <div class="solid-card p-4 border-l-4 border-l-blue-500">
        <span class="text-xs text-slate-500 font-bold block">Avg Delivery Time</span>
        <span class="text-xl font-extrabold text-slate-900">18.4 mins</span>
        <span class="text-[11px] text-blue-600 font-bold block mt-0.5">94% on-time</span>
      </div>
      <div class="solid-card p-4 border-l-4 border-l-purple-500">
        <span class="text-xs text-slate-500 font-bold block">Customer Rating</span>
        <span class="text-xl font-extrabold text-slate-900">4.9 / 5.0</span>
        <span class="text-[11px] text-purple-600 font-bold block mt-0.5">1,420 Reviews</span>
      </div>
    </div>

    <!-- 11 Department Operational Status Grid -->
    <h3 class="text-sm font-bold text-slate-900 mb-3">11 Departments Matrix</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
      ${[
        { dept: '1. Accounting', metric: 'Financial Statements OK' },
        { dept: '2. Finance', metric: 'Payback 1.41 Years' },
        { dept: '3. Human Resource', metric: 'EPF/SOCSO Compliant' },
        { dept: '4. Food Sale & Delivery', metric: 'Fulfillment 99.2%' },
        { dept: '5. Marketing', metric: 'Voucher Adoption +18%' },
        { dept: '6. Operations', metric: 'Rider Allocation OK' },
        { dept: '7. R&D Department', metric: 'App 2.0 Testing' },
        { dept: '8. Customer Service', metric: 'Inquiries -30%' },
        { dept: '9. IT Department', metric: 'SQL Server Uptime 99.9%' },
        { dept: '10. Quality Assurance', metric: 'Zero Critical Defects' },
        { dept: '11. Legal & Compliance', metric: 'Data Protection OK' }
      ].map(item => `
        <div class="solid-card p-3 flex items-center justify-between">
          <div>
            <span class="text-xs font-bold text-slate-900 block">${item.dept}</span>
            <span class="text-[11px] text-slate-500">${item.metric}</span>
          </div>
          <span class="badge badge-success">Optimal</span>
        </div>
      `).join('')}
    </div>
  `;
}

// TASK 1 & TASK 2 DATA INPUT SCREEN MODAL ("Create Food Order")
function renderCheckoutModalContent() {
  const subtotal = state.cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);
  const sst = subtotal * 0.08;
  const deliveryFee = subtotal > 0 ? 5.00 : 0.00;
  const discount = subtotal * (state.promoCode === 'DINOSAVE10' ? 0.10 : 0.00);
  const totalPayable = subtotal + sst + deliveryFee - discount;

  return `
    <div class="modal-container p-6">
      <!-- Modal Header -->
      <div class="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
        <div>
          <span class="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">TASK 1 DATA INPUT SCREEN DESIGN</span>
          <h2 class="text-xl font-extrabold text-slate-900">Create Food Order</h2>
        </div>
        <button onclick="closeCheckoutModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">
          ✕
        </button>
      </div>

      <form onsubmit="handleFormSubmit(event)" class="space-y-5">
        <!-- Section 1: General Information -->
        <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h3 class="text-xs font-extrabold text-slate-700 uppercase mb-3">General Information</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label class="form-label">
                <span>[1] Order ID</span>
                <span class="val-tag val-tag-none">None (Auto-Generated)</span>
              </label>
              <input type="text" value="FD-ORD-20260801-094" readonly class="form-input" />
            </div>
            <div>
              <label class="form-label">
                <span>[2] Order Date & Time</span>
                <span class="val-tag val-tag-none">None (System-Filled)</span>
              </label>
              <input type="text" value="01/08/2026 14:30" readonly class="form-input" />
            </div>
          </div>
        </div>

        <!-- Section 2: Customer & Delivery Details -->
        <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h3 class="text-xs font-extrabold text-slate-700 uppercase mb-3">Customer & Delivery Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
            <div>
              <label class="form-label">
                <span>[3] Customer ID</span>
                <span class="val-tag val-tag-none">None (Imported Data)</span>
              </label>
              <input type="text" value="CUST-88204 (Lee Jia Hong)" readonly class="form-input" />
            </div>
            <div>
              <label class="form-label">
                <span>[4] Contact Phone</span>
                <span class="val-tag val-tag-active">Format & Length Check</span>
              </label>
              <input type="tel" id="input-phone" value="012-3456789" required class="form-input" />
            </div>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div class="md:col-span-2">
              <label class="form-label">
                <span>[5] Delivery Address</span>
                <span class="val-tag val-tag-active">Presence Check</span>
              </label>
              <input type="text" id="input-address" value="No. 12, Jalan Genting Klang, Setapak, Kuala Lumpur" required class="form-input" />
            </div>
            <div>
              <label class="form-label">
                <span>[6] Postal Code</span>
                <span class="val-tag val-tag-active">Range & 5-Digit Check</span>
              </label>
              <input type="text" id="input-postcode" value="53300" maxlength="5" pattern="[0-9]{5}" required class="form-input" />
            </div>
          </div>
        </div>

        <!-- Section 3: Restaurant & Delivery Options -->
        <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <h3 class="text-xs font-extrabold text-slate-700 uppercase mb-3">Restaurant & Options</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="form-label">
                <span>[7] Restaurant Name</span>
                <span class="val-tag val-tag-none">None (Selected Dropdown)</span>
              </label>
              <select class="form-input">
                <option selected>Dino Grill (Mid Valley)</option>
                <option>Dino Asian Kitchen (KLCC)</option>
              </select>
            </div>
            <div>
              <label class="form-label">
                <span>[8] Delivery Method</span>
                <span class="val-tag val-tag-none">None (Selected)</span>
              </label>
              <select class="form-input">
                <option selected>Standard Rider Delivery</option>
                <option>Express Delivery</option>
              </select>
            </div>
            <div>
              <label class="form-label">
                <span>[9] Preferred Time</span>
                <span class="val-tag val-tag-none">None (Selected)</span>
              </label>
              <select class="form-input">
                <option selected>15:00 - 15:30 (ASAP)</option>
                <option>16:00 - 16:30</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Section 4: Order Items List Table -->
        <div class="p-4 bg-slate-50 rounded-lg border border-slate-200 overflow-x-auto">
          <h3 class="text-xs font-extrabold text-slate-700 uppercase mb-3">Order Items List</h3>
          <table class="w-full text-left text-xs bg-white border border-slate-200 rounded">
            <thead>
              <tr class="bg-slate-100 border-b border-slate-200 text-slate-700 font-bold">
                <th class="p-2">[10] Food Item Selection</th>
                <th class="p-2">[11] Unit Price</th>
                <th class="p-2">[12] Quantity</th>
                <th class="p-2">[13] Special Instructions</th>
                <th class="p-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-200">
              ${state.cart.map(item => `
                <tr>
                  <td class="p-2 font-bold text-slate-900">${item.name}</td>
                  <td class="p-2 text-emerald-700 font-bold">RM ${item.price.toFixed(2)}</td>
                  <td class="p-2">
                    <input type="number" min="1" max="99" value="${item.quantity}" 
                           onchange="updateCartQty('${item.id}', this.value)"
                           class="w-14 border border-slate-300 rounded px-1.5 py-0.5 text-center font-bold text-slate-900" />
                  </td>
                  <td class="p-2">
                    <input type="text" value="${item.instructions}" 
                           onchange="updateCartNotes('${item.id}', this.value)"
                           placeholder="Notes e.g. Less ice"
                           class="border border-slate-300 rounded px-2 py-0.5 text-slate-700 w-full text-xs" />
                  </td>
                  <td class="p-2 text-right font-extrabold text-slate-900">RM ${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Section 5: Billing & Payment Summary -->
        <div class="p-4 bg-slate-50 rounded-lg border border-slate-200">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="space-y-3">
              <div>
                <label class="form-label">
                  <span>[14] Promo Code</span>
                  <span class="val-tag val-tag-active">Existence Check</span>
                </label>
                <div class="flex gap-2">
                  <input type="text" id="promo-input" value="${state.promoCode}" class="form-input uppercase" />
                  <button type="button" onclick="applyPromoCode()" class="btn-secondary text-xs">Apply</button>
                </div>
              </div>

              <div>
                <label class="form-label">
                  <span>[15] Payment Method</span>
                  <span class="val-tag val-tag-none">None (Selected)</span>
                </label>
                <select class="form-input">
                  <option selected>Online Banking (FPX)</option>
                  <option>Touch 'n Go E-Wallet</option>
                  <option>Credit / Debit Card</option>
                </select>
              </div>
            </div>

            <div class="bg-white p-3.5 rounded border border-slate-200 space-y-1.5 text-xs">
              <div class="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span class="font-bold text-slate-900">RM ${subtotal.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-slate-600">
                <span>SST Tax (8%):</span>
                <span class="font-bold text-slate-900">RM ${sst.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-slate-600">
                <span>Delivery Fee:</span>
                <span class="font-bold text-slate-900">RM ${deliveryFee.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-emerald-700">
                <span>Discount (10%):</span>
                <span class="font-bold">-RM ${discount.toFixed(2)}</span>
              </div>
              <div class="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-emerald-700">
                <span>TOTAL PAYABLE:</span>
                <span class="text-base text-slate-900">RM ${totalPayable.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Submit Button -->
        <div class="flex justify-end gap-2 pt-2 border-t border-slate-200">
          <button type="button" onclick="closeCheckoutModal()" class="btn-secondary text-xs">Cancel</button>
          <button type="submit" class="btn-primary text-xs py-2 px-5">
            Submit & Process Order
          </button>
        </div>
      </form>
    </div>
  `;
}

// Order Tracking Modal
function renderOrderTrackingModalContent() {
  const activeOrder = state.orders[0];
  if (!activeOrder) return '';

  return `
    <div class="modal-container p-6">
      <div class="flex items-center justify-between pb-3 border-b border-slate-200 mb-4">
        <div>
          <span class="badge badge-preparing mb-1">Live Order Progress</span>
          <h2 class="text-lg font-extrabold text-slate-900">Tracking Order: ${activeOrder.orderId}</h2>
        </div>
        <button onclick="closeTrackingModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">✕</button>
      </div>

      <!-- Simple Stepper -->
      <div class="grid grid-cols-4 gap-2 text-center text-xs mb-6 font-bold">
        <div class="p-2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">1. Placed</div>
        <div class="p-2 rounded bg-blue-100 text-blue-800 border border-blue-300">2. Preparing</div>
        <div class="p-2 rounded bg-slate-100 text-slate-500">3. Delivering</div>
        <div class="p-2 rounded bg-slate-100 text-slate-500">4. Delivered</div>
      </div>

      <div class="p-4 bg-slate-50 rounded border border-slate-200 text-center mb-4">
        <div class="text-2xl mb-1">🛵</div>
        <p class="text-sm font-bold text-slate-900">Rider ${activeOrder.riderName} is preparing your delivery</p>
        <p class="text-xs text-slate-500 mt-0.5">Estimated Arrival: 15:22 PM</p>
      </div>

      <div class="flex justify-end">
        <button onclick="closeTrackingModal()" class="btn-primary text-xs">Close Tracker</button>
      </div>
    </div>
  `;
}

// Event Handlers
window.switchTab = function(tabName) {
  state.activeTab = tabName;
  renderApp();
};

window.selectCategory = function(catId) {
  state.selectedCategory = catId;
  renderApp();
};

window.handleSearch = function(query) {
  state.searchQuery = query;
  renderApp();
};

window.addToCart = function(itemId) {
  const menuItem = state.menu.find(m => m.id === itemId);
  if (!menuItem) return;

  const existingCartItem = state.cart.find(c => c.id === itemId);
  if (existingCartItem) {
    existingCartItem.quantity += 1;
  } else {
    state.cart.push({
      id: menuItem.id,
      name: menuItem.name,
      price: menuItem.price,
      quantity: 1,
      instructions: '',
      image: menuItem.image
    });
  }

  showToast(`Added "${menuItem.name}" to cart`);
  renderApp();
};

window.updateCartQty = function(itemId, newQty) {
  const item = state.cart.find(i => i.id === itemId);
  if (item) {
    item.quantity = parseInt(newQty) || 1;
    renderApp();
  }
};

window.updateCartNotes = function(itemId, newNotes) {
  const item = state.cart.find(i => i.id === itemId);
  if (item) {
    item.instructions = newNotes;
  }
};

window.openCheckoutModal = function() {
  document.getElementById('checkout-modal')?.classList.add('active');
};

window.closeCheckoutModal = function() {
  document.getElementById('checkout-modal')?.classList.remove('active');
};

window.openTrackingModal = function() {
  document.getElementById('tracking-modal')?.classList.add('active');
};

window.closeTrackingModal = function() {
  document.getElementById('tracking-modal')?.classList.remove('active');
};

window.applyPromoCode = function() {
  const input = document.getElementById('promo-input');
  if (input && input.value.trim().toUpperCase() === 'DINOSAVE10') {
    state.promoCode = 'DINOSAVE10';
    showToast('Promo code DINOSAVE10 applied!');
    renderApp();
    openCheckoutModal();
  } else {
    showToast('Invalid promo code. Try "DINOSAVE10"', 'error');
  }
};

window.handleFormSubmit = function(event) {
  event.preventDefault();
  closeCheckoutModal();
  showToast('Order successfully created & submitted!');
  openTrackingModal();
};

window.updateOrderStatus = function(orderId, newStatus) {
  const order = state.orders.find(o => o.orderId === orderId);
  if (order) {
    order.status = newStatus;
    showToast(`Order ${orderId} updated to: ${newStatus}`);
    renderApp();
  }
};

window.toggleMenuAvailability = function(itemId) {
  const item = state.menu.find(m => m.id === itemId);
  if (item) {
    item.available = !item.available;
    showToast(`"${item.name}" availability updated`);
    renderApp();
  }
};

window.simulateRiderMovement = function(orderId) {
  const order = state.orders.find(o => o.orderId === orderId);
  if (order) {
    order.riderGpsProgress = Math.min(100, order.riderGpsProgress + 20);
    showToast(`Rider GPS at ${order.riderGpsProgress}%`);
    renderApp();
  }
};

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-check text-emerald-400' : 'fa-triangle-exclamation text-rose-400'}"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 2500);
}

initApp();
