// ===============================================
// SYLHET ONLINE SERVICE - JAVASCRIPT FUNCTIONALITY
// ===============================================

// ===============================================
// NAVIGATION MENU TOGGLE
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu on hamburger click
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translate(8px, 8px)' : '';
        spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
        spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translate(7px, -7px)' : '';
    });

    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            
            // Reset hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = '';
            spans[1].style.opacity = '1';
            spans[2].style.transform = '';
        });
    });
});

// ===============================================
// FORM VALIDATION
// ===============================================

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value.trim();

    const form = this;
    const successMessage = document.querySelector('.success-message');
    const errorMessage = document.querySelector('.error-message');

    // Reset messages
    if (successMessage) successMessage.classList.remove('show');
    if (errorMessage) errorMessage.classList.remove('show');

    // Validation
    let errors = [];

    // Name validation
    if (!name) {
        errors.push('আপনার নাম প্রবেশ করুন');
    } else if (name.length < 3) {
        errors.push('নাম কমপক্ষে ৩ অক্ষর হওয়া উচিত');
    }

    // Email validation
    if (!email) {
        errors.push('ইমেইল প্রবেশ করুন');
    } else if (!validateEmail(email)) {
        errors.push('বৈধ ইমেইল প্রবেশ করুন');
    }

    // Phone validation
    if (!phone) {
        errors.push('মোবাইল নম্বর প্রবেশ করুন');
    } else if (!validateBangladeshiPhone(phone)) {
        errors.push('বৈধ বাংলাদেশি মোবাইল নম্বর প্রবেশ করুন (০১XXXXXXXXX)');
    }

    // Subject validation
    if (subject === '-- নির্বাচন করুন --' || !subject) {
        errors.push('একটি বিষয় নির্বাচন করুন');
    }

    // Message validation
    if (!message) {
        errors.push('বার্তা প্রবেশ করুন');
    } else if (message.length < 10) {
        errors.push('বার্তা কমপক্ষে ১০ অক্ষর হওয়া উচিত');
    }

    // Show errors or success
    if (errors.length > 0) {
        if (errorMessage) {
            errorMessage.innerHTML = '<strong>ত্রুটি:</strong><br>' + errors.join('<br>');
            errorMessage.classList.add('show');
        }
    } else {
        if (successMessage) {
            successMessage.innerHTML = '<strong>সফল!</strong><br>আপনার বার্তা সফলভাবে পাঠানো হয়েছে। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।';
            successMessage.classList.add('show');
        }

        // Reset form
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(function() {
            if (successMessage) {
                successMessage.classList.remove('show');
            }
        }, 5000);

        // Optional: Send data to server here
        console.log({
            name: name,
            email: email,
            phone: phone,
            subject: subject,
            message: message
        });
    }
});

// ===============================================
// EMAIL VALIDATION
// ===============================================

function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// ===============================================
// BANGLADESHI PHONE VALIDATION
// ===============================================

function validateBangladeshiPhone(phone) {
    // Remove spaces and special characters
    phone = phone.replace(/\s/g, '').replace(/-/g, '');
    
    // Check format: 01XXXXXXXXX (11 digits)
    const phoneRegex = /^01[0-9]{9}$/;
    
    // Also accept formats like 0088101234567
    const internationalRegex = /^880[0-9]{10}$/;
    
    return phoneRegex.test(phone) || internationalRegex.test(phone);
}

// ===============================================
// SERVICE BUTTON CLICK HANDLER
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    const serviceButtons = document.querySelectorAll('.service-btn');
    
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceCard = this.closest('.service-card');
            const serviceName = serviceCard.querySelector('h3').textContent;
            
            // Scroll to contact form
            const contactForm = document.getElementById('contact');
            contactForm.scrollIntoView({ behavior: 'smooth' });
            
            // Set the selected service in form
            const subjectSelect = document.getElementById('subject');
            if (subjectSelect) {
                subjectSelect.value = serviceName;
            }
            
            // Focus on the form
            setTimeout(function() {
                document.getElementById('name').focus();
            }, 500);
            
            console.log('User selected service:', serviceName);
        });
    });
});

// ===============================================
// CTA BUTTON CLICK HANDLER
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    const ctaButton = document.querySelector('.cta-button');
    
    if (ctaButton) {
        ctaButton.addEventListener('click', function() {
            const servicesSection = document.getElementById('services');
            servicesSection.scrollIntoView({ behavior: 'smooth' });
        });
    }
});

// ===============================================
// SMOOTH SCROLL FOR NAVIGATION LINKS
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#'
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ===============================================
// FORM INPUT FORMATTING
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    const phoneInput = document.getElementById('phone');
    
    if (phoneInput) {
        // Format phone number as user types
        phoneInput.addEventListener('input', function() {
            let value = this.value.replace(/\D/g, '');
            
            if (value.length > 11) {
                value = value.slice(0, 11);
            }
            
            // Format as 01XXXXXXXXX
            if (value.length > 0) {
                if (value.length <= 4) {
                    this.value = value;
                } else if (value.length <= 8) {
                    this.value = value.slice(0, 4) + '-' + value.slice(4);
                } else {
                    this.value = value.slice(0, 4) + '-' + value.slice(4, 8) + '-' + value.slice(8);
                }
            }
        });
    }
});

// ===============================================
// ADD MESSAGE ELEMENTS IF NOT PRESENT
// ===============================================

document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm && !document.querySelector('.success-message')) {
        const successDiv = document.createElement('div');
        successDiv.className = 'success-message';
        contactForm.appendChild(successDiv);
    }
    
    if (contactForm && !document.querySelector('.error-message')) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        contactForm.appendChild(errorDiv);
    }
});

// ===============================================
// ANIMATION ON SCROLL
// ===============================================

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.service-card, .info-card');
    
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ===============================================
// CONSOLE MESSAGE
// ===============================================

console.log('%c🎉 সিলেট অনলাইন সার্ভিস - ডিজিটাল সেবা পোর্টাল', 'color: #6366f1; font-size: 16px; font-weight: bold;');
console.log('%cআমাদের সেবা ব্যবহার করার জন্য ধন্যবাদ!', 'color: #ec4899; font-size: 14px;');
console.log('%cযোগাযোগ: info@sylhetonlineservice.com.bd | মোবাইল: ০১৭১০০২৬৯৬০', 'color: #10b981; font-size: 12px;');

// ===============================================
// END OF SCRIPT
// ===============================================