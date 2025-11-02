import React, { useState } from 'react';
import { Heart, ShoppingBag, Search, User, Home, ChevronLeft, Trash2, Plus, Minus } from 'lucide-react';

const UrbanThreadsApp = () => {
  const [currentScreen, setCurrentScreen] = useState('home');
  const [wishlist, setWishlist] = useState([]);
  const [cart, setCart] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState('L');
  const [selectedColor, setSelectedColor] = useState('Gray');

  const products = [
    {
      id: 1,
      name: 'Urban Oversized Hoodie',
      brand: 'UrbanThreads',
      price: 89.99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=400&fit=crop',
      category: 'Hoodies',
      stock: 25,
      featured: true,
      description: 'Premium cotton blend oversized hoodie with street-inspired graphics',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Gray']
    },
    {
      id: 2,
      name: 'Distressed Denim Jacket',
      brand: 'UrbanThreads',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400&h=400&fit=crop',
      category: 'Jackets',
      stock: 18,
      featured: true,
      description: 'Vintage-style distressed denim with modern fit',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Blue', 'Black']
    },
    {
      id: 3,
      name: 'Graphic T-Shirt',
      brand: 'UrbanThreads',
      price: 39.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      category: 'T-Shirts',
      stock: 50,
      featured: false,
      description: 'Bold street art graphic on premium cotton',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Red']
    },
    {
      id: 4,
      name: 'Cargo Pants',
      brand: 'UrbanThreads',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=400&h=400&fit=crop',
      category: 'Pants',
      stock: 30,
      featured: false,
      description: 'Utility-style cargo pants with multiple pockets',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Olive', 'Khaki']
    }
  ];

  const categories = [
    { name: 'Hoodies', icon: '👕' },
    { name: 'Jackets', icon: '🧥' },
    { name: 'T-Shirts', icon: '👔' },
    { name: 'Pants', icon: '👖' }
  ];

  const toggleWishlist = (product) => {
    if (wishlist.find(item => item.id === product.id)) {
      setWishlist(wishlist.filter(item => item.id !== product.id));
    } else {
      setWishlist([...wishlist, product]);
    }
  };

  const addToCart = (product, size, color) => {
    const cartItem = {
      ...product,
      size,
      color,
      quantity: 1,
      cartId: `${product.id}-${size}-${color}`
    };
    
    const existing = cart.find(item => item.cartId === cartItem.cartId);
    if (existing) {
      setCart(cart.map(item => 
        item.cartId === cartItem.cartId 
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCart([...cart, cartItem]);
    }
  };

  const updateQuantity = (cartId, delta) => {
    setCart(cart.map(item => {
      if (item.cartId === cartId) {
        const newQuantity = item.quantity + delta;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const removeFromCart = (cartId) => {
    setCart(cart.filter(item => item.cartId !== cartId));
  };

  const getSubtotal = () => cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const getShipping = () => 9.99;
  const getTax = () => getSubtotal() * 0.08;
  const getTotal = () => getSubtotal() + getShipping() + getTax();

  // Home Screen
  const HomeScreen = () => (
    <div className="min-h-screen bg-white pb-20">
      <div className="p-6">
        <h1 className="text-4xl font-bold mb-2">UrbanThreads</h1>
        <p className="text-gray-500 text-lg mb-8">Streetwear for the culture</p>

        <h2 className="text-2xl font-bold mb-4">Shop by Category</h2>
        <div className="grid grid-cols-4 gap-4 mb-8">
          {categories.map(cat => (
            <div key={cat.name} className="flex flex-col items-center">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center text-4xl mb-2">
                {cat.icon}
              </div>
              <span className="text-sm font-medium text-center">{cat.name}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Featured Items</h2>
          <button className="text-gray-500 text-sm">See All</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-8">
          {products.filter(p => p.featured).map(product => (
            <div 
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setSelectedSize('L');
                setSelectedColor(product.colors[product.colors.length - 1]);
                setCurrentScreen('product');
              }}
              className="bg-white rounded-lg overflow-hidden shadow cursor-pointer"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <div className="absolute top-2 left-2 bg-yellow-400 px-3 py-1 rounded-full flex items-center gap-1">
                  <span className="text-lg">⭐</span>
                  <span className="text-xs font-bold">Featured</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow"
                >
                  <Heart className={`w-5 h-5 ${wishlist.find(item => item.id === product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm mb-1">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{product.brand}</p>
                <p className="font-bold text-lg">${product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">New Arrivals</h2>
          <button className="text-gray-500 text-sm">See All</button>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          {products.filter(p => !p.featured).map(product => (
            <div 
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setSelectedSize('L');
                setSelectedColor(product.colors[0]);
                setCurrentScreen('product');
              }}
              className="bg-white rounded-lg overflow-hidden shadow cursor-pointer"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow"
                >
                  <Heart className={`w-5 h-5 ${wishlist.find(item => item.id === product.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm mb-1">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{product.brand}</p>
                <p className="font-bold text-lg">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Product Detail Screen
  const ProductScreen = () => (
    <div className="min-h-screen bg-white pb-20">
      <div className="p-4 flex justify-between items-center border-b">
        <button onClick={() => setCurrentScreen('home')} className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button onClick={() => toggleWishlist(selectedProduct)} className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
          <Heart className={`w-6 h-6 ${wishlist.find(item => item.id === selectedProduct.id) ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
        </button>
      </div>

      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h1 className="text-3xl font-bold mb-2">{selectedProduct.name}</h1>
            <p className="text-gray-500 text-lg">{selectedProduct.brand}</p>
          </div>
          <p className="text-3xl font-bold">${selectedProduct.price}</p>
        </div>

        <div className="flex gap-4 mb-6">
          <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">{selectedProduct.category}</span>
          <span className="px-4 py-2 bg-gray-100 rounded-full text-sm text-gray-600">{selectedProduct.stock} in stock</span>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Description</h2>
          <p className="text-gray-600 leading-relaxed">{selectedProduct.description}</p>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Size</h2>
          <div className="flex gap-3">
            {selectedProduct.sizes.map(size => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-16 h-16 rounded-lg border-2 font-bold ${
                  selectedSize === size ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-xl font-bold mb-3">Color</h2>
          <div className="flex gap-3">
            {selectedProduct.colors.map(color => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-6 py-3 rounded-lg border-2 font-medium ${
                  selectedColor === color ? 'bg-black text-white border-black' : 'bg-white text-black border-gray-300'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="fixed bottom-16 left-0 right-0 p-4 bg-white border-t">
        <button
          onClick={() => {
            addToCart(selectedProduct, selectedSize, selectedColor);
            setCurrentScreen('cart');
          }}
          className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
        >
          <ShoppingBag className="w-6 h-6" />
          Add to Cart
        </button>
      </div>
    </div>
  );

  // Cart Screen
  const CartScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 mb-4">
        <h1 className="text-3xl font-bold mb-1">Shopping Cart</h1>
        <p className="text-gray-500">{cart.length} item{cart.length !== 1 ? 's' : ''}</p>
      </div>

      {cart.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <ShoppingBag className="w-20 h-20 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Your cart is empty</p>
          <button
            onClick={() => setCurrentScreen('home')}
            className="mt-6 px-6 py-3 bg-black text-white rounded-lg font-medium"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <>
          <div className="px-4 space-y-4 mb-4">
            {cart.map(item => (
              <div key={item.cartId} className="bg-white rounded-lg p-4 flex gap-4 shadow-sm">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
                <div className="flex-1">
                  <h3 className="font-bold mb-1">{item.name}</h3>
                  <p className="text-gray-500 text-sm mb-2">{item.brand}</p>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Color: {item.color}</p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="font-bold text-lg">${item.price}</p>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => updateQuantity(item.cartId, -1)}
                        className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-bold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.cartId, 1)}
                        className="w-10 h-10 bg-black text-white rounded-full flex items-center justify-center"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.cartId)}
                        className="w-8 h-8 flex items-center justify-center"
                      >
                        <Trash2 className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-6 mb-4">
            <h2 className="text-xl font-bold mb-4">Shipping Address</h2>
            <input
              type="text"
              placeholder="Enter your shipping address..."
              className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-600"
            />
          </div>

          <div className="bg-white p-6">
            <div className="space-y-3 mb-4">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span className="font-bold">${getSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-bold">${getShipping().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax</span>
                <span className="font-bold">${getTax().toFixed(2)}</span>
              </div>
            </div>
            <div className="border-t pt-4 flex justify-between items-center mb-6">
              <span className="text-2xl font-bold">Total</span>
              <span className="text-2xl font-bold">${getTotal().toFixed(2)}</span>
            </div>
            <button className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2">
              <ShoppingBag className="w-6 h-6" />
              Place Order
            </button>
          </div>
        </>
      )}
    </div>
  );

  // Wishlist Screen
  const WishlistScreen = () => (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-white p-6 mb-4">
        <h1 className="text-3xl font-bold mb-1">Wishlist</h1>
        <p className="text-gray-500">{wishlist.length} item{wishlist.length !== 1 ? 's' : ''}</p>
      </div>

      {wishlist.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20">
          <Heart className="w-20 h-20 text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">Your wishlist is empty</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 px-4">
          {wishlist.map(product => (
            <div 
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setSelectedSize('L');
                setSelectedColor(product.colors[0]);
                setCurrentScreen('product');
              }}
              className="bg-white rounded-lg overflow-hidden shadow cursor-pointer"
            >
              <div className="relative">
                <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleWishlist(product);
                  }}
                  className="absolute top-2 right-2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow"
                >
                  <Heart className="w-5 h-5 fill-red-500 text-red-500" />
                </button>
              </div>
              <div className="p-3">
                <h3 className="font-bold text-sm mb-1">{product.name}</h3>
                <p className="text-gray-500 text-xs mb-2">{product.brand}</p>
                <p className="font-bold text-lg">${product.price}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Bottom Navigation
  const BottomNav = () => (
    <div className="fixed bottom-0 left-0 right-0 bg-black text-white flex justify-around items-center py-3">
      <button
        onClick={() => setCurrentScreen('home')}
        className="flex flex-col items-center gap-1"
      >
        <Home className={`w-6 h-6 ${currentScreen === 'home' ? 'text-white' : 'text-gray-400'}`} />
        <span className={`text-xs ${currentScreen === 'home' ? 'text-white' : 'text-gray-400'}`}>Home</span>
      </button>
      <button className="flex flex-col items-center gap-1">
        <Search className="w-6 h-6 text-gray-400" />
        <span className="text-xs text-gray-400">Search</span>
      </button>
      <button
        onClick={() => setCurrentScreen('wishlist')}
        className="flex flex-col items-center gap-1 relative"
      >
        <Heart className={`w-6 h-6 ${currentScreen === 'wishlist' ? 'text-white' : 'text-gray-400'}`} />
        <span className={`text-xs ${currentScreen === 'wishlist' ? 'text-white' : 'text-gray-400'}`}>Wishlist</span>
        {wishlist.length > 0 && (
          <span className="absolute -top-1 right-3 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {wishlist.length}
          </span>
        )}
      </button>
      <button
        onClick={() => setCurrentScreen('cart')}
        className="flex flex-col items-center gap-1 relative"
      >
        <ShoppingBag className={`w-6 h-6 ${currentScreen === 'cart' ? 'text-white' : 'text-gray-400'}`} />
        <span className={`text-xs ${currentScreen === 'cart' ? 'text-white' : 'text-gray-400'}`}>Cart</span>
        {cart.length > 0 && (
          <span className="absolute -top-1 right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
            {cart.length}
          </span>
        )}
      </button>
      <button className="flex flex-col items-center gap-1">
        <User className="w-6 h-6 text-gray-400" />
        <span className="text-xs text-gray-400">Profile</span>
      </button>
    </div>
  );

  return (
    <div className="max-w-md mx-auto bg-white relative">
      {currentScreen === 'home' && <HomeScreen />}
      {currentScreen === 'product' && <ProductScreen />}
      {currentScreen === 'cart' && <CartScreen />}
      {currentScreen === 'wishlist' && <WishlistScreen />}
      <BottomNav />
    </div>
  );
};

export default UrbanThreadsApp;