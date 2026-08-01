import './style.css';

// System State
const state = {
  activeTab: 'customer', // 'customer' | 'kitchen' | 'rider' | 'analytics'
  selectedRestaurant: 'all', // 'all' | restaurant ID
  selectedCategory: 'all',
  searchQuery: '',
  showAssignmentAnnotations: false,

  // Currently customizing food item in modal
  customizingItem: null,
  customization: {
    size: null,
    addons: [],
    notes: '',
    quantity: 1
  },

  cart: [
    {
      cartItemId: 'c-1',
      id: 'item-1',
      name: 'Dino Burger Combo Extra Large',
      restaurantName: 'Dino Grill & Steakhouse (Mid Valley)',
      basePrice: 18.50,
      sizeName: 'Large Combo (+RM 4.00)',
      sizePrice: 4.00,
      addons: [{ name: 'Extra Cheddar Cheese', price: 2.00 }],
      totalPricePerUnit: 24.50,
      quantity: 2,
      instructions: 'Extra cheese, no onion',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80'
    },
    {
      cartItemId: 'c-2',
      id: 'item-2',
      name: 'Dinosaur Iced Lemon Tea',
      restaurantName: 'Dino Grill & Steakhouse (Mid Valley)',
      basePrice: 5.00,
      sizeName: 'Regular',
      sizePrice: 0.00,
      addons: [],
      totalPricePerUnit: 5.00,
      quantity: 2,
      instructions: 'Less ice, 50% sugar',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80'
    }
  ],
  
  promoCode: 'DINOSAVE10',
  
  restaurants: [
    { id: 'rest-1', name: 'Dino Grill & Steakhouse', location: 'Mid Valley', tag: 'Burgers & Ribs', rating: 4.9, estTime: '15-20 mins' },
    { id: 'rest-2', name: 'Dinosaur Asian Kitchen', location: 'KLCC', tag: 'Nasi Lemak & Asian', rating: 4.8, estTime: '20-25 mins' },
    { id: 'rest-3', name: 'Jurassic Pizzeria', location: 'Setapak', tag: 'Wood-fired Pizza', rating: 4.9, estTime: '25-30 mins' },
    { id: 'rest-4', name: 'T-Rex Crispy Chicken', location: 'Bukit Bintang', tag: 'Fried Chicken', rating: 4.7, estTime: '15-20 mins' },
    { id: 'rest-5', name: 'Rex Dessert & Cafe', location: 'Subang', tag: 'Cakes & Coffee', rating: 4.9, estTime: '10-15 mins' }
  ],

  orders: [
    {
      orderId: 'FD-ORD-20260801-094',
      dateTime: '01/08/2026 14:30',
      customerId: 'CUST-88204',
      customerName: 'John',
      contactPhone: '012-3456789',
      deliveryAddress: 'No. 12, Jalan Genting Klang, Setapak, 53300 Kuala Lumpur',
      postalCode: '53300',
      restaurantName: 'Dino Grill & Steakhouse (Mid Valley)',
      deliveryMethod: 'Standard Rider Delivery',
      deliveryTime: '15:00 - 15:30',
      paymentMethod: 'Online Banking (FPX)',
      items: [
        { name: 'Dino Burger Combo Extra Large (Large Combo)', qty: 2, price: 24.50, notes: 'Extra cheese, no onion' },
        { name: 'Dinosaur Iced Lemon Tea (Regular)', qty: 2, price: 5.00, notes: 'Less ice, 50% sugar' }
      ],
      subtotal: 59.00,
      sst: 4.72,
      deliveryFee: 5.00,
      discount: 5.90,
      totalPayable: 62.82,
      status: 'Preparing',
      riderName: 'Ahmad Delivery Rider',
      riderGpsProgress: 45
    }
  ],

  menu: [
    {
      id: 'item-1',
      restaurantId: 'rest-1',
      restaurantName: 'Dino Grill & Steakhouse (Mid Valley)',
      name: 'Dino Burger Combo Extra Large',
      category: 'burgers',
      price: 18.50,
      rating: 4.9,
      prepTime: '15 mins',
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: 'Double flame-grilled beef patty burger with melted cheddar cheese, french fries and iced tea.',
      sizes: [
        { name: 'Regular Combo', price: 0.00 },
        { name: 'Large Combo (+RM 4.00)', price: 4.00 },
        { name: 'Monster Size (+RM 8.00)', price: 8.00 }
      ],
      addons: [
        { name: 'Extra Cheddar Cheese', price: 2.00 },
        { name: 'Crispy Beef Bacon', price: 3.50 },
        { name: 'Double Patty Upgrade', price: 6.00 }
      ]
    },
    {
      id: 'item-2',
      restaurantId: 'rest-1',
      restaurantName: 'Dino Grill & Steakhouse (Mid Valley)',
      name: 'Dinosaur Iced Lemon Tea',
      category: 'drinks',
      price: 5.00,
      rating: 4.8,
      prepTime: '5 mins',
      image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: 'Brewed black tea infused with natural honey lemon slices and cooling mint.',
      sizes: [
        { name: 'Regular 500ml', price: 0.00 },
        { name: 'Large 700ml (+RM 2.00)', price: 2.00 }
      ],
      addons: [
        { name: 'Add Honey Boba Pearls', price: 1.50 },
        { name: 'Extra Fresh Lemon Slices', price: 1.00 }
      ]
    },
    {
      id: 'item-3',
      restaurantId: 'rest-1',
      restaurantName: 'Dino Grill & Steakhouse (Mid Valley)',
      name: 'Jurassic Smoked BBQ Ribs',
      category: 'combos',
      price: 34.90,
      rating: 5.0,
      prepTime: '25 mins',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: 'Slow-cooked hickory smoked ribs with Dino BBQ sauce served with corn on the cob.',
      sizes: [
        { name: 'Half Rack (6 ribs)', price: 0.00 },
        { name: 'Full Rack (12 ribs) (+RM 28.00)', price: 28.00 }
      ],
      addons: [
        { name: 'Grilled Butter Corn', price: 4.00 },
        { name: 'Extra Smoky BBQ Dip', price: 2.50 }
      ]
    },
    {
      id: 'item-4',
      restaurantId: 'rest-4',
      restaurantName: 'T-Rex Crispy Chicken (Bukit Bintang)',
      name: 'Crispy Dino Fried Chicken Basket',
      category: 'combos',
      price: 22.90,
      rating: 4.9,
      prepTime: '15 mins',
      image: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: '3 pieces of spicy golden fried chicken with dipping garlic sauce and coleslaw.',
      sizes: [
        { name: '3-Piece Basket', price: 0.00 },
        { name: '5-Piece Bucket (+RM 12.00)', price: 12.00 }
      ],
      addons: [
        { name: 'Garlic Mayo Sauce', price: 1.50 },
        { name: 'Spicy Cheese Sauce', price: 2.00 }
      ]
    },
    {
      id: 'item-5',
      restaurantId: 'rest-2',
      restaurantName: 'Dinosaur Asian Kitchen (KLCC)',
      name: 'Jurassic Nasi Lemak Special',
      category: 'asian',
      price: 16.80,
      rating: 4.7,
      prepTime: '10 mins',
      image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: 'Coconut rice served with crispy rendang chicken, sambal, boiled egg & peanuts.',
      sizes: [
        { name: 'Standard Portion', price: 0.00 },
        { name: 'Double Chicken Portion (+RM 7.00)', price: 7.00 }
      ],
      addons: [
        { name: 'Extra Sambal Tumis', price: 1.50 },
        { name: 'Fried Sunny Egg', price: 2.00 }
      ]
    },
    {
      id: 'item-6',
      restaurantId: 'rest-3',
      restaurantName: 'Jurassic Pizzeria (Setapak)',
      name: 'T-Rex Pepperoni Pizza Supreme',
      category: 'pizza',
      price: 28.90,
      rating: 4.9,
      prepTime: '20 mins',
      image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: 'Hand-tossed sourdough pizza topped with double beef pepperoni and mozzarella.',
      sizes: [
        { name: '9-inch Regular', price: 0.00 },
        { name: '12-inch Large (+RM 10.00)', price: 10.00 }
      ],
      addons: [
        { name: 'Stuffed Crust Cheese', price: 5.00 },
        { name: 'Extra Truffle Oil Drizzle', price: 3.50 }
      ]
    },
    {
      id: 'item-7',
      restaurantId: 'rest-5',
      restaurantName: 'Rex Dessert & Cafe (Subang)',
      name: 'Molten Lava Chocolate Cake',
      category: 'desserts',
      price: 12.50,
      rating: 4.9,
      prepTime: '10 mins',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: 'Warm dark chocolate cake with a molten center, topped with vanilla ice cream.',
      sizes: [
        { name: 'Single Slice', price: 0.00 },
        { name: 'Double Delight (+RM 10.00)', price: 10.00 }
      ],
      addons: [
        { name: 'Extra Vanilla Ice Cream Scoop', price: 3.00 },
        { name: 'Salted Caramel Drizzle', price: 2.00 }
      ]
    },
    {
      id: 'item-8',
      restaurantId: 'rest-5',
      restaurantName: 'Rex Dessert & Cafe (Subang)',
      name: 'Iced Matcha Green Tea Latte',
      category: 'drinks',
      price: 11.00,
      rating: 4.8,
      prepTime: '5 mins',
      image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?auto=format&fit=crop&w=600&q=80',
      available: true,
      description: 'Premium Japanese Uji matcha whisked with fresh milk and brown sugar syrup.',
      sizes: [
        { name: 'Medium 16oz', price: 0.00 },
        { name: 'Large 22oz (+RM 3.00)', price: 3.00 }
      ],
      addons: [
        { name: 'Oat Milk Upgrade', price: 2.50 },
        { name: 'Matcha Cream Foam Cap', price: 2.00 }
      ]
    }
  ]
};

function initApp() {
  renderApp();
}

function renderApp() {
  const appElement = document.getElementById('app');
  appElement.innerHTML = `
    <!-- Solid Top Navigation Bar -->
    <header class="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div class="max-w-7xl mx-auto px-4 lg:px-8 h-16 flex items-center justify-between gap-4">
        <!-- Logo -->
        <div class="flex items-center gap-3 cursor-pointer" onclick="switchTab('customer')">
          <div class="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center text-xl font-bold shadow-sm">
            🦖
          </div>
          <div>
            <h1 class="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              FOOD DINOSAUR <span class="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">Sdn. Bhd.</span>
            </h1>
            <p class="text-[11px] text-slate-500 font-medium">Food Ordering & Delivery Platform</p>
          </div>
        </div>

        <!-- Navigation Tabs -->
        <nav class="hidden md:flex items-center bg-slate-100 p-1 rounded-lg border border-slate-200">
          <button onclick="switchTab('customer')" class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${state.activeTab === 'customer' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            <i class="fa-solid fa-utensils mr-1.5"></i> Customer Portal
          </button>
          <button onclick="switchTab('kitchen')" class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${state.activeTab === 'kitchen' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            <i class="fa-solid fa-fire-burner mr-1.5"></i> Kitchen Queue
          </button>
          <button onclick="switchTab('rider')" class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${state.activeTab === 'rider' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            <i class="fa-solid fa-motorcycle mr-1.5"></i> Rider Console
          </button>
          <button onclick="switchTab('analytics')" class="px-3.5 py-1.5 rounded-md text-xs font-bold transition-all ${state.activeTab === 'analytics' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'}">
            <i class="fa-solid fa-chart-line mr-1.5"></i> Analytics
          </button>
        </nav>

        <!-- Action Buttons -->
        <div class="flex items-center gap-2">
          <button onclick="openCheckoutModal()" class="btn-primary text-xs py-2 px-3.5 shadow-sm">
            <i class="fa-solid fa-credit-card"></i>
            <span>Checkout Order</span>
          </button>
          <button onclick="toggleCartDrawer(true)" class="btn-secondary text-xs py-2 px-3.5 flex items-center gap-2">
            <i class="fa-solid fa-bag-shopping text-emerald-700 text-sm"></i>
            <span>Cart</span>
            <span class="bg-emerald-600 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full">
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

    <!-- Food Detail Modal -->
    <div id="food-detail-modal-overlay" class="modal-overlay">
      ${renderFoodDetailModalContent()}
    </div>

    <!-- Sliding Cart Drawer -->
    <div id="cart-drawer-overlay" class="cart-drawer-overlay">
      <div class="cart-drawer">
        ${renderCartDrawerContent()}
      </div>
    </div>

    <!-- Simple Checkout Modal -->
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
    const matchesRest = state.selectedRestaurant === 'all' || item.restaurantId === state.selectedRestaurant;
    const matchesCategory = state.selectedCategory === 'all' || item.category === state.selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(state.searchQuery.toLowerCase()) || 
                          item.description.toLowerCase().includes(state.searchQuery.toLowerCase()) ||
                          item.restaurantName.toLowerCase().includes(state.searchQuery.toLowerCase());
    return matchesRest && matchesCategory && matchesSearch;
  });

  return `
    <div class="bg-white rounded-2xl p-5 mb-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <h2 class="text-xl font-extrabold text-slate-900">Explore Restaurants & Menus</h2>
        <p class="text-slate-500 text-xs mt-0.5">20-Min express delivery from 5 top outlets in Kuala Lumpur</p>
      </div>

      <div class="w-full md:w-80 flex items-center bg-slate-50 rounded-xl p-1 border border-slate-200">
        <i class="fa-solid fa-magnifying-glass text-slate-400 pl-3"></i>
        <input type="text" placeholder="Search food or outlets..." 
               value="${state.searchQuery}"
               oninput="handleSearch(this.value)"
               class="w-full bg-transparent text-slate-900 px-2 py-1.5 text-xs focus:outline-none font-medium" />
        ${state.searchQuery ? `<button onclick="handleSearch('')" class="text-slate-400 text-xs px-2">✕</button>` : ''}
      </div>
    </div>

    <div class="mb-6">
      <div class="flex items-center justify-between mb-3">
        <h3 class="text-xs font-extrabold text-slate-700 uppercase tracking-wider">Select Outlet</h3>
        <button onclick="selectRestaurant('all')" class="text-xs font-bold text-emerald-700 hover:underline">
          ${state.selectedRestaurant === 'all' ? '● Showing All Outlets' : 'Show All Outlets'}
        </button>
      </div>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <button onclick="selectRestaurant('all')" 
                class="p-3 rounded-xl text-xs font-bold transition-all border text-left flex flex-col justify-between ${state.selectedRestaurant === 'all' ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm' : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'}">
          <span class="text-base mb-1 block">🏪</span>
          <div>
            <span class="block font-extrabold">All Outlets</span>
            <span class="text-[10px] opacity-80 font-normal">All dishes</span>
          </div>
        </button>
        ${state.restaurants.map(r => `
          <button onclick="selectRestaurant('${r.id}')" 
                  class="p-3 rounded-xl text-xs font-bold transition-all border text-left flex flex-col justify-between ${state.selectedRestaurant === r.id ? 'bg-emerald-600 text-white border-emerald-700 shadow-sm' : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50'}">
            <span class="text-xs opacity-70 block mb-1">★ ${r.rating}</span>
            <div>
              <span class="block font-bold leading-snug line-clamp-1">${r.name}</span>
              <span class="text-[10px] opacity-80 font-normal">${r.location}</span>
            </div>
          </button>
        `).join('')}
      </div>
    </div>

    <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 mb-6">
      ${[
        { id: 'all', label: 'All Categories' },
        { id: 'combos', label: 'Dino Combos' },
        { id: 'burgers', label: 'Burgers' },
        { id: 'pizza', label: 'Pizzas' },
        { id: 'asian', label: 'Asian Delights' },
        { id: 'drinks', label: 'Beverages' },
        { id: 'desserts', label: 'Desserts' }
      ].map(cat => `
        <button onclick="selectCategory('${cat.id}')" 
                class="px-4 py-2 rounded-lg text-xs font-bold transition-all border whitespace-nowrap ${state.selectedCategory === cat.id ? 'bg-slate-900 text-white border-slate-900 shadow-sm' : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'}">
          ${cat.label}
        </button>
      `).join('')}
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      ${filteredMenu.map(item => `
        <div onclick="openFoodDetailModal('${item.id}')" 
             class="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between group">
          <div>
            <div class="relative h-44 bg-slate-100 overflow-hidden">
              <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div class="absolute top-2.5 left-2.5 bg-white/95 px-2 py-0.5 rounded-md text-xs font-bold text-slate-800 shadow-sm border border-slate-200">
                ★ ${item.rating}
              </div>
              <div class="absolute top-2.5 right-2.5 bg-slate-900/80 text-white px-2 py-0.5 rounded-md text-[11px] font-bold">
                ⏱️ ${item.prepTime}
              </div>
            </div>

            <div class="p-4">
              <span class="text-[10px] font-bold text-emerald-700 block mb-0.5 line-clamp-1">${item.restaurantName}</span>
              <h3 class="text-base font-bold text-slate-900 mb-1 group-hover:text-emerald-700 transition-colors">${item.name}</h3>
              <p class="text-slate-500 text-xs line-clamp-2 leading-relaxed mb-3">${item.description}</p>
            </div>
          </div>

          <div class="px-4 pb-4 pt-3 flex items-center justify-between border-t border-slate-100 bg-slate-50/40">
            <div>
              <span class="text-[10px] text-slate-400 font-bold block uppercase">Price</span>
              <span class="text-lg font-extrabold text-slate-900">RM ${item.price.toFixed(2)}</span>
            </div>
            <button class="btn-primary text-xs py-1.5 px-3">
              + Customize
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
      <div class="lg:col-span-2 space-y-4">
        ${state.orders.map(order => `
          <div class="solid-card p-5 border-l-4 ${order.status === 'Preparing' ? 'border-l-sky-600' : 'border-l-emerald-600'}">
            <div class="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div>
                <span class="text-base font-extrabold text-slate-900 mr-2">${order.orderId}</span>
                <span class="badge ${order.status === 'Preparing' ? 'badge-preparing' : 'badge-success'}">${order.status}</span>
                <span class="text-xs text-slate-500 block mt-0.5">${order.dateTime} | Customer: ${order.customerName}</span>
              </div>
              <div class="text-right">
                <span class="text-sm font-extrabold text-emerald-700">RM ${order.totalPayable.toFixed(2)}</span>
                <span class="text-xs text-slate-400 block">${order.paymentMethod}</span>
              </div>
            </div>

            <div class="space-y-1.5 mb-4">
              ${order.items.map(item => `
                <div class="flex justify-between text-xs bg-slate-50 px-3 py-1.5 rounded border border-slate-200">
                  <span class="font-bold text-slate-800">${item.qty}x ${item.name}</span>
                  <span class="text-slate-500">${item.notes || 'Standard'}</span>
                </div>
              `).join('')}
            </div>

            <div class="flex items-center justify-between">
              <span class="text-xs text-slate-500 font-medium">Store: ${order.restaurantName}</span>
              ${order.status === 'Preparing' ? `
                <button onclick="updateOrderStatus('${order.orderId}', 'Delivering')" class="btn-primary text-xs py-1.5 px-3">
                  Ready for Delivery Rider
                </button>
              ` : `
                <span class="text-xs text-emerald-700 font-bold"><i class="fa-solid fa-check"></i> Out with Rider</span>
              `}
            </div>
          </div>
        `).join('')}
      </div>

      <div class="solid-card p-5">
        <h3 class="text-sm font-bold text-slate-900 mb-1">Menu Management</h3>
        <p class="text-xs text-slate-500 mb-4">Toggle item availability</p>
        <div class="space-y-2.5">
          ${state.menu.map(item => `
            <div class="flex items-center justify-between p-2.5 bg-slate-50 rounded border border-slate-200">
              <div>
                <span class="text-xs font-bold text-slate-800 block">${item.name}</span>
                <span class="text-[11px] text-emerald-700 font-bold">RM ${item.price.toFixed(2)}</span>
              </div>
              <button onclick="toggleMenuAvailability('${item.id}')" class="px-2.5 py-1 rounded text-xs font-bold ${item.available ? 'bg-emerald-100 text-emerald-800 border border-emerald-300' : 'bg-rose-100 text-rose-800 border border-rose-300'}">
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
              <span class="text-slate-500 font-bold block mb-0.5">Pick-Up Store:</span>
              <span class="text-slate-900 font-bold">${order.restaurantName}</span>
            </div>
            <div class="p-2.5 bg-slate-50 rounded border border-slate-200">
              <span class="text-slate-500 font-bold block mb-0.5">Customer Address:</span>
              <span class="text-slate-900 font-bold">${order.customerName} (${order.contactPhone})</span>
              <span class="text-slate-600 block mt-0.5">${order.deliveryAddress}</span>
            </div>
          </div>

          <div class="mb-4">
            <div class="flex justify-between text-xs mb-1 font-bold">
              <span class="text-slate-500">Delivery Route Progress</span>
              <span class="text-emerald-700">${order.riderGpsProgress}%</span>
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
        <span class="text-[11px] text-emerald-700 font-bold block mt-0.5">Year 1 Target Met</span>
      </div>
      <div class="solid-card p-4 border-l-4 border-l-amber-500">
        <span class="text-xs text-slate-500 font-bold block">Daily Orders</span>
        <span class="text-xl font-extrabold text-slate-900">200 / day</span>
        <span class="text-[11px] text-amber-700 font-bold block mt-0.5">Avg RM10 profit</span>
      </div>
      <div class="solid-card p-4 border-l-4 border-l-sky-500">
        <span class="text-xs text-slate-500 font-bold block">Avg Delivery Time</span>
        <span class="text-xl font-extrabold text-slate-900">18.4 mins</span>
        <span class="text-[11px] text-sky-700 font-bold block mt-0.5">94% on-time</span>
      </div>
      <div class="solid-card p-4 border-l-4 border-l-purple-500">
        <span class="text-xs text-slate-500 font-bold block">Customer Rating</span>
        <span class="text-xl font-extrabold text-slate-900">4.9 / 5.0</span>
        <span class="text-[11px] text-purple-700 font-bold block mt-0.5">1,420 Reviews</span>
      </div>
    </div>

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

// FOOD CUSTOMIZATION MODAL (FIXED PINNED ACTION FOOTER)
function renderFoodDetailModalContent() {
  const item = state.customizingItem;
  if (!item) return '';

  const currentSizePrice = state.customization.size ? state.customization.size.price : 0.00;
  const addonsPrice = state.customization.addons.reduce((sum, a) => sum + a.price, 0.00);
  const unitPrice = item.price + currentSizePrice + addonsPrice;
  const totalPrice = unitPrice * state.customization.quantity;

  return `
    <div class="modal-container food-detail-modal flex flex-col">
      <!-- Fixed Shrink-0 Hero Header Image -->
      <div class="relative h-40 shrink-0 bg-slate-100">
        <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover" />
        <button onclick="closeFoodDetailModal()" class="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/95 text-slate-700 hover:text-slate-900 font-bold flex items-center justify-center shadow-md border border-slate-200">
          ✕
        </button>
      </div>

      <!-- Middle Scrollable Options Content (Takes remaining height) -->
      <div class="p-5 space-y-5 overflow-y-auto flex-1">
        <div>
          <span class="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block mb-0.5">${item.restaurantName}</span>
          <h2 class="text-xl font-extrabold text-slate-900 mb-1">${item.name}</h2>
          <p class="text-slate-600 text-xs leading-relaxed mb-2">${item.description}</p>
          <div class="flex items-center gap-3 text-xs font-bold text-slate-700">
            <span class="bg-amber-100 text-amber-800 px-2 py-0.5 rounded">★ ${item.rating}</span>
            <span>⏱️ ${item.prepTime}</span>
            <span class="text-emerald-700 text-sm font-extrabold">RM ${item.price.toFixed(2)}</span>
          </div>
        </div>

        ${item.sizes && item.sizes.length > 0 ? `
          <div class="border-t border-slate-200 pt-3">
            <h4 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">Choice of Size</h4>
            <div class="space-y-1.5">
              ${item.sizes.map((size, idx) => `
                <label class="option-card">
                  <div class="flex items-center gap-2.5">
                    <input type="radio" name="food-size" 
                           ${state.customization.size && state.customization.size.name === size.name ? 'checked' : idx === 0 ? 'checked' : ''} 
                           onchange="selectCustomSize('${size.name}', ${size.price})"
                           class="w-4 h-4 text-emerald-600 focus:ring-emerald-500" />
                    <span class="text-xs font-bold text-slate-800">${size.name}</span>
                  </div>
                  <span class="text-xs font-bold text-slate-600">${size.price > 0 ? `+RM ${size.price.toFixed(2)}` : 'Standard'}</span>
                </label>
              `).join('')}
            </div>
          </div>
        ` : ''}

        ${item.addons && item.addons.length > 0 ? `
          <div class="border-t border-slate-200 pt-3">
            <h4 class="text-xs font-extrabold text-slate-900 uppercase tracking-wider mb-2">Add-ons & Toppings</h4>
            <div class="space-y-1.5">
              ${item.addons.map(addon => `
                <label class="option-card">
                  <div class="flex items-center gap-2.5">
                    <input type="checkbox" 
                           ${state.customization.addons.some(a => a.name === addon.name) ? 'checked' : ''}
                           onchange="toggleCustomAddon('${addon.name}', ${addon.price})"
                           class="w-4 h-4 text-emerald-600 rounded focus:ring-emerald-500" />
                    <span class="text-xs font-bold text-slate-800">${addon.name}</span>
                  </div>
                  <span class="text-xs font-bold text-emerald-700">+RM ${addon.price.toFixed(2)}</span>
                </label>
              `).join('')}
            </div>
          </div>
        ` : ''}

        <div class="border-t border-slate-200 pt-3">
          <label class="text-xs font-extrabold text-slate-900 uppercase tracking-wider block mb-1.5">Special Instructions</label>
          <input type="text" 
                 value="${state.customization.notes}"
                 oninput="updateCustomNotes(this.value)"
                 placeholder="e.g. Extra spicy, sauce on the side" 
                 class="form-input text-xs py-1.5" />
        </div>
      </div>

      <!-- Pinned Action Footer (ALWAYS VISIBLE & ACCESSIBLE AT BOTTOM) -->
      <div class="shrink-0 p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between gap-3 shadow-md">
        <div class="flex items-center border border-slate-300 bg-white rounded-lg p-1 shadow-sm">
          <button type="button" onclick="adjustCustomQuantity(-1)" class="w-7 h-7 font-bold text-slate-600 hover:text-slate-900 text-base flex items-center justify-center">-</button>
          <span class="w-7 text-center text-xs font-extrabold text-slate-900">${state.customization.quantity}</span>
          <button type="button" onclick="adjustCustomQuantity(1)" class="w-7 h-7 font-bold text-slate-600 hover:text-slate-900 text-base flex items-center justify-center">+</button>
        </div>

        <button type="button" onclick="confirmAddCustomizedItemToCart()" class="btn-primary w-full text-xs py-2.5 font-extrabold shadow-sm">
          <span>Add to Basket</span>
          <span>•</span>
          <span>RM ${totalPrice.toFixed(2)}</span>
        </button>
      </div>
    </div>
  `;
}

// SLIDING CART DRAWER CONTENT
function renderCartDrawerContent() {
  const subtotal = state.cart.reduce((sum, i) => sum + (i.totalPricePerUnit * i.quantity), 0);
  const sst = subtotal * 0.08;
  const deliveryFee = subtotal > 0 ? 5.00 : 0.00;
  const discount = subtotal * (state.promoCode === 'DINOSAVE10' ? 0.10 : 0.00);
  const totalPayable = subtotal + sst + deliveryFee - discount;

  return `
    <div class="p-4 border-b border-slate-200 flex items-center justify-between bg-white">
      <div class="flex items-center gap-2">
        <i class="fa-solid fa-bag-shopping text-emerald-700 text-lg"></i>
        <h3 class="text-base font-extrabold text-slate-900">Your Basket</h3>
      </div>
      <button onclick="toggleCartDrawer(false)" class="text-slate-400 hover:text-slate-600 font-bold text-lg">✕</button>
    </div>

    <div class="flex-1 overflow-y-auto p-4 space-y-4">
      ${state.cart.length === 0 ? `
        <div class="text-center py-12 text-slate-400">
          <i class="fa-solid fa-basket-shopping text-4xl mb-3 block text-slate-300"></i>
          <p class="text-xs font-bold">Your basket is empty</p>
          <p class="text-[11px] text-slate-400">Add delicious items from the menu to start!</p>
        </div>
      ` : state.cart.map(item => `
        <div class="solid-card p-3 flex gap-3 relative border border-slate-200">
          <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-lg object-cover shrink-0" />
          <div class="flex-1 pr-6">
            <h4 class="text-xs font-bold text-slate-900 leading-tight">${item.name}</h4>
            <span class="text-[10px] text-slate-500 block mt-0.5">${item.sizeName}</span>
            ${item.addons && item.addons.length > 0 ? `
              <span class="text-[10px] text-emerald-700 block">+ ${item.addons.map(a => a.name).join(', ')}</span>
            ` : ''}
            ${item.instructions ? `
              <span class="text-[10px] text-slate-400 italic block mt-0.5">"${item.instructions}"</span>
            ` : ''}
            
            <div class="flex items-center justify-between mt-2">
              <span class="text-xs font-extrabold text-emerald-700">RM ${(item.totalPricePerUnit * item.quantity).toFixed(2)}</span>
              <div class="flex items-center border border-slate-300 rounded bg-slate-50">
                <button onclick="updateCartItemQty('${item.cartItemId}', ${item.quantity - 1})" class="px-2 py-0.5 text-xs font-bold text-slate-600 hover:text-slate-900">-</button>
                <span class="px-2 text-xs font-bold text-slate-900">${item.quantity}</span>
                <button onclick="updateCartItemQty('${item.cartItemId}', ${item.quantity + 1})" class="px-2 py-0.5 text-xs font-bold text-slate-600 hover:text-slate-900">+</button>
              </div>
            </div>
          </div>
          <button onclick="removeCartItem('${item.cartItemId}')" class="absolute top-2 right-2 text-slate-400 hover:text-rose-500 text-xs">✕</button>
        </div>
      `).join('')}
    </div>

    ${state.cart.length > 0 ? `
      <div class="p-4 border-t border-slate-200 bg-slate-50 space-y-3">
        <div class="flex gap-2">
          <input type="text" id="drawer-promo-input" value="${state.promoCode}" placeholder="Promo code" class="form-input text-xs uppercase" />
          <button onclick="applyDrawerPromoCode()" class="btn-secondary text-xs py-1">Apply</button>
        </div>

        <div class="space-y-1 text-xs text-slate-600">
          <div class="flex justify-between"><span>Subtotal:</span><span class="font-bold text-slate-900">RM ${subtotal.toFixed(2)}</span></div>
          <div class="flex justify-between"><span>SST Tax (8%):</span><span class="font-bold text-slate-900">RM ${sst.toFixed(2)}</span></div>
          <div class="flex justify-between"><span>Delivery Fee:</span><span class="font-bold text-slate-900">RM ${deliveryFee.toFixed(2)}</span></div>
          <div class="flex justify-between text-emerald-700 font-bold"><span>Promo Discount (10%):</span><span>-RM ${discount.toFixed(2)}</span></div>
          <div class="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
            <span>Total Payable:</span>
            <span class="text-emerald-700">RM ${totalPayable.toFixed(2)}</span>
          </div>
        </div>

        <button onclick="proceedToCheckoutFromDrawer()" class="btn-primary w-full text-xs py-3 font-extrabold shadow-sm">
          <span>Proceed to Checkout</span>
          <i class="fa-solid fa-arrow-right"></i>
        </button>
      </div>
    ` : ''}
  `;
}

// CHECKOUT MODAL
function renderCheckoutModalContent() {
  const subtotal = state.cart.reduce((sum, i) => sum + (i.totalPricePerUnit * i.quantity), 0);
  const sst = subtotal * 0.08;
  const deliveryFee = subtotal > 0 ? 5.00 : 0.00;
  const discount = subtotal * (state.promoCode === 'DINOSAVE10' ? 0.10 : 0.00);
  const totalPayable = subtotal + sst + deliveryFee - discount;

  const showBadges = state.showAssignmentAnnotations;

  return `
    <div class="modal-container p-6 max-w-3xl">
      <div class="flex items-center justify-between pb-4 border-b border-slate-200 mb-5">
        <div>
          <div class="flex items-center gap-2 mb-1">
            <span class="text-[10px] font-extrabold text-emerald-700 uppercase tracking-widest bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              CREATE FOOD ORDER
            </span>
            <button type="button" onclick="toggleAssignmentAnnotations()" class="text-[11px] font-bold text-slate-600 hover:text-emerald-700 underline">
              ${showBadges ? '⚡ Switch to Simple View' : '🎓 Show Assignment Badges [1]-[15]'}
            </button>
          </div>
          <h2 class="text-xl font-extrabold text-slate-900">Checkout & Order Confirmation</h2>
        </div>
        <button onclick="closeCheckoutModal()" class="text-slate-400 hover:text-slate-600 text-lg font-bold">✕</button>
      </div>

      <form onsubmit="handleFormSubmit(event)" class="space-y-5">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div class="space-y-4">
            <div class="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200">
              <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">Order Information</h3>
              <div class="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label class="form-label mb-1">
                    <span>${showBadges ? '[1] ' : ''}Order ID</span>
                    ${showBadges ? '<span class="val-tag val-tag-none">Auto</span>' : ''}
                  </label>
                  <input type="text" value="FD-ORD-20260801-094" readonly class="form-input py-1.5" />
                </div>
                <div>
                  <label class="form-label mb-1">
                    <span>${showBadges ? '[2] ' : ''}Date & Time</span>
                    ${showBadges ? '<span class="val-tag val-tag-none">System</span>' : ''}
                  </label>
                  <input type="text" value="01/08/2026 14:30" readonly class="form-input py-1.5" />
                </div>
              </div>
            </div>

            <div class="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
              <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wider">Delivery Destination</h3>
              
              <div>
                <label class="form-label mb-1">
                  <span>${showBadges ? '[3] ' : ''}Customer Profile</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Imported</span>' : ''}
                </label>
                <input type="text" value="CUST-88204 (John)" readonly class="form-input py-1.5" />
              </div>

              <div>
                <label class="form-label mb-1">
                  <span>${showBadges ? '[4] ' : ''}Contact Phone</span>
                  ${showBadges ? '<span class="val-tag val-tag-active">Format Check</span>' : ''}
                </label>
                <input type="tel" id="input-phone" value="012-3456789" required class="form-input py-1.5" />
              </div>

              <div class="grid grid-cols-3 gap-2">
                <div class="col-span-2">
                  <label class="form-label mb-1">
                    <span>${showBadges ? '[5] ' : ''}Delivery Address</span>
                    ${showBadges ? '<span class="val-tag val-tag-active">Required</span>' : ''}
                  </label>
                  <input type="text" id="input-address" value="No. 12, Jalan Genting Klang, Setapak, KL" required class="form-input py-1.5" />
                </div>
                <div>
                  <label class="form-label mb-1">
                    <span>${showBadges ? '[6] ' : ''}Postcode</span>
                    ${showBadges ? '<span class="val-tag val-tag-active">5-Digit</span>' : ''}
                  </label>
                  <input type="text" id="input-postcode" value="53300" maxlength="5" pattern="[0-9]{5}" required class="form-input py-1.5 text-center" />
                </div>
              </div>
            </div>

            <div class="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200">
              <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">Fulfillment Options</h3>
              <div class="space-y-2 text-xs">
                <div>
                  <label class="form-label mb-1">
                    <span>${showBadges ? '[7] ' : ''}Restaurant Store</span>
                    ${showBadges ? '<span class="val-tag val-tag-none">Selected</span>' : ''}
                  </label>
                  <select class="form-input py-1.5">
                    <option selected>Dino Grill & Steakhouse (Mid Valley)</option>
                    <option>Dinosaur Asian Kitchen (KLCC)</option>
                  </select>
                </div>
                <div class="grid grid-cols-2 gap-2">
                  <div>
                    <label class="form-label mb-1">
                      <span>${showBadges ? '[8] ' : ''}Method</span>
                    </label>
                    <select class="form-input py-1.5">
                      <option selected>Standard Rider</option>
                      <option>Express Delivery</option>
                    </select>
                  </div>
                  <div>
                    <label class="form-label mb-1">
                      <span>${showBadges ? '[9] ' : ''}Delivery Slot</span>
                    </label>
                    <select class="form-input py-1.5">
                      <option selected>15:00 - 15:30</option>
                      <option>16:00 - 16:30</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="space-y-4 flex flex-col justify-between">
            <div class="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200">
              <h3 class="text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">Order Items (${state.cart.length})</h3>
              <div class="space-y-2 max-h-48 overflow-y-auto pr-1">
                ${state.cart.map(item => `
                  <div class="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                    <div>
                      <span class="font-bold text-slate-900 block">${item.quantity}x ${item.name}</span>
                      <span class="text-[10px] text-slate-500">${item.sizeName} ${item.instructions ? `• "${item.instructions}"` : ''}</span>
                    </div>
                    <span class="font-extrabold text-emerald-700">RM ${(item.totalPricePerUnit * item.quantity).toFixed(2)}</span>
                  </div>
                `).join('')}
              </div>
            </div>

            <div class="p-3.5 bg-slate-50/70 rounded-xl border border-slate-200 space-y-3">
              <div>
                <label class="form-label mb-1">
                  <span>${showBadges ? '[14] ' : ''}Promo Voucher Code</span>
                  ${showBadges ? '<span class="val-tag val-tag-active">Check</span>' : ''}
                </label>
                <div class="flex gap-2">
                  <input type="text" id="promo-input" value="${state.promoCode}" class="form-input py-1.5 uppercase" />
                  <button type="button" onclick="applyPromoCode()" class="btn-secondary text-xs py-1.5">Apply</button>
                </div>
              </div>

              <div>
                <label class="form-label mb-1">
                  <span>${showBadges ? '[15] ' : ''}Payment Channel</span>
                  ${showBadges ? '<span class="val-tag val-tag-none">Selected</span>' : ''}
                </label>
                <select class="form-input py-1.5 font-semibold text-slate-800">
                  <option selected>💳 Online Banking (FPX)</option>
                  <option>📱 Touch 'n Go E-Wallet</option>
                  <option>💳 Credit / Debit Card</option>
                  <option>💵 Cash on Delivery</option>
                </select>
              </div>

              <div class="bg-white p-3 rounded-lg border border-slate-200 space-y-1 text-xs">
                <div class="flex justify-between text-slate-600"><span>Subtotal:</span><span class="font-bold text-slate-900">RM ${subtotal.toFixed(2)}</span></div>
                <div class="flex justify-between text-slate-600"><span>SST Tax (8%):</span><span class="font-bold text-slate-900">RM ${sst.toFixed(2)}</span></div>
                <div class="flex justify-between text-slate-600"><span>Delivery Fee:</span><span class="font-bold text-slate-900">RM ${deliveryFee.toFixed(2)}</span></div>
                <div class="flex justify-between text-emerald-700 font-bold"><span>Promo Discount (10%):</span><span>-RM ${discount.toFixed(2)}</span></div>
                <div class="border-t border-slate-200 pt-2 flex justify-between text-sm font-extrabold text-slate-900">
                  <span>TOTAL PAYABLE:</span>
                  <span class="text-emerald-700">RM ${totalPayable.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div class="flex items-center justify-end gap-2 pt-2">
              <button type="button" onclick="closeCheckoutModal()" class="btn-secondary text-xs py-2 px-4">Cancel</button>
              <button type="submit" class="btn-primary text-xs py-2.5 px-6 font-extrabold shadow-sm">
                <span>Confirm & Place Order</span>
                <i class="fa-solid fa-check-circle"></i>
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  `;
}

// ORDER TRACKING MODAL
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

      <div class="grid grid-cols-4 gap-2 text-center text-xs mb-6 font-bold">
        <div class="p-2 rounded bg-emerald-100 text-emerald-800 border border-emerald-300">1. Placed</div>
        <div class="p-2 rounded bg-sky-100 text-sky-800 border border-sky-300">2. Preparing</div>
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

// EVENT HANDLERS
window.switchTab = function(tabName) {
  state.activeTab = tabName;
  renderApp();
};

window.selectRestaurant = function(restId) {
  state.selectedRestaurant = restId;
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

window.toggleAssignmentAnnotations = function() {
  state.showAssignmentAnnotations = !state.showAssignmentAnnotations;
  renderApp();
  openCheckoutModal();
};

window.openFoodDetailModal = function(itemId) {
  const item = state.menu.find(m => m.id === itemId);
  if (!item) return;

  state.customizingItem = item;
  state.customization = {
    size: item.sizes && item.sizes.length > 0 ? item.sizes[0] : null,
    addons: [],
    notes: '',
    quantity: 1
  };

  document.getElementById('food-detail-modal-overlay')?.classList.add('active');
  renderApp();
  document.getElementById('food-detail-modal-overlay')?.classList.add('active');
};

window.closeFoodDetailModal = function() {
  document.getElementById('food-detail-modal-overlay')?.classList.remove('active');
  state.customizingItem = null;
};

window.selectCustomSize = function(sizeName, price) {
  state.customization.size = { name: sizeName, price: parseFloat(price) };
  renderApp();
  document.getElementById('food-detail-modal-overlay')?.classList.add('active');
};

window.toggleCustomAddon = function(addonName, price) {
  const existingIdx = state.customization.addons.findIndex(a => a.name === addonName);
  if (existingIdx >= 0) {
    state.customization.addons.splice(existingIdx, 1);
  } else {
    state.customization.addons.push({ name: addonName, price: parseFloat(price) });
  }
  renderApp();
  document.getElementById('food-detail-modal-overlay')?.classList.add('active');
};

window.updateCustomNotes = function(val) {
  state.customization.notes = val;
};

window.adjustCustomQuantity = function(delta) {
  state.customization.quantity = Math.max(1, state.customization.quantity + delta);
  renderApp();
  document.getElementById('food-detail-modal-overlay')?.classList.add('active');
};

window.confirmAddCustomizedItemToCart = function() {
  const item = state.customizingItem;
  if (!item) return;

  const currentSizePrice = state.customization.size ? state.customization.size.price : 0.00;
  const addonsPrice = state.customization.addons.reduce((sum, a) => sum + a.price, 0.00);
  const totalPricePerUnit = item.price + currentSizePrice + addonsPrice;

  state.cart.push({
    cartItemId: 'c-' + Date.now(),
    id: item.id,
    name: item.name,
    restaurantName: item.restaurantName,
    basePrice: item.price,
    sizeName: state.customization.size ? state.customization.size.name : 'Standard',
    sizePrice: currentSizePrice,
    addons: [...state.customization.addons],
    totalPricePerUnit: totalPricePerUnit,
    quantity: state.customization.quantity,
    instructions: state.customization.notes,
    image: item.image
  });

  closeFoodDetailModal();
  showToast(`Added "${item.name}" to your basket! 🛒`);
  toggleCartDrawer(true);
};

window.toggleCartDrawer = function(open) {
  const overlay = document.getElementById('cart-drawer-overlay');
  if (open) {
    overlay?.classList.add('active');
  } else {
    overlay?.classList.remove('active');
  }
};

window.updateCartItemQty = function(cartItemId, newQty) {
  const qty = parseInt(newQty);
  if (qty <= 0) {
    removeCartItem(cartItemId);
    return;
  }
  const item = state.cart.find(c => c.cartItemId === cartItemId);
  if (item) {
    item.quantity = qty;
    renderApp();
    toggleCartDrawer(true);
  }
};

window.updateCartItemNotes = function(cartItemId, notes) {
  const item = state.cart.find(c => c.cartItemId === cartItemId);
  if (item) {
    item.instructions = notes;
  }
};

window.removeCartItem = function(cartItemId) {
  state.cart = state.cart.filter(c => c.cartItemId !== cartItemId);
  showToast('Item removed from basket');
  renderApp();
  toggleCartDrawer(true);
};

window.applyDrawerPromoCode = function() {
  const input = document.getElementById('drawer-promo-input');
  if (input && input.value.trim().toUpperCase() === 'DINOSAVE10') {
    state.promoCode = 'DINOSAVE10';
    showToast('Promo code DINOSAVE10 applied!');
    renderApp();
    toggleCartDrawer(true);
  } else {
    showToast('Invalid promo code. Try "DINOSAVE10"', 'error');
  }
};

window.proceedToCheckoutFromDrawer = function() {
  toggleCartDrawer(false);
  openCheckoutModal();
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
