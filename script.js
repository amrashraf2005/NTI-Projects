const swiper = new Swiper('.swiper', {
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
        });

        // Sample products data
        let products = [
            {
                id: 1,
                name: "2025 Cupra Tindaya concept",
                price: 820000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21940/cupra-tindaya-concept-2025-thumb.jpg"
            },
            {
                id: 2,
                name: "2026 Polestar ",
                price: 795000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21941/polestar-5-2026-thumb.jpg"
                
            },
            {
                id: 3,
                name: "2026 Ferrari 849 Testarossa Assetto Fiorano",
                price: 1750000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21947/ferrari-849-testarossa-assetto-fiorano-2026-thumb.jpg"
            },
            {
                id: 4,
                name: "2026 Kia EV9 GT - USA version",
                price: 690000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21405/kia-ev9-gt-usa-version-2026-thumb.jpg"
            },
             {
                id: 5,
                name: "2025 Skoda Vision O concept",
                price: 1250000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21939/skoda-vision-o-concept-2025-thumb.jpg"
            },
                         {
                id: 6,
                name: "2026 Porsche 911 ( 992 ) Turbo S",
                price: 150000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21932/porsche-911-992-turbo-s-2026-thumb.jpg"
            },
                         {
                id: 7,
                name: "2025 Chevrolet Corvette CX concept",
                price: 1850000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21902/chevrolet-corvette-cx-concept-2025-thumb.jpg"
            },
            
            {
                id: 8,
                name: "2026 MG HS Hybrid+",
                price: 1290000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21708/mg-hs-hybrid-2026-thumb.jpg"
            },   
                         {
                id: 9,
                name: "2025 Audi Concept C",
                price: 1550000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21925/audi-concept-c-2025-thumb.jpg"
            },
                         {
                id: 10,
                name: "2025 Garagisti & Co GP1",
                price: 1450000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21875/garagisti-co-gp1-2025-thumb.jpg"
            },
                         {
                id: 11,
                name: "2026 Lamborghini Fenomeno",
                price: 1900000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21883/eccentrica-v12-pacchetto-titano-2025-thumb.jpg"
            },
                         {
                id: 12,
                name: "2025 Eccentrica V12 Pacchetto Titano",
                price: 1650000,
                image: "https://www.mad4wheels.com/img/free-car-images/desktop/21893/lamborghini-fenomeno-2026-thumb.jpg"
            },
        ];

        // Cart array
        let cart = [];

        // DOM Elements
        const loginPage = document.getElementById('login-page');
        const app = document.getElementById('app');
        const homePage = document.getElementById('home-page');
        const productsPage = document.getElementById('products-page');
        const aboutPage = document.getElementById('about-page');
        const addProductPage = document.getElementById('add-product-page');
        const cartPage = document.getElementById('cart-page');
        const productsContainer = document.getElementById('products-container');
        const cartItems = document.getElementById('cart-items');
        const totalPriceElement = document.getElementById('total-price');

        // Navigation Links
        const homeLink = document.getElementById('home-link');
        const productsLink = document.getElementById('products-link');
        const aboutLink = document.getElementById('about-link');
        const addProductLink = document.getElementById('add-product-link');
        const logoutLink = document.getElementById('logout-link');
        const browseProductsBtn = document.getElementById('browse-products-btn');
        const cancelAddBtn = document.getElementById('cancel-add-btn');
        const checkoutBtn = document.getElementById('checkout-btn');

        // Show page function
        function showPage(pageToShow) {
            // Hide all pages
            homePage.style.display = 'none';
            productsPage.style.display = 'none';
            aboutPage.style.display = 'none';
            addProductPage.style.display = 'none';
            cartPage.style.display = 'none';
            
            // Show requested page
            pageToShow.style.display = 'block';
        }

        // Login Form
        document.getElementById('login-form').addEventListener('submit', function(e) {
            e.preventDefault();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            
            if (username && password) {
                loginPage.style.display = 'none';
                app.style.display = 'block';
                showPage(homePage);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: 'يرجى إدخال اسم المستخدم وكلمة المرور'
                });
            }
        });

        // Navigation Event Listeners
        homeLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(homePage);
        });

        productsLink.addEventListener('click', function(e) {
            e.preventDefault();
            renderProducts();
            showPage(productsPage);
        });

        aboutLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(aboutPage);
        });

        addProductLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPage(addProductPage);
        });

        logoutLink.addEventListener('click', function(e) {
            e.preventDefault();
            app.style.display = 'none';
            loginPage.style.display = 'block';
            document.getElementById('login-form').reset();
        });

        browseProductsBtn.addEventListener('click', function() {
            renderProducts();
            showPage(productsPage);
        });

        cancelAddBtn.addEventListener('click', function() {
            document.getElementById('add-product-form').reset();
            showPage(homePage);
        });

        // Add Product Form
        document.getElementById('add-product-form').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('product-name').value;
            const price = parseFloat(document.getElementById('product-price').value);
            const image = document.getElementById('product-image').value;
            
            if (!name || !price || !image) {
                Swal.fire({
                    icon: 'error',
                    title: 'خطأ',
                    text: 'يرجى تعبئة جميع الحقول'
                });
                return;
            }
            
            // Create new product
            const newProduct = {
                id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
                name: name,
                price: price,
                image: image
            };
            
            // Add to products array
            products.push(newProduct);
            
            // Reset form
            this.reset();
            
            // Show success message
            Swal.fire({
                icon: 'success',
                title: 'Added',
                text: 'The product has been added successfully.'
            });
            
            // Go back to products page
            renderProducts();
            showPage(productsPage);
        });

        // Render Products
        function renderProducts() {
            productsContainer.innerHTML = '';
            
            if (products.length === 0) {
                productsContainer.innerHTML = '<div class="col-12 text-center"><h4>لا توجد منتجات حالياً</h4></div>';
                return;
            }
            
            products.forEach(product => {
                const productCard = document.createElement('div');
                productCard.className = 'col-md-4 col-sm-6';
                productCard.innerHTML = `
                    <div class="card product-card h-100">
                        <img src="${product.image}" class="product-img" alt="${product.name}">
                        <div class="card-body d-flex flex-column">
                            <h5 class="card-title">${product.name}</h5>
                            <p class="card-text fw-bold">${product.price.toLocaleString()} $</p>
                            <div class="mt-auto d-flex gap-2">
                                <button class="btn btn-dark btn-sm add-to-cart-btn" data-id="${product.id}">
                                    <i class="bi bi-cart-plus"></i> Add
                                </button>
                                <button class="btn btn-danger btn-sm remove-product-btn" data-id="${product.id}">
                                    <i class="bi bi-trash"></i> Delete
                                </button>
                            </div>
                        </div>
                    </div>
                `;
                productsContainer.appendChild(productCard);
            });
            
            // Add event listeners to remove buttons
            document.querySelectorAll('.remove-product-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    removeProduct(productId);
                });
            });
            
            // Add event listeners to add to cart buttons
            document.querySelectorAll('.add-to-cart-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const productId = parseInt(this.getAttribute('data-id'));
                    addToCart(productId);
                });
            });
        }

        // Remove Product
        function removeProduct(productId) {
            Swal.fire({
                title: 'Are you sure?',
                text: "You can't undo this.",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, delete it',
                cancelButtonText: 'Cancel',
                reverseButtons: true
            }).then((result) => {
                if (result.isConfirmed) {
                    products = products.filter(product => product.id !== productId);
                    renderProducts();
                    updateCart();
                    
                    Swal.fire(
                        'Deleted',
                        'The product has been successfully removed.',
                        'success'
                    );
                }
            });
        }

        // Add to Cart
        function addToCart(productId) {
            const product = products.find(p => p.id === productId);
            if (product) {
                cart.push({...product});
                updateCart();
                
                Swal.fire({
                    icon: 'success',
                    title: 'Added',
                    text: 'The product has been added to the cart.'
                });
            }
        }

        // Update Cart
        function updateCart() {
            cartItems.innerHTML = '';
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="text-center"><h4>سلة التسوق فارغة</h4></div>';
                totalPriceElement.textContent = '0';
                return;
            }
            
            let total = 0;
            
            cart.forEach((item, index) => {
                total += item.price;
                
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item d-flex justify-content-between align-items-center';
                cartItem.innerHTML = `
                    <div class="d-flex align-items-center">
                        <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 60px; object-fit: cover; margin-right: 15px;">
                        <div>
                            <h6>${item.name}</h6>
                            <p class="mb-0">${item.price.toLocaleString()} ريال</p>
                        </div>
                    </div>
                    <button class="btn btn-danger btn-sm remove-from-cart-btn" data-index="${index}">
                        <i class="bi bi-trash"></i> حذف
                    </button>
                `;
                cartItems.appendChild(cartItem);
            });
            
            totalPriceElement.textContent = total.toLocaleString();
            
            // Add event listeners to remove from cart buttons
            document.querySelectorAll('.remove-from-cart-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const index = parseInt(this.getAttribute('data-index'));
                    cart.splice(index, 1);
                    updateCart();
                });
            });
        }

        // Checkout Button
        checkoutBtn.addEventListener('click', function() {
            if (cart.length === 0) {
                Swal.fire({
                    icon: 'info',
                    title: 'سلة فارغة',
                    text: 'لا توجد منتجات في السلة'
                });
                return;
            }
            
            Swal.fire({
                title: 'تأكيد الشراء',
                text: `المبلغ الإجمالي: ${totalPriceElement.textContent} ريال`,
                icon: 'question',
                showCancelButton: true,
                confirmButtonText: 'تأكيد الشراء',
                cancelButtonText: 'إلغاء'
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        icon: 'success',
                        title: 'تم الشراء',
                        text: 'تم إتمام عملية الشراء بنجاح'
                    });
                    cart = [];
                    updateCart();
                }
            });
        });

        // Initialize products on load
        renderProducts();