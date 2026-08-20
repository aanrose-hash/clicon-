
document.addEventListener("DOMContentLoaded", function() {

  
    // 1. GLOBAL CART SYSTEM
   
    let cart = JSON.parse(localStorage.getItem('clicon_cart')) || [];

    function saveCart() {
        localStorage.setItem('clicon_cart', JSON.stringify(cart));
        updateCartBadge(); 
    }

   
    function updateCartBadge() {
        const badges = document.querySelectorAll('.cart-badge'); 
        if (badges.length > 0) {
            let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            badges.forEach(badge => badge.innerText = totalItems);
        }
    }
    updateCartBadge(); 

    
    window.addToCartGlobal = function(product, quantity) {
        if (quantity <= 0) {
            alert("Please select a quantity greater than 0.");
            return;
        }

        let numericPrice = parseFloat(product.price.replace(/[^0-9.]/g, ''));
        let existingItem = cart.find(item => item.name === product.name);

        if (existingItem) {
            existingItem.quantity += quantity; 
        } else {
            
            cart.push({
                id: product.id,
                name: product.name,
                image: product.image,
                priceString: product.price,
                priceNumber: numericPrice,  
                quantity: quantity
            });
        }

        saveCart();
        const toast = document.getElementById("simpleToast");
        toast.innerText = `${product.name} added to cart!`;
        toast.classList.remove("toast-hidden");
        setTimeout(() => {
            toast.classList.add("toast-hidden");
        }, 3000);
    };

    // 1b. GLOBAL WISHLIST SYSTEM
  
    let wishlist = JSON.parse(localStorage.getItem('clicon_wishlist')) || [];

    function saveWishlist() {
        localStorage.setItem('clicon_wishlist', JSON.stringify(wishlist));
    }

    window.toggleWishlist = function(product, buttonElement) {
        
        let existingIndex = wishlist.findIndex(item => item.id === product.id);

        if (existingIndex > -1) {
            
            wishlist.splice(existingIndex, 1);
            buttonElement.classList.remove('active-heart');
            // alert("Removed from wishlist!");
        } else {
           
            wishlist.push(product);
            buttonElement.classList.add('active-heart');
            // alert("Added to wishlist!");
        }
        
        saveWishlist(); 
    };


   
    // 2. PROMOTIONAL BAR LOGIC
  
    const promoBar = document.getElementById("promoBar");
    const closePromoBtn = document.getElementById("closePromoBtn");
    
    if (closePromoBtn && promoBar) {
        closePromoBtn.addEventListener("click", function() {
            promoBar.style.display = "none";
        });
    }

    // LIVE SEARCH FUNCTIONALITY
   
    const searchInput = document.getElementById("searchInput");

    if (searchInput) {
       
        searchInput.addEventListener("input", function(event) {
            
           
            const searchTerm = event.target.value.toLowerCase();
           
            const allCards = document.querySelectorAll(".small-card, .list-card, .featured-card");

            allCards.forEach(card => {
                
               
                const titleElement = card.querySelector(".product-title, .list-card-title, h4, h3");
                
                if (titleElement) {
                    const titleText = titleElement.innerText.toLowerCase();

                    
                    if (titleText.includes(searchTerm)) {
                        card.style.display = ""; 
                    } else {
                        card.style.display = "none"; 
                    }
                }
            });
        });
    }




    // BEST DEALS SECTION (Featured + Small Cards)

  // --- SIMPLE COUNTDOWN TIMER ---
    const box = document.querySelector(".countdown-box");

    if (box) {
        let time = (16 * 86400) + (21 * 3600) + (57 * 60) + 23; 

        function tickTimer() {
            time--; 
            let d = Math.floor(time / 86400);
            let h = Math.floor((time / 3600) % 24);
            let m = Math.floor((time / 60) % 60);
            let s = time % 60;
            
           
            d = d < 10 ? '0' + d : d;
            h = h < 10 ? '0' + h : h;
            m = m < 10 ? '0' + m : m;
            s = s < 10 ? '0' + s : s;

            box.innerText = `${d}d : ${h}h : ${m}m : ${s}s`;
        }

        tickTimer(); 
        setInterval(tickTimer, 1000); 
    }

    // 1. Data for the Large Featured Product
    const featuredProduct = {
        id: 'prod_featured_1',
        name: "Xbox Series S - 512GB SSD Console with Wireless Controller - EU Versio...",
        price: "$442.12",
        originalPrice: "$865.99",
        image: "images/Image (4).png",
        description: "Games built using the Xbox Series X|S development kit showcase unparalleled load times, visuals.",
        reviews: "52,677",
        badges: [
            { text: "32% OFF", class: "yellow-badge" },
            { text: "HOT", class: "red-badge" }
        ]
    };

    // 2. Data for the Small Product Grid
    const products = [
        { name: "Bose Sport Earbuds - Wireless Earphones - Bluetooth In Ear...", price: "$2,300", originalPrice: "", image: "images/Image (5).png", badgeText: "SOLD OUT", badgeClass: "gray-badge" },
        { name: "Simple Mobile 4G LTE Prepaid Smartphone", price: "$220", originalPrice: "", image: "images/Image (6).png", badgeText: "", badgeClass: "" },
        { name: "4K UHD LED Smart TV with Chromecast Built-in", price: "$1,50", originalPrice: "$865", image: "images/Image (7).png", badgeText: "19% OFF", badgeClass: "yellow-badge" },
        { name: "Sony DSCHX8 High Zoom Point & Shoot Camera", price: "$1,200", originalPrice: "", image: "images/Image (8).png", badgeText: "", badgeClass: "" },
        { name: "Dell Optiplex 7000x7480 All-in-One Computer Monitor", price: "$299", originalPrice: "", image: "images/Image (9).png", badgeText: "", badgeClass: "" },
        { name: "Portable Wshing Machine, 11lbs capacity Model 18NMFIAM", price: "$70", originalPrice: "$865.99", image: "images/Image (10).png", badgeText: "", badgeClass: "" },
        { name: "2-Barrel Carburetor Carb 2100 Engine Increase Horsepower", price: "$160", originalPrice: "", image: "images/Image (11).png", badgeText: "HOT", badgeClass: "red-badge" },
        { name: "JBL FLIP 4 - Waterproof Portable Bluetooth Speaker - Black", price: "$250", originalPrice: "$360", image: "images/Image (12).png", badgeText: "32% OFF", badgeClass: "yellow-badge" }
    ];

    // 3. Inject the Featured Product
    const featuredContainer = document.getElementById("featuredProductContainer");
    if (featuredContainer) {
        let badgesHTML = "";
        featuredProduct.badges.forEach(badge => {
            badgesHTML += `<span class="badge ${badge.class}">${badge.text}</span>`;
        });

        
        let isWishlisted = wishlist.some(item => item.id === featuredProduct.id);
        let heartClass = isWishlisted ? 'active-heart' : ''; 

        featuredContainer.innerHTML = `
            <div class="badges">
                ${badgesHTML}
            </div>
            <img src="${featuredProduct.image}" alt="Featured Product" class="featured-img">
            <div class="rating">
                <span class="stars">★★★★★</span> <span class="review-count">(${featuredProduct.reviews})</span>
            </div>
            <h3 class="product-title">${featuredProduct.name}</h3>
            <div class="pricing">
                <span class="original-price">${featuredProduct.originalPrice}</span>
                <span class="current-price">${featuredProduct.price}</span>
            </div>
            <p class="product-desc">${featuredProduct.description}</p>
            <div class="card-actions">
                <!-- NEW: We inject the heartClass variable here -->
                <button class="icon-btn ${heartClass}" onclick="handleFeaturedAction(event, 'wishlist')">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                </button>
                <button class="add-cart-btn" onclick="handleFeaturedAction(event, 'cart')">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                    ADD TO CARD
                </button>
                <button class="icon-btn" onclick="handleFeaturedAction(event, 'view')">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
            </div>
        `;

        featuredContainer.style.cursor = 'pointer';
        featuredContainer.addEventListener('click', () => window.openModal(featuredProduct));
    }

    

    // 4. Inject the Small Product Grid
    const gridContainer = document.getElementById("smallProductsGrid");
    if (gridContainer) {
        products.forEach((product, index) => {
            let badgeHTML = product.badgeText !== "" ? `<span class="badge ${product.badgeClass}" style="position:absolute; top:15px; left:15px; z-index:2;">${product.badgeText}</span>` : "";
            let originalPriceHTML = product.originalPrice !== "" ? `<span class="original-price">${product.originalPrice}</span>` : "";

            let productId = 'prod_small_' + index;
            let isWishlisted = wishlist.some(item => item.id === productId);
            let heartClass = isWishlisted ? 'active-heart' : '';

            const cardHTML = `
                <div class="small-card" onclick="window.openModal({id: 'prod_small_${index}', name: '${product.name}', price: '${product.price}', image: '${product.image}'})">
                    ${badgeHTML}
                    <div class="small-card-img-wrapper">
                        <img src="${product.image}" alt="Product Image" class="small-card-img">
                        <div class="hover-actions">
                            <!-- NEW: We inject the heartClass variable here -->
                            <button class="circle-btn ${heartClass}" onclick="handleOverlayAction(event, 'wishlist', ${index})">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                            </button>
                            <button class="circle-btn" onclick="handleOverlayAction(event, 'cart', ${index})">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
                            </button>
                            <button class="circle-btn" onclick="handleOverlayAction(event, 'view', ${index})">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                            </button>
                        </div>
                    </div>
                    <h4 class="product-title">${product.name}</h4>
                    <div class="pricing">
                        ${originalPriceHTML}
                        <span class="current-price">${product.price}</span>
                    </div>
                </div>
            `;
            gridContainer.innerHTML += cardHTML;
        });
    }


    // 5. Handlers for Button Clicks
   
    
    // Featured Card Button Actions
    window.handleFeaturedAction = function(event, action) {
        event.stopPropagation(); // Stops the whole card click from firing
        
        if (action === 'wishlist') {
            window.toggleWishlist(featuredProduct, event.currentTarget);
        } 
        else if (action === 'cart') {
            window.addToCartGlobal(featuredProduct, 1);
        } 
        else if (action === 'view') {
            window.openModal(featuredProduct); // Opens the Quick View Modal
        }
    };

    // Small Cards Overlay Actions
    window.handleOverlayAction = function(event, action, index) {
        event.stopPropagation(); 
        
       
        const prod = products[index];
        const productData = {
            id: 'prod_small_' + index,
            name: prod.name,
            price: prod.price,
            image: prod.image
        };

        if (action === 'wishlist') {
            window.toggleWishlist(productData, event.currentTarget);
        } 
        else if (action === 'cart') {
            window.addToCartGlobal(productData, 1);
        } 
        else if (action === 'view') {
            window.openModal(productData); 
        }
    };

    
  
   
    // 4. INFINITE CATEGORY CAROUSEL
    const categoryTrack = document.getElementById('categoryTrack');
    const prevBtn = document.getElementById('categoryPrev');
    const nextBtn = document.getElementById('categoryNext');

    if (categoryTrack && nextBtn && prevBtn) {
        
        nextBtn.addEventListener('click', () => {
            
            const cardWidth = categoryTrack.querySelector('.category-card').offsetWidth + 18; 
            
      
            categoryTrack.scrollBy({ left: cardWidth, behavior: 'smooth' });

            setTimeout(() => {
               
                const firstCard = categoryTrack.firstElementChild;
                categoryTrack.appendChild(firstCard);
                
              
                categoryTrack.style.scrollBehavior = 'auto';
                categoryTrack.scrollLeft -= cardWidth;
                categoryTrack.style.scrollBehavior = 'smooth';
            }, 300); 
        });

        prevBtn.addEventListener('click', () => {
            const cardWidth = categoryTrack.querySelector('.category-card').offsetWidth + 18;
            
           
            const lastCard = categoryTrack.lastElementChild;
            categoryTrack.prepend(lastCard);
            
            
            categoryTrack.style.scrollBehavior = 'auto';
            categoryTrack.scrollLeft += cardWidth;
            
            
            categoryTrack.style.scrollBehavior = 'smooth';
            
            setTimeout(() => {
                categoryTrack.scrollBy({ left: -cardWidth, behavior: 'smooth' });
            }, 10);
        });
    }



    // 5. QUICK VIEW MODAL LOGIC
   
    let currentQuantity = 1; 
    let currentProduct = null; 

    const modalOverlay = document.getElementById('quickViewModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const qtyMinus = document.getElementById('qtyMinus');
    const qtyPlus = document.getElementById('qtyPlus');
    const qtyValue = document.getElementById('qtyValue');
    const addToCartBtn = document.getElementById('addToCartBtn');

    function updateQtyDisplay() {
        if(qtyValue) {
            qtyValue.innerText = currentQuantity < 10 ? '0' + currentQuantity : currentQuantity;
        }
    }

    window.openModal= function(productData) {
        currentProduct = productData; 
        currentQuantity = 1; 
        updateQtyDisplay();
        
        document.getElementById('modalTitle').innerText = productData.name;
        document.getElementById('modalCurrentPrice').innerText = productData.price;
        document.getElementById('modalImg').src = productData.image;
        
        modalOverlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; 
    }

    window.closeModal= function() {
        if(modalOverlay) {
            modalOverlay.classList.add('hidden');
            document.body.style.overflow = 'auto'; 
        }
    }

    if(closeModalBtn) closeModalBtn.addEventListener('click', window.closeModal);
    // if(modalOverlay) modalOverlay.addEventListener('click', (e) => { if (e.target === modalOverlay) window.closeModal(); });

    // Modal Quantity Buttons
    if(qtyMinus) {
        qtyMinus.addEventListener('click', function() {
            if (currentQuantity > 0) { 
                currentQuantity--;
                updateQtyDisplay();
            }
        });
    }

    if(qtyPlus) {
        qtyPlus.addEventListener('click', function() {
            currentQuantity++;
            updateQtyDisplay();
        });
    }

    // Modal Add To Cart Button
    if(addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            window.addToCartGlobal(currentProduct, currentQuantity);
        });
    }

    // ATTACH MODAL CLICK EVENTS TO ALL PRODUCTS
    const allProductCards = document.querySelectorAll('.list-card, .featured-card, .small-card');
    
    allProductCards.forEach((card, index) => {
        card.style.cursor = 'pointer'; 
        card.addEventListener('click', function() {
            const clickedImg = card.querySelector('img');
            const clickedTitle = card.querySelector('.product-title, .list-card-title, h4, h3');
            const clickedPrice = card.querySelector('.current-price, .list-card-price');

            const actualProduct = {
                id: 'prod_' + index, 
                name: clickedTitle ? clickedTitle.innerText : "Unknown Product",
                price: clickedPrice ? clickedPrice.innerText : "$0.00",
                image: clickedImg ? clickedImg.src : "macbook.jpg"
            };
            openModal(actualProduct);
        });
    });



  
    // 6. SHOPPING CART PAGE SPECIFIC LOGIC
    
    const cartContainer = document.getElementById('cartItemsContainer');
    
    if (cartContainer) {
        
        
        window.renderCartPage = function() {
            cartContainer.innerHTML = ''; 
            let subtotal = 0;

            if (cart.length === 0) {
                cartContainer.innerHTML = '<p style="padding: 20px; text-align: center;">Your cart is empty.</p>';
            }

            cart.forEach((item, index) => {
                let lineTotal = item.priceNumber * item.quantity;
                subtotal += lineTotal;

                let rowHTML = `
                    <div class="cart-item-row">
                        <div class="cart-item-product">
                            <button class="remove-btn" onclick="removeFromCart(${index})">&times;</button>
                            <img src="${item.image}" class="cart-item-img" alt="${item.name}">
                            <span class="cart-item-title">${item.name}</span>
                        </div>
                        <div class="cart-item-price">${item.priceString}</div>
                        
                        <div class="col-qty">
                            <div class="qty-selector" style="margin: 0 auto; width: 100px;">
                                <button class="qty-btn" onclick="updateItemQty(${index}, -1)">&minus;</button>
                                <span class="qty-num">${item.quantity < 10 ? '0'+item.quantity : item.quantity}</span>
                                <button class="qty-btn" onclick="updateItemQty(${index}, 1)">&plus;</button>
                            </div>
                        </div>
                        
                        <div class="cart-item-subtotal">$${lineTotal.toFixed(2)}</div>
                    </div>
                `;
                cartContainer.innerHTML += rowHTML;
            });

            updateTotalsBox(subtotal);
        };

        
        window.updateItemQty = function(index, change) {
            cart[index].quantity += change;
            
           
            if (cart[index].quantity < 1) {
                cart.splice(index, 1);
            }
            saveCart();
            renderCartPage(); 
        };

        window.removeFromCart = function(index) {
            cart.splice(index, 1);
            saveCart();
            renderCartPage(); 
        };

        function updateTotalsBox(subtotal) {
            
            
            let finalTotal = 0;
            const discount = subtotal*.1;
            const tax = subtotal*.18;
            if(subtotal > 0) {
                finalTotal = (subtotal - discount + tax);
            }
            

            document.getElementById('summarySubtotal').innerText = '$' + subtotal.toFixed(2);
            document.getElementById('summaryTotal').innerText = '$' + finalTotal.toFixed(2) + ' USD';
            document.getElementById('discount').innerText = '$' + discount.toFixed(2);
            document.getElementById('tax').innerText = '$' + tax.toFixed(2);
        }

        renderCartPage();
    }

});