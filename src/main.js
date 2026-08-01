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
  discountPercentage: 0.10, // 10%
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
      description: 'Signature flame-grilled double beef patty burger with melted cheddar, crisp lettuce, fries & soft drink.'
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
      description: 'Freshly brewed black tea infused with natural honey lemon slices and cooling mint.'
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
      description: 'Slow-cooked hickory smoked pork/beef ribs slathered in rich Dino BBQ sauce served with corn on the cob.'
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
      description: '3 pieces of spicy golden fried chicken with dipping garlic sauce, coleslaw and waffle fries.'
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
      description: 'Fragrant coconut rice served with crispy rendang chicken, sambal, boiled egg, roasted peanuts & anchovies.'
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
      description: 'Warm dark chocolate cake with a molten chocolate centre, topped with vanilla ice cream.'
    }
  ]
};

// Main App Controller
function initApp() {
  renderApp();
}

function renderApp() {
  const appElement = document.getElementById('app');
  appElement.innerHTML = `
    <!-- Top Navigation Header -->
    <header class="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 px-4 lg:px-8 py-3">
      <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-3 cursor-pointer" onclick="switchTab('customer')">
          <div class="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-2xl shadow-lg shadow-emerald-900/40">
            🦖
          </div>
          <div>
            <h1 class="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
              FOOD DINOSAUR <span class="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-800">Sdn. Bhd.</span>
            </h1>
            <p class="text-xs text-slate-400 font-medium">Food Ordering & Delivery System</p>
          </div>
        </div>

        <!-- Role Switcher Navigation -->
        <nav class="flex items-center bg-slate-800/80 p-1.5 rounded-xl border border-slate-700/60">
          <button onclick="switchTab('customer')" class="px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${state.activeTab === 'customer' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
            <i class="fa-solid font-bold fa-utensils"></i> Customer Ordering
          </button>
          <button onclick="switchTab('kitchen')" class="px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${state.activeTab === 'kitchen' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
            <i class="fa-solid fa-fire-burner"></i> Kitchen Queue
          </button>
          <button onclick="switchTab('rider')" class="px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${state.activeTab === 'rider' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
            <i class="fa-solid fa-motorcycle"></i> Rider Tracker
          </button>
          <button onclick="switchTab('analytics')" class="px-4 py-2 rounded-lg text-sm font-bold transition-all flex items-center gap-2 ${state.activeTab === 'analytics' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}">
            <i class="fa-solid fa-chart-line"></i> Analytics
          </button>
        </nav>

        <!-- Right Quick Controls -->
        <div class="flex items-center gap-3">
          <button onclick="openCheckoutModal()" class="btn-primary flex items-center gap-2">
            <i class="fa-solid fa-file-signature"></i>
            <span>Create Food Order</span>
            <span class="bg-emerald-950 text-emerald-300 text-xs px-2 py-0.5 rounded-full font-bold">Task 1 Design</span>
          </button>
          <button onclick="toggleCartDrawer()" class="btn-secondary relative flex items-center gap-2">
            <i class="fa-solid fa-cart-shopping"></i>
            <span>Cart</span>
            <span class="bg-amber-500 text-slate-950 font-extrabold text-xs px-2 py-0.5 rounded-full">
              ${state.cart.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          </button>
        </div>
      </div>
    </header>

    <!-- Main Content Body -->
    <main class="max-w-7xl mx-auto px-4 lg:px-8 py-8">
      ${renderActiveTabContent()}
    </main>

    <!-- Task 1 & 2 Data Input Screen Modal ("Create Food Order") -->
    <div id="checkout-modal" class="modal-overlay">
      ${renderCheckoutModalContent()}
    </div>

    <!-- Live Order Tracking Modal -->
    <div id="tracking-modal" class="modal-overlay">
      ${renderOrderTrackingModalContent()}
    </div>

    <!-- Toast Notification Container -->
    <div id="toast-container" class="toast-container"></div>
  `;
}

// Render active tab view
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

// 1. CUSTOMER PORTAL VIEW
function renderCustomerPortal() {
  const filteredMenu = state.menu.filter(item => {
    const matchesCategory = state.selectedCategory === 'all' || item.category === state.selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return `
    <!-- Hero Banner -->
    <div class="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-950 via-slate-900 to-teal-950 border border-emerald-800/40 p-8 mb-8 shadow-2xl">
      <div class="relative z-10 max-w-2xl">
        <span class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-4">
          <i class="fa-solid fa-bolt"></i> Fast 20-Min Express Delivery
        </span>
        <h2 class="text-3xl lg:text-4xl font-extrabold text-white mb-3">
          Delicious Food Delivered at <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">Dinosaur Speed!</span> 🦖
        </h2>
        <p class="text-slate-300 text-sm mb-6 leading-relaxed">
          Order from your favorite local restaurants with real-time GPS tracking, secure online payments, and instant kitchen updates.
        </p>

        <!-- Search Bar -->
        <div class="flex items-center bg-slate-900/90 border border-slate-700 rounded-xl p-2 shadow-lg">
          <i class="fa-solid fa-magnifying-glass text-slate-400 pl-3"></i>
          <input type="text" placeholder="Search burgers, drinks, combos..." 
                 value="${state.searchQuery}"
                 oninput="handleSearch(this.value)"
                 class="w-full bg-transparent border-none text-white px-3 focus:outline-none text-sm" />
          <button class="btn-primary py-2 text-xs">Search</button>
        </div>
      </div>
    </div>

    <!-- Category Filters -->
    <div class="flex items-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-none">
      ${[
        { id: 'all', label: 'All Dishes 🍽️' },
        { id: 'combos', label: 'Dino Combos 🥩' },
        { id: 'burgers', label: 'Burgers 🍔' },
        { id: 'drinks', label: 'Beverages 🍹' },
        { id: 'asian', label: 'Asian Delights 🍜' },
        { id: 'desserts', label: 'Desserts 🍰' }
      ].map(cat => `
        <button onclick="selectCategory('${cat.id}')" 
                class="px-4 py-2 rounded-xl font-bold text-xs whitespace-nowrap transition-all border ${state.selectedCategory === cat.id ? 'bg-emerald-600 text-white border-emerald-500 shadow-md shadow-emerald-950' : 'bg-slate-800/80 text-slate-300 border-slate-700/60 hover:bg-slate-700'}">
          ${cat.label}
        </button>
      `).join('')}
    </div>

    <!-- Food Item Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      ${filteredMenu.map(item => `
        <div class="glass-panel glass-panel-interactive overflow-hidden flex flex-col justify-between">
          <div>
            <div class="relative h-48 overflow-hidden bg-slate-800">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" />
              <div class="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-bold text-amber-400 flex items-center gap-1">
                <i class="fa-solid fa-star text-amber-400"></i> ${item.rating}
              </div>
              <div class="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md text-emerald-400 px-2.5 py-1 rounded-lg text-xs font-bold border border-emerald-800/50">
                ⏱️ ${item.prepTime}
              </div>
            </div>

            <div class="p-5">
              <h3 class="text-lg font-bold text-white mb-2 line-clamp-1">${item.name}</h3>
              <p class="text-slate-400 text-xs line-clamp-2 mb-4 leading-relaxed">${item.description}</p>
            </div>
          </div>

          <div class="px-5 pb-5 pt-0 flex items-center justify-between border-t border-slate-800/60 pt-4">
            <div>
              <span class="text-xs text-slate-400 block font-medium">Price</span>
              <span class="text-xl font-extrabold text-emerald-400">RM ${item.price.toFixed(2)}</span>
            </div>
            <button onclick="addToCart('${item.id}')" class="btn-primary text-xs py-2 px-4">
              <i class="fa-solid fa-plus"></i> Add to Cart
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 2. KITCHEN DASHBOARD VIEW
function renderKitchenDashboard() {
  return `
    <div class="mb-6 flex items-center justify-between">
      <div>
        <h2 class="text-2xl font-bold text-white flex items-center gap-2">
          👨‍🍳 Restaurant Kitchen & Order Queue
        </h2>
        <p class="text-slate-400 text-xs">Live order preparation management for partner restaurants</p>
      </div>
      <div class="flex items-center gap-3">
        <span class="badge badge-preparing">
          <i class="fa-solid fa-spinner animate-spin"></i> ${state.orders.filter(o => o.status === 'Preparing').length} Active Orders
        </span>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Order Queue Column -->
      <div class="lg:col-span-2 space-y-4">
        <h3 class="text-lg font-bold text-white mb-3">Incoming Orders</h3>
        ${state.orders.length === 0 ? `
          <div class="glass-panel p-8 text-center text-slate-400">No active orders right now.</div>
        ` : state.orders.map(order => `
          <div class="glass-panel p-6 border-l-4 ${order.status === 'Preparing' ? 'border-l-teal-500' : order.status === 'Delivering' ? 'border-l-purple-500' : 'border-l-emerald-500'}">
            <div class="flex items-center justify-between mb-4 pb-3 border-b border-slate-800">
              <div>
                <div class="flex items-center gap-2">
                  <span class="text-base font-extrabold text-white">${order.orderId}</span>
                  <span class="badge ${order.status === 'Preparing' ? 'badge-preparing' : order.status === 'Delivering' ? 'badge-delivering' : 'badge-success'}">
                    ${order.status}
                  </span>
                </div>
                <span class="text-xs text-slate-400">${order.dateTime} | Customer: ${order.customerName}</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-extrabold text-emerald-400">RM ${order.totalPayable.toFixed(2)}</span>
                <span class="text-xs block text-slate-400">${order.paymentMethod}</span>
              </div>
            </div>

            <div class="space-y-2 mb-4">
              <span class="text-xs font-bold text-slate-300 block">Ordered Items:</span>
              ${order.items.map(item => `
                <div class="flex items-center justify-between bg-slate-900/60 px-3 py-2 rounded-lg text-xs">
                  <span class="text-slate-200 font-semibold">${item.qty}x ${item.name}</span>
                  <span class="text-amber-400 italic">${item.notes || 'Standard'}</span>
                </div>
              `).join('')}
            </div>

            <div class="flex items-center justify-between pt-2">
              <span class="text-xs text-slate-400"><i class="fa-solid fa-store"></i> ${order.restaurantName}</span>
              <div class="flex gap-2">
                ${order.status === 'Pending' ? `
                  <button onclick="updateOrderStatus('${order.orderId}', 'Preparing')" class="btn-primary text-xs py-1.5 px-3">
                    Start Cooking
                  </button>
                ` : order.status === 'Preparing' ? `
                  <button onclick="updateOrderStatus('${order.orderId}', 'Delivering')" class="btn-primary bg-purple-600 text-xs py-1.5 px-3">
                    Ready for Delivery Rider
                  </button>
                ` : `
                  <span class="text-xs text-emerald-400 font-bold"><i class="fa-solid fa-check-circle"></i> Out with Rider</span>
                `}
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Quick Menu Availability Toggle (Menu Management system function) -->
      <div>
        <h3 class="text-lg font-bold text-white mb-3">Quick Menu Controls</h3>
        <div class="glass-panel p-5 space-y-4">
          <p class="text-xs text-slate-400">Toggle item availability in real-time to avoid order cancellations.</p>
          ${state.menu.map(item => `
            <div class="flex items-center justify-between p-3 bg-slate-900/70 rounded-xl border border-slate-800">
              <div>
                <span class="text-xs font-bold text-white block">${item.name}</span>
                <span class="text-xs text-emerald-400">RM ${item.price.toFixed(2)}</span>
              </div>
              <button onclick="toggleMenuAvailability('${item.id}')" class="px-3 py-1 rounded-lg text-xs font-bold ${item.available ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'}">
                ${item.available ? 'In Stock' : 'Out of Stock'}
              </button>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// 3. RIDER DASHBOARD VIEW
function renderRiderDashboard() {
  const activeDeliveries = state.orders.filter(o => o.status === 'Delivering' || o.status === 'Preparing');

  return `
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        🛵 Delivery Rider Logistics Console
      </h2>
      <p class="text-slate-400 text-xs">Real-time order dispatch and delivery GPS updates</p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      ${activeDeliveries.length === 0 ? `
        <div class="glass-panel p-8 text-center text-slate-400 lg:col-span-2">No assigned delivery tasks currently.</div>
      ` : activeDeliveries.map(order => `
        <div class="glass-panel p-6 border border-emerald-800/40">
          <div class="flex items-center justify-between mb-4">
            <span class="text-base font-extrabold text-white">${order.orderId}</span>
            <span class="badge ${order.status === 'Delivering' ? 'badge-delivering' : 'badge-preparing'}">
              ${order.status}
            </span>
          </div>

          <div class="space-y-3 mb-6 text-xs">
            <div class="p-3 bg-slate-900/80 rounded-lg">
              <span class="text-slate-400 block mb-1 font-semibold">📍 Pick-Up Location:</span>
              <span class="text-white font-bold">${order.restaurantName}</span>
            </div>
            <div class="p-3 bg-slate-900/80 rounded-lg">
              <span class="text-slate-400 block mb-1 font-semibold">🏠 Drop-Off Customer Address:</span>
              <span class="text-white font-bold">${order.customerName} (${order.contactPhone})</span>
              <span class="text-slate-300 block mt-1">${order.deliveryAddress}</span>
            </div>
          </div>

          <!-- GPS Progress Bar -->
          <div class="mb-6">
            <div class="flex justify-between text-xs mb-1 font-semibold">
              <span class="text-slate-400">Delivery GPS Route Progress</span>
              <span class="text-emerald-400">${order.riderGpsProgress}% Completed</span>
            </div>
            <div class="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
              <div class="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full transition-all duration-500" style="width: ${order.riderGpsProgress}%"></div>
            </div>
          </div>

          <div class="flex items-center justify-between gap-3">
            <button onclick="simulateRiderMovement('${order.orderId}')" class="btn-secondary text-xs py-2 w-full">
              <i class="fa-solid fa-location-arrow"></i> Move GPS Rider
            </button>
            ${order.status === 'Delivering' ? `
              <button onclick="updateOrderStatus('${order.orderId}', 'Delivered')" class="btn-primary text-xs py-2 w-full">
                <i class="fa-solid fa-circle-check"></i> Mark Delivered
              </button>
            ` : ''}
          </div>
        </div>
      `).join('')}
    </div>
  `;
}

// 4. ANALYTICS & DEPARTMENT DASHBOARD VIEW
function renderAnalyticsDashboard() {
  return `
    <div class="mb-6">
      <h2 class="text-2xl font-bold text-white flex items-center gap-2">
        📊 Food Dinosaur Sdn. Bhd. - Executive Dashboard
      </h2>
      <p class="text-slate-400 text-xs">Live business intelligence across all 11 departments</p>
    </div>

    <!-- Top KPI Cards -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="glass-panel p-5 border-l-4 border-l-emerald-500">
        <span class="text-xs text-slate-400 font-semibold block">Total Revenue</span>
        <span class="text-2xl font-extrabold text-emerald-400">RM 1,466,000</span>
        <span class="text-xs text-emerald-500 font-bold block mt-1">↑ +14.2% Year 1 Target</span>
      </div>
      <div class="glass-panel p-5 border-l-4 border-l-amber-500">
        <span class="text-xs text-slate-400 font-semibold block">Daily Orders</span>
        <span class="text-2xl font-extrabold text-amber-400">200 / day</span>
        <span class="text-xs text-amber-500 font-bold block mt-1">Average RM10 profit/order</span>
      </div>
      <div class="glass-panel p-5 border-l-4 border-l-cyan-500">
        <span class="text-xs text-slate-400 font-semibold block">Avg Delivery Time</span>
        <span class="text-2xl font-extrabold text-cyan-400">18.4 mins</span>
        <span class="text-xs text-cyan-500 font-bold block mt-1">⚡ 94% on-time rate</span>
      </div>
      <div class="glass-panel p-5 border-l-4 border-l-purple-500">
        <span class="text-xs text-slate-400 font-semibold block">Customer Satisfaction</span>
        <span class="text-2xl font-extrabold text-purple-400">4.9 / 5.0</span>
        <span class="text-xs text-purple-500 font-bold block mt-1">Based on 1,420 reviews</span>
      </div>
    </div>

    <!-- 11 Department Operational Status Grid -->
    <h3 class="text-lg font-bold text-white mb-4">11 Departments Operational Matrix</h3>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      ${[
        { dept: '1. Accounting', status: 'Optimal', metric: 'Financial Statements Updated', icon: 'fa-calculator' },
        { dept: '2. Finance', status: 'Optimal', metric: 'ROI Payback 1.41 Years', icon: 'fa-chart-pie' },
        { dept: '3. Human Resource', status: 'Optimal', metric: 'Statutory EPF/SOCSO Compliant', icon: 'fa-users' },
        { dept: '4. Food Sale & Delivery', status: 'Active', metric: 'Order Fulfillment 99.2%', icon: 'fa-utensils' },
        { dept: '5. Marketing', status: 'Active', metric: 'Voucher Adoption +18%', icon: 'fa-bullhorn' },
        { dept: '6. Operations', status: 'Optimal', metric: 'Rider Allocation Active', icon: 'fa-gears' },
        { dept: '7. Research & Development', status: 'Active', metric: 'Mobile App 2.0 Feature Tests', icon: 'fa-lightbulb' },
        { dept: '8. Customer Service', status: 'Optimal', metric: 'Support Inquiries Reduced -30%', icon: 'fa-headset' },
        { dept: '9. IT Department', status: 'Optimal', metric: 'SQL Server & Server Uptime 99.9%', icon: 'fa-server' },
        { dept: '10. Quality Assurance', status: 'Optimal', metric: 'Zero Critical Defects', icon: 'fa-shield-halved' },
        { dept: '11. Legal & Compliance', status: 'Optimal', metric: 'DigiCert SSL & Data Protection OK', icon: 'fa-scale-balanced' }
      ].map(item => `
        <div class="glass-panel p-4 flex items-center justify-between border border-slate-800">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-lg bg-slate-800 text-emerald-400 flex items-center justify-center text-sm">
              <i class="fa-solid ${item.icon}"></i>
            </div>
            <div>
              <span class="text-xs font-bold text-white block">${item.dept}</span>
              <span class="text-xs text-slate-400 block">${item.metric}</span>
            </div>
          </div>
          <span class="badge badge-success text-[10px]">${item.status}</span>
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
    <div class="modal-container p-6 lg:p-8">
      <!-- Modal Header matching Task 1 Screen Title -->
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <span class="text-xs font-bold text-emerald-400 uppercase tracking-widest block mb-1">DATA INPUT SCREEN DESIGN (TASK 1)</span>
          <h2 class="text-2xl font-extrabold text-white flex items-center gap-3">
            Create Food Order
            <span class="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800">
              Transaction Screen
            </span>
          </h2>
        </div>
        <button onclick="closeCheckoutModal()" class="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <form onsubmit="handleFormSubmit(event)" class="space-y-6">
        <!-- Section 1: General Information -->
        <div class="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">General Information</h3>
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
        <div class="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Customer & Delivery Details</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
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
              <input type="tel" id="input-phone" value="012-3456789" required class="form-input" placeholder="e.g. 0123456789" />
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

        <!-- Section 3: Restaurant & Delivery Settings -->
        <div class="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Restaurant & Delivery Options</h3>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label class="form-label">
                <span>[7] Restaurant Name</span>
                <span class="val-tag val-tag-none">None (Selected Dropdown)</span>
              </label>
              <select class="form-input">
                <option selected>Dino Grill (Mid Valley)</option>
                <option>Dino Asian Kitchen (KLCC)</option>
                <option>Dino Express (Setapak)</option>
              </select>
            </div>
            <div>
              <label class="form-label">
                <span>[8] Delivery Method</span>
                <span class="val-tag val-tag-none">None (Selected)</span>
              </label>
              <select class="form-input">
                <option selected>Standard Rider Delivery</option>
                <option>Express 15-Min Delivery</option>
                <option>Self Pick-up</option>
              </select>
            </div>
            <div>
              <label class="form-label">
                <span>[9] Preferred Time Window</span>
                <span class="val-tag val-tag-none">None (Selected)</span>
              </label>
              <select class="form-input">
                <option selected>15:00 - 15:30 (ASAP)</option>
                <option>16:00 - 16:30</option>
                <option>18:00 - 18:30</option>
              </select>
            </div>
          </div>
        </div>

        <!-- Section 4: Order Items List Table -->
        <div class="p-4 bg-slate-900/60 rounded-xl border border-slate-800 overflow-x-auto">
          <h3 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Order Items List</h3>
          <table class="w-full text-left text-xs">
            <thead>
              <tr class="border-b border-slate-800 text-slate-400">
                <th class="pb-2">[10] Food Item Selection</th>
                <th class="pb-2">[11] Unit Price</th>
                <th class="pb-2">[12] Quantity</th>
                <th class="pb-2">[13] Special Instructions</th>
                <th class="pb-2 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/60">
              ${state.cart.map(item => `
                <tr>
                  <td class="py-3 font-bold text-white">${item.name}</td>
                  <td class="py-3 text-emerald-400">RM ${item.price.toFixed(2)}</td>
                  <td class="py-3">
                    <input type="number" min="1" max="99" value="${item.quantity}" 
                           onchange="updateCartQty('${item.id}', this.value)"
                           class="w-16 bg-slate-800 border border-slate-700 rounded px-2 py-1 text-center font-bold text-white" />
                  </td>
                  <td class="py-3">
                    <input type="text" value="${item.instructions}" 
                           onchange="updateCartNotes('${item.id}', this.value)"
                           placeholder="Notes e.g. Less ice"
                           class="bg-slate-800 border border-slate-700 rounded px-2 py-1 text-slate-300 w-full text-xs" />
                  </td>
                  <td class="py-3 text-right font-extrabold text-emerald-400">RM ${(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>

        <!-- Section 5: Billing & Payment Summary -->
        <div class="p-4 bg-slate-900/60 rounded-xl border border-slate-800">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-4">
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
                  <option>Cash on Delivery</option>
                </select>
              </div>
            </div>

            <div class="bg-slate-950/80 p-4 rounded-xl border border-slate-800/80 space-y-2 text-xs">
              <div class="flex justify-between text-slate-400">
                <span>Subtotal:</span>
                <span class="font-bold text-white">RM ${subtotal.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>SST Tax (8%):</span>
                <span class="font-bold text-white">RM ${sst.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-slate-400">
                <span>Delivery Fee:</span>
                <span class="font-bold text-white">RM ${deliveryFee.toFixed(2)}</span>
              </div>
              <div class="flex justify-between text-emerald-400">
                <span>Promo Discount (10%):</span>
                <span class="font-bold">-RM ${discount.toFixed(2)}</span>
              </div>
              <div class="border-t border-slate-800 pt-2 flex justify-between text-sm font-extrabold text-emerald-400">
                <span>TOTAL PAYABLE:</span>
                <span class="text-base text-white">RM ${totalPayable.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Form Action Buttons -->
        <div class="flex items-center justify-end gap-3 pt-4 border-t border-slate-800">
          <button type="button" onclick="closeCheckoutModal()" class="btn-secondary">Cancel</button>
          <button type="submit" class="btn-primary text-sm py-2.5 px-6">
            <i class="fa-solid fa-paper-plane"></i> Submit & Process Order
          </button>
        </div>
      </form>
    </div>
  `;
}

// Render Order Tracking Modal
function renderOrderTrackingModalContent() {
  const activeOrder = state.orders[0];
  if (!activeOrder) return '';

  return `
    <div class="modal-container p-6 lg:p-8">
      <div class="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
        <div>
          <span class="badge badge-preparing mb-1">Live Order Status</span>
          <h2 class="text-2xl font-extrabold text-white">Order Tracking - ${activeOrder.orderId}</h2>
        </div>
        <button onclick="closeTrackingModal()" class="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <!-- Stepper Progress -->
      <div class="grid grid-cols-4 gap-2 text-center text-xs mb-8">
        <div class="p-2 rounded-lg bg-emerald-950 text-emerald-400 font-bold border border-emerald-800">
          1. Placed
        </div>
        <div class="p-2 rounded-lg bg-teal-950 text-teal-400 font-bold border border-teal-800">
          2. Preparing
        </div>
        <div class="p-2 rounded-lg bg-slate-800 text-slate-400 font-semibold">
          3. Out for Delivery
        </div>
        <div class="p-2 rounded-lg bg-slate-800 text-slate-400 font-semibold">
          4. Delivered
        </div>
      </div>

      <!-- Simulated Rider Map -->
      <div class="relative h-64 bg-slate-950 rounded-xl overflow-hidden border border-slate-800 mb-6 flex items-center justify-center">
        <div class="absolute inset-0 opacity-20 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]"></div>
        
        <div class="relative z-10 text-center space-y-2">
          <div class="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500 flex items-center justify-center text-2xl mx-auto animate-pulse">
            🛵
          </div>
          <p class="text-sm font-bold text-white">Rider ${activeOrder.riderName} is on the way!</p>
          <p class="text-xs text-slate-400">Estimated Arrival: 15:22 PM (In ~8 mins)</p>
        </div>
      </div>

      <div class="flex justify-end">
        <button onclick="closeTrackingModal()" class="btn-primary">Close Tracker</button>
      </div>
    </div>
  `;
}

// Global Event Handlers
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

  showToast(`Added "${menuItem.name}" to cart!`);
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

window.toggleCartDrawer = function() {
  openCheckoutModal();
};

window.applyPromoCode = function() {
  const input = document.getElementById('promo-input');
  if (input && input.value.trim().toUpperCase() === 'DINOSAVE10') {
    state.promoCode = 'DINOSAVE10';
    showToast('Promo code DINOSAVE10 applied! 10% discount subtracted.');
    renderApp();
    openCheckoutModal();
  } else {
    showToast('Invalid promo code. Try "DINOSAVE10"!', 'error');
  }
};

window.handleFormSubmit = function(event) {
  event.preventDefault();
  closeCheckoutModal();
  showToast('Order successfully created & submitted! 🦖');
  openTrackingModal();
};

window.updateOrderStatus = function(orderId, newStatus) {
  const order = state.orders.find(o => o.orderId === orderId);
  if (order) {
    order.status = newStatus;
    showToast(`Order ${orderId} status updated to: ${newStatus}`);
    renderApp();
  }
};

window.toggleMenuAvailability = function(itemId) {
  const item = state.menu.find(m => m.id === itemId);
  if (item) {
    item.available = !item.available;
    showToast(`"${item.name}" availability set to ${item.available ? 'In Stock' : 'Out of Stock'}`);
    renderApp();
  }
};

window.simulateRiderMovement = function(orderId) {
  const order = state.orders.find(o => o.orderId === orderId);
  if (order) {
    order.riderGpsProgress = Math.min(100, order.riderGpsProgress + 20);
    showToast(`Rider GPS moved to ${order.riderGpsProgress}% progress`);
    renderApp();
  }
};

function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check text-emerald-400' : 'fa-triangle-exclamation text-rose-400'}"></i>
    <span class="text-xs font-semibold">${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}

// Start application
initApp();
